import * as cdk from 'aws-cdk-lib';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as apigatewayv2Integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as apigatewayv2Authorizers from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import * as path from 'path';

interface ApiStackProps extends cdk.StackProps {
  userPool: cognito.UserPool;
  table: dynamodb.Table;
  photoBucket: s3.Bucket;
}

export class ApiStack extends cdk.Stack {
  public readonly httpApi: apigatewayv2.HttpApi;
  public readonly analysisQueue: sqs.Queue;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { userPool, table, photoBucket } = props;

    // ─── Analysis Queue ──────────────────────────────────────────
    const dlq = new sqs.Queue(this, 'AnalysisDLQ', {
      queueName: 'hazel-hue-analysis-dlq',
      retentionPeriod: cdk.Duration.days(14),
      encryption: sqs.QueueEncryption.SQS_MANAGED,
    });

    this.analysisQueue = new sqs.Queue(this, 'AnalysisQueue', {
      queueName: 'hazel-hue-analysis',
      visibilityTimeout: cdk.Duration.minutes(5),
      encryption: sqs.QueueEncryption.SQS_MANAGED,
      deadLetterQueue: {
        queue: dlq,
        maxReceiveCount: 3,
      },
    });

    // ─── HTTP API ────────────────────────────────────────────────
    this.httpApi = new apigatewayv2.HttpApi(this, 'HazelHueApi', {
      apiName: 'hazel-hue-api',
      corsPreflight: {
        allowHeaders: ['Content-Type', 'Authorization', 'X-Anonymous-Id'],
        allowMethods: [
          apigatewayv2.CorsHttpMethod.GET,
          apigatewayv2.CorsHttpMethod.POST,
          apigatewayv2.CorsHttpMethod.PUT,
          apigatewayv2.CorsHttpMethod.DELETE,
          apigatewayv2.CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: [
          'https://hazelandhue.com',
          'https://www.hazelandhue.com',
          'http://localhost:5173',
          'http://localhost:3000',
        ],
        maxAge: cdk.Duration.hours(1),
      },
    });

    // Cognito JWT Authorizer
    const authorizer = new apigatewayv2Authorizers.HttpJwtAuthorizer(
      'CognitoAuthorizer',
      `https://cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}`,
      {
        jwtAudience: [userPool.userPoolId],
      },
    );

    // Shared Lambda environment
    const lambdaEnv = {
      TABLE_NAME: table.tableName,
      PHOTO_BUCKET: photoBucket.bucketName,
      NODE_OPTIONS: '--enable-source-maps',
    };

    const bundlingDefaults = {
      minify: true,
      sourceMap: true,
    };

    // Read-only handlers get 256MB; write handlers get 512MB
    const readDefaults: nodejs.NodejsFunctionProps = {
      runtime: lambda.Runtime.NODEJS_20_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      environment: lambdaEnv,
      tracing: lambda.Tracing.ACTIVE,
      bundling: bundlingDefaults,
    };

    const writeDefaults: nodejs.NodejsFunctionProps = {
      runtime: lambda.Runtime.NODEJS_20_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: lambdaEnv,
      tracing: lambda.Tracing.ACTIVE,
      bundling: bundlingDefaults,
    };

    // ─── User Context Lambdas ────────────────────────────────────
    const checkEntitlementFn = new nodejs.NodejsFunction(this, 'CheckEntitlement', {
      ...readDefaults,
      entry: path.join(__dirname, '../../lambdas/user/checkEntitlement.ts'),
    });
    table.grantReadData(checkEntitlementFn);

    const createPurchaseFn = new nodejs.NodejsFunction(this, 'CreatePurchase', {
      ...writeDefaults,
      entry: path.join(__dirname, '../../lambdas/user/createPurchase.ts'),
      environment: {
        ...lambdaEnv,
        REVENUECAT_API_KEY: process.env.REVENUECAT_API_KEY ?? '',
        SKIP_RECEIPT_VALIDATION: process.env.SKIP_RECEIPT_VALIDATION ?? 'false',
      },
    });
    table.grantReadWriteData(createPurchaseFn);

    // ─── Analysis Context Lambdas ────────────────────────────────
    const requestAnalysisFn = new nodejs.NodejsFunction(this, 'RequestAnalysis', {
      ...writeDefaults,
      entry: path.join(__dirname, '../../lambdas/analysis/requestAnalysis.ts'),
      environment: {
        ...lambdaEnv,
        ANALYSIS_QUEUE_URL: this.analysisQueue.queueUrl,
      },
    });
    table.grantReadWriteData(requestAnalysisFn);
    photoBucket.grantPut(requestAnalysisFn);
    this.analysisQueue.grantSendMessages(requestAnalysisFn);

    const getResultFn = new nodejs.NodejsFunction(this, 'GetResult', {
      ...readDefaults,
      entry: path.join(__dirname, '../../lambdas/analysis/getResult.ts'),
    });
    table.grantReadData(getResultFn);

    const pollStatusFn = new nodejs.NodejsFunction(this, 'PollStatus', {
      ...readDefaults,
      entry: path.join(__dirname, '../../lambdas/analysis/pollStatus.ts'),
    });
    table.grantReadData(pollStatusFn);

    // ─── Experience Context Lambdas ──────────────────────────────
    const shareImageFn = new nodejs.NodejsFunction(this, 'ShareImage', {
      ...writeDefaults,
      entry: path.join(__dirname, '../../lambdas/experience/shareImage.ts'),
    });
    table.grantReadData(shareImageFn);
    photoBucket.grantReadWrite(shareImageFn);

    const lockScreenFn = new nodejs.NodejsFunction(this, 'LockScreen', {
      ...writeDefaults,
      entry: path.join(__dirname, '../../lambdas/experience/lockScreen.ts'),
    });
    table.grantReadData(lockScreenFn);
    photoBucket.grantReadWrite(lockScreenFn);

    const salonCardFn = new nodejs.NodejsFunction(this, 'SalonCard', {
      ...writeDefaults,
      entry: path.join(__dirname, '../../lambdas/experience/salonCard.ts'),
    });
    table.grantReadData(salonCardFn);
    photoBucket.grantReadWrite(salonCardFn);

    const referralFn = new nodejs.NodejsFunction(this, 'Referral', {
      ...writeDefaults,
      entry: path.join(__dirname, '../../lambdas/experience/referral.ts'),
    });
    table.grantReadWriteData(referralFn);

    // ─── User Context — Refund ────────────────────────────────────
    const processRefundFn = new nodejs.NodejsFunction(this, 'ProcessRefund', {
      ...writeDefaults,
      entry: path.join(__dirname, '../../lambdas/user/processRefund.ts'),
    });
    table.grantReadWriteData(processRefundFn);

    // ─── Analysis Context — Photo Quality ─────────────────────────
    const checkPhotoQualityFn = new nodejs.NodejsFunction(this, 'CheckPhotoQuality', {
      ...readDefaults,
      entry: path.join(__dirname, '../../lambdas/analysis/checkPhotoQuality.ts'),
    });

    // ─── Recommendation Context Lambdas ───────────────────────────
    const bedrockPolicy = new iam.PolicyStatement({
      actions: ['bedrock:InvokeModel'],
      resources: [
        `arn:aws:bedrock:${this.region}::foundation-model/anthropic.claude-sonnet-4-20250514-v1:0`,
      ],
    });

    const recommendationDefaults: nodejs.NodejsFunctionProps = {
      ...writeDefaults,
      timeout: cdk.Duration.minutes(2),
    };

    const generatePaletteFn = new nodejs.NodejsFunction(this, 'GeneratePalette', {
      ...recommendationDefaults,
      entry: path.join(__dirname, '../../lambdas/recommendation/generatePalette.ts'),
    });
    table.grantReadWriteData(generatePaletteFn);
    generatePaletteFn.addToRolePolicy(bedrockPolicy);

    const generateStyleGuideFn = new nodejs.NodejsFunction(this, 'GenerateStyleGuide', {
      ...recommendationDefaults,
      entry: path.join(__dirname, '../../lambdas/recommendation/generateStyleGuide.ts'),
    });
    table.grantReadWriteData(generateStyleGuideFn);
    generateStyleGuideFn.addToRolePolicy(bedrockPolicy);

    const generateGuidesFn = new nodejs.NodejsFunction(this, 'GenerateGuides', {
      ...recommendationDefaults,
      entry: path.join(__dirname, '../../lambdas/recommendation/generateGuides.ts'),
    });
    table.grantReadWriteData(generateGuidesFn);
    generateGuidesFn.addToRolePolicy(bedrockPolicy);

    // ─── Shopping Context Lambdas ──────────────────────────────────

    // Secrets Manager for affiliate/color API credentials
    const shoppingSecret = new secretsmanager.Secret(this, 'ShoppingApiSecrets', {
      secretName: 'hazel-hue/shopping-api',
      description: 'Skimlinks and Imagga API credentials for the shopping integration',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          SKIMLINKS_PUBLISHER_ID: '',
          SKIMLINKS_CLIENT_ID: '',
          SKIMLINKS_API_KEY: '',
          IMAGGA_API_KEY: '',
          IMAGGA_API_SECRET: '',
        }),
        generateStringKey: '_placeholder',
      },
    });

    const shoppingEnv = {
      ...lambdaEnv,
      SHOPPING_SECRET_ARN: shoppingSecret.secretArn,
    };

    const shoppingDefaults: nodejs.NodejsFunctionProps = {
      ...readDefaults,
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: shoppingEnv,
    };

    const searchProductsFn = new nodejs.NodejsFunction(this, 'SearchProducts', {
      ...shoppingDefaults,
      entry: path.join(__dirname, '../../lambdas/shopping/searchProducts.ts'),
    });
    table.grantReadData(searchProductsFn);
    shoppingSecret.grantRead(searchProductsFn);

    const getShopFeedFn = new nodejs.NodejsFunction(this, 'GetShopFeed', {
      ...shoppingDefaults,
      timeout: cdk.Duration.minutes(2), // Feed generation can take longer
      entry: path.join(__dirname, '../../lambdas/shopping/getShopFeed.ts'),
    });
    table.grantReadWriteData(getShopFeedFn);
    shoppingSecret.grantRead(getShopFeedFn);

    const trackClickFn = new nodejs.NodejsFunction(this, 'TrackClick', {
      ...writeDefaults,
      entry: path.join(__dirname, '../../lambdas/shopping/trackClick.ts'),
    });
    table.grantReadWriteData(trackClickFn);

    // ─── Routes ──────────────────────────────────────────────────
    this.httpApi.addRoutes({
      path: '/user/entitlements',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('CheckEntitlement', checkEntitlementFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/user/purchases',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('CreatePurchase', createPurchaseFn),
      authorizer,
    });

    // Analysis routes are public (no auth) — the web app uses these without login
    this.httpApi.addRoutes({
      path: '/analysis',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('RequestAnalysis', requestAnalysisFn),
    });

    this.httpApi.addRoutes({
      path: '/analysis/{id}',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('GetResult', getResultFn),
    });

    this.httpApi.addRoutes({
      path: '/analysis/{id}/status',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('PollStatus', pollStatusFn),
    });

    this.httpApi.addRoutes({
      path: '/experience/share-image',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('ShareImage', shareImageFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/experience/lock-screen',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('LockScreen', lockScreenFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/experience/salon-card',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('SalonCard', salonCardFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/experience/referral',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('Referral', referralFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/user/refund',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('ProcessRefund', processRefundFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/analysis/check-quality',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('CheckPhotoQuality', checkPhotoQualityFn),
    });

    this.httpApi.addRoutes({
      path: '/recommendation/{id}/palette',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('GeneratePalette', generatePaletteFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/recommendation/{id}/style-guide',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('GenerateStyleGuide', generateStyleGuideFn),
      authorizer,
    });

    // Guides route is public for web access
    this.httpApi.addRoutes({
      path: '/recommendation/{id}/guides',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('GenerateGuides', generateGuidesFn),
    });

    // ─── Shopping Context Routes ────────────────────────────────────
    this.httpApi.addRoutes({
      path: '/shopping/search',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('SearchProducts', searchProductsFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/shopping/feed',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('GetShopFeed', getShopFeedFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/shopping/click',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('TrackClick', trackClickFn),
      authorizer,
    });

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', { value: this.httpApi.apiEndpoint });
    new cdk.CfnOutput(this, 'AnalysisQueueUrl', { value: this.analysisQueue.queueUrl });
  }
}

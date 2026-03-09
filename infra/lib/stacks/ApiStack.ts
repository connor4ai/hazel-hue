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
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: [
          apigatewayv2.CorsHttpMethod.GET,
          apigatewayv2.CorsHttpMethod.POST,
          apigatewayv2.CorsHttpMethod.PUT,
          apigatewayv2.CorsHttpMethod.DELETE,
          apigatewayv2.CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: ['https://hazelandhue.com', 'https://www.hazelandhue.com'],
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

    this.httpApi.addRoutes({
      path: '/analysis',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('RequestAnalysis', requestAnalysisFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/analysis/{id}',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('GetResult', getResultFn),
      authorizer,
    });

    this.httpApi.addRoutes({
      path: '/analysis/{id}/status',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration('PollStatus', pollStatusFn),
      authorizer,
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

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', { value: this.httpApi.apiEndpoint });
    new cdk.CfnOutput(this, 'AnalysisQueueUrl', { value: this.analysisQueue.queueUrl });
  }
}

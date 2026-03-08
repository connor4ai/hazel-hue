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
    });

    this.analysisQueue = new sqs.Queue(this, 'AnalysisQueue', {
      queueName: 'hazel-hue-analysis',
      visibilityTimeout: cdk.Duration.minutes(5),
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
        allowOrigins: ['*'],
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

    const lambdaDefaults: nodejs.NodejsFunctionProps = {
      runtime: lambda.Runtime.NODEJS_20_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: lambdaEnv,
      bundling: {
        minify: true,
        sourceMap: true,
      },
    };

    // ─── User Context Lambdas ────────────────────────────────────
    const checkEntitlementFn = new nodejs.NodejsFunction(this, 'CheckEntitlement', {
      ...lambdaDefaults,
      entry: path.join(__dirname, '../../lambdas/user/checkEntitlement.ts'),
    });
    table.grantReadData(checkEntitlementFn);

    const createPurchaseFn = new nodejs.NodejsFunction(this, 'CreatePurchase', {
      ...lambdaDefaults,
      entry: path.join(__dirname, '../../lambdas/user/createPurchase.ts'),
    });
    table.grantReadWriteData(createPurchaseFn);

    // ─── Analysis Context Lambdas ────────────────────────────────
    const requestAnalysisFn = new nodejs.NodejsFunction(this, 'RequestAnalysis', {
      ...lambdaDefaults,
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
      ...lambdaDefaults,
      entry: path.join(__dirname, '../../lambdas/analysis/getResult.ts'),
    });
    table.grantReadData(getResultFn);

    const pollStatusFn = new nodejs.NodejsFunction(this, 'PollStatus', {
      ...lambdaDefaults,
      entry: path.join(__dirname, '../../lambdas/analysis/pollStatus.ts'),
    });
    table.grantReadData(pollStatusFn);

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

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', { value: this.httpApi.apiEndpoint });
    new cdk.CfnOutput(this, 'AnalysisQueueUrl', { value: this.analysisQueue.queueUrl });
  }
}

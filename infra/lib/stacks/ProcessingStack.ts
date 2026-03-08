import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';

interface ProcessingStackProps extends cdk.StackProps {
  table: dynamodb.Table;
  photoBucket: s3.Bucket;
  analysisQueue: sqs.Queue;
}

export class ProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ProcessingStackProps) {
    super(scope, id, props);

    const { table, photoBucket, analysisQueue } = props;

    // ─── Processing Lambda ───────────────────────────────────────
    const processAnalysisFn = new nodejs.NodejsFunction(this, 'ProcessAnalysis', {
      runtime: lambda.Runtime.NODEJS_20_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 1024,
      timeout: cdk.Duration.minutes(3),
      entry: path.join(__dirname, '../../lambdas/analysis/processAnalysis.ts'),
      environment: {
        TABLE_NAME: table.tableName,
        PHOTO_BUCKET: photoBucket.bucketName,
        NODE_OPTIONS: '--enable-source-maps',
      },
      bundling: {
        minify: true,
        sourceMap: true,
      },
    });

    // Grant permissions
    table.grantReadWriteData(processAnalysisFn);
    photoBucket.grantRead(processAnalysisFn);

    // Bedrock access for Claude Vision
    processAnalysisFn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['bedrock:InvokeModel'],
        resources: ['arn:aws:bedrock:*::foundation-model/anthropic.claude-*'],
      }),
    );

    // Rekognition access for face detection
    processAnalysisFn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['rekognition:DetectFaces'],
        resources: ['*'],
      }),
    );

    // Wire SQS → Lambda
    processAnalysisFn.addEventSource(
      new lambdaEventSources.SqsEventSource(analysisQueue, {
        batchSize: 1,
      }),
    );
  }
}

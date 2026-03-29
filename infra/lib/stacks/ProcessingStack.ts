import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
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
      timeout: cdk.Duration.minutes(5),
      tracing: lambda.Tracing.ACTIVE,
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

    // Bedrock access — use cross-region inference profile for Claude 3.5 Sonnet v2
    processAnalysisFn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['bedrock:InvokeModel'],
        resources: [
          `arn:aws:bedrock:${this.region}:${this.account}:inference-profile/us.anthropic.claude-3-5-sonnet-20241022-v2:0`,
          `arn:aws:bedrock:*::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0`,
        ],
      }),
    );

    // Rekognition access for face detection
    // Note: DetectFaces does not support resource-level permissions (AWS limitation)
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

    // ─── DLQ Monitoring ─────────────────────────────────────────
    // Find the DLQ by looking at the analysis queue's DLQ config
    const dlqAlarm = new cloudwatch.Alarm(this, 'DlqMessagesAlarm', {
      alarmName: 'hazel-hue-analysis-dlq-messages',
      alarmDescription: 'Analysis DLQ has messages — failed analyses need investigation',
      metric: new cloudwatch.Metric({
        namespace: 'AWS/SQS',
        metricName: 'ApproximateNumberOfMessagesVisible',
        dimensionsMap: {
          QueueName: 'hazel-hue-analysis-dlq',
        },
        statistic: 'Maximum',
        period: cdk.Duration.minutes(1),
      }),
      threshold: 0,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    new cdk.CfnOutput(this, 'DlqAlarmArn', { value: dlqAlarm.alarmArn });
  }
}

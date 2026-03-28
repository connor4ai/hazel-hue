import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DataStack } from '../../lib/stacks/DataStack';

describe('DataStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new DataStack(app, 'TestData');
    template = Template.fromStack(stack);
  });

  it('creates DynamoDB table with point-in-time recovery', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      PointInTimeRecoverySpecification: {
        PointInTimeRecoveryEnabled: true,
      },
    });
  });

  it('creates DynamoDB table with PAY_PER_REQUEST billing', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      BillingMode: 'PAY_PER_REQUEST',
    });
  });

  it('creates 4 GSIs', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      GlobalSecondaryIndexes: [
        { IndexName: 'GSI1' },
        { IndexName: 'GSI2' },
        { IndexName: 'GSI3' },
        { IndexName: 'GSI4' },
      ],
    });
  });

  it('retains DynamoDB table on deletion', () => {
    const resources = template.findResources('AWS::DynamoDB::Table');
    const tableId = Object.keys(resources)[0];
    expect(resources[tableId].DeletionPolicy).toBe('Retain');
  });

  it('creates S3 photo bucket with encryption', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256',
            },
          },
        ],
      },
    });
  });

  it('blocks public access on photo bucket', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });
  });

  it('restricts S3 CORS to allowed origins', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedOrigins: [
              'https://hazelandhue.com',
              'https://www.hazelandhue.com',
              'http://localhost:5173',
              'http://localhost:3000',
            ],
          },
        ],
      },
    });
  });

  it('has 24h lifecycle rule on photo bucket', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      LifecycleConfiguration: {
        Rules: [
          {
            ExpirationInDays: 1,
            Status: 'Enabled',
          },
        ],
      },
    });
  });
});

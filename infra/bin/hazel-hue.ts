#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AuthStack } from '../lib/stacks/AuthStack';
import { DataStack } from '../lib/stacks/DataStack';
import { ApiStack } from '../lib/stacks/ApiStack';
import { ProcessingStack } from '../lib/stacks/ProcessingStack';
import { CdnStack } from '../lib/stacks/CdnStack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
};

const authStack = new AuthStack(app, 'HazelHue-Auth', { env });
const dataStack = new DataStack(app, 'HazelHue-Data', { env });

const apiStack = new ApiStack(app, 'HazelHue-Api', {
  env,
  userPool: authStack.userPool,
  table: dataStack.table,
  photoBucket: dataStack.photoBucket,
});

new ProcessingStack(app, 'HazelHue-Processing', {
  env,
  table: dataStack.table,
  photoBucket: dataStack.photoBucket,
  api: apiStack.httpApi,
});

new CdnStack(app, 'HazelHue-Cdn', {
  env,
  api: apiStack.httpApi,
});

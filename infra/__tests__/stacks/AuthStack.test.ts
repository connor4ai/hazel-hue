import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AuthStack } from '../../lib/stacks/AuthStack';

describe('AuthStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new AuthStack(app, 'TestAuth');
    template = Template.fromStack(stack);
  });

  it('creates a Cognito user pool with correct password policy', () => {
    template.hasResourceProperties('AWS::Cognito::UserPool', {
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireUppercase: true,
          RequireNumbers: true,
          RequireSymbols: true,
        },
      },
    });
  });

  it('enables threat protection', () => {
    // standardThreatProtectionMode produces UserPoolAddOns in CloudFormation
    const pools = template.findResources('AWS::Cognito::UserPool');
    const poolId = Object.keys(pools)[0];
    const addOns = (pools[poolId].Properties as any).UserPoolAddOns;
    expect(addOns).toBeDefined();
  });

  it('prevents user existence errors', () => {
    template.hasResourceProperties('AWS::Cognito::UserPoolClient', {
      PreventUserExistenceErrors: 'ENABLED',
    });
  });

  it('enables email auto-verification', () => {
    template.hasResourceProperties('AWS::Cognito::UserPool', {
      AutoVerifiedAttributes: ['email'],
    });
  });

  it('retains user pool on deletion', () => {
    const resources = template.findResources('AWS::Cognito::UserPool');
    const poolId = Object.keys(resources)[0];
    expect(resources[poolId].DeletionPolicy).toBe('Retain');
  });

  it('configures OAuth with authorization code grant', () => {
    template.hasResourceProperties('AWS::Cognito::UserPoolClient', {
      AllowedOAuthFlows: ['code'],
      AllowedOAuthScopes: ['email', 'openid', 'profile'],
    });
  });
});

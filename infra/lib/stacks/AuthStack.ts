import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class AuthStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.userPool = new cognito.UserPool(this, 'HazelHueUserPool', {
      userPoolName: 'hazel-hue-users',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      standardAttributes: {
        email: { required: true, mutable: true },
        fullname: { required: false, mutable: true },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      standardThreatProtectionMode: cognito.StandardThreatProtectionMode.FULL_FUNCTION,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Apple Sign-In identity provider
    // Deploy with: cdk deploy -c appleTeamId=X -c appleKeyId=Y -c applePrivateKey=Z
    const appleTeamId = this.node.tryGetContext('appleTeamId');
    const appleKeyId = this.node.tryGetContext('appleKeyId');
    const applePrivateKey = this.node.tryGetContext('applePrivateKey');

    if (appleTeamId && appleKeyId && applePrivateKey) {
      new cognito.UserPoolIdentityProviderApple(this, 'Apple', {
        userPool: this.userPool,
        clientId: 'com.hazelhue.app',
        teamId: appleTeamId,
        keyId: appleKeyId,
        privateKey: applePrivateKey,
        scopes: ['email', 'name'],
        attributeMapping: {
          email: cognito.ProviderAttribute.APPLE_EMAIL,
          fullname: cognito.ProviderAttribute.APPLE_NAME,
        },
      });
    }

    // Google Sign-In identity provider
    // Deploy with: cdk deploy -c googleClientId=X
    // Store client secret in Secrets Manager as 'hazel-hue/google-oauth'
    const googleClientId = this.node.tryGetContext('googleClientId');

    if (googleClientId) {
      new cognito.UserPoolIdentityProviderGoogle(this, 'Google', {
        userPool: this.userPool,
        clientId: googleClientId,
        clientSecretValue: cdk.SecretValue.secretsManager('hazel-hue/google-oauth'),
        scopes: ['email', 'profile'],
        attributeMapping: {
          email: cognito.ProviderAttribute.GOOGLE_EMAIL,
          fullname: cognito.ProviderAttribute.GOOGLE_NAME,
        },
      });
    }

    // Cognito Hosted UI domain (required for federated OAuth flows)
    const envPrefix = (this.node.tryGetContext('environment') as string) ?? 'prod';
    this.userPool.addDomain('HazelHueDomain', {
      cognitoDomain: { domainPrefix: `hazel-hue-${envPrefix}` },
    });

    this.userPoolClient = this.userPool.addClient('HazelHueAppClient', {
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      oAuth: {
        flows: { authorizationCodeGrant: true },
        scopes: [cognito.OAuthScope.EMAIL, cognito.OAuthScope.OPENID, cognito.OAuthScope.PROFILE],
        callbackUrls: ['hazelhue://auth/callback', 'https://hazelandhue.com/auth/callback'],
        logoutUrls: ['hazelhue://auth/signout', 'https://hazelandhue.com/auth/signout'],
      },
      preventUserExistenceErrors: true,
    });

    // Outputs
    new cdk.CfnOutput(this, 'UserPoolId', { value: this.userPool.userPoolId });
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: this.userPoolClient.userPoolClientId });
    new cdk.CfnOutput(this, 'UserPoolDomain', {
      value: `hazel-hue.auth.${this.region}.amazoncognito.com`,
    });
  }
}

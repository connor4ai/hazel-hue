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
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Apple Sign-In identity provider
    // TODO: Configure Apple Services ID and Team ID
    // new cognito.UserPoolIdentityProviderApple(this, 'Apple', {
    //   userPool: this.userPool,
    //   clientId: 'com.hazelhue.app',
    //   teamId: 'YOUR_TEAM_ID',
    //   keyId: 'YOUR_KEY_ID',
    //   privateKey: 'YOUR_PRIVATE_KEY',
    //   scopes: ['email', 'name'],
    //   attributeMapping: {
    //     email: cognito.ProviderAttribute.APPLE_EMAIL,
    //     fullname: cognito.ProviderAttribute.APPLE_NAME,
    //   },
    // });

    // Google Sign-In identity provider
    // TODO: Configure Google OAuth client
    // new cognito.UserPoolIdentityProviderGoogle(this, 'Google', {
    //   userPool: this.userPool,
    //   clientId: 'YOUR_GOOGLE_CLIENT_ID',
    //   clientSecretValue: cdk.SecretValue.secretsManager('google-oauth-secret'),
    //   scopes: ['email', 'profile'],
    //   attributeMapping: {
    //     email: cognito.ProviderAttribute.GOOGLE_EMAIL,
    //     fullname: cognito.ProviderAttribute.GOOGLE_NAME,
    //   },
    // });

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
  }
}

import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';
import * as path from 'path';

interface CdnStackProps extends cdk.StackProps {
  api: apigatewayv2.HttpApi;
}

export class CdnStack extends cdk.Stack {
  public readonly distribution: cloudfront.Distribution;
  public readonly webBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: CdnStackProps) {
    super(scope, id, props);

    const apiDomain = `${props.api.apiId}.execute-api.${this.region}.amazonaws.com`;

    // ─── S3 Bucket for Landing Page ───────────────────────────────
    this.webBucket = new s3.Bucket(this, 'WebBucket', {
      bucketName: `hazel-hue-web-${this.account}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const oai = new cloudfront.OriginAccessIdentity(this, 'WebOAI');
    this.webBucket.grantRead(oai);

    // ─── Access Logging ───────────────────────────────────────────
    const logBucket = new s3.Bucket(this, 'CdnLogBucket', {
      bucketName: `hazel-hue-cdn-logs-${this.account}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      lifecycleRules: [{ expiration: cdk.Duration.days(90), enabled: true }],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      objectOwnership: s3.ObjectOwnership.OBJECT_WRITER,
    });

    // ─── Security Headers ─────────────────────────────────────────
    const securityHeaders = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeaders', {
      responseHeadersPolicyName: 'HazelHueSecurityHeaders',
      securityHeadersBehavior: {
        strictTransportSecurity: {
          accessControlMaxAge: cdk.Duration.days(365),
          includeSubdomains: true,
          preload: true,
          override: true,
        },
        frameOptions: {
          frameOption: cloudfront.HeadersFrameOption.DENY,
          override: true,
        },
        contentTypeOptions: {
          override: true,
        },
        referrerPolicy: {
          referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
          override: true,
        },
        contentSecurityPolicy: {
          contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.amazonaws.com https://*.amazoncognito.com; font-src 'self' data:",
          override: true,
        },
      },
    });

    // ─── Custom Domain (optional) ──────────────────────────────────
    const domainName = this.node.tryGetContext('domainName') as string | undefined;
    const certificateArn = this.node.tryGetContext('certificateArn') as string | undefined;

    const certificate = certificateArn
      ? acm.Certificate.fromCertificateArn(this, 'Certificate', certificateArn)
      : undefined;

    // ─── CloudFront Distribution ──────────────────────────────────
    this.distribution = new cloudfront.Distribution(this, 'HazelHueCdn', {
      defaultBehavior: {
        origin: new origins.S3Origin(this.webBucket, { originAccessIdentity: oai }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: securityHeaders,
      },
      defaultRootObject: 'index.html',
      enableLogging: true,
      logBucket,
      logFilePrefix: 'cdn/',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
      ],
      additionalBehaviors: {
        '/api/*': {
          origin: new origins.HttpOrigin(apiDomain),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          responseHeadersPolicy: securityHeaders,
        },
      },
      ...(domainName && certificate
        ? {
            domainNames: [domainName, `www.${domainName}`],
            certificate,
          }
        : {}),
    });

    // ─── Deploy web assets to S3 ──────────────────────────────────
    new s3deploy.BucketDeployment(this, 'DeployWeb', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../../web/dist'))],
      destinationBucket: this.webBucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
    });

    // Outputs
    new cdk.CfnOutput(this, 'DistributionDomain', {
      value: this.distribution.distributionDomainName,
    });
    new cdk.CfnOutput(this, 'WebBucketName', {
      value: this.webBucket.bucketName,
    });
    if (domainName) {
      new cdk.CfnOutput(this, 'CustomDomain', { value: domainName });
    }
  }
}

import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';

interface CdnStackProps extends cdk.StackProps {
  api: apigatewayv2.HttpApi;
}

export class CdnStack extends cdk.Stack {
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: CdnStackProps) {
    super(scope, id, props);

    const apiDomain = `${props.api.apiId}.execute-api.${this.region}.amazonaws.com`;

    this.distribution = new cloudfront.Distribution(this, 'HazelHueCdn', {
      defaultBehavior: {
        origin: new origins.HttpOrigin(apiDomain),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
      },
      // TODO: Add web landing page S3 origin as additional behavior
      // TODO: Add custom domain (hazelandhue.com) + ACM certificate
    });

    new cdk.CfnOutput(this, 'DistributionDomain', {
      value: this.distribution.distributionDomainName,
    });
  }
}

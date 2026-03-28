import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { AuthStack } from '../../lib/stacks/AuthStack';
import { DataStack } from '../../lib/stacks/DataStack';
import { ApiStack } from '../../lib/stacks/ApiStack';

// NodejsFunction requires esbuild or Docker for bundling.
// Skip in environments without either.
const canBundle = (() => {
  try {
    require.resolve('esbuild');
    return true;
  } catch {
    try {
      require('child_process').execSync('docker info', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }
})();

(canBundle ? describe : describe.skip)('ApiStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const auth = new AuthStack(app, 'TestAuth');
    const data = new DataStack(app, 'TestData');
    const api = new ApiStack(app, 'TestApi', {
      userPool: auth.userPool,
      table: data.table,
      photoBucket: data.photoBucket,
    });
    template = Template.fromStack(api);
  });

  it('creates SQS queues with encryption', () => {
    template.hasResourceProperties('AWS::SQS::Queue', {
      QueueName: 'hazel-hue-analysis',
      SqsManagedSseEnabled: true,
    });
    template.hasResourceProperties('AWS::SQS::Queue', {
      QueueName: 'hazel-hue-analysis-dlq',
      SqsManagedSseEnabled: true,
    });
  });

  it('does not use wildcard CORS origins', () => {
    template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
      CorsConfiguration: {
        AllowOrigins: Match.arrayWith(['https://hazelandhue.com']),
      },
    });

    const apis = template.findResources('AWS::ApiGatewayV2::Api');
    for (const resource of Object.values(apis)) {
      const origins = (resource.Properties as any)?.CorsConfiguration?.AllowOrigins ?? [];
      expect(origins).not.toContain('*');
    }
  });

  it('enables X-Ray tracing on all Lambda functions', () => {
    const functions = template.findResources('AWS::Lambda::Function');
    for (const [, resource] of Object.entries(functions)) {
      expect((resource.Properties as any).TracingConfig?.Mode).toBe('Active');
    }
  });

  it('protected routes have an authorizer', () => {
    // Analysis and recommendation/guides routes are intentionally public (no auth)
    const publicRoutes = [
      'POST /analysis',
      'GET /analysis/{id}',
      'GET /analysis/{id}/status',
      'POST /analysis/{id}/start',
      'POST /analysis/check-quality',
      'POST /recommendation/{id}/guides',
    ];

    const routes = template.findResources('AWS::ApiGatewayV2::Route');
    for (const [, resource] of Object.entries(routes)) {
      const routeKey = (resource.Properties as any).RouteKey;
      if (routeKey?.startsWith('OPTIONS')) continue;
      if (publicRoutes.includes(routeKey)) {
        expect((resource.Properties as any).AuthorizationType).toBe('NONE');
      } else {
        expect((resource.Properties as any).AuthorizationType).toBe('JWT');
      }
    }
  });
});

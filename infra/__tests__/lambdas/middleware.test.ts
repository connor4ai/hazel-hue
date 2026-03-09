import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { z } from 'zod';
import { withMiddleware, getUserId, parseAndValidate, parseBody, getPathParamUUID } from '../../lambdas/shared/middleware';

function makeEvent(overrides: Partial<APIGatewayProxyEventV2WithJWTAuthorizer> = {}): APIGatewayProxyEventV2WithJWTAuthorizer {
  return {
    version: '2.0',
    routeKey: 'POST /test',
    rawPath: '/test',
    rawQueryString: '',
    headers: {},
    isBase64Encoded: false,
    requestContext: {
      accountId: '123',
      apiId: 'api',
      domainName: 'test',
      domainPrefix: 'test',
      http: { method: 'POST', path: '/test', protocol: 'HTTP/1.1', sourceIp: '127.0.0.1', userAgent: 'test' },
      requestId: 'req-1',
      routeKey: 'POST /test',
      stage: '$default',
      time: '2026-01-01T00:00:00Z',
      timeEpoch: 0,
      authorizer: {
        jwt: {
          claims: { sub: 'user-123' },
          scopes: [],
        },
      },
    },
    body: null,
    ...overrides,
  } as any;
}

describe('withMiddleware', () => {
  it('wraps successful responses with JSON content type', async () => {
    const handler = withMiddleware(async () => ({
      statusCode: 200,
      body: { message: 'ok' },
    }));

    const result = await handler(makeEvent()) as APIGatewayProxyStructuredResultV2;
    expect(result.statusCode).toBe(200);
    expect(result.headers?.['Content-Type']).toBe('application/json');
    expect(JSON.parse(result.body as string)).toEqual({ message: 'ok' });
  });

  it('sanitizes 500 errors to generic message', async () => {
    const handler = withMiddleware(async () => {
      throw new Error('DynamoDB: ConditionalCheckFailedException at table hazel-hue');
    });

    const result = await handler(makeEvent()) as APIGatewayProxyStructuredResultV2;
    expect(result.statusCode).toBe(500);
    const body = JSON.parse(result.body as string);
    expect(body.error).toBe('Internal server error');
    expect(body.error).not.toContain('DynamoDB');
  });

  it('preserves 4xx error messages', async () => {
    const handler = withMiddleware(async () => {
      throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
    });

    const result = await handler(makeEvent()) as APIGatewayProxyStructuredResultV2;
    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body as string).error).toBe('Analysis not found');
  });

  it('handles Zod validation errors with details', async () => {
    const schema = z.object({ name: z.string() });
    const handler = withMiddleware(async (event) => {
      parseAndValidate(event, schema);
      return { statusCode: 200 };
    });

    const result = await handler(makeEvent({ body: JSON.stringify({ name: 123 }) })) as APIGatewayProxyStructuredResultV2;
    expect(result.statusCode).toBe(400);
    const body = JSON.parse(result.body as string);
    expect(body.error).toBe('Validation failed');
    expect(body.details).toBeDefined();
    expect(body.details[0].path).toBe('name');
  });
});

describe('getUserId', () => {
  it('extracts sub from JWT claims', () => {
    const event = makeEvent();
    expect(getUserId(event)).toBe('user-123');
  });

  it('throws 401 when no claims', () => {
    const event = makeEvent({
      requestContext: {
        ...makeEvent().requestContext,
        authorizer: { jwt: { claims: {}, scopes: [] } },
      },
    } as any);
    expect(() => getUserId(event)).toThrow('Unauthorized');
  });
});

describe('parseAndValidate', () => {
  const schema = z.object({
    type: z.enum(['generate', 'redeem']),
    code: z.string().optional(),
  });

  it('parses valid body', () => {
    const event = makeEvent({ body: JSON.stringify({ type: 'generate' }) });
    const result = parseAndValidate(event, schema);
    expect(result.type).toBe('generate');
  });

  it('rejects missing body', () => {
    const event = makeEvent({ body: undefined });
    expect(() => parseAndValidate(event, schema)).toThrow('Request body is required');
  });

  it('rejects invalid JSON', () => {
    const event = makeEvent({ body: 'not json{' });
    expect(() => parseAndValidate(event, schema)).toThrow('Invalid JSON');
  });

  it('rejects body over 1MB', () => {
    const event = makeEvent({ body: 'x'.repeat(1_048_577) });
    expect(() => parseAndValidate(event, schema)).toThrow('Request body too large');
  });
});

describe('parseBody', () => {
  it('rejects body over 1MB', () => {
    const event = makeEvent({ body: 'x'.repeat(1_048_577) });
    expect(() => parseBody(event)).toThrow('Request body too large');
  });

  it('rejects invalid JSON', () => {
    const event = makeEvent({ body: '{bad' });
    expect(() => parseBody(event)).toThrow('Invalid JSON');
  });
});

describe('getPathParamUUID', () => {
  it('extracts valid UUID', () => {
    const event = makeEvent({
      pathParameters: { id: '550e8400-e29b-41d4-a716-446655440000' },
    } as any);
    expect(getPathParamUUID(event, 'id')).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  it('rejects non-UUID', () => {
    const event = makeEvent({
      pathParameters: { id: 'not-a-uuid' },
    } as any);
    expect(() => getPathParamUUID(event, 'id')).toThrow('Invalid id');
  });

  it('rejects missing param', () => {
    const event = makeEvent({ pathParameters: {} } as any);
    expect(() => getPathParamUUID(event, 'id')).toThrow('Invalid id');
  });

  it('rejects SQL injection attempt', () => {
    const event = makeEvent({
      pathParameters: { id: "'; DROP TABLE hazel-hue; --" },
    } as any);
    expect(() => getPathParamUUID(event, 'id')).toThrow('Invalid id');
  });
});

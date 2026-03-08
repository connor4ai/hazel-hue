import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

type Handler = (
  event: APIGatewayProxyEventV2,
) => Promise<{ statusCode: number; body?: unknown }>;

/**
 * Wraps a Lambda handler with standard JSON response formatting and error handling.
 */
export function withMiddleware(handler: Handler) {
  return async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
      const result = await handler(event);
      return {
        statusCode: result.statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: result.body ? JSON.stringify(result.body) : undefined,
      };
    } catch (error: unknown) {
      console.error('Lambda error:', error);

      const message = error instanceof Error ? error.message : 'Internal server error';
      const statusCode =
        error instanceof Error && 'statusCode' in error
          ? (error as Error & { statusCode: number }).statusCode
          : 500;

      return {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: message }),
      };
    }
  };
}

/**
 * Extracts the authenticated user ID from the Cognito JWT claims.
 */
export function getUserId(event: APIGatewayProxyEventV2): string {
  const claims = event.requestContext?.authorizer?.jwt?.claims;
  const sub = claims?.sub;
  if (!sub || typeof sub !== 'string') {
    throw Object.assign(new Error('Unauthorized'), { statusCode: 401 });
  }
  return sub;
}

export function parseBody<T>(event: APIGatewayProxyEventV2): T {
  if (!event.body) {
    throw Object.assign(new Error('Request body is required'), { statusCode: 400 });
  }
  return JSON.parse(event.body) as T;
}

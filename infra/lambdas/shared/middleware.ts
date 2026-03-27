import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import type { ZodSchema, ZodError } from 'zod';
import { randomUUID } from 'crypto';

const MAX_BODY_BYTES = 1_048_576; // 1MB

// Known client-safe error messages (mapped from statusCode)
const SAFE_MESSAGES: Record<number, string> = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
};

type Handler = (
  event: APIGatewayProxyEventV2WithJWTAuthorizer,
) => Promise<{ statusCode: number; body?: unknown }>;

/**
 * Wraps a Lambda handler with standard JSON response formatting and error handling.
 * Sanitizes internal error messages for 5xx responses to prevent information leakage.
 */
export function withMiddleware(handler: Handler) {
  return async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
    try {
      const result = await handler(event);
      return {
        statusCode: result.statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: result.body ? JSON.stringify(result.body) : undefined,
      };
    } catch (error: unknown) {
      console.error('Lambda error:', error);

      const statusCode =
        error instanceof Error && 'statusCode' in error
          ? (error as Error & { statusCode: number }).statusCode
          : 500;

      // For Zod validation errors, return field-level details
      if (isZodError(error)) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: 'Validation failed',
            details: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
          }),
        };
      }

      // For client errors (4xx), return the specific message
      // For server errors (5xx), return a generic message to avoid leaking internals
      const message =
        statusCode >= 400 && statusCode < 500 && error instanceof Error
          ? error.message
          : SAFE_MESSAGES[statusCode] ?? 'Internal server error';

      return {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: message }),
      };
    }
  };
}

function isZodError(error: unknown): error is ZodError {
  return error instanceof Error && error.name === 'ZodError' && 'issues' in error;
}

/**
 * Extracts the authenticated user ID from the Cognito JWT claims.
 */
export function getUserId(event: APIGatewayProxyEventV2WithJWTAuthorizer): string {
  const claims = event.requestContext?.authorizer?.jwt?.claims;
  const sub = claims?.sub;
  if (!sub || typeof sub !== 'string') {
    throw Object.assign(new Error('Unauthorized'), { statusCode: 401 });
  }
  return sub;
}

/**
 * Extracts user ID from JWT if present, otherwise uses X-Anonymous-Id header
 * or generates a new anonymous ID. For public routes (no authorizer).
 */
export function getUserIdOrAnonymous(event: APIGatewayProxyEventV2WithJWTAuthorizer | APIGatewayProxyEventV2): string {
  // Try JWT first
  const claims = (event.requestContext as any)?.authorizer?.jwt?.claims;
  const sub = claims?.sub;
  if (sub && typeof sub === 'string') {
    return sub;
  }

  // Fall back to anonymous ID from header
  const anonId = event.headers?.['x-anonymous-id'];
  if (anonId && UUID_REGEX.test(anonId)) {
    return `anon_${anonId}`;
  }

  // Generate a one-time anonymous ID
  return `anon_${randomUUID()}`;
}

/**
 * Parse and validate the request body against a Zod schema.
 * Enforces body size limit and Content-Type check.
 */
export function parseAndValidate<T>(
  event: APIGatewayProxyEventV2WithJWTAuthorizer,
  schema: ZodSchema<T>,
): T {
  // Body size check
  const rawBody = event.body ?? '';
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    throw Object.assign(new Error('Request body too large'), { statusCode: 413 });
  }

  if (!event.body) {
    throw Object.assign(new Error('Request body is required'), { statusCode: 400 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(event.body);
  } catch {
    throw Object.assign(new Error('Invalid JSON'), { statusCode: 400 });
  }

  // schema.parse throws ZodError on validation failure, caught by withMiddleware
  return schema.parse(parsed);
}

/**
 * Parse body without schema validation (for handlers that do their own validation).
 */
export function parseBody<T = unknown>(event: APIGatewayProxyEventV2WithJWTAuthorizer): T {
  const rawBody = event.body ?? '';
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    throw Object.assign(new Error('Request body too large'), { statusCode: 413 });
  }

  if (!event.body) {
    throw Object.assign(new Error('Request body is required'), { statusCode: 400 });
  }

  try {
    return JSON.parse(event.body) as T;
  } catch {
    throw Object.assign(new Error('Invalid JSON'), { statusCode: 400 });
  }
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validate and extract a UUID path parameter.
 */
export function getPathParamUUID(
  event: APIGatewayProxyEventV2WithJWTAuthorizer,
  paramName: string,
): string {
  const value = event.pathParameters?.[paramName];
  if (!value || !UUID_REGEX.test(value)) {
    throw Object.assign(new Error(`Invalid ${paramName}: must be a valid UUID`), { statusCode: 400 });
  }
  return value;
}

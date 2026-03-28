import { withMiddleware, getPathParamUUID } from '../shared/middleware';
import { getItem } from '../shared/dynamodb';

/**
 * Lightweight status polling endpoint — returns only status + minimal metadata.
 * Designed for frequent polling during the processing theater.
 */
export const handler = withMiddleware(async (event) => {
  const analysisId = getPathParamUUID(event, 'id');

  const metadata = await getItem(`ANALYSIS#${analysisId}`, 'METADATA');
  if (!metadata) {
    throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
  }

  return {
    statusCode: 200,
    body: {
      status: metadata.status,
      season: metadata.season ?? null,
      failureReason: metadata.failureReason ?? null,
    },
  };
});

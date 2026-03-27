import { withMiddleware, getPathParamUUID } from '../shared/middleware';
import { getItem, queryItems } from '../shared/dynamodb';

export const handler = withMiddleware(async (event) => {
  const analysisId = getPathParamUUID(event, 'id');

  // Get analysis metadata
  const metadata = await getItem(`ANALYSIS#${analysisId}`, 'METADATA');
  if (!metadata) {
    throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
  }

  // If still processing, return status only
  if (metadata.status !== 'COMPLETED') {
    return {
      statusCode: 200,
      body: {
        id: analysisId,
        status: metadata.status,
        createdAt: metadata.createdAt,
      },
    };
  }

  // Get all result sections
  const resultItems = await queryItems(`ANALYSIS#${analysisId}`, 'RESULT#');

  const results: Record<string, unknown> = {};
  for (const item of resultItems) {
    const section = (item.SK as string).replace('RESULT#', '');
    results[section] = item;
  }

  return {
    statusCode: 200,
    body: {
      id: analysisId,
      status: 'COMPLETED',
      season: metadata.season,
      confidenceScore: metadata.confidenceScore,
      colorProfile: metadata.colorProfile,
      createdAt: metadata.createdAt,
      completedAt: metadata.completedAt,
      results,
    },
  };
});

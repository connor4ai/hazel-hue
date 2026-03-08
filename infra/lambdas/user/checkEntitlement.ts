import { withMiddleware, getUserId } from '../shared/middleware';
import { queryItems } from '../shared/dynamodb';

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);

  const entitlements = await queryItems(`USER#${userId}`, 'ENTITLEMENT#');

  const valid = entitlements.filter((e) => {
    if (e.consumed) return false;
    if (e.expiresAt && new Date(e.expiresAt as string) < new Date()) return false;
    return true;
  });

  return {
    statusCode: 200,
    body: { entitlements: valid, hasAnalysis: valid.some((e) => e.type === 'ANALYSIS') },
  };
});

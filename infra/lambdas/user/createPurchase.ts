// Purchase creation has been removed — Hazel & Hue is now free.
// This lambda is kept as a no-op for backwards compatibility with any
// in-flight requests. New users go through the share-to-unlock flow.

import { withMiddleware } from '../shared/middleware';

export const handler = withMiddleware(async () => {
  return {
    statusCode: 410, // Gone
    body: { message: 'Purchases are no longer required. Hazel & Hue is free!' },
  };
});

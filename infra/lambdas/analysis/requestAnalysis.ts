import { withMiddleware, getUserId } from '../shared/middleware';
import { putItem, queryItems } from '../shared/dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const s3 = new S3Client({});
const PHOTO_BUCKET = process.env.PHOTO_BUCKET!;

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);

  // Check entitlement
  const entitlements = await queryItems(`USER#${userId}`, 'ENTITLEMENT#ANALYSIS');
  const valid = entitlements.find((e) => !e.consumed);
  if (!valid) {
    throw Object.assign(new Error('No valid analysis entitlement'), { statusCode: 403 });
  }

  const analysisId = randomUUID();
  const photoKey = `photos/${userId}/${analysisId}.jpg`;
  const now = new Date().toISOString();

  // Create analysis record
  await putItem({
    PK: `USER#${userId}`,
    SK: `ANALYSIS#${analysisId}`,
    id: analysisId,
    userId,
    status: 'PENDING',
    photoKey,
    createdAt: now,
    // GSI2: status-based queries
    GSI2PK: 'STATUS#PENDING',
    GSI2SK: now,
  });

  await putItem({
    PK: `ANALYSIS#${analysisId}`,
    SK: 'METADATA',
    id: analysisId,
    userId,
    status: 'PENDING',
    photoKey,
    createdAt: now,
  });

  // Generate presigned upload URL
  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: PHOTO_BUCKET,
      Key: photoKey,
      ContentType: 'image/jpeg',
    }),
    { expiresIn: 300 }, // 5 minutes
  );

  return {
    statusCode: 201,
    body: { analysisId, uploadUrl, photoKey },
  };
});

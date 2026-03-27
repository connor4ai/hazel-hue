import { withMiddleware, getUserIdOrAnonymous } from '../shared/middleware';
import { putItem } from '../shared/dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const s3 = new S3Client({});
const sqs = new SQSClient({});
const PHOTO_BUCKET = process.env.PHOTO_BUCKET!;
const ANALYSIS_QUEUE_URL = process.env.ANALYSIS_QUEUE_URL!;

export const handler = withMiddleware(async (event) => {
  const userId = getUserIdOrAnonymous(event);

  // No entitlement/payment check — Hazel & Hue is free.
  // Access is gated client-side by the share-to-unlock flow.

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

  // Generate presigned upload URL (10MB max, JPEG only)
  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: PHOTO_BUCKET,
      Key: photoKey,
      ContentType: 'image/jpeg',
      ContentLength: 10_485_760, // 10MB max
    }),
    { expiresIn: 300 }, // 5 minutes
  );

  // Queue analysis for async processing
  await sqs.send(
    new SendMessageCommand({
      QueueUrl: ANALYSIS_QUEUE_URL,
      MessageBody: JSON.stringify({ analysisId, userId, photoKey }),
    }),
  );

  return {
    statusCode: 201,
    body: { analysisId, uploadUrl, photoKey },
  };
});

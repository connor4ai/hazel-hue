import { withMiddleware, getUserIdOrAnonymous, getPathParamUUID } from '../shared/middleware';
import { queryItems } from '../shared/dynamodb';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const s3 = new S3Client({});
const sqs = new SQSClient({});
const PHOTO_BUCKET = process.env.PHOTO_BUCKET!;
const ANALYSIS_QUEUE_URL = process.env.ANALYSIS_QUEUE_URL!;

export const handler = withMiddleware(async (event) => {
  const userId = getUserIdOrAnonymous(event);
  const analysisId = getPathParamUUID(event, 'id');

  // Verify the analysis belongs to this user and is PENDING
  const items = await queryItems(`USER#${userId}`, `ANALYSIS#${analysisId}`);
  const analysis = items[0];

  if (!analysis) {
    throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
  }

  if (analysis.status !== 'PENDING') {
    throw Object.assign(new Error('Analysis already started'), { statusCode: 409 });
  }

  const photoKey = analysis.photoKey as string;

  // Verify the photo was actually uploaded to S3
  try {
    await s3.send(new HeadObjectCommand({ Bucket: PHOTO_BUCKET, Key: photoKey }));
  } catch {
    throw Object.assign(new Error('Photo not yet uploaded'), { statusCode: 400 });
  }

  // Now it's safe to queue the analysis
  await sqs.send(
    new SendMessageCommand({
      QueueUrl: ANALYSIS_QUEUE_URL,
      MessageBody: JSON.stringify({
        analysisId,
        userId,
        photoKey,
      }),
    }),
  );

  return {
    statusCode: 200,
    body: { message: 'Analysis started' },
  };
});

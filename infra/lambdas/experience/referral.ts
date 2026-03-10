import { withMiddleware, getUserId, parseBody } from '../shared/middleware';
import { putItem, getItem, queryGSI1 } from '../shared/dynamodb';
import { randomUUID, randomBytes } from 'crypto';
import { z } from 'zod';

const REQUIRED_SHARES = 2;

const generateSchema = z.object({
  type: z.literal('generate'),
});

const shareSchema = z.object({
  type: z.literal('share'),
  contactName: z.string().min(1).max(200),
  referralCode: z.string().min(1).max(32),
});

const redeemSchema = z.object({
  type: z.literal('redeem'),
  referralCode: z.string().regex(/^[A-F0-9]{8}$/, 'Invalid referral code format'),
});

const referralSchema = z.discriminatedUnion('type', [generateSchema, shareSchema, redeemSchema]);

/**
 * Referral & share-to-unlock system.
 * - POST type "generate": creates a unique referral code for the user
 * - POST type "share": records a share event (user shared with a contact)
 * - POST type "redeem": records when a referred user opens the app via a referral link
 */
export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const body = referralSchema.parse(parseBody(event));

  if (body.type === 'generate') {
    const existing = await getItem(`USER#${userId}`, 'REFERRAL#CODE');
    if (existing) {
      return {
        statusCode: 200,
        body: {
          referralCode: existing.code,
          referralUrl: `https://hazelandhue.com/r/${existing.code}`,
          totalReferred: existing.totalReferred ?? 0,
          totalShares: existing.totalShares ?? 0,
        },
      };
    }

    const code = randomBytes(4).toString('hex').toUpperCase();
    const now = new Date().toISOString();

    await putItem({
      PK: `USER#${userId}`,
      SK: 'REFERRAL#CODE',
      code,
      userId,
      totalReferred: 0,
      totalShares: 0,
      createdAt: now,
      GSI1PK: `REFERRAL#${code}`,
      GSI1SK: 'INFO',
    });

    return {
      statusCode: 201,
      body: {
        referralCode: code,
        referralUrl: `https://hazelandhue.com/r/${code}`,
        totalReferred: 0,
        totalShares: 0,
      },
    };
  }

  if (body.type === 'share') {
    const { contactName, referralCode } = body;
    const now = new Date().toISOString();
    const shareId = randomUUID();

    // Record the share
    await putItem({
      PK: `USER#${userId}`,
      SK: `SHARE#${shareId}`,
      id: shareId,
      contactName,
      referralCode,
      sharedAt: now,
    });

    // Check total shares for this user
    const { queryItems } = await import('../shared/dynamodb');
    const shares = await queryItems(`USER#${userId}`, 'SHARE#');
    const totalShares = shares.length;
    const isUnlocked = totalShares >= REQUIRED_SHARES;

    return {
      statusCode: 201,
      body: {
        shareId,
        totalShares,
        requiredShares: REQUIRED_SHARES,
        isUnlocked,
      },
    };
  }

  if (body.type === 'redeem') {
    const { referralCode } = body;

    const referralItems = await queryGSI1(`REFERRAL#${referralCode}`);
    if (referralItems.length === 0) {
      throw Object.assign(new Error('Invalid referral code'), { statusCode: 400 });
    }

    const referral = referralItems[0];
    const referrerId = referral.userId as string;

    if (referrerId === userId) {
      throw Object.assign(new Error('Cannot use your own referral code'), { statusCode: 400 });
    }

    const existingRedemption = await getItem(`USER#${userId}`, `REFERRAL#REDEEMED#${referralCode}`);
    if (existingRedemption) {
      throw Object.assign(new Error('Referral already redeemed'), { statusCode: 400 });
    }

    const now = new Date().toISOString();
    const redemptionId = randomUUID();

    // Record for the new user
    await putItem({
      PK: `USER#${userId}`,
      SK: `REFERRAL#REDEEMED#${referralCode}`,
      id: redemptionId,
      referralCode,
      referrerId,
      redeemedAt: now,
    });

    // Record for the referrer
    await putItem({
      PK: `USER#${referrerId}`,
      SK: `REFERRAL#EARNED#${redemptionId}`,
      id: redemptionId,
      referredUserId: userId,
      earnedAt: now,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Welcome to Hazel & Hue! Share with 2 friends to unlock your analysis.',
      },
    };
  }

  throw Object.assign(new Error('Invalid type'), { statusCode: 400 });
});

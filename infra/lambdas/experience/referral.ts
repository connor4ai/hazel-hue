import { withMiddleware, getUserId, parseBody } from '../shared/middleware';
import { putItem, getItem, queryItems } from '../shared/dynamodb';
import { randomUUID } from 'crypto';

const REFERRAL_DISCOUNT_CENTS = 500; // $5 off

interface CreateReferralBody {
  type: 'generate';
}

interface RedeemReferralBody {
  type: 'redeem';
  referralCode: string;
}

/**
 * Referral system — $5 give / $5 get.
 * - POST with type "generate": creates a unique referral code for the user
 * - POST with type "redeem": validates and records a referral redemption
 */
export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const body = parseBody<CreateReferralBody | RedeemReferralBody>(event);

  if (body.type === 'generate') {
    // Check if user already has a referral code
    const existing = await getItem(`USER#${userId}`, 'REFERRAL#CODE');
    if (existing) {
      return {
        statusCode: 200,
        body: {
          referralCode: existing.code,
          referralUrl: `https://hazelandhue.com/r/${existing.code}`,
          totalReferred: existing.totalReferred ?? 0,
          totalEarned: existing.totalEarned ?? 0,
        },
      };
    }

    // Generate unique 8-char code
    const code = randomUUID().slice(0, 8).toUpperCase();
    const now = new Date().toISOString();

    await putItem({
      PK: `USER#${userId}`,
      SK: 'REFERRAL#CODE',
      code,
      userId,
      totalReferred: 0,
      totalEarned: 0,
      createdAt: now,
      // GSI1 for code lookup
      GSI1PK: `REFERRAL#${code}`,
      GSI1SK: 'INFO',
    });

    return {
      statusCode: 201,
      body: {
        referralCode: code,
        referralUrl: `https://hazelandhue.com/r/${code}`,
        totalReferred: 0,
        totalEarned: 0,
      },
    };
  }

  if (body.type === 'redeem') {
    const { referralCode } = body;

    // Look up referral code via GSI1
    const referralItems = await queryItems(`REFERRAL#${referralCode}`);
    if (referralItems.length === 0) {
      throw Object.assign(new Error('Invalid referral code'), { statusCode: 400 });
    }

    const referral = referralItems[0];
    const referrerId = referral.userId as string;

    // Can't refer yourself
    if (referrerId === userId) {
      throw Object.assign(new Error('Cannot use your own referral code'), { statusCode: 400 });
    }

    // Check if already redeemed by this user
    const existingRedemption = await getItem(`USER#${userId}`, `REFERRAL#REDEEMED#${referralCode}`);
    if (existingRedemption) {
      throw Object.assign(new Error('Referral already redeemed'), { statusCode: 400 });
    }

    const now = new Date().toISOString();
    const redemptionId = randomUUID();

    // Record redemption for the redeemer ($5 credit)
    await putItem({
      PK: `USER#${userId}`,
      SK: `REFERRAL#REDEEMED#${referralCode}`,
      id: redemptionId,
      referralCode,
      referrerId,
      discountCents: REFERRAL_DISCOUNT_CENTS,
      redeemedAt: now,
    });

    // Record referral credit for the referrer ($5 credit)
    await putItem({
      PK: `USER#${referrerId}`,
      SK: `REFERRAL#EARNED#${redemptionId}`,
      id: redemptionId,
      referredUserId: userId,
      creditCents: REFERRAL_DISCOUNT_CENTS,
      earnedAt: now,
    });

    return {
      statusCode: 200,
      body: {
        discountCents: REFERRAL_DISCOUNT_CENTS,
        message: 'Referral applied — $5 off your analysis!',
      },
    };
  }

  throw Object.assign(new Error('Invalid type'), { statusCode: 400 });
});

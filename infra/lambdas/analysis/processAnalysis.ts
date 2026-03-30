import type { SQSEvent } from 'aws-lambda';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { updateItem, queryItems } from '../shared/dynamodb';
import { z } from 'zod';

const bedrock = new BedrockRuntimeClient({});
const s3 = new S3Client({});
const PHOTO_BUCKET = process.env.PHOTO_BUCKET!;
const BEDROCK_TIMEOUT_MS = 150_000; // 150 seconds — leaves margin before Lambda 5min timeout

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const analysisMessageSchema = z.object({
  analysisId: z.string().regex(UUID_REGEX),
  userId: z.string().min(1).max(256),
  photoKey: z.string().min(1).max(512),
});

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    let message: z.infer<typeof analysisMessageSchema>;
    try {
      message = analysisMessageSchema.parse(JSON.parse(record.body));
    } catch (error) {
      console.error('Invalid SQS message:', error);
      // Don't retry malformed messages — they'll never succeed
      continue;
    }

    const { analysisId, userId, photoKey } = message;

    try {
      // Update status to PROCESSING
      await updateItem(`ANALYSIS#${analysisId}`, 'METADATA', { status: 'PROCESSING' });
      await updateItem(`USER#${userId}`, `ANALYSIS#${analysisId}`, { status: 'PROCESSING' });

      // Get photo from S3
      const photoResponse = await s3.send(
        new GetObjectCommand({ Bucket: PHOTO_BUCKET, Key: photoKey }),
      );
      const photoBytes = await photoResponse.Body!.transformToByteArray();
      const photoBase64 = Buffer.from(photoBytes).toString('base64');

      // Step 1: Season Classification via Claude Vision
      const classificationResult = await invokeClaudeVision(photoBase64, CLASSIFICATION_PROMPT);
      const classification = safeParseJson(classificationResult, 'classification');

      // Guide data (palette, style, makeup, etc.) is preset per season —
      // no need to generate dynamically. Clients look up preset data locally
      // using the classified season. This keeps analysis fast (~15s) and cheap.

      // Update analysis to COMPLETED
      const now = new Date().toISOString();
      await updateItem(`ANALYSIS#${analysisId}`, 'METADATA', {
        status: 'COMPLETED',
        season: classification.season,
        confidenceScore: classification.confidenceScore,
        colorProfile: classification.colorProfile,
        completedAt: now,
        GSI3PK: `SEASON#${classification.season}`,
        GSI3SK: now,
      });

      await updateItem(`USER#${userId}`, `ANALYSIS#${analysisId}`, {
        status: 'COMPLETED',
        season: classification.season,
        completedAt: now,
      });

      // Consume the entitlement
      const entitlements = await queryItems(`USER#${userId}`, 'ENTITLEMENT#ANALYSIS');
      const validEntitlement = entitlements.find((e) => !e.consumed);
      if (validEntitlement) {
        await updateItem(`USER#${userId}`, validEntitlement.SK as string, {
          consumed: true,
          consumedAt: now,
          consumedByAnalysisId: analysisId,
        });
      }

      console.log(`Analysis ${analysisId} completed: ${classification.season}`);
    } catch (error) {
      console.error(`Analysis ${analysisId} failed:`, error);

      const receiveCount = parseInt(record.attributes?.ApproximateReceiveCount ?? '1', 10);
      const maxRetries = 3;

      const failureReason =
        error instanceof Error && error.name === 'AbortError'
          ? 'Analysis timed out — please try again'
          : error instanceof Error
            ? error.message
            : 'Unknown error';

      // Always write FAILED so the client sees the error immediately
      await updateItem(`ANALYSIS#${analysisId}`, 'METADATA', {
        status: 'FAILED',
        failureReason,
      });
      await updateItem(`USER#${userId}`, `ANALYSIS#${analysisId}`, {
        status: 'FAILED',
      });

      // Only rethrow for SQS retry if we haven't exhausted retries
      if (receiveCount < maxRetries) {
        throw error;
      }
      // On final attempt, don't rethrow — let the message be consumed
    }
  }
};

/**
 * Safely parse JSON from Bedrock responses. Handles markdown code fences
 * and malformed output gracefully.
 */
function safeParseJson(raw: string, sectionName: string): Record<string, unknown> {
  // Strip markdown code fences if present
  const cleaned = raw.replace(/^```(?:json)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error(`Failed to parse ${sectionName} response as JSON`);
  }
}

async function invokeClaudeVision(imageBase64: string, prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BEDROCK_TIMEOUT_MS);

  try {
    const response = await bedrock.send(
      new InvokeModelCommand({
        modelId: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 2048,
          temperature: 0,
          top_k: 1, // Maximum determinism — always pick the top token
          system: COLORIST_SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 },
                },
                { type: 'text', text: prompt },
              ],
            },
          ],
        }),
      }),
      { abortSignal: controller.signal },
    );

    const result = JSON.parse(new TextDecoder().decode(response.body));
    return result.content[0].text;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Prompts ─────────────────────────────────────────────────────

const COLORIST_SYSTEM_PROMPT = `You are a professional 12-season color analyst using the Sci/ART method. You classify people into exactly one of 12 seasons based on their natural coloring. You focus on the person's inherent skin undertone, hair color, and eye color — ignoring makeup, lighting artifacts, and filters as much as possible. Any ethnicity can be any season. You always respond with valid JSON only.`;

const CLASSIFICATION_PROMPT = `Classify this person into one of 12 color seasons. Follow this EXACT decision tree — commit to each answer before moving to the next step.

DECISION TREE:

1. SKIN UNDERTONE (most important — look at inner wrist, jawline, forehead):
   - Golden/peachy/yellow base → WARM
   - Pink/rosy/blue base → COOL
   - Olive: look beneath — yellow-olive = WARM, gray-olive = COOL

2. OVERALL DEPTH (combine skin + hair + eyes):
   - Fair skin + light hair + light eyes → LIGHT
   - Dark hair + deep features → DEEP
   - Neither extreme → MEDIUM

3. CHROMA (how vivid/saturated are the features?):
   - Vivid eye color, clear skin, high-definition features → BRIGHT
   - Dusty, blended, grayed-down, soft-focus features → SOFT/MUTED
   - Neither extreme → MODERATE

4. MAP using this table (pick the BEST match):

   | Season         | Undertone | Depth  | Chroma   | Key Indicator                           |
   |----------------|-----------|--------|----------|-----------------------------------------|
   | LIGHT_SPRING   | Warm      | Light  | Moderate | Delicate warm coloring, peachy skin     |
   | TRUE_SPRING    | Warm      | Medium | Bright   | Unmistakable golden warmth throughout   |
   | BRIGHT_SPRING  | Warm      | Any    | Bright   | High contrast + vivid + warm undertone  |
   | LIGHT_SUMMER   | Cool      | Light  | Moderate | Delicate cool coloring, rosy/pink skin  |
   | TRUE_SUMMER    | Cool      | Medium | Soft     | Cool + muted, ash tones throughout      |
   | SOFT_SUMMER    | Cool      | Medium | Soft     | Very muted, neutral-cool, blended       |
   | SOFT_AUTUMN    | Warm      | Medium | Soft     | Very muted, neutral-warm, blended       |
   | TRUE_AUTUMN    | Warm      | Medium | Moderate | Rich earthy warmth, golden/olive skin   |
   | DEEP_AUTUMN    | Warm      | Deep   | Moderate | Dark features with warm/golden cast      |
   | DEEP_WINTER    | Cool      | Deep   | Moderate | Dark features with cool/blue cast        |
   | TRUE_WINTER    | Cool      | Medium | Bright   | Cool + clear, high contrast              |
   | BRIGHT_WINTER  | Cool      | Any    | Bright   | Highest contrast + vivid + cool undertone|

CONSISTENCY RULES:
- The undertone MUST match the season family: Spring/Autumn = Warm, Summer/Winter = Cool.
- If torn between two sister seasons, skin undertone is the tiebreaker.
- Ignore clothing and background colors.
- If you detect makeup or hair dye, try to assess NATURAL coloring beneath.

Respond with ONLY this JSON — no other text:
{
  "season": "<LIGHT_SPRING|TRUE_SPRING|BRIGHT_SPRING|LIGHT_SUMMER|TRUE_SUMMER|SOFT_SUMMER|SOFT_AUTUMN|TRUE_AUTUMN|DEEP_AUTUMN|DEEP_WINTER|TRUE_WINTER|BRIGHT_WINTER>",
  "confidenceScore": <0-100>,
  "colorProfile": {
    "undertone": "<warm|cool>",
    "chroma": "<bright|soft|moderate>",
    "contrastLevel": "<low|medium|high>",
    "dominantSkinHex": "<hex>",
    "dominantHairHex": "<hex>",
    "dominantEyeHex": "<hex>"
  },
  "reasoning": "<2-3 sentences: what undertone you see, what depth, what chroma, and why this season>"
}`;

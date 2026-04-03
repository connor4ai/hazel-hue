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

const COLORIST_SYSTEM_PROMPT = `You are a professional 12-season color analyst using the Sci/ART method. You classify people into exactly one of 12 seasons based on their natural coloring. You focus on the person's inherent skin undertone, hair color, and eye color. Any ethnicity can be any season. You always respond with valid JSON only.

CRITICAL — PHOTO NORMALIZATION:
Before analyzing, mentally white-balance the image. Phone cameras shift colors depending on lighting (warm indoor light adds yellow; cool fluorescent adds blue; overexposure washes out depth; underexposure deepens everything). To compensate:
- Find neutral anchors: the whites of the eyes, teeth, any white/gray clothing or walls. If these appear yellowish, the whole image skews warm — mentally subtract that cast. If bluish, subtract the cool cast.
- Judge undertone from RELATIVE color relationships, not absolute pixel colors. Compare lip color to surrounding skin, the contrast between inner arm/wrist and outer arm, and the hue shift from skin to hair. These relative contrasts are stable across lighting.
- Vein color at the inner wrist (if visible) is a strong lighting-invariant signal: green-tinted veins = warm undertone, blue/purple veins = cool undertone.
- Depth should be judged by the CONTRAST RATIO between skin, hair, and eyes — not by how light or dark the skin appears in absolute terms (which shifts with exposure).
- Chroma should be judged by how SATURATED features appear relative to each other, not in absolute terms. In washed-out photos, look at whether eye color still reads as vivid against the skin.
- Ignore clothing, background colors, and jewelry entirely — they do not reflect the person's coloring.
- If you detect makeup, hair dye, or colored contacts, try to assess the NATURAL coloring beneath. If heavy makeup makes this impossible, base your assessment on the features that appear most natural.`;

const CLASSIFICATION_PROMPT = `Classify this person into one of 12 color seasons. Follow this EXACT decision tree — commit to each answer before moving to the next step.

IMPORTANT — LIGHTING-INVARIANT ANALYSIS:
Before starting the decision tree, mentally white-balance this photo using the whites of the eyes, teeth, or any neutral gray/white surfaces visible. All color judgments below must be based on the person's TRUE coloring after compensating for any warm/cool lighting cast, over/underexposure, or camera white balance shifts. Use RELATIVE color relationships between features (skin vs hair, skin vs eyes, lip vs skin) rather than absolute colors, because relative contrasts are stable across different lighting.

DECISION TREE:

1. SKIN UNDERTONE (most important — this is the PRIMARY axis and must be determined with high confidence):
   Use MULTIPLE signals and require agreement before committing:
   a) Inner wrist/forearm: Do veins appear more green-tinted (warm) or blue-purple (cool)?
   b) Jawline/neck: After mentally removing any lighting cast, does the base tone lean golden/peachy (warm) or pink/rosy (cool)?
   c) Lip-to-skin relationship: Are the lips a warm peach/coral against the skin (warm) or a cool pink/berry (cool)?
   d) How the skin interacts with the hair at the hairline: Does the transition feel harmoniously warm or cool?

   - If 3+ signals agree on golden/peachy/yellow → WARM
   - If 3+ signals agree on pink/rosy/blue → COOL
   - Olive skin: look at the UNDERLYING base beneath the olive — yellow-olive = WARM, gray-olive = COOL
   - If signals conflict, weight vein color and lip-to-skin contrast most heavily (these are most resistant to lighting shifts)

2. OVERALL DEPTH (judge by CONTRAST RATIOS between features, not absolute lightness):
   - Low contrast between skin, hair, and eyes + generally lighter features → LIGHT
   - High contrast + generally darker/richer features → DEEP
   - Moderate contrast → MEDIUM
   NOTE: A photo taken in dim light can make a Light person look Medium. Judge depth by the RANGE of values across features (hair vs skin vs eyes), not by how dark any single feature appears.

3. CHROMA (how vivid/saturated are the features RELATIVE TO EACH OTHER?):
   - Eye color reads as vivid and distinct against skin, clear skin, crisp definition between features → BRIGHT
   - Features blend into each other, soft transitions, muted tones throughout → SOFT/MUTED
   - Neither extreme → MODERATE
   NOTE: Overexposed photos desaturate everything. If the photo looks washed out, check whether the EYES still hold strong color — if so, the person is likely brighter than the photo suggests.

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
- If torn between two adjacent seasons (e.g., Soft Summer vs Soft Autumn, or True Spring vs Bright Spring), commit to the one where the PRIMARY axis (undertone) is most clearly supported by the lighting-invariant signals (veins, lip-to-skin contrast, hair-to-skin warmth).
- NEVER let background, clothing, or environmental light color influence your season choice.
- Depth and chroma are SECONDARY to undertone. If undertone clearly points warm but depth/chroma are ambiguous, choose the warm season that best fits and note lower confidence — do NOT flip to a cool season because of a depth/chroma ambiguity.

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
  "reasoning": "<2-3 sentences: what undertone you see (and which lighting-invariant signals confirmed it), what depth, what chroma, and why this season>"
}`;

import type { SQSEvent } from 'aws-lambda';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { updateItem, putItem, queryItems } from '../shared/dynamodb';
import { z } from 'zod';

const bedrock = new BedrockRuntimeClient({});
const s3 = new S3Client({});
const PHOTO_BUCKET = process.env.PHOTO_BUCKET!;
const BEDROCK_TIMEOUT_MS = 150_000; // 150 seconds — leaves margin before Lambda 5min timeout

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const analysisMessageSchema = z.object({
  analysisId: z.string().regex(UUID_REGEX),
  userId: z.string().regex(UUID_REGEX),
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

      // Step 2: Generate results sections in parallel
      const [palette, colorStory, styleGuide, makeupGuide, hairGuide, jewelryGuide, siblings, avoidColors] =
        await Promise.all([
          invokeClaudeText(palettePrompt(classification)),
          invokeClaudeText(colorStoryPrompt(classification)),
          invokeClaudeText(styleGuidePrompt(classification)),
          invokeClaudeText(makeupGuidePrompt(classification)),
          invokeClaudeText(hairGuidePrompt(classification)),
          invokeClaudeText(jewelryGuidePrompt(classification)),
          invokeClaudeText(siblingsPrompt(classification)),
          invokeClaudeText(avoidColorsPrompt(classification)),
        ]);

      // Step 3: Store all results (safe-parse each one)
      const resultSections = {
        palette: safeParseJson(palette, 'palette'),
        colorstory: safeParseJson(colorStory, 'colorstory'),
        styleguide: safeParseJson(styleGuide, 'styleguide'),
        makeup: safeParseJson(makeupGuide, 'makeup'),
        hair: safeParseJson(hairGuide, 'hair'),
        jewelry: safeParseJson(jewelryGuide, 'jewelry'),
        siblings: safeParseJson(siblings, 'siblings'),
        avoid: safeParseJson(avoidColors, 'avoid'),
      };

      for (const [section, data] of Object.entries(resultSections)) {
        await putItem({
          PK: `ANALYSIS#${analysisId}`,
          SK: `RESULT#${section}`,
          ...data,
        });
      }

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

      const failureReason =
        error instanceof Error && error.name === 'AbortError'
          ? 'Analysis timed out — please try again'
          : error instanceof Error
            ? error.message
            : 'Unknown error';

      await updateItem(`ANALYSIS#${analysisId}`, 'METADATA', {
        status: 'FAILED',
        failureReason,
      });
      await updateItem(`USER#${userId}`, `ANALYSIS#${analysisId}`, {
        status: 'FAILED',
      });
      throw error; // Let SQS retry
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
        modelId: 'anthropic.claude-sonnet-4-20250514-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 4096,
          temperature: 0, // Deterministic for classification accuracy
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

async function invokeClaudeText(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BEDROCK_TIMEOUT_MS);

  try {
    const response = await bedrock.send(
      new InvokeModelCommand({
        modelId: 'anthropic.claude-sonnet-4-20250514-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 4096,
          messages: [{ role: 'user', content: prompt }],
          system: COLORIST_SYSTEM_PROMPT,
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

const COLORIST_SYSTEM_PROMPT = `You are a world-class personal color analyst combining professional draping methodology with color science (Munsell color system, CIE Lab color space). You have deep expertise in the 12-season color analysis system, dermatological undertone assessment, and the perceptual science of simultaneous contrast. You are methodical, precise, and never guess — you analyze systematically. Always respond with valid JSON matching the requested schema.`;

const CLASSIFICATION_PROMPT = `You are performing a professional 12-season color analysis on this person's photo. Follow this rigorous methodology:

## STEP 1: EXTRACT COLOR DATA
Sample the dominant colors from three regions:
- **Skin**: Sample from forehead, cheek, and jawline. Identify the base hue (yellow-based = warm, pink/blue-based = cool, olive/beige = neutral). Note the Munsell value (lightness 1-10 scale) and chroma (saturation intensity).
- **Hair**: Sample the natural root/mid-shaft color. Determine if it reads warm (golden, auburn, copper, warm brown), cool (ash, blue-black, cool brown), or neutral. Note depth (light/medium/deep).
- **Eyes**: Identify the dominant iris color and any secondary patterns (warm flecks, cool rings). Note the clarity/saturation.

## STEP 2: DETERMINE THE THREE DIMENSIONS
These three independent dimensions determine the season:

1. **Temperature (Warm vs Cool)**: Look at skin undertone — does the skin have golden/peachy/yellow undertones (warm) or pink/rosy/blue undertones (cool)? Check vein color at wrist if visible (green = warm, blue/purple = cool). Consider if hair and eyes reinforce or are neutral.

2. **Value (Light vs Deep)**: Assess the overall lightness/darkness of the person's coloring as a whole. Consider hair depth, skin lightness, and eye depth together. Light = fair skin + lighter hair + lighter eyes. Deep = dark hair + deeper skin + darker eyes.

3. **Chroma (Bright/Clear vs Soft/Muted)**: How saturated and clear are their features? Bright = vivid eye color, high-contrast features, clear skin. Soft/Muted = blended, low-contrast, dusty or grayed-down coloring.

## STEP 3: DETERMINE CONTRAST LEVEL
Contrast = the difference between the lightest and darkest features (usually skin vs hair):
- **Low contrast**: Hair, skin, and eyes are similar in depth (common in Light Spring, Soft Summer, Soft Autumn)
- **Medium contrast**: Moderate difference between features (True seasons)
- **High contrast**: Stark difference between features, e.g. very dark hair with light skin (Deep Winter, Bright Spring, Bright Winter)

## STEP 4: MAP TO ONE OF 12 SEASONS
Each season has a **dominant** characteristic and a **secondary** one:

**SPRING (Warm base)**
- LIGHT_SPRING: Dominant = Light, Secondary = Warm. Delicate, fair, warm coloring. Low contrast. Light golden hair, light warm eyes, peachy skin.
- TRUE_SPRING: Dominant = Warm, Secondary = Bright. The warmest season. Medium value, clear warm coloring. Golden/strawberry hair, warm eyes, warm peachy skin.
- BRIGHT_SPRING: Dominant = Bright/Clear, Secondary = Warm. High contrast + warm undertone. Can have dark hair with light warm skin. Vivid, saturated features.

**SUMMER (Cool base)**
- LIGHT_SUMMER: Dominant = Light, Secondary = Cool. Delicate, fair, cool coloring. Low contrast. Ash-blonde hair, light cool eyes, rosy skin.
- TRUE_SUMMER: Dominant = Cool, Secondary = Muted. The coolest season with muted quality. Ash-toned hair, cool muted eyes, pink-toned skin.
- SOFT_SUMMER: Dominant = Soft/Muted, Secondary = Cool. Blended, low-contrast, neutral-cool. Mousy/ash hair, grayed eyes, neutral-cool skin.

**AUTUMN (Warm base)**
- SOFT_AUTUMN: Dominant = Soft/Muted, Secondary = Warm. Blended, low-contrast, neutral-warm. Mousy/golden-brown hair, hazel eyes, warm muted skin.
- TRUE_AUTUMN: Dominant = Warm, Secondary = Muted. The warmest muted season. Rich warm hair (auburn, chestnut), warm eyes, golden skin.
- DEEP_AUTUMN: Dominant = Deep/Dark, Secondary = Warm. Dark + warm. Deep brown/black hair with warm cast, dark warm eyes, olive/warm deeper skin.

**WINTER (Cool base)**
- DEEP_WINTER: Dominant = Deep/Dark, Secondary = Cool. Dark + cool. Very dark hair, dark cool eyes, can have deeper skin with cool/neutral undertone. High drama.
- TRUE_WINTER: Dominant = Cool, Secondary = Bright. The coolest clear season. Dark cool hair, high contrast, striking cool coloring. Porcelain or deep cool skin.
- BRIGHT_WINTER: Dominant = Bright/Clear, Secondary = Cool. Highest contrast + cool. Vivid eye color, dark hair, very light cool skin OR deep skin with striking clarity.

## STEP 5: CROSS-CHECK
- Verify your classification is consistent across all three dimensions
- If the person sits between two seasons, choose the one where the dominant characteristic is strongest
- Consider edge cases: olive skin can be warm OR cool; assess the underlying pink vs yellow base beneath the olive

Respond with ONLY valid JSON in this exact format:
{
  "season": "<one of: LIGHT_SPRING, TRUE_SPRING, BRIGHT_SPRING, LIGHT_SUMMER, TRUE_SUMMER, SOFT_SUMMER, SOFT_AUTUMN, TRUE_AUTUMN, DEEP_AUTUMN, DEEP_WINTER, TRUE_WINTER, BRIGHT_WINTER>",
  "confidenceScore": <0-100>,
  "colorProfile": {
    "undertone": "<warm|cool|neutral>",
    "chroma": "<bright|soft|muted>",
    "contrastLevel": "<low|medium|high>",
    "dominantSkinHex": "<hex>",
    "dominantHairHex": "<hex>",
    "dominantEyeHex": "<hex>"
  },
  "reasoning": "<detailed explanation covering: (1) skin undertone analysis, (2) hair temperature and depth, (3) eye color and clarity, (4) overall contrast level, (5) which dominant dimension led to the classification>"
}`;

function palettePrompt(classification: Record<string, unknown>): string {
  return `Generate a complete color palette for a ${classification.season} person with ${(classification.colorProfile as any)?.undertone} undertone, ${(classification.colorProfile as any)?.chroma} chroma, and ${(classification.colorProfile as any)?.contrastLevel} contrast.

Respond with ONLY valid JSON:
{
  "signatureColor": {"hex": "<hex>", "name": "<poetic name>"},
  "neutrals": [{"hex": "<hex>", "name": "<name>"}, ...],
  "statements": [{"hex": "<hex>", "name": "<name>"}, ...],
  "accents": [{"hex": "<hex>", "name": "<name>"}, ...]
}

Include 6-8 colors per category. Names should be evocative and specific (e.g., "Burnt Sienna", "Moss", "Warm Ivory").`;
}

function colorStoryPrompt(classification: Record<string, unknown>): string {
  return `Write a warm, personal color story for a ${classification.season} with ${(classification.colorProfile as any)?.undertone} undertone and ${(classification.colorProfile as any)?.chroma} chroma.

Respond with ONLY valid JSON:
{
  "narrative": "<2-3 paragraph personal narrative about their coloring, written warmly>",
  "poeticOneLiner": "<one poetic sentence, e.g. 'Warm, muted, golden — like sunlight through autumn leaves'>",
  "keyTraits": [{"label": "<trait>", "description": "<brief>"}]
}`;
}

function styleGuidePrompt(classification: Record<string, unknown>): string {
  return `Create a personalized style lookbook for a ${classification.season}.

Respond with ONLY valid JSON:
{
  "outfits": [
    {
      "name": "<occasion name, e.g. 'The Weekend'>",
      "description": "<full outfit description>",
      "pieces": [{"item": "<piece description>", "color": {"hex": "<hex>", "name": "<name>"}}]
    }
  ],
  "bestPatterns": ["<pattern>"],
  "bestFabrics": ["<fabric>"],
  "patternsToAvoid": ["<pattern>"]
}

Create 4-5 distinct outfit concepts for different occasions.`;
}

function makeupGuidePrompt(classification: Record<string, unknown>): string {
  return `Create a makeup guide for a ${classification.season} with ${(classification.colorProfile as any)?.undertone} undertone.

Respond with ONLY valid JSON:
{
  "foundationTone": "<warm/cool/neutral tone guidance>",
  "lipColors": [{"hex": "<hex>", "name": "<name>"}],
  "eyeShadows": [{"hex": "<hex>", "name": "<name>"}],
  "blushColors": [{"hex": "<hex>", "name": "<name>"}],
  "yourRed": {"hex": "<hex>", "name": "<name, e.g. 'Your perfect red'>"}
}

Include 6 lip colors (nude to bold), 6 eyeshadow shades, and 3 blush options.`;
}

function hairGuidePrompt(classification: Record<string, unknown>): string {
  return `Create a hair color guide for a ${classification.season}.

Respond with ONLY valid JSON:
{
  "bestColors": [{"hex": "<hex>", "name": "<salon-friendly name>"}],
  "colorsToAvoid": [{"hex": "<hex>", "name": "<name>"}],
  "highlightRecommendation": "<specific recommendation>",
  "lowlightRecommendation": "<specific recommendation>",
  "salonTerminology": ["<professional term to ask for>"]
}

Include 4-5 best colors and 3-4 to avoid.`;
}

function jewelryGuidePrompt(classification: Record<string, unknown>): string {
  return `Create a jewelry and metals guide for a ${classification.season}.

Respond with ONLY valid JSON:
{
  "bestMetals": ["<metal>"],
  "metalsToMinimize": ["<metal>"],
  "gemstoneRecommendations": ["<gemstone>"]
}`;
}

function siblingsPrompt(classification: Record<string, unknown>): string {
  return `List 5-6 well-known celebrities who are ${classification.season} season type.

Respond with ONLY valid JSON:
{
  "celebrities": [
    {"name": "<full name>", "description": "<brief note about their coloring>"}
  ]
}

Choose recognizable, diverse celebrities.`;
}

function avoidColorsPrompt(classification: Record<string, unknown>): string {
  return `List 8-10 colors that a ${classification.season} should avoid.

Respond with ONLY valid JSON:
{
  "colorsToAvoid": [
    {"hex": "<hex>", "name": "<name>", "reason": "<brief, empathetic explanation>"}
  ]
}

Frame reasons with empathy: "competes with your natural warmth" not "makes you look bad".`;
}

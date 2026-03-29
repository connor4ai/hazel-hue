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
        modelId: 'us.anthropic.claude-3-7-sonnet-20250219-v1:0',
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

// ─── Prompts ─────────────────────────────────────────────────────

const COLORIST_SYSTEM_PROMPT = `You are a world-class personal color analyst trained in the Sci/ART method (developed by Kathryn Kalisz from the Munsell Institute). You combine professional draping methodology with rigorous color science — Munsell color system (Hue, Value, Chroma as independent perceptual dimensions) and CIE L*a*b* color space for precise measurement. You understand dermatological undertone assessment, the perceptual science of simultaneous contrast, and the continuous 12-season flow chart where adjacent "sister seasons" share a dominant characteristic. You are methodical, precise, and never guess — you analyze each dimension independently before combining. Any person of any ethnicity can be any season; you assess undertone, not skin depth. Always respond with valid JSON matching the requested schema.`;

const CLASSIFICATION_PROMPT = `You are performing a professional 12-season color analysis on this person's photo using the Sci/ART methodology. Follow this rigorous step-by-step process:

## STEP 1: ASSESS LIGHTING CONDITIONS
Before analyzing coloring, evaluate the photo's lighting:
- Is it daylight, warm indoor light, cool fluorescent, or mixed?
- Is the white balance neutral or shifted warm/cool?
- Are there strong color casts from clothing or background?
- Mentally compensate for any non-neutral lighting when assessing skin undertone. If the photo has warm/orange lighting, the skin will appear warmer than it naturally is — adjust accordingly.

## STEP 2: EXTRACT COLOR DATA (CIE L*a*b* framework)
Sample the dominant colors from three regions, thinking in perceptual terms:

- **Skin**: Sample from forehead, cheek, and jawline (avoiding shadowed areas and areas affected by redness/blemishes). Determine the BASE undertone beneath any surface overtone:
  - Yellow/golden/peachy base → warm undertone (higher b* in Lab space)
  - Pink/rosy/blue base → cool undertone (higher a* relative to b*)
  - Olive: look BENEATH the olive cast — olive can be warm-olive (yellow base) OR cool-olive (blue-gray base)
  - Note the Munsell Value (lightness: very fair → very deep) and Chroma (how saturated/clear vs. muted/grayed the skin appears)

- **Hair**: Sample from root/mid-shaft (most natural area). Classify:
  - Temperature: golden/auburn/copper/strawberry/warm brown = warm; ash/cool brown/blue-black = cool; medium brown with no strong cast = neutral
  - Depth: light (blonde range), medium (brown range), deep (dark brown to black)
  - Clarity: does the hair look rich and clear, or dusty and muted?

- **Eyes**: Identify the dominant iris color and patterns:
  - Warm indicators: golden/amber flecks, warm brown, green with gold, hazel with warm tones
  - Cool indicators: icy blue, steel gray, cool dark brown/espresso, green with gray
  - Note saturation: vivid/jewel-like eyes = high chroma; grayed/blended eyes = low chroma

## STEP 3: DETERMINE THE THREE MUNSELL DIMENSIONS
These three perceptually independent dimensions are the scientific basis for the 12-season system:

1. **HUE → Temperature (Warm vs Cool)**
   The MOST important dimension — determines the season family (Spring/Autumn = warm, Summer/Winter = cool).
   - Skin undertone is the primary indicator. Hair and eye temperature should confirm, but skin undertone takes precedence.
   - If skin reads clearly warm or cool, classify accordingly.
   - If neutral/ambiguous, look at whether warm or cool colors in their features dominate overall.

2. **VALUE → Depth (Light vs Medium vs Deep)**
   Assess the OVERALL lightness/darkness of all features combined:
   - Light: fair skin + lighter hair + lighter eyes (features float toward the light end of the value scale)
   - Medium: moderate depth across features (neither strikingly light nor dark)
   - Deep: dark hair + deeper skin tone + darker eyes (features cluster toward the dark end)

3. **CHROMA → Clarity (Bright/Clear vs Soft/Muted)**
   How saturated, vivid, and pure are the features?
   - Bright/Clear: vivid eye color, clear skin, features look "HD" and distinct. High color intensity.
   - Soft/Muted: dusty, blended, grayed-down coloring. Features seem to blend together rather than stand out individually. Lower color intensity.

   Natural correlations to be aware of (but don't assume — verify):
   - Warm + Light tends toward higher chroma naturally (Spring)
   - Cool + Light tends toward lower chroma naturally (Summer)
   - Warm + Dark tends toward lower chroma naturally (Autumn)
   - Cool + Dark tends toward higher chroma naturally (Winter)

## STEP 4: DETERMINE CONTRAST LEVEL
Contrast = the VALUE difference between the lightest and darkest features (typically skin vs hair):
- **Low contrast**: Hair, skin, and eyes are similar in depth. Features blend together.
- **Medium contrast**: Moderate difference between features.
- **High contrast**: Stark difference — e.g., very dark hair with very light skin, or very light eyes against dark features.

## STEP 5: MAP TO ONE OF 12 SEASONS
Each season has a **dominant** characteristic (the most important trait) and a **secondary** one. The 12 seasons form a continuous cycle — adjacent seasons are "sister seasons" that share their dominant trait:

**SPRING (Warm base) — warm undertone is present in all Springs**
- LIGHT_SPRING: Dominant = Light, Secondary = Warm. Very fair, delicate warm coloring. Low contrast. Light golden/honey hair, light warm eyes (blue-green, light hazel, light warm brown), peachy/ivory skin with warm glow. Sister to Light Summer (both light, but this one is warm).
- TRUE_SPRING: Dominant = Warm, Secondary = Clear. The purest warm season. Medium value, clear saturated warmth throughout. Golden/strawberry/warm brown hair, warm green/hazel/topaz eyes, golden-peachy skin. Warmth is unmistakable.
- BRIGHT_SPRING: Dominant = Bright/Clear, Secondary = Warm. High chroma + warm lean. Can have dark hair with light warm skin (high contrast). Vivid, saturated, "electric" coloring. Striking eye color. Sister to Bright Winter (both bright, but this one is warm).

**SUMMER (Cool base) — cool undertone is present in all Summers**
- LIGHT_SUMMER: Dominant = Light, Secondary = Cool. Very fair, delicate cool coloring. Low contrast. Ash-blonde/light ash-brown hair, light cool eyes (soft blue, gray-blue, light cool gray), rosy/pink-toned skin. Sister to Light Spring (both light, but this one is cool).
- TRUE_SUMMER: Dominant = Cool, Secondary = Soft. The purest cool muted season. Medium-light value. Ash-toned/cool brown hair, cool blue/gray/soft green eyes, pink-toned/rosy skin with blue undertone. Coolness is the defining trait.
- SOFT_SUMMER: Dominant = Soft/Muted, Secondary = Cool. Most muted cool season. Blended, low-contrast, neutral-cool. Mousy/ash-brown hair, grayed/muted eyes (gray, gray-green, soft hazel), neutral-cool skin. Features seem "soft-focus." Sister to Soft Autumn (both muted, but this one leans cool).

**AUTUMN (Warm base) — warm undertone is present in all Autumns**
- SOFT_AUTUMN: Dominant = Soft/Muted, Secondary = Warm. Most muted warm season. Blended, low-contrast, neutral-warm. Golden-brown/mousy hair, hazel/warm muted green/amber eyes, warm but muted skin. Features are "soft-focus" with warmth. Sister to Soft Summer (both muted, but this one leans warm).
- TRUE_AUTUMN: Dominant = Warm, Secondary = Rich/Earthy. The purest warm muted season. Medium-dark value. Rich auburn/chestnut/warm brown hair, warm brown/green/hazel eyes, golden/warm olive skin. Rich warmth without high clarity.
- DEEP_AUTUMN: Dominant = Deep/Dark, Secondary = Warm. Dark + warm. Deep brown/black hair with warm or golden cast, dark warm brown/deep hazel eyes, olive/warm deeper skin tones. Rich depth with warm undertone. Sister to Deep Winter (both deep, but this one is warm).

**WINTER (Cool base) — cool undertone is present in all Winters**
- DEEP_WINTER: Dominant = Deep/Dark, Secondary = Cool. Dark + cool. Very dark hair (cool brown to black), dark cool brown/near-black eyes, deeper skin with cool or neutral-cool undertone. Dramatic depth without warmth. Sister to Deep Autumn (both deep, but this one is cool).
- TRUE_WINTER: Dominant = Cool, Secondary = Clear. The purest cool bright season. High contrast between features. Dark cool hair, striking cool eyes (deep brown, icy blue, cool gray), porcelain to deep skin with distinctly cool/blue undertone. Coolness and clarity define this season.
- BRIGHT_WINTER: Dominant = Bright/Clear, Secondary = Cool. Highest chroma + cool. The most vivid season. Very high contrast. Dark hair + very light skin OR deep skin with remarkably vivid/saturated features. Jewel-like eye color. Sister to Bright Spring (both bright, but this one is cool).

## STEP 6: DISTINGUISH SISTER SEASONS (CRITICAL)
If you're torn between two adjacent seasons, use these tiebreakers:
- **Light Spring vs Light Summer**: Does skin lean peachy-warm or rosy-cool? Does hair have golden or ash tones?
- **Bright Spring vs Bright Winter**: Do warm or cool drape colors theoretically flatter more? Is the undertone golden or pink?
- **Soft Summer vs Soft Autumn**: Same mutedness — is the underlying cast cool-gray or warm-golden?
- **Deep Autumn vs Deep Winter**: Same darkness — does the depth have a warm/golden cast or a cool/blue cast?
- **True Spring vs True Autumn**: Both warm — Spring is clearer/lighter, Autumn is more muted/deeper/earthier.
- **True Summer vs True Winter**: Both cool — Summer is softer/muted, Winter is clearer/more saturated.

## STEP 7: FINAL CROSS-CHECK
- Verify your classification is internally consistent: does the dominant characteristic genuinely dominate?
- Season applies regardless of ethnicity — focus on undertone, not skin depth. A person with deep skin can be a Spring; a person with fair skin can be a Winter.
- If you detect makeup, hair dye, or colored contacts, try to assess the NATURAL coloring beneath.
- Lower your confidence score when: lighting is poor, heavy makeup is present, hair appears dyed, or the person sits ambiguously between sister seasons.

Respond with ONLY valid JSON in this exact format:
{
  "season": "<one of: LIGHT_SPRING, TRUE_SPRING, BRIGHT_SPRING, LIGHT_SUMMER, TRUE_SUMMER, SOFT_SUMMER, SOFT_AUTUMN, TRUE_AUTUMN, DEEP_AUTUMN, DEEP_WINTER, TRUE_WINTER, BRIGHT_WINTER>",
  "confidenceScore": <0-100>,
  "colorProfile": {
    "undertone": "<warm|cool|neutral>",
    "chroma": "<bright|soft|muted>",
    "contrastLevel": "<low|medium|high>",
    "dominantSkinHex": "<hex color sampled from cheek area>",
    "dominantHairHex": "<hex color sampled from mid-shaft>",
    "dominantEyeHex": "<hex color sampled from iris>"
  },
  "reasoning": "<detailed explanation covering: (1) lighting assessment and any compensation applied, (2) skin undertone analysis — what hue/base do you see beneath the surface?, (3) hair temperature and depth, (4) eye color, saturation, and temperature, (5) overall contrast level, (6) the three Munsell dimensions (temperature/value/chroma) and which is dominant, (7) if sister seasons were considered, why this one won>"
}`;

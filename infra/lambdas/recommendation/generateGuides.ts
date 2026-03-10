import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { withMiddleware, getUserId, parseAndValidate } from '../shared/middleware';
import { getItem, putItem } from '../shared/dynamodb';
import { z } from 'zod';

const bedrock = new BedrockRuntimeClient({});
const BEDROCK_TIMEOUT_MS = 60_000;

const generateGuidesSchema = z.object({
  analysisId: z.string().uuid(),
});

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const body = parseAndValidate(event, generateGuidesSchema);

  // Load analysis metadata
  const metadata = await getItem(`ANALYSIS#${body.analysisId}`, 'METADATA');
  if (!metadata) {
    throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
  }
  if (metadata.userId !== userId) {
    throw Object.assign(new Error('Forbidden'), { statusCode: 403 });
  }
  if (metadata.status !== 'COMPLETED') {
    throw Object.assign(new Error('Analysis not yet complete'), { statusCode: 400 });
  }

  const season = metadata.season as string;
  const colorProfile = metadata.colorProfile as Record<string, string>;

  // Generate all guides in parallel
  const [makeup, hair, jewelry, siblings, avoid] = await Promise.all([
    generateSection(makeupPrompt(season, colorProfile), 'makeup'),
    generateSection(hairPrompt(season), 'hair'),
    generateSection(jewelryPrompt(season), 'jewelry'),
    generateSection(siblingsPrompt(season), 'siblings'),
    generateSection(avoidPrompt(season), 'avoid'),
  ]);

  // Store all results in parallel
  await Promise.all([
    putItem({ PK: `ANALYSIS#${body.analysisId}`, SK: 'RESULT#makeup', ...makeup }),
    putItem({ PK: `ANALYSIS#${body.analysisId}`, SK: 'RESULT#hair', ...hair }),
    putItem({ PK: `ANALYSIS#${body.analysisId}`, SK: 'RESULT#jewelry', ...jewelry }),
    putItem({ PK: `ANALYSIS#${body.analysisId}`, SK: 'RESULT#siblings', ...siblings }),
    putItem({ PK: `ANALYSIS#${body.analysisId}`, SK: 'RESULT#avoid', ...avoid }),
  ]);

  return {
    statusCode: 200,
    body: { makeup, hair, jewelry, siblings, avoid },
  };
});

async function generateSection(
  prompt: string,
  sectionName: string,
): Promise<Record<string, unknown>> {
  const raw = await invokeClaudeText(prompt);
  const cleaned = raw.replace(/^```(?:json)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error(`Failed to parse ${sectionName} response as JSON`);
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
          system: 'You are an expert personal color analyst with deep knowledge of seasonal color analysis, fashion, makeup artistry, and hair color theory. Always respond with valid JSON.',
          messages: [{ role: 'user', content: prompt }],
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

function makeupPrompt(season: string, colorProfile: Record<string, string>): string {
  return `Create a makeup guide for a ${season} with ${colorProfile?.undertone} undertone.

Respond with ONLY valid JSON:
{
  "foundationTone": "<warm/cool/neutral tone guidance>",
  "lipColors": [{"hex": "<hex>", "name": "<name>"}],
  "eyeShadows": [{"hex": "<hex>", "name": "<name>"}],
  "blushColors": [{"hex": "<hex>", "name": "<name>"}],
  "yourRed": {"hex": "<hex>", "name": "<name>"}
}

Include 6 lip colors (nude to bold), 6 eyeshadow shades, and 3 blush options.`;
}

function hairPrompt(season: string): string {
  return `Create a hair color guide for a ${season}.

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

function jewelryPrompt(season: string): string {
  return `Create a jewelry and metals guide for a ${season}.

Respond with ONLY valid JSON:
{
  "bestMetals": ["<metal>"],
  "metalsToMinimize": ["<metal>"],
  "gemstoneRecommendations": ["<gemstone>"]
}`;
}

function siblingsPrompt(season: string): string {
  return `List 5-6 well-known celebrities who are ${season} season type.

Respond with ONLY valid JSON:
{
  "celebrities": [
    {"name": "<full name>", "description": "<brief note about their coloring>"}
  ]
}

Choose recognizable, diverse celebrities.`;
}

function avoidPrompt(season: string): string {
  return `List 8-10 colors that a ${season} should avoid.

Respond with ONLY valid JSON:
{
  "colorsToAvoid": [
    {"hex": "<hex>", "name": "<name>", "reason": "<brief, empathetic explanation>"}
  ]
}

Frame reasons with empathy: "competes with your natural warmth" not "makes you look bad".`;
}

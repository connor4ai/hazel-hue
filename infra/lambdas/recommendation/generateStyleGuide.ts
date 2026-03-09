import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { withMiddleware, getUserId, parseAndValidate } from '../shared/middleware';
import { getItem, putItem } from '../shared/dynamodb';
import { z } from 'zod';

const bedrock = new BedrockRuntimeClient({});
const BEDROCK_TIMEOUT_MS = 60_000;

const generateStyleGuideSchema = z.object({
  analysisId: z.string().uuid(),
});

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const body = parseAndValidate(event, generateStyleGuideSchema);

  // Check if style guide already exists
  const existing = await getItem(`ANALYSIS#${body.analysisId}`, 'RESULT#styleguide');
  if (existing) {
    return { statusCode: 200, body: existing };
  }

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

  const prompt = `Create a personalized style lookbook for a ${season}.

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

  const result = await invokeClaudeText(prompt);
  const styleGuide = safeParseJson(result);

  await putItem({
    PK: `ANALYSIS#${body.analysisId}`,
    SK: 'RESULT#styleguide',
    ...styleGuide,
  });

  return { statusCode: 200, body: styleGuide };
});

function safeParseJson(raw: string): Record<string, unknown> {
  const cleaned = raw.replace(/^```(?:json)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error('Failed to parse style guide response as JSON');
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
          system: 'You are an expert personal color analyst and fashion stylist. Always respond with valid JSON matching the requested schema.',
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

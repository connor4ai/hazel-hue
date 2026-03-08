import { withMiddleware, getUserId, parseBody } from '../shared/middleware';
import { getItem, queryItems } from '../shared/dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const s3 = new S3Client({});
const ASSETS_BUCKET = process.env.ASSETS_BUCKET ?? process.env.PHOTO_BUCKET!;

interface ShareImageBody {
  analysisId: string;
}

/**
 * Generates a shareable image SVG for a user's color analysis results.
 * Returns a presigned URL to the generated image.
 */
export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const { analysisId } = parseBody<ShareImageBody>(event);

  // Verify ownership
  const metadata = await getItem(`ANALYSIS#${analysisId}`, 'METADATA');
  if (!metadata || metadata.userId !== userId) {
    throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
  }

  if (metadata.status !== 'COMPLETED') {
    throw Object.assign(new Error('Analysis not yet completed'), { statusCode: 400 });
  }

  // Get palette data
  const paletteData = await getItem(`ANALYSIS#${analysisId}`, 'RESULT#palette');
  const colorStory = await getItem(`ANALYSIS#${analysisId}`, 'RESULT#colorstory');

  const season = metadata.season as string;
  const displayName = season
    .split('_')
    .map((w: string) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');

  const poeticLine = (colorStory?.poeticOneLiner as string) ?? '';
  const signature = paletteData?.signatureColor as { hex: string; name: string } | undefined;
  const neutrals = (paletteData?.neutrals as { hex: string }[]) ?? [];
  const statements = (paletteData?.statements as { hex: string }[]) ?? [];
  const accents = (paletteData?.accents as { hex: string }[]) ?? [];

  // Combine first few colors from each category for the swatch row
  const swatchColors = [
    signature?.hex ?? '#C4A882',
    ...neutrals.slice(0, 3).map((c) => c.hex),
    ...statements.slice(0, 3).map((c) => c.hex),
    ...accents.slice(0, 2).map((c) => c.hex),
  ].slice(0, 8);

  // Generate SVG share image (1080x1920 for Instagram Stories)
  const svg = generateShareSvg(displayName, poeticLine, swatchColors);

  // Upload to S3
  const key = `share/${userId}/${randomUUID()}.svg`;
  await s3.send(
    new PutObjectCommand({
      Bucket: ASSETS_BUCKET,
      Key: key,
      Body: svg,
      ContentType: 'image/svg+xml',
    }),
  );

  // Generate presigned download URL (1 hour)
  const downloadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: ASSETS_BUCKET, Key: key }),
    { expiresIn: 3600 },
  );

  return {
    statusCode: 200,
    body: { downloadUrl, key },
  };
});

function generateShareSvg(
  seasonName: string,
  tagline: string,
  swatchColors: string[],
): string {
  const swatchSize = 100;
  const swatchGap = 16;
  const totalSwatchWidth = swatchColors.length * (swatchSize + swatchGap) - swatchGap;
  const swatchStartX = (1080 - totalSwatchWidth) / 2;

  const swatches = swatchColors
    .map(
      (hex, i) =>
        `<rect x="${swatchStartX + i * (swatchSize + swatchGap)}" y="1100" width="${swatchSize}" height="${swatchSize}" rx="12" fill="${hex}" />`,
    )
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDF6EE" />
      <stop offset="100%" stop-color="#F5EDE1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#bg)" />

  <!-- Brand -->
  <text x="540" y="200" text-anchor="middle" font-family="serif" font-size="36" fill="#A0845C" letter-spacing="4">
    HAZEL &amp; HUE
  </text>

  <!-- Decorative line -->
  <line x1="440" y1="260" x2="640" y2="260" stroke="#D4C5A9" stroke-width="1" />

  <!-- Season label -->
  <text x="540" y="500" text-anchor="middle" font-family="serif" font-size="28" fill="#9B8F80" letter-spacing="6">
    I AM A
  </text>

  <!-- Season name -->
  <text x="540" y="620" text-anchor="middle" font-family="serif" font-size="80" fill="#6B5B4E" font-weight="bold">
    ${seasonName}
  </text>

  <!-- Tagline -->
  <text x="540" y="740" text-anchor="middle" font-family="serif" font-size="28" fill="#9B8F80" font-style="italic">
    ${escapeXml(tagline.length > 60 ? tagline.slice(0, 57) + '...' : tagline)}
  </text>

  <!-- Decorative line -->
  <line x1="340" y1="840" x2="740" y2="840" stroke="#D4C5A9" stroke-width="1" />

  <!-- My Colors label -->
  <text x="540" y="1040" text-anchor="middle" font-family="serif" font-size="24" fill="#9B8F80" letter-spacing="4">
    MY COLORS
  </text>

  <!-- Color swatches -->
  ${swatches}

  <!-- CTA -->
  <text x="540" y="1500" text-anchor="middle" font-family="serif" font-size="24" fill="#A0845C">
    Discover yours at hazelandhue.com
  </text>

  <!-- Decorative line -->
  <line x1="440" y1="1540" x2="640" y2="1540" stroke="#D4C5A9" stroke-width="1" />

  <text x="540" y="1620" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#B0A695">
    $19 · AI-powered personal color analysis
  </text>
</svg>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

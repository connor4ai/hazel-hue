import { withMiddleware, getUserId, parseBody } from '../shared/middleware';
import { getItem } from '../shared/dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const s3 = new S3Client({});
const ASSETS_BUCKET = process.env.ASSETS_BUCKET ?? process.env.PHOTO_BUCKET!;

interface SalonCardBody {
  analysisId: string;
}

/**
 * Generates a salon instruction card SVG that users can show their hairstylist.
 * Contains hair color recommendations and professional terminology.
 */
export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const { analysisId } = parseBody<SalonCardBody>(event);

  const metadata = await getItem(`ANALYSIS#${analysisId}`, 'METADATA');
  if (!metadata || metadata.userId !== userId) {
    throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
  }

  const hairData = await getItem(`ANALYSIS#${analysisId}`, 'RESULT#hair');
  const paletteData = await getItem(`ANALYSIS#${analysisId}`, 'RESULT#palette');

  if (!hairData) {
    throw Object.assign(new Error('Hair guide not available'), { statusCode: 400 });
  }

  const season = (metadata.season as string)
    .split('_')
    .map((w: string) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');

  const bestColors = (hairData.bestColors as { hex: string; name: string }[]) ?? [];
  const colorsToAvoid = (hairData.colorsToAvoid as { hex: string; name: string }[]) ?? [];
  const highlights = (hairData.highlightRecommendation as string) ?? '';
  const lowlights = (hairData.lowlightRecommendation as string) ?? '';
  const salonTerms = (hairData.salonTerminology as string[]) ?? [];

  const svg = generateSalonCard({
    season,
    bestColors,
    colorsToAvoid,
    highlights,
    lowlights,
    salonTerms,
  });

  const key = `salon/${userId}/${randomUUID()}.svg`;
  await s3.send(
    new PutObjectCommand({
      Bucket: ASSETS_BUCKET,
      Key: key,
      Body: svg,
      ContentType: 'image/svg+xml',
    }),
  );

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

interface SalonCardData {
  season: string;
  bestColors: { hex: string; name: string }[];
  colorsToAvoid: { hex: string; name: string }[];
  highlights: string;
  lowlights: string;
  salonTerms: string[];
}

function generateSalonCard(data: SalonCardData): string {
  const bestSwatches = data.bestColors
    .slice(0, 4)
    .map(
      (c, i) =>
        `<rect x="${120 + i * 130}" y="480" width="110" height="60" rx="8" fill="${c.hex}" />
    <text x="${175 + i * 130}" y="565" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#6B5B4E">${escapeXml(c.name)}</text>`,
    )
    .join('\n    ');

  const avoidSwatches = data.colorsToAvoid
    .slice(0, 4)
    .map(
      (c, i) =>
        `<rect x="${120 + i * 130}" y="680" width="110" height="60" rx="8" fill="${c.hex}" />
    <text x="${175 + i * 130}" y="765" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#6B5B4E">${escapeXml(c.name)}</text>`,
    )
    .join('\n    ');

  const terms = data.salonTerms
    .slice(0, 5)
    .map(
      (term, i) =>
        `<text x="120" y="${1040 + i * 36}" font-family="sans-serif" font-size="18" fill="#6B5B4E">• ${escapeXml(term)}</text>`,
    )
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1300" width="800" height="1300">
  <!-- Background -->
  <rect width="800" height="1300" rx="24" fill="#FDF6EE" />
  <rect x="20" y="20" width="760" height="1260" rx="20" fill="none" stroke="#D4C5A9" stroke-width="1" />

  <!-- Header -->
  <text x="400" y="80" text-anchor="middle" font-family="serif" font-size="22" fill="#A0845C" letter-spacing="4">
    HAZEL &amp; HUE
  </text>
  <text x="400" y="130" text-anchor="middle" font-family="serif" font-size="16" fill="#B0A695">
    Salon Instruction Card
  </text>

  <line x1="200" y1="160" x2="600" y2="160" stroke="#D4C5A9" stroke-width="1" />

  <!-- Season -->
  <text x="400" y="220" text-anchor="middle" font-family="serif" font-size="18" fill="#9B8F80" letter-spacing="2">
    COLOR SEASON
  </text>
  <text x="400" y="280" text-anchor="middle" font-family="serif" font-size="42" fill="#6B5B4E" font-weight="bold">
    ${escapeXml(data.season)}
  </text>

  <line x1="200" y1="320" x2="600" y2="320" stroke="#D4C5A9" stroke-width="1" />

  <!-- Undertone info -->
  <text x="400" y="380" text-anchor="middle" font-family="serif" font-size="18" fill="#9B8F80" letter-spacing="2">
    BEST HAIR COLORS
  </text>

  <!-- Best color swatches -->
  ${bestSwatches}

  <!-- Colors to avoid -->
  <text x="400" y="650" text-anchor="middle" font-family="serif" font-size="16" fill="#9B8F80" letter-spacing="2">
    AVOID
  </text>
  ${avoidSwatches}

  <line x1="200" y1="810" x2="600" y2="810" stroke="#D4C5A9" stroke-width="1" />

  <!-- Highlight/Lowlight -->
  <text x="120" y="860" font-family="serif" font-size="18" fill="#9B8F80" letter-spacing="1">HIGHLIGHTS</text>
  <text x="120" y="890" font-family="sans-serif" font-size="16" fill="#6B5B4E">${escapeXml(truncate(data.highlights, 70))}</text>

  <text x="120" y="940" font-family="serif" font-size="18" fill="#9B8F80" letter-spacing="1">LOWLIGHTS</text>
  <text x="120" y="970" font-family="sans-serif" font-size="16" fill="#6B5B4E">${escapeXml(truncate(data.lowlights, 70))}</text>

  <!-- Professional terms -->
  <text x="400" y="1010" text-anchor="middle" font-family="serif" font-size="16" fill="#9B8F80" letter-spacing="2">
    ASK YOUR STYLIST FOR
  </text>
  ${terms}

  <!-- Footer -->
  <line x1="200" y1="1230" x2="600" y2="1230" stroke="#D4C5A9" stroke-width="1" />
  <text x="400" y="1270" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#B0A695">
    Generated by hazelandhue.com
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

function truncate(str: string, maxLen: number): string {
  return str.length > maxLen ? str.slice(0, maxLen - 3) + '...' : str;
}

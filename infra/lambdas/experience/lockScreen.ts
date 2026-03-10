import { withMiddleware, getUserId, parseAndValidate } from '../shared/middleware';
import { getItem } from '../shared/dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { z } from 'zod';

const s3 = new S3Client({});
const ASSETS_BUCKET = process.env.ASSETS_BUCKET ?? process.env.PHOTO_BUCKET!;

const lockScreenSchema = z.object({
  analysisId: z.string().uuid(),
  layout: z.enum(['gradient', 'swatches', 'minimal']),
});

/**
 * Generates a lock screen wallpaper SVG featuring the user's color palette.
 * Supports 3 layouts: gradient blend, swatch grid, or minimal with signature color.
 */
export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const { analysisId, layout } = parseAndValidate(event, lockScreenSchema);

  const metadata = await getItem(`ANALYSIS#${analysisId}`, 'METADATA');
  if (!metadata || metadata.userId !== userId) {
    throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
  }

  const paletteData = await getItem(`ANALYSIS#${analysisId}`, 'RESULT#palette');
  if (!paletteData) {
    throw Object.assign(new Error('Palette not available'), { statusCode: 400 });
  }

  const signature = paletteData.signatureColor as { hex: string; name: string };
  const neutrals = (paletteData.neutrals as { hex: string }[]) ?? [];
  const statements = (paletteData.statements as { hex: string }[]) ?? [];
  const accents = (paletteData.accents as { hex: string }[]) ?? [];

  const allColors = [
    signature.hex,
    ...neutrals.map((c) => c.hex),
    ...statements.map((c) => c.hex),
    ...accents.map((c) => c.hex),
  ];

  let svg: string;
  switch (layout) {
    case 'gradient':
      svg = generateGradientWallpaper(allColors.slice(0, 5));
      break;
    case 'swatches':
      svg = generateSwatchWallpaper(allColors.slice(0, 12));
      break;
    case 'minimal':
    default:
      svg = generateMinimalWallpaper(signature.hex, allColors[1] ?? '#FDF6EE');
      break;
  }

  const key = `lockscreen/${userId}/${randomUUID()}.svg`;
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
    body: { downloadUrl, key, layout },
  };
});

function generateGradientWallpaper(colors: string[]): string {
  const stops = colors
    .map((hex, i) => {
      const offset = (i / (colors.length - 1)) * 100;
      return `<stop offset="${offset}%" stop-color="${hex}" />`;
    })
    .join('\n      ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 2532" width="1170" height="2532">
  <defs>
    <linearGradient id="palette" x1="0" y1="0" x2="1" y2="1">
      ${stops}
    </linearGradient>
  </defs>
  <rect width="1170" height="2532" fill="url(#palette)" />
  <text x="585" y="2400" text-anchor="middle" font-family="serif" font-size="24" fill="white" opacity="0.5" letter-spacing="3">
    HAZEL &amp; HUE
  </text>
</svg>`;
}

function generateSwatchWallpaper(colors: string[]): string {
  const cols = 3;
  const rows = Math.ceil(colors.length / cols);
  const cellW = 1170 / cols;
  const cellH = 2532 / rows;

  const rects = colors
    .map((hex, i) => {
      const x = (i % cols) * cellW;
      const y = Math.floor(i / cols) * cellH;
      return `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${hex}" />`;
    })
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 2532" width="1170" height="2532">
  ${rects}
  <text x="585" y="2400" text-anchor="middle" font-family="serif" font-size="24" fill="white" opacity="0.5" letter-spacing="3">
    HAZEL &amp; HUE
  </text>
</svg>`;
}

function generateMinimalWallpaper(primary: string, secondary: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 2532" width="1170" height="2532">
  <rect width="1170" height="2532" fill="${secondary}" />
  <circle cx="585" cy="1100" r="200" fill="${primary}" />
  <text x="585" y="2400" text-anchor="middle" font-family="serif" font-size="24" fill="${primary}" opacity="0.6" letter-spacing="3">
    HAZEL &amp; HUE
  </text>
</svg>`;
}

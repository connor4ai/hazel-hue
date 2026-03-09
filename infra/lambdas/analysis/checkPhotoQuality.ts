import { withMiddleware, parseAndValidate } from '../shared/middleware';
import { z } from 'zod';

const qualityCheckSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  sizeBytes: z.number().int().positive(),
  format: z.string(),
  hasFace: z.boolean().optional(),
});

const MIN_RESOLUTION = 640;
const MAX_SIZE_BYTES = 10_485_760; // 10MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];

interface QualityIssue {
  code: string;
  message: string;
}

export const handler = withMiddleware(async (event) => {
  const body = parseAndValidate(event, qualityCheckSchema);
  const issues: QualityIssue[] = [];
  let score = 100;

  // Resolution check
  if (body.width < MIN_RESOLUTION || body.height < MIN_RESOLUTION) {
    issues.push({
      code: 'LOW_RESOLUTION',
      message: `Photo should be at least ${MIN_RESOLUTION}x${MIN_RESOLUTION}px. Yours is ${body.width}x${body.height}px.`,
    });
    score -= 40;
  }

  // File size check
  if (body.sizeBytes > MAX_SIZE_BYTES) {
    issues.push({
      code: 'FILE_TOO_LARGE',
      message: 'Photo must be under 10MB.',
    });
    score -= 20;
  }

  // Format check
  if (!SUPPORTED_FORMATS.includes(body.format.toLowerCase())) {
    issues.push({
      code: 'UNSUPPORTED_FORMAT',
      message: 'Please use JPEG, PNG, or HEIC format.',
    });
    score -= 30;
  }

  // Face detection (if provided by client-side check)
  if (body.hasFace === false) {
    issues.push({
      code: 'NO_FACE_DETECTED',
      message: 'We couldn\'t detect a face. Please take a clear, well-lit selfie.',
    });
    score -= 50;
  }

  // Aspect ratio check (prefer portrait or square)
  const aspectRatio = body.width / body.height;
  if (aspectRatio > 2 || aspectRatio < 0.4) {
    issues.push({
      code: 'BAD_ASPECT_RATIO',
      message: 'Please use a portrait or square photo for best results.',
    });
    score -= 10;
  }

  const qualityScore = Math.max(0, score);
  const passed = qualityScore >= 60 && issues.every((i) => i.code !== 'NO_FACE_DETECTED');

  return {
    statusCode: 200,
    body: {
      qualityScore,
      passed,
      issues,
    },
  };
});

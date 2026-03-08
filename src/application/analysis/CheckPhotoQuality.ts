import { createQualityScore, type QualityIssue, type QualityScore } from '@domain/analysis/entities/QualityScore';
import { PhotoQualityError } from '@domain/shared/errors/DomainError';
import { getQualityFeedback } from '@domain/analysis/entities/QualityScore';

export interface PhotoQualityInput {
  lighting: number;
  resolution: number;
  faceDetected: boolean;
  faceConfidence: number;
  issues: QualityIssue[];
}

/**
 * Use case: Validate photo quality before accepting it for analysis.
 * Returns the quality score, or throws if the photo is unacceptable.
 */
export function checkPhotoQuality(input: PhotoQualityInput): QualityScore {
  const score = createQualityScore(input);

  if (!score.acceptable) {
    const feedback = score.issues.map(getQualityFeedback);
    throw new PhotoQualityError(
      'Photo quality is not sufficient for accurate analysis',
      feedback,
    );
  }

  return score;
}

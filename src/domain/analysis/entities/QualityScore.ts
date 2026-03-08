/**
 * Pre-analysis validation of photo quality.
 * Used to reject bad photos before payment and processing.
 */
export interface QualityScore {
  overall: number; // 0-100
  lighting: number; // 0-100
  resolution: number; // 0-100
  faceDetected: boolean;
  faceConfidence: number; // 0-100
  issues: QualityIssue[];
  acceptable: boolean;
}

export type QualityIssue =
  | 'TOO_DARK'
  | 'TOO_BRIGHT'
  | 'LOW_RESOLUTION'
  | 'NO_FACE_DETECTED'
  | 'MULTIPLE_FACES'
  | 'FACE_TOO_SMALL'
  | 'HEAVY_FILTER'
  | 'HEAVY_MAKEUP';

export function createQualityScore(params: {
  lighting: number;
  resolution: number;
  faceDetected: boolean;
  faceConfidence: number;
  issues: QualityIssue[];
}): QualityScore {
  const overall = Math.round(
    (params.lighting * 0.3 +
      params.resolution * 0.2 +
      params.faceConfidence * 0.5),
  );

  return {
    ...params,
    overall,
    acceptable: overall >= 60 && params.faceDetected && params.issues.length === 0,
  };
}

export function getQualityFeedback(issue: QualityIssue): string {
  const feedback: Record<QualityIssue, string> = {
    TOO_DARK: 'Try moving to a brighter area or facing a window',
    TOO_BRIGHT: 'The lighting is too harsh — try moving away from direct sunlight',
    LOW_RESOLUTION: 'The photo resolution is too low — try moving closer',
    NO_FACE_DETECTED: 'We couldn\'t detect a face — make sure your face is clearly visible',
    MULTIPLE_FACES: 'We detected multiple faces — please take a solo photo',
    FACE_TOO_SMALL: 'Your face is too far from the camera — try moving closer',
    HEAVY_FILTER: 'Photo filters can affect results — try a natural, unfiltered photo',
    HEAVY_MAKEUP: 'Heavy makeup can affect accuracy — bare skin gives the best results',
  };
  return feedback[issue];
}

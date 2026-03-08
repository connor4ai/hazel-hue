import type { AnalysisId } from '@domain/shared/types';
import type { QualityScore } from './QualityScore';

export interface PhotoSubmission {
  analysisId: AnalysisId;
  s3Key: string;
  mimeType: 'image/jpeg' | 'image/png' | 'image/heic';
  sizeBytes: number;
  widthPx: number;
  heightPx: number;
  qualityScore: QualityScore;
  exifStripped: boolean;
  uploadedAt: string;
}

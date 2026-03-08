import { Season } from '@domain/shared/types';
import type {
  AnalysisId,
  UserId,
  ConfidenceScore,
  TenantId,
} from '@domain/shared/types';
import type { ColorProfile } from './ColorProfile';
import type { QualityScore } from './QualityScore';

export type AnalysisStatus =
  | 'PENDING'
  | 'PHOTO_UPLOADED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

/**
 * Analysis is the aggregate root for the Analysis bounded context.
 * Represents a single color analysis session — the core product.
 */
export interface Analysis {
  id: AnalysisId;
  userId: UserId;
  status: AnalysisStatus;
  photoKey: string | null;
  qualityScore: QualityScore | null;
  season: Season | null;
  colorProfile: ColorProfile | null;
  confidenceScore: ConfidenceScore | null;
  tenantId: TenantId | null;
  failureReason: string | null;
  createdAt: string;
  completedAt: string | null;
}

export function createAnalysis(
  id: AnalysisId,
  userId: UserId,
  tenantId?: TenantId,
): Analysis {
  return {
    id,
    userId,
    status: 'PENDING',
    photoKey: null,
    qualityScore: null,
    season: null,
    colorProfile: null,
    confidenceScore: null,
    tenantId: tenantId ?? null,
    failureReason: null,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
}

export function markPhotoUploaded(
  analysis: Analysis,
  photoKey: string,
  qualityScore: QualityScore,
): Analysis {
  return {
    ...analysis,
    status: 'PHOTO_UPLOADED',
    photoKey,
    qualityScore,
  };
}

export function markProcessing(analysis: Analysis): Analysis {
  return { ...analysis, status: 'PROCESSING' };
}

export function markCompleted(
  analysis: Analysis,
  season: Season,
  colorProfile: ColorProfile,
  confidenceScore: ConfidenceScore,
): Analysis {
  return {
    ...analysis,
    status: 'COMPLETED',
    season,
    colorProfile,
    confidenceScore,
    completedAt: new Date().toISOString(),
  };
}

export function markFailed(
  analysis: Analysis,
  reason: string,
): Analysis {
  return {
    ...analysis,
    status: 'FAILED',
    failureReason: reason,
  };
}

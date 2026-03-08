import type { AnalysisId, UserId } from '@domain/shared/types';
import { createAnalysis, markPhotoUploaded } from '@domain/analysis/entities/Analysis';
import type { QualityScore } from '@domain/analysis/entities/QualityScore';
import type { IAnalysisRepository } from '@domain/analysis/repositories/IAnalysisRepository';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';
import { hasValidEntitlement } from '@domain/user/services/EntitlementChecker';
import { EntitlementError } from '@domain/shared/errors/DomainError';

export interface RequestAnalysisInput {
  analysisId: AnalysisId;
  userId: UserId;
  photoKey: string;
  qualityScore: QualityScore;
}

export interface RequestAnalysisDeps {
  analysisRepo: IAnalysisRepository;
  userRepo: IUserRepository;
}

/**
 * Use case: User requests a new color analysis.
 * Validates entitlement, creates analysis record, marks photo as uploaded.
 */
export async function requestAnalysis(
  input: RequestAnalysisInput,
  deps: RequestAnalysisDeps,
): Promise<void> {
  // Check entitlement
  const entitlements = await deps.userRepo.getEntitlements(input.userId);
  if (!hasValidEntitlement(entitlements, 'ANALYSIS')) {
    throw new EntitlementError();
  }

  // Create analysis
  const analysis = createAnalysis(input.analysisId, input.userId);
  const withPhoto = markPhotoUploaded(analysis, input.photoKey, input.qualityScore);

  await deps.analysisRepo.create(withPhoto);
}

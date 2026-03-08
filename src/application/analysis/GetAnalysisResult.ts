import type { AnalysisId } from '@domain/shared/types';
import type { Analysis } from '@domain/analysis/entities/Analysis';
import type { IAnalysisRepository } from '@domain/analysis/repositories/IAnalysisRepository';
import { AnalysisError } from '@domain/shared/errors/DomainError';

export interface GetAnalysisResultDeps {
  analysisRepo: IAnalysisRepository;
}

/**
 * Use case: Retrieve an analysis result by ID.
 */
export async function getAnalysisResult(
  analysisId: AnalysisId,
  deps: GetAnalysisResultDeps,
): Promise<Analysis> {
  const analysis = await deps.analysisRepo.getById(analysisId);
  if (!analysis) {
    throw new AnalysisError(`Analysis ${analysisId} not found`);
  }
  return analysis;
}

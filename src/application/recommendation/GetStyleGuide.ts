import type { AnalysisId } from '@domain/shared/types';
import type { IAnalysisRepository } from '@domain/analysis/repositories/IAnalysisRepository';

export interface GetStyleGuideInput {
  analysisId: AnalysisId;
}

export interface GetStyleGuideDeps {
  analysisRepo: IAnalysisRepository;
}

/**
 * Use case: Retrieve the generated style guide for a completed analysis.
 */
export async function getStyleGuide(
  input: GetStyleGuideInput,
  deps: GetStyleGuideDeps,
) {
  const analysis = await deps.analysisRepo.getById(input.analysisId);

  if (!analysis) {
    throw new Error('Analysis not found');
  }

  if (analysis.status !== 'COMPLETED') {
    throw new Error('Analysis is not yet complete');
  }

  return analysis;
}

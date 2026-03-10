import type { AnalysisId } from '@domain/shared/types';
import type { IAnalysisRepository } from '@domain/analysis/repositories/IAnalysisRepository';

export interface GetPaletteInput {
  analysisId: AnalysisId;
}

export interface GetPaletteDeps {
  analysisRepo: IAnalysisRepository;
}

/**
 * Use case: Retrieve the generated palette for a completed analysis.
 */
export async function getPalette(
  input: GetPaletteInput,
  deps: GetPaletteDeps,
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

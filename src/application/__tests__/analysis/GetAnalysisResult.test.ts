import { getAnalysisResult } from '@application/analysis/GetAnalysisResult';
import { AnalysisError } from '@domain/shared/errors/DomainError';
import { createAnalysis } from '@domain/analysis/entities/Analysis';
import { createAnalysisId, createUserId } from '@domain/shared/types/ValueObjects';
import type { IAnalysisRepository } from '@domain/analysis/repositories/IAnalysisRepository';

const analysisId = createAnalysisId('analysis-123');
const userId = createUserId('user-456');

function mockAnalysisRepo(analysis = createAnalysis(analysisId, userId)): jest.Mocked<IAnalysisRepository> {
  return {
    create: jest.fn(),
    getById: jest.fn().mockResolvedValue(analysis),
    getByUserId: jest.fn(),
    update: jest.fn(),
  };
}

describe('GetAnalysisResult use case', () => {
  it('returns analysis when found', async () => {
    const repo = mockAnalysisRepo();
    const result = await getAnalysisResult(analysisId, { analysisRepo: repo });

    expect(result.id).toBe(analysisId);
    expect(repo.getById).toHaveBeenCalledWith(analysisId);
  });

  it('throws AnalysisError when not found', async () => {
    const repo = mockAnalysisRepo();
    repo.getById.mockResolvedValue(null);

    await expect(
      getAnalysisResult(analysisId, { analysisRepo: repo }),
    ).rejects.toThrow(AnalysisError);
  });
});

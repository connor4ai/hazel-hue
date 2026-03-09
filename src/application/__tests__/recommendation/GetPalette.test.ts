import { getPalette } from '@application/recommendation/GetPalette';
import { createAnalysis, markCompleted } from '@domain/analysis/entities/Analysis';
import { Season } from '@domain/shared/types/Season';
import { createAnalysisId, createUserId, createConfidenceScore } from '@domain/shared/types/ValueObjects';
import type { IAnalysisRepository } from '@domain/analysis/repositories/IAnalysisRepository';

const analysisId = createAnalysisId('analysis-123');
const userId = createUserId('user-456');

const colorProfile = {
  undertone: 'warm' as const,
  chroma: 'bright' as const,
  contrastLevel: 'high' as const,
  dominantSkinHex: '#E8B89D',
  dominantHairHex: '#3B2314',
  dominantEyeHex: '#6B4226',
};

function mockRepo(status: 'COMPLETED' | 'PENDING' | null = 'COMPLETED'): jest.Mocked<IAnalysisRepository> {
  let analysis = null;
  if (status === 'COMPLETED') {
    analysis = markCompleted(
      createAnalysis(analysisId, userId),
      Season.BrightSpring,
      colorProfile,
      createConfidenceScore(90),
    );
  } else if (status === 'PENDING') {
    analysis = createAnalysis(analysisId, userId);
  }

  return {
    create: jest.fn(),
    getById: jest.fn().mockResolvedValue(analysis),
    getByUserId: jest.fn(),
    update: jest.fn(),
  };
}

describe('GetPalette use case', () => {
  it('returns completed analysis', async () => {
    const repo = mockRepo('COMPLETED');
    const result = await getPalette({ analysisId }, { analysisRepo: repo });

    expect(result.status).toBe('COMPLETED');
  });

  it('throws when analysis not found', async () => {
    const repo = mockRepo(null);

    await expect(
      getPalette({ analysisId }, { analysisRepo: repo }),
    ).rejects.toThrow('Analysis not found');
  });

  it('throws when analysis not yet complete', async () => {
    const repo = mockRepo('PENDING');

    await expect(
      getPalette({ analysisId }, { analysisRepo: repo }),
    ).rejects.toThrow('Analysis is not yet complete');
  });
});

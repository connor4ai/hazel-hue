import { requestAnalysis } from '@application/analysis/RequestAnalysis';
import { EntitlementError } from '@domain/shared/errors/DomainError';
import { createEntitlement } from '@domain/user/entities/Entitlement';
import { createAnalysisId, createUserId, createPurchaseId } from '@domain/shared/types/ValueObjects';
import type { IAnalysisRepository } from '@domain/analysis/repositories/IAnalysisRepository';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';
import type { QualityScore } from '@domain/analysis/entities/QualityScore';

const userId = createUserId('user-123');
const analysisId = createAnalysisId('analysis-456');
const purchaseId = createPurchaseId('purchase-789');

const mockQualityScore: QualityScore = {
  overall: 85,
  lighting: 90,
  resolution: 80,
  faceDetected: true,
  faceConfidence: 95,
  issues: [],
  acceptable: true,
};

function mockAnalysisRepo(): jest.Mocked<IAnalysisRepository> {
  return {
    create: jest.fn(),
    getById: jest.fn(),
    getByUserId: jest.fn(),
    update: jest.fn(),
  };
}

function mockUserRepo(hasEntitlement = true): jest.Mocked<IUserRepository> {
  const entitlements = hasEntitlement
    ? [createEntitlement(userId, 'ANALYSIS', purchaseId)]
    : [];

  return {
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    getPurchases: jest.fn(),
    createPurchase: jest.fn(),
    updatePurchase: jest.fn(),
    getEntitlements: jest.fn().mockResolvedValue(entitlements),
    createEntitlement: jest.fn(),
    updateEntitlement: jest.fn(),
  };
}

describe('RequestAnalysis use case', () => {
  it('creates analysis when user has valid entitlement', async () => {
    const analysisRepo = mockAnalysisRepo();
    const userRepo = mockUserRepo(true);

    await requestAnalysis(
      { analysisId, userId, photoKey: 'photos/test.jpg', qualityScore: mockQualityScore },
      { analysisRepo, userRepo },
    );

    expect(analysisRepo.create).toHaveBeenCalledTimes(1);
    const createdAnalysis = analysisRepo.create.mock.calls[0][0];
    expect(createdAnalysis.status).toBe('PHOTO_UPLOADED');
    expect(createdAnalysis.photoKey).toBe('photos/test.jpg');
  });

  it('throws EntitlementError when user has no entitlement', async () => {
    const analysisRepo = mockAnalysisRepo();
    const userRepo = mockUserRepo(false);

    await expect(
      requestAnalysis(
        { analysisId, userId, photoKey: 'photos/test.jpg', qualityScore: mockQualityScore },
        { analysisRepo, userRepo },
      ),
    ).rejects.toThrow(EntitlementError);

    expect(analysisRepo.create).not.toHaveBeenCalled();
  });
});

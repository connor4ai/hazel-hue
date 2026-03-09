import {
  createAnalysis,
  markPhotoUploaded,
  markProcessing,
  markCompleted,
  markFailed,
} from '@domain/analysis/entities/Analysis';
import { Season } from '@domain/shared/types/Season';
import { createAnalysisId, createUserId, createConfidenceScore } from '@domain/shared/types/ValueObjects';
import type { ColorProfile } from '@domain/analysis/entities/ColorProfile';
import type { QualityScore } from '@domain/analysis/entities/QualityScore';

const userId = createUserId('user-123');
const analysisId = createAnalysisId('analysis-456');

const mockQualityScore: QualityScore = {
  overall: 85,
  lighting: 90,
  resolution: 80,
  faceDetected: true,
  faceConfidence: 95,
  issues: [],
  acceptable: true,
};

const mockColorProfile: ColorProfile = {
  undertone: 'warm',
  chroma: 'bright',
  contrastLevel: 'high',
  dominantSkinHex: '#E8B89D',
  dominantHairHex: '#3B2314',
  dominantEyeHex: '#6B4226',
};

describe('Analysis entity', () => {
  describe('createAnalysis', () => {
    it('creates a pending analysis with correct defaults', () => {
      const analysis = createAnalysis(analysisId, userId);

      expect(analysis.id).toBe(analysisId);
      expect(analysis.userId).toBe(userId);
      expect(analysis.status).toBe('PENDING');
      expect(analysis.photoKey).toBeNull();
      expect(analysis.qualityScore).toBeNull();
      expect(analysis.season).toBeNull();
      expect(analysis.colorProfile).toBeNull();
      expect(analysis.confidenceScore).toBeNull();
      expect(analysis.tenantId).toBeNull();
      expect(analysis.failureReason).toBeNull();
      expect(analysis.completedAt).toBeNull();
      expect(analysis.createdAt).toBeDefined();
    });

    it('accepts optional tenantId', () => {
      const { createTenantId } = require('@domain/shared/types/ValueObjects');
      const tenantId = createTenantId('tenant-789');
      const analysis = createAnalysis(analysisId, userId, tenantId);

      expect(analysis.tenantId).toBe(tenantId);
    });
  });

  describe('markPhotoUploaded', () => {
    it('transitions to PHOTO_UPLOADED with photo key and quality score', () => {
      const analysis = createAnalysis(analysisId, userId);
      const updated = markPhotoUploaded(analysis, 'photos/test.jpg', mockQualityScore);

      expect(updated.status).toBe('PHOTO_UPLOADED');
      expect(updated.photoKey).toBe('photos/test.jpg');
      expect(updated.qualityScore).toEqual(mockQualityScore);
      expect(updated.id).toBe(analysisId);
    });
  });

  describe('markProcessing', () => {
    it('transitions to PROCESSING', () => {
      const analysis = createAnalysis(analysisId, userId);
      const updated = markProcessing(analysis);

      expect(updated.status).toBe('PROCESSING');
      expect(updated.id).toBe(analysisId);
    });
  });

  describe('markCompleted', () => {
    it('transitions to COMPLETED with season, color profile, and confidence', () => {
      const analysis = createAnalysis(analysisId, userId);
      const confidence = createConfidenceScore(87);
      const updated = markCompleted(
        analysis,
        Season.BrightSpring,
        mockColorProfile,
        confidence,
      );

      expect(updated.status).toBe('COMPLETED');
      expect(updated.season).toBe(Season.BrightSpring);
      expect(updated.colorProfile).toEqual(mockColorProfile);
      expect(updated.confidenceScore).toBe(confidence);
      expect(updated.completedAt).toBeDefined();
    });
  });

  describe('markFailed', () => {
    it('transitions to FAILED with a reason', () => {
      const analysis = createAnalysis(analysisId, userId);
      const updated = markFailed(analysis, 'Bedrock timeout');

      expect(updated.status).toBe('FAILED');
      expect(updated.failureReason).toBe('Bedrock timeout');
    });
  });

  describe('immutability', () => {
    it('does not mutate the original analysis', () => {
      const original = createAnalysis(analysisId, userId);
      markPhotoUploaded(original, 'photos/test.jpg', mockQualityScore);

      expect(original.status).toBe('PENDING');
      expect(original.photoKey).toBeNull();
    });
  });
});

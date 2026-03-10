import {
  createAnalysisRequestedEvent,
  createAnalysisCompletedEvent,
  createAnalysisFailedEvent,
} from '@domain/analysis/events/AnalysisEvents';
import { Season } from '@domain/shared/types/Season';
import {
  createAnalysisId,
  createUserId,
  createConfidenceScore,
} from '@domain/shared/types/ValueObjects';

const analysisId = createAnalysisId('analysis-123');
const userId = createUserId('user-456');

describe('AnalysisEvents', () => {
  describe('createAnalysisRequestedEvent', () => {
    it('creates event with correct type and fields', () => {
      const event = createAnalysisRequestedEvent(analysisId, userId, 'photos/test.jpg');

      expect(event.eventType).toBe('ANALYSIS_REQUESTED');
      expect(event.analysisId).toBe(analysisId);
      expect(event.userId).toBe(userId);
      expect(event.photoKey).toBe('photos/test.jpg');
      expect(event.timestamp).toBeDefined();
    });
  });

  describe('createAnalysisCompletedEvent', () => {
    it('creates event with season and confidence', () => {
      const confidence = createConfidenceScore(92);
      const event = createAnalysisCompletedEvent(
        analysisId,
        userId,
        Season.TrueAutumn,
        confidence,
      );

      expect(event.eventType).toBe('ANALYSIS_COMPLETED');
      expect(event.season).toBe(Season.TrueAutumn);
      expect(event.confidenceScore).toBe(confidence);
    });
  });

  describe('createAnalysisFailedEvent', () => {
    it('creates event with failure reason', () => {
      const event = createAnalysisFailedEvent(analysisId, userId, 'Model timeout');

      expect(event.eventType).toBe('ANALYSIS_FAILED');
      expect(event.reason).toBe('Model timeout');
    });
  });
});

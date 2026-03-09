import {
  createQualityScore,
  getQualityFeedback,
  type QualityIssue,
} from '@domain/analysis/entities/QualityScore';

describe('QualityScore', () => {
  describe('createQualityScore', () => {
    it('calculates overall score as weighted average', () => {
      const score = createQualityScore({
        lighting: 80,
        resolution: 70,
        faceDetected: true,
        faceConfidence: 90,
        issues: [],
      });

      // 80*0.3 + 70*0.2 + 90*0.5 = 24 + 14 + 45 = 83
      expect(score.overall).toBe(83);
    });

    it('marks as acceptable when score >= 60, face detected, and no issues', () => {
      const score = createQualityScore({
        lighting: 80,
        resolution: 70,
        faceDetected: true,
        faceConfidence: 90,
        issues: [],
      });

      expect(score.acceptable).toBe(true);
    });

    it('marks as unacceptable when no face detected', () => {
      const score = createQualityScore({
        lighting: 80,
        resolution: 70,
        faceDetected: false,
        faceConfidence: 0,
        issues: [],
      });

      expect(score.acceptable).toBe(false);
    });

    it('marks as unacceptable when there are issues', () => {
      const score = createQualityScore({
        lighting: 80,
        resolution: 70,
        faceDetected: true,
        faceConfidence: 90,
        issues: ['TOO_DARK'],
      });

      expect(score.acceptable).toBe(false);
    });

    it('marks as unacceptable when overall score < 60', () => {
      const score = createQualityScore({
        lighting: 20,
        resolution: 20,
        faceDetected: true,
        faceConfidence: 20,
        issues: [],
      });

      // 20*0.3 + 20*0.2 + 20*0.5 = 6+4+10 = 20
      expect(score.overall).toBe(20);
      expect(score.acceptable).toBe(false);
    });

    it('rounds the overall score', () => {
      const score = createQualityScore({
        lighting: 71,
        resolution: 73,
        faceDetected: true,
        faceConfidence: 77,
        issues: [],
      });

      // 71*0.3 + 73*0.2 + 77*0.5 = 21.3 + 14.6 + 38.5 = 74.4 → 74
      expect(score.overall).toBe(74);
    });
  });

  describe('getQualityFeedback', () => {
    const allIssues: QualityIssue[] = [
      'TOO_DARK',
      'TOO_BRIGHT',
      'LOW_RESOLUTION',
      'NO_FACE_DETECTED',
      'MULTIPLE_FACES',
      'FACE_TOO_SMALL',
      'HEAVY_FILTER',
      'HEAVY_MAKEUP',
    ];

    it.each(allIssues)('returns feedback string for %s', (issue) => {
      const feedback = getQualityFeedback(issue);
      expect(typeof feedback).toBe('string');
      expect(feedback.length).toBeGreaterThan(0);
    });
  });
});

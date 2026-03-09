import { checkPhotoQuality } from '@application/analysis/CheckPhotoQuality';
import { PhotoQualityError } from '@domain/shared/errors/DomainError';

describe('CheckPhotoQuality use case', () => {
  it('returns quality score for an acceptable photo', () => {
    const score = checkPhotoQuality({
      lighting: 80,
      resolution: 70,
      faceDetected: true,
      faceConfidence: 90,
      issues: [],
    });

    expect(score.acceptable).toBe(true);
    expect(score.overall).toBeGreaterThanOrEqual(60);
  });

  it('throws PhotoQualityError for unacceptable photo', () => {
    expect(() =>
      checkPhotoQuality({
        lighting: 20,
        resolution: 20,
        faceDetected: false,
        faceConfidence: 0,
        issues: ['NO_FACE_DETECTED', 'TOO_DARK'],
      }),
    ).toThrow(PhotoQualityError);
  });

  it('includes feedback messages in the error', () => {
    try {
      checkPhotoQuality({
        lighting: 80,
        resolution: 70,
        faceDetected: true,
        faceConfidence: 90,
        issues: ['TOO_DARK'],
      });
      fail('Expected error');
    } catch (err) {
      expect(err).toBeInstanceOf(PhotoQualityError);
      expect((err as PhotoQualityError).qualityIssues.length).toBeGreaterThan(0);
    }
  });
});

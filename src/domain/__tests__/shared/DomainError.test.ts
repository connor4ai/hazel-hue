import {
  DomainError,
  PhotoQualityError,
  EntitlementError,
  AnalysisError,
  PaymentError,
} from '@domain/shared/errors/DomainError';

describe('DomainError', () => {
  it('creates error with message and code', () => {
    const err = new DomainError('test', 'TEST_CODE');
    expect(err.message).toBe('test');
    expect(err.code).toBe('TEST_CODE');
    expect(err.name).toBe('DomainError');
    expect(err).toBeInstanceOf(Error);
  });
});

describe('PhotoQualityError', () => {
  it('includes quality issues', () => {
    const err = new PhotoQualityError('Bad photo', ['Too dark', 'No face']);
    expect(err.code).toBe('PHOTO_QUALITY_ERROR');
    expect(err.qualityIssues).toEqual(['Too dark', 'No face']);
    expect(err).toBeInstanceOf(DomainError);
  });
});

describe('EntitlementError', () => {
  it('uses default message', () => {
    const err = new EntitlementError();
    expect(err.message).toContain('entitlement');
    expect(err.code).toBe('ENTITLEMENT_ERROR');
  });
});

describe('AnalysisError', () => {
  it('creates error with analysis code', () => {
    const err = new AnalysisError('not found');
    expect(err.code).toBe('ANALYSIS_ERROR');
  });
});

describe('PaymentError', () => {
  it('creates error with payment code', () => {
    const err = new PaymentError('declined');
    expect(err.code).toBe('PAYMENT_ERROR');
  });
});

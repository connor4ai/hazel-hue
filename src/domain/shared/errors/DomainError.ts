export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export class PhotoQualityError extends DomainError {
  constructor(
    message: string,
    public readonly qualityIssues: string[],
  ) {
    super(message, 'PHOTO_QUALITY_ERROR');
    this.name = 'PhotoQualityError';
  }
}

export class EntitlementError extends DomainError {
  constructor(message = 'User does not have an active analysis entitlement') {
    super(message, 'ENTITLEMENT_ERROR');
    this.name = 'EntitlementError';
  }
}

export class AnalysisError extends DomainError {
  constructor(message: string) {
    super(message, 'ANALYSIS_ERROR');
    this.name = 'AnalysisError';
  }
}

export class PaymentError extends DomainError {
  constructor(message: string) {
    super(message, 'PAYMENT_ERROR');
    this.name = 'PaymentError';
  }
}

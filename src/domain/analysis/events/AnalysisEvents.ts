import type { AnalysisId, UserId, ConfidenceScore } from '@domain/shared/types';
import type { Season } from '@domain/shared/types';

interface DomainEvent {
  eventType: string;
  timestamp: string;
  analysisId: AnalysisId;
}

export interface AnalysisRequested extends DomainEvent {
  eventType: 'ANALYSIS_REQUESTED';
  userId: UserId;
  photoKey: string;
}

export interface AnalysisCompleted extends DomainEvent {
  eventType: 'ANALYSIS_COMPLETED';
  userId: UserId;
  season: Season;
  confidenceScore: ConfidenceScore;
}

export interface AnalysisFailed extends DomainEvent {
  eventType: 'ANALYSIS_FAILED';
  userId: UserId;
  reason: string;
}

export type AnalysisEvent =
  | AnalysisRequested
  | AnalysisCompleted
  | AnalysisFailed;

export function createAnalysisRequestedEvent(
  analysisId: AnalysisId,
  userId: UserId,
  photoKey: string,
): AnalysisRequested {
  return {
    eventType: 'ANALYSIS_REQUESTED',
    timestamp: new Date().toISOString(),
    analysisId,
    userId,
    photoKey,
  };
}

export function createAnalysisCompletedEvent(
  analysisId: AnalysisId,
  userId: UserId,
  season: Season,
  confidenceScore: ConfidenceScore,
): AnalysisCompleted {
  return {
    eventType: 'ANALYSIS_COMPLETED',
    timestamp: new Date().toISOString(),
    analysisId,
    userId,
    season,
    confidenceScore,
  };
}

export function createAnalysisFailedEvent(
  analysisId: AnalysisId,
  userId: UserId,
  reason: string,
): AnalysisFailed {
  return {
    eventType: 'ANALYSIS_FAILED',
    timestamp: new Date().toISOString(),
    analysisId,
    userId,
    reason,
  };
}

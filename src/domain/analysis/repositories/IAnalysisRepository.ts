import type { AnalysisId, UserId } from '@domain/shared/types';
import type { Analysis } from '../entities/Analysis';

export interface IAnalysisRepository {
  create(analysis: Analysis): Promise<void>;
  getById(id: AnalysisId): Promise<Analysis | null>;
  getByUserId(userId: UserId): Promise<Analysis[]>;
  update(analysis: Analysis): Promise<void>;
}

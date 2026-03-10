import type { AnalysisId, UserId } from '@domain/shared/types';
import type { Analysis } from '@domain/analysis/entities/Analysis';
import type { IAnalysisRepository } from '@domain/analysis/repositories/IAnalysisRepository';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';

/**
 * Repository implementation that communicates with the Analysis API.
 */
export class ApiAnalysisRepository implements IAnalysisRepository {
  async create(analysis: Analysis): Promise<void> {
    await apiClient.post(endpoints.analysis.create, analysis);
  }

  async getById(id: AnalysisId): Promise<Analysis | null> {
    try {
      return await apiClient.get<Analysis>(endpoints.analysis.getById(id));
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'status' in error && (error as { status: number }).status === 404) {
        return null;
      }
      throw error;
    }
  }

  async getByUserId(userId: UserId): Promise<Analysis[]> {
    return apiClient.get<Analysis[]>(`${endpoints.analysis.list}?userId=${userId}`);
  }

  async update(analysis: Analysis): Promise<void> {
    await apiClient.put(endpoints.analysis.getById(analysis.id), analysis);
  }
}

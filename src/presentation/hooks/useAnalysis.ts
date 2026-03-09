import { useEffect, useRef, useCallback, useState } from 'react';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';
import type { Analysis } from '@domain/analysis/entities/Analysis';

const POLL_INTERVAL_MS = 3000;

interface UseAnalysisReturn {
  analysis: Analysis | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches a single analysis by ID.
 * Automatically polls while the analysis is in a non-terminal state.
 */
export function useAnalysis(analysisId: string | null): UseAnalysisReturn {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAnalysis = useCallback(async () => {
    if (!analysisId) return;

    try {
      const result = await apiClient.get<Analysis>(
        endpoints.analysis.getById(analysisId),
      );
      setAnalysis(result);
      setError(null);

      // Stop polling once in a terminal state
      if (
        result.status === 'COMPLETED' ||
        result.status === 'FAILED'
      ) {
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analysis');
    }
  }, [analysisId]);

  // Initial fetch
  useEffect(() => {
    if (!analysisId) return;

    setIsLoading(true);
    fetchAnalysis().finally(() => setIsLoading(false));
  }, [analysisId, fetchAnalysis]);

  // Poll for non-terminal statuses
  useEffect(() => {
    if (!analysisId) return;
    if (
      analysis?.status === 'COMPLETED' ||
      analysis?.status === 'FAILED'
    ) {
      return;
    }

    pollRef.current = setInterval(fetchAnalysis, POLL_INTERVAL_MS);

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [analysisId, analysis?.status, fetchAnalysis]);

  return { analysis, isLoading, error, refetch: fetchAnalysis };
}

interface UseAnalysisListReturn {
  analyses: Analysis[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches the list of analyses for the current user.
 */
export function useAnalysisList(): UseAnalysisListReturn {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyses = useCallback(async () => {
    try {
      const result = await apiClient.get<Analysis[]>(endpoints.analysis.list);
      setAnalyses(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analyses');
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchAnalyses().finally(() => setIsLoading(false));
  }, [fetchAnalyses]);

  return { analyses, isLoading, error, refetch: fetchAnalyses };
}

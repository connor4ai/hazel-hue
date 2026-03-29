import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useAnalysis, useAnalysisList } from '@presentation/hooks/useAnalysis';
import type { Analysis } from '@domain/analysis/entities/Analysis';

// Mock the API client
jest.mock('@infrastructure/api/client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

jest.mock('@infrastructure/api/endpoints', () => ({
  endpoints: {
    analysis: {
      getById: (id: string) => `/analysis/${id}`,
      list: '/analysis',
    },
  },
}));

import { apiClient } from '@infrastructure/api/client';

const mockedGet = apiClient.get as jest.MockedFunction<typeof apiClient.get>;

const completedAnalysis: Analysis = {
  id: 'analysis-123',
  userId: 'user-456',
  status: 'COMPLETED',
  photoKey: 'photos/test.jpg',
  qualityScore: null,
  season: null,
  colorProfile: null,
  confidenceScore: null,
  tenantId: null,
  failureReason: null,
  completedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
} as unknown as Analysis;

const pendingAnalysis: Analysis = {
  ...completedAnalysis,
  status: 'PENDING',
  completedAt: null,
} as unknown as Analysis;

describe('useAnalysis hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns null analysis when id is null', () => {
    const { result } = renderHook(() => useAnalysis(null));

    expect(result.current.analysis).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(mockedGet).not.toHaveBeenCalled();
  });

  it('fetches analysis by ID on mount', async () => {
    mockedGet.mockResolvedValue(completedAnalysis);

    const { result } = renderHook(() => useAnalysis('analysis-123'));

    await waitFor(() => {
      expect(result.current.analysis).toEqual(completedAnalysis);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    mockedGet.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useAnalysis('analysis-123'));

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });

    expect(result.current.analysis).toBeNull();
  });

  it('stops polling when analysis reaches terminal state', async () => {
    mockedGet.mockResolvedValue(completedAnalysis);

    renderHook(() => useAnalysis('analysis-123'));

    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledTimes(1);
    });

    // Advance past several poll intervals — should not poll again
    jest.advanceTimersByTime(15000);
    expect(mockedGet).toHaveBeenCalledTimes(1);
  });

  it('provides a refetch function', async () => {
    mockedGet.mockResolvedValue(completedAnalysis);

    const { result } = renderHook(() => useAnalysis('analysis-123'));

    await waitFor(() => {
      expect(result.current.analysis).toBeTruthy();
    });

    mockedGet.mockResolvedValue({ ...completedAnalysis, photoKey: 'photos/updated.jpg' });

    await act(async () => {
      await result.current.refetch();
    });

    expect(mockedGet).toHaveBeenCalledTimes(2);
  });
});

describe('useAnalysisList hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches the list of analyses on mount', async () => {
    mockedGet.mockResolvedValue([completedAnalysis]);

    const { result } = renderHook(() => useAnalysisList());

    await waitFor(() => {
      expect(result.current.analyses).toHaveLength(1);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    mockedGet.mockRejectedValue(new Error('Server error'));

    const { result } = renderHook(() => useAnalysisList());

    await waitFor(() => {
      expect(result.current.error).toBe('Server error');
    });

    expect(result.current.analyses).toEqual([]);
  });

  it('provides a refetch function', async () => {
    mockedGet.mockResolvedValue([]);

    const { result } = renderHook(() => useAnalysisList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    mockedGet.mockResolvedValue([completedAnalysis]);

    await act(async () => {
      await result.current.refetch();
    });

    expect(mockedGet).toHaveBeenCalledTimes(2);
  });
});

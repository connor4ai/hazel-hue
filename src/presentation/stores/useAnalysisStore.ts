import { create } from 'zustand';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';
import type { AnalysisStatus } from '@domain/analysis/entities/Analysis';

interface AnalysisSessionState {
  photoUri: string | null;
  analysisId: string | null;
  uploadUrl: string | null;
  status: AnalysisStatus | 'IDLE';
  error: string | null;
  isUploading: boolean;

  setPhoto: (uri: string) => void;
  startAnalysis: () => Promise<void>;
  pollStatus: () => Promise<void>;
  reset: () => void;
}

interface RequestAnalysisResponse {
  analysisId: string;
  uploadUrl: string;
  photoKey: string;
}

interface AnalysisStatusResponse {
  status: AnalysisStatus;
  season?: string;
  failureReason?: string;
}

export const useAnalysisStore = create<AnalysisSessionState>((set, get) => ({
  photoUri: null,
  analysisId: null,
  uploadUrl: null,
  status: 'IDLE',
  error: null,
  isUploading: false,

  setPhoto: (uri) => set({ photoUri: uri, error: null }),

  startAnalysis: async () => {
    const { photoUri } = get();
    if (!photoUri) {
      set({ error: 'No photo selected' });
      return;
    }

    set({ isUploading: true, error: null, status: 'PENDING' });

    try {
      // 1. Request analysis (creates record + gets presigned upload URL)
      const result = await apiClient.post<RequestAnalysisResponse>(
        endpoints.analysis.create,
      );

      set({ analysisId: result.analysisId, uploadUrl: result.uploadUrl });

      // 2. Upload photo to S3 via presigned URL
      const photoResponse = await fetch(photoUri);
      const photoBlob = await photoResponse.blob();

      await fetch(result.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/jpeg' },
        body: photoBlob,
      });

      set({ status: 'PHOTO_UPLOADED', isUploading: false });
    } catch (error) {
      set({
        isUploading: false,
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Failed to start analysis',
      });
    }
  },

  pollStatus: async () => {
    const { analysisId } = get();
    if (!analysisId) return;

    try {
      const result = await apiClient.get<AnalysisStatusResponse>(
        endpoints.analysis.pollStatus(analysisId),
      );

      set({ status: result.status });

      if (result.status === 'FAILED') {
        set({ error: result.failureReason ?? 'Analysis failed' });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to check status',
      });
    }
  },

  reset: () =>
    set({
      photoUri: null,
      analysisId: null,
      uploadUrl: null,
      status: 'IDLE',
      error: null,
      isUploading: false,
    }),
}));

import { useAnalysisStore } from '@presentation/stores/useAnalysisStore';

// Mock the API client
jest.mock('@infrastructure/api/client', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

// Mock fetch for photo upload
const mockFetch = jest.fn();
global.fetch = mockFetch;

import { apiClient } from '@infrastructure/api/client';

const mockedPost = apiClient.post as jest.MockedFunction<typeof apiClient.post>;
const mockedGet = apiClient.get as jest.MockedFunction<typeof apiClient.get>;

describe('useAnalysisStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useAnalysisStore.getState().reset();
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('starts with IDLE status and null values', () => {
      const state = useAnalysisStore.getState();

      expect(state.status).toBe('IDLE');
      expect(state.photoUri).toBeNull();
      expect(state.analysisId).toBeNull();
      expect(state.uploadUrl).toBeNull();
      expect(state.error).toBeNull();
      expect(state.isUploading).toBe(false);
    });
  });

  describe('setPhoto', () => {
    it('sets the photo URI and clears any previous error', () => {
      const store = useAnalysisStore.getState();

      store.setPhoto('file:///photos/selfie.jpg');

      const updated = useAnalysisStore.getState();
      expect(updated.photoUri).toBe('file:///photos/selfie.jpg');
      expect(updated.error).toBeNull();
    });
  });

  describe('startAnalysis', () => {
    it('sets error when no photo is selected', async () => {
      await useAnalysisStore.getState().startAnalysis();

      const state = useAnalysisStore.getState();
      expect(state.error).toBe('No photo selected');
      expect(state.isUploading).toBe(false);
    });

    it('creates analysis and uploads photo on success', async () => {
      mockedPost.mockResolvedValue({
        analysisId: 'analysis-123',
        uploadUrl: 'https://s3.example.com/upload',
        photoKey: 'photos/analysis-123.jpg',
      });

      // Mock photo fetch + blob
      const mockBlob = new Blob(['photo-data']);
      mockFetch
        .mockResolvedValueOnce({ blob: () => Promise.resolve(mockBlob) }) // photo fetch
        .mockResolvedValueOnce({ ok: true }); // S3 upload

      useAnalysisStore.getState().setPhoto('file:///photos/selfie.jpg');
      await useAnalysisStore.getState().startAnalysis();

      const state = useAnalysisStore.getState();
      expect(state.analysisId).toBe('analysis-123');
      expect(state.status).toBe('PHOTO_UPLOADED');
      expect(state.isUploading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('sets FAILED status on API error', async () => {
      mockedPost.mockRejectedValue(new Error('Network error'));

      useAnalysisStore.getState().setPhoto('file:///photos/selfie.jpg');
      await useAnalysisStore.getState().startAnalysis();

      const state = useAnalysisStore.getState();
      expect(state.status).toBe('FAILED');
      expect(state.error).toBe('Network error');
      expect(state.isUploading).toBe(false);
    });
  });

  describe('pollStatus', () => {
    it('does nothing when no analysisId is set', async () => {
      await useAnalysisStore.getState().pollStatus();
      expect(mockedGet).not.toHaveBeenCalled();
    });

    it('updates status from API response', async () => {
      // Set up state with an analysisId
      useAnalysisStore.setState({ analysisId: 'analysis-123' });
      mockedGet.mockResolvedValue({ status: 'PROCESSING' });

      await useAnalysisStore.getState().pollStatus();

      expect(useAnalysisStore.getState().status).toBe('PROCESSING');
    });

    it('sets error when analysis has FAILED', async () => {
      useAnalysisStore.setState({ analysisId: 'analysis-123' });
      mockedGet.mockResolvedValue({
        status: 'FAILED',
        failureReason: 'Bedrock timeout',
      });

      await useAnalysisStore.getState().pollStatus();

      const state = useAnalysisStore.getState();
      expect(state.status).toBe('FAILED');
      expect(state.error).toBe('Bedrock timeout');
    });

    it('sets generic error message when no failureReason', async () => {
      useAnalysisStore.setState({ analysisId: 'analysis-123' });
      mockedGet.mockResolvedValue({ status: 'FAILED' });

      await useAnalysisStore.getState().pollStatus();
      expect(useAnalysisStore.getState().error).toBe('Analysis failed');
    });
  });

  describe('reset', () => {
    it('returns store to initial state', () => {
      useAnalysisStore.setState({
        photoUri: 'file:///photos/selfie.jpg',
        analysisId: 'analysis-123',
        status: 'COMPLETED',
        error: 'some error',
        isUploading: true,
      });

      useAnalysisStore.getState().reset();

      const state = useAnalysisStore.getState();
      expect(state.status).toBe('IDLE');
      expect(state.photoUri).toBeNull();
      expect(state.analysisId).toBeNull();
      expect(state.error).toBeNull();
      expect(state.isUploading).toBe(false);
    });
  });
});

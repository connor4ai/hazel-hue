import { useCallback, useRef, useState } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { AnalysisLoading } from './AnalysisLoading';
import { AnalysisResults } from './AnalysisResults';
import { requestAnalysis, uploadPhoto, pollStatus, getAnalysisResult } from '../api/client';
import { mapApiResultToSeasonResult } from '../api/mapResult';
import type { SeasonResult } from '../data/seasons';

type Step = 'upload' | 'analyzing' | 'results' | 'error';

export function AnalysisPage() {
  const [step, setStep] = useState<Step>('upload');
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState<SeasonResult | null>(null);
  const [error, setError] = useState('');
  const analysisIdRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handlePhotoSelected = useCallback(async (file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setStep('analyzing');
    setError('');

    // Cancel any previous analysis polling
    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;

    try {
      // 1. Request analysis (creates record + gets presigned upload URL)
      const { analysisId, uploadUrl } = await requestAnalysis();
      analysisIdRef.current = analysisId;

      if (abort.signal.aborted) return;

      // 2. Upload photo to S3 via presigned URL
      await uploadPhoto(uploadUrl, file);

      if (abort.signal.aborted) return;

      // 3. Poll for completion
      const maxPolls = 120; // 120 * 3s = 6 minutes max
      for (let i = 0; i < maxPolls; i++) {
        if (abort.signal.aborted) return;

        await new Promise((r) => setTimeout(r, 3000));
        if (abort.signal.aborted) return;

        const status = await pollStatus(analysisId);

        if (status.status === 'COMPLETED') {
          // 4. Fetch full results
          const fullResult = await getAnalysisResult(analysisId);
          const mapped = mapApiResultToSeasonResult(fullResult);
          setResult(mapped);
          setStep('results');
          window.scrollTo({ top: 0 });
          return;
        }

        if (status.status === 'FAILED') {
          throw new Error(status.failureReason ?? 'Analysis failed. Please try again.');
        }
      }

      throw new Error('Analysis timed out. Please try again.');
    } catch (err) {
      if (abort.signal.aborted) return;
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStep('error');
    }
  }, []);

  const handleStartOver = useCallback(() => {
    abortRef.current?.abort();
    setStep('upload');
    setPreview('');
    setResult(null);
    setError('');
    analysisIdRef.current = null;
    window.scrollTo({ top: 0 });
  }, []);

  if (step === 'analyzing') {
    return <AnalysisLoading preview={preview} analysisId={analysisIdRef.current} />;
  }

  if (step === 'results' && result) {
    return <AnalysisResults result={result} preview={preview} onStartOver={handleStartOver} />;
  }

  if (step === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <span className="text-2xl text-red-500">!</span>
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-charcoal">Analysis Failed</h2>
          <p className="mt-3 text-sm text-charcoal/60">{error}</p>
          <button
            onClick={handleStartOver}
            className="mt-8 rounded-2xl bg-hazel px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-hazel/20 transition hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <PhotoUpload onPhotoSelected={handlePhotoSelected} />;
}

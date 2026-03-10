import { useCallback, useState } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { AnalysisLoading } from './AnalysisLoading';
import { AnalysisResults } from './AnalysisResults';
import { analyzeImage, SEASON_DATA } from '../data/seasons';
import type { SeasonResult, SeasonType } from '../data/seasons';

type Step = 'upload' | 'analyzing' | 'results';

export function AnalysisPage() {
  const [step, setStep] = useState<Step>('upload');
  const [preview, setPreview] = useState('');
  const [season, setSeason] = useState<SeasonType | null>(null);

  const handlePhotoSelected = useCallback((_file: File, dataUrl: string) => {
    setPreview(dataUrl);

    // Read image bytes for deterministic season selection
    fetch(dataUrl)
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        const bytes = new Uint8Array(buf);
        setSeason(analyzeImage(bytes));
        setStep('analyzing');
      });
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setStep('results');
    window.scrollTo({ top: 0 });
  }, []);

  const handleStartOver = useCallback(() => {
    setStep('upload');
    setPreview('');
    setSeason(null);
    window.scrollTo({ top: 0 });
  }, []);

  if (step === 'analyzing') {
    return <AnalysisLoading preview={preview} onComplete={handleAnalysisComplete} />;
  }

  if (step === 'results' && season) {
    const result: SeasonResult = SEASON_DATA[season];
    return <AnalysisResults result={result} preview={preview} onStartOver={handleStartOver} />;
  }

  return <PhotoUpload onPhotoSelected={handlePhotoSelected} />;
}

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { pollStatus } from '../api/client';

const ANALYSIS_STEPS = [
  { label: 'Uploading your photo', minDuration: 1500 },
  { label: 'Detecting face & features', minDuration: 2000 },
  { label: 'Analyzing skin undertone', minDuration: 2500 },
  { label: 'Mapping contrast level', minDuration: 2000 },
  { label: 'Identifying your season', minDuration: 2500 },
  { label: 'Curating your palette', minDuration: 2000 },
];

interface Props {
  preview: string;
  analysisId: string | null;
}

export function AnalysisLoading({ preview, analysisId }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [backendDone, setBackendDone] = useState(false);
  const startTimeRef = useRef(Date.now());

  // Poll for real status
  useEffect(() => {
    if (!analysisId) return;

    const interval = setInterval(async () => {
      try {
        const result = await pollStatus(analysisId);
        if (result.status === 'COMPLETED' || result.status === 'FAILED') {
          setBackendDone(true);
          clearInterval(interval);
        }
      } catch {
        // Polling errors are non-fatal
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [analysisId]);

  // Animate progress
  useEffect(() => {
    const totalDuration = ANALYSIS_STEPS.reduce((s, st) => s + st.minDuration, 0);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;

      // Calculate current step
      let accumulated = 0;
      let step = 0;
      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        accumulated += ANALYSIS_STEPS[i].minDuration;
        if (elapsed < accumulated) {
          step = i;
          break;
        }
        step = i;
      }
      setCurrentStep(step);

      // Progress caps at 85% until backend is done
      const rawPct = Math.min((elapsed / totalDuration) * 85, 85);

      if (backendDone) {
        // Quickly fill to 100%
        setProgress((prev) => Math.min(prev + 3, 100));
      } else {
        setProgress(rawPct);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [backendDone]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md text-center">
        {/* Photo preview with scanning effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto h-48 w-48 overflow-hidden rounded-[2rem] shadow-2xl shadow-hazel/20 sm:h-56 sm:w-56"
        >
          <img
            src={preview}
            alt="Your photo"
            className="h-full w-full object-cover"
          />
          {/* Scan line */}
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-hazel/20 to-transparent"
          />
          {/* Overlay grid */}
          <div className="absolute inset-0 rounded-[2rem] border-2 border-hazel/20" />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10"
        >
          <div className="mx-auto h-1.5 max-w-xs overflow-hidden rounded-full bg-cream-200">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-hazel to-terracotta"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="mt-3 text-sm font-medium text-hazel">
            {Math.round(progress)}%
          </p>
        </motion.div>

        {/* Step labels */}
        <div className="mt-8 h-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-charcoal/50"
            >
              {ANALYSIS_STEPS[currentStep]?.label ?? 'Finalizing...'}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Step indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {ANALYSIS_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                i <= currentStep ? 'bg-hazel' : 'bg-cream-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

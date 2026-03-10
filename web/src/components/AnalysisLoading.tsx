import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const ANALYSIS_STEPS = [
  { label: 'Detecting face & features', duration: 2000 },
  { label: 'Analyzing skin undertone', duration: 2500 },
  { label: 'Mapping contrast level', duration: 2000 },
  { label: 'Evaluating chroma depth', duration: 1500 },
  { label: 'Identifying your season', duration: 2000 },
  { label: 'Curating your palette', duration: 1500 },
];

interface Props {
  preview: string;
  onComplete: () => void;
}

export function AnalysisLoading({ preview, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let totalElapsed = 0;
    const totalDuration = ANALYSIS_STEPS.reduce((s, step) => s + step.duration, 0);

    const interval = setInterval(() => {
      totalElapsed += 50;
      const pct = Math.min((totalElapsed / totalDuration) * 100, 100);
      setProgress(pct);

      // Determine current step
      let elapsed = 0;
      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        elapsed += ANALYSIS_STEPS[i].duration;
        if (totalElapsed < elapsed) {
          setCurrentStep(i);
          break;
        }
      }

      if (totalElapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

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

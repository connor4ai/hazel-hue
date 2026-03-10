import { motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';

interface Props {
  onPhotoSelected: (file: File, preview: string) => void;
}

export function PhotoUpload({ onPhotoSelected }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        onPhotoSelected(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onPhotoSelected],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-32 md:pt-40 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel">
            Step 1 of 2
          </p>
          <h1 className="mt-4 font-display text-display-lg font-bold text-charcoal">
            Upload your selfie
          </h1>
          <p className="mx-auto mt-4 max-w-md text-charcoal/50">
            Take a photo in natural light — no makeup, no filters, just you.
            We&apos;ll analyze your coloring in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          {/* Upload area */}
          <div
            role="button"
            tabIndex={0}
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
            }}
            className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-8 py-20 transition-all duration-500 ${
              dragOver
                ? 'border-hazel bg-hazel/5 shadow-lg shadow-hazel/10'
                : 'border-cream-300 bg-white/50 hover:border-hazel/30 hover:bg-white/80 hover:shadow-lg hover:shadow-hazel/5'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={onFileChange}
              className="hidden"
            />

            <div
              className={`flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-500 ${
                dragOver ? 'bg-hazel/15 text-hazel' : 'bg-cream-100 text-hazel/50 group-hover:bg-hazel/10 group-hover:text-hazel'
              }`}
            >
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mt-6 font-display text-lg font-semibold text-charcoal">
              {dragOver ? 'Drop your photo here' : 'Upload a selfie'}
            </p>
            <p className="mt-2 text-sm text-charcoal/40">
              <span className="hidden md:inline">Drag & drop or click to choose a photo</span>
              <span className="md:hidden">Tap to take or choose a photo</span>
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold text-cream-50 shadow-lg shadow-charcoal/15 transition-all duration-300 hover:bg-hazel hover:shadow-hazel/25"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Choose Photo
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: 'sun', title: 'Natural light', desc: 'Face a window or go outdoors' },
              { icon: 'face', title: 'No makeup', desc: 'Clean face for best accuracy' },
              { icon: 'filter', title: 'No filters', desc: 'Use your original, unedited photo' },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 rounded-2xl border border-cream-200 bg-white/60 p-4"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-cream-100 text-hazel/60">
                  {tip.icon === 'sun' && (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {tip.icon === 'face' && (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {tip.icon === 'filter' && (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{tip.title}</p>
                  <p className="mt-0.5 text-xs text-charcoal/40">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

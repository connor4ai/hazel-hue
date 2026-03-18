import { motion } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { PaletteResultCard, type PaletteResultCardProps } from './PaletteResultCard';

// ─── SVG-to-PNG capture utility ──────────────────────────────────────
async function captureSvgAsBlob(svgElement: SVGSVGElement): Promise<Blob> {
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d')!;

  return new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1080, 1920);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create PNG blob'));
      }, 'image/png', 1.0);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to render SVG to canvas'));
    };
    img.src = url;
  });
}

// ─── Share targets ──────────────────────────────────────────────────
type WebShareTarget = 'download' | 'instagram' | 'tiktok' | 'share';

async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function webShareFile(blob: Blob, seasonName: string) {
  const file = new File([blob], `hazel-hue-${seasonName.toLowerCase().replace(/\s+/g, '-')}.png`, {
    type: 'image/png',
  });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: `My ${seasonName} Palette — Hazel & Hue`,
      text: `I just discovered I'm a ${seasonName}! Find your perfect colors at hazelandhue.com`,
      files: [file],
    });
    return true;
  }
  return false;
}

// ─── Icons ──────────────────────────────────────────────────────────
function InstagramIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54 3h-3.09v12.4a2.592 2.592 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-7-7m7 7l7-7M5 20h14" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 000-6 3 3 0 00-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 000 6c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65a2.92 2.92 0 002.92 2.92A2.92 2.92 0 0021 18.92 2.92 2.92 0 0018 16.08z" />
    </svg>
  );
}

// ─── Fade animation ─────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

// ─── Main component ─────────────────────────────────────────────────
interface ShareResultCardSectionProps extends PaletteResultCardProps {}

export function ShareResultCardSection({
  season,
  tagline,
  swatches,
  celebrityName,
}: ShareResultCardSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTarget, setActiveTarget] = useState<WebShareTarget | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const captureCard = useCallback(async (): Promise<Blob | null> => {
    const svgEl = cardRef.current?.querySelector('svg');
    if (!svgEl) return null;
    try {
      return await captureSvgAsBlob(svgEl as SVGSVGElement);
    } catch {
      showToast('Failed to capture card. Please try again.');
      return null;
    }
  }, [showToast]);

  const handleAction = useCallback(async (target: WebShareTarget) => {
    setActiveTarget(target);
    try {
      const blob = await captureCard();
      if (!blob) return;

      const filename = `hazel-hue-${season.toLowerCase().replace(/\s+/g, '-')}.png`;

      switch (target) {
        case 'download': {
          await downloadBlob(blob, filename);
          setDownloaded(true);
          showToast('Saved! Upload it to your Instagram or TikTok Story.');
          break;
        }
        case 'instagram': {
          // Web can't deep-link to Instagram Stories directly.
          // Download + prompt user to open Instagram.
          await downloadBlob(blob, filename);
          showToast('Image saved! Open Instagram → Stories → select it from your camera roll.');
          break;
        }
        case 'tiktok': {
          await downloadBlob(blob, filename);
          showToast('Image saved! Open TikTok → Create → select it from your camera roll.');
          break;
        }
        case 'share': {
          const shared = await webShareFile(blob, season);
          if (!shared) {
            // Fallback: download
            await downloadBlob(blob, filename);
            showToast('Downloaded! Share it from your device.');
          }
          break;
        }
      }
    } finally {
      setActiveTarget(null);
    }
  }, [captureCard, season, showToast]);

  return (
    <motion.section {...fadeUp} className="space-y-8">
      {/* Section header */}
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel">Share Your Colors</p>
        <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
          Your shareable palette card
        </h2>
        <p className="mx-auto mt-3 max-w-md text-charcoal/45 leading-relaxed">
          Optimized for Instagram Stories and TikTok. Download and share with one tap.
        </p>
      </div>

      {/* Card preview */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="overflow-hidden rounded-3xl shadow-2xl shadow-hazel/10 ring-1 ring-black/5 transition-transform duration-500 hover:scale-[1.02]"
          style={{ width: 360, aspectRatio: '9/16' }}
        >
          <PaletteResultCard
            season={season}
            tagline={tagline}
            swatches={swatches}
            celebrityName={celebrityName}
          />
        </div>
      </div>

      {/* Share buttons */}
      <div className="mx-auto max-w-sm space-y-3">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal/30">
          One-tap share
        </p>

        {/* Instagram Stories — primary */}
        <button
          onClick={() => handleAction('instagram')}
          disabled={activeTarget === 'instagram'}
          className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-5 py-4 text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <InstagramIcon />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold">Instagram Stories</p>
            <p className="text-[11px] opacity-70">Story-optimized 1080×1920</p>
          </div>
        </button>

        {/* TikTok */}
        <button
          onClick={() => handleAction('tiktok')}
          disabled={activeTarget === 'tiktok'}
          className="flex w-full items-center gap-4 rounded-2xl bg-[#010101] px-5 py-4 text-white shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <TikTokIcon />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold">TikTok</p>
            <p className="text-[11px] opacity-60">Save & share on TikTok</p>
          </div>
        </button>

        {/* Save + Share row */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleAction('download')}
            disabled={activeTarget === 'download'}
            className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 ${
              downloaded
                ? 'bg-sage text-white'
                : 'bg-hazel text-cream-50'
            }`}
          >
            <DownloadIcon />
            {downloaded ? 'Saved!' : 'Save Image'}
          </button>

          <button
            onClick={() => handleAction('share')}
            disabled={activeTarget === 'share'}
            className="flex items-center justify-center gap-2 rounded-2xl bg-charcoal px-4 py-3.5 text-sm font-semibold text-cream-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
          >
            <ShareIcon />
            Share
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-cream-200 bg-white/95 px-6 py-3.5 shadow-xl shadow-hazel/10 backdrop-blur-md"
        >
          <p className="text-sm font-medium text-charcoal">{toast}</p>
        </motion.div>
      )}
    </motion.section>
  );
}

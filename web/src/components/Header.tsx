import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#results', label: 'Results' },
  { href: '#faq', label: 'FAQ' },
];

interface Props {
  onGetStarted?: () => void;
}

export function Header({ onGetStarted }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTA = (e: React.MouseEvent) => {
    if (onGetStarted) {
      e.preventDefault();
      onGetStarted();
    }
  };

  return (
    <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-charcoal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream-50 focus:shadow-lg"
    >
      Skip to main content
    </a>
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? 'glass border-b border-cream-200/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <a href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-hazel-400 to-hazel-500 shadow-md shadow-hazel/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-hazel/30">
            <span className="font-display text-sm font-bold text-cream-50">H</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-semibold leading-none tracking-tight text-charcoal">
              Hazel & Hue
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-hazel/50 sm:block">
              Color Analysis
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="underline-animate rounded-full px-4 py-2 text-sm font-medium text-charcoal/60 transition-colors hover:text-charcoal"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleCTA}
            className="group relative ml-6 overflow-hidden rounded-full bg-charcoal px-7 py-2.5 text-sm font-semibold text-cream-50 transition-all duration-500 hover:shadow-xl hover:shadow-charcoal/20"
          >
            <span className="relative z-10">Get My Colors</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-hazel-400 to-hazel-500 transition-transform duration-500 group-hover:translate-x-0" />
          </button>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 rounded-full bg-charcoal"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-5 rounded-full bg-charcoal"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 rounded-full bg-charcoal"
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-cream md:hidden"
          >
            <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-30" />
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl font-semibold text-charcoal transition-colors hover:text-hazel"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              onClick={(e) => {
                setMenuOpen(false);
                handleCTA(e);
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 rounded-full bg-charcoal px-12 py-4 text-sm font-semibold text-cream-50 shadow-xl"
            >
              Get My Colors — Free
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}

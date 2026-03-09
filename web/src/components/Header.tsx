import { useState } from 'react';

const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-200 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-2xl font-bold text-hazel">
          Hazel &amp; Hue
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 transition hover:text-hazel"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-started"
            className="rounded-xl bg-hazel px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-hazel-500"
          >
            Get My Colors
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 rounded bg-hazel transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 rounded bg-hazel transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 rounded bg-hazel transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="border-t border-cream-200 px-6 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-500 transition hover:text-hazel"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#get-started"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-xl bg-hazel py-3 text-center text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-hazel-500"
            >
              Get My Colors — $19
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

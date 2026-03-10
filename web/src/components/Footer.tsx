export function Footer() {
  return (
    <footer className="border-t border-cream-200 px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-hazel">
                <span className="font-display text-sm font-bold text-cream-50">H</span>
              </div>
              <span className="font-display text-xl font-semibold text-charcoal">
                Hazel & Hue
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/40">
              Free AI-powered seasonal color analysis. Discover your perfect palette,
              style guide, and beauty recommendations — personalized to your unique coloring.
            </p>
            {/* Social links */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com/hazelandhue"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-charcoal/40 transition-all hover:border-hazel/30 hover:text-hazel"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@hazelandhue"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-charcoal/40 transition-all hover:border-hazel/30 hover:text-hazel"
                aria-label="TikTok"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16V11.7a4.83 4.83 0 01-3.59-1.42V6.69h3.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/30">
              Product
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              <a href="#how-it-works" className="text-sm text-charcoal/50 transition hover:text-hazel">How It Works</a>
              <a href="#results" className="text-sm text-charcoal/50 transition hover:text-hazel">What You Get</a>
              <a href="#testimonials" className="text-sm text-charcoal/50 transition hover:text-hazel">Stories</a>
              <a href="#faq" className="text-sm text-charcoal/50 transition hover:text-hazel">FAQ</a>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/30">
              Legal
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              <a href="/privacy" className="text-sm text-charcoal/50 transition hover:text-hazel">Privacy Policy</a>
              <a href="/terms" className="text-sm text-charcoal/50 transition hover:text-hazel">Terms of Service</a>
              <a href="mailto:hello@hazelandhue.com" className="text-sm text-charcoal/50 transition hover:text-hazel">Contact</a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-cream-200 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-charcoal/30">
            &copy; {new Date().getFullYear()} Hazel & Hue. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a
              href="https://apps.apple.com/app/hazel-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cream-200 px-4 py-2 text-xs font-medium text-charcoal/50 transition hover:border-hazel/30 hover:text-hazel"
            >
              iOS App
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.hazelhue"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cream-200 px-4 py-2 text-xs font-medium text-charcoal/50 transition hover:border-hazel/30 hover:text-hazel"
            >
              Android App
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

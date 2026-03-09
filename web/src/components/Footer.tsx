export function Footer() {
  return (
    <footer className="border-t border-cream-200 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold text-hazel">Hazel &amp; Hue</p>
            <p className="mt-1 text-xs text-gray-400">
              AI-powered personal color analysis
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            {/* Legal links */}
            <div className="flex gap-6">
              <a href="/privacy" className="text-xs text-gray-400 transition hover:text-hazel">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs text-gray-400 transition hover:text-hazel">
                Terms of Service
              </a>
              <a href="mailto:hello@hazelandhue.com" className="text-xs text-gray-400 transition hover:text-hazel">
                Contact
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/hazelandhue"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition hover:text-hazel"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@hazelandhue"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition hover:text-hazel"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16V11.7a4.83 4.83 0 01-3.59-1.42V6.69h3.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* App download + copyright */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-cream-200 pt-8 md:flex-row md:justify-between">
          <div className="flex gap-3">
            <a
              href="https://apps.apple.com/app/hazel-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cream-300 px-4 py-2 text-xs font-medium text-charcoal transition hover:border-hazel hover:text-hazel"
            >
              Download for iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.hazelhue"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cream-300 px-4 py-2 text-xs font-medium text-charcoal transition hover:border-hazel hover:text-hazel"
            >
              Download for Android
            </a>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Hazel &amp; Hue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

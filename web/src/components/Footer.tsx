export function Footer() {
  return (
    <footer className="border-t border-cream-200 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold text-hazel">Hazel & Hue</p>
          <p className="mt-1 text-xs text-gray-400">
            AI-powered personal color analysis
          </p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-gray-400 transition hover:text-hazel">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-gray-400 transition hover:text-hazel">
            Terms of Service
          </a>
          <a href="#" className="text-xs text-gray-400 transition hover:text-hazel">
            Contact
          </a>
        </div>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Hazel & Hue. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

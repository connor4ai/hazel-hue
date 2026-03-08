export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream-200 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-2xl font-bold text-hazel">
          Hazel & Hue
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm text-gray-500 transition hover:text-hazel">
            How It Works
          </a>
          <a href="#pricing" className="text-sm text-gray-500 transition hover:text-hazel">
            Pricing
          </a>
          <a
            href="#get-started"
            className="rounded-xl bg-hazel px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-hazel-500"
          >
            Get My Colors
          </a>
        </nav>
      </div>
    </header>
  );
}

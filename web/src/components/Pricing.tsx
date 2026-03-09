import { useScrollReveal } from '../hooks/useScrollReveal';

export function Pricing() {
  const cardRef = useScrollReveal();

  return (
    <section id="pricing" className="px-6 py-20">
      <div ref={cardRef} className="animate-fade-in-up mx-auto max-w-md">
        <div className="rounded-tl-2xl rounded-tr-xl rounded-bl-xl rounded-br-3xl bg-white p-8 shadow-md">
          <p className="text-center text-xs uppercase tracking-widest text-gray-400">
            vs. $300+ for an in-person consultation
          </p>
          <p className="mt-4 text-center font-display text-6xl font-bold text-hazel">$19</p>
          <p className="mt-1 text-center text-xs text-gray-400">one time, forever yours</p>

          <div className="my-8 h-px bg-cream-200" />

          <ul className="space-y-3">
            {[
              'Complete seasonal color analysis',
              'Personalized 30+ color palette',
              'Style lookbook & outfit ideas',
              'Makeup, hair & jewelry guides',
              'Shareable results & downloads',
              'Lock screen wallpaper & salon card',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-500">
                <span className="text-sage">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            id="get-started"
            href="https://apps.apple.com/app/hazel-hue"
            className="animate-glow mt-8 block rounded-xl bg-hazel py-4 text-center text-sm font-semibold uppercase tracking-widest text-cream transition hover:bg-hazel-500"
          >
            Get My Colors — $19
          </a>

          <div className="mt-6 flex items-center gap-3 rounded-xl bg-cream-50 p-4">
            <svg className="h-5 w-5 flex-shrink-0 text-sage" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-gray-500">
              <span className="font-medium text-charcoal">Satisfaction guaranteed.</span>{' '}
              Not happy with your results? Full refund, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20">
      <div className="mx-auto max-w-md">
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
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-500">
                <span className="text-sage">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            id="get-started"
            href="#"
            className="mt-8 block rounded-xl bg-hazel py-4 text-center text-sm font-semibold uppercase tracking-widest text-cream transition hover:bg-hazel-500"
          >
            Get My Colors — $19
          </a>

          <p className="mt-4 text-center text-xs italic text-gray-400">
            Not happy? Full refund, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';

const FAQS = [
  {
    question: 'What is seasonal color analysis?',
    answer:
      'Seasonal color analysis is a method of determining which colors look best on you based on your natural coloring — skin undertone, eye color, and hair color. It categorizes people into one of 12 seasons (e.g., Warm Spring, Cool Summer, Deep Autumn) each with a curated palette of 30+ colors that harmonize with your features.',
  },
  {
    question: 'How accurate is AI color analysis?',
    answer:
      "Our AI has been trained on thousands of professional color analyses and uses advanced computer vision to examine your skin's undertone, contrast level, and chroma. Most users find the results match or exceed what they'd get from an in-person consultation — at a fraction of the cost.",
  },
  {
    question: 'What kind of photo should I use?',
    answer:
      "For the best results, use a photo taken in natural daylight (near a window or outdoors). Avoid heavy makeup, filters, or artificial lighting. A straight-on selfie showing your face, neck, and a bit of your shoulders works best. We'll guide you through this before you take your photo.",
  },
  {
    question: 'How is this different from online quizzes?',
    answer:
      "Online quizzes rely on you self-reporting your coloring (\"Are your veins blue or green?\"), which is notoriously unreliable. Our AI actually analyzes the pixels of your photo to objectively measure your undertone, contrast, and chroma — no guesswork involved.",
  },
  {
    question: 'Can I get a refund if I\'m not happy?',
    answer:
      "Absolutely. If you're not satisfied with your results for any reason, we offer a full refund — no questions asked. We're confident you'll love your palette, but we want you to feel completely risk-free.",
  },
  {
    question: 'How long does the analysis take?',
    answer:
      "The AI analysis typically completes in about 45 seconds. You'll see a progress screen with updates as our AI examines your undertone, maps your contrast level, identifies your season, and curates your personalized palette.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-3xl font-bold text-charcoal">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-tl-2xl rounded-tr-xl rounded-bl-xl rounded-br-3xl border border-cream-200 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="pr-4 text-sm font-medium text-charcoal">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 text-hazel transition-transform duration-200"
                  style={{
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                  }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm leading-relaxed text-gray-500">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

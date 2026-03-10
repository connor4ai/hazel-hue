import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'What is seasonal color analysis?',
    answer:
      'Seasonal color analysis determines which colors look best on you based on your natural coloring — skin undertone, eye color, and hair color. It categorizes you into one of 12 seasons (e.g., Warm Spring, Cool Summer, Deep Autumn) each with a curated palette of 30+ colors that harmonize with your features.',
  },
  {
    question: 'How accurate is AI color analysis?',
    answer:
      "Our AI has been trained on thousands of professional color analyses and uses advanced computer vision to examine your skin's undertone, contrast level, and chroma. Most users find the results match or exceed what they'd get from an in-person consultation.",
  },
  {
    question: "Is it really free? What's the catch?",
    answer:
      'There is no catch. Hazel & Hue is completely free — no hidden fees, no trials, no premium tiers. We believe in growing through genuine word-of-mouth rather than paywalls. You get all 10 guides (palette, style, makeup, hair, nails, jewelry, accessories, and more) at no cost.',
  },
  {
    question: 'What kind of photo should I use?',
    answer:
      "For the best results, use a photo taken in natural daylight (near a window or outdoors). Avoid heavy makeup, filters, or artificial lighting. A straight-on selfie showing your face, neck, and a bit of your shoulders works best. We'll guide you through this.",
  },
  {
    question: 'How is this different from online quizzes?',
    answer:
      'Online quizzes rely on you self-reporting your coloring ("Are your veins blue or green?"), which is notoriously unreliable. Our AI actually analyzes the pixels of your photo to objectively measure your undertone, contrast, and chroma — no guesswork. Plus, you get 10 full guides including nail polish, jewelry, accessories, and curated Pinterest inspiration boards.',
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
    <section id="faq" className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-display-lg font-bold text-charcoal"
          >
            Questions & answers
          </motion.h2>
        </div>

        <div className="mt-14 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isOpen
                    ? 'border-hazel/20 bg-white/80 shadow-lg shadow-hazel/5'
                    : 'border-cream-200 bg-white/50 hover:bg-white/70'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-7 py-6 text-left"
                >
                  <span className={`pr-4 text-sm font-semibold transition-colors duration-300 ${isOpen ? 'text-hazel' : 'text-charcoal'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? 'bg-hazel text-cream-50' : 'bg-cream-100 text-hazel'
                    }`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-7 pb-6">
                        <div className="mb-4 h-px bg-gradient-to-r from-hazel/10 via-hazel/5 to-transparent" />
                        <p className="text-sm leading-relaxed text-charcoal/50">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

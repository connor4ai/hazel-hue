import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQs() {
  const [, setLocation] = useLocation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the analysis work?",
      answer: "Our AI analyzes your facial features, skin tone, and natural coloring using advanced computer vision technology. It determines your seasonal color type based on the 12-season color analysis system, considering factors like undertone, contrast, and chroma."
    },
    {
      question: "What photos should I upload?",
      answer: "Upload 3 clear selfies taken in natural daylight: one straight-on face shot, one side profile, and one showing your neck and chest area. Avoid makeup, filters, or artificial lighting for the most accurate analysis."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI has been trained on thousands of professional color analyses and achieves 95% accuracy when compared to human color consultants. The system considers multiple factors including skin undertones, eye color, and natural hair color."
    },
    {
      question: "What do I receive in my results?",
      answer: "You'll receive a comprehensive 6-page PDF report with your seasonal color type, 64-color palette, makeup recommendations, clothing suggestions, jewelry guidance, and Pinterest boards for shopping inspiration."
    },
    {
      question: "Is my data kept private?",
      answer: "Yes, we take privacy seriously. Your photos are analyzed securely and automatically deleted after processing. We never share personal information with third parties and comply with all data protection regulations."
    },
    {
      question: "How long does the analysis take?",
      answer: "The AI analysis typically completes within 30 seconds of uploading your photos. You'll receive your results immediately via email with downloadable reports and links to your personalized color guide."
    },
    {
      question: "Can I get a refund?",
      answer: "We do not provide refunds, however, if you believe you have a unique situation, feel free to reach out to us at jayda@hazelandhue.com."
    }
  ];

  return (
    <>
      {/* Premium styles */}
      <style>{`
        :root {
          --primary: #5D5FEF;
          --secondary: #FF6B6B;
          --tertiary: #4ECDC4;
          --accent: #FFE66D;
          --dark: #2A2D3A;
          --light: #FAFAFA;
        }

        .gradient-section {
          position: relative;
          overflow: hidden;
        }

        .gradient-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 20% 50%, rgba(93, 95, 239, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 40% 20%, rgba(78, 205, 196, 0.3) 0%, transparent 50%);
          animation: gradientShift 20s ease infinite;
          z-index: -1;
        }

        @keyframes gradientShift {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.1); }
        }

        .faq-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      <div className="min-h-screen gradient-section" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              onClick={() => setLocation('/')}
              variant="ghost"
              className="text-white hover:bg-white/10 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Frequently Asked
              <br />
              <span style={{ color: 'var(--accent)' }}>Questions</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Everything you need to know about our AI color analysis
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                className="faq-item rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to discover your colors?
            </h2>
            <button
              onClick={() => setLocation('/upload')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Your Analysis
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
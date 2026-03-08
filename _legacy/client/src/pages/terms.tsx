import { useState } from 'react';
import { useLocation } from 'wouter';
import { Home as HomeIcon, HelpCircle, BookOpen, FileText, AlertTriangle, DollarSign } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SEOHead } from '@/components/SEOHead';

export default function Terms() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <SEOHead 
        title="Terms of Service - Hazel & Hue AI Color Analysis"
        description="Review our terms of service, payment policy, and service agreement for Hazel & Hue's AI color analysis platform."
        path="/terms"
      />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --primary: #5D5FEF;
          --secondary: #FF6B6B;
          --tertiary: #4ECDC4;
          --dark: #2A2D3A;
          --light: #F8F9FA;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(135deg, var(--primary), var(--secondary), var(--tertiary));
          background-size: 300% 300%;
          animation: colorShift 15s ease infinite;
          overflow-x: hidden;
        }

        .gradient-section {
          background: linear-gradient(135deg, var(--primary), var(--secondary), var(--tertiary));
          background-size: 300% 300%;
          animation: colorShift 15s ease infinite;
        }

        .main-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.9;
          background: linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 50%, #FFFFFF 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 8s ease-in-out infinite;
          text-align: center;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeIn 1.5s ease forwards;
        }

        .subtitle {
          font-size: clamp(1rem, 3vw, 1.4rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
          text-align: center;
          margin-bottom: 3rem;
          max-width: 600px;
          line-height: 1.5;
          opacity: 0;
          animation: fadeIn 1.5s ease forwards;
          animation-delay: 0.4s;
        }

        @keyframes colorShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .orb-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.6;
          animation: float 20s infinite ease-in-out;
        }

        .orb1 {
          width: 300px;
          height: 300px;
          background: var(--primary);
          top: -150px;
          left: -150px;
        }

        .orb2 {
          width: 200px;
          height: 200px;
          background: var(--secondary);
          top: 50%;
          right: -100px;
          animation-delay: -7s;
        }

        .orb3 {
          width: 250px;
          height: 250px;
          background: var(--tertiary);
          bottom: -125px;
          left: 50%;
          animation-delay: -14s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-50px, 50px) scale(0.9); }
        }

        .content-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 2rem;
          margin: 1rem 0;
          transition: all 0.3s ease;
        }

        .content-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .hamburger-line {
          width: 25px;
          height: 3px;
          background: white;
          margin: 3px 0;
          transition: 0.3s;
          border-radius: 2px;
        }

        @keyframes textShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Floating orbs for ambiance */}
      <div className="orb-container">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      {/* Full screen container */}
      <div className="min-h-screen w-full gradient-section relative overflow-hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>
        
        {/* Hamburger Menu */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 focus:outline-none transition-transform duration-300 hover:scale-110"
            style={{ background: 'rgba(42, 45, 58, 0.8)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
          >
            <div className={`hamburger-line ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-4 w-48 rounded-2xl overflow-hidden"
                style={{ background: 'rgba(42, 45, 58, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="py-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setLocation('/homepage');
                    }}
                    className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors flex items-center"
                  >
                    <HomeIcon className="w-4 h-4 mr-3" />
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setLocation('/about');
                    }}
                    className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors flex items-center"
                  >
                    <HelpCircle className="w-4 h-4 mr-3" />
                    About
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setLocation('/help');
                    }}
                    className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors flex items-center"
                  >
                    <BookOpen className="w-4 h-4 mr-3" />
                    Help
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <div className="px-6 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="main-title">
                Terms of Service
              </h1>
              <p className="subtitle mx-auto">
                Please review our service terms and payment policy
              </p>
            </div>

            <div className="space-y-6">
              {/* No Refund Policy */}
              <div className="content-card">
                <h3 className="flex items-center text-xl font-bold text-red-300 mb-4">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  No Refund Policy
                </h3>
                <div className="bg-red-500/20 border border-red-300/30 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-red-200 mb-2">ALL SALES FINAL</p>
                  <p className="text-red-200">
                    Due to the instant digital nature of our AI color analysis service, all payments are final and non-refundable. 
                    By purchasing our service, you acknowledge and agree to this no-refund policy.
                  </p>
                </div>
              </div>

              {/* Service Terms */}
              <div className="content-card">
                <h3 className="flex items-center text-xl font-bold text-white mb-4">
                  <FileText className="w-5 h-5 mr-2 text-white" />
                  Service Agreement
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Service Description</h4>
                    <p className="text-sm text-white/70">
                      Hazel & Hue provides AI-powered color analysis services that determine your seasonal color palette 
                      based on uploaded photos. Results are delivered digitally via email.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Photo Requirements</h4>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Clear, well-lit photos without filters</li>
                      <li>• Natural lighting preferred</li>
                      <li>• Face visible without sunglasses or heavy makeup</li>
                      <li>• 1-3 photos maximum per analysis</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Delivery</h4>
                    <p className="text-sm text-white/70">
                      Analysis results are delivered to your email address within minutes of payment completion. 
                      Please ensure your email address is correct during checkout.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Policy */}
              <div className="content-card">
                <h3 className="flex items-center text-xl font-bold text-white mb-4">
                  <DollarSign className="w-5 h-5 mr-2 text-white" />
                  Payment Policy
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Pricing</h4>
                    <p className="text-sm text-white/70">
                      Our AI color analysis service costs $29.00 USD. This is a one-time fee for a complete analysis.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Payment Processing</h4>
                    <p className="text-sm text-white/70">
                      Payments are processed securely through Stripe. We accept major credit cards, debit cards, 
                      and digital payment methods including Apple Pay and Google Pay.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Security</h4>
                    <p className="text-sm text-white/70">
                      Your payment information is encrypted and secure. We do not store credit card information on our servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="content-card bg-white/5">
                <h4 className="font-semibold text-white mb-3">Questions?</h4>
                <p className="text-sm text-white/70">
                  If you have questions about our terms of service, please contact us at support@hazelandhue.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
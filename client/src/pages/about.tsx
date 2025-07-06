import { useState } from 'react';
import { useLocation } from 'wouter';
import { Home as HomeIcon, HelpCircle, BookOpen, FileText, Shield, Clock, Zap, Users, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SEOHead } from '@/components/SEOHead';

export default function About() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <SEOHead 
        title="About Hazel & Hue - Professional AI Color Analysis Service"
        description="Learn about Hazel & Hue's professional AI color analysis service. Discover how our advanced technology provides accurate seasonal color analysis and personalized style recommendations."
        path="/about"
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
                      setLocation('/terms');
                    }}
                    className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors flex items-center"
                  >
                    <FileText className="w-4 h-4 mr-3" />
                    Terms
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
                About Hazel & Hue
              </h1>
              <p className="subtitle mx-auto">
                Professional AI-powered color analysis for your perfect seasonal palette
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Service Features */}
              <div className="space-y-6">
                <div className="content-card">
                  <h3 className="flex items-center text-xl font-bold text-white mb-4">
                    <Zap className="w-5 h-5 mr-2 text-white" />
                    Our Service
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-white mt-1" />
                      <div>
                        <p className="font-semibold text-white">AI-Powered Analysis</p>
                        <p className="text-sm text-white/70">Advanced artificial intelligence analyzes your photos to determine your seasonal color palette with professional accuracy.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-white mt-1" />
                      <div>
                        <p className="font-semibold text-white">Fast Results</p>
                        <p className="text-sm text-white/70">Get your complete color analysis in 30 seconds. No waiting, no appointments needed.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-white mt-1" />
                      <div>
                        <p className="font-semibold text-white">12-Season System</p>
                        <p className="text-sm text-white/70">Comprehensive analysis using the professional 12-season color system for the most accurate results.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <h3 className="flex items-center text-xl font-bold text-white mb-4">
                    <Mail className="w-5 h-5 mr-2 text-white" />
                    What You Receive
                  </h3>
                  <ul className="text-sm text-white/70 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">•</span>
                      <span>Professional 6-page PDF color analysis report</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">•</span>
                      <span>180+ personalized color palette</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">•</span>
                      <span>Makeup recommendations and color swatches</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">•</span>
                      <span>Style and wardrobe guidance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">•</span>
                      <span>Email delivery within minutes</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="content-card">
                  <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-white">Customer Support</p>
                      <p className="text-sm text-white/70">For questions about your analysis or technical support</p>
                      <p className="text-sm text-white font-medium">support@hazelandhue.com</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Business Hours</p>
                      <p className="text-sm text-white/70">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                      <p className="text-sm text-white/70">Weekend: 10:00 AM - 4:00 PM EST</p>
                    </div>
                  </div>
                </div>

                <div className="content-card bg-white/5">
                  <h4 className="font-semibold text-white mb-3">How It Works</h4>
                  <ol className="text-sm text-white/70 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">1.</span>
                      <span>Upload 1-3 clear photos following our guidelines</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">2.</span>
                      <span>Pay $29 securely through our payment system</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">3.</span>
                      <span>AI analyzes your photos and determines your season</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-white font-bold">4.</span>
                      <span>Receive your complete analysis via email</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
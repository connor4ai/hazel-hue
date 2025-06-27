import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Camera, 
  Sparkles, 
  FileText, 
  Zap,
  Menu,
  X,
  Home as HomeIcon,
  HelpCircle,
  LogIn,
  User
} from "lucide-react";
import { useState, useEffect } from "react";

export default function HomeNew() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Custom cursor functionality
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div>';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.2;
      cursorY += dy * 0.2;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    };
  }, []);

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

        body { cursor: none; }

        .cursor {
          width: 20px;
          height: 20px;
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.2s ease;
        }

        .cursor-dot {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 50%;
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

        .premium-button {
          position: relative;
          padding: 1.2rem 3rem;
          background: var(--dark);
          color: white;
          border: none;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .premium-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--primary), var(--secondary), var(--tertiary));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .premium-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .premium-button:hover::before {
          opacity: 1;
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

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
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
      `}</style>

      {/* Floating orbs for ambiance */}
      <div className="orb-container">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      {/* Full screen container */}
      <div className="h-screen w-full gradient-section relative overflow-hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>
        
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
                      setLocation('/');
                    }}
                    className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors flex items-center"
                  >
                    <HomeIcon className="w-4 h-4 mr-3" />
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Scroll to FAQ section if it exists, or handle FAQ page
                    }}
                    className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors flex items-center"
                  >
                    <HelpCircle className="w-4 h-4 mr-3" />
                    FAQs
                  </button>
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setLocation('/account');
                      }}
                      className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors flex items-center"
                    >
                      <User className="w-4 h-4 mr-3" />
                      My Account
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setLocation('/login');
                      }}
                      className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors flex items-center"
                    >
                      <LogIn className="w-4 h-4 mr-3" />
                      Sign In
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content - Centered */}
        <div className="h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-6 text-center">
            
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h1 
                className="text-6xl md:text-8xl font-bold mb-6 text-white leading-tight"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}
              >
                Your Perfect
                <br />
                <span style={{ color: 'var(--accent)' }}>Color Story</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover your ideal colors with AI-powered 12-season analysis. 
                Upload 3 photos and unlock your personalized color palette in seconds.
              </p>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  onClick={() => setLocation('/upload')}
                  className="premium-button text-xl relative z-10"
                  style={{ fontSize: '1.3rem', padding: '1.5rem 4rem' }}
                >
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="mr-3 h-6 w-6" />
                    Start Your Analysis
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: <Camera className="h-8 w-8" />,
                  title: "Upload Photos",
                  description: "3 natural light selfies"
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "AI Analysis",
                  description: "30-second processing"
                },
                {
                  icon: <Palette className="h-8 w-8" />,
                  title: "Get Results",
                  description: "Personalized color guide"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                  className="feature-card rounded-2xl p-8 text-center"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                  >
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 flex flex-wrap justify-center gap-8 text-white/60"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>30-Second Results</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                <span>Professional Analysis</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
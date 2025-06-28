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

        .title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .title-word {
          display: inline-block;
          position: relative;
          background: linear-gradient(135deg, #5D5FEF 0%, #FF6B6B 50%, #4ECDC4 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorShift 8s ease infinite;
          background-size: 200% 200%;
        }

        .cta-button {
          margin-top: 3rem;
          position: relative;
          display: inline-block;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        .cta-button button {
          position: relative;
          padding: 1.2rem 3rem;
          background: #2A2D3A;
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

        .cta-button button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #5D5FEF, #FF6B6B, #4ECDC4);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .cta-button button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .cta-button button:hover::before {
          opacity: 1;
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
                      setLocation('/faqs');
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
                        setLocation('/signin');
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
              <h1 className="title">
                <span className="title-word">AI Color Analysis</span>
              </h1>
              
              {/* CTA Button */}
              <div className="cta-button">
                <button 
                  id="startBtn"
                  onClick={(e) => {
                    // Animate button
                    const target = e.currentTarget as HTMLButtonElement;
                    if (target) {
                      target.style.transform = 'scale(0.95)';
                      setTimeout(() => {
                        if (target) {
                          target.style.transform = '';
                        }
                        setLocation('/upload');
                      }, 200);
                    } else {
                      setLocation('/upload');
                    }
                  }}
                >
                  Upload Photos
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
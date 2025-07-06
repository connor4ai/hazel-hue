import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle, Camera, Sun, User, Mail, CheckCircle } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Help() {
  const [, setLocation] = useLocation();

  return (
    <>
      <SEOHead 
        title="Help & FAQ - Hazel & Hue AI Color Analysis"
        description="Get help with photo requirements, frequently asked questions, and support for Hazel & Hue's AI color analysis service."
        path="/help"
      />

      {/* Animated Gradient Mesh Background */}
      <div className="mesh"></div>
      
      {/* Modern Design System Styles */}
      <style>{`
        /* Import Google Font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* Design System Variables */
        :root {
            --ink: #0A0A0A;
            --pearl: #FAFAFA;
            --mist: #F5F5F5;
        }

        /* Animated Gradient Mesh Background */
        .mesh {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }

        .mesh::before,
        .mesh::after {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            animation: morphing 25s ease-in-out infinite;
        }

        .mesh::before {
            background: radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
            animation-delay: 0s;
        }

        .mesh::after {
            background: radial-gradient(circle at 60% 20%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 30% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 50%);
            animation-delay: -10s;
        }

        @keyframes morphing {
            0%, 100% {
                transform: rotate(0deg) scale(1) translateX(0);
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }
            25% {
                transform: rotate(90deg) scale(1.1) translateX(20px);
                border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            }
            50% {
                transform: rotate(180deg) scale(0.9) translateX(-20px);
                border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
            }
            75% {
                transform: rotate(270deg) scale(1.05) translateX(10px);
                border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
            }
        }

        /* Animated Gradient Text */
        .gradient-title {
            font-size: 3.5rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1;
            background: linear-gradient(
                135deg,
                #9333EA 0%,
                #EC4899 25%,
                #3B82F6 50%,
                #FB923C 75%,
                #9333EA 100%
            );
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-flow 8s ease infinite;
        }

        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .content-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            padding: 2rem;
        }
      `}</style>

      <div className="min-h-screen relative">
        {/* Navigation Bar */}
        <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200/20">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => setLocation('/homepage')}
              className="font-serif text-2xl font-bold text-gray-800 hover:text-purple-700 transition-colors"
            >
              Hazel & Hue
            </Button>
            <div className="flex space-x-6">
              <Button
                variant="ghost"
                onClick={() => setLocation('/homepage')}
                className="text-gray-600 hover:text-purple-700 transition-colors"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLocation('/about')}
                className="text-gray-600 hover:text-purple-700 transition-colors"
              >
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLocation('/terms')}
                className="text-gray-600 hover:text-purple-700 transition-colors"
              >
                Terms
              </Button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setLocation('/homepage')}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="text-center">
              <h1 className="gradient-title text-4xl mb-4">
                Help & Support
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Photo tips and frequently asked questions
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Photo Tips */}
            <div className="content-card">
              <h3 className="flex items-center text-xl font-bold text-gray-800 mb-4">
                <Camera className="w-5 h-5 mr-2 text-purple-600" />
                Photo Requirements
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Sun className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Natural Lighting</p>
                    <p className="text-sm text-gray-600">Take photos in bright, natural daylight near a window. Avoid flash, artificial lighting, or harsh shadows.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Clear Face Shot</p>
                    <p className="text-sm text-gray-600">Face should fill most of the frame. Remove sunglasses, hats, or anything covering your eyes and hair.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Minimal Makeup</p>
                    <p className="text-sm text-gray-600">Clean face with no makeup or very minimal makeup. This helps us see your natural skin tone.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="content-card">
              <h3 className="flex items-center text-xl font-bold text-gray-800 mb-4">
                <HelpCircle className="w-5 h-5 mr-2 text-purple-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">How accurate is the AI analysis?</h4>
                  <p className="text-sm text-gray-600">
                    Our AI is trained on thousands of professional color analyses and achieves high accuracy when provided with quality photos that meet our guidelines.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">How long does it take to get results?</h4>
                  <p className="text-sm text-gray-600">
                    Results are typically delivered to your email within 30 seconds to 2 minutes after payment completion.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What file formats are supported?</h4>
                  <p className="text-sm text-gray-600">
                    We accept JPEG, PNG, and HEIC (iPhone) image formats. Maximum file size is 10MB per photo.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Can I upload photos of multiple people?</h4>
                  <p className="text-sm text-gray-600">
                    No, each analysis is for one person only. Photos should contain only the person being analyzed.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What if I don't receive my results?</h4>
                  <p className="text-sm text-gray-600">
                    Check your spam folder first. If you still don't receive results within 10 minutes, contact our support team.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Are refunds available?</h4>
                  <p className="text-sm text-gray-600">
                    No, all sales are final due to the instant digital nature of our service. Please review our terms of service for details.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="content-card bg-gradient-to-r from-purple-50 to-pink-50">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Need More Help?
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Contact our support team for additional assistance:
              </p>
              <p className="text-sm text-purple-600 font-medium">support@hazelandhue.com</p>
              <p className="text-xs text-gray-500 mt-2">
                Response time: Usually within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
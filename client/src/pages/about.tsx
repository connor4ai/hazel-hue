import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Clock, Zap, Users, Mail } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <>
      <SEOHead 
        title="About Hazel & Hue - Professional AI Color Analysis Service"
        description="Learn about Hazel & Hue's professional AI color analysis service. Discover how our advanced technology provides accurate seasonal color analysis and personalized style recommendations."
        path="/about"
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
                onClick={() => setLocation('/terms')}
                className="text-gray-600 hover:text-purple-700 transition-colors"
              >
                Terms
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLocation('/help')}
                className="text-gray-600 hover:text-purple-700 transition-colors"
              >
                Help
              </Button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
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
                About Hazel & Hue
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional AI-powered color analysis for your perfect seasonal palette
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Service Features */}
            <div className="space-y-6">
              <div className="content-card">
                <h3 className="flex items-center text-xl font-bold text-gray-800 mb-4">
                  <Zap className="w-5 h-5 mr-2 text-purple-600" />
                  Our Service
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">AI-Powered Analysis</p>
                      <p className="text-sm text-gray-600">Advanced artificial intelligence analyzes your photos to determine your seasonal color palette with professional accuracy.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Fast Results</p>
                      <p className="text-sm text-gray-600">Get your complete color analysis in 30 seconds. No waiting, no appointments needed.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">12-Season System</p>
                      <p className="text-sm text-gray-600">Comprehensive analysis using the professional 12-season color system for the most accurate results.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-card">
                <h3 className="flex items-center text-xl font-bold text-gray-800 mb-4">
                  <Mail className="w-5 h-5 mr-2 text-purple-600" />
                  What You Receive
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Professional 6-page PDF color analysis report</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>180+ personalized color palette</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Makeup recommendations and color swatches</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Style and wardrobe guidance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Email delivery within minutes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="content-card">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800">Customer Support</p>
                    <p className="text-sm text-gray-600">For questions about your analysis or technical support</p>
                    <p className="text-sm text-purple-600 font-medium">support@hazelandhue.com</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Business Hours</p>
                    <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-sm text-gray-600">Weekend: 10:00 AM - 4:00 PM EST</p>
                  </div>
                </div>
              </div>

              <div className="content-card bg-gradient-to-r from-purple-50 to-pink-50">
                <h4 className="font-semibold text-gray-800 mb-3">How It Works</h4>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">1.</span>
                    <span>Upload 1-3 clear photos following our guidelines</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">2.</span>
                    <span>Pay $29 securely through our payment system</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">3.</span>
                    <span>AI analyzes your photos and determines your season</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">4.</span>
                    <span>Receive your complete analysis via email</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, AlertTriangle, DollarSign } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Terms() {
  const [, setLocation] = useLocation();

  return (
    <>
      <SEOHead 
        title="Terms of Service - Hazel & Hue AI Color Analysis"
        description="Review our terms of service, payment policy, and service agreement for Hazel & Hue's AI color analysis platform."
        path="/terms"
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
                onClick={() => setLocation('/help')}
                className="text-gray-600 hover:text-purple-700 transition-colors"
              >
                Help
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
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Please review our service terms and payment policy
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* No Refund Policy */}
            <div className="content-card">
              <h3 className="flex items-center text-xl font-bold text-red-700 mb-4">
                <AlertTriangle className="w-5 h-5 mr-2" />
                No Refund Policy
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-red-800 mb-2">ALL SALES FINAL</p>
                <p className="text-red-700">
                  Due to the instant digital nature of our AI color analysis service, all payments are final and non-refundable. 
                  By purchasing our service, you acknowledge and agree to this no-refund policy.
                </p>
              </div>
            </div>

            {/* Service Terms */}
            <div className="content-card">
              <h3 className="flex items-center text-xl font-bold text-gray-800 mb-4">
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                Service Agreement
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Service Description</h4>
                  <p className="text-sm text-gray-600">
                    Hazel & Hue provides AI-powered color analysis services that determine your seasonal color palette 
                    based on uploaded photos. Results are delivered digitally via email.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Photo Requirements</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Clear, well-lit photos without filters</li>
                    <li>• Natural lighting preferred</li>
                    <li>• Face visible without sunglasses or heavy makeup</li>
                    <li>• 1-3 photos maximum per analysis</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Delivery</h4>
                  <p className="text-sm text-gray-600">
                    Analysis results are delivered to your email address within minutes of payment completion. 
                    Please ensure your email address is correct during checkout.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Policy */}
            <div className="content-card">
              <h3 className="flex items-center text-xl font-bold text-gray-800 mb-4">
                <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                Payment Policy
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Pricing</h4>
                  <p className="text-sm text-gray-600">
                    Our AI color analysis service costs $29.00 USD. This is a one-time fee for a complete analysis.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Payment Processing</h4>
                  <p className="text-sm text-gray-600">
                    Payments are processed securely through Stripe. We accept major credit cards, debit cards, 
                    and digital payment methods including Apple Pay and Google Pay.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Security</h4>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure. We do not store credit card information on our servers.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="content-card bg-gradient-to-r from-purple-50 to-pink-50">
              <h4 className="font-semibold text-gray-800 mb-3">Questions?</h4>
              <p className="text-sm text-gray-600">
                If you have questions about our terms of service, please contact us at support@hazelandhue.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
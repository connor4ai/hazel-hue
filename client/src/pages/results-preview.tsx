import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Sparkles, CreditCard, CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface AnalysisResult {
  season: string;
  description: string;
  coreNeutrals: string[];
  accentLights: string[];
  accentBrights: string[];
  signatureColors: string[];
  colorGroups: any;
  recommendations: any;
}

interface Order {
  id: number;
  status: string;
  analysisResult: AnalysisResult;
  paymentStatus: string;
}

const PaymentForm = ({ orderId, onSuccess }: { orderId: string, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    
    try {
      const response = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode.trim().toUpperCase() })
      });
      
      if (response.ok) {
        const { discount: discountPercent } = await response.json();
        setDiscount(discountPercent);
        setPromoError("");
        toast({
          title: "Promo Code Applied",
          description: `${discountPercent}% discount applied!`,
        });
      } else {
        const error = await response.json();
        setPromoError(error.message || "Invalid promo code");
        setDiscount(0);
      }
    } catch (error) {
      setPromoError("Failed to validate promo code");
      setDiscount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");

    setIsProcessing(true);

    // Store email for order completion
    sessionStorage.setItem('userEmail', email);

    try {
      // Update order with email
      await fetch(`/api/orders/${orderId}/update-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      // If 100% discount, skip payment and mark order as paid
      if (discount === 100) {
        await fetch(`/api/orders/${orderId}/mark-free`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        toast({
          title: "Free Analysis Unlocked!",
          description: "Your complete color analysis is now available.",
        });
        
        onSuccess();
        return;
      }

      // Regular Stripe payment for non-100% discounts
      if (!stripe || !elements) {
        setIsProcessing(false);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/results/${orderId}?email=${encodeURIComponent(email)}`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsProcessing(false);
      } else {
        toast({
          title: "Payment Successful",
          description: "Unlocking your results now!",
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Collection */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-warm-gray-dark mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent touch-manipulation"
          placeholder="Enter your email to receive results"
          autoComplete="email"
          required
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
        <p className="text-xs text-warm-gray mt-1">
          We'll email your complete analysis report and order number
        </p>
      </div>

      {/* Promo Code Section */}
      <div>
        <label htmlFor="promoCode" className="block text-sm font-medium text-warm-gray-dark mb-2">
          Promo Code (Optional)
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            id="promoCode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="flex-1 px-3 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent touch-manipulation"
            placeholder="Enter promo code"
            autoComplete="off"
          />
          <Button
            type="button"
            onClick={applyPromoCode}
            variant="outline"
            className="px-4 py-3 sm:py-2 text-base sm:text-sm border-terracotta text-terracotta hover:bg-terracotta hover:text-white touch-manipulation"
          >
            Apply
          </Button>
        </div>
        {promoError && (
          <p className="text-red-500 text-sm mt-1">{promoError}</p>
        )}
        {discount > 0 && (
          <p className="text-green-600 text-sm mt-1">
            {discount}% discount applied! 
          </p>
        )}
      </div>

      {/* Order Summary */}
      {discount > 0 && (
        <div className="bg-sage-light p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-warm-gray-dark">Original Price:</span>
            <span className="text-warm-gray-dark">$29.00</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-600">Discount ({discount}%):</span>
            <span className="text-green-600">-${(29 * discount / 100).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center font-semibold">
            <span className="text-warm-gray-dark">Total:</span>
            <span className="text-warm-gray-dark">${(29 * (1 - discount / 100)).toFixed(2)}</span>
          </div>
        </div>
      )}

      {discount < 100 && <PaymentElement />}
      
      <Button 
        type="submit"
        disabled={discount < 100 ? (!stripe || isProcessing || !email) : (isProcessing || !email)}
        className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold touch-manipulation"
      >
        {isProcessing ? (
          <>Processing...</>
        ) : discount === 100 ? (
          <>
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            Get Free Analysis
          </>
        ) : (
          <>
            <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            Complete Purchase - ${(29 * (1 - discount / 100)).toFixed(2)}
          </>
        )}
      </Button>
    </form>
  );
};

export default function ResultsPreviewPage() {
  const { orderId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setLocation('/upload');
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (response.ok) {
          const { order: orderData } = await response.json(); // Extract order from response
          setOrder(orderData);
          
          // Check if already paid
          if (orderData.paymentStatus === 'paid') {
            setLocation(`/results/${orderId}`);
            return;
          }
          
          // Create payment intent for this order
          const paymentResponse = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 29, orderId: orderId })
          });
          
          if (paymentResponse.ok) {
            const { clientSecret } = await paymentResponse.json();
            setClientSecret(clientSecret);
          }
        } else {
          toast({
            title: "Order Not Found",
            description: "Could not find your analysis results.",
            variant: "destructive",
          });
          setLocation('/upload');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast({
          title: "Error",
          description: "Failed to load your results.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, setLocation, toast]);

  const handlePaymentSuccess = () => {
    setLocation(`/results/${orderId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!order || !order.analysisResult) {
    return (
      <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-warm-gray-dark mb-4">
              Results Not Ready
            </h2>
            <p className="text-warm-gray mb-6">
              Your analysis results are not yet available. Please wait for the analysis to complete.
            </p>
            <Button onClick={() => setLocation('/upload')}>
              Start New Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { analysisResult } = order;

  return (
    <>
      <style>{`
        /* Dark theme for preview page */
        .preview-page {
          background: #0A0A0A;
          color: #FAFAFA;
        }

        /* Animated gradient mesh background */
        .gradient-mesh {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .mesh-gradient {
          position: absolute;
          width: 150%;
          height: 150%;
          top: -25%;
          left: -25%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            #9333EA 0deg,
            #EC4899 60deg,
            #3B82F6 120deg,
            #10B981 180deg,
            #F59E0B 240deg,
            #EF4444 300deg,
            #9333EA 360deg
          );
          animation: rotate 30s linear infinite;
          opacity: 0.15;
          filter: blur(100px);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Success icon styling */
        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, #10B981, #3B82F6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Success gradient text */
        .success-gradient-text {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #EC4899 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 6s ease infinite;
          background-size: 200% 200%;
        }

        /* Preview card styling */
        .preview-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .preview-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        /* Special preview card */
        .preview-card.complete-card {
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1));
          border: 1px solid rgba(147, 51, 234, 0.2);
        }

        /* Blur overlay for locked content */
        .blur-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 10, 0.3);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 20px;
        }

        .lock-icon {
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .unlock-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Card icon badge */
        .card-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #9333EA, #EC4899);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }

        /* Season name styling */
        .season-name {
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #F59E0B, #EC4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Color preview circles */
        .color-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: relative;
          filter: blur(3px);
          opacity: 0.7;
          animation: pulse 3s ease-in-out infinite;
        }

        .color-circle:nth-child(1) { animation-delay: 0s; }
        .color-circle:nth-child(2) { animation-delay: 0.5s; }
        .color-circle:nth-child(3) { animation-delay: 1s; }
        .color-circle:nth-child(4) { animation-delay: 1.5s; }
        .color-circle:nth-child(5) { animation-delay: 2s; }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* Style preview blocks */
        .style-item {
          flex: 1;
          height: 80px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          filter: blur(2px);
        }

        /* Glowing CTA button */
        .unlock-btn {
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #10B981, #3B82F6);
          color: white;
          border: none;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.5);
          }
        }

        .unlock-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
        }

        /* Slide in animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Apply animations */
        .animate-fade-scale {
          animation: fadeInScale 1s ease-out;
        }

        .animate-slide-up {
          animation: slideInUp 0.8s ease-out backwards;
        }

        .animate-slide-up:nth-child(1) { animation-delay: 0.1s; }
        .animate-slide-up:nth-child(2) { animation-delay: 0.2s; }
        .animate-slide-up:nth-child(3) { animation-delay: 0.3s; }
        .animate-slide-up:nth-child(4) { animation-delay: 0.4s; }

        /* Sparkle decoration */
        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: sparkle 3s linear infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        .sparkle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .sparkle:nth-child(2) { top: 60%; left: 80%; animation-delay: 1s; }
        .sparkle:nth-child(3) { top: 40%; left: 60%; animation-delay: 2s; }

        /* Price text styling */
        .price-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .success-gradient-text {
            font-size: 2rem;
          }
          
          .preview-card {
            padding: 1.5rem;
          }
          
          .style-item {
            height: 60px;
          }
        }
      `}</style>
      <div className="min-h-screen relative" style={{ background: '#0A0A0A', color: '#FAFAFA' }}>
        {/* Animated gradient mesh background */}
        <div className="gradient-mesh">
          <div className="mesh-gradient"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-scale">
          <div className="success-icon">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="success-gradient-text mb-3 sm:mb-4 px-2">
            Your Color Analysis is Ready!
          </h1>
          <p className="text-base sm:text-lg px-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Complete your purchase to unlock your personalized color palette and style guide
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Blurred Results Preview */}
          <div className="space-y-4 sm:space-y-6 lg:order-first">
            {/* Season Preview - Blurred */}
            <div className="preview-card complete-card animate-slide-up text-center">
              <div className="relative">
                <div className="sparkle"></div>
                <div className="sparkle"></div>
                <div className="sparkle"></div>
                <div className="card-icon mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="filter blur-sm">
                  <div className="season-name mb-3 sm:mb-4">
                    {analysisResult.season}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#FAFAFA' }}>
                    Your Color Season
                  </h2>
                  <p className="text-sm sm:text-base px-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{analysisResult.description}</p>
                </div>
                <div className="blur-overlay">
                  <div className="lock-icon">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <p className="unlock-text">Your season is ready!</p>
                </div>
              </div>
            </div>

            {/* Blurred Color Palette */}
            <div className="preview-card animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="card-icon mr-3">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold" style={{ color: '#FAFAFA' }}>Your Color Palette</h3>
              </div>
              <div className="relative">
                <div className="filter blur-sm">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 mb-4">
                    {[...analysisResult.coreNeutrals, ...analysisResult.accentLights, ...analysisResult.accentBrights].slice(0, 12).map((color, index) => (
                      <div
                        key={index}
                        className="color-circle"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="blur-overlay">
                  <div className="lock-icon">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <p className="unlock-text">Unlock to view your colors</p>
                </div>
              </div>
            </div>

            {/* Blurred Recommendations */}
            <div className="preview-card animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="card-icon mr-3">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold" style={{ color: '#FAFAFA' }}>Style Recommendations</h3>
              </div>
              <div className="relative">
                <div className="filter blur-sm space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#FAFAFA' }}>Best Colors for You</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {analysisResult.signatureColors?.slice(0, 8).map((color, index) => (
                        <div
                          key={index}
                          className="color-circle"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#FAFAFA' }}>Makeup & Style Guide</h4>
                    <div className="flex gap-2">
                      <div className="style-item"></div>
                      <div className="style-item"></div>
                      <div className="style-item"></div>
                    </div>
                  </div>
                </div>
                <div className="blur-overlay">
                  <div className="lock-icon">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <p className="unlock-text">Unlock to view recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:sticky lg:top-8 lg:order-last">
            <div className="preview-card animate-slide-up">
              <div className="text-center mb-6">
                <div className="card-icon mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#FAFAFA' }}>
                  Unlock Your Complete Analysis
                </h2>
              </div>
              
              {/* What's Included */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#FAFAFA' }}>What you'll get:</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Complete 64-color seasonal palette</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Personalized makeup recommendations</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Style guide and color combinations</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Downloadable PDF report</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Apple Wallet color card</span>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                {!showPayment ? (
                  <button 
                    onClick={() => setShowPayment(true)}
                    className="unlock-btn w-full"
                  >
                    <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Unlock Results - $29
                  </button>
                ) : clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm orderId={orderId!} onSuccess={handlePaymentSuccess} />
                  </Elements>
                ) : (
                  <div className="text-center py-4">
                    <div className="animate-spin w-6 h-6 border-2 border-terracotta border-t-transparent rounded-full mx-auto" />
                    <p className="text-sm text-warm-gray mt-2">Setting up payment...</p>
                  </div>
                )}

                <p className="text-xs text-center mt-4 price-text">
                  Secure payment processing by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { CreditCard, Sparkles } from 'lucide-react';



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const PaymentForm = ({ orderId, onSuccess }: { orderId: number, onSuccess: () => void }) => {
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

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/results/${orderId}?email=${encodeURIComponent(email)}`,
        },
        redirect: 'if_required'
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Mark order as completed after successful payment
        await fetch(`/api/orders/${orderId}/mark-completed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your email to receive results"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          inputMode="email"
          required
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
        <p className="text-xs text-gray-600 mt-1">
          We'll email your complete analysis report and order number
        </p>
      </div>

      {/* Promo Code Section */}
      <div>
        <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="promoCode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="flex-1 px-3 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter promo code"
            autoComplete="off"
          />
          <Button
            type="button"
            onClick={applyPromoCode}
            variant="outline"
            className="px-4 py-3 text-base border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
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
        <div className="bg-purple-50 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Original Price:</span>
            <span className="text-gray-700">$29.00</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-600">Discount ({discount}%):</span>
            <span className="text-green-600">-${(29 * discount / 100).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center font-semibold">
            <span className="text-gray-700">Total:</span>
            <span className="text-gray-700">${(29 * (1 - discount / 100)).toFixed(2)}</span>
          </div>
        </div>
      )}

      {discount < 100 && (
        <div>
          <PaymentElement 
            options={{
              layout: "tabs",
              paymentMethodOrder: ['apple_pay', 'google_pay', 'card']
            }}
            onReady={() => {
              console.log('Payment Element ready');
            }}
          />
          <div className="mt-2 text-xs text-gray-500">
            <strong>Note:</strong> Apple Pay may not appear in preview mode due to iframe security restrictions. It will work normally when deployed.
          </div>
        </div>
      )}
      
      <Button 
        type="submit"
        disabled={discount < 100 ? (!stripe || isProcessing || !email) : (isProcessing || !email)}
        className="unlock-btn w-full"
      >
        {isProcessing ? (
          <>Processing...</>
        ) : discount === 100 ? (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Get Free Analysis
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Complete Purchase - ${(29 * (1 - discount / 100)).toFixed(2)}
          </>
        )}
      </Button>
    </form>
  );
};

export default function ResultsPreview() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId') || window.location.pathname.split('/').pop();
    
    if (id && !isNaN(Number(id))) {
      setOrderId(Number(id));
      fetchOrder(Number(id));
    } else {
      setLocation('/');
    }
  }, [setLocation]);

  const fetchOrder = async (id: number) => {
    try {
      const response = await apiRequest('GET', `/api/orders/${id}`);
      const data = await response.json();
      
      if (data.order && data.order.analysisResult) {
        setOrder(data.order);
        
        if (data.order.status === 'completed') {
          setLocation(`/results/${id}`);
        }
      } else {
        toast({
          title: "Analysis not found",
          description: "This analysis result is not available.",
          variant: "destructive",
        });
        setLocation('/');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast({
        title: "Error",
        description: "Failed to load your analysis.",
        variant: "destructive",
      });
      setLocation('/');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showPayment && orderId && !clientSecret) {
      createPaymentIntent();
    }
  }, [showPayment, orderId, clientSecret]);

  const createPaymentIntent = async () => {
    try {
      const response = await apiRequest('POST', '/api/create-payment-intent', {
        orderId,
        amount: 29.99
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: [`/api/orders/${orderId}`] });
      
      toast({
        title: "Payment Successful!",
        description: "Your color analysis has been unlocked. Redirecting to results...",
      });
      
      setTimeout(() => {
        setLocation(`/results/${orderId}`);
      }, 1500);
    } catch (error) {
      console.error('Error after payment:', error);
    }
  };

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="gradient-mesh">
          <div className="mesh-gradient"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  const { analysisResult } = order;

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* Base styles */
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #FAFAFA;
            color: #0A0A0A;
        }

        /* Animated gradient mesh background - light version */
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
                rgba(147, 51, 234, 0.1) 0deg,
                rgba(236, 72, 153, 0.1) 60deg,
                rgba(59, 130, 246, 0.1) 120deg,
                rgba(16, 185, 129, 0.1) 180deg,
                rgba(245, 158, 11, 0.1) 240deg,
                rgba(239, 68, 68, 0.1) 300deg,
                rgba(147, 51, 234, 0.1) 360deg
            );
            animation: rotate 30s linear infinite;
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
            color: white;
            animation: bounce 2s ease-in-out infinite;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        /* Success gradient heading */
        .success-heading {
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #EC4899 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-shift 6s ease infinite;
            background-size: 200% 200%;
        }

        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Subtitle styling */
        .subtitle {
            font-size: 1.1rem;
            color: #666;
            line-height: 1.6;
        }

        /* Light glassmorphic preview card */
        .preview-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(147, 51, 234, 0.1);
            border-radius: 20px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }

        .preview-card:hover {
            background: rgba(255, 255, 255, 0.8);
            transform: translateY(-2px);
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
        }

        /* Special complete card */
        .complete-card {
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05));
            border: 1px solid rgba(147, 51, 234, 0.15);
        }

        /* Light blur overlay */
        .blur-overlay {
            position: absolute;
            inset: 0;
            background: rgba(250, 250, 250, 0.7);
            backdrop-filter: blur(8px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            border-radius: 20px;
            padding-top: 20px;
        }

        .lock-icon {
            width: 30px;
            height: 30px;
            background: rgba(147, 51, 234, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
        }

        .unlock-text {
            font-size: 0.9rem;
            color: #666;
        }

        /* Colorful card icon */
        .card-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #9333EA, #EC4899);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            color: white;
            box-shadow: 0 4px 15px rgba(147, 51, 234, 0.2);
        }

        .card-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #0A0A0A;
        }

        /* Color circles styling */
        .color-circle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: relative;
            filter: blur(3px);
            opacity: 0.8;
            animation: pulse 3s ease-in-out infinite;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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

        /* CTA button with glow */
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
                box-shadow: 0 5px 20px rgba(16, 185, 129, 0.3);
            }
            50% {
                box-shadow: 0 5px 30px rgba(16, 185, 129, 0.5);
            }
        }

        .unlock-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
        }

        /* Animations */
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

        /* Animation classes */
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

        /* Blur specific elements */
        .blur-text {
            filter: blur(8px);
        }

        .blur-light {
            filter: blur(4px);
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
            .success-heading {
                font-size: 2rem;
            }
            
            .preview-card {
                padding: 1.5rem;
            }
        }
      `}</style>

      {/* Background */}
      <div className="gradient-mesh">
        <div className="mesh-gradient"></div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-scale">
            <div className="success-icon">✨</div>
            <h1 className="success-heading">Your Analysis is Ready!</h1>
            <p className="subtitle max-w-2xl mx-auto">
              Complete your purchase to unlock your personalized color palette and style guide
            </p>
          </div>

          <div className="max-w-lg mx-auto space-y-8">
            {/* Season Preview */}
            <div className="preview-card animate-slide-up" style={{ height: '180px', position: 'relative' }}>
              <div className="flex items-center mb-8">
                <div className="card-icon mr-4">⭐</div>
                <h3 className="card-title">Your Season</h3>
              </div>
              <div className="blur-overlay">
                <div className="lock-icon">🔒</div>
                <div className="unlock-text">Unlock to reveal</div>

              </div>
            </div>

            {/* Color Palette Preview */}
            <div className="preview-card animate-slide-up" style={{ height: '180px', position: 'relative' }}>
              <div className="flex items-center mb-8">
                <div className="card-icon mr-4">🎨</div>
                <h3 className="card-title">Your Color Palette</h3>
              </div>
              <div className="flex justify-center gap-4 mb-8">
                {[...analysisResult.coreNeutrals, ...analysisResult.accentLights, ...analysisResult.accentBrights].slice(0, 5).map((color, index) => (
                  <div
                    key={index}
                    className="color-circle"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="blur-overlay">
                <div className="lock-icon">🔒</div>
                <div className="unlock-text">Unlock to view your colors</div>
              </div>
            </div>

            {/* Style Recommendations Preview */}
            <div className="preview-card animate-slide-up" style={{ height: '180px', position: 'relative' }}>
              <div className="flex items-center mb-8">
                <div className="card-icon mr-4">✨</div>
                <h3 className="card-title">Style Recs</h3>
              </div>
              <div className="blur-overlay">
                <div className="lock-icon">🔒</div>
                <div className="unlock-text">Unlock to view recommendations</div>
              </div>
            </div>

            {/* Complete Analysis Card */}
            <div className="preview-card complete-card animate-slide-up" style={{ height: '180px', position: 'relative' }}>
              <div className="flex items-center mb-8">
                <div className="card-icon mr-4">📊</div>
                <h3 className="card-title">Complete Analysis</h3>
              </div>
              <div className="blur-overlay">
                <div className="lock-icon">🔒</div>
                <div className="unlock-text">Unlock Your Complete Analysis</div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="pt-8">
              {!showPayment ? (
                <div className="text-center">
                  <button 
                    onClick={() => setShowPayment(true)}
                    className="unlock-btn w-full mb-4"
                  >
                    Unlock My Color Analysis
                  </button>
                  <p className="text-lg text-gray-600">
                    One-time payment • Instant access
                  </p>
                </div>
              ) : clientSecret ? (
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#8b5cf6',
                        borderRadius: '8px',
                        spacingUnit: '4px'
                      }
                    },
                    loader: 'auto'
                  }}
                >
                  <PaymentForm orderId={orderId!} onSuccess={handlePaymentSuccess} />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full mx-auto" />
                  <p className="text-gray-600 mt-4">Setting up payment...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
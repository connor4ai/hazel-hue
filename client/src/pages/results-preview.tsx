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
    <div className="min-h-screen bg-cream paper-texture">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-warm-gray-dark mb-3 sm:mb-4 px-2">
            Your Color Analysis is Ready!
          </h1>
          <p className="text-base sm:text-lg text-warm-gray px-4">
            Complete your purchase to unlock your personalized color palette and style guide
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Blurred Results Preview */}
          <div className="space-y-4 sm:space-y-6 lg:order-first">
            {/* Season Preview - Blurred */}
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="relative">
                  <div className="filter blur-sm">
                    <Badge className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-terracotta via-marigold to-lagoon text-white mb-3 sm:mb-4">
                      {analysisResult.season}
                    </Badge>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-warm-gray-dark mb-3 sm:mb-4">
                      Your Color Season
                    </h2>
                    <p className="text-sm sm:text-base text-warm-gray px-2">{analysisResult.description}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-lg p-3 sm:p-4 text-center mx-4">
                      <Lock className="w-5 sm:w-6 h-5 sm:h-6 text-warm-gray-dark mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-warm-gray-dark font-medium">Your season is ready!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blurred Color Palette */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-marigold" />
                  Your Color Palette
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pt-0">
                <div className="filter blur-sm">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 mb-4">
                    {[...analysisResult.coreNeutrals, ...analysisResult.accentLights, ...analysisResult.accentBrights].slice(0, 12).map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-lg p-3 sm:p-4 text-center mx-4">
                    <Lock className="w-5 sm:w-6 h-5 sm:h-6 text-warm-gray-dark mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-warm-gray-dark font-medium">Unlock to view your colors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blurred Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Style Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="filter blur-sm space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Best Colors for You</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {analysisResult.signatureColors?.slice(0, 8).map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Makeup Recommendations</h4>
                    <p className="text-sm text-warm-gray">Personalized makeup palette and tips...</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-lg p-4 text-center">
                    <Lock className="w-6 h-6 text-warm-gray-dark mx-auto mb-2" />
                    <p className="text-sm text-warm-gray-dark font-medium">Unlock to view recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div className="lg:sticky lg:top-8 lg:order-last">
            <Card>
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-center text-lg sm:text-xl">
                  <CreditCard className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-terracotta" />
                  Unlock Your Complete Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {/* What's Included */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">What you'll get:</h3>
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
                  <Button 
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold touch-manipulation"
                  >
                    <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Unlock Results - $29
                  </Button>
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

                <p className="text-xs text-warm-gray text-center mt-4">
                  Secure payment processing by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState, ComponentType } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, CreditCard, ArrowLeft, CheckCircle, Tag, Smartphone, Percent } from 'lucide-react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackPaymentInitiated, trackConversion, trackFunnelStep } from "@/lib/utm-analytics";

// Import the properly configured stripePromise with error handling
import { stripePromise } from '@/lib/stripe';

// Error boundary wrapper for Stripe Elements
function StripeElementsWrapper({ 
  clientSecret, 
  originalAmount, 
  finalAmount, 
  discount, 
  promoCode, 
  onPaymentSuccess 
}: {
  clientSecret: string;
  originalAmount: number;
  finalAmount: number;
  discount: number;
  promoCode: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
}) {
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [stripeInstance, setStripeInstance] = useState<any>(null);
  
  useEffect(() => {
    let mounted = true;
    
    const initStripe = async () => {
      try {
        console.log('Loading Stripe...');
        const stripe = await stripePromise;
        
        if (!mounted) return;
        
        if (!stripe) {
          setStripeError('Payment system initialization failed. Please refresh the page.');
          setStripeLoading(false);
          return;
        }
        
        console.log('Stripe loaded successfully');
        setStripeInstance(stripe);
        setStripeLoading(false);
      } catch (error) {
        console.error('Stripe initialization error:', error);
        if (mounted) {
          setStripeError('Payment system unavailable. Please refresh the page or try again later.');
          setStripeLoading(false);
        }
      }
    };
    
    initStripe();
    
    return () => {
      mounted = false;
    };
  }, []);

  if (stripeLoading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading payment system...</p>
      </div>
    );
  }

  if (stripeError || !stripeInstance) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{stripeError || 'Payment system failed to load'}</div>
        <p className="text-gray-600 mb-4">Please refresh the page or try again later.</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <Elements 
      stripe={stripeInstance} 
      options={{ 
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#f97316',
            borderRadius: '8px',
          }
        }
      }}
    >
      <CheckoutForm
        clientSecret={clientSecret}
        originalAmount={originalAmount}
        finalAmount={finalAmount}
        discount={discount}
        promoCode={promoCode}
        onPaymentSuccess={onPaymentSuccess}
      />
    </Elements>
  );
}

interface CheckoutFormProps {
  clientSecret: string;
  originalAmount: number;
  finalAmount: number;
  discount: number;
  promoCode: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
}

function CheckoutForm({ 
  clientSecret, 
  originalAmount, 
  finalAmount, 
  discount, 
  promoCode,
  onPaymentSuccess 
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Development testing bypass for STRIPE promo code
    if (promoCode === 'STRIPE' && import.meta.env.DEV) {
      toast({
        title: "Development Test Mode", 
        description: "STRIPE promo code test completed successfully! ($0.58 payment simulated)",
      });
      
      // Simulate successful payment for testing
      setTimeout(() => {
        const testPaymentId = 'test_payment_intent_' + Date.now();
        
        // Track conversion for test payment
        trackConversion(testPaymentId, finalAmount / 100);
        trackFunnelStep('payment_completed', { 
          payment_intent_id: testPaymentId,
          amount: finalAmount,
          promo_code: promoCode,
          test_mode: true 
        });
        
        onPaymentSuccess(testPaymentId);
        setIsProcessing(false);
      }, 2000);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/processing`,
      },
      redirect: 'if_required',
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    } else if (paymentIntent?.status === 'succeeded') {
      // Track successful payment conversion
      trackConversion(paymentIntent.id, finalAmount / 100);
      trackFunnelStep('payment_completed', { 
        payment_intent_id: paymentIntent.id,
        amount: finalAmount,
        promo_code: promoCode 
      });
      
      onPaymentSuccess(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Quick Payment Options</h3>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            Use Apple Pay, Google Pay, or your saved payment methods for faster checkout
          </p>
          <PaymentElement 
            options={{
              layout: "tabs",
              paymentMethodOrder: ['apple_pay', 'google_pay', 'card']
            }}
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span>${(originalAmount / 100).toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <>
            <div className="flex justify-between items-center mb-2 text-green-600">
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Discount ({promoCode})
              </span>
              <span>-${((originalAmount - finalAmount) / 100).toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
          </>
        )}
        
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total</span>
          <span>${(finalAmount / 100).toFixed(2)}</span>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            {promoCode === 'STRIPE' && import.meta.env.DEV ? 'Testing Payment...' : 'Processing Payment...'}
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            {promoCode === 'STRIPE' && import.meta.env.DEV 
              ? `Test Payment - ${(finalAmount / 100).toFixed(2)} (Dev Mode)`
              : `Complete Payment - ${(finalAmount / 100).toFixed(2)}`
            }
          </>
        )}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Your payment is secured by Stripe. Analysis begins immediately after payment.
      </p>
    </form>
  );
}

export default function CheckoutEnhanced() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [clientSecret, setClientSecret] = useState('');
  const [isCreatingPayment, setIsCreatingPayment] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [originalAmount] = useState(2900); // $29.00
  const [finalAmount, setFinalAmount] = useState(2900);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Check if photos were uploaded
    const storedFiles = sessionStorage.getItem('uploadedFiles');
    if (!storedFiles) {
      toast({
        title: "No Photos Found",
        description: "Please upload your photos first",
        variant: "destructive",
      });
      setLocation('/upload');
      return;
    }

    // Get actual file objects from memory
    const actualFiles = (window as any).uploadedFiles;
    if (actualFiles && actualFiles.length > 0) {
      setUploadedFiles(actualFiles);
    } else {
      // Fallback to metadata if files not in memory
      const fileMetadata = JSON.parse(storedFiles);
      setUploadedFiles(fileMetadata.map((metadata: any) => 
        new File([''], metadata.name, { type: metadata.type })
      ));
    }

    createPaymentIntent();
  }, []);

  const handleFreeOrderCompletion = async (paymentIntentId: string) => {
    try {
      // Get uploaded files from memory
      const files = (window as any).uploadedFiles;
      if (!files || files.length < 3) {
        toast({
          title: "Missing Images",
          description: "Please upload your photos first",
          variant: "destructive",
        });
        setLocation('/upload');
        return;
      }

      // Convert files to base64
      const imagePromises = files.map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      const imageData = await Promise.all(imagePromises);

      // Start the analysis
      const response = await apiRequest("POST", `/api/start-free-analysis/${paymentIntentId}`, {
        images: imageData
      });

      if (response.ok) {
        // Store the payment intent ID for the results page
        sessionStorage.setItem('paymentIntentId', paymentIntentId);
        
        // Navigate to processing/loading page
        setLocation(`/processing/${paymentIntentId}`);
      } else {
        throw new Error('Failed to start analysis');
      }
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: "Could not start your color analysis. Please try again.",
        variant: "destructive",
      });
    }
  };

  const createPaymentIntent = async (promoCodeToApply = '') => {
    try {
      setIsCreatingPayment(true);
      const response = await apiRequest("POST", "/api/create-payment-intent", { 
        amount: originalAmount,
        promoCode: promoCodeToApply
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setFinalAmount(data.amount);
        setDiscount(data.discount);
        
        // Track payment initiation for analytics
        trackPaymentInitiated(data.amount / 100);
        trackFunnelStep('payment_intent_created', { 
          amount: data.amount,
          promo_code: promoCodeToApply,
          is_free: data.isFree 
        });
        
        // Store the order ID for free orders
        if (data.isFree) {
          sessionStorage.setItem('currentOrderId', data.paymentIntentId);
        }
        
        if (promoCodeToApply && data.discount > 0) {
          setAppliedPromoCode(promoCodeToApply);
          
          if (data.isFree) {
            toast({
              title: "Free Analysis!",
              description: `Code "${promoCodeToApply}" gives you a completely free color analysis!`,
            });
          } else {
            toast({
              title: "Promo Code Applied!",
              description: `You saved $${((originalAmount - data.amount) / 100).toFixed(2)} with code "${promoCodeToApply}"`,
            });
          }
        } else if (promoCodeToApply && data.discount === 0) {
          toast({
            title: "Invalid Promo Code",
            description: "The promo code you entered is not valid or has expired.",
            variant: "destructive",
          });
        }
      } else {
        throw new Error('Failed to create payment intent');
      }
    } catch (error: any) {
      toast({
        title: "Payment Setup Failed",
        description: error.message || "Failed to initialize payment",
        variant: "destructive",
      });
    } finally {
      setIsCreatingPayment(false);
      setIsApplyingPromo(false);
    }
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast({
        title: "Invalid Promo Code",
        description: "Please enter a valid promo code",
        variant: "destructive",
      });
      return;
    }

    setIsApplyingPromo(true);
    await createPaymentIntent(promoCode.trim());
  };

  const removePromoCode = async () => {
    setPromoCode('');
    setAppliedPromoCode('');
    setDiscount(0);
    setFinalAmount(originalAmount);
    await createPaymentIntent('');
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      // Store payment info for processing page
      sessionStorage.setItem('paymentIntentId', paymentIntentId);
      
      // Navigate to processing page
      setLocation(`/processing/${paymentIntentId}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Payment succeeded but there was an issue. Please contact support.",
        variant: "destructive",
      });
    }
  };

  if (isCreatingPayment && !clientSecret && finalAmount > 0) {
    return (
      <div className="min-h-screen bg-[#FAF4EE] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Setting up secure payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF4EE] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/upload')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Photos
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
        </div>

        <div className="grid gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Personal Color Analysis</h3>
                    <p className="text-sm text-gray-600">Professional 16-season analysis with PDF report</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {uploadedFiles.length} photos ready
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {uploadedFiles.slice(0, 3).map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs">
                        ✓
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Promo Code Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-orange-500" />
                Promo Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appliedPromoCode ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Percent className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">
                        Code "{appliedPromoCode}" applied!
                      </p>
                      <p className="text-sm text-green-600">
                        You saved ${((originalAmount - finalAmount) / 100).toFixed(2)} ({discount}% off)
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removePromoCode}
                    className="border-green-300 text-green-700 hover:bg-green-100"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1"
                  />
                  <Button
                    onClick={applyPromoCode}
                    disabled={isApplyingPromo || !promoCode.trim()}
                    variant="outline"
                    className="whitespace-nowrap"
                  >
                    {isApplyingPromo ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Apply'
                    )}
                  </Button>
                </div>
              )}
              
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium mb-2">Available codes:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>• FIRST10 - 10% off</div>
                  <div>• WELCOME - 15% off</div>
                  <div>• STUDENT - 20% off</div>
                  <div>• SAVE5 - 5% off</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {finalAmount === 0 ? (
                <div className="text-center py-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Free Color Analysis!</h3>
                    <p className="text-green-700">Your promo code covers the full cost. No payment required.</p>
                  </div>
                  
                  <Button
                    onClick={() => handleFreeOrderCompletion(sessionStorage.getItem('currentOrderId') || `free_order_${Date.now()}`)}
                    className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Start Free Analysis
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Your analysis will begin immediately after clicking the button above.
                  </p>
                </div>
              ) : clientSecret ? (
                <StripeElementsWrapper
                  clientSecret={clientSecret}
                  originalAmount={originalAmount}
                  finalAmount={finalAmount}
                  discount={discount}
                  promoCode={appliedPromoCode}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              ) : (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
                  <p className="text-gray-600">Setting up payment...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
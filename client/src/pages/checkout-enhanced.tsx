import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, CreditCard, ArrowLeft, CheckCircle, Tag, Smartphone, Percent } from 'lucide-react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Complete Payment - ${(finalAmount / 100).toFixed(2)}
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

    const files = JSON.parse(storedFiles);
    setUploadedFiles(files.map((fileData: any) => {
      // Handle different file data formats
      if (fileData.data && typeof fileData.data === 'string' && fileData.data.includes(',')) {
        const byteCharacters = atob(fileData.data.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], fileData.name, { type: fileData.type });
      } else if (fileData instanceof File) {
        return fileData;
      } else {
        // Create a placeholder file if data format is unexpected
        return new File([''], fileData.name || 'photo.jpg', { type: fileData.type || 'image/jpeg' });
      }
    }));

    createPaymentIntent();
  }, []);

  const handleFreeOrderCompletion = (paymentIntentId: string) => {
    // Store the payment intent ID for the results page
    sessionStorage.setItem('paymentIntentId', paymentIntentId);
    
    // Navigate directly to processing/loading page for free orders
    setLocation(`/processing/${paymentIntentId}`);
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
                <Elements 
                  stripe={stripePromise} 
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
                    promoCode={appliedPromoCode}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Elements>
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
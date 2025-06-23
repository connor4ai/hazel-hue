import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Lock, 
  ArrowLeft, 
  Camera, 
  Shield, 
  Sparkles, 
  Clock,
  CheckCircle,
  Apple,
  CreditCard
} from "lucide-react";
import { stripePromise } from "@/lib/stripe";

function CheckoutForm({ clientSecret, onPaymentSuccess }: { 
  clientSecret: string; 
  onPaymentSuccess: (paymentIntentId: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    // Get email from form
    const form = e.target as HTMLFormElement;
    const emailInput = form.querySelector('#email') as HTMLInputElement;
    const email = emailInput?.value;

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/processing`,
        },
        redirect: 'if_required'
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Update order with email before redirecting
        try {
          await apiRequest('POST', '/api/orders/update-email', {
            paymentIntentId: paymentIntent.id,
            email: email
          });
        } catch (emailError) {
          console.error('Failed to update email:', emailError);
        }
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
          />
          <p className="text-xs text-gray-500 mt-1">We'll email your results to this address</p>
        </div>
        
        <PaymentElement 
          options={{
            layout: "tabs",
            paymentMethodOrder: ['apple_pay', 'card']
          }}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={!stripe || isLoading}
        className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white py-3 text-lg font-semibold"
      >
        {isLoading ? (
          <>
            <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Complete Payment - $29
          </>
        )}
      </Button>
    </form>
  );
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isCreatingPayment, setIsCreatingPayment] = useState(true);

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
    setUploadedFiles(files);
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { 
        amount: 2900, // $29.00 in cents
        metadata: {
          hasPhotos: 'true',
          photoCount: uploadedFiles.length || 3
        }
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
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
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      // Get the actual file objects from window storage
      const files = (window as any).uploadedFiles;
      
      if (!files || files.length < 3) {
        throw new Error('Photos not found');
      }

      // Create order with photos and start analysis
      const formData = new FormData();
      files.forEach((file: File) => {
        formData.append('images', file);
      });
      formData.append('paymentIntentId', paymentIntentId);

      const response = await apiRequest('POST', '/api/create-order-with-analysis', formData);

      if (response.ok) {
        const data = await response.json();
        
        // Clear stored files
        sessionStorage.removeItem('uploadedFiles');
        sessionStorage.removeItem('uploadedFileUrls');
        delete (window as any).uploadedFiles;

        toast({
          title: "Payment Successful!",
          description: "Your color analysis is starting now...",
        });

        // Navigate to processing page
        setLocation(`/processing/${data.orderId}`);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error: any) {
      toast({
        title: "Order Creation Failed",
        description: error.message || "Failed to start analysis",
        variant: "destructive",
      });
    }
  };

  if (isCreatingPayment) {
    return (
      <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-warm-gray">Setting up payment...</p>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-warm-gray-dark mb-4">Payment Setup Failed</h1>
          <Button onClick={() => setLocation('/upload')} className="bg-terracotta hover:bg-terracotta-dark text-white">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/upload')}
            className="text-warm-gray hover:text-warm-gray-dark mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Photos
          </Button>
          
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-warm-gray-dark mb-4">
              Complete Your Order
            </h1>
            <p className="text-lg text-warm-gray">
              Secure payment to start your color analysis
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2 text-terracotta" />
                Your Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Personal Color Analysis</span>
                <span className="font-bold">$29.00</span>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Photos Uploaded</p>
                    <p className="text-sm text-warm-gray">{uploadedFiles.length} high-quality photos ready for analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-marigold mt-0.5" />
                  <div>
                    <p className="font-medium">AI Color Analysis</p>
                    <p className="text-sm text-warm-gray">Professional results using advanced AI technology</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-lagoon mt-0.5" />
                  <div>
                    <p className="font-medium">Instant Results</p>
                    <p className="text-sm text-warm-gray">Complete analysis delivered in under 5 minutes</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Satisfaction Guaranteed</span>
                </div>
                <p className="text-sm text-green-700">
                  100% money-back guarantee if you're not completely satisfied with your results.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-terracotta" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise} options={{ 
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#C17B5B', // terracotta
                  }
                }
              }}>
                <CheckoutForm 
                  clientSecret={clientSecret} 
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </Elements>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-warm-gray">
                  <Shield className="w-4 h-4" />
                  <span>Secured by Stripe • SSL Encrypted</span>
                </div>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-warm-gray">
                  <div className="flex items-center space-x-1">
                    <Apple className="w-4 h-4" />
                    <span>Apple Pay</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-4 h-4" />
                    <span>All major cards</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
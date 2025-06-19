import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { Lock, ArrowLeft } from "lucide-react";
import { stripePromise } from "@/lib/stripe";

function CheckoutForm({ clientSecret, paymentIntentId }: { clientSecret: string; paymentIntentId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/upload/${paymentIntentId}`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isLoading}
        className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-8 py-3 rounded-full font-semibold text-lg h-auto shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Lock className="w-4 h-4 mr-2" />
        {isLoading ? "Processing..." : "Complete Payment - $29"}
      </Button>
    </form>
  );
}

export default function Checkout() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { email });
      const data = await response.json();
      
      if (response.ok) {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        setShowPayment(true);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create payment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to payment service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#DA8A67',
      },
    },
  };

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-warm-gray hover:text-warm-gray-dark mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="font-serif text-3xl font-bold text-warm-gray-dark mb-2">
            Complete Your Order
          </h1>
          <p className="text-warm-gray">
            Secure checkout for your personal color analysis - $29
          </p>
        </div>

        {!showPayment ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Enter Your Email</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="mt-1"
                  />
                  <p className="text-sm text-warm-gray mt-1">
                    We'll send your color analysis report to this email
                  </p>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-8 py-3 rounded-full font-semibold text-lg h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue to Payment
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Payment Details</CardTitle>
              <p className="text-center text-warm-gray">
                Complete your $29 payment for personal color analysis
              </p>
            </CardHeader>
            <CardContent>
              {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm clientSecret={clientSecret} paymentIntentId={paymentIntentId} />
                </Elements>
              )}
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center text-sm text-warm-gray">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Lock className="w-4 h-4" />
            <span>Secure SSL encrypted payment</span>
          </div>
          <p>Your payment information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
}
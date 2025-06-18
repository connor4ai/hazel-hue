import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { Lock, ArrowLeft } from "lucide-react";

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState("");

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
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/create-payment-intent", { email });
      const data = await response.json();
      
      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create payment intent",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/upload/processing`,
      },
      redirect: 'if_required',
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      // Payment succeeded
      try {
        const verifyResponse = await apiRequest("POST", "/api/verify-payment", { 
          paymentIntentId 
        });
        const verifyData = await verifyResponse.json();
        
        if (verifyData.success) {
          toast({
            title: "Payment Successful",
            description: "Thank you for your purchase! Redirecting to upload page...",
          });
          setLocation(`/upload/${verifyData.orderId}`);
        }
      } catch (error: any) {
        toast({
          title: "Verification Error",
          description: "Payment successful but verification failed. Please contact support.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }
  };

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/')}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="font-serif text-2xl text-warm-gray-dark">
                Get Started
              </CardTitle>
            </div>
            <p className="text-warm-gray">
              Enter your email to begin your color analysis journey
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-warm-gray-dark">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-1"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-terracotta hover:bg-terracotta/90 text-white h-12"
              >
                {isLoading ? "Creating..." : "Continue to Payment"}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-warm-gray">
              <Lock className="h-4 w-4 inline mr-1" />
              Your information is secure and protected
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setClientSecret("");
                setPaymentIntentId("");
              }}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="font-serif text-2xl text-warm-gray-dark">
              Complete Payment
            </CardTitle>
          </div>
          <p className="text-warm-gray">
            Secure checkout for your color analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-sage/10 rounded-xl p-4 flex items-center justify-between mb-6">
            <span className="text-warm-gray-dark font-medium">Personal Color Analysis</span>
            <span className="text-2xl font-bold text-terracotta">$29</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            
            <Button 
              type="submit" 
              disabled={!stripe || isLoading}
              className="w-full bg-terracotta hover:bg-terracotta/90 text-white h-12"
            >
              {isLoading ? "Processing..." : "Pay $29"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-warm-gray">
            <Lock className="h-4 w-4 inline mr-1" />
            Secure payment • 30-day money-back guarantee
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

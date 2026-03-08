import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Payment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      
      const response = await apiRequest("POST", "/api/create-checkout");
      const data = await response.json();
      
      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF4EE] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Discover Your Colors?
          </h1>
          <p className="text-lg text-gray-600">
            Complete your payment to begin your personalized color analysis.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Color Analysis</CardTitle>
            <CardDescription>
              Professional 16-season color analysis with personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span>AI-powered season identification</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span>Personalized color palette</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span>Professional PDF report</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span>Style recommendations</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total</span>
                <span>$29.00</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Creating Secure Checkout...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Complete Purchase - $29.00
                </>
              )}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Secure payment powered by Stripe. Your analysis will begin immediately after payment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
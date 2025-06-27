import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Palette, Sparkles } from 'lucide-react';

export default function AnalyzingPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Starting your analysis...");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Get order ID from session storage
    const storedOrderId = sessionStorage.getItem('currentOrderId');
    if (!storedOrderId) {
      // If no order ID, redirect back to upload
      setLocation('/upload');
      return;
    }
    setOrderId(storedOrderId);

    // Start checking analysis status
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/orders/${storedOrderId}/status`);
        if (response.ok) {
          const data = await response.json();
          
          // Update progress based on status
          switch (data.status) {
            case 'queued':
              setProgress(25);
              setStatusMessage("Your photos are in the analysis queue...");
              break;
            case 'files_uploaded':
              setProgress(50);
              setStatusMessage("Photos uploaded! Starting AI analysis...");
              break;
            case 'processing':
              setProgress(75);
              setStatusMessage("AI is analyzing your colors...");
              break;
            case 'completed':
              setProgress(100);
              setStatusMessage("Analysis complete! Preparing your results...");
              // Redirect to blurred results page
              setTimeout(() => {
                setLocation(`/results-preview/${storedOrderId}`);
              }, 1500);
              return;
            case 'failed':
              toast({
                title: "Analysis Failed",
                description: "There was an issue processing your photos. Please try again.",
                variant: "destructive",
              });
              setLocation('/upload');
              return;
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    // Check status immediately and then every 3 seconds
    checkStatus();
    const interval = setInterval(checkStatus, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [setLocation, toast]);

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12">
              {/* Logo/Icon */}
              <div className="mb-8">
                <div className="relative mx-auto w-24 h-24">
                  <Palette className="w-24 h-24 text-sage mx-auto animate-pulse" />
                  <Sparkles className="w-8 h-8 text-marigold absolute -top-2 -right-2 animate-bounce" />
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-4xl font-bold text-warm-gray-dark mb-6">
                Discovering Your Perfect Colors
              </h1>

              {/* Status Message */}
              <p className="text-xl text-warm-gray mb-8">
                {statusMessage}
              </p>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-sage via-marigold to-terracotta h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-warm-gray mt-2">{progress}% complete</p>
              </div>

              {/* Loading Animation */}
              <div className="flex justify-center mb-6">
                <Loader2 className="h-8 w-8 animate-spin text-sage" />
              </div>

              {/* Reassuring Text */}
              <div className="text-warm-gray space-y-2">
                <p className="text-sm">Your photos are being analyzed using advanced AI technology</p>
                <p className="text-sm">This usually takes 30-60 seconds</p>
              </div>

              {/* Order ID for reference */}
              {orderId && (
                <p className="text-xs text-warm-gray/70 mt-6">
                  Analysis ID: {orderId}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
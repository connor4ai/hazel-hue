import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Download, Home, Palette } from "lucide-react";
import ColorWheel from "@/components/color-wheel";

interface AnalysisResult {
  season: string;
  description: string;
  coreNeutrals: string[];
  accentLights: string[];
  accentBrights: string[];
  recommendations: {
    metals: string;
    eyewear: string;
    makeup: string;
  };
}

interface Order {
  id: number;
  status: string;
  analysisResult: AnalysisResult | null;
  pdfPath: string | null;
}

export default function Analysis() {
  const { orderId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiRequest("GET", `/api/order/${orderId}`);
        const orderData = await response.json();
        setOrder(orderData);

        if (orderData.status === 'processing') {
          // Poll for updates every 2 seconds
          const interval = setInterval(async () => {
            try {
              const updateResponse = await apiRequest("GET", `/api/order/${orderId}`);
              const updatedOrder = await updateResponse.json();
              setOrder(updatedOrder);
              
              if (updatedOrder.status === 'completed') {
                clearInterval(interval);
                setIsLoading(false);
              }
            } catch (error) {
              console.error('Error polling order status:', error);
            }
          }, 2000);

          // Clean up interval after 5 minutes
          setTimeout(() => {
            clearInterval(interval);
            setIsLoading(false);
          }, 300000);

          return () => clearInterval(interval);
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load analysis",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, toast]);

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download-report/${orderId}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `color-analysis-report-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const ColorPalette = ({ title, colors }: { title: string; colors: string[] }) => (
    <div className="text-center">
      <h4 className="font-semibold text-warm-gray-dark mb-3">{title}</h4>
      <div className="flex justify-center space-x-2">
        {colors.map((color, index) => (
          <div 
            key={index}
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );

  if (isLoading || !order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-8">
              Thank you! Analysis in Progress...
            </h2>
            <ColorWheel className="w-24 h-24 mx-auto mb-8" />
            <p className="text-lg text-warm-gray">
              Our AI is analyzing your photos to determine your perfect color palette
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (order.status !== 'completed' || !order.analysisResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="font-serif text-2xl font-bold text-warm-gray-dark mb-4">
              Analysis in Progress
            </h2>
            <ColorWheel className="w-16 h-16 mx-auto mb-4" />
            <p className="text-warm-gray">
              Please wait while we complete your color analysis...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { analysisResult } = order;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
              Your Color Analysis is Ready!
            </CardTitle>
            <p className="text-lg text-warm-gray">
              Your personalized report has been sent to your email and is available for download
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="font-serif text-2xl font-bold text-warm-gray-dark mb-6 text-center">
                  You are a <span className="text-terracotta">{analysisResult.season}</span>
                </h3>
                
                <p className="text-center text-warm-gray mb-8 text-lg">
                  {analysisResult.description}
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <ColorPalette title="Core Neutrals" colors={analysisResult.coreNeutrals} />
                  <ColorPalette title="Accent Lights" colors={analysisResult.accentLights} />
                  <ColorPalette title="Accent Brights" colors={analysisResult.accentBrights} />
                </div>
                
                <div className="bg-sage/10 rounded-2xl p-6 mb-8">
                  <h4 className="font-serif text-xl font-bold text-warm-gray-dark mb-4 flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-sage" />
                    Quick Recommendations
                  </h4>
                  <div className="space-y-2 text-warm-gray">
                    <p><strong>Metals:</strong> {analysisResult.recommendations.metals}</p>
                    <p><strong>Eyewear:</strong> {analysisResult.recommendations.eyewear}</p>
                    <p><strong>Makeup:</strong> {analysisResult.recommendations.makeup}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleDownload}
                    className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 rounded-full font-semibold text-lg h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Full Report
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/')}
                    className="border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 rounded-full font-semibold text-lg h-auto transition-all duration-300"
                  >
                    <Home className="h-5 w-5 mr-2" />
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

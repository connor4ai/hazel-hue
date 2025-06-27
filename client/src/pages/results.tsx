import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Palette, 
  Download, 
  Share2,
  Heart,
  Shirt,
  Gem,
  ArrowLeft,
  CheckCircle,
  Star,
  Mail
} from 'lucide-react';

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
  createdAt: string;
  email: string | null;
  emailSent: boolean;
}

export default function Results() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  const orderId = params.orderId;

  useEffect(() => {
    if (!orderId) {
      setLocation('/');
      return;
    }

    fetchOrderResults();
  }, [orderId]);

  const fetchOrderResults = async () => {
    try {
      const response = await apiRequest('GET', `/api/orders/${orderId}`);
      
      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
        
        if (data.order.status !== 'completed' || !data.order.analysisResult) {
          toast({
            title: "Analysis Not Ready",
            description: "Your color analysis is still processing",
            variant: "destructive",
          });
          setLocation(`/processing/${orderId}`);
        } else {
          // Automatically send email when user first accesses completed results
          sendEmailAutomatically(data.order);
        }
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your results",
        variant: "destructive",
      });
      setLocation('/');
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailAutomatically = async (order: Order) => {
    // Check if email has already been sent or if no email on order
    if (!order.email || order.emailSent) {
      return;
    }

    try {
      const response = await apiRequest('POST', `/api/orders/${order.id}/email-results`, {
        email: order.email
      });
      
      if (response.ok) {
        console.log('Analysis results emailed automatically to:', order.email);
        setEmailSent(true);
        
        // Show a subtle notification that email was sent
        toast({
          title: "Results Emailed",
          description: `Your color analysis has been sent to ${order.email}`,
        });
      }
    } catch (error) {
      console.error('Error sending automatic email:', error);
      // Don't show error toast for automatic email failures
    }
  };

  const handleDownloadPDF = async () => {
    if (!order?.pdfPath) {
      toast({
        title: "PDF Not Available",
        description: "Your PDF report is being generated",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await apiRequest('GET', `/api/orders/${orderId}/pdf`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `color-analysis-${orderId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "Download Started",
          description: "Your color analysis PDF is downloading",
        });
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download your report",
        variant: "destructive",
      });
    }
  };

  const handleEmailReport = async () => {
    try {
      const response = await apiRequest('POST', `/api/orders/${orderId}/email`);
      
      if (response.ok) {
        setEmailSent(true);
        toast({
          title: "Email Sent!",
          description: "Your color analysis report has been sent to your email",
        });
      }
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "Failed to send email report",
        variant: "destructive",
      });
    }
  };

  const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
    <div className="text-center">
      <div 
        className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white shadow-lg"
        style={{ backgroundColor: color }}
      ></div>
      <p className="text-xs text-warm-gray font-medium">{label}</p>
    </div>
  );

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
        <div className="text-center">
          <h1 className="text-2xl font-bold text-warm-gray-dark mb-4">Results Not Available</h1>
          <Button onClick={() => setLocation('/')} className="bg-terracotta hover:bg-terracotta-dark text-white">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const { analysisResult } = order;

  return (
    <div className="min-h-screen bg-cream paper-texture">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-terracotta via-marigold to-lagoon text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h1 className="font-serif text-5xl font-bold mb-4">
            Your Colors Have Arrived!
          </h1>
          <p className="text-xl opacity-90">
            Discover your personal color season and transform your style
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/account')}
            className="text-warm-gray hover:text-warm-gray-dark"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Account
          </Button>
        </div>

        {/* Color Season Card */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-terracotta via-marigold to-lagoon text-white">
                {analysisResult.season}
              </Badge>
              <h2 className="font-serif text-3xl font-bold text-warm-gray-dark mt-4 mb-4">
                Your Color Season
              </h2>
              <p className="text-lg text-warm-gray max-w-3xl mx-auto leading-relaxed">
                {analysisResult.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Core Neutrals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shirt className="w-5 h-5 mr-2 text-warm-gray-dark" />
                Core Neutrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-warm-gray mb-4">
                Your foundational colors for wardrobe staples
              </p>
              <div className="grid grid-cols-3 gap-4">
                {analysisResult.coreNeutrals.map((color, index) => (
                  <ColorSwatch 
                    key={index} 
                    color={color} 
                    label={`Neutral ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accent Lights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-warm-gray-dark" />
                Accent Lights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-warm-gray mb-4">
                Soft, flattering colors for everyday wear
              </p>
              <div className="grid grid-cols-3 gap-4">
                {analysisResult.accentLights.map((color, index) => (
                  <ColorSwatch 
                    key={index} 
                    color={color} 
                    label={`Light ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accent Brights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gem className="w-5 h-5 mr-2 text-warm-gray-dark" />
                Accent Brights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-warm-gray mb-4">
                Bold, statement colors for special occasions
              </p>
              <div className="grid grid-cols-3 gap-4">
                {analysisResult.accentBrights.map((color, index) => (
                  <ColorSwatch 
                    key={index} 
                    color={color} 
                    label={`Bright ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-marigold" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-marigold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gem className="w-6 h-6 text-marigold" />
                </div>
                <h3 className="font-semibold text-warm-gray-dark mb-2">Metals</h3>
                <p className="text-sm text-warm-gray">{analysisResult.recommendations.metals}</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-lagoon/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-lagoon" />
                </div>
                <h3 className="font-semibold text-warm-gray-dark mb-2">Eyewear</h3>
                <p className="text-sm text-warm-gray">{analysisResult.recommendations.eyewear}</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Palette className="w-6 h-6 text-terracotta" />
                </div>
                <h3 className="font-semibold text-warm-gray-dark mb-2">Makeup</h3>
                <p className="text-sm text-warm-gray">{analysisResult.recommendations.makeup}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-terracotta to-marigold hover:from-terracotta/90 hover:to-marigold/90 text-white py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Report
          </Button>
          
          <Button 
            onClick={handleEmailReport}
            disabled={emailSent}
            variant="outline"
            className="border-lagoon text-lagoon hover:bg-lagoon hover:text-white py-3"
          >
            <Mail className="w-5 h-5 mr-2" />
            {emailSent ? 'Email Sent!' : 'Email Report'}
          </Button>
          
          <Button 
            onClick={() => setLocation('/checkout')}
            variant="outline"
            className="border-sage text-sage hover:bg-sage hover:text-white py-3"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Order Another Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
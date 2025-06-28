import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Copy, Check, Shield, CreditCard, Smartphone, Palette, Star, Heart, Eye, Crown } from 'lucide-react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

interface OutfitLook {
  id: string;
  name: string;
  image: string;
  brand: string;
  priceRange: string;
  keyColor: string;
  keyColorHex: string;
  shopUrl: string;
  products: any[];
}

interface Order {
  id: number;
  status: string;
  result: AnalysisResult;
  pdfPath: string;
}

const colorNames: { [key: string]: string } = {
  '#000000': 'True Black', '#333333': 'Charcoal', '#666666': 'Steel Gray', 
  '#999999': 'Silver Gray', '#CCCCCC': 'Light Gray', '#FFFFFF': 'Pure White',
  '#E0E0E0': 'Platinum', '#F5F5F5': 'Pearl White', '#D3D3D3': 'Cloud Gray',
  '#FAFAFA': 'Snow White', '#F0F0F0': 'Ivory', '#E8E8E8': 'Whisper Gray',
  '#0033FF': 'Royal Blue', '#6600CC': 'Deep Purple', '#FF0066': 'Fuchsia Pink',
  '#FF3300': 'Crimson Red', '#0099FF': 'Electric Blue', '#33CC33': 'Emerald Green'
};

const seasonDescriptions: { [key: string]: { tagline: string; personality: string; signature: string } } = {
  'Cool Winter': {
    tagline: 'Bold, Dramatic, Sophisticated',
    personality: 'You command attention with striking contrasts and jewel tones. Your natural palette speaks to confidence and elegance.',
    signature: 'High contrast combinations with cool undertones create your most powerful looks.'
  },
  'Warm Spring': {
    tagline: 'Fresh, Vibrant, Energetic', 
    personality: 'You radiate warmth and vitality with clear, bright colors. Your palette celebrates life and optimism.',
    signature: 'Golden undertones and clear brights bring out your natural glow.'
  }
};

export default function ResultsPremium() {
  const [, params] = useRoute('/results/:orderId');
  const orderId = params?.orderId;
  const [currentCard, setCurrentCard] = useState(0);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}/status`],
    enabled: !!orderId,
  });

  const { data: outfits } = useQuery<OutfitLook[]>({
    queryKey: [`/api/outfits/${orderId}`],
    enabled: !!orderId && order?.status === 'completed',
  });

  const analysisResult = order?.result;

  useEffect(() => {
    if (orderId) {
      setShareLink(`${window.location.origin}/results/${orderId}`);
    }
  }, [orderId]);

  const downloadPDF = async () => {
    try {
      console.log('Starting PDF download for order:', orderId);
      const response = await fetch(`/api/orders/${orderId}/pdf`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('PDF download failed:', response.status, errorText);
        throw new Error(`Download failed: ${response.status}`);
      }
      
      const blob = await response.blob();
      console.log('PDF blob received, size:', blob.size);
      
      if (blob.size === 0) {
        throw new Error('Empty PDF received');
      }
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${analysisResult?.season.replace(/\s+/g, '-')}-Professional-Report.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
      
      toast({
        title: "Professional Report Downloaded",
        description: "Your comprehensive color analysis is ready for printing.",
      });
    } catch (error) {
      console.error('PDF download error:', error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  const downloadWalletCard = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/wallet-card`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${analysisResult?.season.replace(/\s+/g, '-')}-Color-Card.pkpass`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Color Card Ready",
        description: "Added to Apple Wallet for shopping color matches.",
      });
    } catch (error) {
      toast({
        title: "Wallet Card Failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  const shareResults = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `My ${analysisResult?.season} Color Analysis`,
          text: `check out my AI color analysis results from hazel & hue! ${shareLink} - hazelandhue.com`,
          url: shareLink
        });
      } else {
        await navigator.clipboard.writeText(`check out my AI color analysis results from hazel & hue! ${shareLink} - hazelandhue.com`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        toast({
          title: "Results Shared",
          description: "Link copied to clipboard",
        });
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  const ColorSwatch = ({ color, size = "w-12 h-12", showName = true }: { color: string; size?: string; showName?: boolean }) => (
    <div 
      className="group relative cursor-pointer transition-all duration-300 hover:scale-110"
      onMouseEnter={() => setHoveredColor(color)}
      onMouseLeave={() => setHoveredColor(null)}
    >
      <div 
        className={cn(
          size, 
          "rounded-full border-4 border-white shadow-lg ring-2 ring-gray-200 transition-all duration-300",
          "group-hover:ring-4 group-hover:ring-purple-300 group-hover:shadow-xl"
        )}
        style={{ backgroundColor: color }}
      />
      {showName && hoveredColor === color && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full whitespace-nowrap z-50 shadow-lg">
          {colorNames[color] || color}
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Preparing your premium results...</p>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No analysis results found</p>
        </div>
      </div>
    );
  }

  const seasonInfo = seasonDescriptions[analysisResult.season] || seasonDescriptions['Cool Winter'];
  const totalCards = 5;

  const cards = [
    {
      id: 'hero',
      title: 'Your Color Identity',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30"></div>
              <Badge className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg px-8 py-3 rounded-2xl font-bold shadow-xl">
                <Crown className="w-5 h-5 mr-2" />
                You are a {analysisResult.season}
              </Badge>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{seasonInfo.tagline}</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-md mx-auto mb-6">
              {seasonInfo.personality}
            </p>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-900">Your Signature Style</span>
              </div>
              <p className="text-purple-800 text-center italic">
                "{seasonInfo.signature}"
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 text-center">Color Analysis Details</h4>
            <p className="text-gray-700 text-sm leading-relaxed text-center">
              {analysisResult.description}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'palette',
      title: 'Your Complete Palette',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Color Collection</h3>
            <p className="text-gray-600 mb-8">Each color has been precisely calibrated for your unique features</p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-gray-600" />
                Foundation Neutrals
              </h4>
              <div className="grid grid-cols-6 gap-4 justify-items-center">
                {analysisResult.coreNeutrals.map((color, index) => (
                  <ColorSwatch key={index} color={color} />
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-4 text-center">
                Your essential building blocks - mix and match with confidence
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                Accent Lights
              </h4>
              <div className="grid grid-cols-6 gap-4 justify-items-center">
                {analysisResult.accentLights.map((color, index) => (
                  <ColorSwatch key={index} color={color} />
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-4 text-center">
                Soft highlights that enhance your natural glow
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-purple-600" />
                Statement Brights
              </h4>
              <div className="grid grid-cols-6 gap-4 justify-items-center">
                {analysisResult.accentBrights.map((color, index) => (
                  <ColorSwatch key={index} color={color} />
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-4 text-center">
                Your power colors - use sparingly for maximum impact
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wow-colors',
      title: 'Your WOW Colors',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Colors That Make You Shine</h3>
            <p className="text-gray-600 mb-8">These 6 colors will get you the most compliments</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {analysisResult.accentBrights.slice(0, 6).map((color, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                  <div className="text-center">
                    <ColorSwatch color={color} size="w-16 h-16" showName={false} />
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">
                        {colorNames[color] || color}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Perfect for {index % 3 === 0 ? 'statement pieces' : index % 3 === 1 ? 'accessories' : 'special occasions'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-orange-600 mr-2" />
              <span className="font-semibold text-orange-900">Pro Tip</span>
            </div>
            <p className="text-orange-800 text-center">
              Use these colors near your face for the most flattering effect. A scarf, earrings, or lipstick in these shades will instantly elevate any outfit.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'styling',
      title: 'Professional Styling Guide',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Style Recommendations</h3>
            <p className="text-gray-600 mb-8">Curated specifically for your {analysisResult.season} palette</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Best Metals & Jewelry</h4>
                  <p className="text-gray-700">{analysisResult.recommendations.metals}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-500 rounded-lg flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Makeup & Beauty</h4>
                  <p className="text-gray-700">{analysisResult.recommendations.makeup}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Eyewear & Frames</h4>
                  <p className="text-gray-700">{analysisResult.recommendations.eyewear}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-4 text-center">Shopping Strategy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Always test colors near your face</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Build outfits around your neutrals</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Use brights as accent pieces</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Reference your wallet card when shopping</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'outfits',
      title: 'Curated Looks',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready-to-Shop Outfits</h3>
            <p className="text-gray-600 mb-8">Professional styling using your perfect colors</p>
          </div>
          
          {outfits && outfits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfits.map((outfit) => (
                <Card key={outfit.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={outfit.image} 
                        alt={outfit.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <div 
                          className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                          style={{ backgroundColor: outfit.keyColorHex }}
                        />
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-1">{outfit.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{outfit.brand}</p>
                      <p className="text-sm font-semibold text-purple-600 mb-3">{outfit.priceRange}</p>
                      
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        onClick={() => window.open(outfit.shopUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Shop This Look
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Curating your perfect outfits...</p>
            </div>
          )}
        </div>
      )
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + totalCards) % totalCards);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-20"></div>
            <div className="relative bg-white rounded-full p-4 shadow-xl border border-gray-100">
              <Palette className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Premium Color Analysis</h1>
          <p className="text-gray-600">Professional-grade results powered by AI color science</p>
        </div>

        {/* Card Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalCards }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  currentCard === index 
                    ? "bg-purple-600 scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
                
                {/* Card Header */}
                <div className="relative bg-white border-b border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mr-4",
                        "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      )}>
                        {cards[currentCard].id === 'hero' && <Crown className="w-6 h-6" />}
                        {cards[currentCard].id === 'palette' && <Palette className="w-6 h-6" />}
                        {cards[currentCard].id === 'wow-colors' && <Star className="w-6 h-6" />}
                        {cards[currentCard].id === 'styling' && <Sparkles className="w-6 h-6" />}
                        {cards[currentCard].id === 'outfits' && <ExternalLink className="w-6 h-6" />}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{cards[currentCard].title}</h2>
                        <p className="text-sm text-gray-600">Step {currentCard + 1} of {totalCards}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevCard}
                        disabled={currentCard === 0}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextCard}
                        disabled={currentCard === totalCards - 1}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative p-8">
                  {cards[currentCard].content}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Take Your Results With You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={downloadPDF}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-12"
              >
                <Download className="w-5 h-5 mr-2" />
                Professional PDF
              </Button>
              
              <Button 
                onClick={downloadWalletCard}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Add to Wallet
              </Button>
              
              <Button 
                variant="outline" 
                onClick={shareResults}
                className="font-semibold border-2 h-12"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share className="w-5 h-5 mr-2" />
                    Share Results
                  </>
                )}
              </Button>
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <Smartphone className="w-4 h-4 mr-2" />
                <span>Professional color matching for in-store shopping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
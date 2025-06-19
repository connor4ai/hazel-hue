import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Eye, Sparkles } from 'lucide-react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  products: {
    name: string;
    price: string;
    url: string;
    color: string;
  }[];
}

interface Order {
  id: number;
  status: string;
  result: AnalysisResult | null;
  pdfPath: string | null;
  createdAt: string;
}

export default function ResultsNew() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/results/:orderId');
  const { toast } = useToast();
  const [currentCard, setCurrentCard] = useState(0);
  const [currentOutfit, setCurrentOutfit] = useState(0);
  const [highlightedOutfit, setHighlightedOutfit] = useState<string | null>(null);

  const orderId = params?.orderId || null;

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}/status`],
    enabled: !!orderId,
  });

  // Get outfit data from server - using actual fashion API integration
  const { data: outfitLooks = [] } = useQuery<OutfitLook[]>({
    queryKey: [`/api/outfits/${orderId}`],
    enabled: !!orderId && !!order?.result,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF4EE] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!order || !order.result) {
    return (
      <div className="min-h-screen bg-[#FAF4EE] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Results Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your analysis results.</p>
          <Button onClick={() => setLocation('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const result = order.result;

  const handleDownload = async () => {
    try {
      const response = await apiRequest("GET", `/api/orders/${orderId}/pdf`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `color-analysis-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Failed to download your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/results/${orderId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied",
      description: "Your results link has been copied to clipboard.",
    });
  };

  const ColorSwatch = ({ color, size = "w-8 h-8" }: { color: string; size?: string }) => (
    <div
      className={`${size} rounded-full border-2 border-gray-200 shadow-sm`}
      style={{ backgroundColor: color }}
      title={color}
    />
  );

  const nextCard = () => setCurrentCard(prev => (prev + 1) % 4);
  const prevCard = () => setCurrentCard(prev => (prev - 1 + 4) % 4);
  
  const nextOutfit = () => setCurrentOutfit(prev => (prev + 1) % outfitLooks.length);
  const prevOutfit = () => setCurrentOutfit(prev => (prev - 1 + outfitLooks.length) % outfitLooks.length);

  const handleOutfitHover = (outfitId: string) => {
    setHighlightedOutfit(outfitId);
  };

  const handleOutfitLeave = () => {
    setHighlightedOutfit(null);
  };

  const cards = [
    {
      title: "Your Season",
      content: (
        <div className="text-center py-12">
          <Badge className="text-3xl px-8 py-4 mb-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold">
            {result.season}
          </Badge>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mx-auto">
            {result.description}
          </p>
        </div>
      )
    },
    {
      title: "Your Complete Palette",
      content: (
        <div className="space-y-8 py-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Core Neutrals</h4>
            <div className="flex flex-wrap gap-4 justify-center">
              {result.coreNeutrals.map((color: string, index: number) => (
                <div key={index} className="text-center">
                  <ColorSwatch color={color} size="w-16 h-16" />
                  <p className="text-sm text-gray-600 mt-2 font-mono">{color}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Accent Lights</h4>
            <div className="flex flex-wrap gap-4 justify-center">
              {result.accentLights.map((color: string, index: number) => (
                <div key={index} className="text-center">
                  <ColorSwatch color={color} size="w-16 h-16" />
                  <p className="text-sm text-gray-600 mt-2 font-mono">{color}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Accent Brights</h4>
            <div className="flex flex-wrap gap-4 justify-center">
              {result.accentBrights.map((color: string, index: number) => (
                <div key={index} className="text-center">
                  <ColorSwatch color={color} size="w-16 h-16" />
                  <p className="text-sm text-gray-600 mt-2 font-mono">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your \"Wow\" Colors",
      content: (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-8">Your standout colors for statement pieces</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-lg mx-auto">
            {result.accentBrights.slice(0, 6).map((color: string, index: number) => (
              <div key={index} className="relative">
                <div
                  className="w-24 h-24 rounded-2xl border-4 border-black shadow-xl mx-auto hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                />
                <p className="text-sm text-gray-600 mt-3 font-mono">{color}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Shop Your Look",
      content: (
        <div className="py-6">
          {outfitLooks.length > 0 ? (
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevOutfit}
                  className="p-3 rounded-full"
                  disabled={outfitLooks.length <= 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex gap-2">
                  {outfitLooks.map((_, index: number) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentOutfit ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextOutfit}
                  className="p-3 rounded-full"
                  disabled={outfitLooks.length <= 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              
              <div 
                className={`bg-white rounded-xl p-6 border shadow-lg transition-all duration-300 ${
                  highlightedOutfit === outfitLooks[currentOutfit]?.id ? 'ring-2 ring-orange-400' : ''
                }`}
                onMouseEnter={() => handleOutfitHover(outfitLooks[currentOutfit]?.id)}
                onMouseLeave={handleOutfitLeave}
              >
                <div className="flex gap-6">
                  <div className="w-32 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-200 overflow-hidden">
                    {outfitLooks[currentOutfit]?.image ? (
                      <img 
                        src={outfitLooks[currentOutfit].image} 
                        alt={outfitLooks[currentOutfit].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Sparkles className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl text-gray-800 mb-4">
                      {outfitLooks[currentOutfit]?.name || 'Curated Look'}
                    </h4>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <span className="font-medium">•</span>
                        <span className="font-medium">{outfitLooks[currentOutfit]?.brand || 'Mixed Brands'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <span className="font-medium">•</span>
                        <span className="font-semibold text-green-600">{outfitLooks[currentOutfit]?.priceRange || '$45-$85'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <span className="text-green-600">✓</span>
                        <ColorSwatch 
                          color={outfitLooks[currentOutfit]?.keyColorHex || result.accentBrights[0]} 
                          size="w-5 h-5" 
                        />
                        <span className="font-medium">
                          {outfitLooks[currentOutfit]?.keyColor || 'Palette Color'} {outfitLooks[currentOutfit]?.keyColorHex || result.accentBrights[0]}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3"
                      onClick={() => window.open(outfitLooks[currentOutfit]?.shopUrl || `https://www.shopstyle.com/browse?fts=${encodeURIComponent(result.season + ' colors')}`, '_blank')}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Shop This Look
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Curating your perfect looks...</p>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF4EE]">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setLocation('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Your Colors Have Arrived!</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Card Navigation */}
        <div className="flex items-center justify-center mb-8">
          <Button
            variant="outline"
            onClick={prevCard}
            className="p-3 rounded-full mr-4"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-3">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-4 h-4 rounded-full transition-colors ${
                  index === currentCard ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={nextCard}
            className="p-3 rounded-full ml-4"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Card Content */}
        <Card className="min-h-[500px] shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              {cards[currentCard].title}
            </h2>
            {cards[currentCard].content}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Button
            onClick={handleDownload}
            className="bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 px-6 py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </Button>
          <Button
            onClick={handleShare}
            className="bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 px-6 py-3"
          >
            <Share className="w-5 h-5 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Copy, Check, Shield } from 'lucide-react';
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
  analysisResult?: AnalysisResult | null;
  pdfPath: string | null;
  createdAt: string;
}

// Enhanced color names mapping
const getColorName = (hex: string): string => {
  const colorNames: { [key: string]: string } = {
    '#F5E6CC': 'Warm Cream',
    '#EADDCA': 'Soft Ivory',
    '#D6C3AA': 'Gentle Beige',
    '#BFA891': 'Light Taupe',
    '#A48D7B': 'Warm Stone',
    '#8B7365': 'Soft Mushroom',
    '#FAE6BE': 'Peach Silk',
    '#F7DB99': 'Golden Cream',
    '#F2D284': 'Soft Butter',
    '#EACE6B': 'Light Gold',
    '#E0C85A': 'Warm Yellow',
    '#CABB4A': 'Gentle Lime',
    '#FFDDA1': 'Coral Glow',
    '#FFBD6D': 'Warm Peach',
    '#F9A44C': 'Sunset Orange',
    '#E68B30': 'Vibrant Coral',
    '#CF7C1F': 'Rich Amber',
    '#B56E0A': 'Deep Gold'
  };
  return colorNames[hex] || hex;
};

export default function ResultsNew() {
  const [, params] = useRoute("/results/:orderId");
  const orderId = params?.orderId;
  const [currentCard, setCurrentCard] = useState(0);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}/status`],
    enabled: !!orderId,
  });

  const { data: outfits } = useQuery<OutfitLook[]>({
    queryKey: [`/api/outfits/${orderId}`],
    enabled: !!orderId && order?.status === 'completed',
  });

  useEffect(() => {
    if (order?.result?.season) {
      const url = `${window.location.origin}/results/${orderId}`;
      setShareLink(url);
    }
  }, [order, orderId]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share your color analysis with friends",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Share link ready",
        description: shareLink,
      });
    }
  };

  const handleDownloadPDF = () => {
    if (order?.pdfPath) {
      window.open(`/api/orders/${orderId}/pdf`, '_blank');
    }
  };

  if (isLoading || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-amber-800 font-medium">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (order.status !== 'completed' || (!order.result && !order.analysisResult)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-amber-800 font-medium">Analyzing your colors...</p>
          <p className="text-amber-600 text-sm">This usually takes 30-60 seconds</p>
        </div>
      </div>
    );
  }

  const result = order.result || order.analysisResult;
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-amber-800 font-medium">Loading your analysis...</p>
        </div>
      </div>
    );
  }
  
  // Type assertion since we know result exists at this point
  const analysisResult = result as AnalysisResult;
  
  const allColors = [...analysisResult.coreNeutrals, ...analysisResult.accentLights, ...analysisResult.accentBrights];
  const wowColors = analysisResult.accentBrights?.slice(0, 6) || [];

  const cards = [
    {
      id: 'season-badge',
      title: 'Your Season',
      content: (
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              You are a {analysisResult.season}!
            </h1>
            <div className="flex justify-center gap-2 text-lg font-medium text-gray-600">
              <span>fresh</span>
              <span>•</span>
              <span>warm</span>
              <span>•</span>
              <span>light contrast</span>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <p className="text-gray-700 leading-relaxed text-base">
              {analysisResult.description}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'complete-palette',
      title: 'Complete Palette',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Neutrals</h3>
            <div className="grid grid-cols-6 gap-3">
              {analysisResult.coreNeutrals.map((color, index) => (
                <div key={index} className="group cursor-pointer">
                  <div 
                    className="w-14 h-14 rounded-lg border-2 border-gray-200 shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color }}
                    title={getColorName(color)}
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {getColorName(color)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accent Lights</h3>
            <div className="grid grid-cols-6 gap-3">
              {analysisResult.accentLights.map((color, index) => (
                <div key={index} className="group cursor-pointer">
                  <div 
                    className="w-14 h-14 rounded-lg border-2 border-gray-200 shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color }}
                    title={getColorName(color)}
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {getColorName(color)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accent Brights</h3>
            <div className="grid grid-cols-6 gap-3">
              {analysisResult.accentBrights.map((color, index) => (
                <div key={index} className="group cursor-pointer">
                  <div 
                    className="w-14 h-14 rounded-lg border-2 border-gray-200 shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color }}
                    title={getColorName(color)}
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {getColorName(color)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wow-colors',
      title: 'Wow Colors',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start here for statement pieces</h3>
            <p className="text-gray-600">These colors will make you absolutely glow</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {wowColors.map((color, index) => (
              <div key={index} className="group cursor-pointer text-center">
                <div 
                  className="w-20 h-20 rounded-xl border-4 border-amber-300 shadow-lg mx-auto transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color }}
                />
                <p className="text-sm font-medium text-gray-700 mt-2">
                  {getColorName(color)}
                </p>
                <p className="text-xs text-gray-500">{color}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'shop-looks',
      title: 'Shop Your Look',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated outfits in your colors</h3>
            <p className="text-gray-600">Real pieces, live prices, instant shopping</p>
          </div>
          <div className="space-y-4">
            {outfits?.slice(0, 3).map((outfit) => (
              <Card key={outfit.id} className="overflow-hidden border border-gray-200 hover:border-amber-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={outfit.image} 
                      alt={outfit.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-900">{outfit.name}</h4>
                        <Badge variant="secondary" className="text-xs">{outfit.priceRange}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{outfit.brand}</p>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: outfit.keyColorHex }}
                        />
                        <span className="text-xs text-gray-500">{outfit.keyColor}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-amber-600 hover:bg-amber-700"
                        onClick={() => window.open(outfit.shopUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Shop This Look
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'quick-tips',
      title: 'Quick-Start Tips',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-gray-900 mb-2">Best Metals</h4>
              <p className="text-sm text-gray-700">{analysisResult.recommendations.metals}</p>
            </div>
            
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-4 border border-rose-200">
              <h4 className="font-semibold text-gray-900 mb-2">Makeup Colors</h4>
              <p className="text-sm text-gray-700">{analysisResult.recommendations.makeup}</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">Eyewear Frames</h4>
              <p className="text-sm text-gray-700">{analysisResult.recommendations.eyewear}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Style Cheats</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Mix warm neutrals with one bright accent</li>
              <li>• Choose gold jewelry over silver</li>
              <li>• Avoid cool, harsh colors that wash you out</li>
              <li>• Layer textures in your neutral palette</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero reveal animation */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 animate-pulse" />
        
        {/* Main container */}
        <div className="relative max-w-md mx-auto px-4 py-8">
          {/* Privacy badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-gray-300">
              <Shield className="w-3 h-3 mr-1" />
              Photos auto-delete in 24h
            </Badge>
          </div>

          {/* Card deck */}
          <div className="relative">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl min-h-[600px]">
              <CardContent className="p-6">
                {/* Card content with slide animation */}
                <div 
                  className="transition-all duration-300 ease-in-out"
                  style={{ 
                    transform: `translateX(${currentCard * -100}%)`,
                    display: 'flex',
                    width: `${cards.length * 100}%`
                  }}
                >
                  {cards.map((card, index) => (
                    <div 
                      key={card.id} 
                      className="w-full flex-shrink-0 px-2"
                      style={{ width: `${100 / cards.length}%` }}
                    >
                      <div className="space-y-4">
                        <div className="text-center">
                          <h2 className="text-xl font-bold text-gray-900">{card.title}</h2>
                          <div className="flex justify-center gap-1 mt-2">
                            {cards.map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "w-2 h-2 rounded-full transition-colors",
                                  i === currentCard ? "bg-amber-500" : "bg-gray-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="overflow-y-auto max-h-[480px]">
                          {card.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation arrows */}
            {currentCard > 0 && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-300 shadow-lg"
                onClick={() => setCurrentCard(currentCard - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            
            {currentCard < cards.length - 1 && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-300 shadow-lg"
                onClick={() => setCurrentCard(currentCard + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Hero buttons */}
          <div className="mt-6 space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3"
              onClick={handleDownloadPDF}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold py-3"
              onClick={handleShare}
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Link Copied!' : 'Share'}
            </Button>
          </div>

          {/* Swipe indicator */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Swipe or use arrows to explore • {currentCard + 1} of {cards.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
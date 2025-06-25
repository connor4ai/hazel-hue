import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Palette, Shirt, Gem, Scissors, Sparkles, Star, ExternalLink, Users, Share2, Smartphone, Wallet } from 'lucide-react';
import seasonChartImage from '@assets/12-tone-chart-value-temperature_1750623961315.png';
import colorDimensionsImage from '@assets/60b8f521cbd467e4c5ba0270_True Winter Colour Dimensions_1750623961315.webp';
import hairColorImage from '@assets/60b8f81d3f5d232e60b324e6_Bright Winter Hair_1750624165018.webp';
import maryLouiseParkerImage from '@assets/Screenshot 2025-06-22 at 6.42.17 PM_1750635904961.png';
import marionCotillardImage from '@assets/Screenshot 2025-06-22 at 6.42.31 PM_1750635904961.png';
import krystenRitterImage from '@assets/Screenshot 2025-06-22 at 6.42.37 PM_1750635904961.png';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import TrueWinterPalette from '@/components/TrueWinterPalette';
import BrightWinterPalette from '@/components/BrightWinterPalette';
import DarkWinterPalette from '@/components/DarkWinterPalette';
import TrueSummerPalette from '@/components/TrueSummerPalette';
import LightSummerPalette from '@/components/LightSummerPalette';
import SoftSummerPalette from '@/components/SoftSummerPalette';
import TrueSpringPalette from '@/components/TrueSpringPalette';
import BrightSpringPalette from '@/components/BrightSpringPalette';
import LightSpringPalette from '@/components/LightSpringPalette';
import TrueAutumnPalette from '@/components/TrueAutumnPalette';
import DarkAutumnPalette from '@/components/DarkAutumnPalette';
import SoftAutumnPalette from '@/components/SoftAutumnPalette';

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
  overview: {
    keyCharacteristics: string[];
    signatureColors: string[];
    colorsToAvoid: string[];
    description: string;
  };
  colorPalette: {
    htmlContent: string;
    coreNeutrals: string[];
    accentLights: string[];
    accentBrights: string[];
  };
  clothing: {
    pinterestUrl: string;
    guidelines: string[];
  };
  accessories: {
    metals: string;
    jewelry: string[];
    watches: string[];
    glasses: string[];
  };
  hairColor: {
    bestColors: string[];
    avoidColors: string[];
    guidance: string;
  };
  makeup: {
    pinterestUrl: string;
    guidelines: string[];
  };
  celebrities: string[];
}

interface Order {
  id: number;
  status: string;
  analysisResult: AnalysisResult | null;
  pdfPath: string | null;
  createdAt: string;
}

const ColorSwatch = ({ color, name, clickable = true }: { color: string; name?: string; clickable?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (!clickable) return;
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <motion.div
      className={`relative group ${clickable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      whileHover={clickable ? { scale: 1.05 } : {}}
      whileTap={clickable ? { scale: 0.95 } : {}}
    >
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg border-2 border-white"
        style={{ backgroundColor: color }}
      />
      {name && (
        <div className="text-center mt-2">
          <p className="text-xs font-medium text-gray-700">{name}</p>
          <p className="text-xs text-gray-500 font-mono">{color}</p>
        </div>
      )}
      {copied && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs"
        >
          Copied!
        </motion.div>
      )}
    </motion.div>
  );
};

const PinterestEmbed = ({ url, title }: { url: string; title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 border border-pink-100"
  >
    <div className="text-center mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
        <ExternalLink className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm mb-4">Curated inspiration board with looks perfect for your coloring</p>
    </div>
    
    <div className="bg-white rounded-xl p-4 mb-4">
      <div className="relative h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 mx-auto shadow-lg">
              <ExternalLink className="w-8 h-8 text-pink-600" />
            </div>
            <p className="text-gray-700 font-medium">Pinterest Board Preview</p>
            <p className="text-gray-500 text-sm">Click to view full board</p>
          </div>
        </div>
      </div>
    </div>
    
    <Button
      onClick={() => window.open(url, '_blank')}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl py-2"
    >
      View Full Pinterest Board
    </Button>
  </motion.div>
);

export default function ResultsNew() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const orderId = params.orderId;

  useEffect(() => {
    if (!orderId) {
      setLocation('/');
      return;
    }
    fetchOrderResults();
  }, [orderId]);

  useEffect(() => {
    // Auto-email results when they're ready
    if (order && order.status === 'completed' && !order.emailSent) {
      emailResults();
    }
  }, [order]);

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

  const emailResults = async () => {
    try {
      await apiRequest('POST', `/api/orders/${orderId}/email-results`);
    } catch (error) {
      console.error('Failed to email results:', error);
    }
  };

  const handleDownloadPDF = async () => {
    if (!order) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/orders/${orderId}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${order.analysisResult?.season}-color-analysis.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Download Started",
          description: "Your color analysis PDF is downloading",
        });
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-300 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!order || !order.analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700">No results found</p>
        </div>
      </div>
    );
  }

  const analysisResult = order.analysisResult;

  const steps = [
    {
      id: 'overview',
      title: 'Your Season Overview',
      icon: <Star className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4"
            >
              {analysisResult.season}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
            >
              {analysisResult.overview.description}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-rose-600" />
                Key Characteristics
              </h3>
              <ul className="space-y-3">
                {analysisResult.overview.keyCharacteristics.map((char, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{char}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Signature Colors</h3>
              <div className="grid grid-cols-4 gap-3">
                {analysisResult.overview.signatureColors.slice(0, 8).map((color, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <ColorSwatch color={color} name={color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-6 border border-red-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Colors to Avoid</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {[
                { name: 'Orange', code: '#FFA500' },
                { name: 'Peach', code: '#FFCBA4' },
                { name: 'Coral', code: '#FF7F50' },
                { name: 'Gold', code: '#FFD700' },
                { name: 'Beige', code: '#F5F5DC' },
                { name: 'Tan', code: '#D2B48C' },
                { name: 'Rust', code: '#B7410E' },
                { name: 'Camel', code: '#C19A6B' },
                { name: 'Olive', code: '#808000' },
                { name: 'Yellow Green', code: '#9ACD32' },
                { name: 'Salmon', code: '#FA8072' },
                { name: 'Burnt Orange', code: '#CC5500' }
              ].map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="text-center"
                >
                  <div
                    className="w-14 h-14 rounded-xl shadow-md border-2 border-white relative mx-auto"
                    style={{ backgroundColor: color.code }}
                  >
                    <div className="absolute inset-0 rounded-xl border-2 border-red-400 opacity-60"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-xl">×</div>
                  </div>
                  <p className="text-xs mt-2 font-mono text-gray-600">{color.code}</p>
                  <p className="text-xs font-semibold text-gray-700">{color.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'palette',
      title: 'Color Palette',
      icon: <Palette className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          {analysisResult.season === 'True Winter' && <TrueWinterPalette />}
          {analysisResult.season === 'Bright Winter' && <BrightWinterPalette />}
          {analysisResult.season === 'Dark Winter' && <DarkWinterPalette />}
          {analysisResult.season === 'True Summer' && <TrueSummerPalette />}
          {analysisResult.season === 'Light Summer' && <LightSummerPalette />}
          {analysisResult.season === 'Soft Summer' && <SoftSummerPalette />}
          {analysisResult.season === 'True Spring' && <TrueSpringPalette />}
          {analysisResult.season === 'Bright Spring' && <BrightSpringPalette />}
          {analysisResult.season === 'Light Spring' && <LightSpringPalette />}
          {analysisResult.season === 'True Autumn' && <TrueAutumnPalette />}
          {analysisResult.season === 'Dark Autumn' && <DarkAutumnPalette />}
          {analysisResult.season === 'Soft Autumn' && <SoftAutumnPalette />}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Color Dimensions</h4>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-800">Temperature</p>
                  <p className="text-gray-600">Cool (blue-based undertones)</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-800">Saturation</p>
                  <p className="text-gray-600">High clarity and purity</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-800">Value</p>
                  <p className="text-gray-600">Medium to deep tones</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-800">Intensity</p>
                  <p className="text-gray-600">Bold and striking presence</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <img
                  src={colorDimensionsImage}
                  alt="True Winter Color Dimensions"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-sm"
                />
                <p className="text-sm text-gray-600 mt-4">Your position on the color analysis spectrum</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">12-Season Color Analysis Chart</h4>
            <div className="text-center">
              <img
                src={seasonChartImage}
                alt="12-Season Color Analysis Chart"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
              />
              <p className="text-sm text-gray-600 mt-4">True Winter's position in the complete seasonal color system</p>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'clothing',
      title: 'Clothing Overview',
      icon: <Shirt className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your {analysisResult.season} Wardrobe</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Build a cohesive wardrobe that enhances your natural beauty</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Style Guidelines</h4>
                <ul className="space-y-3">
                  {analysisResult.clothing.guidelines.map((guideline, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{guideline}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PinterestEmbed 
                url={analysisResult.clothing.pinterestUrl} 
                title="Clothing Inspiration" 
              />
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'accessories',
      title: 'Metals, Jewelry & Glasses',
      icon: <Gem className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Accessories Guide</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">The perfect finishing touches for your coloring</p>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 border border-amber-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Gem className="w-5 h-5 mr-2 text-amber-600" />
                Best Metals
              </h4>
              <div className="grid lg:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">{analysisResult.accessories.metals}</p>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mb-2 border-2 border-white shadow-md"></div>
                      <p className="text-xs font-medium text-gray-700">Silver</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-2 border-2 border-white shadow-md"></div>
                      <p className="text-xs font-medium text-gray-700">Platinum</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-2 border-2 border-white shadow-md"></div>
                      <p className="text-xs font-medium text-gray-700">White Gold</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full mb-2 border-2 border-white shadow-md"></div>
                      <p className="text-xs font-medium text-gray-700">Gunmetal</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">💍</div>
                    <p className="text-sm font-medium text-gray-700">Rings</p>
                    <p className="text-xs text-gray-500">Clean, geometric designs</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">📿</div>
                    <p className="text-sm font-medium text-gray-700">Necklaces</p>
                    <p className="text-xs text-gray-500">Bold, statement pieces</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">👂</div>
                    <p className="text-sm font-medium text-gray-700">Earrings</p>
                    <p className="text-xs text-gray-500">Structured, angular styles</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">⌚</div>
                    <p className="text-sm font-medium text-gray-700">Watches</p>
                    <p className="text-xs text-gray-500">Modern, sleek faces</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <h4 className="text-xl font-bold text-gray-800 mb-4">Jewelry Guidelines</h4>
                <div className="space-y-3">
                  {analysisResult.accessories.jewelry.map((item, index) => (
                    <p key={index} className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <h4 className="text-xl font-bold text-gray-800 mb-4">Eyewear Guide</h4>
                <div className="space-y-3 mb-4">
                  {analysisResult.accessories.glasses.map((item, index) => (
                    <p key={index} className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="w-16 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg mx-auto mb-2 border border-gray-300"></div>
                    <p className="text-xs font-medium text-gray-700">Black Frames</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg mx-auto mb-2 border border-gray-300"></div>
                    <p className="text-xs font-medium text-gray-700">Gunmetal</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-10 bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg mx-auto mb-2 border border-gray-300"></div>
                    <p className="text-xs font-medium text-gray-700">Navy Frames</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hair',
      title: 'Hair Color',
      icon: <Scissors className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Hair Color Guide</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Colors that harmonize with your natural beauty</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100 text-center"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-4">Professional Guidance</h4>
            <p className="text-gray-700 leading-relaxed">{analysisResult.hairColor.guidance}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 rounded-3xl p-6 border border-green-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                Best Hair Colors
              </h4>
              <div className="space-y-4">
                {analysisResult.hairColor.bestColors.map((color, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {color}
                  </motion.p>
                ))}
              </div>
              <div className="mt-6">
                <img
                  src={hairColorImage}
                  alt="Hair Color Examples"
                  className="w-full rounded-lg shadow-sm"
                />
                <p className="text-xs text-gray-600 text-center mt-2">Natural hair color examples for True Winter</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 rounded-3xl p-6 border border-red-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                Colors to Avoid
              </h4>
              <div className="space-y-4">
                {analysisResult.hairColor.avoidColors.map((color, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {color}
                  </motion.p>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {['#D2B48C', '#CD853F', '#DEB887', '#F4A460'].map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-red-300 relative"
                      style={{ backgroundColor: color }}
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-red-500 opacity-60"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-lg">×</div>
                    </div>
                    <p className="text-xs text-gray-600">Warm tones</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'makeup',
      title: 'Makeup',
      icon: <Sparkles className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your {analysisResult.season} Makeup Palette</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Colors and techniques that enhance your natural radiance</p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4">Your {analysisResult.season} Makeup Palette</h4>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Foundation</h5>
                  <p className="text-gray-700 text-xs mb-2">Cool or neutral undertones</p>
                  <div className="flex space-x-2">
                    {['#F5DEB3', '#F0E6D2'].map((color, index) => (
                      <ColorSwatch key={index} color={color} name={color} clickable />
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Lipstick</h5>
                  <p className="text-gray-700 text-xs mb-2">True red, burgundy, fuchsia</p>
                  <div className="flex space-x-2">
                    {['#DC143C', '#800020'].map((color, index) => (
                      <ColorSwatch key={index} color={color} name={color} clickable />
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Eyeshadow</h5>
                  <p className="text-gray-700 text-xs mb-2">Navy, charcoal, emerald</p>
                  <div className="flex space-x-2">
                    {['#000080', '#36454F'].map((color, index) => (
                      <ColorSwatch key={index} color={color} name={color} clickable />
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Blush</h5>
                  <p className="text-gray-700 text-xs mb-2">Cool pink, berry tones</p>
                  <div className="flex space-x-2">
                    {['#FFB6C1', '#DC143C'].map((color, index) => (
                      <ColorSwatch key={index} color={color} name={color} clickable />
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Eyeliner</h5>
                  <p className="text-gray-700 text-xs mb-2">Black, navy, burgundy</p>
                  <div className="flex space-x-2">
                    {['#000000', '#000080'].map((color, index) => (
                      <ColorSwatch key={index} color={color} name={color} clickable />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PinterestEmbed 
                url={analysisResult.makeup.pinterestUrl} 
                title="True Winter Makeup Looks" 
              />
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'celebrities',
      title: 'Celebrity Inspiration',
      icon: <Star className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">{analysisResult.season} Celebrities</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Study how these celebrities use color to enhance their natural beauty</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Mary Louise Parker', image: maryLouiseParkerImage },
              { name: 'Marion Cotillard', image: marionCotillardImage },
              { name: 'Krysten Ritter', image: krystenRitterImage }
            ].map((celebrity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100"
              >
                <div className="aspect-[3/4] mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={celebrity.image}
                    alt={celebrity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-800 text-center">{celebrity.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    { 
      id: 'download', 
      title: 'Download & Share', 
      icon: <Download className="w-6 h-6" />, 
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Save & Share Your Results</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Keep your color analysis handy for shopping and styling</p>
            {order?.email && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 max-w-md mx-auto">
                <p className="text-sm text-blue-700">
                  ✉️ Results have been emailed to <strong>{order.email}</strong>
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 text-center border border-blue-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Share My Results</h4>
              <p className="text-gray-600 mb-6 text-sm">Share your color analysis with friends and family via text, email, or social media</p>
              <Button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `My ${analysisResult.season} Color Analysis`,
                      text: `Check out my personal color analysis results!`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    toast({ title: "Link copied!", description: "Share this link with others" });
                  }
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-3"
              >
                Share Results
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center border border-green-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Download Digital Palette</h4>
              <p className="text-gray-600 mb-6 text-sm">Get a high-resolution version of your color palette for easy reference while shopping</p>
              <Button 
                onClick={async () => {
                  try {
                    const response = await apiRequest('POST', `/api/orders/${orderId}/download-palette`);
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${analysisResult.season.replace(' ', '_')}_Color_Palette.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    toast({ title: "Palette downloaded!", description: "Your color palette PDF has been saved" });
                  } catch (error) {
                    toast({ title: "Download failed", description: "Please try again", variant: "destructive" });
                  }
                }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3"
              >
                Download Palette
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 text-center border border-purple-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Save to Digital Wallet</h4>
              <p className="text-gray-600 mb-6 text-sm">Add your color palette to Apple Wallet or Google Pay for instant access while shopping</p>
              <Button 
                onClick={() => {
                  toast({ title: "Coming soon!", description: "Digital wallet integration will be available soon" });
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl py-3"
              >
                Add to Wallet
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h4>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">Save your results permanently and access them anytime</p>
              <Button 
                onClick={() => {
                  // This would typically open a registration modal
                  toast({ 
                    title: "Account Creation", 
                    description: "Registration feature coming soon! Your results are saved for now." 
                  });
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl"
              >
                Create Free Account
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Shopping</h5>
                <p className="text-gray-600 text-sm">Take screenshots of your color swatches to match colors while shopping in stores or online</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Wardrobe</h5>
                <p className="text-gray-600 text-sm">Focus on building a capsule wardrobe with your core neutral colors as the foundation</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Makeup</h5>
                <p className="text-gray-600 text-sm">Show your makeup artist or sales associate your color palette for personalized recommendations</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Hair Color</h5>
                <p className="text-gray-600 text-sm">Bring your analysis to your colorist for the most flattering hair color choices</p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Your Color Analysis Results</h1>
              <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full px-6 py-2"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center py-6">
        <div className="flex space-x-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-rose-500 scale-125' 
                  : index < currentStep 
                    ? 'bg-rose-300' 
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Navigation */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-rose-100">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center space-x-2 border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-3 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white">
              {steps[currentStep].icon}
            </div>
            <h2 className="text-lg font-bold text-gray-800">{steps[currentStep].title}</h2>
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            variant="outline"
            className="flex items-center space-x-2 border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
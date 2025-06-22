import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Palette, Shirt, Gem, Scissors, Sparkles, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

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
    className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 text-center border border-pink-100"
  >
    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
      <ExternalLink className="w-8 h-8 text-white" />
    </div>
    <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 mb-4">Curated inspiration board with looks perfect for your coloring</p>
    <Button
      onClick={() => window.open(url, '_blank')}
      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full px-6 py-2"
    >
      View Pinterest Board
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
                    <ColorSwatch color={color} />
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
            <div className="grid md:grid-cols-3 gap-4">
              {analysisResult.overview.colorsToAvoid.map((colorGroup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <p className="text-gray-700 text-sm">{colorGroup}</p>
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
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Complete Color Palette</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Click any color to copy its hex code for shopping and styling</p>
          </div>

          <div className="space-y-8">
            {[
              { title: 'Core Neutrals', colors: analysisResult.coreNeutrals, desc: 'Your foundation colors - mix and match with confidence' },
              { title: 'Accent Lights', colors: analysisResult.accentLights, desc: 'Soft highlights and gentle accents' },
              { title: 'Accent Brights', colors: analysisResult.accentBrights, desc: 'Bold statement colors for impact' }
            ].map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.2 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <h4 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h4>
                <p className="text-gray-600 mb-6">{section.desc}</p>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
                  {section.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: sectionIndex * 0.2 + index * 0.05 }}
                    >
                      <ColorSwatch color={color} name={color} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 text-center border border-blue-100"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-4">Color Dimensions</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800">Temperature</p>
                <p className="text-gray-600">Cool (blue-based)</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800">Saturation</p>
                <p className="text-gray-600">High clarity</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800">Value</p>
                <p className="text-gray-600">Medium to deep</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800">Intensity</p>
                <p className="text-gray-600">Bold & striking</p>
              </div>
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

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 border border-amber-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Gem className="w-5 h-5 mr-2 text-amber-600" />
                Best Metals
              </h4>
              <p className="text-gray-700 leading-relaxed">{analysisResult.accessories.metals}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4">Jewelry Style</h4>
              <ul className="space-y-2">
                {analysisResult.accessories.jewelry.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4">Watches</h4>
              <ul className="space-y-2">
                {analysisResult.accessories.watches.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4">Eyewear</h4>
              <ul className="space-y-2">
                {analysisResult.accessories.glasses.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
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
              <ul className="space-y-3">
                {analysisResult.hairColor.bestColors.map((color, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-gray-700"
                  >
                    {color}
                  </motion.li>
                ))}
              </ul>
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
              <ul className="space-y-3">
                {analysisResult.hairColor.avoidColors.map((color, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-gray-700"
                  >
                    {color}
                  </motion.li>
                ))}
              </ul>
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

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Makeup Guidelines</h4>
                <ul className="space-y-3">
                  {analysisResult.makeup.guidelines.map((guideline, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{guideline}</span>
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
                url={analysisResult.makeup.pinterestUrl} 
                title="Makeup Looks" 
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
            {analysisResult.celebrities.map((celebrity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{celebrity}</h4>
                <p className="text-gray-600 text-sm">
                  Study their color choices in red carpet looks and everyday styling
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Style Study Tips</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Notice their makeup choices and how they complement their natural coloring",
                "Observe their jewelry and accessory selections",
                "Study how they use color in their red carpet looks",
                "Look for patterns in their most flattering outfits"
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </motion.div>
              ))}
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
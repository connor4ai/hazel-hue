import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, Star, Clock, Palette, Sparkles, Camera, FileText, Zap, Target } from "lucide-react";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";

export default function HazelHueVsMyColorAnalysisBlog() {
  const [, setLocation] = useLocation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Hazel & Hue vs MyColorAnalysis.ai: AI Color Analysis Platform Comparison",
    "description": "Compare Hazel & Hue and MyColorAnalysis.ai features, accuracy, and value. See which AI color analysis platform delivers better results.",
    "author": {
      "@type": "Organization",
      "name": "Hazel & Hue"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hazel & Hue",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hazelandhue.com/icon-192x192.png"
      }
    },
    "datePublished": "2025-07-04",
    "dateModified": "2025-07-04",
    "image": "https://hazelandhue.com/og-image.jpg"
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1FAEE' }}>
      <SEOHead 
        title="Hazel & Hue vs MyColorAnalysis.ai: Which AI Color Analysis is Better?"
        description="Detailed comparison of Hazel & Hue vs MyColorAnalysis.ai. Compare features, results quality, pricing, and user experience to choose the best AI color analysis platform."
        path="/blog/hazel-hue-vs-mycoloranalysis"
        structuredData={structuredData}
      />

      {/* Header */}
      <header className="py-6 px-4" style={{ backgroundColor: '#2D5A3D' }}>
        <div className="max-w-4xl mx-auto">
          <BreadcrumbNavigation 
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Hazel & Hue vs MyColorAnalysis.ai" }
            ]}
          />
          <Button
            variant="ghost"
            onClick={() => setLocation('/blog')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4" style={{ backgroundColor: '#E85A4F', color: 'white' }}>
              Platform Comparison
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: '#2D5A3D'
            }}>
              Hazel & Hue vs MyColorAnalysis.ai: AI Color Analysis Platform Comparison
            </h1>

            <p className="text-xl mb-8 leading-relaxed" style={{ color: '#457B9D' }}>
              Looking for the best AI color analysis? Here's a comprehensive comparison of Hazel & Hue and MyColorAnalysis.ai 
              to help you choose the platform that delivers the most accurate and valuable results.
            </p>

            {/* Quick Comparison Table */}
            <Card className="mb-12 overflow-hidden" style={{ border: '2px solid #A8DADC' }}>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#2D5A3D' }}>
                      <tr>
                        <th className="text-left p-4 text-white font-semibold">Feature</th>
                        <th className="text-center p-4 text-white font-semibold">Hazel & Hue</th>
                        <th className="text-center p-4 text-white font-semibold">MyColorAnalysis.ai</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium">Analysis Detail</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600 mr-2" />
                            12-Season Precision
                          </div>
                        </td>
                        <td className="p-4 text-center">Basic Seasonal Analysis</td>
                      </tr>
                      <tr className="border-b border-gray-200" style={{ backgroundColor: '#F8F9FA' }}>
                        <td className="p-4 font-medium">Color Recommendations</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600 mr-2" />
                            64 Curated Colors
                          </div>
                        </td>
                        <td className="p-4 text-center">Generic Color Suggestions</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium">Makeup Guidance</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600 mr-2" />
                            Interactive Swatches
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <X className="h-5 w-5 text-red-500 mr-2" />
                            Limited
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200" style={{ backgroundColor: '#F8F9FA' }}>
                        <td className="p-4 font-medium">Celebrity References</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600 mr-2" />
                            Actual Photos
                          </div>
                        </td>
                        <td className="p-4 text-center">Text References Only</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium">Processing Speed</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                            30 Seconds
                          </div>
                        </td>
                        <td className="p-4 text-center">1-2 Minutes</td>
                      </tr>
                      <tr style={{ backgroundColor: '#F8F9FA' }}>
                        <td className="p-4 font-medium">Value</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Star className="h-5 w-5 text-yellow-500 mr-2" />
                            $29 (Premium Value)
                          </div>
                        </td>
                        <td className="p-4 text-center">$39-49</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <div className="space-y-12">
              {/* Technology & Accuracy */}
              <section>
                <h2 className="text-3xl font-bold mb-6" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#2D5A3D'
                }}>
                  Technology & Analysis Accuracy
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card style={{ border: '2px solid #A8DADC' }}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#2D5A3D' }}>
                        <Target className="h-6 w-6 mr-2" style={{ color: '#E85A4F' }} />
                        Hazel & Hue Technology
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>Advanced OpenAI GPT-4 Vision API</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>Comprehensive 12-season analysis framework</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>Multi-dimensional color assessment</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>Professional colorist validation</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card style={{ border: '2px solid #E5E5E5' }}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#666' }}>
                        <Palette className="h-6 w-6 mr-2" style={{ color: '#999' }} />
                        MyColorAnalysis.ai Technology
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-5 h-5 mr-2 mt-0.5"></span>
                          <span>Standard AI image processing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-5 h-5 mr-2 mt-0.5"></span>
                          <span>Basic seasonal categorization</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-5 h-5 mr-2 mt-0.5"></span>
                          <span>Limited color depth analysis</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-5 h-5 mr-2 mt-0.5"></span>
                          <span>Algorithm-only assessment</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Results Quality */}
              <section>
                <h2 className="text-3xl font-bold mb-6" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#2D5A3D'
                }}>
                  Results Quality & Comprehensiveness
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card style={{ border: '2px solid #A8DADC', backgroundColor: '#F8F9FA' }}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4" style={{ color: '#2D5A3D' }}>
                        Hazel & Hue Delivers:
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">64 personalized colors with hex codes</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Interactive makeup color swatches</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Jewelry & metal recommendations</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Celebrity photo galleries</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Hair color guidance</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Pinterest style boards</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Instant sharing capabilities</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card style={{ border: '2px solid #E5E5E5' }}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4" style={{ color: '#666' }}>
                        MyColorAnalysis.ai Provides:
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-4 h-4 mr-2"></span>
                          <span className="text-sm text-gray-600">Basic color palette (12-16 colors)</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-4 h-4 mr-2"></span>
                          <span className="text-sm text-gray-600">General styling suggestions</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-4 h-4 mr-2"></span>
                          <span className="text-sm text-gray-600">Limited makeup recommendations</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-4 h-4 mr-2"></span>
                          <span className="text-sm text-gray-600">Text-based results only</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-4 h-4 mr-2"></span>
                          <span className="text-sm text-gray-600">Basic seasonal classification</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* User Experience */}
              <section>
                <h2 className="text-3xl font-bold mb-6" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#2D5A3D'
                }}>
                  User Experience & Value
                </h2>

                <Card style={{ border: '2px solid #A8DADC', backgroundColor: '#F8F9FA' }}>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E85A4F' }}>
                          <Clock className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Fast Results</h4>
                        <p className="text-sm text-gray-600">Get comprehensive analysis in just 30 seconds</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F4A261' }}>
                          <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Interactive Features</h4>
                        <p className="text-sm text-gray-600">Click-to-copy colors, hover effects, visual swatches</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A8DADC' }}>
                          <Star className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Best Value</h4>
                        <p className="text-sm text-gray-600">More features and accuracy for less cost</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Bottom CTA */}
              <section className="text-center py-12">
                <Card style={{ backgroundColor: '#2D5A3D', border: 'none' }}>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Experience Premium AI Color Analysis
                    </h3>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                      Get the most comprehensive AI color analysis available. 64 personalized colors, 
                      interactive makeup recommendations, and professional styling guidance - all in 30 seconds.
                    </p>
                    <Button
                      onClick={() => setLocation('/upload')}
                      className="text-white px-8 py-4 text-lg"
                      style={{ backgroundColor: '#E85A4F' }}
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Start My Analysis - $29
                    </Button>
                  </CardContent>
                </Card>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
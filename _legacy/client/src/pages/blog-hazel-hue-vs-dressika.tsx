import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, Star, Clock, Palette, Sparkles, Camera, FileText, Zap } from "lucide-react";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";

export default function HazelHueVsDressikaBlog() {
  const [, setLocation] = useLocation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Hazel & Hue vs Dressika: Complete AI Color Analysis Comparison",
    "description": "Detailed comparison of Hazel & Hue and Dressika AI color analysis platforms. Compare features, accuracy, pricing, and results quality.",
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
        title="Hazel & Hue vs Dressika: AI Color Analysis Comparison | Which is Better?"
        description="Compare Hazel & Hue vs Dressika AI color analysis platforms. See which offers better accuracy, more comprehensive results, and better value for your color analysis needs."
        path="/blog/hazel-hue-vs-dressika"
        structuredData={structuredData}
      />

      {/* Header */}
      <header className="py-6 px-4" style={{ backgroundColor: '#2D5A3D' }}>
        <div className="max-w-4xl mx-auto">
          <BreadcrumbNavigation 
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Hazel & Hue vs Dressika" }
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
              Hazel & Hue vs Dressika: Complete AI Color Analysis Comparison
            </h1>

            <p className="text-xl mb-8 leading-relaxed" style={{ color: '#457B9D' }}>
              Choosing the right AI color analysis platform? Here's an in-depth comparison of Hazel & Hue and Dressika 
              to help you make the best decision for your color analysis needs.
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
                        <th className="text-center p-4 text-white font-semibold">Dressika</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium">Analysis System</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600 mr-2" />
                            12-Season System
                          </div>
                        </td>
                        <td className="p-4 text-center">4-Season System</td>
                      </tr>
                      <tr className="border-b border-gray-200" style={{ backgroundColor: '#F8F9FA' }}>
                        <td className="p-4 font-medium">Color Palette Size</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600 mr-2" />
                            64 Colors per Season
                          </div>
                        </td>
                        <td className="p-4 text-center">16-20 Colors</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium">Makeup Recommendations</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600 mr-2" />
                            Interactive Swatches
                          </div>
                        </td>
                        <td className="p-4 text-center">Basic Text Only</td>
                      </tr>
                      <tr className="border-b border-gray-200" style={{ backgroundColor: '#F8F9FA' }}>
                        <td className="p-4 font-medium">Processing Time</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-600 mr-2" />
                            30 Seconds
                          </div>
                        </td>
                        <td className="p-4 text-center">2-3 Minutes</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium">Celebrity Examples</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600 mr-2" />
                            Actual Photos
                          </div>
                        </td>
                        <td className="p-4 text-center">Names Only</td>
                      </tr>
                      <tr style={{ backgroundColor: '#F8F9FA' }}>
                        <td className="p-4 font-medium">Pricing</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Star className="h-5 w-5 text-yellow-500 mr-2" />
                            $29 (Better Value)
                          </div>
                        </td>
                        <td className="p-4 text-center">$35-45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <div className="space-y-12">
              {/* Analysis Accuracy */}
              <section>
                <h2 className="text-3xl font-bold mb-6" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#2D5A3D'
                }}>
                  Analysis Accuracy & Methodology
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card style={{ border: '2px solid #A8DADC' }}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#2D5A3D' }}>
                        <Sparkles className="h-6 w-6 mr-2" style={{ color: '#E85A4F' }} />
                        Hazel & Hue Approach
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>Advanced 12-season system for precise categorization</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>OpenAI GPT-4 Vision analysis</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>Considers undertone, value, and chroma</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>Professional colorist-validated results</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card style={{ border: '2px solid #E5E5E5' }}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#666' }}>
                        <Palette className="h-6 w-6 mr-2" style={{ color: '#999' }} />
                        Dressika Approach
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-5 h-5 mr-2 mt-0.5"></span>
                          <span>Basic 4-season system</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-5 h-5 mr-2 mt-0.5"></span>
                          <span>Limited AI analysis capabilities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-5 h-5 mr-2 mt-0.5"></span>
                          <span>Focus on general categorization</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-5 h-5 mr-2 mt-0.5"></span>
                          <span>Less nuanced seasonal distinctions</span>
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
                  User Experience & Results Quality
                </h2>

                <Card className="mb-6" style={{ border: '2px solid #A8DADC' }}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: '#2D5A3D' }}>
                      What You Get with Hazel & Hue
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center" style={{ color: '#E85A4F' }}>
                          <Palette className="h-5 w-5 mr-2" />
                          Comprehensive Color Analysis
                        </h4>
                        <ul className="text-sm space-y-1 ml-7">
                          <li>• 64 carefully curated colors</li>
                          <li>• Click-to-copy hex codes</li>
                          <li>• Color names and descriptions</li>
                          <li>• Signature color highlights</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center" style={{ color: '#E85A4F' }}>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Interactive Makeup Guide
                        </h4>
                        <ul className="text-sm space-y-1 ml-7">
                          <li>• Foundation shade matching</li>
                          <li>• Eyeshadow palette recommendations</li>
                          <li>• Blush and lipstick colors</li>
                          <li>• Visual color swatches</li>
                        </ul>
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
                      Ready to Experience the Hazel & Hue Difference?
                    </h3>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                      Get your comprehensive 12-season color analysis with 64 personalized colors, 
                      interactive makeup recommendations, and professional styling guidance.
                    </p>
                    <Button
                      onClick={() => setLocation('/upload')}
                      className="text-white px-8 py-4 text-lg"
                      style={{ backgroundColor: '#E85A4F' }}
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Get My Analysis - $29
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
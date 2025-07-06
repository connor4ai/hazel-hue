import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Clock, Zap, Users, Mail } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <SEOHead 
        title="About Hazel & Hue - Professional AI Color Analysis Service"
        description="Learn about Hazel & Hue's professional AI color analysis service. Discover how our advanced technology provides accurate seasonal color analysis and personalized style recommendations."
        path="/about"
      />

      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-warm-gray/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setLocation('/homepage')}
            className="font-serif text-2xl font-bold text-warm-gray-dark hover:text-terracotta transition-colors"
          >
            Hazel & Hue
          </Button>
          <div className="flex space-x-6">
            <Button
              variant="ghost"
              onClick={() => setLocation('/homepage')}
              className="text-warm-gray hover:text-terracotta transition-colors"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation('/terms')}
              className="text-warm-gray hover:text-terracotta transition-colors"
            >
              Terms
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation('/help')}
              className="text-warm-gray hover:text-terracotta transition-colors"
            >
              Help
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/homepage')}
            className="text-warm-gray hover:text-warm-gray-dark mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-warm-gray-dark mb-4">
              About Hazel & Hue
            </h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Professional AI-powered color analysis for your perfect seasonal palette
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Features */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-terracotta" />
                  Our Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-lagoon mt-1" />
                    <div>
                      <p className="font-semibold text-warm-gray-dark">AI-Powered Analysis</p>
                      <p className="text-sm text-warm-gray">Advanced artificial intelligence analyzes your photos to determine your seasonal color palette with professional accuracy.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-marigold mt-1" />
                    <div>
                      <p className="font-semibold text-warm-gray-dark">Fast Results</p>
                      <p className="text-sm text-warm-gray">Get your complete color analysis in 30 seconds. No waiting, no appointments needed.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-sage mt-1" />
                    <div>
                      <p className="font-semibold text-warm-gray-dark">12-Season System</p>
                      <p className="text-sm text-warm-gray">Comprehensive analysis using the professional 12-season color system for the most accurate results.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-terracotta" />
                  What You Receive
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-warm-gray space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-lagoon font-bold">•</span>
                    <span>Professional 6-page PDF color analysis report</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-lagoon font-bold">•</span>
                    <span>180+ personalized color palette</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-lagoon font-bold">•</span>
                    <span>Makeup recommendations and color swatches</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-lagoon font-bold">•</span>
                    <span>Style and wardrobe guidance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-lagoon font-bold">•</span>
                    <span>Email delivery within minutes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-warm-gray-dark">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-warm-gray-dark">Customer Support</p>
                  <p className="text-sm text-warm-gray">For questions about your analysis or technical support</p>
                  <p className="text-sm text-terracotta font-medium">support@hazelandhue.com</p>
                </div>
                <div>
                  <p className="font-semibold text-warm-gray-dark">Business Hours</p>
                  <p className="text-sm text-warm-gray">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p className="text-sm text-warm-gray">Weekend: 10:00 AM - 4:00 PM EST</p>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-gradient-to-r from-sage/20 to-lagoon/20 border border-sage/30 rounded-lg">
              <h4 className="font-semibold text-warm-gray-dark mb-3">How It Works</h4>
              <ol className="text-sm text-warm-gray space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-lagoon font-bold">1.</span>
                  <span>Upload 1-3 clear photos following our guidelines</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lagoon font-bold">2.</span>
                  <span>Pay $29 securely through our payment system</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lagoon font-bold">3.</span>
                  <span>AI analyzes your photos and determines your season</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lagoon font-bold">4.</span>
                  <span>Receive your complete analysis via email</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
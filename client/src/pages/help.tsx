import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, HelpCircle, Camera, Sun, User, Mail, CheckCircle } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Help() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <SEOHead 
        title="Help & FAQ - Hazel & Hue AI Color Analysis"
        description="Get help with photo requirements, frequently asked questions, and support for Hazel & Hue's AI color analysis service."
        path="/help"
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
              onClick={() => setLocation('/about')}
              className="text-warm-gray hover:text-terracotta transition-colors"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation('/terms')}
              className="text-warm-gray hover:text-terracotta transition-colors"
            >
              Terms
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
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
              Help & Support
            </h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Photo tips and frequently asked questions
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Photo Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2 text-terracotta" />
                Photo Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Sun className="w-5 h-5 text-marigold mt-1" />
                  <div>
                    <p className="font-semibold text-warm-gray-dark">Natural Lighting</p>
                    <p className="text-sm text-warm-gray">Take photos in bright, natural daylight near a window. Avoid flash, artificial lighting, or harsh shadows.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-lagoon mt-1" />
                  <div>
                    <p className="font-semibold text-warm-gray-dark">Clear Face Shot</p>
                    <p className="text-sm text-warm-gray">Face should fill most of the frame. Remove sunglasses, hats, or anything covering your eyes and hair.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sage mt-1" />
                  <div>
                    <p className="font-semibold text-warm-gray-dark">Minimal Makeup</p>
                    <p className="text-sm text-warm-gray">Clean face with no makeup or very minimal makeup. This helps us see your natural skin tone.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-terracotta" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">How accurate is the AI analysis?</h4>
                <p className="text-sm text-warm-gray">
                  Our AI is trained on thousands of professional color analyses and achieves high accuracy when provided with quality photos that meet our guidelines.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">How long does it take to get results?</h4>
                <p className="text-sm text-warm-gray">
                  Results are typically delivered to your email within 30 seconds to 2 minutes after payment completion.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">What file formats are supported?</h4>
                <p className="text-sm text-warm-gray">
                  We accept JPEG, PNG, and HEIC (iPhone) image formats. Maximum file size is 10MB per photo.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">Can I upload photos of multiple people?</h4>
                <p className="text-sm text-warm-gray">
                  No, each analysis is for one person only. Photos should contain only the person being analyzed.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">What if I don't receive my results?</h4>
                <p className="text-sm text-warm-gray">
                  Check your spam folder first. If you still don't receive results within 10 minutes, contact our support team.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">Are refunds available?</h4>
                <p className="text-sm text-warm-gray">
                  No, all sales are final due to the instant digital nature of our service. Please review our terms of service for details.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <div className="p-4 bg-gradient-to-r from-sage/20 to-lagoon/20 border border-sage/30 rounded-lg">
            <h4 className="font-semibold text-warm-gray-dark mb-3 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Need More Help?
            </h4>
            <p className="text-sm text-warm-gray mb-2">
              Contact our support team for additional assistance:
            </p>
            <p className="text-sm text-terracotta font-medium">support@hazelandhue.com</p>
            <p className="text-xs text-warm-gray mt-2">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
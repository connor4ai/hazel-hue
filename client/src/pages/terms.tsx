import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, AlertTriangle, DollarSign } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Terms() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <SEOHead 
        title="Terms of Service - Hazel & Hue AI Color Analysis"
        description="Review our terms of service, payment policy, and service agreement for Hazel & Hue's AI color analysis platform."
        path="/terms"
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
              onClick={() => setLocation('/help')}
              className="text-warm-gray hover:text-terracotta transition-colors"
            >
              Help
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
              Terms of Service
            </h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Please review our service terms and payment policy
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* No Refund Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <AlertTriangle className="w-5 h-5 mr-2" />
                No Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-red-800 mb-2">ALL SALES FINAL</p>
                <p className="text-red-700">
                  Due to the instant digital nature of our AI color analysis service, all payments are final and non-refundable. 
                  By purchasing our service, you acknowledge and agree to this no-refund policy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-terracotta" />
                Service Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">Service Description</h4>
                <p className="text-sm text-warm-gray">
                  Hazel & Hue provides AI-powered color analysis services that determine your seasonal color palette 
                  based on uploaded photos. Results are delivered digitally via email.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">Photo Requirements</h4>
                <ul className="text-sm text-warm-gray space-y-1">
                  <li>• Clear, well-lit photos without filters</li>
                  <li>• Natural lighting preferred</li>
                  <li>• Face visible without sunglasses or heavy makeup</li>
                  <li>• 1-3 photos maximum per analysis</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">Delivery</h4>
                <p className="text-sm text-warm-gray">
                  Analysis results are delivered to your email address within minutes of payment completion. 
                  Please ensure your email address is correct during checkout.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-terracotta" />
                Payment Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">Pricing</h4>
                <p className="text-sm text-warm-gray">
                  Our AI color analysis service costs $29.00 USD. This is a one-time fee for a complete analysis.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">Payment Processing</h4>
                <p className="text-sm text-warm-gray">
                  Payments are processed securely through Stripe. We accept major credit cards, debit cards, 
                  and digital payment methods including Apple Pay and Google Pay.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-warm-gray-dark mb-2">Security</h4>
                <p className="text-sm text-warm-gray">
                  Your payment information is encrypted and secure. We do not store credit card information on our servers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <div className="p-4 bg-gradient-to-r from-sage/20 to-lagoon/20 border border-sage/30 rounded-lg">
            <h4 className="font-semibold text-warm-gray-dark mb-3">Questions?</h4>
            <p className="text-sm text-warm-gray">
              If you have questions about our terms of service, please contact us at support@hazelandhue.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
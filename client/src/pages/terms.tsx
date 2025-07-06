import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Terms() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1FAEE' }}>
      <SEOHead 
        title="Terms of Service - Hazel & Hue"
        description="Terms of service for Hazel & Hue AI color analysis platform."
        path="/terms"
      />

      {/* Background Elements - Same as upload page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: '#E85A4F', top: '10%', left: '10%' }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-24 h-24 rounded-full opacity-20"
          style={{ backgroundColor: '#F4A261', top: '20%', right: '15%' }}
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 py-4 px-4" style={{ backgroundColor: '#2D5A3D' }}>
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation('/homepage')}
            className="text-white hover:bg-white/10 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-white" style={{ 
            fontFamily: 'Playfair Display, Georgia, serif' 
          }}>
            Terms of Service
          </h1>
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
            {/* Important Notice */}
            <Card className="mb-8" style={{ border: '2px solid #E85A4F', backgroundColor: '#FEF2F2' }}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="font-semibold text-red-800">Important Policy</h3>
                </div>
                <p className="text-red-700 font-medium">
                  All sales are final. No returns or refunds are accepted for our AI color analysis service.
                </p>
              </CardContent>
            </Card>

            {/* Service Terms */}
            <Card className="mb-6" style={{ border: '2px solid #A8DADC' }}>
              <CardHeader>
                <CardTitle style={{ color: '#2D5A3D' }}>Service Agreement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Service Description</h4>
                    <p className="text-gray-600 text-sm">
                      Hazel & Hue provides AI-powered color analysis services. You upload photos and receive 
                      personalized color recommendations based on automated analysis.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Payment</h4>
                    <p className="text-gray-600 text-sm">
                      Payment is required before analysis. The service fee is $29 per analysis.
                      All sales are final and no refunds will be provided.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Photo Usage</h4>
                    <p className="text-gray-600 text-sm">
                      Photos you upload are processed for analysis purposes only and are automatically 
                      deleted after processing. We do not store or use your photos for any other purpose.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Results Disclaimer</h4>
                    <p className="text-gray-600 text-sm">
                      Color analysis results are provided for informational purposes. Results may vary 
                      and are not guaranteed to be accurate for all individuals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="mb-6" style={{ border: '2px solid #A8DADC' }}>
              <CardHeader>
                <CardTitle style={{ color: '#2D5A3D' }}>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Provide clear, well-lit photos for accurate analysis</li>
                  <li>• Only upload photos you have rights to use</li>
                  <li>• Use the service for personal purposes only</li>
                  <li>• Understand that all sales are final</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card style={{ border: '2px solid #A8DADC' }}>
              <CardHeader>
                <CardTitle style={{ color: '#2D5A3D' }}>Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  If you have questions about these terms, please contact us through our help section 
                  before purchasing the service.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
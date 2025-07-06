import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Clock, Zap, Users } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1FAEE' }}>
      <SEOHead 
        title="About Hazel & Hue - AI Color Analysis Platform"
        description="Learn about Hazel & Hue's AI-powered color analysis technology and our professional color matching service."
        path="/about"
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
            About Hazel & Hue
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
            <Card className="mb-8" style={{ border: '2px solid #A8DADC' }}>
              <CardHeader>
                <CardTitle style={{ color: '#2D5A3D' }}>
                  Professional AI Color Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Hazel & Hue provides professional color analysis using advanced AI technology. 
                  Our service analyzes your photos to determine your optimal color palette based 
                  on the 12-season color analysis system.
                </p>
                <p className="text-gray-600">
                  Upload your photos and receive personalized color recommendations, makeup suggestions, 
                  and styling guidance within 30 seconds.
                </p>
              </CardContent>
            </Card>

            {/* Service Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card style={{ border: '2px solid #A8DADC' }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#E85A4F' }}>
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold" style={{ color: '#2D5A3D' }}>Fast Analysis</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Advanced AI processing delivers your complete color analysis in 30 seconds.
                  </p>
                </CardContent>
              </Card>

              <Card style={{ border: '2px solid #A8DADC' }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#F4A261' }}>
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold" style={{ color: '#2D5A3D' }}>Privacy Protected</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Your photos are processed securely and automatically deleted after analysis.
                  </p>
                </CardContent>
              </Card>

              <Card style={{ border: '2px solid #A8DADC' }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#A8DADC' }}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold" style={{ color: '#2D5A3D' }}>Professional Results</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Comprehensive 12-season analysis with 64 personalized colors and styling guidance.
                  </p>
                </CardContent>
              </Card>

              <Card style={{ border: '2px solid #A8DADC' }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#2D5A3D' }}>
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold" style={{ color: '#2D5A3D' }}>Available 24/7</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Get your color analysis any time with our automated AI service.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card style={{ border: '2px solid #A8DADC' }}>
              <CardHeader>
                <CardTitle style={{ color: '#2D5A3D' }}>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  For questions about your color analysis, please contact us through our help section.
                  Our service is available online 24/7 for immediate color analysis results.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
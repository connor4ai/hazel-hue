import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Clock, Smartphone, Upload } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Help() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1FAEE' }}>
      <SEOHead 
        title="Help & FAQ - Hazel & Hue"
        description="Get help with Hazel & Hue AI color analysis service. Learn how to upload photos and use our platform."
        path="/help"
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
            Help & FAQ
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
            {/* How to Use */}
            <Card className="mb-8" style={{ border: '2px solid #A8DADC' }}>
              <CardHeader>
                <CardTitle style={{ color: '#2D5A3D' }}>How to Use Our Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E85A4F' }}>
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>1. Upload Photos</h3>
                    <p className="text-sm text-gray-600">Upload 1-3 clear photos of yourself in natural lighting</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F4A261' }}>
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>2. Pay & Process</h3>
                    <p className="text-sm text-gray-600">Complete payment and wait 30 seconds for AI analysis</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A8DADC' }}>
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>3. Get Results</h3>
                    <p className="text-sm text-gray-600">Receive your personalized color palette and styling guide</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photo Tips */}
            <Card className="mb-8" style={{ border: '2px solid #A8DADC' }}>
              <CardHeader>
                <CardTitle style={{ color: '#2D5A3D' }}>Photo Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#E85A4F' }}>✅ Do This</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Use natural daylight (near a window)</li>
                      <li>• Include face, neck, and some hair</li>
                      <li>• Take photos without heavy makeup</li>
                      <li>• Use a plain background if possible</li>
                      <li>• Upload JPEG, PNG, or HEIC files</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#E85A4F' }}>❌ Avoid This</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Indoor artificial lighting</li>
                      <li>• Heavy filters or editing</li>
                      <li>• Blurry or dark photos</li>
                      <li>• Photos with strong color casts</li>
                      <li>• Files larger than 10MB</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <div className="space-y-4">
              <Card style={{ border: '2px solid #A8DADC' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#2D5A3D' }}>What do I receive?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    You receive a personalized color analysis with 64 recommended colors, 
                    makeup suggestions, and styling guidance based on the 12-season color system.
                  </p>
                </CardContent>
              </Card>

              <Card style={{ border: '2px solid #A8DADC' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#2D5A3D' }}>How long does analysis take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    The AI analysis typically completes within 30 seconds after payment.
                  </p>
                </CardContent>
              </Card>

              <Card style={{ border: '2px solid #A8DADC' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#2D5A3D' }}>Can I use phone photos?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Yes, phone photos work well. We support JPEG, PNG, and HEIC formats from all devices.
                  </p>
                </CardContent>
              </Card>

              <Card style={{ border: '2px solid #A8DADC' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#2D5A3D' }}>What about refunds?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    All sales are final. Please review our terms of service before purchasing.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Technical Support */}
            <Card className="mt-8" style={{ border: '2px solid #A8DADC' }}>
              <CardHeader>
                <CardTitle style={{ color: '#2D5A3D' }}>Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Upload Issues</h4>
                    <p className="text-gray-600 text-sm">
                      If photos won't upload, check file size (max 10MB) and format (JPEG/PNG/HEIC). 
                      Try using a different browser or device.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Payment Problems</h4>
                    <p className="text-gray-600 text-sm">
                      Payment processing is handled securely by Stripe. If you encounter issues, 
                      try refreshing the page or using a different payment method.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
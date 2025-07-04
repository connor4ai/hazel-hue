import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Camera, 
  Sparkles, 
  ArrowLeft,
  Sun,
  User,
  RotateCcw,
  Shirt,
  Shield,
  DollarSign,
  FileText,
  Star,
  Clock,
  Palette,
  Eye,
  Heart
} from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { AdvancedSEO } from '@/components/AdvancedSEO';

export default function RedditLandingPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileSelect = (file: File) => {
    if (files.length >= 3) {
      toast({
        title: "Maximum files reached",
        description: "You can upload up to 3 photos",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Each photo must be under 10MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type - improved HEIC support
    const fileName = file.name.toLowerCase();
    const isHeicFile = fileName.endsWith('.heic') || fileName.endsWith('.heif');
    const isStandardImage = file.type === 'image/jpeg' || 
                           file.type === 'image/jpg' || 
                           file.type === 'image/png';
    const isHeicMimeType = file.type === 'image/heic' || 
                          file.type === 'image/heif';
    
    const isValidType = isStandardImage || isHeicMimeType || isHeicFile;
    
    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPEG, PNG, or HEIC files",
        variant: "destructive",
      });
      return;
    }

    setFiles(prev => [...prev, file]);
  };

  const handleMultipleFileSelect = (selectedFiles: FileList) => {
    const newFiles: File[] = [];
    const errors: string[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Check if we'll exceed 3 files
      if (files.length + newFiles.length >= 3) {
        errors.push("Maximum 3 photos allowed");
        break;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        errors.push(`${file.name} is too large (max 10MB)`);
        continue;
      }

      // Validate file type - improved HEIC support
      const fileName = file.name.toLowerCase();
      const isHeicFile = fileName.endsWith('.heic') || fileName.endsWith('.heif');
      const isStandardImage = file.type === 'image/jpeg' || 
                             file.type === 'image/jpg' || 
                             file.type === 'image/png';
      const isHeicMimeType = file.type === 'image/heic' || 
                            file.type === 'image/heif';
      
      const isValidType = isStandardImage || isHeicMimeType || isHeicFile;
      
      if (!isValidType) {
        errors.push(`${file.name} is not a valid image file (JPEG, PNG, or HEIC only)`);
        continue;
      }

      newFiles.push(file);
    }

    if (errors.length > 0) {
      toast({
        title: "Some files couldn't be uploaded",
        description: errors.join(', '),
        variant: "destructive",
      });
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleContinue = async () => {
    if (files.length < 3) {
      toast({
        title: "Not enough photos",
        description: "Please upload at least 3 photos for accurate analysis",
        variant: "destructive",
      });
      return;
    }

    // Start the analysis immediately without authentication
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`photo${index + 1}`, file);
      });

      // Store file metadata for potential reuse
      const fileMetadata = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      }));
      sessionStorage.setItem('uploadedFiles', JSON.stringify(fileMetadata));

      // Start the analysis in the background (guest order)
      const response = await fetch('/api/orders/guest', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to start analysis');
      }

      const order = await response.json();
      
      // Store order ID for the loading page to track
      sessionStorage.setItem('currentOrderId', order.id.toString());

      // Navigate to analyzing page after getting order ID
      setLocation('/analyzing');
      
      // For debugging - also try direct redirect after short delay
      setTimeout(() => {
        const currentOrderId = sessionStorage.getItem('currentOrderId');
        if (currentOrderId) {
          // Check if analysis completed quickly and redirect directly
          fetch(`/api/orders/${currentOrderId}/status`)
            .then(res => res.json())
            .then(data => {
              if (data.status === 'completed') {
                setLocation(`/results-preview/${currentOrderId}`);
              }
            })
            .catch(console.error);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error starting analysis:', error);
      toast({
        title: "Error",
        description: "Failed to start analysis. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <SEOHead 
        title="AI Color Analysis - Discover Your Perfect Palette | Hazel & Hue"
        description="Professional AI-powered color analysis in 30 seconds. Discover your seasonal color palette with 180+ personalized colors, makeup recommendations, and style guidance."
        path="/reddit-landing"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Hazel & Hue AI Color Analysis",
          "description": "AI-powered seasonal color analysis service",
          "priceRange": "$29.00",
          "offers": {
            "@type": "Offer",
            "price": "29.00",
            "priceCurrency": "USD"
          }
        }}
      />
      <AdvancedSEO 
        page="reddit-landing" 
        additionalKeywords={[
          "AI color analysis", "seasonal color analysis", "personal color consultation",
          "color palette analysis", "style consultation", "makeup recommendations"
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-warm-gray-dark mb-4">
              AI Color Analysis
            </h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Upload your photos and let AI discover your perfect palette
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section - Exact Match to Original */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-terracotta" />
                  Upload Photos ({files.length}/3)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {files.length < 3 && (
                  <div className="text-center">
                    <input
                      type="file"
                      multiple
                      accept=".heic,.heif,.jpg,.jpeg,.png,image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          if (e.target.files.length === 1) {
                            handleFileSelect(e.target.files[0]);
                          } else {
                            handleMultipleFileSelect(e.target.files);
                          }
                        }
                      }}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-terracotta/30 rounded-lg hover:border-terracotta/50 transition-colors cursor-pointer bg-gradient-to-br from-terracotta/5 to-marigold/5 hover:from-terracotta/10 hover:to-marigold/10"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 text-terracotta mb-4" />
                        <p className="mb-2 text-lg font-semibold text-warm-gray-dark">
                          Drop your photos here
                        </p>
                        <p className="text-sm text-warm-gray text-center">
                          or click to browse
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {files.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-warm-gray-dark">Selected Photos:</h4>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-warm-gray">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  onClick={handleContinue}
                  disabled={files.length < 3}
                  className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white py-3 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get My Analysis - $29
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Content Section - Reddit Ad Compliance */}
          <div className="space-y-6">
            {/* Pricing Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-terracotta" />
                  Transparent Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warm-gray-dark mb-2">$29.00</div>
                <p className="text-warm-gray mb-4">One-time payment for complete color analysis</p>
                <ul className="space-y-2 text-sm text-warm-gray">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" />180+ personalized colors</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" />Professional makeup recommendations</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" />6-page detailed PDF report</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" />Lifetime access to results</li>
                </ul>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-lagoon" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-terracotta font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-gray-dark">Upload 3 Clear Photos</h4>
                    <p className="text-warm-gray text-sm">Take selfies in natural lighting without makeup</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-marigold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-marigold font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-gray-dark">AI Analysis in 30 Seconds</h4>
                    <p className="text-warm-gray text-sm">Our advanced AI analyzes your undertones and features</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-lagoon/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lagoon font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-gray-dark">Receive Complete Color Palette</h4>
                    <p className="text-warm-gray text-sm">Get your seasonal type with 180+ perfect colors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You Get */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-marigold" />
                  What You'll Receive
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Palette className="w-5 h-5 text-terracotta" />
                  <span className="text-warm-gray">Complete 12-season color analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-lagoon" />
                  <span className="text-warm-gray">Professional makeup color recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shirt className="w-5 h-5 text-terracotta" />
                  <span className="text-warm-gray">Clothing and accessory guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-marigold" />
                  <span className="text-warm-gray">Detailed 6-page PDF report</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-terracotta" />
                  <span className="text-warm-gray">Style personality assessment</span>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-lagoon" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="text-warm-gray space-y-2">
                <p className="text-sm">• Your photos are processed securely and never shared</p>
                <p className="text-sm">• SSL encryption protects all data transmission</p>
                <p className="text-sm">• Results delivered via secure email link</p>
                <p className="text-sm">• No subscription or recurring charges</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-warm-gray-dark mb-8">Why Choose Hazel & Hue?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-warm-gray-dark">AI-Powered Accuracy</h3>
              <p className="text-warm-gray text-sm">Advanced computer vision analyzes undertones, contrast, and features with professional precision</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-marigold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-marigold" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-warm-gray-dark">Instant Results</h3>
              <p className="text-warm-gray text-sm">Get your complete color analysis in just 30 seconds - no waiting weeks for appointments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lagoon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-lagoon" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-warm-gray-dark">Complete Palette</h3>
              <p className="text-warm-gray text-sm">180+ personalized colors with exact hex codes, makeup matches, and styling guidance</p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 text-center text-sm text-warm-gray space-x-4">
          <a href="/privacy-policy" className="hover:text-warm-gray-dark underline">Privacy Policy</a>
          <span>•</span>
          <a href="/terms-of-service" className="hover:text-warm-gray-dark underline">Terms of Service</a>
          <span>•</span>
          <a href="/refund-policy" className="hover:text-warm-gray-dark underline">Refund Policy</a>
          <span>•</span>
          <span>Hazel & Hue LLC • Professional Color Analysis Service</span>
        </div>
      </div>
    </div>
  );
}
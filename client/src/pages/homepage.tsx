import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UploadZone from '@/components/upload-zone';
import { 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Camera, 
  ArrowLeft
} from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { AdvancedSEO } from '@/components/AdvancedSEO';

export default function Homepage() {
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

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No photos selected",
        description: "Please upload at least one photo",
        variant: "destructive",
      });
      return;
    }

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
        title="AI Color Analysis - Discover Your Perfect Colors | Hazel & Hue"
        description="Professional AI color analysis in 30 seconds. Upload 3 photos and discover your seasonal color palette with personalized makeup and style recommendations. $29 analysis."
        path="/homepage"
      />
      <AdvancedSEO 
        page="homepage" 
        additionalKeywords={[
          "AI color analysis", "color analysis online", "seasonal color analysis", "personal color analysis",
          "color palette test", "virtual color analysis", "professional color consultation", 
          "12 season color analysis", "color matching service", "style analysis"
        ]}
      />

      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-warm-gray/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-serif text-2xl font-bold text-warm-gray-dark">
            Hazel & Hue
          </div>
          <div className="flex space-x-6">
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
        {/* Minimalist Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-bold text-warm-gray-dark mb-4">
            AI Color Analysis
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Upload your photos for professional color analysis. $29
          </p>
        </div>

        {/* Upload Section - Identical to upload page */}
        <div className="max-w-2xl mx-auto">
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
                        Array.from(e.target.files).forEach(file => {
                          handleFileSelect(file);
                        });
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
                        Click or drag photos here
                      </p>
                      <p className="text-sm text-warm-gray">
                        Upload 1-3 clear selfies (JPEG, PNG, or HEIC)
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Uploaded Files Display */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-warm-gray-dark">Uploaded Photos:</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-marigold/10 rounded-lg border border-marigold/20">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-sage" />
                        <div>
                          <p className="font-medium text-warm-gray-dark">{file.name}</p>
                          <p className="text-sm text-warm-gray">
                            {(file.size / (1024 * 1024)).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-warm-gray hover:text-red-600"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              {files.length > 0 && (
                <Button
                  onClick={handleUpload}
                  className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-semibold py-3 text-lg"
                >
                  Continue to Payment ($29)
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-warm-gray">
          <p>All sales final. No refunds.</p>
        </div>
      </div>
    </div>
  );
}
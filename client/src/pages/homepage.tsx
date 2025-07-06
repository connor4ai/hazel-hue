import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Sparkles, CheckCircle, ArrowLeft } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

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

      // Validate file type
      const fileName = file.name.toLowerCase();
      const isHeicFile = fileName.endsWith('.heic') || fileName.endsWith('.heif');
      const isStandardImage = file.type === 'image/jpeg' || 
                             file.type === 'image/jpg' || 
                             file.type === 'image/png';
      const isHeicMimeType = file.type === 'image/heic' || 
                            file.type === 'image/heif';
      
      const isValidType = isStandardImage || isHeicMimeType || isHeicFile;
      
      if (!isValidType) {
        errors.push(`${file.name} must be JPEG, PNG, or HEIC format`);
        continue;
      }

      newFiles.push(file);
    }

    if (errors.length > 0) {
      toast({
        title: "Upload errors",
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

  const handleAnalyze = async () => {
    if (files.length === 0) {
      toast({
        title: "No photos uploaded",
        description: "Please upload at least 1 photo to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create form data with files
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
        title="AI Color Analysis - Hazel & Hue"
        description="Upload your photos and let AI discover your perfect color palette with professional seasonal color analysis."
        path="/homepage"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex space-x-6 mb-4">
            <Button
              variant="ghost"
              onClick={() => setLocation('/about')}
              className="text-warm-gray hover:text-warm-gray-dark"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation('/terms')}
              className="text-warm-gray hover:text-warm-gray-dark"
            >
              Terms
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation('/help')}
              className="text-warm-gray hover:text-warm-gray-dark"
            >
              Help
            </Button>
          </div>
          
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
          {/* Upload Section */}
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
                          Upload Your Photos
                        </p>
                        <p className="text-sm text-warm-gray text-center">
                          Select up to 3 photos (JPEG or PNG, up to 10MB each)
                        </p>
                        <p className="text-xs text-warm-gray mt-2">
                          You can select multiple files at once
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
                  onClick={handleAnalyze}
                  disabled={files.length === 0}
                  className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white py-3 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Continue for $29
                </Button>
                <p className="text-xs text-warm-gray text-center">All sales final</p>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photo Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-warm-gray">
                  For the most accurate color analysis results, please follow these guidelines:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-terracotta text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-gray-dark">Natural Lighting</h4>
                      <p className="text-sm text-warm-gray">Take photos near a window with bright, natural daylight</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-terracotta text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-gray-dark">No Makeup</h4>
                      <p className="text-sm text-warm-gray">Minimal or no makeup for accurate skin tone analysis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-terracotta text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-gray-dark">Clear Face Shot</h4>
                      <p className="text-sm text-warm-gray">Face should be clearly visible, hair uncovered if possible</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
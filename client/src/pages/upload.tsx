import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UploadZone from '@/components/upload-zone';
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
  Shirt
} from 'lucide-react';


export default function UploadPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
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

    // Validate file type
    if (!file.type.startsWith('image/') || (!file.type.includes('jpeg') && !file.type.includes('jpg') && !file.type.includes('png'))) {
      toast({
        title: "Invalid file type",
        description: "Please upload only JPEG or PNG files",
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
      if (!file.type.startsWith('image/') || (!file.type.includes('jpeg') && !file.type.includes('jpg') && !file.type.includes('png'))) {
        errors.push(`${file.name} is not a valid image file`);
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-warm-gray hover:text-warm-gray-dark mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-warm-gray-dark mb-4">
              Upload Your Photos
            </h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Upload 3 high-quality selfies for your personal color analysis. Follow our guidelines for the most accurate results.
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
                      accept="image/jpeg,image/jpg,image/png"
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
                  onClick={handleContinue}
                  disabled={files.length < 3}
                  className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white py-3 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get My Analysis
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Guidelines */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-lagoon" />
                  Photo Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Sun className="w-5 h-5 text-marigold mt-1" />
                    <div>
                      <p className="font-semibold text-warm-gray-dark">Natural Lighting</p>
                      <p className="text-sm text-warm-gray">Take photos in bright, natural daylight near a window. Avoid artificial lighting or harsh shadows.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-terracotta mt-1" />
                    <div>
                      <p className="font-semibold text-warm-gray-dark">No Makeup</p>
                      <p className="text-sm text-warm-gray">Clean face with no makeup or very minimal makeup. This helps us see your natural skin tone.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <RotateCcw className="w-5 h-5 text-sage mt-1" />
                    <div>
                      <p className="font-semibold text-warm-gray-dark">Different Angles</p>
                      <p className="text-sm text-warm-gray">Upload 3 photos: front view, side profile, and another angle. Hair pulled back shows more of your face.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Shirt className="w-5 h-5 text-lagoon mt-1" />
                    <div>
                      <p className="font-semibold text-warm-gray-dark">Neutral Clothing</p>
                      <p className="text-sm text-warm-gray">Wear neutral colors (white, beige, gray) to avoid color reflection on your face.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-terracotta/10 to-marigold/10 rounded-lg">
                  <h4 className="font-semibold text-warm-gray-dark mb-3">Example Photos</h4>
                  <div className="grid grid-cols-3 gap-3 text-xs text-warm-gray">
                    <div className="text-center">
                      <div className="w-full h-20 rounded-lg overflow-hidden mb-2 border border-gray-200 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                        <div className="text-center">
                          <User className="w-8 h-8 text-blue-400 mx-auto mb-1" />
                          <div className="text-xs text-blue-600 font-medium">Good</div>
                        </div>
                      </div>
                      <p className="font-medium">Natural Light</p>
                      <p className="text-xs">Clear, well-lit face</p>
                    </div>
                    <div className="text-center">
                      <div className="w-full h-20 rounded-lg overflow-hidden mb-2 border border-gray-200 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                        <div className="text-center">
                          <User className="w-8 h-8 text-green-400 mx-auto mb-1" />
                          <div className="text-xs text-green-600 font-medium">Good</div>
                        </div>
                      </div>
                      <p className="font-medium">Front View</p>
                      <p className="text-xs">Minimal makeup</p>
                    </div>
                    <div className="text-center">
                      <div className="w-full h-20 rounded-lg overflow-hidden mb-2 border border-gray-200 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                        <div className="text-center">
                          <User className="w-8 h-8 text-purple-400 mx-auto mb-1" />
                          <div className="text-xs text-purple-600 font-medium">Good</div>
                        </div>
                      </div>
                      <p className="font-medium">Good Angle</p>
                      <p className="text-xs">Neutral clothing</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tips for Best Results</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Stand 2-3 feet from a window for soft, even lighting</li>
                    <li>• Face the light source directly to avoid shadows</li>
                    <li>• Remove accessories like hats or sunglasses</li>
                    <li>• Ensure your face fills most of the frame</li>
                    <li>• Photos should be clear and not blurry</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
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
                  Photo Guidelines for Best Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Examples with Real Images */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-warm-gray-dark text-lg">Photo Examples</h4>
                  
                  <div className="space-y-4">
                    {/* Good Example */}
                    <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Perfect Example ✓</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <img 
                          src="/attached_assets/IMG_2843_1751224590512.jpg" 
                          alt="Good photo example - close-up selfie with natural lighting"
                          className="w-20 h-20 object-cover rounded-lg border-2 border-green-300"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-green-700">
                            <strong>Close-up selfie</strong> with natural lighting, minimal makeup, clear view of eyes and hair, simple background
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bad Examples */}
                    <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-800">Avoid These ✗</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <img 
                            src="/attached_assets/IMG_2845_1751224590513.jpg" 
                            alt="Bad photo example - multiple people with sunglasses"
                            className="w-16 h-16 object-cover rounded-lg border-2 border-red-300"
                          />
                          <p className="text-sm text-red-700">
                            <strong>Multiple people & sunglasses</strong> - Can't see eyes or determine which person to analyze
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <img 
                            src="/attached_assets/IMG_2846_1751224590513.jpg" 
                            alt="Bad photo example - too far away with sunglasses"
                            className="w-16 h-16 object-cover rounded-lg border-2 border-red-300"
                          />
                          <p className="text-sm text-red-700">
                            <strong>Too far away & covered eyes</strong> - Face too small, features not visible
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Requirements */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-warm-gray-dark text-lg">Requirements for Accurate Analysis</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-lagoon mt-1" />
                      <div>
                        <p className="font-semibold text-warm-gray-dark">Close-up & Single Subject</p>
                        <p className="text-sm text-warm-gray">Face should fill most of the frame. Only one person per photo for accurate analysis.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Sun className="w-5 h-5 text-marigold mt-1" />
                      <div>
                        <p className="font-semibold text-warm-gray-dark">Natural Lighting</p>
                        <p className="text-sm text-warm-gray">Take photos in bright, natural daylight near a window. Avoid flash, artificial lighting, or harsh shadows.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Camera className="w-5 h-5 text-terracotta mt-1" />
                      <div>
                        <p className="font-semibold text-warm-gray-dark">Eyes & Hair Visible</p>
                        <p className="text-sm text-warm-gray">Remove sunglasses, hats, or anything covering your eyes and hair. Both are crucial for accurate analysis.</p>
                      </div>
                    </div>
                  
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-terracotta mt-1" />
                      <div>
                        <p className="font-semibold text-warm-gray-dark">Minimal Makeup</p>
                        <p className="text-sm text-warm-gray">Clean face with no makeup or very minimal makeup. This helps us see your natural skin tone.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <RotateCcw className="w-5 h-5 text-sage mt-1" />
                      <div>
                        <p className="font-semibold text-warm-gray-dark">Simple Background</p>
                        <p className="text-sm text-warm-gray">Use a plain, neutral background. Avoid busy patterns or strong colors that might affect the analysis.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-lagoon mt-1" />
                      <div>
                        <p className="font-semibold text-warm-gray-dark">No Filters or Flash</p>
                        <p className="text-sm text-warm-gray">Upload unfiltered photos taken without flash. Beauty filters and artificial lighting can alter your natural coloring.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pro Tips */}
                <div className="p-4 bg-gradient-to-r from-sage/20 to-lagoon/20 border border-sage/30 rounded-lg">
                  <h4 className="font-semibold text-warm-gray-dark mb-3">Pro Tips for Best Results</h4>
                  <ul className="text-sm text-warm-gray space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-lagoon font-bold">•</span>
                      <span>Stand 2-3 feet from a window for soft, even lighting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-lagoon font-bold">•</span>
                      <span>Face the light source directly to avoid shadows</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-lagoon font-bold">•</span>
                      <span>Remove accessories like hats, sunglasses, or heavy jewelry</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-lagoon font-bold">•</span>
                      <span>Ensure your face fills most of the frame</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-lagoon font-bold">•</span>
                      <span>Photos should be clear and not blurry</span>
                    </li>
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
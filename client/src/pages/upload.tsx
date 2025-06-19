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

    // Convert files to base64 for storage
    const fileDataPromises = files.map(file => {
      return new Promise<any>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            data: reader.result as string
          });
        };
        reader.readAsDataURL(file);
      });
    });

    const fileData = await Promise.all(fileDataPromises);
    sessionStorage.setItem('uploadedFiles', JSON.stringify(fileData));
    
    // Store actual file objects for later upload
    (window as any).uploadedFiles = files;
    
    // Navigate to checkout
    setLocation('/checkout');
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
                  <UploadZone
                    onFileSelect={handleFileSelect}
                    onUploadClick={() => {}}
                    file={null}
                    instruction={{
                      title: "Choose a photo",
                      description: "JPEG or PNG up to 10MB",
                      icon: <Upload className="w-8 h-8 text-terracotta" />
                    }}
                  />
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
                  Continue to Payment - $29
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
                  <h4 className="font-semibold text-warm-gray-dark mb-2">Example Photos</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs text-warm-gray">
                    <div className="text-center">
                      <div className="w-full h-16 bg-gradient-to-b from-terracotta/20 to-terracotta/10 rounded mb-1"></div>
                      <p>Front View</p>
                    </div>
                    <div className="text-center">
                      <div className="w-full h-16 bg-gradient-to-b from-marigold/20 to-marigold/10 rounded mb-1"></div>
                      <p>Side Profile</p>
                    </div>
                    <div className="text-center">
                      <div className="w-full h-16 bg-gradient-to-b from-lagoon/20 to-lagoon/10 rounded mb-1"></div>
                      <p>3/4 View</p>
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
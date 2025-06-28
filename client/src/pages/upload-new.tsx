import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
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
  X
} from 'lucide-react';

export default function UploadNew() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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

    setIsUploading(true);

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
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Modern Design System Styles */}
      <style>{`
        /* Import Google Font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* Design System Variables */
        :root {
            --ink: #0A0A0A;
            --pearl: #FAFAFA;
            --mist: #F5F5F5;
        }

        /* Animated Gradient Mesh Background */
        .mesh {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }

        .mesh::before,
        .mesh::after {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            animation: morphing 25s ease-in-out infinite;
        }

        .mesh::before {
            background: radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
            animation-delay: 0s;
        }

        .mesh::after {
            background: radial-gradient(circle at 60% 20%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 30% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 50%);
            animation-delay: -10s;
        }

        @keyframes morphing {
            0%, 100% {
                transform: rotate(0deg) scale(1) translateX(0);
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }
            25% {
                transform: rotate(90deg) scale(1.1) translateX(20px);
                border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            }
            50% {
                transform: rotate(180deg) scale(0.9) translateX(-20px);
                border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
            }
            75% {
                transform: rotate(270deg) scale(1.05) translateX(10px);
                border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
            }
        }

        /* Animated Gradient Text */
        .gradient-title {
            font-size: 3.5rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1;
            background: linear-gradient(
                135deg,
                #9333EA 0%,
                #EC4899 25%,
                #3B82F6 50%,
                #FB923C 75%,
                #9333EA 100%
            );
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-flow 8s ease infinite;
        }

        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Premium Button Style */
        .premium-button {
            padding: 1rem 3rem;
            background: var(--ink);
            color: white;
            border: none;
            border-radius: 100px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .premium-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        }

        .premium-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .premium-button:active::before {
            width: 300px;
            height: 300px;
        }

        /* Card with Subtle Elevation */
        .elevated-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 3rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .elevated-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.12);
        }

        /* Upload Zone Style */
        .modern-upload-zone {
            background: var(--mist);
            border-radius: 24px;
            padding: 3rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            border: 2px dashed #9333EA;
        }

        .modern-upload-zone::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, transparent, rgba(147, 51, 234, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .modern-upload-zone:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .modern-upload-zone:hover::before {
            opacity: 1;
        }

        /* Smooth Fade In Animation */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in {
            animation: fadeIn 0.8s ease-out;
        }

        /* Scale In Animation */
        @keyframes scaleIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        .scale-in {
            animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Floating Animation */
        @keyframes float-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .floating {
            animation: float-subtle 4s ease-in-out infinite;
        }

        /* Loading Spinner */
        .modern-spinner {
            width: 60px;
            height: 60px;
            border: 3px solid var(--mist);
            border-top-color: #9333EA;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Responsive Typography */
        @media (max-width: 768px) {
            .gradient-title { 
                font-size: 2.5rem; 
            }
        }
      `}</style>

      {/* Background Mesh */}
      <div className="mesh"></div>

      <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', background: 'var(--pearl)', color: 'var(--ink)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Back Button */}
          <div className="mb-12 fade-in">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="gradient-title mb-6">
              Upload Your Photos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload 3 high-quality selfies for your personal color analysis. Follow our guidelines for the most accurate results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Upload Section */}
            <div className="space-y-8">
              <div className="elevated-card scale-in">
                <div className="flex items-center mb-6">
                  <Camera className="w-6 h-6 mr-3" style={{ color: '#9333EA' }} />
                  <h2 className="text-2xl font-semibold">Upload Photos ({files.length}/3)</h2>
                </div>

                {files.length < 3 && (
                  <div>
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
                    <label htmlFor="photo-upload" className="modern-upload-zone block">
                      <div className="floating">
                        <Upload className="w-16 h-16 mx-auto mb-4" style={{ color: '#9333EA' }} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Drop photos here or click to browse</h3>
                      <p className="text-gray-600 mb-2">Select up to 3 photos (JPEG or PNG, up to 10MB each)</p>
                      <p className="text-sm text-gray-500">You can select multiple files at once</p>
                    </label>
                  </div>
                )}

                {files.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">Selected Photos:</h3>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/70 rounded-2xl border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleContinue}
                  disabled={files.length < 3 || isUploading}
                  className="premium-button w-full mt-8 flex items-center justify-center"
                  style={{ 
                    opacity: files.length < 3 || isUploading ? 0.5 : 1,
                    cursor: files.length < 3 || isUploading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isUploading ? (
                    <div className="modern-spinner"></div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Get My Analysis
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Guidelines */}
            <div className="space-y-8">
              <div className="elevated-card scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-6">
                  <AlertCircle className="w-6 h-6 mr-3" style={{ color: '#EC4899' }} />
                  <h2 className="text-2xl font-semibold">Photo Guidelines</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Sun className="w-6 h-6 mt-1" style={{ color: '#FB923C' }} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Natural Lighting</h3>
                      <p className="text-gray-600">Take photos in bright, natural daylight near a window. Avoid artificial lighting or harsh shadows.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <User className="w-6 h-6 mt-1" style={{ color: '#3B82F6' }} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No Makeup</h3>
                      <p className="text-gray-600">Clean face with no makeup or very minimal makeup. This helps us see your natural skin tone.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <RotateCcw className="w-6 h-6 mt-1" style={{ color: '#22C55E' }} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Different Angles</h3>
                      <p className="text-gray-600">Upload 3 photos: front view, side profile, and another angle. Hair pulled back shows more of your face.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Shirt className="w-6 h-6 mt-1" style={{ color: '#9333EA' }} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Neutral Clothing</h3>
                      <p className="text-gray-600">Wear neutral colors (white, beige, gray) to avoid color reflection on your face.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-4">Pro Tips for Best Results</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Stand 2-3 feet from a window for soft, even lighting</li>
                    <li>• Face the light source directly to avoid shadows</li>
                    <li>• Remove accessories like hats or sunglasses</li>
                    <li>• Ensure your face fills most of the frame</li>
                    <li>• Photos should be clear and not blurry</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { AdvancedSEO } from '@/components/AdvancedSEO';
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
  X,
  Shield,
  Clock,
  Palette
} from 'lucide-react';

export default function RedditLanding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

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

    // Validate file type including HEIC
    if (!file.type.startsWith('image/') || 
        (!file.type.includes('jpeg') && 
         !file.type.includes('jpg') && 
         !file.type.includes('png') && 
         !file.type.includes('heic') && 
         !file.type.includes('heif'))) {
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

      // Validate file type including HEIC
      if (!file.type.startsWith('image/') || 
          (!file.type.includes('jpeg') && 
           !file.type.includes('jpg') && 
           !file.type.includes('png') && 
           !file.type.includes('heic') && 
           !file.type.includes('heif'))) {
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

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast({
        title: "No photos selected",
        description: "Please upload at least 1 photo to continue",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Redirect to checkout with photos stored in session
      const fileData = await Promise.all(
        files.map(async (file) => {
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64
          };
        })
      );

      sessionStorage.setItem('uploadedPhotos', JSON.stringify(fileData));
      setLocation('/checkout');
      
    } catch (error) {
      console.error('Error preparing photos:', error);
      toast({
        title: "Error",
        description: "Failed to prepare photos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <AdvancedSEO 
        page="reddit-landing" 
        additionalKeywords={[
          "reddit AI color analysis", "upload photos color analysis", "AI photo analysis", "color analysis selfie upload",
          "personal color test photos", "seasonal color analysis upload", "color matching photos",
          "professional color analysis photos", "AI color consultation upload"
        ]}
      />
      <SEOHead 
        title="AI Color Analysis - Upload Photos & Get Professional Results | Hazel & Hue"
        description="Upload 3 clear selfies for your personalized AI color analysis. Get professional seasonal color recommendations, makeup guides, and style advice in 30 seconds. Only $29."
        path="/reddit-landing"
      />
      
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
            transform: translateY(-2px);
            box-shadow: 0 20px 40px rgba(147, 51, 234, 0.2);
        }

        .modern-upload-zone:hover::before {
            opacity: 1;
        }

        /* Photo Preview Grid */
        .photo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }

        .photo-item {
            position: relative;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .photo-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .photo-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .photo-remove {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .photo-remove:hover {
            background: rgba(255, 0, 0, 0.8);
            transform: scale(1.1);
        }

        /* Loading Animation */
        .loading-dots {
            display: inline-flex;
            gap: 4px;
        }

        .loading-dots span {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: currentColor;
            animation: loading-bounce 1.4s ease-in-out infinite both;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes loading-bounce {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }

        /* Typography */
        .modern-body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: var(--ink);
        }

        .section-title {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--ink);
        }

        /* Navigation */
        nav {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.9);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Animated Gradient Mesh Background */}
      <div className="mesh"></div>

      <div className="modern-body min-h-screen relative">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Hazel & Hue</h1>
            </div>
            <div className="flex items-center gap-6">
              <a href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
              <a href="/terms-of-service" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
              <a href="/refund-policy" className="text-gray-600 hover:text-gray-900 transition-colors">Refund Policy</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="gradient-title mb-6">
                AI Color Analysis
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Upload your photos and let AI discover your perfect palette
              </p>
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4" />
                30-second results • $29
              </div>
            </div>

            {/* Upload Section */}
            <div className="elevated-card mb-12">
              <div className="mb-8">
                <div
                  className="modern-upload-zone"
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    if (files.length === 1) {
                      handleFileSelect(files[0]);
                    } else if (files.length > 1) {
                      handleMultipleFileSelect(e.dataTransfer.files);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => {
                    const input = document.getElementById('file-input-multiple') as HTMLInputElement;
                    input?.click();
                  }}
                >
                  <Upload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Drop your photos here</h3>
                  <p className="text-gray-600 mb-4">or click to browse</p>
                  <p className="text-sm text-gray-500">Upload 1-3 photos • JPEG, PNG, HEIC • Max 10MB each</p>
                </div>

                <input
                  id="file-input-multiple"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/heic,image/heif"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      if (e.target.files.length === 1) {
                        handleFileSelect(e.target.files[0]);
                      } else {
                        handleMultipleFileSelect(e.target.files);
                      }
                    }
                  }}
                />

                {/* Photo Preview Grid */}
                {files.length > 0 && (
                  <div className="photo-grid">
                    {files.map((file, index) => (
                      <div key={index} className="photo-item">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                        />
                        <button
                          className="photo-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="p-3">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Photo Guidelines Toggle */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowGuidelines(!showGuidelines)}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                  >
                    {showGuidelines ? 'Hide' : 'Show'} photo guidelines
                  </button>
                </div>

                {/* Guidelines Section */}
                {showGuidelines && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-purple-600" />
                      Photo Guidelines for Best Results
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Sun className="w-8 h-8 text-purple-600" />
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">Natural Light</h5>
                        <p className="text-sm text-gray-600">Take photos near a window during daytime for best color accuracy</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">No Makeup</h5>
                        <p className="text-sm text-gray-600">Remove makeup and jewelry for accurate skin tone analysis</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Shirt className="w-8 h-8 text-green-600" />
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">Neutral Colors</h5>
                        <p className="text-sm text-gray-600">Wear white, gray, or black to avoid color influence</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 text-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={files.length === 0 || isUploading}
                    className="premium-button"
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <span className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </span>
                        Processing...
                      </span>
                    ) : (
                      `Get My Analysis - $29`
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="elevated-card mb-12">
              <h2 className="section-title text-center mb-12">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">1. Upload Photos</h3>
                  <p className="text-gray-600">Take 3 clear selfies in natural lighting without makeup</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">2. AI Analysis</h3>
                  <p className="text-gray-600">Our advanced AI analyzes your undertones and seasonal palette</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">3. Get Results</h3>
                  <p className="text-gray-600">Receive your personalized color palette and style guide</p>
                </div>
              </div>
            </div>

            {/* What You'll Receive Section */}
            <div className="elevated-card mb-12">
              <h2 className="section-title text-center mb-12">What You'll Receive</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Professional Color Analysis</h3>
                    <p className="text-gray-600">Your exact seasonal type from our 12-season system with 180+ personalized colors</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Interactive Makeup Palette</h3>
                    <p className="text-gray-600">Clickable color swatches for foundation, eyeshadow, lipstick, and blush</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shirt className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Style Recommendations</h3>
                    <p className="text-gray-600">Clothing colors, jewelry metals, and Pinterest inspiration boards</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
                    <p className="text-gray-600">Complete analysis delivered via email within 30 seconds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Security Section */}
            <div className="elevated-card text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Shield className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold">Secure & Private</h2>
              </div>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Your photos are processed securely and never stored. We use industry-standard encryption 
                and comply with all privacy regulations. Professional AI analysis backed by color theory science.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <span>🔒 SSL Encrypted</span>
                <span>🗑️ Auto-Delete After Analysis</span>
                <span>⚡ 30-Second Processing</span>
                <span>📧 Email Delivery</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
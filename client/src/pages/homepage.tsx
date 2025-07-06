import { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Homepage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      if (droppedFiles.length === 1) {
        handleFileSelect(droppedFiles[0]);
      } else {
        handleMultipleFileSelect(droppedFiles);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    setLocation('/checkout');
  };

  return (
    <>
      <SEOHead 
        title="Reddit Homepage - AI Color Analysis | Hazel & Hue"
        description="Discover your perfect seasonal color palette with AI color analysis. Upload your photos and get personalized makeup recommendations in 30 seconds."
        path="/homepage"
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
            text-align: center;
            margin: 2rem 0 1rem;
            background: linear-gradient(135deg, #8b5cf6 0%, #f59e0b 25%, #ef4444 50%, #8b5cf6 75%, #06b6d4 100%);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-shift 6s ease-in-out infinite;
        }

        @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        /* Card with Subtle Elevation - NO BORDERS */
        .elevated-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 3rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: none !important;
        }

        .elevated-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.12);
        }

        /* Floating Animation */
        @keyframes float-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .floating {
            animation: float-subtle 4s ease-in-out infinite;
        }

        /* Floating Navigation */
        .floating-nav {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.5rem;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #374151;
        }

        /* Responsive Typography */
        @media (max-width: 768px) {
            .gradient-title { 
                font-size: 2.5rem; 
            }
            .elevated-card {
                padding: 2rem;
            }
            .modern-upload-zone {
                padding: 2rem;
            }
        }
      `}</style>

      {/* Background Mesh */}
      <div className="mesh"></div>

      <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', background: 'var(--pearl)', color: 'var(--ink)' }}>
        <div className="min-h-screen flex flex-col py-4 sm:py-6">
          
          {/* Floating Navigation */}
          <div className="floating-nav">
            <button 
              onClick={() => setLocation('/about')}
              className="nav-link"
            >
              About
            </button>
            <button 
              onClick={() => setLocation('/terms')}
              className="nav-link"
            >
              Terms
            </button>
            <button 
              onClick={() => setLocation('/help')}
              className="nav-link"
            >
              Help
            </button>
          </div>

          {/* Centered Content */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-12">
            
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="gradient-title mb-4 sm:mb-6">
                AI Color Analysis
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 px-2">
                Upload your photos and let AI discover your perfect palette
              </p>
            </div>

            {/* Main Upload Area */}
            <div className="w-full max-w-2xl">
              {files.length === 0 ? (
                <div>
                  <input
                    ref={fileInputRef}
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
                    className="elevated-card block cursor-pointer"
                    style={{ border: 'none' }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-center py-12 sm:py-20">
                      <div className="floating mb-6 sm:mb-8">
                        <svg className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 mx-auto" style={{ color: '#9333EA' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-4" style={{ color: 'var(--ink)' }}>
                        Drop your photos here
                      </h2>
                      <p className="text-base sm:text-lg text-gray-600 px-4">
                        or click to browse
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="elevated-card">
                  <div className="text-center py-6 sm:py-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 px-4">Selected Photos ({files.length}/3)</h2>
                    
                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-white/70 rounded-2xl border border-gray-200 mx-2 sm:mx-0">
                          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 flex-shrink-0" />
                            <div className="text-left min-w-0 flex-1">
                              <p className="font-medium text-sm sm:text-base truncate">{file.name}</p>
                              <p className="text-xs sm:text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={handleAnalyze}
                      className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-12 rounded-2xl text-base sm:text-lg transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      Continue for $29
                    </button>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                      All sales final
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
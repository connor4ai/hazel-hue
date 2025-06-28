import { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, X } from 'lucide-react';

export default function UploadNew() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    // Validate and add files
    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    
    imageFiles.forEach(file => {
      if (files.length + validFiles.length >= 3) return;
      
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
      if (!file.type.includes('jpeg') && !file.type.includes('jpg') && !file.type.includes('png') && !file.type.includes('heic') && !file.type.includes('heif')) {
        toast({
          title: "Invalid file type",
          description: "Please upload JPEG, PNG, or HEIC images only",
          variant: "destructive",
        });
        return;
      }

      validFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        if (newPreviews.length === validFiles.length) {
          setFiles(prev => [...prev, ...validFiles]);
          setPreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleUploadZoneClick = () => {
    if (files.length < 3) {
      fileInputRef.current?.click();
    }
  };

  const handleAnalyze = async () => {
    if (files.length !== 3) {
      toast({
        title: "Upload required",
        description: "Please upload exactly 3 photos to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      // Show loading state
      const loadingOverlay = document.getElementById('loadingOverlay');
      loadingOverlay?.classList.add('active');

      // Create FormData and upload files
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('photos', file);
      });

      const response = await fetch('/api/upload-photos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      // Redirect to payment or processing
      if (result.orderId) {
        setLocation(`/payment?orderId=${result.orderId}`);
      } else {
        throw new Error('No order ID received');
      }
    } catch (error: any) {
      const loadingOverlay = document.getElementById('loadingOverlay');
      loadingOverlay?.classList.remove('active');
      toast({
        title: "Upload failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const getUploadText = () => {
    if (files.length === 0) return "Drop your photos here";
    if (files.length < 3) return `Add ${3 - files.length} more photo${3 - files.length > 1 ? 's' : ''}`;
    return "All photos uploaded";
  };

  const getUploadSubtext = () => {
    if (files.length === 0) return "or click to browse";
    if (files.length < 3) return "Click or drop to continue";
    return "Ready for analysis";
  };

  return (
    <>
      {/* Premium styles */}
      <style>{`
        :root {
          --ink: #0A0A0A;
          --pearl: #FAFAFA;
          --mist: #F5F5F5;
        }

        body { 
          overflow: hidden;
        }

        /* Animated gradient mesh background */
        .mesh {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
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

        /* Title with animated gradient */
        .title {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
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

        .subtitle {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 3rem;
          font-weight: 400;
        }

        /* Upload zone */
        .upload-zone {
          position: relative;
          width: 100%;
          height: 320px;
          background: var(--mist);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .upload-zone::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(147, 51, 234, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .upload-zone:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .upload-zone:hover::before {
          opacity: 1;
        }

        .upload-zone.active {
          background: var(--pearl);
          border: 2px solid #9333EA;
        }

        .upload-zone.dragover {
          background: rgba(147, 51, 234, 0.05);
          border: 2px dashed #9333EA;
        }

        /* Upload content */
        .upload-icon {
          width: 80px;
          height: 80px;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .upload-icon svg {
          width: 100%;
          height: 100%;
          stroke: #9333EA;
          stroke-width: 1.5;
          fill: none;
          animation: float-subtle 4s ease-in-out infinite;
        }

        @keyframes float-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .upload-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }

        .upload-subtext {
          font-size: 0.9rem;
          color: #666;
        }

        /* Photo grid */
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .photo-grid.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .photo-slot {
          aspect-ratio: 1;
          background: var(--mist);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .photo-slot.filled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .photo-slot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

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

        .photo-slot .remove {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          background: rgba(0, 0, 0, 0.8);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }

        .photo-slot:hover .remove {
          opacity: 1;
          transform: scale(1);
        }

        .photo-number {
          position: absolute;
          bottom: 8px;
          left: 8px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Analyze button */
        .analyze-btn {
          margin-top: 3rem;
          padding: 1rem 3rem;
          background: var(--ink);
          color: white;
          border: none;
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          position: relative;
          overflow: hidden;
        }

        .analyze-btn.visible {
          opacity: 0.3;
          transform: translateY(0);
        }

        .analyze-btn.ready {
          opacity: 1;
          pointer-events: auto;
        }

        .analyze-btn::before {
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

        .analyze-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .analyze-btn:active::before {
          width: 300px;
          height: 300px;
        }

        /* Loading state */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 100;
        }

        .loading-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        .loading-spinner {
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

        /* Responsive */
        @media (max-width: 768px) {
          .title { font-size: 2.5rem; }
          .upload-zone { height: 280px; }
        }
      `}</style>

      {/* Animated mesh background */}
      <div className="mesh"></div>

      {/* Main container */}
      <div className="h-screen flex flex-col items-center justify-center p-8 relative z-10" style={{ fontFamily: 'Inter, sans-serif' }}>
        
        {/* Back navigation */}
        <div className="absolute top-12 left-12 z-10">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-black/60 hover:text-black hover:-translate-x-1 transition-all duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        {/* Upload interface */}
        <div className="w-full max-w-2xl text-center">
          <h1 className="title">AI Color Analysis</h1>
          <p className="subtitle">Upload your photos and let AI discover your perfect palette</p>

          {/* Upload zone */}
          <div 
            className={`upload-zone ${files.length > 0 ? 'active' : ''} ${isDragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadZoneClick}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              multiple 
              accept="image/*,.heic,.heif"
              className="hidden"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            />
            
            <div className="upload-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            
            <div className="upload-text">{getUploadText()}</div>
            <div className="upload-subtext">{getUploadSubtext()}</div>
          </div>

          {/* Photo grid */}
          <div className={`photo-grid ${files.length > 0 ? 'visible' : ''}`}>
            {[0, 1, 2].map((index) => (
              <div key={index} className={`photo-slot ${previews[index] ? 'filled' : ''}`}>
                {previews[index] ? (
                  <>
                    <img src={previews[index]} alt={`Photo ${index + 1}`} />
                    <button 
                      className="remove"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : null}
                <div className="photo-number">{index + 1}</div>
              </div>
            ))}
          </div>

          {/* Analyze button */}
          <button 
            className={`analyze-btn ${files.length > 0 ? 'visible' : ''} ${files.length === 3 ? 'ready' : ''}`}
            onClick={handleAnalyze}
          >
            Analyze My Colors
          </button>
        </div>
      </div>

      {/* Loading overlay */}
      <div className="loading-overlay" id="loadingOverlay">
        <div className="loading-spinner"></div>
      </div>
    </>
  );
}
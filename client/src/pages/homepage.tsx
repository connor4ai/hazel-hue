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
    <>
      <SEOHead 
        title="AI Color Analysis - Hazel & Hue"
        description="Upload your photos and let AI discover your perfect color palette with professional seasonal color analysis."
        path="/homepage"
      />
      
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .upload-container {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 2rem;
        }

        .floating-nav {
          position: absolute;
          top: 2rem;
          right: 2rem;
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #6c757d;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #495057;
        }

        .main-title {
          font-size: 4rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #b4a5c7, #d4a574, #c7a5b4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #6c757d;
          text-align: center;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .upload-box {
          max-width: 500px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .upload-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-text {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .upload-subtext {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .continue-btn {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .continue-btn:hover {
          transform: translateY(-2px);
        }

        .continue-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .file-list {
          margin: 2rem 0;
          text-align: left;
        }

        .file-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .remove-btn {
          color: #dc3545;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .upload-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .upload-area {
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 2rem;
        }

        .upload-area:hover {
          border-color: #8b5cf6;
          background: #f9fafb;
        }
      `}</style>

      <div className="upload-container">
        {/* Floating Navigation */}
        <div className="floating-nav">
          <button 
            onClick={() => setLocation('/about')}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            About
          </button>
          <button 
            onClick={() => setLocation('/terms')}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Terms
          </button>
          <button 
            onClick={() => setLocation('/help')}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Help
          </button>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
          <h1 className="main-title">
            AI Color Analysis
          </h1>
          
          <p className="subtitle">
            Upload your photos and let AI discover your perfect palette
          </p>

          <div className="upload-box">
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
              className="upload-input"
              id="photo-upload"
            />
            
            <label htmlFor="photo-upload" className="upload-area">
              <div className="upload-icon">
                <Upload size={32} color="white" />
              </div>
              <div className="upload-text">Drop your photos here</div>
              <div className="upload-subtext">or click to browse</div>
            </label>

            {files.length > 0 && (
              <div className="file-list">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <span style={{ fontSize: '0.875rem' }}>{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {files.length > 0 && (
              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={handleAnalyze}
                  className="continue-btn"
                >
                  Continue for $29
                </button>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem' }}>
                  All sales final
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
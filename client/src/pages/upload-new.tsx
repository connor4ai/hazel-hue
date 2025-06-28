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
    
    // Filter for image files or HEIC files
    const imageFiles = fileArray.filter(file => 
      file.type.startsWith('image/') || 
      file.name.toLowerCase().endsWith('.heic') || 
      file.name.toLowerCase().endsWith('.heif')
    );
    
    // Check how many files we can still accept
    const remainingSlots = 3 - files.length;
    if (remainingSlots <= 0) return;
    
    // Take only the files we can accept
    const filesToProcess = imageFiles.slice(0, remainingSlots);
    
    // Validate files first
    const validFiles: File[] = [];
    
    for (const file of filesToProcess) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Each photo must be under 10MB",
          variant: "destructive",
        });
        continue;
      }

      // Validate file type
      const isValidType = file.type.includes('jpeg') || 
                         file.type.includes('jpg') || 
                         file.type.includes('png') || 
                         file.type.includes('heic') || 
                         file.type.includes('heif') ||
                         file.name.toLowerCase().endsWith('.heic') ||
                         file.name.toLowerCase().endsWith('.heif');
                         
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: "Please upload JPEG, PNG, or HEIC images only",
          variant: "destructive",
        });
        continue;
      }

      validFiles.push(file);
    }
    
    if (validFiles.length === 0) return;
    
    // Process previews for valid files
    const newPreviews: string[] = [];
    let processedCount = 0;
    
    const updateState = () => {
      setFiles(prev => [...prev, ...validFiles]);
      setPreviews(prev => [...prev, ...newPreviews]);
    };
    
    validFiles.forEach((file) => {
      // Check if it's a HEIC file
      const isHeic = file.type.includes('heic') || 
                    file.type.includes('heif') || 
                    file.name.toLowerCase().endsWith('.heic') || 
                    file.name.toLowerCase().endsWith('.heif');
                    
      if (isHeic) {
        newPreviews.push('heic-placeholder');
        processedCount++;
        
        // If all files processed, update state once
        if (processedCount === validFiles.length) {
          updateState();
        }
      } else {
        // For JPEG/PNG, show actual preview
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string);
          processedCount++;
          
          // If all files processed, update state once
          if (processedCount === validFiles.length) {
            updateState();
          }
        };
        reader.readAsDataURL(file);
      }
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
    console.log('Analyze button clicked! Files:', files.length);
    
    if (files.length !== 3) {
      console.log('Not enough files:', files.length);
      toast({
        title: "Please upload exactly 3 photos",
        description: "We need 3 photos for accurate analysis",
        variant: "destructive",
      });
      return;
    }

    console.log('Starting upload process...');

    // Create form data
    const formData = new FormData();
    files.forEach((file, index) => {
      console.log(`Adding file ${index + 1}:`, file.name, file.type);
      formData.append(`photos`, file);
    });

    try {
      console.log('Sending request to /api/upload...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response format');
      }
      
      // Navigate to results preview
      if (data.orderId) {
        console.log('Navigating to results preview:', `/results-preview/${data.orderId}`);
        setLocation(`/results-preview/${data.orderId}`);
      } else {
        console.error('No orderId in response:', data);
        throw new Error('No order ID received');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, 
            #2D5A3D 0%, 
            #E85A4F 25%, 
            #F4A261 50%, 
            #A8DADC 75%, 
            #E76F51 100%);
          background-size: 300% 300%;
          animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .upload-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .preview-image {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .preview-image:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .heic-placeholder {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .analyze-btn {
          background: linear-gradient(135deg, #E85A4F 0%, #F4A261 100%);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(232, 90, 79, 0.3);
        }
        
        .analyze-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(232, 90, 79, 0.4);
        }
        
        .analyze-btn:disabled {
          background: #9CA3AF;
          box-shadow: none;
          cursor: not-allowed;
        }
      `}</style>

      <div className="min-h-screen gradient-bg relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full floating-element"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-white/10 rounded-full floating-element" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/10 rounded-full floating-element" style={{animationDelay: '4s'}}></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            <div className="upload-card rounded-3xl p-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Upload Your Photos
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Upload 3 clear photos for your personalized color analysis
              </p>

              {/* Upload Zone */}
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 mb-6 ${
                  isDragOver
                    ? 'border-[#E85A4F] bg-[#E85A4F]/5'
                    : files.length >= 3
                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-300 hover:border-[#E85A4F] hover:bg-[#E85A4F]/5'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadZoneClick}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#E85A4F] to-[#F4A261] rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {files.length >= 3 ? "All photos uploaded!" : "Click or drag photos here"}
                    </p>
                    <p className="text-sm text-gray-500">
                      JPEG, PNG, or HEIC • Max 10MB each • {files.length}/3 uploaded
                    </p>
                  </div>
                </div>
              </div>

              {/* File Input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.heic,.heif"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                className="hidden"
              />

              {/* Photo Previews */}
              {files.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 preview-image">
                        {preview === 'heic-placeholder' ? (
                          <div className="w-full h-full heic-placeholder rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>HEIC Photo</span>
                          </div>
                        ) : (
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={files.length !== 3}
                className="w-full analyze-btn text-white font-semibold py-4 px-8 rounded-xl text-lg disabled:opacity-50"
              >
                {files.length === 3 ? "Analyze My Colors" : `Upload ${3 - files.length} more photo${3 - files.length !== 1 ? 's' : ''}`}
              </button>
              
              {/* Debug Info */}
              <div className="mt-4 text-sm text-gray-500 text-center">
                Debug: {files.length} files uploaded, button {files.length === 3 ? 'enabled' : 'disabled'}
              </div>
            </div>

            {/* Tips */}
            <div className="upload-card rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Photo Tips for Best Results:</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#E85A4F] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Take photos in natural daylight near a window</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F4A261] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Ensure your face is clearly visible and well-lit</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#A8DADC] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Include different angles: front view, side profile, and natural expression</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
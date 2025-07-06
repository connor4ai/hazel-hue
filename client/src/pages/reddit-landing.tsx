import { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Upload, Camera, Star, Shield, Clock, Users, CheckCircle2, AlertCircle, X, Info, FileText, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { SEOHead } from '@/components/SEOHead';
import { Analytics } from '@/components/Analytics';
import { PerformanceOptimizer } from '@/components/PerformanceOptimizer';

export default function Homepage() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Identical file handling logic from upload page
  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type.toLowerCase())) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPEG, PNG, or HEIC images only.",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large", 
        description: "Please upload images smaller than 10MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFiles = (selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(validateFile);
    
    if (validFiles.length === 0) return;

    const newFiles = [...files];
    
    for (const file of validFiles) {
      if (newFiles.length >= 3) {
        toast({
          title: "Maximum files reached",
          description: "You can upload up to 3 photos for analysis.",
          variant: "destructive",
        });
        break;
      }
      newFiles.push(file);
    }
    
    setFiles(newFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast({
        title: "No photos selected",
        description: "Please upload at least one photo to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`image${index + 1}`, file);
      });

      const response = await apiRequest('POST', '/api/orders/guest', formData);
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const order = await response.json();
      setLocation(`/payment?orderId=${order.id}`);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your photos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1FAEE' }}>
      <SEOHead 
        title="AI Color Analysis - Discover Your Perfect Colors | Hazel & Hue"
        description="Upload your photos for professional AI color analysis. Get your personalized 12-season color palette, makeup recommendations, and styling guide in 30 seconds."
        path="/homepage"
      />
      <Analytics />
      <PerformanceOptimizer />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: '#E85A4F', top: '10%', left: '10%' }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-24 h-24 rounded-full opacity-20"
          style={{ backgroundColor: '#F4A261', top: '20%', right: '15%' }}
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full opacity-20"
          style={{ backgroundColor: '#A8DADC', bottom: '20%', left: '20%' }}
          animate={{
            y: [0, -10, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header with Navigation */}
      <header className="relative z-10 py-4 px-4" style={{ backgroundColor: '#2D5A3D' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif' 
            }}>
              Hazel & Hue
            </h1>
            
            {/* Navigation */}
            <nav className="flex space-x-4">
              <Button
                variant="ghost"
                onClick={() => setLocation('/about')}
                className="text-white hover:bg-white/10 text-sm"
              >
                <Info className="h-4 w-4 mr-1" />
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLocation('/terms')}
                className="text-white hover:bg-white/10 text-sm"
              >
                <FileText className="h-4 w-4 mr-1" />
                Terms
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLocation('/help')}
                className="text-white hover:bg-white/10 text-sm"
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                Help
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Minimalist */}
      <main className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: '#2D5A3D'
            }}>
              AI Color Analysis
            </h2>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: '#457B9D' }}>
              Upload your photos for professional color analysis. $29
            </p>
          </motion.div>

          {/* Upload Section - Identical to upload page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="overflow-hidden" style={{ border: '2px solid #A8DADC' }}>
              <CardHeader className="text-center" style={{ backgroundColor: '#F8F9FA' }}>
                <CardTitle className="text-2xl" style={{ color: '#2D5A3D' }}>
                  Upload Your Photos
                </CardTitle>
                <CardDescription className="text-lg">
                  Upload 1-3 clear photos for the most accurate analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Drag & Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drag & drop your photos here
                  </p>
                  <p className="text-gray-500 mb-4">or</p>
                  
                  <div className="space-y-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-white"
                      style={{ backgroundColor: '#E85A4F' }}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Photos
                    </Button>
                    
                    {/* Multiple file selection option */}
                    <div className="text-sm text-gray-500">
                      <Label htmlFor="multiple-file-input" className="cursor-pointer text-blue-600 hover:text-blue-700">
                        or select multiple photos at once
                      </Label>
                      <Input
                        id="multiple-file-input"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/heic,image/heif"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFiles(e.target.files)}
                      />
                    </div>
                  </div>
                  
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/heic,image/heif"
                    className="hidden"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                  
                  <p className="text-xs text-gray-400 mt-4">
                    Supports JPEG, PNG, HEIC • Max 10MB per file
                  </p>
                </div>

                {/* Selected Files */}
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6"
                  >
                    <h3 className="font-medium mb-3">Selected Photos ({files.length}/3)</h3>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                              <Camera className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                  <Button
                    onClick={handleSubmit}
                    disabled={files.length === 0 || isUploading}
                    className="w-full py-3 text-lg text-white"
                    style={{ backgroundColor: '#E85A4F' }}
                  >
                    {isUploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 mr-2" />
                        Continue to Payment - $29
                      </>
                    )}
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📸 Tips for Best Results:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use natural daylight (near a window)</li>
                    <li>• Include face, neck, and some hair</li>
                    <li>• Avoid heavy makeup or filters</li>
                    <li>• Include different angles if possible</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>


        </div>
      </main>

      {/* Footer - Simple */}
      <footer className="py-6 px-4 border-t" style={{ borderColor: '#A8DADC', backgroundColor: '#F8F9FA' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            © 2025 Hazel & Hue. All sales final.
          </p>
        </div>
      </footer>
    </div>
  );
}
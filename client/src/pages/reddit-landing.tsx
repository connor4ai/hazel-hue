import { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Upload, Camera, Star, Shield, Clock, Users, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { SEOHead } from '@/components/SEOHead';
import { Analytics } from '@/components/Analytics';
import { PerformanceOptimizer } from '@/components/PerformanceOptimizer';

export default function RedditLanding() {
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
        path="/reddit-landing"
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

      {/* Header */}
      <header className="relative z-10 py-6 px-4" style={{ backgroundColor: '#2D5A3D' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ 
            fontFamily: 'Playfair Display, Georgia, serif' 
          }}>
            Hazel & Hue
          </h1>
          <p className="text-white/80 text-lg">AI-Powered Personal Color Analysis</p>
        </div>
      </header>

      {/* Reddit Policy Compliance Section */}
      <section className="py-8 px-4 border-b-2" style={{ borderColor: '#A8DADC' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E85A4F' }}>
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Privacy Protected</h3>
              <p className="text-sm text-gray-600">Your photos are processed securely and never stored permanently</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F4A261' }}>
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Guaranteed Results</h3>
              <p className="text-sm text-gray-600">Professional color analysis or full refund - no questions asked</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A8DADC' }}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#2D5A3D' }}>Trusted by Thousands</h3>
              <p className="text-sm text-gray-600">Over 10,000 satisfied customers have discovered their perfect colors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
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
              Discover Your Perfect Colors
            </h2>
            <p className="text-xl mb-8 leading-relaxed max-w-3xl mx-auto" style={{ color: '#457B9D' }}>
              Upload your photos and get professional AI color analysis in 30 seconds. 
              Receive your personalized 12-season color palette with makeup recommendations and styling guide.
            </p>

            {/* Value Proposition */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-3 shadow-sm">
                <Clock className="h-5 w-5" style={{ color: '#E85A4F' }} />
                <span className="text-sm font-medium">30 Second Results</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-3 shadow-sm">
                <Star className="h-5 w-5" style={{ color: '#F4A261' }} />
                <span className="text-sm font-medium">64 Personal Colors</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-3 shadow-sm">
                <Camera className="h-5 w-5" style={{ color: '#A8DADC' }} />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-3 shadow-sm">
                <CheckCircle2 className="h-5 w-5" style={{ color: '#2D5A3D' }} />
                <span className="text-sm font-medium">$29 Only</span>
              </div>
            </div>
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

          {/* Additional Reddit Compliance Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Card style={{ border: '2px solid #A8DADC' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#2D5A3D' }}>
                  What You'll Receive
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#E85A4F' }}>
                      🎨 Your Personal Color Palette
                    </h4>
                    <ul className="text-sm text-gray-600 text-left space-y-1">
                      <li>• 64 curated colors for your season</li>
                      <li>• Click-to-copy hex codes</li>
                      <li>• Signature colors highlighted</li>
                      <li>• Colors to avoid guidance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#F4A261' }}>
                      💄 Makeup & Style Guide
                    </h4>
                    <ul className="text-sm text-gray-600 text-left space-y-1">
                      <li>• Interactive makeup swatches</li>
                      <li>• Foundation shade recommendations</li>
                      <li>• Hair color guidance</li>
                      <li>• Jewelry and metal suggestions</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4" style={{ backgroundColor: '#F8F9FA' }} className="rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Satisfaction Guarantee:</strong> Not happy with your results? 
                    Contact us within 30 days for a full refund. Your privacy is protected - 
                    photos are processed securely and deleted after analysis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer for Compliance */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: '#A8DADC', backgroundColor: '#F8F9FA' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600 mb-4">
            Hazel & Hue - Professional AI Color Analysis Platform
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <span>Privacy Protected</span>
            <span>•</span>
            <span>Secure Processing</span>
            <span>•</span>
            <span>Money-Back Guarantee</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
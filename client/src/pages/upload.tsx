import { useState, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Camera, Upload, CheckCircle, X } from "lucide-react";
import UploadZone from "@/components/upload-zone";

export default function UploadPage() {
  const { orderId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  const handleFileSelect = (index: number, file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload only JPEG or PNG files",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    const newFiles = [...uploadedFiles];
    newFiles[index] = file;
    setUploadedFiles(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles[index] = null;
    setUploadedFiles(newFiles);
    
    // Clear the file input
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = '';
    }
  };

  const triggerFileUpload = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const allFilesUploaded = uploadedFiles.every(file => file !== null);

  const handleSubmit = async () => {
    if (!allFilesUploaded) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file, index) => {
        if (file) {
          formData.append('images', file);
        }
      });

      await apiRequest("POST", `/api/upload-images/${orderId}`, formData);
      
      toast({
        title: "Upload Successful",
        description: "Your photos have been uploaded. Starting analysis...",
      });

      setLocation(`/analysis/${orderId}`);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadInstructions = [
    {
      title: "Natural Light",
      description: "Selfie in daylight",
      icon: <Camera className="h-8 w-8 text-sage" />
    },
    {
      title: "Indoor Light", 
      description: "Selfie indoors",
      icon: <Camera className="h-8 w-8 text-sage" />
    },
    {
      title: "Soft Light",
      description: "Selfie in gentle light", 
      icon: <Camera className="h-8 w-8 text-sage" />
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
              Upload Your Photos
            </CardTitle>
            <p className="text-lg text-warm-gray">
              Upload 3 clear selfies for your personalized color analysis
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {uploadInstructions.map((instruction, index) => (
                <div key={index} className="relative">
                  <UploadZone
                    onFileSelect={(file) => handleFileSelect(index, file)}
                    onUploadClick={() => triggerFileUpload(index)}
                    file={uploadedFiles[index]}
                    instruction={instruction}
                    className="h-64"
                  />
                  
                  {uploadedFiles[index] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <input
                    ref={(el) => fileInputRefs.current[index] = el}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(index, file);
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                disabled={!allFilesUploaded || isSubmitting}
                className={`px-8 py-4 rounded-full font-semibold text-lg h-auto ${
                  allFilesUploaded 
                    ? 'bg-terracotta hover:bg-terracotta/90 text-white' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Upload className="h-5 w-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : allFilesUploaded ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Analyze My Colors
                  </>
                ) : (
                  'Upload All 3 Photos to Continue'
                )}
              </Button>
            </div>
            
            <div className="mt-6 text-center text-sm text-warm-gray">
              <p>• Photos should be clear and well-lit</p>
              <p>• Remove makeup for best results</p>
              <p>• Maximum file size: 10MB per photo</p>
              <p>• Supported formats: JPEG, PNG</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, Palette, FileText, Sparkles, Upload } from 'lucide-react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AnalysisStep {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function Loading() {
  const [, setLocation] = useLocation();
  const [jobId, setJobId] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('queued');
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const [photosUploaded, setPhotosUploaded] = useState(false);
  const { toast } = useToast();
  
  const [steps, setSteps] = useState<AnalysisStep[]>([
    {
      id: 'uploading',
      label: 'Uploading Your Photos',
      description: 'Securely transferring your photos to our analysis system',
      icon: <Upload className="h-5 w-5" />,
      completed: false
    },
    {
      id: 'analyzing',
      label: 'Analyzing Your Photos',
      description: 'Our AI is examining your skin tone, hair color, and eye color',
      icon: <Eye className="h-5 w-5" />,
      completed: false
    },
    {
      id: 'determining',
      label: 'Determining Your Season',
      description: 'Identifying your unique color profile from 16 possible seasons',
      icon: <Palette className="h-5 w-5" />,
      completed: false
    },
    {
      id: 'generating',
      label: 'Generating Your Report',
      description: 'Preparing your personalized PDF with all recommendations',
      icon: <FileText className="h-5 w-5" />,
      completed: false
    }
  ]);

  // Get job ID from session and upload photos
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (!sessionId) {
      toast({
        title: "Error",
        description: "No session found. Please try again.",
        variant: "destructive",
      });
      setLocation('/upload');
      return;
    }

    const initializeJob = async () => {
      try {
        // Get job ID from session
        const jobResponse = await apiRequest("GET", `/api/session/${sessionId}/job`);
        const jobData = await jobResponse.json();
        setJobId(jobData.jobId);

        // Upload photos
        await uploadPhotos(jobData.jobId);
      } catch (error: any) {
        console.error('Error initializing job:', error);
        toast({
          title: "Error",
          description: "Failed to initialize analysis. Please try again.",
          variant: "destructive",
        });
        setLocation('/upload');
      }
    };

    initializeJob();
  }, []);

  const uploadPhotos = async (jobId: number) => {
    try {
      setIsUploadingPhotos(true);
      
      // Get photos from session storage
      const storedPhotos = sessionStorage.getItem('pendingPhotos');
      if (!storedPhotos) {
        throw new Error('No photos found');
      }

      const photoData = JSON.parse(storedPhotos);
      const formData = new FormData();

      // Convert base64 back to files
      for (const photo of photoData) {
        const response = await fetch(photo.data);
        const blob = await response.blob();
        const file = new File([blob], photo.name, { type: photo.type });
        formData.append('photos', file);
      }

      const uploadResponse = await apiRequest("PUT", `/api/job/${jobId}/photos`, formData);
      
      if (uploadResponse.ok) {
        setPhotosUploaded(true);
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          completed: index === 0
        })));
        
        // Clear photos from session storage
        sessionStorage.removeItem('pendingPhotos');
        
        // Start polling for status
        startStatusPolling(jobId);
      }
    } catch (error: any) {
      console.error('Error uploading photos:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload photos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingPhotos(false);
    }
  };

  const startStatusPolling = (jobId: number) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await apiRequest("GET", `/api/job/${jobId}/status`);
        const data = await response.json();
        
        setStatus(data.status);
        
        // Update steps based on status
        if (data.status === 'processing') {
          setSteps(prev => prev.map((step, index) => ({
            ...step,
            completed: index <= 1
          })));
        } else if (data.status === 'done') {
          setSteps(prev => prev.map(step => ({
            ...step,
            completed: true
          })));
          
          clearInterval(pollInterval);
          
          // Navigate to results
          setTimeout(() => {
            setLocation(`/results?jobId=${jobId}`);
          }, 2000);
        } else if (data.status === 'failed') {
          clearInterval(pollInterval);
          toast({
            title: "Analysis Failed",
            description: "Something went wrong with your analysis. Please contact support.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error polling status:', error);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  };

  const getStatusMessage = () => {
    if (isUploadingPhotos) return "Uploading your photos...";
    if (status === 'queued') return "Setting up your analysis...";
    if (status === 'files_uploaded') return "Photos uploaded successfully!";
    if (status === 'processing') return "Analyzing your colors—this usually takes <2 min";
    if (status === 'done') return "Your colors have arrived!";
    return "Processing...";
  };

  return (
    <div className="min-h-screen bg-[#FAF4EE] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Loader2 className="h-16 w-16 animate-spin mx-auto text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discovering Your Perfect Colors
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {getStatusMessage()}
          </p>
          {jobId && (
            <p className="text-sm text-gray-500">
              Job ID: {jobId}
            </p>
          )}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step.completed 
                      ? 'bg-green-100 text-green-600' 
                      : index === 0 && isUploadingPhotos
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.completed ? (
                      <Sparkles className="h-5 w-5" />
                    ) : index === 0 && isUploadingPhotos ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-semibold ${
                        step.completed ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {step.label}
                      </h3>
                      {step.completed && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Complete
                        </Badge>
                      )}
                      {index === 0 && isUploadingPhotos && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            Please keep this page open while we work our magic ✨
          </p>
        </div>
      </div>
    </div>
  );
}
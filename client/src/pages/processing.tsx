import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Camera, 
  Palette, 
  Brain,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface AnalysisStep {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function Processing() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [orderId] = useState(params.orderId);

  const steps: AnalysisStep[] = [
    {
      id: 'upload',
      label: 'Processing Photos',
      description: 'Analyzing image quality and preparing for color analysis',
      icon: <Camera className="w-6 h-6" />,
      completed: false
    },
    {
      id: 'analysis',
      label: 'AI Color Analysis',
      description: 'Our advanced AI is determining your optimal color palette',
      icon: <Brain className="w-6 h-6" />,
      completed: false
    },
    {
      id: 'palette',
      label: 'Creating Your Palette',
      description: 'Generating personalized color recommendations',
      icon: <Palette className="w-6 h-6" />,
      completed: false
    },
    {
      id: 'report',
      label: 'Finalizing Report',
      description: 'Preparing your comprehensive color analysis report',
      icon: <Sparkles className="w-6 h-6" />,
      completed: false
    }
  ];

  const [analysisSteps, setAnalysisSteps] = useState(steps);

  useEffect(() => {
    if (!orderId) {
      setLocation('/');
      return;
    }

    // Start polling for analysis status
    const pollInterval = setInterval(checkAnalysisStatus, 2000);
    
    // Simulate progress steps
    simulateProgress();

    return () => clearInterval(pollInterval);
  }, [orderId]);

  const simulateProgress = () => {
    // Step 1: Processing Photos (0-25%)
    setTimeout(() => {
      setProgress(25);
      setCurrentStep(1);
      setAnalysisSteps(prev => prev.map((step, idx) => 
        idx === 0 ? { ...step, completed: true } : step
      ));
    }, 2000);

    // Step 2: AI Analysis (25-60%)
    setTimeout(() => {
      setProgress(60);
      setCurrentStep(2);
      setAnalysisSteps(prev => prev.map((step, idx) => 
        idx === 1 ? { ...step, completed: true } : step
      ));
    }, 8000);

    // Step 3: Creating Palette (60-85%)
    setTimeout(() => {
      setProgress(85);
      setCurrentStep(3);
      setAnalysisSteps(prev => prev.map((step, idx) => 
        idx === 2 ? { ...step, completed: true } : step
      ));
    }, 15000);

    // Step 4: Finalizing (85-100%)
    setTimeout(() => {
      setProgress(100);
      setCurrentStep(4);
      setAnalysisSteps(prev => prev.map((step, idx) => 
        idx === 3 ? { ...step, completed: true } : step
      ));
    }, 20000);
  };

  const checkAnalysisStatus = async () => {
    try {
      const response = await apiRequest('GET', `/api/orders/${orderId}/status`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.status === 'completed' && data.result) {
          setAnalysisComplete(true);
          setProgress(100);
          
          // Smooth transition to results
          setTimeout(() => {
            setLocation(`/results/${orderId}`);
          }, 2000);
        } else if (data.status === 'failed') {
          toast({
            title: "Analysis Failed",
            description: "There was an issue processing your photos. Please contact support.",
            variant: "destructive",
          });
          setLocation('/');
        }
      }
    } catch (error) {
      console.error('Error checking analysis status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-warm-gray-dark mb-4">
            Analyzing Your Colors
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Our AI is working hard to determine your perfect color palette. This usually takes 2-5 minutes.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Progress Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-warm-gray">Analysis Progress</span>
                  <span className="font-semibold text-warm-gray-dark">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full h-3" />
                
                {!analysisComplete ? (
                  <div className="flex items-center justify-center space-x-2 text-warm-gray">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing in progress...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Analysis complete! Preparing your results...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Steps */}
          <div className="space-y-4">
            {analysisSteps.map((step, index) => (
              <Card key={step.id} className={`transition-all duration-500 ${
                index === currentStep ? 'ring-2 ring-terracotta shadow-lg' : ''
              } ${step.completed ? 'bg-green-50 border-green-200' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : index === currentStep 
                        ? 'bg-terracotta text-white animate-pulse' 
                        : 'bg-warm-gray-light text-warm-gray'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : index === currentStep ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        step.completed ? 'text-green-800' : 'text-warm-gray-dark'
                      }`}>
                        {step.label}
                      </h3>
                      <p className={`text-sm ${
                        step.completed ? 'text-green-600' : 'text-warm-gray'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fun Facts */}
          <Card className="bg-gradient-to-r from-terracotta/10 to-marigold/10">
            <CardContent className="p-6">
              <h3 className="font-semibold text-warm-gray-dark mb-3">
                Did you know?
              </h3>
              <div className="space-y-2 text-sm text-warm-gray">
                <p>• Personal color analysis was first developed in the 1980s</p>
                <p>• The right colors can make you look up to 10 years younger</p>
                <p>• There are 16 different seasonal color types</p>
                <p>• Wearing your perfect colors enhances your natural radiance</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
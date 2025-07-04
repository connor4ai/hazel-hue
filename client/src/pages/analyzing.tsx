import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export default function AnalyzingPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Starting your analysis...");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    // Get order ID from session storage
    const storedOrderId = sessionStorage.getItem('currentOrderId');
    if (!storedOrderId) {
      // If no order ID, redirect back to upload
      setLocation('/upload');
      return;
    }
    setOrderId(storedOrderId);

    // Start checking analysis status
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/orders/${storedOrderId}/status`);
        if (response.ok) {
          const data = await response.json();
          
          // Update progress based on status
          switch (data.status) {
            case 'queued':
              setProgress(25);
              setStatusMessage("Your photos are in the analysis queue...");
              break;
            case 'files_uploaded':
              setProgress(50);
              setStatusMessage("Photos uploaded! Starting AI analysis...");
              break;
            case 'processing':
              setProgress(75);
              setStatusMessage("AI is analyzing your colors...");
              setShowColors(true);
              break;
            case 'analyzed':
            case 'completed':
              setProgress(100);
              setStatusMessage("Analysis complete! Preparing your results...");
              setShowColors(true);
              // Always redirect to results-preview for payment/unlock step
              setTimeout(() => {
                setLocation(`/results-preview/${storedOrderId}`);
              }, 1500);
              return;
            case 'failed':
              toast({
                title: "Analysis Failed",
                description: "There was an issue processing your photos. Please try again.",
                variant: "destructive",
              });
              setLocation('/upload');
              return;
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    // Check status immediately and then every 3 seconds
    checkStatus();
    const interval = setInterval(checkStatus, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [setLocation, toast]);

  return (
    <>
      <style>{`
        /* Dark theme for loading page */
        .loading-page {
          background: #0A0A0A;
          color: #FAFAFA;
        }

        /* Animated color waves background */
        .color-waves {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .wave {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            #9333EA,
            #EC4899,
            #3B82F6,
            #10B981,
            #F59E0B,
            #EF4444,
            #9333EA
          );
          animation: rotate 20s linear infinite;
          opacity: 0.03;
          filter: blur(100px);
        }

        .wave:nth-child(2) {
          animation-duration: 30s;
          animation-direction: reverse;
          opacity: 0.02;
        }

        .wave:nth-child(3) {
          animation-duration: 40s;
          opacity: 0.02;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Color Wheel Icon Animation */
        .ai-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto 3rem;
          position: relative;
        }

        .color-wheel {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #9333EA 0deg,
            #EC4899 60deg,
            #3B82F6 120deg,
            #10B981 180deg,
            #F59E0B 240deg,
            #EF4444 300deg,
            #9333EA 360deg
          );
          animation: spin 3s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .color-wheel::before {
          content: '';
          width: 70%;
          height: 70%;
          background: #0A0A0A;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .inner-icon {
          position: absolute;
          width: 40px;
          height: 40px;
          color: white;
          z-index: 2;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }



        /* Gradient text animation */
        .gradient-text {
          background: linear-gradient(
            135deg,
            #9333EA 0%,
            #EC4899 25%,
            #3B82F6 50%,
            #10B981 75%,
            #9333EA 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 4s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Loading message styling */
        .loading-message {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
          min-height: 1.5em;
          transition: opacity 0.5s ease;
        }

        /* Progress bar styling */
        .progress-container {
          width: 100%;
          max-width: 300px;
          margin: 0 auto 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #9333EA, #EC4899, #3B82F6);
          background-size: 200% 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
          animation: shimmer 2s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .progress-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.5rem;
        }

        /* Color preview orbs */
        .color-preview {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }

        .color-preview.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .color-orb {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          animation: pop-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards;
        }

        .color-orb:nth-child(1) { animation-delay: 0.1s; }
        .color-orb:nth-child(2) { animation-delay: 0.2s; }
        .color-orb:nth-child(3) { animation-delay: 0.3s; }
        .color-orb:nth-child(4) { animation-delay: 0.4s; }
        .color-orb:nth-child(5) { animation-delay: 0.5s; }

        @keyframes pop-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Info text styling */
        .info-text {
          margin-top: 3rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .analysis-id {
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 1rem;
        }

        /* Floating particles */
        @keyframes float-up {
          from {
            opacity: 0;
            transform: translateY(100vh) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(10vh) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
        }

        .particle {
          position: fixed;
          pointer-events: none;
          opacity: 0;
          z-index: 2;
          border-radius: 50%;
          animation: float-up 15s linear;
        }
      `}</style>

      <div className="loading-page min-h-screen flex items-center justify-center relative">
        {/* Animated color waves background */}
        <div className="color-waves">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-lg mx-auto px-6">
          {/* Color Wheel Icon */}
          <div className="ai-icon">
            <div className="color-wheel">
              <svg className="inner-icon" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3"/>
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="19" r="2"/>
                <circle cx="5" cy="12" r="2"/>
                <circle cx="19" cy="12" r="2"/>
                <path d="M12 12L8 8"/>
                <path d="M12 12L16 8"/>
                <path d="M12 12L8 16"/>
                <path d="M12 12L16 16"/>
              </svg>
            </div>
          </div>

          {/* Main title */}
          <h1 className="gradient-text text-4xl font-bold mb-4">
            Discovering Your Perfect Colors
          </h1>

          {/* Status message */}
          <p className="loading-message">
            {statusMessage}
          </p>

          {/* Progress bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">{progress}% complete</div>
          </div>

          {/* Color preview orbs */}
          <div className={`color-preview ${showColors ? 'visible' : ''}`}>
            <div className="color-orb" style={{ background: '#9333EA' }}></div>
            <div className="color-orb" style={{ background: '#EC4899' }}></div>
            <div className="color-orb" style={{ background: '#3B82F6' }}></div>
            <div className="color-orb" style={{ background: '#10B981' }}></div>
            <div className="color-orb" style={{ background: '#F59E0B' }}></div>
          </div>

          {/* Info text */}
          <div className="info-text">
            <p>Your photos are being analyzed using advanced AI technology</p>
            <p>This usually takes 30-60 seconds</p>
          </div>

          {/* Order ID */}
          {orderId && (
            <div className="analysis-id">
              Analysis ID: {orderId}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
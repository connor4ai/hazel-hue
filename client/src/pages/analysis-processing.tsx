import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const AnalysisProcessing = () => {
  const [, setLocation] = useLocation();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Get order ID from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdFromUrl = urlParams.get('orderId');
    const orderIdFromStorage = localStorage.getItem('orderId');
    const currentOrderId = orderIdFromUrl || orderIdFromStorage;
    
    if (currentOrderId) {
      setOrderId(currentOrderId);
      
      // Poll for completion every 2 seconds
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`/api/orders/${currentOrderId}/status`);
          const data = await response.json();
          
          if (data.status === 'completed' && data.hasAnalysis) {
            clearInterval(pollInterval);
            setLocation(`/results/${currentOrderId}`);
          }
        } catch (error) {
          console.error('Error checking analysis status:', error);
        }
      }, 2000);

      return () => clearInterval(pollInterval);
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage/20 to-dusty-rose/30">
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-coral/30 to-golden/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 -right-4 w-96 h-96 bg-gradient-to-br from-sage/40 to-dusty-rose/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-gradient-to-br from-golden/30 to-coral/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Colorful Spinning Wheel */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer Ring */}
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-transparent bg-gradient-to-r from-coral via-golden to-sage bg-clip-border"
            style={{
              background: 'conic-gradient(from 0deg, #E85A4F, #F4A261, #A8DADC, #E76F51, #2D5A3D, #E85A4F)',
              maskImage: 'radial-gradient(circle, transparent 40%, black 40%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 40%)'
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner Spinning Elements */}
          <motion.div
            className="absolute inset-0 w-24 h-24 rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#E85A4F', '#F4A261', '#A8DADC', '#E76F51', '#2D5A3D', '#F1FAEE', '#E85A4F', '#F4A261'][i],
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${i * 45}deg) translateX(35px) translateY(-4px)`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg text-forest font-medium tracking-wide">
            Finalizing Your Analysis...
          </p>
        </motion.div>

        {/* Subtle pulsing dots */}
        <motion.div
          className="flex space-x-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-forest/60 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnalysisProcessing;
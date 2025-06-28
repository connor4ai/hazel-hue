import { motion } from 'framer-motion';
import { useState } from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  index: number;
}

export const MobileOptimizedColorSwatch = ({ color, name, index }: ColorSwatchProps) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      className="group cursor-pointer relative"
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
        {/* Color Square */}
        <div 
          className="h-12 sm:h-16 md:h-20 w-full relative"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
        </div>
        
        {/* Text Content */}
        <div className="p-1 sm:p-2 text-center">
          {/* Color Name - Highly optimized for mobile */}
          <p className="text-[8px] sm:text-[9px] md:text-xs font-semibold text-gray-800 mb-0.5 uppercase tracking-tight leading-none truncate px-0.5">
            {name}
          </p>
          
          {/* Hex Code - Ultra compact for mobile */}
          <p className="text-[7px] sm:text-[8px] md:text-[10px] font-mono text-gray-500 leading-none">
            {color}
          </p>
        </div>
        
        {/* Copied Indicator */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
          >
            Copied!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
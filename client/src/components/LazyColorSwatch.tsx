import React, { memo, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LazyColorSwatchProps {
  color: {
    hex: string;
    name: string;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const LazyColorSwatch = memo(({ 
  color, 
  className = '', 
  size = 'md',
  showTooltip = true 
}: LazyColorSwatchProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const { toast } = useToast();

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1000);
      
      if (toast) {
        toast({
          title: "Color copied!",
          description: `${color.name} (${color.hex}) copied to clipboard`,
          duration: 2000,
        });
      }
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  }, [color.hex, color.name, toast]);

  return (
    <div className="group relative">
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          border-2 border-gray-200 
          shadow-sm 
          cursor-pointer 
          transition-all duration-200 
          hover:scale-110 
          hover:shadow-md
          ${className}
        `}
        style={{ backgroundColor: color.hex }}
        onClick={copyToClipboard}
        title={showTooltip ? `${color.name} - ${color.hex}` : undefined}
      />
      
      {showCopied && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
          Copied!
        </div>
      )}
      
      {showTooltip && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
          <div className="text-center">
            <div className="font-medium">{color.name}</div>
            <div className="opacity-75">{color.hex}</div>
          </div>
        </div>
      )}
    </div>
  );
});

LazyColorSwatch.displayName = 'LazyColorSwatch';

export default LazyColorSwatch;
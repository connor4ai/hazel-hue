import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BrightWinterPalette = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 1000);
  };

  const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
    <motion.div
      className="relative group cursor-pointer"
      onClick={() => handleCopyColor(color)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-md border-2 border-white hover:border-gray-300 transition-all duration-200"
        style={{ backgroundColor: color }}
      />
      <div className="text-center mt-1">
        <p className="text-xs text-gray-600 font-mono">{color}</p>
        <p className="text-xs text-gray-700 font-medium">{name}</p>
      </div>
      
      {copied === color && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
        >
          Copied!
        </motion.div>
      )}
    </motion.div>
  );

  const coreNeutrals = [
    { color: '#FFFFFF', name: 'Pure White' },
    { color: '#8B9B8B', name: 'Cool Grey' },
    { color: '#2F4F4F', name: 'Dark Grey' },
    { color: '#696969', name: 'Dim Grey' },
    { color: '#000000', name: 'True Black' },
    { color: '#F5F5DC', name: 'Cream' }
  ];

  const accentLights = [
    { color: '#FFD700', name: 'Bright Yellow' },
    { color: '#FFFF00', name: 'Pure Yellow' },
    { color: '#20B2AA', name: 'Light Sea Green' },
    { color: '#00CED1', name: 'Dark Turquoise' },
    { color: '#C4577A', name: 'Rose' },
    { color: '#E6004C', name: 'Bright Pink' }
  ];

  const accentBrights = [
    { color: '#FF1493', name: 'Deep Pink' },
    { color: '#FF00FF', name: 'Fuchsia' },
    { color: '#8B2F8B', name: 'Magenta' },
    { color: '#8B008B', name: 'Dark Magenta' },
    { color: '#4169E1', name: 'Royal Blue' },
    { color: '#0000FF', name: 'True Blue' },
    { color: '#191970', name: 'Midnight Blue' },
    { color: '#00A651', name: 'Kelly Green' },
    { color: '#228B22', name: 'Forest Green' },
    { color: '#008B8B', name: 'Teal' },
    { color: '#DC143C', name: 'Crimson' },
    { color: '#8B4513', name: 'Saddle Brown' }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Complete Color Palette</h3>
        <p className="text-gray-600">64 colors perfectly suited for your Bright Winter coloring</p>
      </div>

      <div className="space-y-8">
        {/* Core Neutrals */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Core Neutrals</h4>
          <p className="text-sm text-gray-600 mb-4">Foundation colors for your wardrobe - use these as your base pieces</p>
          <div className="grid grid-cols-6 gap-4">
            {coreNeutrals.map((swatch, index) => (
              <ColorSwatch key={index} color={swatch.color} name={swatch.name} />
            ))}
          </div>
        </div>

        {/* Accent Lights */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Accent Lights</h4>
          <p className="text-sm text-gray-600 mb-4">Electric highlights and bright accents for impact</p>
          <div className="grid grid-cols-6 gap-4">
            {accentLights.map((swatch, index) => (
              <ColorSwatch key={index} color={swatch.color} name={swatch.name} />
            ))}
          </div>
        </div>

        {/* Accent Brights */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Accent Brights</h4>
          <p className="text-sm text-gray-600 mb-4">Bold statement colors that showcase your dramatic coloring</p>
          <div className="grid grid-cols-6 gap-4">
            {accentBrights.map((swatch, index) => (
              <ColorSwatch key={index} color={swatch.color} name={swatch.name} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">💡</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Pro Tip</p>
            <p className="text-xs text-gray-600">Click any color to copy its hex code for shopping and styling reference</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrightWinterPalette;
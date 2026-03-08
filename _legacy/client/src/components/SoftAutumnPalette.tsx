import { motion } from 'framer-motion';
import { MobileOptimizedColorSwatch } from './MobileOptimizedColorSwatch';

const SoftAutumnPalette = () => {
  // Complete 64-color Soft Autumn palette extracted from HTML
  const colors = [
    // Row 1 - Warm Neutrals
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Khaki', code: '#F0E68C' },
    { name: 'Tan', code: '#D2B48C' },
    { name: 'Mushroom', code: '#DDD0C0' },
    { name: 'Camel', code: '#BC9A6A' },
    { name: 'Taupe', code: '#8B7765' },
    { name: 'Slate Grey', code: '#708090' },
    { name: 'Warm Grey', code: '#696969' },
    
    // Row 2 - Muted Yellows and Oranges
    { name: 'Wheat', code: '#F5DEB3' },
    { name: 'Soft Mustard', code: '#DAA520' },
    { name: 'Brass', code: '#B8860B' },
    { name: 'Soft Orange', code: '#CD853F' },
    { name: 'Burlywood', code: '#DEB887' },
    { name: 'Cocoa', code: '#D2691E' },
    { name: 'Sienna', code: '#A0522D' },
    { name: 'Saddle Brown', code: '#8B4513' },
    
    // Row 3 - Soft Reds and Roses
    { name: 'Peach', code: '#F0B27A' },
    { name: 'Dusty Rose', code: '#E8B4CB' },
    { name: 'Mauve', code: '#D2B4DE' },
    { name: 'Rosy Brown', code: '#BC8F8F' },
    { name: 'Indian Red', code: '#CD5C5C' },
    { name: 'Soft Rust', code: '#A0522D' },
    { name: 'Rosewood', code: '#8B4C5C' },
    { name: 'Soft Brick', code: '#9B4444' },
    
    // Row 4 - Greens
    { name: 'Sage Green', code: '#9CAF88' },
    { name: 'Sea Green', code: '#8FBC8F' },
    { name: 'Olive Drab', code: '#6B8E23' },
    { name: 'Light Khaki', code: '#BDB76B' },
    { name: 'Olive', code: '#808000' },
    { name: 'Dark Olive', code: '#556B2F' },
    { name: 'Forest Green', code: '#228B22' },
    { name: 'Hunter Green', code: '#355E3B' },
    
    // Row 5 - Blues and Teals
    { name: 'Light Sea Green', code: '#20B2AA' },
    { name: 'Cadet Blue', code: '#5F9EA0' },
    { name: 'Teal', code: '#008080' },
    { name: 'Steel Blue', code: '#4682B4' },
    { name: 'Cornflower', code: '#6495ED' },
    { name: 'Light Slate Gray', code: '#778899' },
    { name: 'Slate Gray', code: '#708090' },
    { name: 'Dim Gray', code: '#696969' },
    
    // Row 6 - Purples and Additional Muted Tones
    { name: 'Thistle', code: '#D8BFD8' },
    { name: 'Plum', code: '#DDA0DD' },
    { name: 'Medium Orchid', code: '#BA55D3' },
    { name: 'Dark Orchid', code: '#9932CC' },
    { name: 'Purple', code: '#800080' },
    { name: 'Indigo', code: '#4B0082' },
    { name: 'Dark Slate Blue', code: '#483D8B' },
    { name: 'Slate Blue', code: '#6A5ACD' },
    
    // Row 7 - Additional Earth Tones
    { name: 'Bisque', code: '#FFE4C4' },
    { name: 'Moccasin', code: '#FFE4B5' },
    { name: 'Navajo White', code: '#FFDEAD' },
    { name: 'Blanched Almond', code: '#FFEBCD' },
    { name: 'Papaya Whip', code: '#FFEFD5' },
    { name: 'Peach Puff', code: '#FFDAB9' },
    { name: 'Sandy Brown', code: '#F4A460' },
    { name: 'Peru', code: '#CD853F' },
    
    // Row 8 - Final Muted Colors
    { name: 'Pale Goldenrod', code: '#EEE8AA' },
    { name: 'Dark Khaki', code: '#BDB76B' },
    { name: 'Goldenrod', code: '#DAA520' },
    { name: 'Dark Goldenrod', code: '#B8860B' },
    { name: 'Chocolate', code: '#D2691E' },
    { name: 'Saddle Brown', code: '#8B4513' },
    { name: 'Maroon', code: '#800000' },
    { name: 'Dark Red', code: '#8B0000' }
  ];

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-amber-100 via-stone-200 to-rose-100 rounded-3xl p-8 border border-amber-300"
      style={{
        background: 'linear-gradient(135deg, #8B7765 0%, #6B5B73 100%)',
        border: '1px solid rgba(139, 119, 101, 0.3)'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-white mb-4">Your Soft Autumn Palette</h3>
        <p className="text-stone-200 max-w-2xl mx-auto leading-relaxed">
          64 gentle, muted colors with warm undertones that create sophisticated harmony. 
          These soft, understated hues perfectly complement your naturally graceful and elegant presence.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
        {colors.map((color, index) => (
          <MobileOptimizedColorSwatch 
            key={index} 
            color={color.code} 
            name={color.name} 
            index={index}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="bg-white rounded-2xl p-6 border border-amber-300">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-800">Styling Tip:</strong> Your harmonious Soft Autumn palette works best with 
            tonal dressing and muted combinations. Use taupe and mushroom as your primary neutrals - they provide the 
            perfect warm backdrop for your gentle, sophisticated presence and create beautiful monochromatic looks.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SoftAutumnPalette;
import { motion } from 'framer-motion';

const LightSpringPalette = () => {
  // Complete 64-color Light Spring palette extracted from HTML
  const colors = [
    // Row 1
    { name: 'Warm White', code: '#FFFEF7' },
    { name: 'Light Taupe', code: '#C8C8B8' },
    { name: 'Mushroom', code: '#8B7D6B' },
    { name: 'Khaki', code: '#F0E68C' },
    { name: 'Light Coral', code: '#FF9999' },
    { name: 'Light Pink', code: '#FFB6C1' },
    { name: 'Light Green', code: '#90EE90' },
    { name: 'Sky Blue', code: '#87CEEB' },
    
    // Row 2
    { name: 'Cornsilk', code: '#FFF8DC' },
    { name: 'Sage Grey', code: '#A0A090' },
    { name: 'Tan', code: '#D2B48C' },
    { name: 'Moccasin', code: '#FFE4B5' },
    { name: 'Light Salmon', code: '#FFA07A' },
    { name: 'Pink', code: '#FF91A4' },
    { name: 'Pale Green', code: '#98FB98' },
    { name: 'Light Blue', code: '#ADD8E6' },
    
    // Row 3
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Dim Grey', code: '#696969' },
    { name: 'Taupe', code: '#8B7D6B' },
    { name: 'Wheat', code: '#F5DEB3' },
    { name: 'Light Pink', code: '#FFB6C1' },
    { name: 'Hot Pink', code: '#FF69B4' },
    { name: 'Lime Green', code: '#32CD32' },
    { name: 'Light Sky Blue', code: '#87CEFA' },
    
    // Row 4
    { name: 'Cream', code: '#FFFDD0' },
    { name: 'Light Brown', code: '#CD853F' },
    { name: 'Peach', code: '#FFCBA4' },
    { name: 'Gold', code: '#FFD700' },
    { name: 'Coral', code: '#FF7F50' },
    { name: 'Rose', code: '#FF91A4' },
    { name: 'Mint', code: '#98FB98' },
    { name: 'Powder Blue', code: '#B0E0E6' },
    
    // Row 5
    { name: 'Ivory', code: '#FFFFF0' },
    { name: 'Camel', code: '#C19A6B' },
    { name: 'Apricot', code: '#FBCEB1' },
    { name: 'Light Yellow', code: '#FFFFE0' },
    { name: 'Salmon', code: '#FA8072' },
    { name: 'Blush', code: '#DE5D83' },
    { name: 'Sea Green', code: '#2E8B57' },
    { name: 'Baby Blue', code: '#89CFF0' },
    
    // Row 6
    { name: 'Pearl', code: '#F8F6F0' },
    { name: 'Mushroom', code: '#8B7D6B' },
    { name: 'Champagne', code: '#F7E7CE' },
    { name: 'Butter', code: '#FFFACD' },
    { name: 'Peach Pink', code: '#FFCCCB' },
    { name: 'Dusty Rose', code: '#DCAE96' },
    { name: 'Sage', code: '#9CAF88' },
    { name: 'Ice Blue', code: '#D6F5FF' },
    
    // Row 7
    { name: 'Vanilla', code: '#F3E5AB' },
    { name: 'Driftwood', code: '#AF8751' },
    { name: 'Bisque', code: '#FFE4C4' },
    { name: 'Lemon', code: '#FFFACD' },
    { name: 'Papaya', code: '#FFEFD5' },
    { name: 'Mauve', code: '#E0B0FF' },
    { name: 'Eucalyptus', code: '#44D7A8' },
    { name: 'Periwinkle', code: '#C5C5FF' },
    
    // Row 8
    { name: 'Magnolia', code: '#F8F4FF' },
    { name: 'Stone', code: '#928E85' },
    { name: 'Sand', code: '#C2B280' },
    { name: 'Primrose', code: '#EDDA74' },
    { name: 'Blush Pink', code: '#FE828C' },
    { name: 'Lavender', code: '#E6E6FA' },
    { name: 'Seafoam', code: '#93E9BE' },
    { name: 'Lilac', code: '#B19CD9' }
  ];

  const ColorSwatch = ({ color, name, index }: { color: string; name: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      className="group cursor-pointer"
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div 
          className="h-20 w-full relative"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs font-semibold text-gray-800 mb-1 uppercase tracking-wide leading-tight">{name}</p>
          <p className="text-xs font-mono text-gray-600">{color}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-yellow-50 via-peach-50 to-green-50 rounded-3xl p-8 border border-yellow-100"
      style={{
        background: 'linear-gradient(135deg, #fffef7 0%, #f7fcf0 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Light Spring Palette</h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          64 delicate, luminous colors specially curated for your gentle yet warm coloring. 
          These soft, light hues enhance your natural luminosity without overwhelming your delicate beauty.
        </p>
      </motion.div>

      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
        {colors.map((color, index) => (
          <ColorSwatch 
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
        <div className="bg-white rounded-2xl p-6 border border-yellow-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-800">Styling Tip:</strong> Your delicate palette works best with 
            light, warm colors that enhance your natural luminosity. Use cream as your primary neutral 
            instead of white or beige - it provides the perfect gentle backdrop for your ethereal beauty.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LightSpringPalette;
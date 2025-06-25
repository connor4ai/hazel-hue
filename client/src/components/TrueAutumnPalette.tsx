import { motion } from 'framer-motion';

const TrueAutumnPalette = () => {
  // Complete 64-color True Autumn palette extracted from HTML
  const colors = [
    // Row 1 - Neutrals
    { name: 'Cornsilk', code: '#FFF8DC' },
    { name: 'Wheat', code: '#F5DEB3' },
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Tan', code: '#D2B48C' },
    { name: 'Burlywood', code: '#DEB887' },
    { name: 'Peru', code: '#CD853F' },
    { name: 'Sienna', code: '#A0522D' },
    { name: 'Saddle Brown', code: '#8B4513' },
    
    // Row 2 - Yellows and Golds
    { name: 'Khaki', code: '#F0E68C' },
    { name: 'Gold', code: '#FFD700' },
    { name: 'Goldenrod', code: '#DAA520' },
    { name: 'Dark Goldenrod', code: '#B8860B' },
    { name: 'Peach Puff', code: '#FFDAB9' },
    { name: 'Orange', code: '#FFA500' },
    { name: 'Coral', code: '#FF7F50' },
    { name: 'Tomato', code: '#FF6347' },
    
    // Row 3 - Reds and Deep Colors
    { name: 'Salmon', code: '#FA8072' },
    { name: 'Indian Red', code: '#CD5C5C' },
    { name: 'Fire Brick', code: '#B22222' },
    { name: 'Crimson', code: '#DC143C' },
    { name: 'Maroon', code: '#800000' },
    { name: 'Dark Khaki', code: '#BDB76B' },
    { name: 'Olive', code: '#808000' },
    { name: 'Olive Drab', code: '#6B8E23' },
    
    // Row 4 - More Greens and Earth Tones
    { name: 'Yellow Green', code: '#9ACD32' },
    { name: 'Forest Green', code: '#228B22' },
    { name: 'Dark Olive Green', code: '#556B2F' },
    { name: 'Dark Green', code: '#006400' },
    { name: 'Moccasin', code: '#FFE4B5' },
    { name: 'Blanched Almond', code: '#FFEBCD' },
    { name: 'Bisque', code: '#FFE4C4' },
    { name: 'Antique White', code: '#FAEBD7' },
    
    // Row 5 - Extended Palette
    { name: 'Papaya Whip', code: '#FFEFD5' },
    { name: 'Lemon Chiffon', code: '#FFFACD' },
    { name: 'Light Goldenrod', code: '#FAFAD2' },
    { name: 'Pale Goldenrod', code: '#EEE8AA' },
    { name: 'Dark Orange', code: '#FF8C00' },
    { name: 'Orange Red', code: '#FF4500' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Dark Red', code: '#8B0000' },
    
    // Row 6 - Browns and Warm Tones
    { name: 'Rosy Brown', code: '#BC8F8F' },
    { name: 'Sandy Brown', code: '#F4A460' },
    { name: 'Chocolate', code: '#D2691E' },
    { name: 'Dark Salmon', code: '#E9967A' },
    { name: 'Light Salmon', code: '#FFA07A' },
    { name: 'Light Coral', code: '#F08080' },
    { name: 'Hot Pink', code: '#FF69B4' },
    { name: 'Deep Pink', code: '#FF1493' },
    
    // Row 7 - Additional Earth Tones
    { name: 'Chartreuse', code: '#7FFF00' },
    { name: 'Lawn Green', code: '#7CFC00' },
    { name: 'Lime Green', code: '#32CD32' },
    { name: 'Green Yellow', code: '#ADFF2F' },
    { name: 'Spring Green', code: '#00FF7F' },
    { name: 'Medium Spring Green', code: '#00FA9A' },
    { name: 'Light Green', code: '#90EE90' },
    { name: 'Pale Green', code: '#98FB98' },
    
    // Row 8 - Final Palette Colors
    { name: 'Dark Sea Green', code: '#8FBC8F' },
    { name: 'Medium Sea Green', code: '#3CB371' },
    { name: 'Sea Green', code: '#2E8B57' },
    { name: 'Dark Olive', code: '#B8860B' },
    { name: 'Olive Gold', code: '#DAA520' },
    { name: 'Harvest Gold', code: '#DA9100' },
    { name: 'Burnt Orange', code: '#CC5500' },
    { name: 'Rust', code: '#B7410E' }
  ];

  const ColorSwatch = ({ color, name, index }: { color: string; name: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      className="group cursor-pointer"
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <div className="bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300">
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
      className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-8 border border-amber-200"
      style={{
        background: 'linear-gradient(135deg, #f4e4c1 0%, #e8d5b7 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Your True Autumn Palette</h3>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          64 rich, warm colors that capture the essence of autumn foliage. 
          These deep, earthy hues with golden undertones perfectly complement your natural warmth and depth.
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
        <div className="bg-white rounded-2xl p-6 border border-amber-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-800">Styling Tip:</strong> Your rich autumn palette works best with 
            warm, deep colors that enhance your natural earthiness. Use brown as your primary neutral 
            instead of black or gray - it provides the perfect warm backdrop for your sophisticated autumn beauty.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrueAutumnPalette;
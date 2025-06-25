import { motion } from 'framer-motion';

const DarkAutumnPalette = () => {
  // Complete 64-color Dark Autumn palette extracted from HTML
  const colors = [
    // Row 1 - Warm Neutrals
    { name: 'Linen', code: '#FAF0E6' },
    { name: 'Papyrus', code: '#F5E6D3' },
    { name: 'Camel', code: '#C8A882' },
    { name: 'Chocolate', code: '#D2691E' },
    { name: 'Dark Brown', code: '#654321' },
    { name: 'Espresso', code: '#3C2415' },
    { name: 'Dark Slate Grey', code: '#2F4F4F' },
    { name: 'Warm Black', code: '#1C1C1C' },
    
    // Row 2 - Yellows and Oranges
    { name: 'Mustard', code: '#FFDB58' },
    { name: 'Dark Mustard', code: '#CC9900' },
    { name: 'Bronze', code: '#CD7F32' },
    { name: 'Rust', code: '#B7410E' },
    { name: 'Tomato', code: '#FF6347' },
    { name: 'Terracotta', code: '#E2725B' },
    { name: 'Burnt Orange', code: '#FF4500' },
    { name: 'Burnt Sienna', code: '#8B4513' },
    
    // Row 3 - Reds and Burgundies
    { name: 'Crimson', code: '#DC143C' },
    { name: 'Dark Red', code: '#8B0000' },
    { name: 'Burgundy', code: '#800020' },
    { name: 'Wine', code: '#722F37' },
    { name: 'Maroon', code: '#800000' },
    { name: 'Fire Brick', code: '#B22222' },
    { name: 'Sienna', code: '#A0522D' },
    { name: 'Indian Red', code: '#CD5C5C' },
    
    // Row 4 - Greens and Deep Tones
    { name: 'Dark Olive Green', code: '#556B2F' },
    { name: 'Forest Green', code: '#228B22' },
    { name: 'Dark Forest Green', code: '#355E3B' },
    { name: 'Olive Drab', code: '#6B8E23' },
    { name: 'Dark Khaki', code: '#BDB76B' },
    { name: 'Yellow Green', code: '#9ACD32' },
    { name: 'Olive', code: '#808000' },
    { name: 'Dark Goldenrod', code: '#B8860B' },
    
    // Row 5 - Extended Deep Palette
    { name: 'Saddle Brown', code: '#8B4513' },
    { name: 'Peru', code: '#CD853F' },
    { name: 'Dark Orange', code: '#FF8C00' },
    { name: 'Orange Red', code: '#FF4500' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Dark Salmon', code: '#E9967A' },
    { name: 'Light Coral', code: '#F08080' },
    { name: 'Rosy Brown', code: '#BC8F8F' },
    
    // Row 6 - Rich Earth Tones
    { name: 'Sandy Brown', code: '#F4A460' },
    { name: 'Goldenrod', code: '#DAA520' },
    { name: 'Dark Goldenrod', code: '#B8860B' },
    { name: 'Olive Gold', code: '#B8860B' },
    { name: 'Raw Sienna', code: '#D68A59' },
    { name: 'Burnt Umber', code: '#8A3324' },
    { name: 'Vandyke Brown', code: '#664228' },
    { name: 'Sepia', code: '#704214' },
    
    // Row 7 - Deep Greens and Blues
    { name: 'Sea Green', code: '#2E8B57' },
    { name: 'Dark Sea Green', code: '#8FBC8F' },
    { name: 'Medium Sea Green', code: '#3CB371' },
    { name: 'Teal', code: '#008080' },
    { name: 'Dark Cyan', code: '#008B8B' },
    { name: 'Cadet Blue', code: '#5F9EA0' },
    { name: 'Steel Blue', code: '#4682B4' },
    { name: 'Slate Gray', code: '#708090' },
    
    // Row 8 - Final Deep Colors
    { name: 'Dark Slate Blue', code: '#483D8B' },
    { name: 'Midnight Blue', code: '#191970' },
    { name: 'Navy', code: '#000080' },
    { name: 'Dark Navy', code: '#000033' },
    { name: 'Charcoal', code: '#36454F' },
    { name: 'Jet Black', code: '#343434' },
    { name: 'Coffee Bean', code: '#4A2C2A' },
    { name: 'Dark Cocoa', code: '#3C1810' }
  ];

  const ColorSwatch = ({ color, name, index }: { color: string; name: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      className="group cursor-pointer"
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div 
          className="h-20 w-full relative"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
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
      className="bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 rounded-3xl p-8 border border-stone-300"
      style={{
        background: 'linear-gradient(135deg, #3c3429 0%, #2a1f1a 100%)',
        border: '1px solid rgba(101, 67, 33, 0.3)'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-white mb-4">Your Dark Autumn Palette</h3>
        <p className="text-stone-200 max-w-2xl mx-auto leading-relaxed">
          64 deep, sophisticated colors with warm undertones that create luxury and power. 
          These rich, intense hues perfectly complement your dramatic coloring and natural depth.
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
        <div className="bg-white rounded-2xl p-6 border border-stone-300">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-800">Styling Tip:</strong> Your powerful Dark Autumn palette works best with 
            deep, rich colors that enhance your natural sophistication. Use dark brown and espresso as your primary 
            neutrals instead of black - they provide the perfect warm backdrop for your dramatic, luxurious presence.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DarkAutumnPalette;
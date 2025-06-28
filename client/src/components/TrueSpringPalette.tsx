import { motion } from 'framer-motion';
import { MobileOptimizedColorSwatch } from './MobileOptimizedColorSwatch';

const TrueSpringPalette = () => {
  // Complete 64-color True Spring palette extracted from HTML
  const colors = [
    // Row 1
    { name: 'Ivory', code: '#FFF8F0' },
    { name: 'Camel', code: '#8B7355' },
    { name: 'Wheat', code: '#F5DEB3' },
    { name: 'Golden Yellow', code: '#FFD700' },
    { name: 'Coral', code: '#FF7F50' },
    { name: 'Yellow Green', code: '#9ACD32' },
    { name: 'Lime Green', code: '#32CD32' },
    { name: 'Turquoise', code: '#00CED1' },
    
    // Row 2
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Dim Grey', code: '#696969' },
    { name: 'Peach Puff', code: '#FFDAB9' },
    { name: 'Orange', code: '#FFA500' },
    { name: 'Tomato', code: '#FF6347' },
    { name: 'Chartreuse', code: '#7FFF00' },
    { name: 'Forest Green', code: '#228B22' },
    { name: 'Light Sea Green', code: '#20B2AA' },
    
    // Row 3
    { name: 'Khaki', code: '#F0E68C' },
    { name: 'Sienna', code: '#A0522D' },
    { name: 'Burlywood', code: '#DEB887' },
    { name: 'Goldenrod', code: '#DAA520' },
    { name: 'Light Salmon', code: '#FFA07A' },
    { name: 'Green Yellow', code: '#ADFF2F' },
    { name: 'Spring Green', code: '#00FF7F' },
    { name: 'Turquoise', code: '#40E0D0' },
    
    // Row 4
    { name: 'Cream', code: '#F8F8E8' },
    { name: 'Tan', code: '#D2B48C' },
    { name: 'Light Coral', code: '#F08080' },
    { name: 'Gold', code: '#FFD700' },
    { name: 'Salmon', code: '#FA8072' },
    { name: 'Pale Green', code: '#98FB98' },
    { name: 'Medium Sea Green', code: '#3CB371' },
    { name: 'Aquamarine', code: '#7FFFD4' },
    
    // Row 5
    { name: 'Vanilla', code: '#F3E5AB' },
    { name: 'Sandy Brown', code: '#F4A460' },
    { name: 'Peach', code: '#FFCBA4' },
    { name: 'Orange Red', code: '#FF4500' },
    { name: 'Coral Red', code: '#FF5F5F' },
    { name: 'Lawn Green', code: '#7CFC00' },
    { name: 'Sea Green', code: '#2E8B57' },
    { name: 'Light Cyan', code: '#E0FFFF' },
    
    // Row 6
    { name: 'Bisque', code: '#FFE4C4' },
    { name: 'Peru', code: '#CD853F' },
    { name: 'Papaya Whip', code: '#FFEFD5' },
    { name: 'Yellow', code: '#FFFF00' },
    { name: 'Red Orange', code: '#FF6600' },
    { name: 'Lime', code: '#00FF00' },
    { name: 'Dark Sea Green', code: '#8FBC8F' },
    { name: 'Cyan', code: '#00FFFF' },
    
    // Row 7
    { name: 'Lemon Chiffon', code: '#FFFACD' },
    { name: 'Chocolate', code: '#D2691E' },
    { name: 'Moccasin', code: '#FFE4B5' },
    { name: 'Gold', code: '#FFD700' },
    { name: 'Orange Pink', code: '#FF7F50' },
    { name: 'Green', code: '#008000' },
    { name: 'Teal', code: '#008080' },
    { name: 'Dark Turquoise', code: '#00CED1' },
    
    // Row 8
    { name: 'Cornsilk', code: '#FFF8DC' },
    { name: 'Saddle Brown', code: '#8B4513' },
    { name: 'Blanched Almond', code: '#FFEBCD' },
    { name: 'Light Goldenrod', code: '#FAFAD2' },
    { name: 'Light Pink', code: '#FFB6C1' },
    { name: 'Pale Turquoise', code: '#AFEEEE' },
    { name: 'Medium Turquoise', code: '#48D1CC' },
    { name: 'Cadet Blue', code: '#5F9EA0' }
  ];

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-100"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Your True Spring Palette</h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          64 fresh, warm colors specially curated for your vibrant, golden coloring. 
          These clear, sunny hues capture the essence of spring renewal and enhance your natural warmth and vitality.
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
        <div className="bg-white rounded-2xl p-6 border border-yellow-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-800">Styling Tip:</strong> Your warm, vibrant palette works beautifully for 
            fresh, energetic looks. Use camel and cream as your neutral bases instead of black or gray - 
            these warm neutrals will enhance your natural golden glow.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrueSpringPalette;
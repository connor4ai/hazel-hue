import { motion } from 'framer-motion';
import { MobileOptimizedColorSwatch } from './MobileOptimizedColorSwatch';

const BrightSpringPalette = () => {
  // Complete 64-color Bright Spring palette extracted from HTML
  const colors = [
    // Row 1
    { name: 'Floral White', code: '#FFFAF0' },
    { name: 'Slate Grey', code: '#708090' },
    { name: 'Steel Blue', code: '#4682B4' },
    { name: 'Gold', code: '#FFD700' },
    { name: 'Coral', code: '#FF7F50' },
    { name: 'Light Pink', code: '#FFB6C1' },
    { name: 'Lime Green', code: '#32CD32' },
    { name: 'Dark Turquoise', code: '#00CED1' },
    
    // Row 2
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Dark Slate Grey', code: '#2F4F4F' },
    { name: 'Moccasin', code: '#FFE4B5' },
    { name: 'Orange', code: '#FFA500' },
    { name: 'Orange Red', code: '#FF4500' },
    { name: 'Hot Pink', code: '#FF69B4' },
    { name: 'Forest Green', code: '#228B22' },
    { name: 'Light Sea Green', code: '#20B2AA' },
    
    // Row 3
    { name: 'Khaki', code: '#F0E68C' },
    { name: 'Black', code: '#000000' },
    { name: 'Peach Puff', code: '#FFDAB9' },
    { name: 'Dark Orange', code: '#FF8C00' },
    { name: 'Pink', code: '#FFC0CB' },
    { name: 'Deep Pink', code: '#FF1493' },
    { name: 'Spring Green', code: '#00FF7F' },
    { name: 'Turquoise', code: '#40E0D0' },
    
    // Row 4
    { name: 'White', code: '#FFFFFF' },
    { name: 'Grey', code: '#808080' },
    { name: 'Light Yellow', code: '#FFFFE0' },
    { name: 'Yellow', code: '#FFFF00' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Magenta', code: '#FF00FF' },
    { name: 'Green', code: '#008000' },
    { name: 'Cyan', code: '#00FFFF' },
    
    // Row 5
    { name: 'Alice Blue', code: '#F0F8FF' },
    { name: 'Dim Grey', code: '#696969' },
    { name: 'Light Goldenrod', code: '#FAFAD2' },
    { name: 'Gold', code: '#FFD700' },
    { name: 'Crimson', code: '#DC143C' },
    { name: 'Violet', code: '#8B00FF' },
    { name: 'Lawn Green', code: '#7CFC00' },
    { name: 'Aqua', code: '#00FFFF' },
    
    // Row 6
    { name: 'Lavender', code: '#E6E6FA' },
    { name: 'Silver', code: '#C0C0C0' },
    { name: 'Lemon Chiffon', code: '#FFFACD' },
    { name: 'Orange', code: '#FFA500' },
    { name: 'Fire Brick', code: '#B22222' },
    { name: 'Blue Violet', code: '#8A2BE2' },
    { name: 'Chartreuse', code: '#7FFF00' },
    { name: 'Light Cyan', code: '#E0FFFF' },
    
    // Row 7
    { name: 'Mint Cream', code: '#F5FFFA' },
    { name: 'Dark Grey', code: '#A9A9A9' },
    { name: 'Cornsilk', code: '#FFF8DC' },
    { name: 'Dark Orange', code: '#FF8C00' },
    { name: 'Medium Violet Red', code: '#C71585' },
    { name: 'Purple', code: '#800080' },
    { name: 'Medium Spring Green', code: '#00FA9A' },
    { name: 'Pale Turquoise', code: '#AFEEEE' },
    
    // Row 8
    { name: 'Honeydew', code: '#F0FFF0' },
    { name: 'Light Grey', code: '#D3D3D3' },
    { name: 'Papaya Whip', code: '#FFEFD5' },
    { name: 'Goldenrod', code: '#DAA520' },
    { name: 'Maroon', code: '#800000' },
    { name: 'Indigo', code: '#4B0082' },
    { name: 'Sea Green', code: '#2E8B57' },
    { name: 'Light Blue', code: '#ADD8E6' }
  ];

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-100"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Bright Spring Palette</h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          64 electric, saturated colors specially curated for your vibrant, high-contrast coloring. 
          These bold, clear hues capture your dynamic energy and ensure you always look radiant and alive.
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
        <div className="bg-white rounded-2xl p-6 border border-orange-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-800">Styling Tip:</strong> Your electric palette allows you to wear 
            head-to-toe bright colors that would overwhelm other seasons. Use pure white as your light neutral 
            and black for dramatic contrast - these crisp neutrals enhance your naturally vibrant energy.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrightSpringPalette;
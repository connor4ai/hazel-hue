import { motion } from 'framer-motion';
import { MobileOptimizedColorSwatch } from './MobileOptimizedColorSwatch';

const LightSummerPalette = () => {
  // Complete 64-color Light Summer palette extracted from HTML
  const colors = [
    // Row 1
    { name: 'Pure White', code: '#F8F8F8' },
    { name: 'Light Grey', code: '#A8A8A8' },
    { name: 'Dusty Mauve', code: '#A89898' },
    { name: 'Coral Pink', code: '#E8A8A8' },
    { name: 'Watermelon', code: '#E85A78' },
    { name: 'Mint', code: '#8BC4A8' },
    { name: 'Aqua', code: '#78C4C4' },
    { name: 'Periwinkle', code: '#8BA8D4' },
    
    // Row 2
    { name: 'Ivory', code: '#F0F0E8' },
    { name: 'Blue Grey', code: '#788898' },
    { name: 'Pale Gold', code: '#F0D8A8' },
    { name: 'Rose', code: '#E88898' },
    { name: 'Pink', code: '#D84878' },
    { name: 'Sea Green', code: '#68B898' },
    { name: 'Sky Blue', code: '#68B4D4' },
    { name: 'Lavender Blue', code: '#7898C4' },
    
    // Row 3
    { name: 'Silver', code: '#D8D8D8' },
    { name: 'Charcoal', code: '#5A5A68' },
    { name: 'Butter', code: '#E8D498' },
    { name: 'Cerise', code: '#E85888' },
    { name: 'Orchid', code: '#E8C4E8' },
    { name: 'Sage', code: '#68A898' },
    { name: 'Powder Blue', code: '#68A8D4' },
    { name: 'Slate Blue', code: '#7888B8' },
    
    // Row 4
    { name: 'Pearl', code: '#F8F8E8' },
    { name: 'Dove Grey', code: '#B8B8B8' },
    { name: 'Cream', code: '#F8E8D8' },
    { name: 'Blush', code: '#F8D8E8' },
    { name: 'Lilac', code: '#E8D8F8' },
    { name: 'Seafoam', code: '#D8F8E8' },
    { name: 'Ice Blue', code: '#D8E8F8' },
    { name: 'Lavender Mist', code: '#E8E8F8' },
    
    // Row 5
    { name: 'Soft White', code: '#F8F8F0' },
    { name: 'Light Taupe', code: '#C8C8B8' },
    { name: 'Pale Yellow', code: '#F8F0A8' },
    { name: 'Light Rose', code: '#F8C8D8' },
    { name: 'Soft Purple', code: '#D8C8E8' },
    { name: 'Mint Cream', code: '#C8E8D8' },
    { name: 'Baby Blue', code: '#C8D8E8' },
    { name: 'Periwinkle Mist', code: '#D8D8F8' },
    
    // Row 6
    { name: 'Whisper White', code: '#F0F0F0' },
    { name: 'Cool Grey', code: '#A8A8B8' },
    { name: 'Vanilla', code: '#F0E8C8' },
    { name: 'Pink Mist', code: '#F0C8D8' },
    { name: 'Wisteria', code: '#C8B8E8' },
    { name: 'Eucalyptus', code: '#B8D8C8' },
    { name: 'Cornflower', code: '#B8C8D8' },
    { name: 'Iris', code: '#C8C8E8' },
    
    // Row 7
    { name: 'Cloud White', code: '#E8E8E8' },
    { name: 'French Grey', code: '#A8A8C8' },
    { name: 'Champagne', code: '#E8D8B8' },
    { name: 'Dusty Pink', code: '#E8B8C8' },
    { name: 'Amethyst Mist', code: '#B8A8D8' },
    { name: 'Sage Mist', code: '#A8C8B8' },
    { name: 'Steel Blue', code: '#A8B8C8' },
    { name: 'Lavender Grey', code: '#B8B8D8' },
    
    // Row 8
    { name: 'Alabaster', code: '#F8F8F8' },
    { name: 'Platinum', code: '#C8C8C8' },
    { name: 'Light Gold', code: '#F0E8A8' },
    { name: 'Rose Quartz', code: '#F0B8C8' },
    { name: 'Moonstone', code: '#D8C8F8' },
    { name: 'Jade Mist', code: '#C8E8D8' },
    { name: 'Celestial Blue', code: '#C8D8F8' },
    { name: 'Angel White', code: '#F8F8F8' }
  ];

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl p-8 border border-pink-100"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Light Summer Palette</h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          64 ethereal colors specially curated for your delicate, cool coloring. 
          These light, muted tones create soft, feminine combinations that enhance your natural elegance without overwhelming your gentle features.
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
        <div className="bg-white rounded-2xl p-6 border border-pink-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-800">Styling Tip:</strong> Your light, delicate palette works best with 
            soft fabrics and gentle textures. These colors create naturally harmonious combinations - 
            mix any colors together for effortlessly elegant looks.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LightSummerPalette;
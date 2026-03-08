import { motion } from 'framer-motion';
import { MobileOptimizedColorSwatch } from './MobileOptimizedColorSwatch';

const TrueSummerPalette = () => {
  // Complete 64-color True Summer palette extracted from HTML
  const colors = [
    // Row 1
    { name: 'Ice Blue', code: '#E8F0F2' },
    { name: 'Cool Grey', code: '#8B9AA3' },
    { name: 'Blue Grey', code: '#7A8FA3' },
    { name: 'Teal', code: '#4A7C7C' },
    { name: 'Soft Pink', code: '#E8B8C4' },
    { name: 'Sea Green', code: '#4A8B6B' },
    { name: 'Powder Blue', code: '#5A8BA3' },
    { name: 'Lavender', code: '#A39BC4' },
    
    // Row 2
    { name: 'Pale Blue', code: '#F5F8FA' },
    { name: 'Charcoal', code: '#4A5A5A' },
    { name: 'Light Grey', code: '#D4DADE' },
    { name: 'Sky Blue', code: '#B8D4DE' },
    { name: 'Dark Teal', code: '#2A5A5A' },
    { name: 'Pale Pink', code: '#E8D4E8' },
    { name: 'Steel Blue', code: '#4A6B8B' },
    { name: 'Purple Grey', code: '#5A4A7A' },
    
    // Row 3
    { name: 'Silver Blue', code: '#A8B8C4' },
    { name: 'Dark Slate', code: '#2F4F4F' },
    { name: 'Taupe', code: '#B8A89C' },
    { name: 'Blue Grey', code: '#6B7B8B' },
    { name: 'Rose Pink', code: '#E8A8B8' },
    { name: 'Dusty Rose', code: '#B85A7A' },
    { name: 'Periwinkle', code: '#4A8BC4' },
    { name: 'Charcoal Grey', code: '#3D3D3D' },
    
    // Row 4
    { name: 'Sage Green', code: '#9CAF88' },
    { name: 'Storm Blue', code: '#4A6B7C' },
    { name: 'Soft Navy', code: '#3A4A5A' },
    { name: 'Dusty Teal', code: '#5A7C7C' },
    { name: 'Mauve Pink', code: '#B8A8C4' },
    { name: 'Cool Brown', code: '#8B7A6B' },
    { name: 'Soft Purple', code: '#8B7BA3' },
    { name: 'Deep Teal', code: '#2A4A4A' },
    
    // Row 5
    { name: 'Mint Green', code: '#A8C4B8' },
    { name: 'Slate Blue', code: '#5A6B8B' },
    { name: 'Rose Brown', code: '#A89C8B' },
    { name: 'Cool Beige', code: '#C4B8A8' },
    { name: 'Dusty Purple', code: '#9C8BB8' },
    { name: 'Soft Coral', code: '#D4A8B8' },
    { name: 'Ocean Blue', code: '#4A7C9C' },
    { name: 'Deep Purple', code: '#5A4A6B' },
    
    // Row 6
    { name: 'Seafoam', code: '#8BC4A8' },
    { name: 'Pewter', code: '#7A7A7A' },
    { name: 'Dove Grey', code: '#B8B8B8' },
    { name: 'Cornflower', code: '#6B8BC4' },
    { name: 'Plum', code: '#8B6B9C' },
    { name: 'Dusty Blue', code: '#7A9CB8' },
    { name: 'Soft Lavender', code: '#C4B8D4' },
    { name: 'Deep Rose', code: '#9C6B7A' },
    
    // Row 7
    { name: 'Eucalyptus', code: '#7AB89C' },
    { name: 'Denim Blue', code: '#4A5A7A' },
    { name: 'Mushroom', code: '#9C9C8B' },
    { name: 'Iris Blue', code: '#7A8BD4' },
    { name: 'Wisteria', code: '#9C7AD4' },
    { name: 'French Blue', code: '#6B7CB8' },
    { name: 'Heather', code: '#B89CC4' },
    { name: 'Berry', code: '#8B5A7A' },
    
    // Row 8
    { name: 'Celadon', code: '#A8D4C4' },
    { name: 'Graphite', code: '#5A5A5A' },
    { name: 'Pearl Grey', code: '#E8E8E8' },
    { name: 'Cerulean', code: '#5AA8D4' },
    { name: 'Amethyst', code: '#8B5AD4' },
    { name: 'Periwinkle Blue', code: '#7A9CD4' },
    { name: 'Lilac', code: '#D4A8E8' },
    { name: 'Mulberry', code: '#7A5A8B' }
  ];

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Your True Summer Palette</h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          64 carefully curated colors that harmonize with your cool undertones and medium depth. 
          These soft, muted tones create elegant, sophisticated combinations that enhance your natural beauty.
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
        <div className="bg-white rounded-2xl p-6 border border-blue-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-800">Color Harmony Tip:</strong> Mix and match these colors freely - 
            they're all designed to work together beautifully. Your soft, muted palette creates naturally 
            elegant combinations that never clash.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrueSummerPalette;
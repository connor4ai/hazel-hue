import { motion } from 'framer-motion';
import { MobileOptimizedColorSwatch } from './MobileOptimizedColorSwatch';

const TrueWinterPalette = () => {

  const paletteColors = [
    // Row 1
    { name: 'Ice White', code: '#E8E8E8' },
    { name: 'Cool Grey', code: '#6B7B7B' },
    { name: 'Icy Yellow', code: '#FCE4B8' },
    { name: 'Emerald', code: '#4D9B4D' },
    { name: 'Teal', code: '#2E5F5F' },
    { name: 'Bright Pink', code: '#FFB8E8' },
    { name: 'Fuchsia', code: '#E85AA0' },
    { name: 'Eggplant', code: '#5A3D5A' },
    
    // Row 2
    { name: 'Silver', code: '#D4D4D4' },
    { name: 'Charcoal', code: '#4A4A4A' },
    { name: 'Lemon', code: '#FCFC1C' },
    { name: 'Forest Green', code: '#1C7A1C' },
    { name: 'Petrol', code: '#1C5F7A' },
    { name: 'Hot Pink', code: '#E85AA0' },
    { name: 'Magenta', code: '#B8207A' },
    { name: 'Purple', code: '#7A3D7A' },
    
    // Row 3
    { name: 'Icy Blue', code: '#F0F8FF' },
    { name: 'True Black', code: '#1C1C1C' },
    { name: 'Bright Yellow', code: '#E8E81C' },
    { name: 'Kelly Green', code: '#3D9B3D' },
    { name: 'Turquoise', code: '#1C7A9B' },
    { name: 'Pale Pink', code: '#FFE8FC' },
    { name: 'Shocking Pink', code: '#E85A9B' },
    { name: 'Royal Purple', code: '#9B3D9B' },
    
    // Row 4
    { name: 'Light Grey', code: '#B8B8B8' },
    { name: 'Graphite', code: '#2C2C2C' },
    { name: 'Electric Blue', code: '#1CE8FC' },
    { name: 'Pine Green', code: '#0F4F0F' },
    { name: 'Navy Blue', code: '#1C1C7A' },
    { name: 'Rose Pink', code: '#FC9BE8' },
    { name: 'Burgundy', code: '#7A1C3D' },
    { name: 'Deep Purple', code: '#4F1C4F' },
    
    // Row 5
    { name: 'Pearl', code: '#F0F0F0' },
    { name: 'Jet Black', code: '#0A0A0A' },
    { name: 'Acid Yellow', code: '#D4FC1C' },
    { name: 'Jade', code: '#1C9B5F' },
    { name: 'Cobalt', code: '#1C3D7A' },
    { name: 'Orchid', code: '#DA70D6' },
    { name: 'Wine', code: '#5F1C1C' },
    { name: 'Violet', code: '#3D1C5F' },
    
    // Row 6
    { name: 'Platinum', code: '#E5E4E2' },
    { name: 'Obsidian', code: '#141414' },
    { name: 'Citrine', code: '#E4D00A' },
    { name: 'Malachite', code: '#0BDA51' },
    { name: 'Sapphire', code: '#0F52BA' },
    { name: 'Peony', code: '#F8BBD9' },
    { name: 'Crimson', code: '#DC143C' },
    { name: 'Amethyst', code: '#9966CC' },
    
    // Row 7
    { name: 'Cool Beige', code: '#F5F5DC' },
    { name: 'Carbon', code: '#36454F' },
    { name: 'Canary', code: '#FFFF99' },
    { name: 'Viridian', code: '#40826D' },
    { name: 'Steel Blue', code: '#4682B4' },
    { name: 'Blush', code: '#DE5D83' },
    { name: 'Maroon', code: '#800000' },
    { name: 'Indigo', code: '#4B0082' },
    
    // Row 8
    { name: 'Frost', code: '#DEE3E0' },
    { name: 'Slate', code: '#708090' },
    { name: 'Lime', code: '#32CD32' },
    { name: 'Seafoam', code: '#71EEB8' },
    { name: 'Cerulean', code: '#007BA7' },
    { name: 'Cotton Candy', code: '#FFBCD9' },
    { name: 'Ruby', code: '#E0115F' },
    { name: 'Plum', code: '#8E4585' }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">TRUE WINTER</h3>
        <p className="text-gray-600">Complete 64-Color Professional Palette</p>
        <p className="text-sm text-gray-500 mt-2">Click any color to copy its hex code</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
        {paletteColors.map((color, index) => (
          <MobileOptimizedColorSwatch
            key={index}
            color={color.code}
            name={color.name}
            index={index}
          />
        ))}
      </div>

      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">Professional Color Analysis • True Winter Palette</p>
      </div>
    </div>
  );
};

export default TrueWinterPalette;
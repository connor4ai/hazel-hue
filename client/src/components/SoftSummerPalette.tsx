import { motion } from 'framer-motion';

const SoftSummerPalette = () => {
  // Complete 64-color Soft Summer palette extracted from HTML
  const colors = [
    // Row 1
    { name: 'Soft Taupe', code: '#8B7D7A' },
    { name: 'Mushroom', code: '#7A6B68' },
    { name: 'Dusty Rose', code: '#D4969C' },
    { name: 'Soft Burgundy', code: '#B85860' },
    { name: 'Soft Gold', code: '#E6D4A8' },
    { name: 'Sage Green', code: '#5F8A7A' },
    { name: 'Soft Teal', code: '#4D6F70' },
    { name: 'Soft Periwinkle', code: '#8B94B8' },
    
    // Row 2
    { name: 'Soft Beige', code: '#E8DDD4' },
    { name: 'Cocoa', code: '#8B7B76' },
    { name: 'Soft Pink', code: '#E8B3B8' },
    { name: 'Rose', code: '#C85865' },
    { name: 'Deep Rose', code: '#7D4A52' },
    { name: 'Soft Yellow', code: '#D4C998' },
    { name: 'Sea Green', code: '#6B8B7A' },
    { name: 'Soft Blue', code: '#7A9EAC' },
    
    // Row 3
    { name: 'Stone', code: '#C4B8A8' },
    { name: 'Dark Taupe', code: '#6B5B54' },
    { name: 'Mauve', code: '#D19BA5' },
    { name: 'Berry', code: '#B85466' },
    { name: 'Soft Coral', code: '#E8C2C8' },
    { name: 'Mint Green', code: '#A8C4A8' },
    { name: 'Forest Teal', code: '#4A6B6B' },
    { name: 'Sky Blue', code: '#8BB4C4' },
    
    // Row 4
    { name: 'Light Silver', code: '#C8C8C8' },
    { name: 'Taupe Grey', code: '#988888' },
    { name: 'Cream', code: '#F0D478' },
    { name: 'Baby Pink', code: '#E8B8C8' },
    { name: 'Dusty Pink', code: '#E88AA8' },
    { name: 'Jade', code: '#68B488' },
    { name: 'Light Blue', code: '#78C4E8' },
    { name: 'Lilac', code: '#A8A8E8' },
    
    // Row 5
    { name: 'Cool Grey', code: '#B8B8B8' },
    { name: 'Mushroom', code: '#A8A898' },
    { name: 'Pale Yellow', code: '#D8C468' },
    { name: 'Soft Rose', code: '#E8A8C8' },
    { name: 'Mauve', code: '#C87898' },
    { name: 'Forest Green', code: '#588A78' },
    { name: 'Ocean Blue', code: '#68A8C8' },
    { name: 'Lavender', code: '#D4C4E8' },
    
    // Row 6
    { name: 'Medium Grey', code: '#A8A8A8' },
    { name: 'Olive Grey', code: '#888878' },
    { name: 'Lemon', code: '#E8D478' },
    { name: 'Blush', code: '#E8A8B8' },
    { name: 'Raspberry', code: '#D84888' },
    { name: 'Seafoam', code: '#78C4A8' },
    { name: 'Steel Blue', code: '#5898C8' },
    { name: 'Amethyst', code: '#9888C8' },
    
    // Row 7
    { name: 'Platinum', code: '#C8C8C8' },
    { name: 'Warm Taupe', code: '#A89888' },
    { name: 'Vanilla', code: '#E8C898' },
    { name: 'Salmon', code: '#E898A8' },
    { name: 'Berry', code: '#C87888' },
    { name: 'Eucalyptus', code: '#68A888' },
    { name: 'Cornflower', code: '#5888B8' },
    { name: 'Wisteria', code: '#8878B8' },
    
    // Row 8
    { name: 'Soft Grey', code: '#B8B8B8' },
    { name: 'Driftwood', code: '#988878' },
    { name: 'Peach', code: '#E8C4A8' },
    { name: 'Coral', code: '#E8A898' },
    { name: 'Rose Wood', code: '#B86878' },
    { name: 'Soft Green', code: '#58A878' },
    { name: 'Dusty Blue', code: '#6898B8' },
    { name: 'Pale Lavender', code: '#D4D4E8' }
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
      className="bg-gradient-to-br from-slate-50 to-rose-50 rounded-3xl p-8 border border-slate-100"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Soft Summer Palette</h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          64 muted, sophisticated colors specially curated for your understated beauty. 
          These gray-toned hues create harmonious, tonal combinations that enhance your natural subtlety and sophisticated appeal.
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
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-800">Styling Tip:</strong> Your muted palette works beautifully for tonal dressing. 
            Gray serves as your perfect neutral base - create sophisticated monochromatic looks using 
            different shades from the same color family for effortlessly elegant combinations.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SoftSummerPalette;
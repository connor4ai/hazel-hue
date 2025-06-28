import { useState } from "react";
import { motion } from "framer-motion";

const ColorSwatch = ({ color, name, clickable = true }: { color: string; name?: string; clickable?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (!clickable) return;
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <motion.div
      className={`relative group ${clickable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      whileHover={clickable ? { scale: 1.05 } : {}}
      whileTap={clickable ? { scale: 0.95 } : {}}
    >
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg border-2 border-white"
        style={{ backgroundColor: color }}
      />
      {name && (
        <div className="text-center mt-2">
          <p className="text-xs font-medium text-gray-700">{name}</p>
          <p className="text-xs text-gray-500 font-mono">{color}</p>
        </div>
      )}
      {copied && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs"
        >
          Copied!
        </motion.div>
      )}
    </motion.div>
  );
};

export default function DarkWinterPalette() {
  const palette = [
    // Row 1
    { name: "Ghost White", hex: "#F8F8FF" },
    { name: "Dim Grey", hex: "#696969" },
    { name: "Khaki", hex: "#F0E68C" },
    { name: "Deep Rose", hex: "#C85A8A" },
    { name: "Deep Red", hex: "#8B1538" },
    { name: "Sea Green", hex: "#2E8B57" },
    { name: "Dark Cyan", hex: "#008B8B" },
    { name: "Midnight Blue", hex: "#191970" },
    
    // Row 2
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Dark Slate Grey", hex: "#2F4F4F" },
    { name: "Light Khaki", hex: "#F0E68C" },
    { name: "Hot Pink", hex: "#FF69B4" },
    { name: "Sienna", hex: "#A0522D" },
    { name: "Forest Green", hex: "#228B22" },
    { name: "Steel Blue", hex: "#4682B4" },
    { name: "Rebecca Purple", hex: "#663399" },
    
    // Row 3
    { name: "Light Grey", hex: "#D3D3D3" },
    { name: "True Black", hex: "#000000" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Deep Pink", hex: "#FF1493" },
    { name: "Crimson", hex: "#DC143C" },
    { name: "Dark Green", hex: "#006400" },
    { name: "Royal Blue", hex: "#4169E1" },
    { name: "Purple", hex: "#800080" },
    
    // Row 4
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Dark Goldenrod", hex: "#B8860B" },
    { name: "Maroon", hex: "#800000" },
    { name: "Firebrick", hex: "#B22222" },
    { name: "Dark Olive Green", hex: "#556B2F" },
    { name: "Navy", hex: "#000080" },
    { name: "Indigo", hex: "#4B0082" },
    
    // Row 5
    { name: "Gainsboro", hex: "#DCDCDC" },
    { name: "Dark Grey", hex: "#A9A9A9" },
    { name: "Olive", hex: "#808000" },
    { name: "Indian Red", hex: "#CD5C5C" },
    { name: "Dark Red", hex: "#8B0000" },
    { name: "Dark Sea Green", hex: "#8FBC8F" },
    { name: "Medium Blue", hex: "#0000CD" },
    { name: "Dark Violet", hex: "#9400D3" },
    
    // Row 6
    { name: "White Smoke", hex: "#F5F5F5" },
    { name: "Slate Grey", hex: "#708090" },
    { name: "Dark Khaki", hex: "#BDB76B" },
    { name: "Pale Violet Red", hex: "#DB7093" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Medium Sea Green", hex: "#3CB371" },
    { name: "Dodger Blue", hex: "#1E90FF" },
    { name: "Blue Violet", hex: "#8A2BE2" },
    
    // Row 7
    { name: "Light Steel Blue", hex: "#B0C4DE" },
    { name: "Dark Slate Blue", hex: "#483D8B" },
    { name: "Yellow Green", hex: "#9ACD32" },
    { name: "Medium Violet Red", hex: "#C71585" },
    { name: "Saddle Brown", hex: "#8B4513" },
    { name: "Lime Green", hex: "#32CD32" },
    { name: "Cornflower Blue", hex: "#6495ED" },
    { name: "Dark Orchid", hex: "#9932CC" },
    
    // Row 8
    { name: "Alice Blue", hex: "#F0F8FF" },
    { name: "Midnight", hex: "#191970" },
    { name: "Goldenrod", hex: "#DAA520" },
    { name: "Deep Sky Blue", hex: "#00BFFF" },
    { name: "Chocolate", hex: "#D2691E" },
    { name: "Spring Green", hex: "#00FF7F" },
    { name: "Light Blue", hex: "#ADD8E6" },
    { name: "Medium Orchid", hex: "#BA55D3" }
  ];

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-3xl">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="bg-white text-center py-12 px-8 border-b border-gray-200">
            <h1 className="text-5xl font-bold text-gray-800 mb-3 tracking-wider">DARK WINTER</h1>
            <p className="text-gray-600 uppercase tracking-widest text-sm">12 Season Color Analysis Palette</p>
          </div>
          
          {/* Color Grid */}
          <div className="bg-white p-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4 max-w-6xl mx-auto">
              {palette.map((color, index) => (
                <ColorSwatch
                  key={index}
                  color={color.hex}
                  name={color.name}
                />
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-800 to-white text-center py-8 px-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">Click any color to copy its hex code</p>
          </div>
        </div>
      </div>
    </div>
  );
}
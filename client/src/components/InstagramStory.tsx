import React from 'react';

interface InstagramStoryProps {
  season: string;
  onDownload?: () => void;
}

// Season data mapping
const seasonData: Record<string, {
  icon: string;
  subtitle: string;
  colors: string[];
  characteristics: string[];
  className: string;
}> = {
  'True Winter': {
    icon: '❄️',
    subtitle: 'Cool & Dramatic',
    colors: ['#000080', '#FF1493', '#00FFFF', '#C0C0C0'],
    characteristics: ['✓ Cool undertones', '✓ High contrast', '✓ Dramatic presence'],
    className: 'cool-winter'
  },
  'Bright Winter': {
    icon: '💎',
    subtitle: 'Clear & Vivid',
    colors: ['#FF1493', '#00FFFF', '#0000FF', '#C0C0C0'],
    characteristics: ['✓ High contrast', '✓ Clear & bright', '✓ Vibrant colors pop'],
    className: 'bright-winter'
  },
  'Dark Winter': {
    icon: '🖤',
    subtitle: 'Deep & Cool',
    colors: ['#8B0000', '#191970', '#2F4F4F', '#000000'],
    characteristics: ['✓ Cool undertones', '✓ Deep colors', '✓ Sophisticated drama'],
    className: 'dark-winter'
  },
  'True Summer': {
    icon: '🌊',
    subtitle: 'Cool & Classic',
    colors: ['#6495ED', '#9370DB', '#4682B4', '#708090'],
    characteristics: ['✓ Cool undertones', '✓ Medium contrast', '✓ Classic elegance'],
    className: 'cool-summer'
  },
  'Light Summer': {
    icon: '🌸',
    subtitle: 'Soft & Cool',
    colors: ['#E6E6FA', '#B0C4DE', '#DDA0DD', '#F0E68C'],
    characteristics: ['✓ Cool undertones', '✓ Soft & ethereal', '✓ Delicate pastels'],
    className: 'light-summer'
  },
  'Soft Summer': {
    icon: '🌫️',
    subtitle: 'Muted & Gentle',
    colors: ['#D8BFD8', '#BC8F8F', '#9FB6CD', '#C0C0C0'],
    characteristics: ['✓ Low contrast', '✓ Muted & soft', '✓ Sophisticated blend'],
    className: 'soft-summer'
  },
  'True Spring': {
    icon: '🌻',
    subtitle: 'Golden & Vibrant',
    colors: ['#FF7F50', '#FFD700', '#FF6347', '#FFA500'],
    characteristics: ['✓ Golden undertones', '✓ Warm & glowing', '✓ Sunny disposition'],
    className: 'warm-spring'
  },
  'Bright Spring': {
    icon: '💎',
    subtitle: 'Clear & Vivid',
    colors: ['#FF1493', '#00BFFF', '#FFD700', '#32CD32'],
    characteristics: ['✓ High contrast', '✓ Clear & bright', '✓ Vibrant colors pop'],
    className: 'bright-spring'
  },
  'Light Spring': {
    icon: '🌸',
    subtitle: 'Delicate & Warm',
    colors: ['#FFCBA4', '#FFB6C1', '#98FB98', '#87CEEB'],
    characteristics: ['✓ Light & delicate', '✓ Warm undertones', '✓ Fresh & youthful'],
    className: 'light-spring'
  },
  'True Autumn': {
    icon: '🍁',
    subtitle: 'Rich & Golden',
    colors: ['#D2691E', '#B22222', '#FF8C00', '#8B4513'],
    characteristics: ['✓ True warm tones', '✓ Golden richness', '✓ Earthy vibrancy'],
    className: 'warm-autumn'
  },
  'Dark Autumn': {
    icon: '🌰',
    subtitle: 'Deep & Warm',
    colors: ['#8B4513', '#2F4F4F', '#483D8B', '#556B2F'],
    characteristics: ['✓ Deep warm tones', '✓ Rich & dramatic', '✓ Sophisticated depth'],
    className: 'dark-autumn'
  },
  'Soft Autumn': {
    icon: '🍂',
    subtitle: 'Muted & Warm',
    colors: ['#D2B48C', '#BC8F8F', '#BDB76B', '#8B7355'],
    characteristics: ['✓ Soft warm tones', '✓ Blended coloring', '✓ Gentle earthiness'],
    className: 'soft-autumn'
  }
};

export default function InstagramStory({ season, onDownload }: InstagramStoryProps) {
  const data = seasonData[season];
  
  if (!data) {
    return null;
  }

  const shareImage = async () => {
    const canvas = await generateCanvas();
    
    if (!canvas) return;
    
    if (navigator.share) {
      // Convert canvas to blob for native sharing
      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          const file = new File([blob], `${season.replace(' ', '-').toLowerCase()}-story.png`, { type: 'image/png' });
          try {
            await navigator.share({
              title: `My ${season} Color Analysis`,
              text: `Check out my personal color analysis results!`,
              files: [file]
            });
          } catch (error) {
            // Fallback to download if share fails
            downloadAsImage();
          }
        }
      }, 'image/png');
    } else {
      // Fallback to download for browsers without native share
      downloadAsImage();
    }
  };

  const downloadAsImage = async () => {
    const canvas = await generateCanvas();
    
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `${season.replace(' ', '-').toLowerCase()}-story.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    if (onDownload) {
      onDownload();
    }
  };

  const generateCanvas = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return canvas;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    // Season-specific gradients
    switch (season) {
      case 'Light Spring':
        gradient.addColorStop(0, '#FFE5E5');
        gradient.addColorStop(0.33, '#FFE5B4');
        gradient.addColorStop(0.66, '#E5FFE5');
        gradient.addColorStop(1, '#E5F3FF');
        break;
      case 'True Spring':
        gradient.addColorStop(0, '#FFCC99');
        gradient.addColorStop(0.33, '#FFB380');
        gradient.addColorStop(0.66, '#FFD700');
        gradient.addColorStop(1, '#FF8C69');
        break;
      case 'Bright Spring':
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(0.33, '#00CED1');
        gradient.addColorStop(0.66, '#FFD700');
        gradient.addColorStop(1, '#32CD32');
        break;
      case 'Light Summer':
        gradient.addColorStop(0, '#E6E6FA');
        gradient.addColorStop(0.33, '#B0C4DE');
        gradient.addColorStop(0.66, '#DDA0DD');
        gradient.addColorStop(1, '#F0E68C');
        break;
      case 'True Summer':
        gradient.addColorStop(0, '#778899');
        gradient.addColorStop(0.33, '#B0C4DE');
        gradient.addColorStop(0.66, '#9370DB');
        gradient.addColorStop(1, '#4682B4');
        break;
      case 'Soft Summer':
        gradient.addColorStop(0, '#D8BFD8');
        gradient.addColorStop(0.33, '#BC8F8F');
        gradient.addColorStop(0.66, '#9FB6CD');
        gradient.addColorStop(1, '#C0C0C0');
        break;
      case 'Soft Autumn':
        gradient.addColorStop(0, '#D2B48C');
        gradient.addColorStop(0.33, '#BC8F8F');
        gradient.addColorStop(0.66, '#BDB76B');
        gradient.addColorStop(1, '#8B7355');
        break;
      case 'True Autumn':
        gradient.addColorStop(0, '#D2691E');
        gradient.addColorStop(0.33, '#B22222');
        gradient.addColorStop(0.66, '#FF8C00');
        gradient.addColorStop(1, '#8B4513');
        break;
      case 'Dark Autumn':
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(0.33, '#2F4F4F');
        gradient.addColorStop(0.66, '#483D8B');
        gradient.addColorStop(1, '#556B2F');
        break;
      case 'Bright Winter':
        gradient.addColorStop(0, '#000080');
        gradient.addColorStop(0.33, '#FF1493');
        gradient.addColorStop(0.66, '#00FFFF');
        gradient.addColorStop(1, '#C0C0C0');
        break;
      case 'True Winter':
        gradient.addColorStop(0, '#4169E1');
        gradient.addColorStop(0.33, '#DC143C');
        gradient.addColorStop(0.66, '#4B0082');
        gradient.addColorStop(1, '#191970');
        break;
      case 'Dark Winter':
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(0.33, '#8B0000');
        gradient.addColorStop(0.66, '#191970');
        gradient.addColorStop(1, '#2F4F4F');
        break;
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text content
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // AI Badge - top section
    ctx.font = 'bold 24px Inter';
    ctx.fillText('✨ AI Color Analysis', canvas.width / 2, 200);
    
    // "I'm a" title - upper section
    ctx.font = '900 72px Inter';
    ctx.fillText("I'M A", canvas.width / 2, 400);
    
    // Season icon - center section
    ctx.font = '96px Arial';
    ctx.fillText(data.icon, canvas.width / 2, 600);
    
    // Season name - center section
    ctx.font = '800 100px Inter';
    const seasonLines = season.toUpperCase().split(' ');
    seasonLines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, 780 + (index * 120));
    });
    
    // Subtitle - lower center
    ctx.font = '300 40px Inter';
    ctx.fillText(data.subtitle, canvas.width / 2, 1200);
    
    // Handle - bottom section
    ctx.font = '600 32px Inter';
    ctx.fillText('@hazelandhue', canvas.width / 2, 1750);

    return canvas;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Share Your Results!</h2>
          <p className="text-gray-600">Download your personalized Instagram story</p>
        </div>
        
        {/* Preview */}
        <div className="relative w-full aspect-[9/16] bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-xl overflow-hidden mb-6"
             style={{
               background: season === 'Light Spring' ? 'linear-gradient(135deg, #FFE5E5, #FFE5B4, #E5FFE5, #E5F3FF)' :
                          season === 'True Spring' ? 'linear-gradient(135deg, #FFCC99, #FFB380, #FFD700, #FF8C69)' :
                          season === 'Bright Spring' ? 'linear-gradient(135deg, #FF69B4, #00CED1, #FFD700, #32CD32)' :
                          season === 'Light Summer' ? 'linear-gradient(135deg, #E6E6FA, #B0C4DE, #DDA0DD, #F0E68C)' :
                          season === 'True Summer' ? 'linear-gradient(135deg, #778899, #B0C4DE, #9370DB, #4682B4)' :
                          season === 'Soft Summer' ? 'linear-gradient(135deg, #D8BFD8, #BC8F8F, #9FB6CD, #C0C0C0)' :
                          season === 'Soft Autumn' ? 'linear-gradient(135deg, #D2B48C, #BC8F8F, #BDB76B, #8B7355)' :
                          season === 'True Autumn' ? 'linear-gradient(135deg, #D2691E, #B22222, #FF8C00, #8B4513)' :
                          season === 'Dark Autumn' ? 'linear-gradient(135deg, #8B4513, #2F4F4F, #483D8B, #556B2F)' :
                          season === 'Bright Winter' ? 'linear-gradient(135deg, #000080, #FF1493, #00FFFF, #C0C0C0)' :
                          season === 'True Winter' ? 'linear-gradient(135deg, #4169E1, #DC143C, #4B0082, #191970)' :
                          season === 'Dark Winter' ? 'linear-gradient(135deg, #000000, #8B0000, #191970, #2F4F4F)' :
                          'linear-gradient(135deg, #FF69B4, #00CED1, #FFD700, #32CD32)'
             }}>
          <div className="absolute inset-0 flex flex-col items-center justify-between p-4 text-white text-center">
            <div>
              <div className="text-xs mb-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
                ✨ AI Color Analysis
              </div>
              <div className="text-lg font-black">I'M A</div>
            </div>
            
            <div>
              <div className="text-2xl mb-2">{data.icon}</div>
              <div className="text-lg font-bold leading-tight">
                {season.toUpperCase().split(' ').map((word, index) => (
                  <div key={index}>{word}</div>
                ))}
              </div>
              <div className="text-xs mt-1 opacity-90">{data.subtitle}</div>
            </div>
            
            <div className="text-xs">@hazelandhue</div>
          </div>
        </div>

        {/* Color palette preview */}
        <div className="flex justify-center gap-2 mb-6">
          {data.colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-lg shadow-md"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={shareImage}
            className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
          >
            Share
          </button>
          <button
            onClick={() => onDownload && onDownload()}
            className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Perfect for Instagram Stories • 1080x1920px
        </p>
      </div>
    </div>
  );
}
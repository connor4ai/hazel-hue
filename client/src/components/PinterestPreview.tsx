import { useState, useEffect } from 'react';
import { ExternalLink, Grid, User } from 'lucide-react';

interface PinterestPreviewProps {
  url: string;
  className?: string;
  season?: string; // Add season prop for themed visuals
}

interface PinterestData {
  title: string;
  description?: string;
  author_name?: string;
  author_url?: string;
  provider_name: string;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  html?: string;
  type: string;
}

// Season color palettes for themed thumbnails
const getSeasonColors = (season?: string) => {
  switch (season?.toLowerCase()) {
    case 'light spring':
      return ['bg-gradient-to-br from-pink-300 to-pink-400', 'bg-gradient-to-br from-orange-300 to-red-400', 'bg-gradient-to-br from-orange-200 to-orange-400', 'bg-gradient-to-br from-yellow-300 to-yellow-400', 'bg-gradient-to-br from-green-300 to-green-400', 'bg-gradient-to-br from-blue-300 to-blue-400'];
    case 'true spring':
      return ['bg-gradient-to-br from-orange-400 to-orange-500', 'bg-gradient-to-br from-yellow-400 to-yellow-500', 'bg-gradient-to-br from-green-400 to-green-500', 'bg-gradient-to-br from-blue-400 to-blue-500', 'bg-gradient-to-br from-red-400 to-red-500', 'bg-gradient-to-br from-purple-400 to-purple-500'];
    case 'bright spring':
      return ['bg-gradient-to-br from-emerald-400 to-emerald-500', 'bg-gradient-to-br from-cyan-400 to-cyan-500', 'bg-gradient-to-br from-pink-400 to-pink-500', 'bg-gradient-to-br from-yellow-400 to-yellow-500', 'bg-gradient-to-br from-red-400 to-red-500', 'bg-gradient-to-br from-blue-400 to-blue-500'];
    case 'light summer':
      return ['bg-gradient-to-br from-blue-200 to-blue-300', 'bg-gradient-to-br from-pink-200 to-pink-300', 'bg-gradient-to-br from-purple-200 to-purple-300', 'bg-gradient-to-br from-gray-200 to-gray-300', 'bg-gradient-to-br from-green-200 to-green-300', 'bg-gradient-to-br from-slate-200 to-slate-300'];
    case 'true summer':
      return ['bg-gradient-to-br from-blue-400 to-blue-500', 'bg-gradient-to-br from-purple-400 to-purple-500', 'bg-gradient-to-br from-pink-400 to-pink-500', 'bg-gradient-to-br from-gray-400 to-gray-500', 'bg-gradient-to-br from-green-400 to-green-500', 'bg-gradient-to-br from-slate-400 to-slate-500'];
    case 'soft summer':
      return ['bg-gradient-to-br from-slate-300 to-slate-400', 'bg-gradient-to-br from-blue-300 to-blue-400', 'bg-gradient-to-br from-purple-300 to-purple-400', 'bg-gradient-to-br from-pink-300 to-pink-400', 'bg-gradient-to-br from-gray-300 to-gray-400', 'bg-gradient-to-br from-green-300 to-green-400'];
    case 'true autumn':
      return ['bg-gradient-to-br from-orange-500 to-orange-600', 'bg-gradient-to-br from-amber-500 to-amber-600', 'bg-gradient-to-br from-red-500 to-red-600', 'bg-gradient-to-br from-yellow-500 to-yellow-600', 'bg-gradient-to-br from-green-500 to-green-600', 'bg-gradient-to-br from-brown-500 to-brown-600'];
    case 'soft autumn':
      return ['bg-gradient-to-br from-amber-400 to-amber-500', 'bg-gradient-to-br from-orange-400 to-orange-500', 'bg-gradient-to-br from-yellow-400 to-yellow-500', 'bg-gradient-to-br from-green-400 to-green-500', 'bg-gradient-to-br from-red-400 to-red-500', 'bg-gradient-to-br from-stone-400 to-stone-500'];
    case 'dark autumn':
      return ['bg-gradient-to-br from-red-600 to-red-700', 'bg-gradient-to-br from-orange-600 to-orange-700', 'bg-gradient-to-br from-amber-600 to-amber-700', 'bg-gradient-to-br from-green-600 to-green-700', 'bg-gradient-to-br from-yellow-600 to-yellow-700', 'bg-gradient-to-br from-brown-600 to-brown-700'];
    case 'true winter':
      return ['bg-gradient-to-br from-blue-600 to-blue-700', 'bg-gradient-to-br from-red-600 to-red-700', 'bg-gradient-to-br from-purple-600 to-purple-700', 'bg-gradient-to-br from-pink-600 to-pink-700', 'bg-gradient-to-br from-gray-600 to-gray-700', 'bg-gradient-to-br from-black to-gray-800'];
    case 'bright winter':
      return ['bg-gradient-to-br from-blue-500 to-blue-600', 'bg-gradient-to-br from-red-500 to-red-600', 'bg-gradient-to-br from-purple-500 to-purple-600', 'bg-gradient-to-br from-pink-500 to-pink-600', 'bg-gradient-to-br from-green-500 to-green-600', 'bg-gradient-to-br from-yellow-500 to-yellow-600'];
    case 'dark winter':
      return ['bg-gradient-to-br from-gray-700 to-gray-800', 'bg-gradient-to-br from-blue-700 to-blue-800', 'bg-gradient-to-br from-purple-700 to-purple-800', 'bg-gradient-to-br from-red-700 to-red-800', 'bg-gradient-to-br from-green-700 to-green-800', 'bg-gradient-to-br from-black to-gray-900'];
    default:
      return ['bg-gradient-to-br from-red-400 to-red-500', 'bg-gradient-to-br from-pink-400 to-pink-500', 'bg-gradient-to-br from-orange-400 to-orange-500', 'bg-gradient-to-br from-rose-400 to-rose-500', 'bg-gradient-to-br from-amber-400 to-amber-500', 'bg-gradient-to-br from-yellow-400 to-yellow-500'];
  }
};

export function PinterestPreview({ url, className = "", season }: PinterestPreviewProps) {
  const [data, setData] = useState<PinterestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinterestData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use our server-side Pinterest preview endpoint
        const response = await fetch(`/api/pinterest/preview?url=${encodeURIComponent(url)}`);
        
        if (response.ok) {
          const previewData = await response.json();
          setData(previewData);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch Pinterest preview');
        }

      } catch (err) {
        console.error('Error fetching Pinterest data:', err);
        setError('Failed to load Pinterest preview');
      } finally {
        setLoading(false);
      }
    };

    if (url && (url.includes('pinterest.com') || url.includes('pin.it'))) {
      fetchPinterestData();
    } else {
      setLoading(false);
    }
  }, [url]);

  if (loading) {
    return (
      <div className={`border rounded-lg p-4 animate-pulse bg-white ${className}`}>
        <div className="flex space-x-3">
          <div className="w-16 h-16 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`border border-red-200 rounded-lg p-4 bg-red-50 ${className}`}>
        <div className="flex items-center space-x-2 text-red-600">
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">Pinterest preview unavailable</span>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm underline mt-1 block"
        >
          View on Pinterest →
        </a>
      </div>
    );
  }

  const isPinBoard = data.type === 'board' || url.includes('/boards/') || url.split('/').length > 4;
  const IconComponent = isPinBoard ? Grid : User;

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white hover:border-red-300 ${className}`}>
      {/* Pinterest Brand Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600">
        <div className="flex items-center space-x-2 text-white">
          <IconComponent className="w-4 h-4" />
          <span className="text-sm font-medium">Pinterest {isPinBoard ? 'Board' : 'Profile'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex space-x-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            {data.thumbnail_url ? (
              <img 
                src={data.thumbnail_url} 
                alt={data.title}
                className="w-16 h-16 rounded-lg object-cover border border-red-200"
                onError={(e) => {
                  // Fallback to Pinterest-style visual if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-red-100 to-pink-100 border border-red-200 flex items-center justify-center">
                      <div class="grid grid-cols-2 gap-1 w-6 h-6">
                        <div class="bg-red-400 rounded-sm"></div>
                        <div class="bg-pink-400 rounded-sm"></div>
                        <div class="bg-orange-400 rounded-sm"></div>
                        <div class="bg-red-300 rounded-sm"></div>
                      </div>
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-100 to-pink-100 border border-red-200 flex items-center justify-center overflow-hidden">
                {/* Season-themed Pinterest visual with color samples */}
                <div className="w-full h-full relative">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50"></div>
                  
                  {/* Color palette preview using season colors */}
                  <div className="absolute inset-1 grid grid-cols-3 gap-0.5">
                    {getSeasonColors(season).map((colorClass, index) => (
                      <div key={index} className={`${colorClass} rounded-sm`}></div>
                    ))}
                  </div>
                  
                  {/* Pinterest P icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-[8px] font-bold text-red-600">P</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
              {data.title}
            </h3>
            
            {data.description && (
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {data.description}
              </p>
            )}

            {data.author_name && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <User className="w-3 h-3" />
                <span>by {data.author_name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <a 
          href={url}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
        >
          <span>View on Pinterest</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// Enhanced Pinterest embed component using Pinterest's widget
interface PinterestEmbedProps {
  url: string;
  className?: string;
  width?: number;
  height?: number;
}

export function PinterestEmbed({ url, className = "", width = 345, height = 400 }: PinterestEmbedProps) {
  const [embedCode, setEmbedCode] = useState<string>('');

  useEffect(() => {
    // Load Pinterest's pinit.js script
    const script = document.createElement('script');
    script.src = 'https://assets.pinterest.com/js/pinit.js';
    script.async = true;
    script.setAttribute('data-pin-hover', 'true');
    document.body.appendChild(script);

    // Generate embed code based on URL type
    const generateEmbedCode = () => {
      const urlParts = url.split('/');
      const isBoard = urlParts.length > 4 && !url.includes('/pin/');
      
      if (isBoard) {
        // Board embed
        return `<a data-pin-do="embedBoard" data-pin-board-width="${width}" data-pin-scale-height="${height}" data-pin-scale-width="80" href="${url}"></a>`;
      } else if (url.includes('/pin/')) {
        // Pin embed
        return `<a data-pin-do="embedPin" data-pin-width="medium" href="${url}"></a>`;
      } else {
        // Profile embed
        return `<a data-pin-do="embedUser" data-pin-board-width="${width}" data-pin-scale-height="${height}" data-pin-scale-width="80" href="${url}"></a>`;
      }
    };

    setEmbedCode(generateEmbedCode());

    return () => {
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="https://assets.pinterest.com/js/pinit.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [url, width, height]);

  return (
    <div 
      className={`pinterest-embed ${className}`}
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
}
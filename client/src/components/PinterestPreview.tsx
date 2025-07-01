import { useState, useEffect } from 'react';
import { ExternalLink, Grid, User } from 'lucide-react';

interface PinterestPreviewProps {
  url: string;
  className?: string;
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

export function PinterestPreview({ url, className = "" }: PinterestPreviewProps) {
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
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-100 to-pink-100 border border-red-200 flex items-center justify-center">
              <Grid className="w-8 h-8 text-red-500" />
            </div>
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
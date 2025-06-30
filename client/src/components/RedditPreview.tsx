import { useState, useEffect } from 'react';
import { ExternalLink, MessageSquare, ArrowUp } from 'lucide-react';

interface RedditPreviewProps {
  url: string;
  className?: string;
}

interface RedditPost {
  title: string;
  selftext: string;
  author: string;
  subreddit: string;
  score: number;
  num_comments: number;
  created_utc: number;
  permalink: string;
  url: string;
  thumbnail?: string;
  preview?: {
    images: Array<{
      source: { url: string; width: number; height: number };
    }>;
  };
}

export function RedditPreview({ url, className = "" }: RedditPreviewProps) {
  const [post, setPost] = useState<RedditPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRedditPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convert Reddit URL to JSON API format
        let jsonUrl = url;
        if (url.includes('reddit.com')) {
          // Remove any trailing slashes and add .json
          jsonUrl = url.replace(/\/$/, '') + '.json';
        }

        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch Reddit post');
        }

        const data = await response.json();
        
        // Reddit API returns an array with post data in the first element
        const postData = data[0]?.data?.children?.[0]?.data;
        
        if (!postData) {
          throw new Error('Invalid Reddit post data');
        }

        setPost(postData);
      } catch (err) {
        console.error('Error fetching Reddit post:', err);
        setError('Failed to load Reddit preview');
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchRedditPost();
    }
  }, [url]);

  if (loading) {
    return (
      <div className={`border rounded-lg p-4 animate-pulse ${className}`}>
        <div className="flex space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={`border border-red-200 rounded-lg p-4 bg-red-50 ${className}`}>
        <div className="flex items-center space-x-2 text-red-600">
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">Reddit preview unavailable</span>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm underline mt-1 block"
        >
          View on Reddit →
        </a>
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const getImageUrl = () => {
    if (post.preview?.images?.[0]?.source?.url) {
      return post.preview.images[0].source.url.replace(/&amp;/g, '&');
    }
    if (post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default') {
      return post.thumbnail;
    }
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-medium text-orange-600">r/{post.subreddit}</span>
          <span>•</span>
          <span>u/{post.author}</span>
          <span>•</span>
          <span>{formatTime(post.created_utc)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
          {post.title}
        </h3>

        {/* Image if available */}
        {imageUrl && (
          <div className="mb-3">
            <img 
              src={imageUrl} 
              alt={post.title}
              className="w-full max-h-64 object-cover rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Post text preview */}
        {post.selftext && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {post.selftext.substring(0, 200)}
            {post.selftext.length > 200 && '...'}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <ArrowUp className="w-4 h-4" />
            <span>{post.score > 1000 ? `${(post.score / 1000).toFixed(1)}k` : post.score}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>{post.num_comments > 1000 ? `${(post.num_comments / 1000).toFixed(1)}k` : post.num_comments}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <a 
          href={`https://reddit.com${post.permalink}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          <span>View on Reddit</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// Alternative component using Reddit's native embed (for fallback)
interface RedditEmbedProps {
  url: string;
  className?: string;
}

export function RedditEmbed({ url, className = "" }: RedditEmbedProps) {
  useEffect(() => {
    // Load Reddit's embed script
    const script = document.createElement('script');
    script.src = 'https://embed.reddit.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="https://embed.reddit.com/widgets.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className={className}>
      <blockquote 
        className="reddit-embed-bq" 
        style={{ height: '500px' }}
        data-embed-media="www.redditmedia.com"
        data-embed-parent="false"
        data-embed-live="false"
        data-embed-uuid="12345"
      >
        <a href={url}>View Reddit Post</a>
      </blockquote>
    </div>
  );
}
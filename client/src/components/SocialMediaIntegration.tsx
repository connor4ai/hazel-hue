import { useEffect, useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Heart, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialMediaIntegrationProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
}

export const SocialMediaIntegration = ({ 
  url = window.location.href,
  title = "AI Color Analysis Free | Find Your Seasonal Colors in 60 Seconds - Hazel & Hue",
  description = "Discover your perfect color palette with our free AI color analysis. Get instant seasonal color recommendations for clothing, makeup, and hair.",
  image = "https://hazelandhue.com/og-image.jpg"
}: SocialMediaIntegrationProps) => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported
    setIsSupported('share' in navigator);
    
    // Add social media meta tags for better sharing
    const addMetaTag = (property: string, content: string) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Open Graph tags
    addMetaTag('og:url', url);
    addMetaTag('og:title', title);
    addMetaTag('og:description', description);
    addMetaTag('og:image', image);
    addMetaTag('og:type', 'website');
    
    // Twitter Card tags
    addMetaTag('twitter:card', 'summary_large_image');
    addMetaTag('twitter:title', title);
    addMetaTag('twitter:description', description);
    addMetaTag('twitter:image', image);
    
    // Add structured data for social validation
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Hazel & Hue",
      "url": "https://hazelandhue.com",
      "sameAs": [
        "https://www.facebook.com/hazelandhue",
        "https://www.instagram.com/hazelandhue",
        "https://twitter.com/hazelandhue",
        "https://www.pinterest.com/hazelandhue"
      ],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://hazelandhue.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    
    if (!document.querySelector('script[data-social-schema]')) {
      script.setAttribute('data-social-schema', 'true');
      document.head.appendChild(script);
    }
  }, [url, title, description, image]);

  const shareData = {
    title,
    text: description,
    url
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    instagram: 'https://www.instagram.com/' // Instagram doesn't support direct URL sharing
  };

  const openShare = (platform: keyof typeof shareUrls) => {
    if (platform === 'instagram') {
      // For Instagram, copy link to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard! You can paste it in your Instagram story or bio.');
      return;
    }
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="social-media-integration">
      {/* Native Share Button */}
      {isSupported && (
        <Button
          onClick={handleNativeShare}
          variant="outline"
          size="sm"
          className="mr-2 mb-2"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      )}

      {/* Social Media Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => openShare('facebook')}
          variant="outline"
          size="sm"
          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>

        <Button
          onClick={() => openShare('twitter')}
          variant="outline"
          size="sm"
          className="border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>

        <Button
          onClick={() => openShare('linkedin')}
          variant="outline"
          size="sm"
          className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>

        <Button
          onClick={() => openShare('whatsapp')}
          variant="outline"
          size="sm"
          className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>

        <Button
          onClick={() => openShare('instagram')}
          variant="outline"
          size="sm"
          className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
        >
          <Instagram className="h-4 w-4 mr-2" />
          Instagram
        </Button>
      </div>
    </div>
  );
};

// Social Signals Component for SEO
export const SocialSignals = () => {
  useEffect(() => {
    // Track social engagement for SEO
    const trackSocialEngagement = (platform: string) => {
      // Send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'social_engagement', {
          platform: platform,
          action: 'share',
          content_type: 'color_analysis'
        });
      }
    };

    // Listen for social share events
    const handleSocialShare = (event: CustomEvent) => {
      trackSocialEngagement(event.detail.platform);
    };

    window.addEventListener('social-share', handleSocialShare as EventListener);
    
    return () => {
      window.removeEventListener('social-share', handleSocialShare as EventListener);
    };
  }, []);

  return (
    <div className="social-signals">
      {/* Social proof indicators */}
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Heart className="h-4 w-4 mr-1 text-red-500" />
          <span>2.8k+ shares</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1 text-blue-500" />
          <span>15k+ users</span>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 mr-1 text-yellow-500" />
          <span>4.8/5 rating</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to trigger social share events
export const triggerSocialShare = (platform: string) => {
  const event = new CustomEvent('social-share', {
    detail: { platform }
  });
  window.dispatchEvent(event);
};
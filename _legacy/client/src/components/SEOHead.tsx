import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  structuredData?: object;
}

export function SEOHead({ 
  title, 
  description, 
  path = '/', 
  ogImage = 'https://hazelandhue.com/og-cover.jpg',
  structuredData 
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    const fullUrl = `https://hazelandhue.com${path}`;
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = fullUrl;
      document.head.appendChild(link);
    }
    
    // Enhanced keywords based on page content
    const enhancedKeywords = [
      'color analysis', 'AI color analysis', 'personal color analysis', 'seasonal color analysis',
      'color analysis online', 'AI color matching', 'virtual color analysis', 'digital color analysis',
      'personal color test', 'color consultant', 'color palette finder', '12 season color analysis',
      'seasonal colors', 'color season test', 'best color analysis', 'professional color analysis',
      'AI makeup recommendations', 'personal color profile', 'color analysis service',
      'color matching app', 'online color consultation', 'seasonal color typing',
      'personal styling', 'style guide', 'color theory', 'personal branding', 'wardrobe planning',
      'color palette generator', 'AI beauty analysis', 'personalized color recommendations'
    ].join(', ');
    
    // Update or create keywords meta tag
    const updateMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.name = name;
        newMeta.content = content;
        document.head.appendChild(newMeta);
      }
    };
    
    // Add enhanced meta tags
    updateMetaName('keywords', enhancedKeywords);
    updateMetaName('author', 'Hazel & Hue');
    updateMetaName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaName('googlebot', 'index, follow');
    updateMetaName('bingbot', 'index, follow');
    updateMetaName('theme-color', '#6B7A6B');
    updateMetaName('msapplication-TileColor', '#6B7A6B');
    updateMetaName('mobile-web-app-capable', 'yes');
    updateMetaName('apple-mobile-web-app-capable', 'yes');
    updateMetaName('apple-mobile-web-app-status-bar-style', 'default');
    
    // Update Open Graph tags
    const updateMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };
    
    updateMetaProperty('og:type', 'website');
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:url', fullUrl);
    updateMetaProperty('og:image', ogImage);
    
    // Add structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      // Cleanup function to remove script when component unmounts
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [title, description, path, ogImage, structuredData]);
  
  return null;
}
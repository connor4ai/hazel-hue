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
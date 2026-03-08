import { useEffect } from 'react';

// Using document.head manipulation instead of react-helmet-async to avoid context issues

interface ChampionshipSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
  alternateLanguages?: Array<{ hreflang: string; href: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqData?: Array<{ question: string; answer: string }>;
}

export function ChampionshipSEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = '/og-image-default.jpg',
  structuredData,
  alternateLanguages = [],
  breadcrumbs = [],
  faqData = []
}: ChampionshipSEOProps) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hazelandhue.com';
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  // Enhanced structured data
  const enhancedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Hazel & Hue",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512
        },
        "description": "AI-powered personal color analysis platform providing professional 12-season color matching",
        "foundingDate": "2025",
        "serviceArea": {
          "@type": "Place",
          "name": "Worldwide"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Worldwide"
        },
        "sameAs": [
          "https://www.instagram.com/hazelandhue",
          "https://www.tiktok.com/@hazelandhue",
          "https://www.facebook.com/hazelandhue"
        ]
      },
      // Website
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Hazel & Hue",
        "description": "Professional AI color analysis platform",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      // Service
      {
        "@type": "Service",
        "@id": `${baseUrl}/#service`,
        "name": "AI Color Analysis",
        "description": "Professional 12-season color analysis using advanced AI technology",
        "provider": {
          "@id": `${baseUrl}/#organization`
        },
        "serviceType": "Color Analysis",
        "category": "Beauty and Personal Care",
        "offers": {
          "@type": "Offer",
          "name": "AI Color Analysis Service",
          "description": "Instant professional color analysis with personalized recommendations",
          "price": "29.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2025-01-01",
          "priceValidUntil": "2025-12-31"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Color Analysis Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Basic AI Color Analysis",
                "description": "Comprehensive color analysis with seasonal recommendations"
              }
            }
          ]
        }
      },
      // Breadcrumbs
      ...(breadcrumbs.length > 0 ? [{
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": `${baseUrl}${crumb.url}`
        }))
      }] : []),
      // FAQ
      ...(faqData.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": faqData.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : []),
      // Custom structured data
      ...(structuredData ? [structuredData] : [])
    ]
  };

  // Championship SEO optimization via useEffect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Update document title
      if (title) {
        document.title = title;
      }
      
      // Update meta description
      if (description) {
        let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;
      }
      
      // Update meta keywords
      if (keywords.length > 0) {
        let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.name = 'keywords';
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = keywords.join(', ');
      }
    }
  }, [title, description, keywords]);

  return (
    <div style={{ display: 'none' }}>
      {/* Championship SEO component - meta tags updated via useEffect */}
    </div>
  );
}
import { Helmet } from 'react-helmet-async';

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

  return (
    <Helmet>
      {/* Enhanced Title Optimization */}
      <title>{title}</title>
      
      {/* Meta Tags */}
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Alternate Languages */}
      {alternateLanguages.map(lang => (
        <link
          key={lang.hreflang}
          rel="alternate"
          hrefLang={lang.hreflang}
          href={lang.href}
        />
      ))}
      
      {/* Open Graph Enhanced */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hazel & Hue" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hazelandhue" />
      <meta name="twitter:creator" content="@hazelandhue" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Hazel & Hue" />
      <meta name="publisher" content="Hazel & Hue" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Hazel & Hue" />
      
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(enhancedStructuredData, null, 2)}
      </script>
    </Helmet>
  );
}
import { useEffect } from 'react';

interface AdvancedSEOProps {
  page: 'home' | 'upload' | 'faqs' | 'results' | 'checkout';
  additionalKeywords?: string[];
  businessInfo?: {
    rating?: number;
    reviewCount?: number;
    priceRange?: string;
  };
}

export function AdvancedSEO({ page, additionalKeywords = [], businessInfo }: AdvancedSEOProps) {
  useEffect(() => {
    // Add page-specific keywords to meta
    const keywordMeta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (keywordMeta && additionalKeywords.length > 0) {
      const currentKeywords = keywordMeta.content;
      const allKeywords = currentKeywords.split(', ').concat(additionalKeywords);
      const uniqueKeywords = allKeywords.filter((keyword, index) => allKeywords.indexOf(keyword) === index);
      keywordMeta.content = uniqueKeywords.join(', ');
    }

    // Add structured data for aggregate rating if available
    if (businessInfo?.rating && businessInfo?.reviewCount) {
      const ratingScript = document.createElement('script');
      ratingScript.type = 'application/ld+json';
      ratingScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "itemReviewed": {
          "@type": "Service",
          "name": "Hazel & Hue Color Analysis"
        },
        "ratingValue": businessInfo.rating,
        "reviewCount": businessInfo.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      });
      document.head.appendChild(ratingScript);
      
      return () => {
        document.head.removeChild(ratingScript);
      };
    }
  }, [page, additionalKeywords, businessInfo]);

  // Page-specific structured data
  const pageStructuredData = {
    home: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Hazel & Hue",
      "serviceType": "Personal Color Analysis",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US",
        "addressRegion": "Online",
        "addressLocality": "Worldwide"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "provider": {
        "@type": "Organization",
        "name": "Hazel & Hue",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US",
          "addressRegion": "Online",
          "addressLocality": "Worldwide"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Color Analysis Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Color Analysis",
              "description": "30-second AI-powered seasonal color analysis"
            },
            "price": "29.99",
            "priceCurrency": "USD"
          }
        ]
      }
    },
    upload: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Upload Photos for Color Analysis",
      "description": "Step-by-step guide to upload photos for AI color analysis",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Take clear selfies",
          "text": "Take 3 clear selfies in natural lighting without makeup"
        },
        {
          "@type": "HowToStep", 
          "name": "Upload photos",
          "text": "Upload your photos using our secure upload system"
        },
        {
          "@type": "HowToStep",
          "name": "Get results",
          "text": "Receive your personalized color analysis in 30 seconds"
        }
      ]
    },
    faqs: null, // Already handled in FAQs component
    results: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Personal Color Analysis Report",
      "description": "Comprehensive 12-season color analysis with personalized recommendations"
    },
    checkout: {
      "@context": "https://schema.org",
      "@type": "PaymentChargeSpecification",
      "appliesToPaymentMethod": ["CreditCard", "PayPal"],
      "paymentMethodId": "stripe"
    }
  };

  const currentPageData = pageStructuredData[page];

  return (
    <>
      {currentPageData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(currentPageData) }}
        />
      )}
    </>
  );
}
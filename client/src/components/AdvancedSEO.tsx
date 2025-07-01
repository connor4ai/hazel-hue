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

    // Note: AggregateRating is embedded within LocalBusiness schemas instead of standalone
    // to avoid Google Rich Results validation issues with itemReviewed field
  }, [page, additionalKeywords, businessInfo]);

  // Page-specific structured data
  const pageStructuredData = {
    home: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Hazel & Hue",
      "serviceType": "Personal Color Analysis",
      "telephone": "+1-800-HAZEL-HUE",
      "priceRange": "$29.99",
      "image": "https://hazelandhue.com/og-image.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Online Platform",
        "addressLocality": "Worldwide",
        "addressRegion": "Online",
        "postalCode": "00000",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "provider": {
        "@type": "Organization",
        "name": "Hazel & Hue",
        "telephone": "+1-800-HAZEL-HUE",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Online Platform",
          "addressLocality": "Worldwide",
          "addressRegion": "Online",
          "postalCode": "00000",
          "addressCountry": "US"
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
  
  // Debug log to verify rendering
  console.log('AdvancedSEO rendering for page:', page, 'with data:', currentPageData ? 'present' : 'missing');

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
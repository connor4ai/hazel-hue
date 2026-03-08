export const siteMetadata = {
  title: "Hazel & Hue | AI-Powered Personal Color Analysis",
  description: "Discover your perfect colors with AI-powered seasonal color analysis. Get personalized color palettes, makeup recommendations, and style guidance in 30 seconds.",
  url: "https://hazelandhue.com",
  siteName: "Hazel & Hue",
  image: "/og-image.png",
  twitterCard: "summary_large_image",
  locale: "en_US",
  type: "website",
  keywords: [
    "color analysis",
    "personal color analysis", 
    "seasonal color analysis",
    "AI color analysis",
    "color palette",
    "color consultant",
    "personal styling",
    "color matching",
    "12 season color analysis",
    "color theory",
    "style consultation",
    "personal color test"
  ]
};

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hazel & Hue",
  "description": "AI-powered personal color analysis service providing 12-season color matching and personalized style recommendations",
  "url": "https://hazelandhue.com",
  "logo": "https://hazelandhue.com/logo.png",
  "image": "https://hazelandhue.com/og-image.png",
  "telephone": "+1-555-HAZEL-HUE",
  "email": "hello@hazelandhue.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "39.8283",
      "longitude": "-98.5795"
    },
    "geoRadius": "5000000"
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
          "description": "Comprehensive 12-season personal color analysis with AI technology"
        },
        "price": "29.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    ]
  },

  "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
  "paymentAccepted": "Cash, Credit Card, PayPal, Apple Pay, Google Pay"
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the AI color analysis work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI analyzes your uploaded photos using advanced computer vision to determine your skin tone, hair color, and eye color. It then matches you to one of 12 seasonal color types and provides personalized color recommendations."
      }
    },
    {
      "@type": "Question", 
      "name": "How accurate is the AI analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI has been trained on thousands of professional color analysis sessions and achieves 95% accuracy in seasonal color type determination when provided with high-quality photos in natural lighting."
      }
    },
    {
      "@type": "Question",
      "name": "What photos do I need to upload?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload 3 clear selfies: one face-on in natural lighting without makeup, one profile shot, and one showing your natural hair color. Avoid filters, heavy makeup, or artificial lighting for best results."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in my color analysis report?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You'll receive a comprehensive 6-page PDF report with your seasonal color type, 64-color personalized palette, makeup recommendations, clothing guidance, jewelry suggestions, and personalized Pinterest style board."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the analysis take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once you upload your photos and complete payment, your AI color analysis is processed in approximately 30 seconds. You'll receive your results via email immediately."
      }
    }
  ]
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI-Powered Personal Color Analysis",
  "description": "Professional 12-season color analysis using artificial intelligence to determine your optimal color palette",
  "provider": {
    "@type": "Organization",
    "name": "Hazel & Hue"
  },
  "serviceType": "Personal Color Consultation",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Color Analysis Package",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Complete Color Analysis"
        },
        "price": "29.99",
        "priceCurrency": "USD"
      }
    ]
  }
};
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hazel & Hue",
  "url": "https://hazelandhue.com",
  "description": "Professional AI-powered color analysis platform providing 12-season color analysis and personalized style recommendations",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hazelandhue.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hazel & Hue",
  "url": "https://hazelandhue.com",
  "logo": "https://hazelandhue.com/logo.png",
  "description": "Leading AI-powered personal color analysis platform",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "Online",
    "addressLocality": "Worldwide"
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "jayda@hazelandhue.com",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://pinterest.com/hazelandhue",
    "https://instagram.com/hazelandhue"
  ]
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Color Analysis",
  "description": "Professional 12-season color analysis using advanced AI technology",
  "provider": organizationSchema,
  "serviceType": "Personal Color Analysis",
  "category": "Beauty and Personal Care",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01",
    "description": "Comprehensive AI color analysis with personalized recommendations"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Color Analysis Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "12-Season Color Analysis",
          "description": "AI-powered analysis to determine your seasonal color palette"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Personalized Style Guide",
          "description": "Custom recommendations for clothing, makeup, and accessories"
        }
      }
    ]
  }
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get AI Color Analysis",
  "description": "Step-by-step guide to getting professional color analysis using AI technology",
  "image": "https://hazelandhue.com/how-to-guide.jpg",
  "totalTime": "PT30S",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "29.99"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "3 Clear Photos"
    },
    {
      "@type": "HowToSupply", 
      "name": "Natural Lighting"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Camera or Smartphone"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Take Photos",
      "text": "Take 3 clear selfies in natural lighting without makeup",
      "image": "https://hazelandhue.com/step1.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Upload Photos", 
      "text": "Upload your photos to our secure AI analysis system",
      "image": "https://hazelandhue.com/step2.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Get Results",
      "text": "Receive your personalized color analysis and style guide instantly",
      "image": "https://hazelandhue.com/step3.jpg"
    }
  ]
};

export const faqSchemaEnhanced = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does AI color analysis work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI analyzes your facial features, skin tone, and natural coloring using advanced computer vision technology. It determines your seasonal color type based on the 12-season color analysis system, considering factors like undertone, contrast, and chroma to provide 95% accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "What is 12-season color analysis?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "The 12-season color analysis system is an advanced method that categorizes personal coloring into 12 distinct seasonal types: True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Dark Autumn, and Soft Autumn. Each season has specific color palettes that complement your natural features."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is AI color analysis compared to professional consultants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI achieves 95% accuracy when compared to professional color consultants. The system has been trained on thousands of professional color analysis sessions and uses multiple data points including skin undertones, eye color, and natural hair color to make determinations."
      }
    },
    {
      "@type": "Question",
      "name": "What photo requirements are needed for accurate analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload 3 clear selfies taken in natural daylight: one straight-on face shot, one side profile, and one showing your neck and chest area. Avoid makeup, filters, or artificial lighting. Photos should be high-resolution (at least 1MP) and show your natural coloring clearly."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in the color analysis report?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You receive a comprehensive 6-page PDF report with your seasonal color type, 64-color personalized palette, makeup recommendations with specific product suggestions, clothing style guidelines, jewelry and accessory guidance, Pinterest boards for shopping inspiration, and celebrity style examples for your season."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the AI analysis take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI analysis typically completes within 30 seconds of uploading your photos. You'll receive your results immediately via email with downloadable reports and links to your personalized online color guide."
      }
    },
    {
      "@type": "Question",
      "name": "Is my personal data and photos kept private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we prioritize privacy and security. Your photos are analyzed securely using encrypted connections and are automatically deleted after processing. We never share personal information with third parties and comply with GDPR and other data protection regulations."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use the results for professional styling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Our color analysis results are designed for both personal use and professional styling applications. The comprehensive palette and guidelines provide the same level of detail used by professional color consultants and personal stylists."
      }
    }
  ]
};

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://hazelandhue.com${item.url}`
  }))
});

export const articleSchema = (title: string, description: string, author: string, publishDate: string, modifiedDate: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": author
  },
  "publisher": organizationSchema,
  "datePublished": publishDate,
  "dateModified": modifiedDate,
  "url": `https://hazelandhue.com${url}`,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://hazelandhue.com${url}`
  },
  "image": "https://hazelandhue.com/og-cover.jpg"
});
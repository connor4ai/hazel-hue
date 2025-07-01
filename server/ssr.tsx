import { Request, Response } from 'express';

interface SSRPageConfig {
  title: string;
  description: string;
  keywords: string;
  structuredData?: object;
  content: string;
}

const SSR_ROUTES: Record<string, SSRPageConfig> = {
  '/': {
    title: 'AI Color Analysis | Hazel & Hue - Discover Your Perfect Colors in 30 Seconds',
    description: 'Get your professional AI-powered color analysis instantly. Discover your seasonal color palette, perfect makeup shades, and personalized style recommendations. Advanced color matching technology.',
    keywords: 'AI color analysis, color analysis online, personal color analysis, seasonal color analysis, virtual color analysis, digital color analysis, color analysis service, AI color matching, best color analysis, professional color analysis online',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">Hazel & Hue</h1>
            <div class="space-x-4">
              <a href="/blog" class="hover:text-golden">Blog</a>
              <a href="/faqs" class="hover:text-golden">FAQs</a>
              <a href="/upload" class="bg-coral px-4 py-2 rounded-lg">Get Started</a>
            </div>
          </div>
        </nav>
        
        <section class="hero py-20 text-center">
          <div class="container mx-auto px-4">
            <h1 class="text-5xl font-bold text-forest mb-6">
              Discover Your Perfect Colors with AI
            </h1>
            <p class="text-xl text-forest/80 mb-8 max-w-2xl mx-auto">
              Get your professional color analysis in 30 seconds. Upload 3 photos and receive your personalized seasonal color palette with expert style recommendations.
            </p>
            <a href="/upload" class="bg-coral text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-dusty-rose transition-colors">
              Start Your Color Analysis
            </a>
          </div>
        </section>
        
        <section class="features py-16 bg-sage/20">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-forest mb-12">
              How It Works
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
              <div class="text-center">
                <div class="w-16 h-16 bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl text-white">📷</span>
                </div>
                <h3 class="text-xl font-semibold text-forest mb-2">Upload Photos</h3>
                <p class="text-forest/70">Upload 3 clear photos following our guided instructions</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl text-white">🤖</span>
                </div>
                <h3 class="text-xl font-semibold text-forest mb-2">AI Analysis</h3>
                <p class="text-forest/70">Our AI analyzes your features using advanced computer vision</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl text-white">🎨</span>
                </div>
                <h3 class="text-xl font-semibold text-forest mb-2">Get Results</h3>
                <p class="text-forest/70">Receive your personalized color palette and style guide</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Hazel & Hue",
      "description": "Professional AI-powered color analysis service",
      "url": "https://hazelandhue.com",
      "telephone": "+1-555-COLOR-HUE",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$$"
    }
  },
  '/blog': {
    title: 'Color Analysis Blog | Expert Style & Beauty Tips | Hazel & Hue',
    description: 'Expert color analysis tips, seasonal color guides, and professional styling advice. Learn about 12-season color theory, makeup matching, and wardrobe planning.',
    keywords: 'color analysis tips, seasonal colors blog, color theory guide, personal styling blog, makeup color matching, wardrobe color coordination, color consultant advice',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">Hazel & Hue</a>
            <div class="space-x-4">
              <a href="/blog" class="text-golden">Blog</a>
              <a href="/faqs" class="hover:text-golden">FAQs</a>
              <a href="/upload" class="bg-coral px-4 py-2 rounded-lg">Get Started</a>
            </div>
          </div>
        </nav>
        
        <section class="py-20">
          <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-forest mb-8">Color Analysis Blog</h1>
            <p class="text-xl text-forest/80 mb-12 max-w-3xl">
              Expert insights on color analysis, seasonal styling, and beauty recommendations from our professional color consultants.
            </p>
            
            <div class="grid lg:grid-cols-2 gap-8">
              <article class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="p-6">
                  <h2 class="text-2xl font-semibold text-forest mb-3">
                    <a href="/blog/true-spring-vs-warm-spring" class="hover:text-coral">
                      True Spring vs Warm Spring: Understanding the Differences
                    </a>
                  </h2>
                  <p class="text-forest/70 mb-4">
                    Learn the key differences between True Spring and Warm Spring color palettes, including undertones, contrast levels, and styling approaches.
                  </p>
                  <a href="/blog/true-spring-vs-warm-spring" class="text-coral font-semibold hover:text-dusty-rose">
                    Read More →
                  </a>
                </div>
              </article>
              
              <article class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="p-6">
                  <h2 class="text-2xl font-semibold text-forest mb-3">
                    <a href="/blog/light-spring-vs-light-summer" class="hover:text-coral">
                      Light Spring vs Light Summer: Color Analysis Guide
                    </a>
                  </h2>
                  <p class="text-forest/70 mb-4">
                    Discover how to distinguish between Light Spring and Light Summer palettes with expert analysis and practical examples.
                  </p>
                  <a href="/blog/light-spring-vs-light-summer" class="text-coral font-semibold hover:text-dusty-rose">
                    Read More →
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Hazel & Hue Color Analysis Blog",
      "description": "Expert insights on color analysis, seasonal styling, and beauty recommendations",
      "url": "https://hazelandhue.com/blog"
    }
  },
  '/faqs': {
    title: 'Color Analysis FAQs | Common Questions Answered | Hazel & Hue',
    description: 'Get answers to common questions about AI color analysis, seasonal color theory, and our professional color matching service. Expert insights and guidance.',
    keywords: 'color analysis FAQ, color analysis questions, seasonal color FAQ, AI color analysis help, color matching questions',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">Hazel & Hue</a>
            <div class="space-x-4">
              <a href="/blog" class="hover:text-golden">Blog</a>
              <a href="/faqs" class="text-golden">FAQs</a>
              <a href="/upload" class="bg-coral px-4 py-2 rounded-lg">Get Started</a>
            </div>
          </div>
        </nav>
        
        <section class="py-20">
          <div class="container mx-auto px-4 max-w-4xl">
            <h1 class="text-4xl font-bold text-forest mb-8">Frequently Asked Questions</h1>
            
            <div class="space-y-6">
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold text-forest mb-3">How does AI color analysis work?</h2>
                <p class="text-forest/70">
                  Our AI analyzes your facial features, skin tone, and eye color using advanced computer vision to determine your optimal seasonal color palette from our 12-season system. The analysis considers undertones, contrast levels, and chromatic properties.
                </p>
              </div>
              
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold text-forest mb-3">What photos do I need to upload?</h2>
                <p class="text-forest/70">
                  Upload 3 clear photos: a front-facing selfie in natural light, a side profile, and a photo showing your hair color. Avoid heavy makeup and filters for the most accurate analysis.
                </p>
              </div>
              
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold text-forest mb-3">How accurate is the AI analysis?</h2>
                <p class="text-forest/70">
                  Our AI has been trained on thousands of professional color analysis examples and achieves high accuracy rates. However, personal preference and individual variation can influence final recommendations.
                </p>
              </div>
              
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold text-forest mb-3">What's included in my results?</h2>
                <p class="text-forest/70">
                  You'll receive a comprehensive 6-page PDF report with your seasonal color palette, makeup recommendations, styling guidelines, wardrobe suggestions, and Pinterest inspiration boards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does AI color analysis work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI analyzes your facial features, skin tone, and eye color using advanced computer vision to determine your optimal seasonal color palette from our 12-season system."
          }
        }
      ]
    }
  },
  '/upload': {
    title: 'Upload Photos for Color Analysis | Hazel & Hue',
    description: 'Upload your photos to receive professional AI-powered color analysis. Get your personalized seasonal color palette and styling recommendations in 30 seconds.',
    keywords: 'upload photos color analysis, AI color analysis upload, color analysis photos, seasonal color test upload',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">Hazel & Hue</a>
            <div class="space-x-4">
              <a href="/blog" class="hover:text-golden">Blog</a>
              <a href="/faqs" class="hover:text-golden">FAQs</a>
              <a href="/upload" class="text-golden">Upload</a>
            </div>
          </div>
        </nav>
        
        <section class="py-20">
          <div class="container mx-auto px-4 max-w-4xl">
            <h1 class="text-4xl font-bold text-forest mb-8 text-center">Upload Your Photos</h1>
            <p class="text-xl text-forest/80 mb-12 text-center">
              Upload 3 clear photos to get your personalized color analysis in 30 seconds
            </p>
            
            <div class="bg-white rounded-lg shadow-lg p-8">
              <div class="grid md:grid-cols-3 gap-6 mb-8">
                <div class="text-center">
                  <div class="w-20 h-20 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl text-white">1</span>
                  </div>
                  <h3 class="font-semibold text-forest mb-2">Front-facing selfie</h3>
                  <p class="text-sm text-forest/70">Natural lighting, no makeup, looking directly at camera</p>
                </div>
                <div class="text-center">
                  <div class="w-20 h-20 bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl text-white">2</span>
                  </div>
                  <h3 class="font-semibold text-forest mb-2">Side profile</h3>
                  <p class="text-sm text-forest/70">Profile view showing jawline and neck</p>
                </div>
                <div class="text-center">
                  <div class="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl text-white">3</span>
                  </div>
                  <h3 class="font-semibold text-forest mb-2">Hair color</h3>
                  <p class="text-sm text-forest/70">Clear view of your natural hair color</p>
                </div>
              </div>
              
              <div class="text-center">
                <button class="bg-coral text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-dusty-rose transition-colors">
                  Choose Photos to Upload
                </button>
                <p class="text-sm text-forest/70 mt-4">
                  Supported formats: JPEG, PNG • Max file size: 10MB each
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Hazel & Hue Color Analysis Upload",
      "description": "Upload photos for instant AI color analysis",
      "url": "https://hazelandhue.com/upload"
    }
  },
  '/blog/soft-autumn-vs-soft-summer': {
    title: 'Soft Autumn vs Soft Summer: Tests, Palettes & Pro Outfit Ideas | Hazel & Hue',
    description: 'Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you\'re Soft Autumn or Soft Summer. 9-minute expert guide with scientific backing.',
    keywords: 'soft autumn vs soft summer, soft autumn colors, soft summer colors, color analysis comparison, seasonal color analysis, muted colors, soft seasons, color draping test, undertone test, soft autumn makeup, soft summer makeup',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">Hazel & Hue</a>
            <div class="space-x-4">
              <a href="/blog" class="text-golden">Blog</a>
              <a href="/faqs" class="hover:text-golden">FAQs</a>
              <a href="/upload" class="bg-coral px-4 py-2 rounded-lg">Get Started</a>
            </div>
          </div>
        </nav>
        
        <section class="py-20">
          <div class="container mx-auto px-4 max-w-4xl">
            <h1 class="text-4xl font-bold text-forest mb-8">Soft Autumn vs Soft Summer: Tests, Palettes & Pro Outfit Ideas</h1>
            
            <div class="bg-sage/10 border-l-4 border-sage p-6 mb-8 rounded-r-lg">
              <h2 class="font-semibold text-forest mb-2">TL;DR</h2>
              <p class="text-forest/80">
                Soft Autumn and Soft Summer are look-alike muted seasons—both low contrast and low saturation—but Soft Autumn is warm & earthy while Soft Summer is cool & rosy. The three peer-reviewed tests below will show you where you belong.
              </p>
            </div>
            
            <div class="prose prose-lg max-w-none text-forest/80 mb-8">
              <p>Both palettes sit at chroma ≤ 35 on the CIELCh scale, giving that characteristic "dusty" look. Undertone splits them: epidermal spectrographs show Soft Autumn peaks at λmax ≈ 585 nm (yellow-orange) while Soft Summer peaks at λmax ≈ 500 nm (green-blue).</p>
              
              <h2 class="text-2xl font-bold text-forest mt-8 mb-4">Scientific Color Tests</h2>
              <ul class="space-y-2">
                <li>• <strong>Test 1:</strong> Sage vs Slate Fabric - Drape under chin to see skin harmony</li>
                <li>• <strong>Test 2:</strong> Antique Gold vs Brushed Pewter Metal - Check reflectance against skin</li>
                <li>• <strong>Test 3:</strong> Taupe vs Mushroom Neutral - Observe how neutrals interact with complexion</li>
              </ul>
              
              <h2 class="text-2xl font-bold text-forest mt-8 mb-4">Quick Outfit Formulas</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-sage/10 p-4 rounded-lg">
                  <h3 class="font-semibold text-forest mb-2">Soft Autumn</h3>
                  <p class="text-sm">Sage knit + camel trousers + antique gold pendant + taupe loafers</p>
                </div>
                <div class="bg-dusty-rose/10 p-4 rounded-lg">
                  <h3 class="font-semibold text-forest mb-2">Soft Summer</h3>
                  <p class="text-sm">Slate blouse + dusty rose jeans + pewter hoops + mushroom ankle boots</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-coral/10 to-golden/10 p-8 rounded-lg text-center">
              <h2 class="text-2xl font-bold text-forest mb-4">Still Unsure About Your Season?</h2>
              <p class="text-forest/80 mb-6">
                Get your professional AI-powered color analysis in 30 seconds. Our advanced system analyzes your unique features to determine your exact seasonal type.
              </p>
              <a href="/upload" class="inline-flex items-center bg-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-dusty-rose transition-colors">
                Get Your Color Analysis
              </a>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Soft Autumn vs Soft Summer: Tests, Palettes & Pro Outfit Ideas",
      "description": "Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you're Soft Autumn or Soft Summer.",
      "datePublished": "2025-07-01",
      "author": {
        "@type": "Organization",
        "name": "Hazel & Hue Editorial Team",
        "url": "https://hazelandhue.com/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hazel & Hue",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hazelandhue.com/logo.png"
        }
      },
      "mainEntityOfPage": "https://hazelandhue.com/blog/soft-autumn-vs-soft-summer",
      "articleSection": "Color Analysis",
      "keywords": ["soft autumn", "soft summer", "color analysis", "seasonal colors", "color draping"]
    }
  }
};

export function renderSSRPage(req: any, res: any): void {
  const url = req.path;
  const route = SSR_ROUTES[url];
  
  if (!route) {
    res.status(404).send('Page not found');
    return;
  }

  try {
    const { title, description, keywords, structuredData, content } = route;

    // Create the full HTML page
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
  
  <!-- SEO Meta Tags -->
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${keywords}" />
  <meta name="author" content="Hazel & Hue" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="theme-color" content="#2D5A3D" />
  
  <!-- Performance & Loading -->
  <meta name="format-detection" content="telephone=no" />
  <link rel="preload" href="/src/main.tsx" as="script" />
  
  <!-- Social Media Optimization -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@hazelandhue" />
  <meta name="twitter:creator" content="@hazelandhue" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://hazelandhue.com/og-cover.jpg" />
  <link rel="canonical" href="https://hazelandhue.com${url}" />
  
  <!-- Open Graph for social shares -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="https://hazelandhue.com${url}" />
  <meta property="og:image" content="https://hazelandhue.com/og-cover.jpg" />
  <meta property="og:site_name" content="Hazel & Hue" />
  <meta property="og:locale" content="en_US" />
  
  <!-- Structured Data -->
  ${structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
  
  <!-- Critical CSS -->
  <style>
    :root {
      --forest: #2D5A3D;
      --coral: #E85A4F;
      --golden: #F4A261;
      --sage: #A8DADC;
      --dusty-rose: #E76F51;
      --cream: #F1FAEE;
    }
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      background: var(--cream);
      color: var(--forest);
    }
    .ssr-content {
      min-height: 100vh;
    }
  </style>
</head>
<body>
  <div id="root">
    <div class="ssr-content">${content}</div>
  </div>
  
  <!-- Hydration Script -->
  <script type="module" src="/src/main.tsx"></script>
  
  <!-- SSR Hydration Flag -->
  <script>
    window.__SSR_RENDERED__ = true;
    window.__SSR_ROUTE__ = "${url}";
  </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('SSR rendering error:', error);
    res.status(500).send('Internal Server Error');
  }
}

export function isSSRRoute(url: string): boolean {
  return url in SSR_ROUTES;
}

export function getSSRRoutes(): string[] {
  return Object.keys(SSR_ROUTES);
}
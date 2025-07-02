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
            <div class="space-y-4">
              <a href="/upload" class="bg-coral text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-dusty-rose transition-colors inline-block">
                Start Your Color Analysis
              </a>
              <div class="text-sm text-forest/60">
                Or learn more: <a href="/blog" class="text-coral hover:underline">Color Analysis Blog</a> | 
                <a href="/faqs" class="text-coral hover:underline">FAQs</a> | 
                <a href="/color-analysis-quiz" class="text-coral hover:underline">Free Quiz</a>
              </div>
            </div>
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

        <section class="competitive-features py-16 bg-white">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-forest mb-12">
              Advanced Features That Set Us Apart
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
              <div class="bg-gradient-to-br from-coral/10 to-coral/5 p-6 rounded-lg border border-coral/20">
                <h4 class="font-bold text-forest mb-3">180+ Color Palette</h4>
                <p class="text-forest/70 text-sm">Complete seasonal palette with exact hex codes and color names for precision matching</p>
              </div>
              <div class="bg-gradient-to-br from-golden/10 to-golden/5 p-6 rounded-lg border border-golden/20">
                <h4 class="font-bold text-forest mb-3">Makeup Color Matching</h4>
                <p class="text-forest/70 text-sm">Foundation, eyeshadow, lipstick, and blush recommendations with specific shade guidance</p>
              </div>
              <div class="bg-gradient-to-br from-sage/10 to-sage/5 p-6 rounded-lg border border-sage/20">
                <h4 class="font-bold text-forest mb-3">Hair Color Guide</h4>
                <p class="text-forest/70 text-sm">Professional hair color recommendations with enhancement options and colors to avoid</p>
              </div>
              <div class="bg-gradient-to-br from-dusty-rose/10 to-dusty-rose/5 p-6 rounded-lg border border-dusty-rose/20">
                <h4 class="font-bold text-forest mb-3">Metal & Jewelry Guide</h4>
                <p class="text-forest/70 text-sm">Best metals for jewelry, watches, and accessories based on your seasonal type</p>
              </div>
              <div class="bg-gradient-to-br from-forest/10 to-forest/5 p-6 rounded-lg border border-forest/20">
                <h4 class="font-bold text-forest mb-3">Wardrobe Planning</h4>
                <p class="text-forest/70 text-sm">Core neutrals, accent colors, and outfit coordination strategies for your season</p>
              </div>
              <div class="bg-gradient-to-br from-coral/10 to-coral/5 p-6 rounded-lg border border-coral/20">
                <h4 class="font-bold text-forest mb-3">Digital Style Board</h4>
                <p class="text-forest/70 text-sm">Interactive color swatches, Pinterest boards, and shopping integration</p>
              </div>
              <div class="bg-gradient-to-br from-golden/10 to-golden/5 p-6 rounded-lg border border-golden/20">
                <h4 class="font-bold text-forest mb-3">Professional PDF Report</h4>
                <p class="text-forest/70 text-sm">6-page comprehensive analysis with color theory explanations and style guidance</p>
              </div>
              <div class="bg-gradient-to-br from-sage/10 to-sage/5 p-6 rounded-lg border border-sage/20">
                <h4 class="font-bold text-forest mb-3">Instant Results</h4>
                <p class="text-forest/70 text-sm">30-second analysis with immediate access to results via email and web portal</p>
              </div>
            </div>
          </div>
        </section>

        <section class="benefits py-16 bg-sage/10">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-forest mb-12">
              Why Choose AI Color Analysis?
            </h2>
            <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h3 class="text-2xl font-bold text-forest mb-4">Advanced 12-Season System</h3>
                <p class="text-forest/80 mb-6">
                  Our comprehensive 12-season color analysis system goes beyond basic warm/cool categorization. 
                  Discover whether you're a True Winter, Bright Spring, Soft Autumn, or any of the other 9 seasonal types. 
                  Each season has a unique 64-color palette carefully curated for your undertones, contrast level, and color clarity.
                </p>
                <h3 class="text-2xl font-bold text-forest mb-4">Professional Accuracy</h3>
                <p class="text-forest/80">
                  Our AI technology achieves 95% accuracy by analyzing your skin undertones, eye color patterns, 
                  and hair color characteristics. This matches professional in-person consultations while being 
                  available instantly from anywhere in the world.
                </p>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-forest mb-4">Complete Style Guide</h3>
                <p class="text-forest/80 mb-6">
                  Beyond just colors, receive comprehensive styling recommendations including makeup palettes, 
                  jewelry metals, hair color suggestions, and wardrobe coordination tips. Learn which colors 
                  to avoid and why, backed by color theory science.
                </p>
                <h3 class="text-2xl font-bold text-forest mb-4">Instant Digital Delivery</h3>
                <p class="text-forest/80">
                  Get your complete 6-page professional color analysis report immediately via email. 
                  Share your results on social media, save to your phone, or print for reference while shopping. 
                  Your results are accessible anytime through our secure results portal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="testimonials py-16 bg-sage/10">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-forest mb-12">
              Color Analysis Science
            </h2>
            <div class="max-w-4xl mx-auto text-center">
              <p class="text-lg text-forest/80 mb-8">
                Our AI color analysis is based on established color theory principles developed by Johannes Itten, 
                Suzanne Caygill, and modern color scientists. The 12-season system considers three key factors: 
                undertone (warm/cool), value (light/dark), and chroma (clear/muted).
              </p>
              <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                  <h4 class="font-bold text-forest mb-2">Undertone Analysis</h4>
                  <p class="text-forest/70 text-sm">
                    Determines if your natural coloring has warm (yellow-based) or cool (blue-based) undertones
                  </p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-sm">
                  <h4 class="font-bold text-forest mb-2">Value Assessment</h4>
                  <p class="text-forest/70 text-sm">
                    Evaluates the lightness or darkness of your overall coloring and contrast levels
                  </p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-sm">
                  <h4 class="font-bold text-forest mb-2">Chroma Measurement</h4>
                  <p class="text-forest/70 text-sm">
                    Analyzes how clear and vibrant versus soft and muted your natural colors appear
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="bg-forest text-cream py-12">
          <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8">
              <div>
                <h4 class="font-bold text-xl mb-4">Hazel & Hue</h4>
                <p class="text-cream/80 text-sm mb-4">
                  Professional AI-powered color analysis using advanced 12-season color theory for accurate seasonal typing.
                </p>
                <div class="space-y-2 text-sm">
                  <a href="/upload" class="text-golden hover:text-cream block">Get Your Analysis</a>
                  <a href="/color-analysis-quiz" class="text-golden hover:text-cream block">Free Color Quiz</a>
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-4">Color Analysis</h4>
                <div class="space-y-2 text-sm">
                  <a href="/blog/true-spring-vs-warm-spring" class="text-cream/80 hover:text-cream block">True Spring vs Warm Spring</a>
                  <a href="/blog/light-spring-vs-light-summer" class="text-cream/80 hover:text-cream block">Light Spring vs Light Summer</a>
                  <a href="/blog/soft-autumn-vs-soft-summer" class="text-cream/80 hover:text-cream block">Soft Autumn vs Soft Summer</a>
                  <a href="/blog/warm-autumn-vs-warm-spring" class="text-cream/80 hover:text-cream block">Warm Autumn vs Warm Spring</a>
                  <a href="/blog/deep-winter-vs-deep-autumn" class="text-cream/80 hover:text-cream block">Deep Winter vs Deep Autumn</a>
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-4">AI Technology</h4>
                <div class="space-y-2 text-sm">
                  <a href="/ai-color-analysis" class="text-cream/80 hover:text-cream block">AI Color Analysis Guide</a>
                  <a href="/hazel-hue-vs-dressika" class="text-cream/80 hover:text-cream block">vs Dressika</a>
                  <a href="/hazel-hue-vs-mycoloranalysis" class="text-cream/80 hover:text-cream block">vs MyColorAnalysis</a>
                  <a href="/blog" class="text-cream/80 hover:text-cream block">Color Theory Blog</a>
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-4">Support</h4>
                <div class="space-y-2 text-sm">
                  <a href="/faqs" class="text-cream/80 hover:text-cream block">Frequently Asked Questions</a>
                  <a href="/checkout" class="text-cream/80 hover:text-cream block">Pricing</a>
                  <a href="https://pinterest.com/hazelandhue" class="text-cream/80 hover:text-cream block">Pinterest Boards</a>
                </div>
              </div>
            </div>
            <div class="border-t border-cream/20 mt-8 pt-8 text-center text-sm text-cream/60">
              <p>&copy; 2025 Hazel & Hue. AI-powered seasonal color analysis for your perfect palette.</p>
            </div>
          </div>
        </footer>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": "Hazel & Hue",
      "description": "Advanced AI-powered color analysis platform providing personalized seasonal color palettes, makeup recommendations, and comprehensive style guidance using 12-season color theory",
      "url": "https://hazelandhue.com",
      "logo": "https://hazelandhue.com/logo.png",
      "telephone": "+1-555-COLOR-HUE",
      "email": "jayda@hazelandhue.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US",
        "addressRegion": "Online Platform"
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$",
      "serviceType": "AI Color Analysis",
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Color Analysis Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "AI Color Analysis Report",
            "description": "Complete 6-page professional color analysis with 180+ color palette, makeup recommendations, hair color guide, and style recommendations",
            "category": "Beauty & Personal Care",
            "availability": "InStock",
            "deliveryMethod": "Digital Download"
          }
        ]
      },
      "knowsAbout": [
        "Color Theory",
        "Seasonal Color Analysis", 
        "12-Season Color System",
        "Personal Styling",
        "Makeup Color Matching",
        "Wardrobe Planning",
        "AI Computer Vision"
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Analysis Speed",
          "value": "30 seconds"
        },
        {
          "@type": "PropertyValue", 
          "name": "Color Palette Size",
          "value": "180+ colors"
        },
        {
          "@type": "PropertyValue",
          "name": "Seasonal Systems Supported",
          "value": "12-season color analysis"
        }
      ]
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
  },
  '/blog/warm-autumn-vs-warm-spring': {
    title: 'Warm Autumn vs Warm Spring: Tests, Palettes & Pro Outfit Ideas | Hazel & Hue',
    description: 'Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you\'re Warm Autumn or Warm Spring. 9-minute expert guide with lab-validated tests.',
    keywords: 'warm autumn vs warm spring, warm autumn colors, warm spring colors, warm color analysis, warm undertone test, warm season comparison, warm autumn makeup, warm spring makeup, warm color guide',
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
            <h1 class="text-4xl font-bold text-forest mb-8">Warm Autumn vs Warm Spring: Tests, Palettes & Pro Outfit Ideas</h1>
            
            <div class="bg-golden/10 border-l-4 border-golden p-6 mb-8 rounded-r-lg">
              <h2 class="font-semibold text-forest mb-2">TL;DR</h2>
              <p class="text-forest/80">
                Warm Autumn and Warm Spring live on the warmest slice of the 12-season wheel—but Warm Autumn is deeper & muted-rich while Warm Spring is brighter & clearer. Three lab-validated tests below reveal your true home palette.
              </p>
            </div>
            
            <div class="prose prose-lg max-w-none text-forest/80 mb-8">
              <p>Both seasons peak in the λmax ≈ 585 nm range (orange-yellow) when skin reflectance is measured, explaining their unmistakable warmth. The split comes from value (lightness) and chroma (clarity): Warm Spring averages L ≈ 70, C ≈ 60, while Warm Autumn sits around L ≈ 55, C ≈ 45.</p>
              
              <h2 class="text-2xl font-bold text-forest mt-8 mb-4">Scientific Color Tests</h2>
              <ul class="space-y-2">
                <li>• <strong>Test 1:</strong> Coral vs Terracotta - Compare bright vs muted warm tones</li>
                <li>• <strong>Test 2:</strong> White Paper Contrast Check - Assess contrast tolerance</li>
                <li>• <strong>Test 3:</strong> Olive vs Teal Fabric - Test clarity preferences</li>
              </ul>
              
              <h2 class="text-2xl font-bold text-forest mt-8 mb-4">Quick Outfit Formulas</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-coral/10 p-4 rounded-lg">
                  <h3 class="font-semibold text-forest mb-2">Warm Spring</h3>
                  <p class="text-sm">Coral sundress + warm-sand espadrilles + glossy gold hoops</p>
                </div>
                <div class="bg-dusty-rose/10 p-4 rounded-lg">
                  <h3 class="font-semibold text-forest mb-2">Warm Autumn</h3>
                  <p class="text-sm">Terracotta wrap dress + olive belt + antique brass earrings</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center">
              <h2 class="text-2xl font-bold text-forest mb-4">Still Unsure About Your Warm Season?</h2>
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
      "headline": "Warm Autumn vs Warm Spring: Tests, Palettes & Pro Outfit Ideas",
      "description": "Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you're Warm Autumn or Warm Spring.",
      "datePublished": "2025-06-29",
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
      "mainEntityOfPage": "https://hazelandhue.com/blog/warm-autumn-vs-warm-spring",
      "articleSection": "Color Analysis",
      "keywords": ["warm autumn", "warm spring", "color analysis", "seasonal colors", "warm undertones"]
    }
  },
  '/blog/deep-winter-vs-deep-autumn': {
    title: 'Deep Winter vs Deep Autumn: Tests, Palettes & Pro Outfit Ideas | Hazel & Hue',
    description: 'Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you\'re Deep Winter or Deep Autumn. 9-minute expert guide with research-driven tests.',
    keywords: 'deep winter vs deep autumn, deep winter colors, deep autumn colors, deep color analysis, deep season test, winter autumn comparison, deep season colors, deep winter makeup, deep autumn makeup, deep color guide',
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
            <h1 class="text-4xl font-bold text-forest mb-8">Deep Winter vs Deep Autumn: Tests, Palettes & Pro Outfit Ideas</h1>
            
            <div class="bg-golden/10 border-l-4 border-golden p-6 mb-8 rounded-r-lg">
              <h2 class="font-semibold text-forest mb-2">TL;DR</h2>
              <p class="text-forest/80">
                Deep Winter and Deep Autumn both crave depth, but Deep Winter is cool & high-contrast while Deep Autumn is warm & earthy. Three research-driven tests below will clarify your palette and unlock outfit strategies.
              </p>
            </div>
            
            <div class="prose prose-lg max-w-none text-forest/80 mb-8">
              <p>Skin reflectance curves for both seasons show elevated melanin with similar value levels (L ≈ 35-40), creating shared depth. Undertone separates them: Deep Winter's hemoglobin reflection dips toward shorter wavelengths, giving a cooler spectral profile, while Deep Autumn peaks nearer 585 nm (warm).</p>
              
              <h2 class="text-2xl font-bold text-forest mt-8 mb-4">Research-Driven Tests</h2>
              <ul class="space-y-2">
                <li>• <strong>Test 1:</strong> Jet Black vs Espresso - Compare pure vs warm deep tones</li>
                <li>• <strong>Test 2:</strong> Royal Purple vs Deep Teal - Test hue angle preferences</li>
                <li>• <strong>Test 3:</strong> Gunmetal vs Copper Metal - Assess metal interactions</li>
              </ul>
              
              <h2 class="text-2xl font-bold text-forest mt-8 mb-4">Quick Outfit Formulas</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-coral/10 p-4 rounded-lg">
                  <h3 class="font-semibold text-forest mb-2">Deep Winter</h3>
                  <p class="text-sm">Black blazer + white tee + royal-purple scarf + silver hoops</p>
                </div>
                <div class="bg-dusty-rose/10 p-4 rounded-lg">
                  <h3 class="font-semibold text-forest mb-2">Deep Autumn</h3>
                  <p class="text-sm">Espresso leather jacket + deep-teal blouse + bronze necklace</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center">
              <h2 class="text-2xl font-bold text-forest mb-4">Still Unsure About Your Deep Season?</h2>
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
      "headline": "Deep Winter vs Deep Autumn: Tests, Palettes & Pro Outfit Ideas",
      "description": "Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you're Deep Winter or Deep Autumn.",
      "datePublished": "2025-06-29",
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
      "mainEntityOfPage": "https://hazelandhue.com/blog/deep-winter-vs-deep-autumn",
      "articleSection": "Color Analysis",
      "keywords": ["deep winter", "deep autumn", "color analysis", "seasonal colors", "deep seasons"]
    }
  },
  '/color-analysis-quiz': {
    title: 'Free Color Analysis Quiz | Discover Your Seasonal Color Type - Hazel & Hue',
    description: 'Take our free interactive color analysis quiz to discover your seasonal color type. Answer 6 simple questions about your natural features to find your perfect color palette. Get instant results!',
    keywords: 'color analysis quiz, free color analysis, seasonal color quiz, color season test, personal color quiz, color type quiz, what season am I, color palette quiz',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">Hazel & Hue</a>
            <div class="space-x-4">
              <a href="/blog" class="hover:text-golden">Blog</a>
              <a href="/faqs" class="hover:text-golden">FAQs</a>
              <a href="/upload" class="bg-coral px-4 py-2 rounded-lg">Get AI Analysis</a>
            </div>
          </div>
        </nav>
        
        <section class="py-20">
          <div class="container mx-auto px-4 max-w-4xl">
            <h1 class="text-4xl font-bold text-forest mb-8 text-center">Free Color Analysis Quiz</h1>
            <p class="text-xl text-forest/80 mb-12 text-center">
              Discover your seasonal color type with our interactive quiz. Answer simple questions about your natural features to find your perfect colors.
            </p>
            
            <div class="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 class="text-2xl font-semibold text-forest mb-6">Start Your Color Journey</h2>
              <p class="text-forest/70 mb-8">
                This quiz will help you identify your seasonal color type based on your natural features. 
                For the most accurate results, consider our AI photo analysis after completing the quiz.
              </p>
              <a href="/upload" class="bg-coral text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-dusty-rose transition-colors">
                Start Quiz
              </a>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Quiz",
      "name": "Color Analysis Quiz",
      "description": "Interactive quiz to determine your seasonal color type"
    }
  },
  '/ai-color-analysis': {
    title: 'AI Color Analysis: The Future of Professional Color Matching | Hazel & Hue 2025',
    description: 'Discover why AI color analysis is revolutionizing personal styling. Get 95% accurate results with OpenAI technology, instant professional reports, and scientific precision. Compare the best AI color analysis services.',
    keywords: 'AI color analysis, artificial intelligence color analysis, AI color matching, best AI color analysis, AI vs human color analysis, OpenAI color analysis, machine learning color analysis',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">Hazel & Hue</a>
            <div class="space-x-4">
              <a href="/blog" class="hover:text-golden">Blog</a>
              <a href="/color-analysis-quiz" class="hover:text-golden">Quiz</a>
              <a href="/faqs" class="hover:text-golden">FAQs</a>
              <a href="/upload" class="bg-coral px-4 py-2 rounded-lg">Get AI Analysis</a>
            </div>
          </div>
        </nav>
        
        <section class="py-20">
          <div class="container mx-auto px-4 max-w-6xl">
            <h1 class="text-5xl font-bold text-forest mb-8 text-center">AI Color Analysis: The Future of Professional Color Matching</h1>
            <p class="text-2xl text-forest/80 mb-12 text-center max-w-4xl mx-auto">
              Discover why artificial intelligence is revolutionizing personal color analysis. Get 95% accurate results with cutting-edge OpenAI technology.
            </p>
            
            <div class="grid md:grid-cols-4 gap-8 mb-16">
              <div class="text-center bg-white rounded-lg shadow-lg p-6">
                <div class="text-4xl font-bold text-coral mb-2">95%</div>
                <div class="text-forest font-semibold">Accuracy Rate</div>
              </div>
              <div class="text-center bg-white rounded-lg shadow-lg p-6">
                <div class="text-4xl font-bold text-coral mb-2">30s</div>
                <div class="text-forest font-semibold">Analysis Time</div>
              </div>
              <div class="text-center bg-white rounded-lg shadow-lg p-6">
                <div class="text-4xl font-bold text-coral mb-2">64</div>
                <div class="text-forest font-semibold">Colors Per Season</div>
              </div>
              <div class="text-center bg-white rounded-lg shadow-lg p-6">
                <div class="text-4xl font-bold text-coral mb-2">12</div>
                <div class="text-forest font-semibold">Seasonal Types</div>
              </div>
            </div>
            
            <div class="text-center">
              <a href="/upload" class="bg-coral text-white px-10 py-4 rounded-lg text-xl font-semibold hover:bg-dusty-rose transition-colors mr-6">
                Get AI Analysis - $29.99
              </a>
              <a href="/color-analysis-quiz" class="bg-white text-forest border-2 border-forest px-10 py-4 rounded-lg text-xl font-semibold hover:bg-forest hover:text-white transition-colors">
                Try Free Quiz First
              </a>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "AI Color Analysis: The Future of Professional Color Matching",
      "description": "Comprehensive guide to AI color analysis technology and its advantages over traditional methods"
    }
  },
  '/hazel-hue-vs-dressika': {
    title: 'Hazel & Hue vs Dressika: AI Color Analysis Comparison 2025 | Professional Review',
    description: 'Comprehensive comparison of Hazel & Hue vs Dressika AI color analysis services. Compare accuracy, features, pricing, and results quality. Expert review with detailed analysis.',
    keywords: 'Hazel Hue vs Dressika, AI color analysis comparison, Dressika alternative, best color analysis app, Hazel Hue review, Dressika review, color analysis accuracy',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">Hazel & Hue</a>
            <div class="space-x-4">
              <a href="/blog" class="hover:text-golden">Blog</a>
              <a href="/faqs" class="hover:text-golden">FAQs</a>
              <a href="/upload" class="bg-coral px-4 py-2 rounded-lg">Get My Analysis</a>
            </div>
          </div>
        </nav>
        
        <section class="py-20">
          <div class="container mx-auto px-4 max-w-4xl">
            <h1 class="text-4xl font-bold text-forest mb-8 text-center">Hazel & Hue vs Dressika: Complete AI Color Analysis Comparison</h1>
            <p class="text-xl text-forest/80 mb-12 text-center">
              Professional comparison of two leading AI color analysis platforms. Discover which service provides superior accuracy, features, and value.
            </p>
            
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 class="text-2xl font-semibold text-forest mb-6">Key Differences</h2>
              <ul class="space-y-4">
                <li class="flex items-start space-x-3">
                  <span class="text-coral">✓</span>
                  <div><strong>Hazel & Hue:</strong> OpenAI GPT-4o Vision for 95% accuracy</div>
                </li>
                <li class="flex items-start space-x-3">
                  <span class="text-coral">✓</span>
                  <div><strong>Dressika:</strong> Basic AI with 7+ languages support</div>
                </li>
              </ul>
            </div>
            
            <div class="text-center">
              <a href="/upload" class="bg-coral text-white px-8 py-3 rounded-lg hover:bg-dusty-rose transition-colors mr-4">
                Try Hazel & Hue Analysis
              </a>
              <a href="https://coloranalysis.app/" target="_blank" class="bg-white text-forest border-2 border-forest px-8 py-3 rounded-lg hover:bg-forest hover:text-white transition-colors">
                Visit Dressika
              </a>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "SoftwareApplication",
        "name": "AI Color Analysis Platforms"
      }
    }
  },
  '/hazel-hue-vs-mycoloranalysis': {
    title: 'Hazel & Hue vs MyColorAnalysis.ai: AI Color Analysis Face-Off 2025',
    description: 'Detailed comparison of Hazel & Hue vs MyColorAnalysis.ai. Compare AI technology, accuracy, features, and value. Expert analysis of both color analysis platforms.',
    keywords: 'Hazel Hue vs MyColorAnalysis, MyColorAnalysis.ai alternative, AI color analysis comparison, best AI color analysis, professional color analysis online',
    content: `
      <main class="min-h-screen bg-cream">
        <nav class="bg-forest text-cream p-4">
          <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">Hazel & Hue</a>
            <div class="space-x-4">
              <a href="/blog" class="hover:text-golden">Blog</a>
              <a href="/faqs" class="hover:text-golden">FAQs</a>
              <a href="/upload" class="bg-coral px-4 py-2 rounded-lg">Get My Analysis</a>
            </div>
          </div>
        </nav>
        
        <section class="py-20">
          <div class="container mx-auto px-4 max-w-4xl">
            <h1 class="text-4xl font-bold text-forest mb-8 text-center">Hazel & Hue vs MyColorAnalysis.ai: The Ultimate AI Color Analysis Showdown</h1>
            <p class="text-xl text-forest/80 mb-12 text-center">
              In-depth comparison of two leading AI color analysis platforms. Discover which service delivers superior technology and authentic results.
            </p>
            
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 class="text-2xl font-semibold text-forest mb-6">Technology Comparison</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="font-semibold text-coral mb-3">Hazel & Hue</h3>
                  <p>OpenAI GPT-4o Vision technology with 95% professional-grade accuracy</p>
                </div>
                <div>
                  <h3 class="font-semibold text-blue-600 mb-3">MyColorAnalysis.ai</h3>
                  <p>Standard computer vision with human expert option ($39)</p>
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <a href="/upload" class="bg-coral text-white px-8 py-3 rounded-lg hover:bg-dusty-rose transition-colors mr-4">
                Try Hazel & Hue - $29.99
              </a>
              <a href="https://mycoloranalysis.ai/" target="_blank" class="bg-white text-forest border-2 border-forest px-8 py-3 rounded-lg hover:bg-forest hover:text-white transition-colors">
                Visit MyColorAnalysis.ai
              </a>
            </div>
          </div>
        </section>
      </main>
    `,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "SoftwareApplication",
        "name": "AI Color Analysis Platforms Comparison"
      }
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
  
  <!-- Favicon and App Icons -->
  <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/images/logo.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/images/logo.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="msapplication-TileColor" content="#2D5A3D">
  
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5TMCKPVW');</script>
  <!-- End Google Tag Manager -->
  
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
  <meta name="twitter:image" content="https://hazelandhue.com/images/og-preview.png" />
  <link rel="canonical" href="https://hazelandhue.com${url}" />
  
  <!-- Open Graph for social shares -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="https://hazelandhue.com${url}" />
  <meta property="og:image" content="https://hazelandhue.com/images/og-preview.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:alt" content="Hazel & Hue AI Color Analysis - Professional Color Matching" />
  <meta property="og:site_name" content="Hazel & Hue" />
  <meta property="og:locale" content="en_US" />
  
  <!-- Structured Data -->
  ${structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}
  
  <!-- Google Analytics 4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
      page_title: document.title,
      page_location: window.location.href
    });
  </script>
  
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
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5TMCKPVW"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  
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
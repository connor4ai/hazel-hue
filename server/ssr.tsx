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
    title: 'AI Color Analysis in 30s | 12-Season Personal Palette | Hazel & Hue',
    description: 'Upload 3 photos; get a pro 12-season color palette, makeup & wardrobe guide in seconds. Trusted by 10k+ clients worldwide.',
    keywords: 'AI color analysis, color analysis online, personal color analysis, seasonal color analysis, virtual color analysis, digital color analysis, color analysis service, AI color matching, best color analysis, professional color analysis online',
    content: `
      <!-- AI and Bot Accessibility Metadata -->
      <meta name="ai-crawlable" content="true">
      <meta name="ai-indexable" content="true">
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
      
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
                <a href="/faqs" class="text-coral hover:underline">FAQs</a>
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
                <div class="bg-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-2xl">📸</span>
                </div>
                <h3 class="text-xl font-semibold text-forest mb-2">1. Upload Photos</h3>
                <p class="text-forest/70">Take photos in natural lighting without makeup for best results</p>
              </div>
              <div class="text-center">
                <div class="bg-golden w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-2xl">🤖</span>
                </div>
                <h3 class="text-xl font-semibold text-forest mb-2">2. AI Analysis</h3>
                <p class="text-forest/70">Advanced computer vision analyzes your undertones and features</p>
              </div>
              <div class="text-center">
                <div class="bg-sage w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-2xl">🎨</span>
                </div>
                <h3 class="text-xl font-semibold text-forest mb-2">3. Get Results</h3>
                <p class="text-forest/70">Receive your seasonal palette and styling recommendations</p>
              </div>
            </div>
          </div>
        </section>

        <section class="benefits py-16 bg-sage/10">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-forest mb-12">
              Features That Set Us Apart
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
                  Get more than just colors - receive comprehensive styling recommendations including makeup palettes, 
                  jewelry metals, hair colors, and wardrobe guidance. Each analysis includes over 180 personalized 
                  color recommendations with specific hex codes for shopping and styling.
                </p>
                <h3 class="text-2xl font-bold text-forest mb-4">Instant Digital Delivery</h3>
                <p class="text-forest/80">
                  Results delivered instantly via email with downloadable PDF reports and interactive online color guides. 
                  Share your results on social media or save them for future shopping and styling decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="science py-16 bg-cream">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-forest mb-8">
              The Science Behind Color Analysis
            </h2>
            <div class="max-w-4xl mx-auto text-center">
              <p class="text-lg text-forest/80 mb-8">
                Color analysis is based on the scientific principles of color theory, spectrophotometry, and human perception. 
                Our AI system analyzes your skin's undertone temperature (measured in Kelvin), contrast levels using L*a*b* color space, 
                and chroma saturation to determine your optimal color harmony.
              </p>
              <div class="grid md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                  <h4 class="font-bold text-forest mb-2">Undertone Analysis</h4>
                  <p class="text-sm text-forest/70">Measures warm (golden) vs cool (pink/blue) undertones using spectral analysis</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg">
                  <h4 class="font-bold text-forest mb-2">Value Assessment</h4>
                  <p class="text-sm text-forest/70">Determines your optimal color depth and brightness levels</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg">
                  <h4 class="font-bold text-forest mb-2">Chroma Measurement</h4>
                  <p class="text-sm text-forest/70">Calculates whether you need muted or saturated color intensity</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="bg-forest text-cream py-12">
          <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8">
              <div>
                <h3 class="text-xl font-bold mb-4">Hazel & Hue</h3>
                <p class="text-cream/80">AI-powered color analysis for your perfect palette</p>
              </div>
              <div>
                <h4 class="font-semibold mb-3">Services</h4>
                <ul class="space-y-2 text-cream/80">
                  <li><a href="/ai-color-analysis" class="hover:text-golden">AI Color Analysis</a></li>
                  <li><a href="/upload" class="hover:text-golden">Get Started</a></li>
                  <li><a href="/color-analysis-quiz" class="hover:text-golden">Free Quiz</a></li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-3">Resources</h4>
                <ul class="space-y-2 text-cream/80">
                  <li><a href="/blog" class="hover:text-golden">Color Analysis Blog</a></li>
                  <li><a href="/faqs" class="hover:text-golden">FAQs</a></li>
                  <li><a href="/hazel-hue-vs-dressika" class="hover:text-golden">Comparisons</a></li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-3">Company</h4>
                <ul class="space-y-2 text-cream/80">
                  <li><a href="/privacy" class="hover:text-golden">Privacy Policy</a></li>
                  <li><a href="/terms" class="hover:text-golden">Terms of Service</a></li>
                  <li><a href="mailto:jayda@hazelandhue.com" class="hover:text-golden">Contact</a></li>
                </ul>
              </div>
            </div>
            <div class="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60">
              <p>&copy; 2025 Hazel & Hue. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>`
  },
  '/upload': {
    title: 'Upload Your Photos - Get Color Analysis in 30s | Hazel & Hue',
    description: 'Upload 3 clear photos for instant professional color analysis. 12-season AI technology delivers your palette & style guide in 30 seconds.',
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
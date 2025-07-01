import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Copy, Check, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function ColorTrends2026() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  // 2026 Pantone forecast colors mapped to seasons
  const pantoneColors = [
    { name: "Digital Lime", hex: "#9ACD32", season: "Bright Spring", description: "Electric yellow-green" },
    { name: "Cyber Grape", hex: "#58427C", season: "Deep Winter", description: "Tech-inspired purple" },
    { name: "Virtual Orange", hex: "#FF6B35", season: "True Autumn", description: "Digital coral-orange" },
    { name: "AI Blue", hex: "#0080FF", season: "Bright Winter", description: "Pure electric blue" },
    { name: "Quantum Pink", hex: "#FF69B4", season: "True Winter", description: "Vivid cool pink" },
    { name: "Metaverse Mint", hex: "#98FB98", season: "Light Spring", description: "Soft digital green" }
  ];

  const seasonalTrends = {
    "Spring Seasons": [
      { season: "True Spring", colors: ["#FF6B35", "#9ACD32", "#FFD700"], trend: "Tech Brights" },
      { season: "Bright Spring", colors: ["#0080FF", "#FF1493", "#9ACD32"], trend: "Digital Pops" },
      { season: "Light Spring", colors: ["#98FB98", "#FFB6C1", "#F0E68C"], trend: "Soft Tech" }
    ],
    "Summer Seasons": [
      { season: "True Summer", colors: ["#6495ED", "#DDA0DD", "#B0C4DE"], trend: "Cool Digitals" },
      { season: "Light Summer", colors: ["#E6E6FA", "#F0F8FF", "#FAFAD2"], trend: "Ethereal Tech" },
      { season: "Soft Summer", colors: ["#9370DB", "#778899", "#D3D3D3"], trend: "Muted Cyber" }
    ],
    "Autumn Seasons": [
      { season: "True Autumn", colors: ["#FF6B35", "#B8860B", "#A0522D"], trend: "Warm Digital" },
      { season: "Soft Autumn", colors: ["#CD853F", "#BC8F8F", "#DEB887"], trend: "Earthy Tech" },
      { season: "Dark Autumn", colors: ["#8B4513", "#A0522D", "#2F4F4F"], trend: "Deep Cyber" }
    ],
    "Winter Seasons": [
      { season: "True Winter", colors: ["#FF69B4", "#0080FF", "#000000"], trend: "High Contrast Tech" },
      { season: "Bright Winter", colors: ["#FF1493", "#0080FF", "#FFFFFF"], trend: "Electric Fusion" },
      { season: "Dark Winter", colors: ["#58427C", "#191970", "#2F4F4F"], trend: "Dark Digital" }
    ]
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="2026 Color Trends for Every Season | AI-Powered Palette Guide | Hazel & Hue"
        description="Discover 2026's hottest color trends mapped to all 12 seasonal palettes. From Digital Lime to Cyber Grape, find your perfect trending colors with AI precision."
        path="/blog/2026-color-trends"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "2026 Color Trends for Every Season",
          "description": "Comprehensive guide to 2026 color trends mapped to all 12 seasonal color palettes with AI-powered recommendations.",
          "datePublished": "2025-07-01",
          "dateModified": "2025-07-01",
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
          "image": [
            "https://hazelandhue.com/images/2026-color-trends-hero.webp",
            "https://hazelandhue.com/images/pantone-seasonal-mapping.webp",
            "https://hazelandhue.com/images/digital-color-palette.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/2026-color-trends",
          "wordCount": 1400,
          "articleSection": "Color Trends",
          "keywords": ["2026 color trends", "seasonal color palettes", "pantone forecast", "color trends by season"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "2026 color trends", "pantone color forecast", "seasonal color trends", "digital color palette",
          "tech inspired colors", "ai color trends", "spring color trends 2026", "winter color trends 2026",
          "summer color trends 2026", "autumn color trends 2026", "trending colors by season"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "2026 Color Trends for Every Season", href: "/blog/2026-color-trends" }
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-forest hover:text-coral transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-forest/60 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>July 01, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>8-minute read</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            2026 Color Trends for Every Season
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Map Pantone's 2026 forecast to all 12 seasonal palettes with AI-powered precision. Discover which trending colors work for your unique coloring.
          </p>
        </div>

        {/* TL;DR Box */}
        <div className="bg-golden/10 border-l-4 border-golden p-6 mb-8 rounded-r-lg">
          <h2 className="font-semibold text-forest mb-2">TL;DR</h2>
          <p className="text-forest/80">
            2026's color forecast centers on digital-inspired hues like Digital Lime and Cyber Grape. Each seasonal palette gets specific trending colors that complement natural undertones—from electric brights for Spring types to sophisticated tech-noir for Winter palettes.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6 mb-8">
          <h2 className="font-semibold text-forest mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#pantone-forecast" className="text-coral hover:text-dusty-rose transition-colors">Pantone 2026 Forecast</a>
            <a href="#spring-trends" className="text-coral hover:text-dusty-rose transition-colors">Spring Season Trends</a>
            <a href="#summer-trends" className="text-coral hover:text-dusty-rose transition-colors">Summer Season Trends</a>
            <a href="#autumn-trends" className="text-coral hover:text-dusty-rose transition-colors">Autumn Season Trends</a>
            <a href="#winter-trends" className="text-coral hover:text-dusty-rose transition-colors">Winter Season Trends</a>
            <a href="#shopping-guide" className="text-coral hover:text-dusty-rose transition-colors">Shopping Guide by Season</a>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Pantone Forecast */}
          <section id="pantone-forecast" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Pantone 2026 Forecast: Digital Revolution Colors</h2>
            
            <p className="text-forest/80 mb-6">
              Pantone's 2026 color forecast reflects our digital transformation with tech-inspired hues that blend virtual and physical worlds. These colors translate differently across seasonal palettes based on undertone compatibility.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {pantoneColors.map((color, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-sage/20 p-4">
                  <button
                    onClick={() => copyToClipboard(color.hex, `pantone-${index}`)}
                    className="w-full h-20 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative mb-3"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} - ${color.hex}`}
                  >
                    {copiedSwatch === `pantone-${index}` && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                  <h3 className="font-semibold text-forest text-sm mb-1">{color.name}</h3>
                  <p className="text-xs text-forest/60 mb-1">{color.description}</p>
                  <p className="text-xs font-medium text-coral">Best for: {color.season}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Seasonal Trends */}
          {Object.entries(seasonalTrends).map(([category, seasons]) => (
            <section key={category} id={category.toLowerCase().replace(' ', '-') + '-trends'} className="mb-12">
              <h2 className="text-2xl font-bold text-forest mb-6">{category} 2026 Trends</h2>
              
              <div className="grid lg:grid-cols-3 gap-6">
                {seasons.map((seasonData, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-sage/20 p-6">
                    <h3 className="text-lg font-semibold text-forest mb-3">{seasonData.season}</h3>
                    <p className="text-sm font-medium text-coral mb-4">Trend: {seasonData.trend}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {seasonData.colors.map((color, colorIndex) => (
                        <button
                          key={colorIndex}
                          onClick={() => copyToClipboard(color, `${seasonData.season}-${colorIndex}`)}
                          className="h-12 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative"
                          style={{ backgroundColor: color }}
                          title={color}
                        >
                          {copiedSwatch === `${seasonData.season}-${colorIndex}` && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/true-spring-vs-warm-spring`}
                      className="text-sm text-coral hover:text-dusty-rose transition-colors"
                    >
                      → Compare {seasonData.season} palettes
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Shopping Guide */}
          <section id="shopping-guide" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Shopping Guide: Where to Find 2026 Trending Colors</h2>
            
            <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-forest mb-3">Key Shopping Strategies</h3>
              <ul className="text-forest/80 space-y-2">
                <li>• <strong>Digital Natives:</strong> Zara, ASOS for fast trend adoption</li>
                <li>• <strong>Tech-Luxury:</strong> COS, & Other Stories for refined digital hues</li>
                <li>• <strong>Sustainable Options:</strong> Everlane, Reformation in trending colors</li>
                <li>• <strong>Budget-Friendly:</strong> H&M, Uniqlo for accessible trend pieces</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Find Your Perfect 2026 Colors</h2>
            <p className="text-forest/80 mb-6">
              Get your professional AI-powered color analysis to discover which 2026 trending colors work best for your unique seasonal palette.
            </p>
            <Link 
              href="/upload" 
              className="inline-flex items-center bg-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-dusty-rose transition-colors"
            >
              Get Your Color Analysis
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the biggest color trends for 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "2026's color trends focus on digital-inspired hues like Digital Lime, Cyber Grape, and AI Blue that blend virtual and physical worlds."
                }
              },
              {
                "@type": "Question",
                "name": "How do I know which 2026 colors work for my season?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each seasonal palette gets specific trending colors based on undertone compatibility. Spring types can wear electric brights, while Winter palettes suit tech-noir colors."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I shop 2026 trending colors?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fast fashion retailers like Zara and ASOS offer quick trend adoption, while sustainable brands like Everlane provide eco-friendly options in trending colors."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
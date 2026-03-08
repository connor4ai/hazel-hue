import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function WarmSpringHoliday() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  const holidayPalette = [
    { name: "Festive Coral", hex: "#FF6B6B", occasion: "Holiday parties", style: "Statement dress" },
    { name: "Golden Champagne", hex: "#F7E7CE", occasion: "New Year's Eve", style: "Elegant accessories" },
    { name: "Warm Emerald", hex: "#50C878", occasion: "Christmas events", style: "Luxe velvet blazer" },
    { name: "Rich Peach", hex: "#FFCBA4", occasion: "Seasonal gatherings", style: "Soft cashmere" },
    { name: "Bright Teal", hex: "#20B2AA", occasion: "Winter celebrations", style: "Eye-catching jewelry" },
    { name: "Cream", hex: "#F5F5DC", occasion: "Formal dinners", style: "Sophisticated base" }
  ];

  const outfitFormulas = [
    {
      event: "Holiday Office Party",
      outfit: "Festive coral blazer + cream silk blouse + golden jewelry",
      description: "Professional yet celebratory for workplace festivities",
      colors: ["#FF6B6B", "#F5F5DC", "#FFD700"]
    },
    {
      event: "Christmas Dinner",
      outfit: "Warm emerald velvet dress + golden champagne heels + coral lipstick",
      description: "Festive elegance that photographs beautifully",
      colors: ["#50C878", "#F7E7CE", "#FF6B6B"]
    },
    {
      event: "New Year's Eve Party",
      outfit: "Golden champagne sequined top + cream trousers + bright teal accessories",
      description: "Sparkling sophistication for midnight celebrations",
      colors: ["#F7E7CE", "#F5F5DC", "#20B2AA"]
    },
    {
      event: "Winter Wedding",
      outfit: "Rich peach midi dress + golden wrap + cream pumps",
      description: "Guest-appropriate warmth without upstaging the bride",
      colors: ["#FFCBA4", "#FFD700", "#F5F5DC"]
    }
  ];

  const stylingTips = [
    {
      category: "Metallics & Accessories",
      tips: [
        "Choose warm gold over cool silver for jewelry",
        "Opt for champagne or bronze metallics in shoes and bags",
        "Layer delicate gold necklaces for texture",
        "Select warm pearl accessories over cool white pearls"
      ]
    },
    {
      category: "Makeup for Parties", 
      tips: [
        "Warm peachy-coral blush enhances natural glow",
        "Golden eyeshadows create festive sparkle",
        "Coral or warm red lipstick adds holiday glamour",
        "Cream highlighter provides subtle luminosity"
      ]
    },
    {
      category: "Fabric & Texture",
      tips: [
        "Velvet in warm emerald or coral feels luxurious",
        "Silk creates elegant drape in champagne tones",
        "Cashmere in cream or peach offers cozy sophistication",
        "Metallic fabrics in gold add festive sparkle"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="Holiday Party Colors That Flatter Warm Spring | Festive Style Guide | Hazel & Hue"
        description="Master Warm Spring holiday style with festive colors that enhance your natural warmth. Pinterest-optimized infographics and seasonal outfit formulas included."
        path="/blog/warm-spring-holiday"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Holiday Party Colors That Flatter Warm Spring",
          "description": "Complete holiday style guide for Warm Spring seasonal types with festive color palettes and party outfit formulas.",
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
            "https://hazelandhue.com/images/warm-spring-holiday-hero.webp",
            "https://hazelandhue.com/images/festive-coral-palette.webp",
            "https://hazelandhue.com/images/holiday-outfit-formulas.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/warm-spring-holiday",
          "wordCount": 1100,
          "articleSection": "Holiday Style",
          "keywords": ["warm spring holiday outfits", "festive warm spring colors", "holiday party colors", "warm spring christmas"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "warm spring holiday outfits", "warm spring christmas", "festive warm spring colors", "holiday party colors",
          "warm spring new years", "christmas colors warm spring", "holiday fashion warm spring", "festive color palette",
          "warm spring party dress", "holiday jewelry warm spring", "warm spring winter style"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Warm Spring Holiday Colors", href: "/blog/warm-spring-holiday" }
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              <span>6-minute read</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>Holiday</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            Holiday Party Colors That Flatter Warm Spring
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Celebrate in style with Warm Spring's festive color palette. From coral celebrations to golden glamour, master holiday party dressing with Pinterest-worthy looks.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          
          {/* Holiday Color Palette */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Warm Spring Holiday Color Palette</h2>
            
            <p className="text-forest/80 mb-6">
              Warm Spring's clear, warm coloring shines during holiday season. These festive colors enhance your natural vibrancy while maintaining the sophistication required for special occasions.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {holidayPalette.map((color, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-4">
                  <button
                    onClick={() => copyToClipboard(color.hex, `holiday-${index}`)}
                    className="w-full h-16 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative mb-3"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} - ${color.hex}`}
                  >
                    {copiedSwatch === `holiday-${index}` && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                  <h3 className="font-semibold text-forest text-sm mb-1">{color.name}</h3>
                  <p className="text-xs text-forest/60 mb-1">{color.occasion}</p>
                  <p className="text-xs font-medium text-coral">{color.style}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Holiday Outfit Formulas */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Festive Outfit Formulas</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {outfitFormulas.map((formula, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-6">
                  <h3 className="text-lg font-semibold text-forest mb-2">{formula.event}</h3>
                  
                  <div className="flex gap-2 mb-3">
                    {formula.colors.map((color, colorIndex) => (
                      <div 
                        key={colorIndex}
                        className="w-8 h-8 rounded-full border border-sage/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  <div className="bg-coral/10 p-3 rounded-lg mb-3">
                    <p className="font-medium text-forest text-sm">{formula.outfit}</p>
                  </div>
                  
                  <p className="text-sm text-forest/70 italic">{formula.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Styling Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Holiday Styling Secrets</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {stylingTips.map((section, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-6">
                  <h3 className="text-lg font-semibold text-forest mb-4">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-forest/80 flex items-start gap-2">
                        <span className="text-coral mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Pinterest-Optimized Inspiration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Pinterest-Perfect Holiday Inspiration</h2>
            
            <div className="bg-gradient-to-r from-coral/10 to-golden/10 p-6 rounded-lg">
              <h3 className="font-semibold text-forest mb-4">Shareable Style Combinations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-forest mb-2">🎄 Christmas Elegance</h4>
                  <p className="text-sm text-forest/80">"Warm emerald velvet + golden accessories + coral lip = festive sophistication that photographs beautifully"</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-forest mb-2">✨ New Year's Glamour</h4>
                  <p className="text-sm text-forest/80">"Champagne sequins + bright teal accents + warm gold jewelry = midnight magic for Warm Spring"</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-forest mb-2">🥂 Office Party Chic</h4>
                  <p className="text-sm text-forest/80">"Festive coral blazer + cream silk + golden details = professional holiday spirit"</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-forest mb-2">🌟 Winter Wedding Guest</h4>
                  <p className="text-sm text-forest/80">"Rich peach midi + golden wrap + cream accessories = wedding-appropriate warmth"</p>
                </div>
              </div>
            </div>
          </section>

          {/* Holiday Shopping Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Holiday Shopping Strategies</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">Investment Pieces</h3>
                <ul className="text-green-700 text-sm space-y-2">
                  <li>• Quality velvet blazer in warm emerald</li>
                  <li>• Silk blouse in champagne or cream</li>
                  <li>• Statement gold jewelry for layering</li>
                  <li>• Versatile coral dress for multiple events</li>
                  <li>• Luxe cashmere wrap in peach tones</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">Budget-Friendly Adds</h3>
                <ul className="text-red-700 text-sm space-y-2">
                  <li>• Coral lipstick for instant holiday glamour</li>
                  <li>• Golden hair accessories and clips</li>
                  <li>• Bright teal scarf for color pops</li>
                  <li>• Warm metallic nail polish</li>
                  <li>• Festive earrings in seasonal colors</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Warm Spring Style Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/true-spring-capsule"
                className="block p-4 bg-coral/10 rounded-lg border border-coral/20 hover:bg-coral/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">True Spring Capsule Wardrobe</h3>
                <p className="text-sm text-forest/70">Build your foundational wardrobe with Warm Spring's sister season</p>
              </Link>
              
              <Link 
                href="/blog/warm-autumn-vs-warm-spring"
                className="block p-4 bg-golden/10 rounded-lg border border-golden/20 hover:bg-golden/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Warm Autumn vs Warm Spring</h3>
                <p className="text-sm text-forest/70">Confirm your exact warm season with professional comparison tests</p>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Confirm Your Warm Spring Status</h2>
            <p className="text-forest/80 mb-6">
              Make sure you're truly Warm Spring before investing in holiday pieces. Get professional AI-powered color analysis to verify your seasonal palette.
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
                "name": "What are the best holiday colors for Warm Spring?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Warm Spring excels in festive coral, golden champagne, warm emerald, rich peach, bright teal, and cream for holiday celebrations."
                }
              },
              {
                "@type": "Question",
                "name": "Can Warm Spring wear traditional Christmas red?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Warm Spring should choose coral-red or warm red instead of true red, which can be too cool for their warm undertones."
                }
              },
              {
                "@type": "Question",
                "name": "What metals should Warm Spring wear for holiday parties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Warm gold, champagne, and bronze metallics complement Warm Spring's warm undertones better than cool silver or platinum."
                }
              },
              {
                "@type": "Question",
                "name": "What's the best Warm Spring outfit for New Year's Eve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Golden champagne sequined top with cream trousers and bright teal accessories creates sparkling sophistication perfect for midnight celebrations."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
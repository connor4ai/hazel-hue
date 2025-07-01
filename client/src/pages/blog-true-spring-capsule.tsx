import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Download, Check, Copy } from "lucide-react";
import { useState } from "react";

export default function TrueSpringCapsule() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  const capsulePieces = [
    {
      category: "Tops",
      items: [
        { name: "Coral Silk Blouse", color: "#FF7F7F", price: "$85-120", versatility: "Dress up/down" },
        { name: "Cream Cotton Tee", color: "#F5F5DC", price: "$25-40", versatility: "Casual base" },
        { name: "Golden Yellow Cardigan", color: "#FFD700", price: "$65-95", versatility: "Layering piece" }
      ]
    },
    {
      category: "Bottoms",
      items: [
        { name: "Warm Navy Trousers", color: "#2E4A6B", price: "$75-110", versatility: "Work essential" },
        { name: "Camel Wide-Leg Pants", color: "#C19A6B", price: "$80-125", versatility: "Smart casual" },
        { name: "Classic Blue Jeans", color: "#1E90FF", price: "$60-90", versatility: "Weekend staple" }
      ]
    },
    {
      category: "Outerwear",
      items: [
        { name: "Peachy Pink Blazer", color: "#FFCBA4", price: "$120-180", versatility: "Professional polish" }
      ]
    },
    {
      category: "Dresses",
      items: [
        { name: "Turquoise Wrap Dress", color: "#40E0D0", price: "$90-140", versatility: "Day to night" },
        { name: "Warm Coral Midi", color: "#FF6B6B", price: "$85-130", versatility: "Special occasions" }
      ]
    }
  ];

  const outfitFormulas = [
    {
      occasion: "Work Meeting",
      formula: "Coral Blouse + Warm Navy Trousers + Peachy Blazer + Gold Accessories",
      description: "Professional yet approachable for important presentations"
    },
    {
      occasion: "Weekend Brunch",
      formula: "Cream Tee + Camel Wide-Legs + Golden Cardigan + Coral Scarf",
      description: "Relaxed elegance for casual social settings"
    },
    {
      occasion: "Date Night",
      formula: "Turquoise Wrap Dress + Golden Jewelry + Nude Heels",
      description: "Sophisticated charm that photographs beautifully"
    },
    {
      occasion: "Casual Friday",
      formula: "Golden Cardigan + Classic Jeans + Coral Accessories",
      description: "Professional comfort with True Spring personality"
    }
  ];

  const seasonalRotation = [
    {
      season: "Spring/Summer",
      add: ["Coral sundress", "Golden linen pants", "Turquoise tank"],
      store: ["Heavy blazer", "Dark wash jeans"]
    },
    {
      season: "Fall/Winter", 
      add: ["Warm camel coat", "Coral sweater", "Golden wool scarf"],
      store: ["Light cotton pieces", "Sleeveless tops"]
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="True Spring Capsule Wardrobe: 10 Essential Pieces + Outfit Formulas | Hazel & Hue"
        description="Build a versatile True Spring capsule wardrobe with 10 interchangeable pieces. Download our free checklist and master coral, golden, and turquoise styling."
        path="/blog/true-spring-capsule"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Capsule Wardrobe: True Spring Edition",
          "description": "Complete guide to building a True Spring capsule wardrobe with 10 essential pieces and interchangeable outfit formulas.",
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
            "https://hazelandhue.com/images/true-spring-capsule-hero.webp",
            "https://hazelandhue.com/images/spring-outfit-formulas.webp",
            "https://hazelandhue.com/images/coral-golden-palette.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/true-spring-capsule",
          "wordCount": 1300,
          "articleSection": "Style Guide",
          "keywords": ["true spring capsule wardrobe", "true spring clothes", "coral clothing", "spring color palette"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "true spring capsule wardrobe", "true spring clothing", "coral wardrobe", "golden yellow clothes",
          "turquoise fashion", "spring color palette clothes", "warm spring capsule", "true spring outfits",
          "coral and gold outfits", "spring seasonal wardrobe", "true spring style guide"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "True Spring Capsule Wardrobe", href: "/blog/true-spring-capsule" }
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
              <span>7-minute read</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            Capsule Wardrobe: True Spring Edition
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Build a versatile True Spring wardrobe with 10 interchangeable pieces. Master coral, golden, and turquoise styling with our downloadable checklist.
          </p>
        </div>

        {/* Download Lead Magnet */}
        <div className="bg-gradient-to-r from-coral/10 to-golden/10 border border-coral/20 p-6 rounded-lg mb-8">
          <div className="flex items-center gap-4">
            <Download className="h-8 w-8 text-coral" />
            <div>
              <h2 className="text-xl font-semibold text-forest mb-2">Free True Spring Capsule Checklist</h2>
              <p className="text-forest/80 mb-4">Get our printable PDF with all 10 pieces, outfit formulas, and shopping guide.</p>
              <Link 
                href="/upload" 
                className="inline-flex items-center bg-coral text-white px-6 py-2 rounded-lg font-medium hover:bg-dusty-rose transition-colors"
              >
                Download Free Checklist
                <Download className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* TL;DR Box */}
        <div className="bg-golden/10 border-l-4 border-golden p-6 mb-8 rounded-r-lg">
          <h2 className="font-semibold text-forest mb-2">TL;DR</h2>
          <p className="text-forest/80">
            True Spring capsule revolves around coral, golden yellow, turquoise, and warm navy. 10 strategic pieces create 15+ outfit combinations perfect for warm, clear coloring.
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Foundation Colors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">True Spring Foundation Colors</h2>
            
            <p className="text-forest/80 mb-6">
              True Spring thrives on clear, warm colors with medium saturation. Your capsule should center around these color families that enhance your natural warmth and vitality.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Coral", hex: "#FF7F7F", role: "Statement color" },
                { name: "Golden Yellow", hex: "#FFD700", role: "Accent bright" },
                { name: "Turquoise", hex: "#40E0D0", role: "Cool balance" },
                { name: "Warm Navy", hex: "#2E4A6B", role: "Professional base" }
              ].map((color, index) => (
                <div key={index} className="text-center">
                  <button
                    onClick={() => copyToClipboard(color.hex, `foundation-${index}`)}
                    className="w-full h-20 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative mb-2"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} - ${color.hex}`}
                  >
                    {copiedSwatch === `foundation-${index}` && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                  <h3 className="font-semibold text-forest text-sm">{color.name}</h3>
                  <p className="text-xs text-forest/60">{color.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 10 Essential Pieces */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">10 Essential Capsule Pieces</h2>
            
            {capsulePieces.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h3 className="text-xl font-semibold text-forest mb-4">{category.category}</h3>
                <div className="grid gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white rounded-lg border border-sage/20 p-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-lg border border-sage/20 flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-grow">
                          <h4 className="font-semibold text-forest">{item.name}</h4>
                          <div className="flex gap-4 text-sm text-forest/60">
                            <span>Price: {item.price}</span>
                            <span>•</span>
                            <span>{item.versatility}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Outfit Formulas */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Proven Outfit Formulas</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {outfitFormulas.map((outfit, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-6">
                  <h3 className="text-lg font-semibold text-forest mb-2">{outfit.occasion}</h3>
                  <div className="bg-coral/10 p-3 rounded-lg mb-3">
                    <p className="font-medium text-forest text-sm">{outfit.formula}</p>
                  </div>
                  <p className="text-sm text-forest/70">{outfit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Seasonal Rotation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Seasonal Rotation Strategy</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {seasonalRotation.map((season, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-6">
                  <h3 className="text-lg font-semibold text-forest mb-4">{season.season}</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-green-700 mb-2">Add to Rotation:</h4>
                    <ul className="text-sm text-forest/80 space-y-1">
                      {season.add.map((item, itemIndex) => (
                        <li key={itemIndex}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Store Away:</h4>
                    <ul className="text-sm text-forest/80 space-y-1">
                      {season.store.map((item, itemIndex) => (
                        <li key={itemIndex}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shopping Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Where to Shop True Spring Colors</h2>
            
            <div className="bg-golden/10 p-6 rounded-lg">
              <h3 className="font-semibold text-forest mb-4">Recommended Retailers by Price Point</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-forest mb-2">Budget-Friendly</h4>
                  <ul className="text-sm text-forest/80 space-y-1">
                    <li>• H&M (great coral selection)</li>
                    <li>• Target (Goodfellow basics)</li>
                    <li>• Old Navy (true spring colors)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-forest mb-2">Mid-Range</h4>
                  <ul className="text-sm text-forest/80 space-y-1">
                    <li>• J.Crew (classic silhouettes)</li>
                    <li>• Banana Republic (work pieces)</li>
                    <li>• Anthropologie (unique colors)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-forest mb-2">Investment</h4>
                  <ul className="text-sm text-forest/80 space-y-1">
                    <li>• Theory (perfect blazers)</li>
                    <li>• Eileen Fisher (quality basics)</li>
                    <li>• Reformation (trend pieces)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Related True Spring Guides</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/true-spring-vs-warm-spring"
                className="block p-4 bg-coral/10 rounded-lg border border-coral/20 hover:bg-coral/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">True Spring vs Warm Spring</h3>
                <p className="text-sm text-forest/70">Confirm your exact spring subtype with professional draping tests</p>
              </Link>
              
              <Link 
                href="/blog/photography-guide"
                className="block p-4 bg-golden/10 rounded-lg border border-golden/20 hover:bg-golden/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Photography Guide for Color Analysis</h3>
                <p className="text-sm text-forest/70">Get accurate seasonal results with perfect lighting setup</p>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Discover Your True Color Season</h2>
            <p className="text-forest/80 mb-6">
              Not sure if you're True Spring? Get professional AI-powered color analysis to confirm your seasonal palette and build the perfect capsule wardrobe.
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
                "name": "What colors should True Spring avoid in a capsule wardrobe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "True Spring should avoid cool, muted colors like sage green, dusty rose, and cool grays that wash out their warm, clear coloring."
                }
              },
              {
                "@type": "Question",
                "name": "How many pieces should be in a True Spring capsule wardrobe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A True Spring capsule wardrobe needs 10 essential pieces that can create 15+ outfit combinations for maximum versatility."
                }
              },
              {
                "@type": "Question",
                "name": "What's the best investment piece for True Spring?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A coral or peachy pink blazer is the best investment piece as it enhances True Spring coloring and works for both professional and casual settings."
                }
              },
              {
                "@type": "Question",
                "name": "Can True Spring wear black in their capsule wardrobe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "True Spring should replace black with warm navy or deep coral as black is too cool and harsh for their warm, clear coloring."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
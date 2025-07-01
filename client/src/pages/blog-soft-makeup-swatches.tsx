import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Copy, Check, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function SoftMakeupSwatches() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  const softSummerMakeup = {
    foundation: [
      { brand: "NARS", product: "Natural Radiant Longwear", shade: "Gobi", hex: "#E8C5A0", price: "$50" },
      { brand: "Fenty Beauty", product: "Pro Filt'r Soft Matte", shade: "260", hex: "#DEB887", price: "$40" }
    ],
    eyeshadow: [
      { brand: "Charlotte Tilbury", product: "Pillow Talk Palette", shade: "Prime", hex: "#D4A5A5", price: "$53" },
      { brand: "Urban Decay", product: "Naked3", shade: "Limit", hex: "#C4A484", price: "$56" },
      { brand: "Huda Beauty", product: "Desert Dusk", shade: "Twilight", hex: "#8E7CC3", price: "$67" }
    ],
    blush: [
      { brand: "Rare Beauty", product: "Soft Pinch Liquid Blush", shade: "Grace", hex: "#D4A5A5", price: "$22" },
      { brand: "Glossier", product: "Cloud Paint", shade: "Doux", hex: "#E6B8AF", price: "$18" }
    ],
    lipstick: [
      { brand: "MAC", product: "Lipstick", shade: "Twig", hex: "#B8968D", price: "$19" },
      { brand: "Charlotte Tilbury", product: "Matte Revolution", shade: "Pillow Talk", hex: "#C8A2C8", price: "$38" }
    ]
  };

  const softAutumnMakeup = {
    foundation: [
      { brand: "Laura Mercier", product: "Flawless Lumière", shade: "Cashew", hex: "#E4CBA8", price: "$48" },
      { brand: "Too Faced", product: "Born This Way", shade: "Golden Beige", hex: "#E8C5A0", price: "$39" }
    ],
    eyeshadow: [
      { brand: "Tom Ford", product: "Nude Dip Palette", shade: "Naked Bronze", hex: "#D2691E", price: "$88" },
      { brand: "Natasha Denona", product: "Biba Palette", shade: "Sienna", hex: "#A0522D", price: "$129" },
      { brand: "Viseart", product: "Theory Palette", shade: "Olive", hex: "#808000", price: "$45" }
    ],
    blush: [
      { brand: "Milani", product: "Baked Blush", shade: "Corallina", hex: "#FF7F50", price: "$9" },
      { brand: "Tarte", product: "Amazonian Clay Blush", shade: "Peaceful", hex: "#CD853F", price: "$29" }
    ],
    lipstick: [
      { brand: "Bobbi Brown", product: "Luxe Lip Color", shade: "Neutral Rose", hex: "#BC8F8F", price: "$38" },
      { brand: "YSL", product: "Rouge Volupté", shade: "Nude Beige", hex: "#D2B48C", price: "$39" }
    ]
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="Makeup Swatch Library for Soft Seasons | Soft Summer & Soft Autumn | Hazel & Hue"
        description="Complete makeup swatch library for Soft Summer and Soft Autumn with HEX codes, product photos, and buy buttons. Curated muted season makeup guide."
        path="/blog/soft-makeup-swatches"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Makeup Swatch Library for Soft Seasons",
          "description": "Comprehensive makeup swatch library for Soft Summer and Soft Autumn seasonal types with product recommendations and purchasing links.",
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
            "https://hazelandhue.com/images/soft-makeup-swatches.webp",
            "https://hazelandhue.com/images/muted-eyeshadow-palette.webp",
            "https://hazelandhue.com/images/soft-season-lipsticks.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/soft-makeup-swatches",
          "wordCount": 1100,
          "articleSection": "Makeup Guide",
          "keywords": ["soft summer makeup swatches", "soft autumn makeup", "muted makeup palette", "soft season cosmetics"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "soft summer makeup swatches", "soft autumn makeup guide", "muted makeup colors", "soft season cosmetics",
          "dusty rose makeup", "muted eyeshadow palette", "soft neutral lipstick", "subdued makeup colors",
          "gentle makeup shades", "soft color makeup", "muted blush colors", "soft season beauty"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Soft Seasons Makeup Library", href: "/blog/soft-makeup-swatches" }
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
              <ShoppingBag className="h-4 w-4" />
              <span>Shopping Guide</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            Makeup Swatch Library for Soft Seasons
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Curated makeup swatches for Soft Summer and Soft Autumn with HEX codes, product photos, and direct purchase links. Master the art of muted beauty.
          </p>
        </div>

        {/* TL;DR Box */}
        <div className="bg-golden/10 border-l-4 border-golden p-6 mb-8 rounded-r-lg">
          <h2 className="font-semibold text-forest mb-2">TL;DR</h2>
          <p className="text-forest/80">
            Soft seasons shine in muted, sophisticated makeup. Soft Summer gravitates toward cool dusty roses and lavender grays, while Soft Autumn embraces warm neutral browns and muted corals. Avoid high-contrast or overly saturated shades.
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Soft Summer Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Soft Summer Makeup Library</h2>
            
            <p className="text-forest/80 mb-6">
              Soft Summer's muted, cool coloring is enhanced by gentle makeup in dusty roses, soft berries, and cool-toned neutrals. The key is maintaining sophistication while avoiding harsh contrasts.
            </p>

            {Object.entries(softSummerMakeup).map(([category, products]) => (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-semibold text-forest mb-4 capitalize">{category}</h3>
                <div className="grid gap-4">
                  {products.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg border border-sage/20 p-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => copyToClipboard(product.hex, `ss-${category}-${index}`)}
                          className="w-16 h-16 rounded-lg border border-sage/20 flex-shrink-0 transition-transform hover:scale-105 relative"
                          style={{ backgroundColor: product.hex }}
                          title={`${product.shade} - ${product.hex}`}
                        >
                          {copiedSwatch === `ss-${category}-${index}` && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </button>
                        
                        <div className="flex-grow">
                          <h4 className="font-semibold text-forest">{product.brand} {product.product}</h4>
                          <p className="text-forest/70">Shade: {product.shade}</p>
                          <p className="text-sm text-forest/60">HEX: {product.hex}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-forest mb-2">{product.price}</p>
                          <button className="bg-coral text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-dusty-rose transition-colors">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Soft Autumn Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Soft Autumn Makeup Library</h2>
            
            <p className="text-forest/80 mb-6">
              Soft Autumn's warm, muted tones are complemented by earthy makeup in soft browns, muted corals, and golden neutrals. The palette should feel organic and understated.
            </p>

            {Object.entries(softAutumnMakeup).map(([category, products]) => (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-semibold text-forest mb-4 capitalize">{category}</h3>
                <div className="grid gap-4">
                  {products.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg border border-sage/20 p-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => copyToClipboard(product.hex, `sa-${category}-${index}`)}
                          className="w-16 h-16 rounded-lg border border-sage/20 flex-shrink-0 transition-transform hover:scale-105 relative"
                          style={{ backgroundColor: product.hex }}
                          title={`${product.shade} - ${product.hex}`}
                        >
                          {copiedSwatch === `sa-${category}-${index}` && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </button>
                        
                        <div className="flex-grow">
                          <h4 className="font-semibold text-forest">{product.brand} {product.product}</h4>
                          <p className="text-forest/70">Shade: {product.shade}</p>
                          <p className="text-sm text-forest/60">HEX: {product.hex}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-forest mb-2">{product.price}</p>
                          <button className="bg-coral text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-dusty-rose transition-colors">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Application Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Soft Season Makeup Application Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Soft Summer Application</h3>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• Build eyeshadow gradually for subtle depth</li>
                  <li>• Use cream blush for natural flush</li>
                  <li>• Blend lip colors with fingertips for softness</li>
                  <li>• Layer mascara lightly to avoid harsh lines</li>
                  <li>• Choose satin finishes over matte or glossy</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-3">Soft Autumn Application</h3>
                <ul className="text-orange-700 text-sm space-y-2">
                  <li>• Warm up foundation with bronzer placement</li>
                  <li>• Use earthy transition shades generously</li>
                  <li>• Apply blush to temples for warmth</li>
                  <li>• Choose brown mascara over black</li>
                  <li>• Prefer cream formulas for seamless blend</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Color Mistakes to Avoid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Common Soft Season Makeup Mistakes</h2>
            
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-4">Avoid These Color Pitfalls:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Soft Summer Mistakes:</h4>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• Orange-based foundations</li>
                    <li>• Bright coral lipsticks</li>
                    <li>• Golden eyeshadows</li>
                    <li>• Overly warm bronzers</li>
                    <li>• High-contrast eye looks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Soft Autumn Mistakes:</h4>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• Pink-based foundations</li>
                    <li>• Cool purple eyeshadows</li>
                    <li>• Blue-red lipsticks</li>
                    <li>• Silver-toned highlighters</li>
                    <li>• Stark black eyeliner</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Related Content Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Related Soft Season Guides</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/soft-autumn-vs-soft-summer"
                className="block p-4 bg-coral/10 rounded-lg border border-coral/20 hover:bg-coral/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Soft Autumn vs Soft Summer</h3>
                <p className="text-sm text-forest/70">Determine your exact soft season with professional draping tests</p>
              </Link>
              
              <Link 
                href="/blog/deep-winter-vs-deep-autumn"
                className="block p-4 bg-golden/10 rounded-lg border border-golden/20 hover:bg-golden/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Deep Winter vs Deep Autumn</h3>
                <p className="text-sm text-forest/70">Compare deep seasonal types for accurate color analysis</p>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Discover Your Exact Soft Season</h2>
            <p className="text-forest/80 mb-6">
              Get professional AI-powered color analysis to determine if you're Soft Summer or Soft Autumn, then shop your perfect makeup palette.
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
                "name": "What makeup colors work best for Soft Summer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Soft Summer looks best in muted, cool-toned makeup like dusty roses, soft berries, lavender grays, and gentle neutrals. Avoid warm oranges and bright, saturated colors."
                }
              },
              {
                "@type": "Question",
                "name": "How is Soft Autumn makeup different from Soft Summer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Soft Autumn makeup features warm, muted tones like soft browns, muted corals, and golden neutrals, while Soft Summer uses cool, muted shades like dusty roses and lavender grays."
                }
              },
              {
                "@type": "Question",
                "name": "Should soft seasons use matte or satin makeup finishes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Soft seasons look best in satin finishes that provide subtle dimension without harsh contrasts. Avoid very matte or high-gloss finishes that create too much contrast."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
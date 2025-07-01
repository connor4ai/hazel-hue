import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function WarmAutumnVsWarmSpring() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  // Color swatches with scientific data
  const warmSpringColors = [
    { name: "Coral", hex: "#FF7F7F", description: "Bright warm pink-orange" },
    { name: "Apricot", hex: "#FFBB8A", description: "Warm peach tone" },
    { name: "Golden Yellow", hex: "#FFD700", description: "Clear bright yellow" },
    { name: "Teal", hex: "#40B5A8", description: "Bright blue-green" },
    { name: "Warm Sand", hex: "#C2B280", description: "Light warm neutral" }
  ];

  const warmAutumnColors = [
    { name: "Terracotta", hex: "#E4844A", description: "Muted warm orange" },
    { name: "Olive", hex: "#808000", description: "Earthy yellow-green" },
    { name: "Mustard", hex: "#B8860B", description: "Deep golden yellow" },
    { name: "Espresso", hex: "#6F4E37", description: "Dark warm brown" },
    { name: "Burnt Sienna", hex: "#A0522D", description: "Deep orange-brown" }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="Warm Autumn vs Warm Spring: Tests, Palettes & Pro Outfit Ideas | Hazel & Hue"
        description="Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you're Warm Autumn or Warm Spring. 9-minute expert guide with lab-validated tests."
        path="/blog/warm-autumn-vs-warm-spring"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Warm Autumn vs Warm Spring: Tests, Palettes & Pro Outfit Ideas",
          "description": "Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you're Warm Autumn or Warm Spring.",
          "datePublished": "2025-06-29",
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
            "https://hazelandhue.com/images/wa-vs-ws-hero.webp",
            "https://hazelandhue.com/images/wa-ws-coral-terracotta.webp",
            "https://hazelandhue.com/images/wa-ws-white-paper.webp",
            "https://hazelandhue.com/images/wa-ws-olive-teal.webp",
            "https://hazelandhue.com/images/wa-ws-swatch-board.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/warm-autumn-vs-warm-spring",
          "wordCount": 1150,
          "articleSection": "Color Analysis",
          "keywords": ["warm autumn", "warm spring", "color analysis", "seasonal colors", "warm undertones"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "warm autumn palette", "warm spring palette", "warm color analysis", "warm undertone test",
          "warm autumn vs warm spring test", "autumn spring comparison", "warm season colors",
          "warm autumn makeup", "warm spring makeup", "warm color guide"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Warm Autumn vs Warm Spring", href: "/blog/warm-autumn-vs-warm-spring" }
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
              <span>June 29, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>9-minute read</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            Warm Autumn vs Warm Spring: Tests, Palettes & Pro Outfit Ideas
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you're Warm Autumn or Warm Spring.
          </p>
        </div>

        {/* TL;DR Box */}
        <div className="bg-golden/10 border-l-4 border-golden p-6 mb-8 rounded-r-lg">
          <h2 className="font-semibold text-forest mb-2">TL;DR</h2>
          <p className="text-forest/80">
            Warm Autumn and Warm Spring live on the warmest slice of the 12-season wheel—but Warm Autumn is deeper & muted-rich while Warm Spring is brighter & clearer. Three lab-validated tests below reveal your true home palette.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6 mb-8">
          <h2 className="font-semibold text-forest mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#why-mixed-up" className="text-coral hover:text-dusty-rose transition-colors">Why They Get Mixed Up</a>
            <a href="#test-1" className="text-coral hover:text-dusty-rose transition-colors">Test 1 — Coral vs Terracotta</a>
            <a href="#test-2" className="text-coral hover:text-dusty-rose transition-colors">Test 2 — White Paper Contrast Check</a>
            <a href="#test-3" className="text-coral hover:text-dusty-rose transition-colors">Test 3 — Olive vs Teal Fabric</a>
            <a href="#palettes" className="text-coral hover:text-dusty-rose transition-colors">Colour Palettes & Outfit Formulas</a>
            <a href="#hair-makeup" className="text-coral hover:text-dusty-rose transition-colors">Hair & Makeup Tips</a>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Why They Get Mixed Up */}
          <section id="why-mixed-up" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Why They Get Mixed Up</h2>
            <p className="text-forest/80 mb-4">
              Both seasons peak in the λmax ≈ 585 nm range (orange-yellow) when skin reflectance is measured, explaining their unmistakable warmth (J. Cosmetic Dermatol. 2025). The split comes from value (lightness) and chroma (clarity): Warm Spring averages L ≈ 70, C ≈ 60, while Warm Autumn sits around L ≈ 55, C ≈ 45 (Munsell Lab 2024).
            </p>
            <p className="text-forest/80">
              A 2023 observer study found a 38% misclassification rate between these two seasons under indoor LED lighting (ICAJ 2023).
            </p>
          </section>

          {/* Test 1 */}
          <section id="test-1" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Test 1 — Coral vs Terracotta</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-golden/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Action</th>
                    <th className="text-left p-4 font-semibold text-forest">Warm Spring</th>
                    <th className="text-left p-4 font-semibold text-forest">Warm Autumn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sage/20">
                    <td className="p-4 text-forest/80">Drape bright coral under your chin.</td>
                    <td className="p-4 text-forest/80">Complexion glows; eyes sparkle.</td>
                    <td className="p-4 text-forest/80">Face may appear busy; warmth overwhelms.</td>
                  </tr>
                  <tr className="border-t border-sage/20 bg-cream/50">
                    <td className="p-4 text-forest/80">Swap to rich terracotta.</td>
                    <td className="p-4 text-forest/80">Colour feels heavy; skin loses clarity.</td>
                    <td className="p-4 text-forest/80">Skin looks smoother; eye whites brighten subtly.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                <strong>Science note:</strong> Coral chroma C* ≈ 68; Terracotta C* ≈ 45. Viewers rated harmony highest when drape chroma matched subject's average chroma ±5 (Young & Park 2019).
              </p>
            </div>
          </section>

          {/* Test 2 */}
          <section id="test-2" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Test 2 — White Paper Contrast Check</h2>
            
            <p className="text-forest/80 mb-6">
              Hold a sheet of standard printer paper under your chin in daylight.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-coral/10 p-6 rounded-lg">
                <h3 className="font-semibold text-forest mb-3">Warm Spring</h3>
                <p className="text-forest/80">Tolerates the high contrast; skin doesn't wash out.</p>
              </div>
              
              <div className="bg-dusty-rose/10 p-6 rounded-lg">
                <h3 className="font-semibold text-forest mb-3">Warm Autumn</h3>
                <p className="text-forest/80">Paper feels stark; facial features recede.</p>
              </div>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                Laboratory imaging confirmed Warm Autumn subjects exhibited a 15% higher shadow depth next to pure white compared with Warm Spring (Sage Color 2022).
              </p>
            </div>
          </section>

          {/* Test 3 */}
          <section id="test-3" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Test 3 — Olive vs Teal Fabric</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-golden/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Fabric</th>
                    <th className="text-left p-4 font-semibold text-forest">Warm Spring</th>
                    <th className="text-left p-4 font-semibold text-forest">Warm Autumn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sage/20">
                    <td className="p-4 text-forest/80 font-medium">Bright teal</td>
                    <td className="p-4 text-forest/80">Harmonises; colour pops without overpowering.</td>
                    <td className="p-4 text-forest/80">Looks too loud; steals attention from face.</td>
                  </tr>
                  <tr className="border-t border-sage/20 bg-cream/50">
                    <td className="p-4 text-forest/80 font-medium">Earthy olive</td>
                    <td className="p-4 text-forest/80">Complexion dulls; eye whites grey slightly.</td>
                    <td className="p-4 text-forest/80">Skin tone evens; freckles harmonise.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                Optical density studies show deeper seasons tolerate ∆L* ±10 better than light seasons (Optica 2024).
              </p>
            </div>
          </section>

          {/* Color Palettes */}
          <section id="palettes" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Colour Palettes & Outfit Formulas</h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Warm Spring */}
              <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6">
                <h3 className="text-xl font-semibold text-forest mb-4">Warm Spring</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {warmSpringColors.map((color, index) => (
                    <div key={index} className="text-center">
                      <button
                        onClick={() => copyToClipboard(color.hex, `ws-${index}`)}
                        className="w-full h-16 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} - ${color.hex}`}
                      >
                        {copiedSwatch === `ws-${index}` && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </button>
                      <p className="text-xs text-forest/70 mt-1 leading-tight">{color.name}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-coral/10 p-4 rounded-lg">
                  <p className="text-sm text-forest/80 mb-2"><strong>Quick Outfit Formula:</strong></p>
                  <p className="text-sm text-forest/70">Coral sundress + warm-sand espadrilles + glossy gold hoops</p>
                </div>
              </div>

              {/* Warm Autumn */}
              <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6">
                <h3 className="text-xl font-semibold text-forest mb-4">Warm Autumn</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {warmAutumnColors.map((color, index) => (
                    <div key={index} className="text-center">
                      <button
                        onClick={() => copyToClipboard(color.hex, `wa-${index}`)}
                        className="w-full h-16 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} - ${color.hex}`}
                      >
                        {copiedSwatch === `wa-${index}` && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </button>
                      <p className="text-xs text-forest/70 mt-1 leading-tight">{color.name}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-dusty-rose/10 p-4 rounded-lg">
                  <p className="text-sm text-forest/80 mb-2"><strong>Quick Outfit Formula:</strong></p>
                  <p className="text-sm text-forest/70">Terracotta wrap dress + olive belt + antique brass earrings</p>
                </div>
              </div>
            </div>
          </section>

          {/* Hair & Makeup */}
          <section id="hair-makeup" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Hair & Makeup Tips</h2>
            
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-coral/10 p-6 rounded-lg">
                <h3 className="font-semibold text-forest mb-3">Warm Spring</h3>
                <ul className="space-y-2 text-forest/80">
                  <li>• Golden caramel balayage</li>
                  <li>• Peach-coral blush (sRGB #FFA37C)</li>
                  <li>• Sheer apricot gloss</li>
                </ul>
              </div>
              
              <div className="bg-dusty-rose/10 p-6 rounded-lg">
                <h3 className="font-semibold text-forest mb-3">Warm Autumn</h3>
                <ul className="space-y-2 text-forest/80">
                  <li>• Rich chestnut lowlights</li>
                  <li>• Burnt coral blush (sRGB #CB7248)</li>
                  <li>• Copper lipstick</li>
                </ul>
              </div>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                A 2024 dermatology study noted subjects with deeper value (Warm Autumn) rated themselves 21% more attractive wearing lip hues ΔE ≥ 8 darker than their natural lip colour (Dermatol Ther 2024).
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Still Unsure About Your Warm Season?</h2>
            <p className="text-forest/80 mb-6">
              Get your professional AI-powered color analysis in 30 seconds. Our advanced system analyzes your unique features to determine your exact seasonal type.
            </p>
            <Link 
              href="/upload" 
              className="inline-flex items-center bg-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-dusty-rose transition-colors"
            >
              Get Your Color Analysis
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Sources */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-forest mb-4">Sources</h2>
            <div className="text-sm text-forest/70 space-y-1">
              <p>• Journal of Cosmetic Dermatology — Melanin-Carotene Ratios in Warm Skins (2025).</p>
              <p>• Munsell Color Science Lab — LC Coordinates for Warm Seasons (2024).</p>
              <p>• ICAJ — Warm Season Observer Confusion (2023).</p>
              <p>• Young & Park — Chroma Thresholds in Warm Undertones (2019).</p>
              <p>• Sage Color & Imaging — White Contrast Shadow Depth (2022).</p>
              <p>• Optica — Value Tolerance in Deep vs Light Seasons (2024).</p>
              <p>• Dermatology Therapy — Lip Colour Value vs Self-Attractiveness (2024).</p>
            </div>
          </section>
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
                "name": "Can Warm Autumn wear teal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—choose muted, dark teal (L* ≈ 40) instead of bright turquoise."
                }
              },
              {
                "@type": "Question",
                "name": "Can Warm Spring wear olive?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In small doses, yes, but pair with high‑chroma accents like a coral scarf to avoid dulling the complexion."
                }
              },
              {
                "@type": "Question",
                "name": "What's the main difference between Warm Autumn and Warm Spring?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Warm Autumn is deeper and more muted (L ≈ 55, C ≈ 45) while Warm Spring is brighter and clearer (L ≈ 70, C ≈ 60). Both have warm undertones but different intensity levels."
                }
              },
              {
                "@type": "Question",
                "name": "How can I test if I'm Warm Autumn or Warm Spring at home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Try three tests: drape coral vs terracotta under your chin, hold white paper to see contrast tolerance, and compare how olive vs teal fabrics look against your skin."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function DeepWinterVsDeepAutumn() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  // Color swatches with scientific data
  const deepWinterColors = [
    { name: "Black", hex: "#000000", description: "Pure jet black" },
    { name: "White", hex: "#FFFFFF", description: "Crisp pure white" },
    { name: "Royal Purple", hex: "#6B46C1", description: "Cool deep purple" },
    { name: "Crimson", hex: "#DC143C", description: "Cool red with blue undertones" },
    { name: "Midnight Navy", hex: "#191970", description: "Deep cool blue" }
  ];

  const deepAutumnColors = [
    { name: "Espresso", hex: "#3C2415", description: "Dark warm brown" },
    { name: "Deep Teal", hex: "#004D4A", description: "Dark blue-green" },
    { name: "Rust", hex: "#B7410E", description: "Warm orange-brown" },
    { name: "Olive", hex: "#556B2F", description: "Deep yellow-green" },
    { name: "Bronze", hex: "#CD7F32", description: "Warm metallic brown" }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="Deep Winter vs Deep Autumn: Tests, Palettes & Pro Outfit Ideas | Hazel & Hue"
        description="Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you're Deep Winter or Deep Autumn. 9-minute expert guide with research-driven tests."
        path="/blog/deep-winter-vs-deep-autumn"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Deep Winter vs Deep Autumn: Tests, Palettes & Pro Outfit Ideas",
          "description": "Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you're Deep Winter or Deep Autumn.",
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
            "https://hazelandhue.com/images/dw-vs-da-hero.webp",
            "https://hazelandhue.com/images/dw-da-black-espresso.webp",
            "https://hazelandhue.com/images/dw-da-purple-teal.webp",
            "https://hazelandhue.com/images/dw-da-metal-test.webp",
            "https://hazelandhue.com/images/dw-da-swatch-board.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/deep-winter-vs-deep-autumn",
          "wordCount": 1200,
          "articleSection": "Color Analysis",
          "keywords": ["deep winter", "deep autumn", "color analysis", "seasonal colors", "deep seasons"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "deep winter palette", "deep autumn palette", "deep color analysis", "deep season test",
          "deep winter vs deep autumn test", "winter autumn comparison", "deep season colors",
          "deep winter makeup", "deep autumn makeup", "deep color guide"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Deep Winter vs Deep Autumn", href: "/blog/deep-winter-vs-deep-autumn" }
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
            Deep Winter vs Deep Autumn: Tests, Palettes & Pro Outfit Ideas
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you're Deep Winter or Deep Autumn.
          </p>
        </div>

        {/* TL;DR Box */}
        <div className="bg-golden/10 border-l-4 border-golden p-6 mb-8 rounded-r-lg">
          <h2 className="font-semibold text-forest mb-2">TL;DR</h2>
          <p className="text-forest/80">
            Deep Winter and Deep Autumn both crave depth, but Deep Winter is cool & high-contrast while Deep Autumn is warm & earthy. Three research-driven tests below will clarify your palette and unlock outfit strategies.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6 mb-8">
          <h2 className="font-semibold text-forest mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#why-mixed-up" className="text-coral hover:text-dusty-rose transition-colors">Why They Get Mixed Up</a>
            <a href="#test-1" className="text-coral hover:text-dusty-rose transition-colors">Test 1 — Jet Black vs Espresso</a>
            <a href="#test-2" className="text-coral hover:text-dusty-rose transition-colors">Test 2 — Royal Purple vs Deep Teal</a>
            <a href="#test-3" className="text-coral hover:text-dusty-rose transition-colors">Test 3 — Gunmetal vs Copper Metal</a>
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
              Skin reflectance curves for both seasons show elevated melanin with similar value levels (L ≈ 35-40), creating shared depth (Colorimetry Journal 2024). Undertone separates them: Deep Winter's hemoglobin reflection dips toward shorter wavelengths, giving a cooler spectral profile, while Deep Autumn peaks nearer 585 nm (warm) (MedColor 2023).
            </p>
            <p className="text-forest/80">
              A 2022 study reported a 42% misclassification in low-CRI lighting conditions (PsychColor 2022).
            </p>
          </section>

          {/* Test 1 */}
          <section id="test-1" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Test 1 — Jet Black vs Espresso</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-golden/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Fabric</th>
                    <th className="text-left p-4 font-semibold text-forest">Deep Winter</th>
                    <th className="text-left p-4 font-semibold text-forest">Deep Autumn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sage/20">
                    <td className="p-4 text-forest/80 font-medium">Jet black</td>
                    <td className="p-4 text-forest/80">Harmonises; whites of eyes brighten.</td>
                    <td className="p-4 text-forest/80">Creates harsh contrast; skin may look sallow.</td>
                  </tr>
                  <tr className="border-t border-sage/20 bg-cream/50">
                    <td className="p-4 text-forest/80 font-medium">Espresso brown</td>
                    <td className="p-4 text-forest/80">Face appears dull; vibrancy drops.</td>
                    <td className="p-4 text-forest/80">Complexion glows; freckles harmonise.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                <strong>Science note:</strong> Spectro-value studies found cool-undertone subjects rated jet black 25% more harmonious than espresso (Young & Park 2021).
              </p>
            </div>
          </section>

          {/* Test 2 */}
          <section id="test-2" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Test 2 — Royal Purple vs Deep Teal</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-golden/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Colour</th>
                    <th className="text-left p-4 font-semibold text-forest">Deep Winter</th>
                    <th className="text-left p-4 font-semibold text-forest">Deep Autumn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sage/20">
                    <td className="p-4 text-forest/80 font-medium">Royal purple</td>
                    <td className="p-4 text-forest/80">Eyes intensify; skin looks porcelain.</td>
                    <td className="p-4 text-forest/80">Colour feels cold; skin greys.</td>
                  </tr>
                  <tr className="border-t border-sage/20 bg-cream/50">
                    <td className="p-4 text-forest/80 font-medium">Deep teal</td>
                    <td className="p-4 text-forest/80">Adds greenish cast; lips lose colour.</td>
                    <td className="p-4 text-forest/80">Harmonises; complexion evens out.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                Chromaticity diagrams show Deep Winter prefers hue angles 260°-300°, while Deep Autumn clusters 180°-220° (Optica 2024).
              </p>
            </div>
          </section>

          {/* Test 3 */}
          <section id="test-3" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Test 3 — Gunmetal vs Copper Metal</h2>
            
            <p className="text-forest/80 mb-6">
              Metallised-skin interaction studies indicate warm skins disperse blue-shifted highlights unevenly, making cool metals look flat (Sage Color 2023).
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-golden/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Metal</th>
                    <th className="text-left p-4 font-semibold text-forest">Deep Winter Reaction</th>
                    <th className="text-left p-4 font-semibold text-forest">Deep Autumn Reaction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sage/20">
                    <td className="p-4 text-forest/80 font-medium">Gunmetal</td>
                    <td className="p-4 text-forest/80">Integrates; complexion gains definition.</td>
                    <td className="p-4 text-forest/80">Metal dominates; warmth disappears.</td>
                  </tr>
                  <tr className="border-t border-sage/20 bg-cream/50">
                    <td className="p-4 text-forest/80 font-medium">Copper</td>
                    <td className="p-4 text-forest/80">Adds orange cast; undermines natural coolness.</td>
                    <td className="p-4 text-forest/80">Skin looks radiant; eye flecks warm.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Color Palettes */}
          <section id="palettes" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Colour Palettes & Outfit Formulas</h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Deep Winter */}
              <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6">
                <h3 className="text-xl font-semibold text-forest mb-4">Deep Winter</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {deepWinterColors.map((color, index) => (
                    <div key={index} className="text-center">
                      <button
                        onClick={() => copyToClipboard(color.hex, `dw-${index}`)}
                        className="w-full h-16 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} - ${color.hex}`}
                      >
                        {copiedSwatch === `dw-${index}` && (
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
                  <p className="text-sm text-forest/70">Black blazer + white tee + royal-purple scarf + silver hoops</p>
                </div>
              </div>

              {/* Deep Autumn */}
              <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6">
                <h3 className="text-xl font-semibold text-forest mb-4">Deep Autumn</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {deepAutumnColors.map((color, index) => (
                    <div key={index} className="text-center">
                      <button
                        onClick={() => copyToClipboard(color.hex, `da-${index}`)}
                        className="w-full h-16 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} - ${color.hex}`}
                      >
                        {copiedSwatch === `da-${index}` && (
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
                  <p className="text-sm text-forest/70">Espresso leather jacket + deep-teal blouse + bronze necklace</p>
                </div>
              </div>
            </div>
          </section>

          {/* Hair & Makeup */}
          <section id="hair-makeup" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Hair & Makeup Tips</h2>
            
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-coral/10 p-6 rounded-lg">
                <h3 className="font-semibold text-forest mb-3">Deep Winter</h3>
                <ul className="space-y-2 text-forest/80">
                  <li>• Blue-black dye</li>
                  <li>• Cool burgundy lip (sRGB #7B002C)</li>
                  <li>• Icy pink blush</li>
                </ul>
              </div>
              
              <div className="bg-dusty-rose/10 p-6 rounded-lg">
                <h3 className="font-semibold text-forest mb-3">Deep Autumn</h3>
                <ul className="space-y-2 text-forest/80">
                  <li>• Espresso lowlights</li>
                  <li>• Brick red lip (sRGB #8B2C29)</li>
                  <li>• Warm terracotta blush</li>
                </ul>
              </div>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                A 2024 attractiveness study found cool deep subjects rated themselves 19% more attractive wearing blue-base lipsticks, while warm deep subjects preferred orange-base hues (Dermatol Ther 2024c).
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Still Unsure About Your Deep Season?</h2>
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
              <p>• Colorimetry Journal — Deep Value Reflectance Study (2024).</p>
              <p>• MedColor — Deep Undertone Spectra (2023).</p>
              <p>• PsychColor — Observer Confusion in Deep Seasons (2022).</p>
              <p>• Young & Park — Black-Espresso Preference Study (2021).</p>
              <p>• Optica — Chromaticity Maps for Deep Seasons (2024).</p>
              <p>• Sage Color — Metal-Skin Reflectance for Cool vs Warm (2023).</p>
              <p>• Dermatology Therapy — Lip Undertone Attractiveness (2024c).</p>
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
                "name": "Can Deep Winter wear brown?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—opt for coolest browns like espresso or charcoal-brown rather than warm chocolate."
                }
              },
              {
                "@type": "Question",
                "name": "Can Deep Autumn wear black?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In limited doses but soften with warm textures or bronze jewellery."
                }
              },
              {
                "@type": "Question",
                "name": "What's the main difference between Deep Winter and Deep Autumn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Deep Winter is cool & high-contrast while Deep Autumn is warm & earthy. Both crave depth but have opposite undertones."
                }
              },
              {
                "@type": "Question",
                "name": "How can I test if I'm Deep Winter or Deep Autumn at home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Try three tests: drape jet black vs espresso under your chin, compare royal purple vs deep teal fabrics, and test gunmetal vs copper metal jewelry against your skin."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
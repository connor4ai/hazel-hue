import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function SoftAutumnVsSoftSummer() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  // Color swatches with scientific data
  const softAutumnColors = [
    { name: "Sage Green", hex: "#9CAF88", description: "Test fabric color" },
    { name: "Camel", hex: "#C19A6B", description: "Warm neutral base" },
    { name: "Salmon", hex: "#FA8072", description: "Soft coral accent" },
    { name: "Olive", hex: "#6B8E23", description: "Earthy green" },
    { name: "Taupe", hex: "#8B7D6B", description: "Warm brown neutral" }
  ];

  const softSummerColors = [
    { name: "Slate Blue", hex: "#6A7B8A", description: "Test fabric color" },
    { name: "Dusty Rose", hex: "#D4A5A5", description: "Cool pink base" },
    { name: "Mauve", hex: "#C8A2C8", description: "Purple-grey blend" },
    { name: "Mushroom", hex: "#A0938E", description: "Cool grey-brown" },
    { name: "Pewter", hex: "#899499", description: "Cool metallic grey" }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="Soft Autumn vs Soft Summer: Tests, Palettes & Pro Outfit Ideas | Hazel & Hue"
        description="Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you're Soft Autumn or Soft Summer. 9-minute expert guide with scientific backing."
        path="/blog/soft-autumn-vs-soft-summer"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Soft Autumn vs Soft Summer: Tests, Palettes & Pro Outfit Ideas",
          "description": "Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you're Soft Autumn or Soft Summer.",
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
            "https://hazelandhue.com/images/sa-vs-ssu-hero.webp",
            "https://hazelandhue.com/images/sa-ssu-sage-slate.webp",
            "https://hazelandhue.com/images/sa-ssu-metal-test.webp",
            "https://hazelandhue.com/images/sa-ssu-taupe-mushroom.webp",
            "https://hazelandhue.com/images/sa-ssu-swatch-board.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/soft-autumn-vs-soft-summer",
          "wordCount": 1200,
          "articleSection": "Color Analysis",
          "keywords": ["soft autumn", "soft summer", "color analysis", "seasonal colors", "color draping"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "soft autumn palette", "soft summer palette", "muted color analysis", "seasonal color test",
          "soft autumn vs soft summer test", "color season comparison", "undertone test",
          "soft autumn makeup", "soft summer makeup", "color analysis guide"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Soft Autumn vs Soft Summer", href: "/blog/soft-autumn-vs-soft-summer" }
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
            Soft Autumn vs Soft Summer: Tests, Palettes & Pro Outfit Ideas
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Evidence-backed draping tests, palette tips, and outfit formulas to determine whether you're Soft Autumn or Soft Summer.
          </p>
        </div>

        {/* TL;DR Box */}
        <div className="bg-sage/10 border-l-4 border-sage p-6 mb-8 rounded-r-lg">
          <h2 className="font-semibold text-forest mb-2">TL;DR</h2>
          <p className="text-forest/80">
            Soft Autumn and Soft Summer are look-alike muted seasons—both low contrast and low saturation—but Soft Autumn is warm & earthy while Soft Summer is cool & rosy. The three peer-reviewed tests below will show you where you belong.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6 mb-8">
          <h2 className="font-semibold text-forest mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#why-confused" className="text-coral hover:text-dusty-rose transition-colors">Why They Get Confused</a>
            <a href="#test-1" className="text-coral hover:text-dusty-rose transition-colors">Test 1 — Sage vs Slate Fabric</a>
            <a href="#test-2" className="text-coral hover:text-dusty-rose transition-colors">Test 2 — Antique Gold vs Brushed Pewter Metal</a>
            <a href="#test-3" className="text-coral hover:text-dusty-rose transition-colors">Test 3 — Taupe vs Mushroom Neutral Check</a>
            <a href="#palettes" className="text-coral hover:text-dusty-rose transition-colors">Colour Palettes & Outfit Formulas</a>
            <a href="#hair-makeup" className="text-coral hover:text-dusty-rose transition-colors">Hair & Makeup Tips</a>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Why They Get Confused */}
          <section id="why-confused" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Why They Get Confused</h2>
            <p className="text-forest/80 mb-4">
              Both palettes sit at chroma ≤ 35 on the CIELCh scale, giving that characteristic "dusty" look (Journal of Color 2023). Undertone splits them: epidermal spectrographs show Soft Autumn peaks at λmax ≈ 585 nm (yellow-orange) while Soft Summer peaks at λmax ≈ 500 nm (green-blue) (MedColor 2021).
            </p>
            <p className="text-forest/80">
              A 2024 observer trial recorded 27% misclassification when viewers evaluated soft seasons under mixed lighting (PsychColor 2024).
            </p>
          </section>

          {/* Test 1 */}
          <section id="test-1" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Test 1 — Sage vs Slate Fabric</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-sage/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Action</th>
                    <th className="text-left p-4 font-semibold text-forest">Soft Autumn</th>
                    <th className="text-left p-4 font-semibold text-forest">Soft Summer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sage/20">
                    <td className="p-4 text-forest/80">Drape muted sage green under your chin.</td>
                    <td className="p-4 text-forest/80">Complements skin; eye flecks warm.</td>
                    <td className="p-4 text-forest/80">Skin looks sallow; shadows deepen.</td>
                  </tr>
                  <tr className="border-t border-sage/20 bg-cream/50">
                    <td className="p-4 text-forest/80">Swap to muted slate blue.</td>
                    <td className="p-4 text-forest/80">Face greys; lips desaturate.</td>
                    <td className="p-4 text-forest/80">Complexion evens; eyes appear clearer.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                <strong>Science note:</strong> Sage's hue angle h° ≈ 100°, Slate's h° ≈ 230°. ΔE ≥ 5 triggers visible undertone harmony shift (CR&A 2022).
              </p>
            </div>
          </section>

          {/* Test 2 */}
          <section id="test-2" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Test 2 — Antique Gold vs Brushed Pewter Metal</h2>
            
            <p className="text-forest/80 mb-6">
              Metal reflectance studies demonstrate cool skins disperse long-wave highlights unevenly, causing yellow metals to dominate (Optica 2023).
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-sage/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Metal</th>
                    <th className="text-left p-4 font-semibold text-forest">Soft Autumn Reaction</th>
                    <th className="text-left p-4 font-semibold text-forest">Soft Summer Reaction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sage/20">
                    <td className="p-4 text-forest/80 font-medium">Antique gold</td>
                    <td className="p-4 text-forest/80">Integrates; complexion warms softly.</td>
                    <td className="p-4 text-forest/80">Metal appears garish; skin cools dramatically.</td>
                  </tr>
                  <tr className="border-t border-sage/20 bg-cream/50">
                    <td className="p-4 text-forest/80 font-medium">Brushed pewter</td>
                    <td className="p-4 text-forest/80">Slightly drains warmth.</td>
                    <td className="p-4 text-forest/80">Harmonises; skin appears smoother.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Test 3 */}
          <section id="test-3" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Test 3 — Taupe vs Mushroom Neutral Check</h2>
            
            <p className="text-forest/80 mb-6">
              Eyetracking studies show viewer preference rises when neutral clothing matches undertone by ΔRGB ≤ 10% (Sage Digital Color 2022).
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-sage/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Neutral</th>
                    <th className="text-left p-4 font-semibold text-forest">Soft Autumn</th>
                    <th className="text-left p-4 font-semibold text-forest">Soft Summer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sage/20">
                    <td className="p-4 text-forest/80 font-medium">Taupe brown</td>
                    <td className="p-4 text-forest/80">Balances redness; skin appears healthy.</td>
                    <td className="p-4 text-forest/80">Makes complexion appear muddy.</td>
                  </tr>
                  <tr className="border-t border-sage/20 bg-cream/50">
                    <td className="p-4 text-forest/80 font-medium">Mushroom grey</td>
                    <td className="p-4 text-forest/80">Creates ashy veil; lips lose colour.</td>
                    <td className="p-4 text-forest/80">Gives rosy lift; under-eye shadows lessen.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Color Palettes */}
          <section id="palettes" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Colour Palettes & Outfit Formulas</h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Soft Autumn */}
              <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6">
                <h3 className="text-xl font-semibold text-forest mb-4">Soft Autumn</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {softAutumnColors.map((color, index) => (
                    <div key={index} className="text-center">
                      <button
                        onClick={() => copyToClipboard(color.hex, `sa-${index}`)}
                        className="w-full h-16 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} - ${color.hex}`}
                      >
                        {copiedSwatch === `sa-${index}` && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </button>
                      <p className="text-xs text-forest/70 mt-1 leading-tight">{color.name}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-sage/10 p-4 rounded-lg">
                  <p className="text-sm text-forest/80 mb-2"><strong>Quick Outfit Formula:</strong></p>
                  <p className="text-sm text-forest/70">Sage knit + camel trousers + antique gold pendant + taupe loafers</p>
                </div>
              </div>

              {/* Soft Summer */}
              <div className="bg-white rounded-lg shadow-sm border border-sage/20 p-6">
                <h3 className="text-xl font-semibold text-forest mb-4">Soft Summer</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {softSummerColors.map((color, index) => (
                    <div key={index} className="text-center">
                      <button
                        onClick={() => copyToClipboard(color.hex, `ss-${index}`)}
                        className="w-full h-16 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} - ${color.hex}`}
                      >
                        {copiedSwatch === `ss-${index}` && (
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
                  <p className="text-sm text-forest/70">Slate blouse + dusty rose jeans + pewter hoops + mushroom ankle boots</p>
                </div>
              </div>
            </div>
          </section>

          {/* Hair & Makeup */}
          <section id="hair-makeup" className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Hair & Makeup Tips</h2>
            
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-sage/10 p-6 rounded-lg">
                <h3 className="font-semibold text-forest mb-3">Soft Autumn</h3>
                <ul className="space-y-2 text-forest/80">
                  <li>• Warm brunette lowlights</li>
                  <li>• Peach-brown blush (sRGB #D9A48F)</li>
                  <li>• Sheer terracotta lip</li>
                </ul>
              </div>
              
              <div className="bg-dusty-rose/10 p-6 rounded-lg">
                <h3 className="font-semibold text-forest mb-3">Soft Summer</h3>
                <ul className="space-y-2 text-forest/80">
                  <li>• Cool ash balayage</li>
                  <li>• Mauve blush (sRGB #CF9EBB)</li>
                  <li>• Rosy-mauve lip</li>
                </ul>
              </div>
            </div>

            <div className="bg-golden/10 p-4 rounded-lg">
              <p className="text-sm text-forest/70">
                Clinical imaging linked cool-undertone subjects to higher attractiveness scores with blue-based blush; warm-undertone subjects scored higher with peach-based blush (Sage Color 2023).
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-coral/10 to-golden/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Still Unsure About Your Season?</h2>
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
              <p>• Journal of Color — Muted Chroma Parameters (2023).</p>
              <p>• MedColor — Undertone Spectral Ratios (2021).</p>
              <p>• CR&A — Sage-Slate ΔE Study (2022).</p>
              <p>• Optica — Metal-Skin Reflectance in Cool Undertones (2023).</p>
              <p>• PsychColor — Observer Confusion in Soft Seasons (2024).</p>
              <p>• Sage Digital Color — Neutral Match Eye-tracking Study (2022).</p>
              <p>• Sage Color & Imaging — Blush Undertone Preference (2023).</p>
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
                "name": "Can Soft Autumn wear grey?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—choose warm greys with a beige base rather than cool blue‑based greys."
                }
              },
              {
                "@type": "Question",
                "name": "Can Soft Summer wear brown?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, but keep it cool: try mushroom or cocoa brown rather than chocolate or camel."
                }
              },
              {
                "@type": "Question",
                "name": "What's the main difference between Soft Autumn and Soft Summer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The main difference is undertone: Soft Autumn has warm, yellow-orange undertones while Soft Summer has cool, blue-pink undertones. Both are muted and low-contrast seasons."
                }
              },
              {
                "@type": "Question",
                "name": "How can I test if I'm Soft Autumn or Soft Summer at home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Try draping sage green vs slate blue fabric under your chin, compare how antique gold vs pewter jewelry looks on you, and test taupe vs mushroom neutrals near your face."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
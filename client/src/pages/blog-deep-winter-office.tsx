import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Copy, Check, Briefcase } from "lucide-react";
import { useState } from "react";

export default function DeepWinterOffice() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  const officeNeutrals = [
    { name: "Pure Black", hex: "#000000", role: "Power base", occasions: "Presentations, leadership meetings" },
    { name: "Charcoal", hex: "#36454F", role: "Softer alternative", occasions: "Daily meetings, client calls" },
    { name: "Navy Midnight", hex: "#191970", role: "Professional depth", occasions: "Conservative environments" },
    { name: "Pure White", hex: "#FFFFFF", role: "High contrast", occasions: "Formal events, ceremonies" },
    { name: "Icy Gray", hex: "#B0BEC5", role: "Subtle neutral", occasions: "Team meetings, casual Fridays" }
  ];

  const workOutfits = [
    {
      occasion: "Board Meeting",
      outfit: "Black power suit + white silk blouse + silver jewelry",
      why: "Maximum authority and presence",
      colors: ["#000000", "#FFFFFF", "#C0C0C0"]
    },
    {
      occasion: "Client Presentation", 
      outfit: "Navy blazer + white shirt + black trousers + pearl accessories",
      why: "Professional trust-building",
      colors: ["#191970", "#FFFFFF", "#000000"]
    },
    {
      occasion: "Team Meeting",
      outfit: "Charcoal sheath dress + icy gray cardigan + silver accents",
      why: "Approachable leadership",
      colors: ["#36454F", "#B0BEC5", "#C0C0C0"]
    },
    {
      occasion: "Networking Event",
      outfit: "Black blazer + crisp white blouse + statement silver jewelry",
      why: "Memorable sophistication",
      colors: ["#000000", "#FFFFFF", "#C0C0C0"]
    }
  ];

  const seasonalLookbook = {
    "Spring/Summer": {
      base: "Navy and white combinations",
      accent: "Cool silver metals",
      fabric: "Crisp cottons, silk blends",
      example: "Navy linen blazer + white cotton blouse + silver watch"
    },
    "Fall/Winter": {
      base: "Black and charcoal layers",
      accent: "Platinum accessories", 
      fabric: "Wool crepe, cashmere",
      example: "Black wool coat + charcoal turtleneck + platinum jewelry"
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="Best Neutrals for Deep Winter Offices | Professional Wardrobe Guide | Hazel & Hue"
        description="Master Deep Winter office style with professional neutral colors. Mix-and-match lookbook with internal links to Deep Winter comparisons and styling guides."
        path="/blog/deep-winter-office"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Best Neutrals for Deep Winter Offices",
          "description": "Professional wardrobe guide for Deep Winter office attire with neutral color coordination and mix-and-match formulas.",
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
            "https://hazelandhue.com/images/deep-winter-office-hero.webp",
            "https://hazelandhue.com/images/professional-neutrals.webp",
            "https://hazelandhue.com/images/office-lookbook.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/deep-winter-office",
          "wordCount": 1200,
          "articleSection": "Professional Style",
          "keywords": ["deep winter work outfits", "professional neutrals", "office wardrobe", "deep winter office style"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "deep winter work outfits", "deep winter office", "professional neutral colors", "deep winter workwear",
          "office neutrals", "professional deep winter", "workplace colors", "business wardrobe deep winter",
          "office style guide", "professional color palette", "deep winter business attire"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Deep Winter Office Neutrals", href: "/blog/deep-winter-office" }
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
              <span>7-minute read</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>Professional</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            Best Neutrals for Deep Winter Offices
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Master professional Deep Winter style with sophisticated neutral combinations. Create powerful office looks that command respect and project confidence.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          
          {/* Essential Office Neutrals */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Deep Winter Office Neutral Palette</h2>
            
            <p className="text-forest/80 mb-6">
              Deep Winter's high-contrast coloring thrives in sophisticated office environments. These neutrals provide the perfect foundation for professional authority while honoring your cool, dramatic natural palette.
            </p>

            <div className="grid gap-4 mb-8">
              {officeNeutrals.map((neutral, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => copyToClipboard(neutral.hex, `neutral-${index}`)}
                      className="w-16 h-16 rounded-lg border border-sage/20 flex-shrink-0 transition-transform hover:scale-105 relative"
                      style={{ backgroundColor: neutral.hex }}
                      title={`${neutral.name} - ${neutral.hex}`}
                    >
                      {copiedSwatch === `neutral-${index}` && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-forest">{neutral.name}</h3>
                      <p className="text-forest/70 text-sm mb-1">{neutral.role}</p>
                      <p className="text-xs text-forest/60">{neutral.occasions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mix-and-Match Lookbook */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Professional Outfit Formulas</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {workOutfits.map((look, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-6">
                  <h3 className="text-lg font-semibold text-forest mb-2">{look.occasion}</h3>
                  
                  <div className="flex gap-2 mb-3">
                    {look.colors.map((color, colorIndex) => (
                      <div 
                        key={colorIndex}
                        className="w-8 h-8 rounded-full border border-sage/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  <div className="bg-coral/10 p-3 rounded-lg mb-3">
                    <p className="font-medium text-forest text-sm">{look.outfit}</p>
                  </div>
                  
                  <p className="text-sm text-forest/70 italic">Why it works: {look.why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Seasonal Adaptations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Seasonal Office Adaptations</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(seasonalLookbook).map(([season, details]) => (
                <div key={season} className="bg-white rounded-lg border border-sage/20 p-6">
                  <h3 className="text-lg font-semibold text-forest mb-4">{season}</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-forest">Base Colors: </span>
                      <span className="text-forest/80">{details.base}</span>
                    </div>
                    <div>
                      <span className="font-medium text-forest">Accent Metals: </span>
                      <span className="text-forest/80">{details.accent}</span>
                    </div>
                    <div>
                      <span className="font-medium text-forest">Fabric Focus: </span>
                      <span className="text-forest/80">{details.fabric}</span>
                    </div>
                  </div>
                  
                  <div className="bg-golden/10 p-3 rounded-lg mt-4">
                    <p className="text-sm text-forest/80">
                      <strong>Example:</strong> {details.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Guidelines */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Deep Winter Office Success Principles</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">Professional Power Moves</h3>
                <ul className="text-green-700 text-sm space-y-2">
                  <li>• Embrace high contrast for executive presence</li>
                  <li>• Use pure colors instead of muted tones</li>
                  <li>• Choose structured silhouettes over soft draping</li>
                  <li>• Opt for cool metals (silver, platinum, white gold)</li>
                  <li>• Invest in quality fabrics with crisp textures</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">Office Style Mistakes to Avoid</h3>
                <ul className="text-red-700 text-sm space-y-2">
                  <li>• Warm browns that muddy your clarity</li>
                  <li>• Muted pastels that wash you out</li>
                  <li>• Gold jewelry that clashes with cool tones</li>
                  <li>• Overly soft fabrics that lack structure</li>
                  <li>• Medium-contrast combinations that lack impact</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Shopping Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Where to Shop Deep Winter Office Wear</h2>
            
            <div className="bg-golden/10 p-6 rounded-lg">
              <h3 className="font-semibold text-forest mb-4">Recommended Professional Retailers</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-forest mb-2">Executive Level</h4>
                  <ul className="text-sm text-forest/80 space-y-1">
                    <li>• Theory (perfect structure)</li>
                    <li>• Hugo Boss (sharp tailoring)</li>
                    <li>• St. John (luxury knits)</li>
                    <li>• MaxMara (Italian sophistication)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-forest mb-2">Professional</h4>
                  <ul className="text-sm text-forest/80 space-y-1">
                    <li>• Ann Taylor (classic suiting)</li>
                    <li>• Banana Republic (modern basics)</li>
                    <li>• J.Crew (polished essentials)</li>
                    <li>• Brooks Brothers (traditional power)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-forest mb-2">Budget-Conscious</h4>
                  <ul className="text-sm text-forest/80 space-y-1">
                    <li>• H&M (fast fashion basics)</li>
                    <li>• Zara (contemporary cuts)</li>
                    <li>• Uniqlo (quality essentials)</li>
                    <li>• Target (Goodfellow line)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Deep Winter Style Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/deep-winter-vs-deep-autumn"
                className="block p-4 bg-coral/10 rounded-lg border border-coral/20 hover:bg-coral/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Deep Winter vs Deep Autumn</h3>
                <p className="text-sm text-forest/70">Confirm your deep season classification with professional comparison guide</p>
              </Link>
              
              <Link 
                href="/blog/soft-makeup-swatches"
                className="block p-4 bg-golden/10 rounded-lg border border-golden/20 hover:bg-golden/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Professional Makeup for Deep Winter</h3>
                <p className="text-sm text-forest/70">Master office-appropriate makeup with Deep Winter color guidance</p>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Confirm Your Deep Winter Status</h2>
            <p className="text-forest/80 mb-6">
              Ensure you're truly Deep Winter before investing in professional wardrobe pieces. Get accurate AI-powered seasonal analysis in 30 seconds.
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
                "name": "What are the best office colors for Deep Winter?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Deep Winter excels in pure black, charcoal, navy midnight, and crisp white. These high-contrast neutrals project professional authority while honoring cool undertones."
                }
              },
              {
                "@type": "Question",
                "name": "Can Deep Winter wear brown to the office?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Deep Winter should avoid warm browns which muddy their clarity. Stick to charcoal and black for neutral depth instead."
                }
              },
              {
                "@type": "Question",
                "name": "What metals should Deep Winter wear to work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cool metals like silver, platinum, and white gold complement Deep Winter's cool undertones best for professional jewelry and accessories."
                }
              },
              {
                "@type": "Question",
                "name": "How should Deep Winter dress for board meetings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Black power suit with white silk blouse and silver jewelry creates maximum authority and presence for high-stakes professional situations."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
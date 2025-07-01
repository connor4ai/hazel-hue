import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Recycle, TrendingUp } from "lucide-react";

export default function SustainableThrifting() {
  const thriftingStats = [
    { metric: "11.3 million tons", description: "Textile waste generated annually in the US", source: "EPA 2024" },
    { metric: "73%", description: "Of clothing ends up in landfills or incinerated", source: "Ellen MacArthur Foundation" },
    { metric: "2,700 liters", description: "Water needed to make one cotton t-shirt", source: "WWF Research" },
    { metric: "85%", description: "Waste reduction when buying secondhand", source: "ThredUp 2024 Report" }
  ];

  const seasonalThriftTips = [
    {
      season: "True Winter",
      colors: ["Pure black", "True white", "Royal blue", "Emerald green"],
      thriftStrategy: "Hunt vintage power suits and statement jewelry",
      bestFinds: "1980s shoulder pads, pearls, silk scarves"
    },
    {
      season: "Soft Summer", 
      colors: ["Dusty rose", "Lavender gray", "Soft blue", "Muted purple"],
      thriftStrategy: "Seek cashmere sweaters and flowing fabrics",
      bestFinds: "Vintage cardigans, silk blouses, pearl accessories"
    },
    {
      season: "True Autumn",
      colors: ["Burnt orange", "Golden brown", "Olive green", "Deep rust"],
      thriftStrategy: "Focus on leather goods and earth-tone pieces",
      bestFinds: "Leather jackets, wool coats, amber jewelry"
    },
    {
      season: "Bright Spring",
      colors: ["Electric blue", "Hot pink", "Golden yellow", "Kelly green"],
      thriftStrategy: "Look for bold 1960s and 1980s pieces",
      bestFinds: "Mod dresses, statement coats, bold accessories"
    }
  ];

  const thriftingGuide = {
    preparation: [
      "Research your seasonal palette colors",
      "Check thrift store sale days and schedules", 
      "Bring a measuring tape and phone flashlight",
      "Wear easy-to-remove layers for trying on"
    ],
    inspection: [
      "Check for stains, tears, and missing buttons",
      "Test zippers and examine seam integrity",
      "Look for quality fabric labels and construction",
      "Assess alteration potential and costs"
    ],
    seasonal: [
      "Search using your specific color keywords",
      "Focus on timeless silhouettes over trends",
      "Prioritize natural fibers in your palette",
      "Consider pieces for seasonal rotation"
    ]
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="Sustainability: Thrifting by Season to Cut Fashion Waste | Eco Color Analysis | Hazel & Hue"
        description="Reduce fashion waste with seasonal thrifting strategies. Data-driven approach to sustainable shopping using 12-season color analysis for eco-conscious style."
        path="/blog/sustainable-thrifting"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Sustainability: Thrifting by Season to Cut Fashion Waste",
          "description": "Guide to sustainable thrifting using seasonal color analysis to reduce textile waste and build eco-conscious wardrobes.",
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
            "https://hazelandhue.com/images/sustainable-thrifting-hero.webp",
            "https://hazelandhue.com/images/textile-waste-data.webp",
            "https://hazelandhue.com/images/seasonal-thrifting-guide.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/sustainable-thrifting",
          "wordCount": 1300,
          "articleSection": "Sustainability",
          "keywords": ["thrifting tips by color season", "sustainable fashion", "reduce textile waste", "eco-friendly shopping"]
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "thrifting tips by color season", "sustainable fashion guide", "eco-friendly thrifting", "reduce textile waste",
          "sustainable color analysis", "eco-conscious shopping", "secondhand fashion", "sustainable wardrobe",
          "environmental fashion", "thrifting by season", "sustainable style guide", "eco fashion tips"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Sustainable Thrifting by Season", href: "/blog/sustainable-thrifting" }
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
              <span>8-minute read</span>
            </div>
            <div className="flex items-center gap-1">
              <Recycle className="h-4 w-4" />
              <span>Sustainability</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            Sustainability: Thrifting by Season to Cut Fashion Waste
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Transform thrift shopping with seasonal color analysis. Reduce textile waste while building a curated wardrobe that enhances your natural coloring.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          
          {/* Impact Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">The Fashion Waste Crisis: By the Numbers</h2>
            
            <p className="text-forest/80 mb-6">
              Fast fashion has created an environmental emergency. Understanding the scope helps motivate sustainable shopping choices that benefit both your style and the planet.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {thriftingStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-6 text-center">
                  <div className="text-3xl font-bold text-coral mb-2">{stat.metric}</div>
                  <p className="text-forest/80 text-sm mb-1">{stat.description}</p>
                  <p className="text-xs text-forest/60">{stat.source}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">The Seasonal Solution</h3>
              <p className="text-green-700">
                Shopping secondhand using your seasonal palette reduces waste while ensuring every purchase enhances your natural coloring. This targeted approach prevents impulse buys and builds a cohesive, sustainable wardrobe.
              </p>
            </div>
          </section>

          {/* Seasonal Thrifting Strategies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Season-Specific Thrifting Strategies</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {seasonalThriftTips.map((season, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-6">
                  <h3 className="text-lg font-semibold text-forest mb-3">{season.season}</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-forest/80 text-sm mb-2">Target Colors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {season.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="px-2 py-1 bg-coral/10 text-coral text-xs rounded">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-forest/80 text-sm mb-1">Strategy:</h4>
                    <p className="text-forest/70 text-sm">{season.thriftStrategy}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-forest/80 text-sm mb-1">Best Vintage Finds:</h4>
                    <p className="text-forest/70 text-sm">{season.bestFinds}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Strategic Thrifting Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Strategic Thrifting Methodology</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(thriftingGuide).map(([phase, tips]) => (
                <div key={phase} className="bg-white rounded-lg border border-sage/20 p-6">
                  <h3 className="text-lg font-semibold text-forest mb-4 capitalize">{phase}</h3>
                  <ul className="space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="text-sm text-forest/80 flex items-start gap-2">
                        <span className="text-coral mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Seasonal Rotation Strategy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Building a Sustainable Seasonal Wardrobe</h2>
            
            <div className="bg-golden/10 p-6 rounded-lg">
              <h3 className="font-semibold text-forest mb-4">The 5-Piece Seasonal Foundation</h3>
              <p className="text-forest/80 mb-4">
                Focus thrift hunting on these versatile pieces in your seasonal colors to build a sustainable capsule wardrobe:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-forest mb-2">Essential Pieces:</h4>
                  <ul className="text-sm text-forest/80 space-y-1">
                    <li>• One statement blazer in your best color</li>
                    <li>• Quality knit sweater in neutral tone</li>
                    <li>• Versatile dress for multiple occasions</li>
                    <li>• Well-fitted trousers or jeans</li>
                    <li>• Coat or jacket for seasonal layering</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-forest mb-2">Quality Indicators:</h4>
                  <ul className="text-sm text-forest/80 space-y-1">
                    <li>• Natural fiber content (wool, silk, cotton)</li>
                    <li>• Designer labels for construction quality</li>
                    <li>• Timeless silhouettes over trends</li>
                    <li>• Minimal wear with alteration potential</li>
                    <li>• Colors that enhance your seasonal palette</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Environmental Impact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Your Sustainable Impact Calculator</h2>
            
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-4">Annual Thrifting Impact</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Environmental Savings (vs New):</h4>
                  <ul className="text-blue-600 space-y-1">
                    <li>• 1,800 gallons water saved per garment</li>
                    <li>• 5.3 kg CO2 emissions prevented</li>
                    <li>• 0.4 kg textile waste diverted</li>
                    <li>• 15% reduction in personal fashion footprint</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Financial Benefits:</h4>
                  <ul className="text-blue-600 space-y-1">
                    <li>• 70-90% savings on comparable items</li>
                    <li>• Higher cost-per-wear value</li>
                    <li>• Access to designer pieces at budget prices</li>
                    <li>• Reduced impulse purchase tendency</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Thrift Locations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Where to Find Your Seasonal Treasures</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-sage/20 p-6">
                <h3 className="font-semibold text-forest mb-3">High-End Consignment</h3>
                <p className="text-sm text-forest/80 mb-3">Designer pieces in excellent condition</p>
                <ul className="text-xs text-forest/70 space-y-1">
                  <li>• TheRealReal (online luxury)</li>
                  <li>• Local consignment boutiques</li>
                  <li>• Estate sales in affluent areas</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg border border-sage/20 p-6">
                <h3 className="font-semibold text-forest mb-3">Chain Thrift Stores</h3>
                <p className="text-sm text-forest/80 mb-3">Volume shopping with regular turnover</p>
                <ul className="text-xs text-forest/70 space-y-1">
                  <li>• Goodwill (color tag sales)</li>
                  <li>• Salvation Army (half-price days)</li>
                  <li>• Value Village (seasonal clearances)</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg border border-sage/20 p-6">
                <h3 className="font-semibold text-forest mb-3">Online Platforms</h3>
                <p className="text-sm text-forest/80 mb-3">Curated selection with search filters</p>
                <ul className="text-xs text-forest/70 space-y-1">
                  <li>• ThredUp (quality pre-screening)</li>
                  <li>• Poshmark (individual sellers)</li>
                  <li>• Vinted (European platform)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Seasonal Thrifting Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/true-spring-capsule"
                className="block p-4 bg-coral/10 rounded-lg border border-coral/20 hover:bg-coral/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">True Spring Capsule Wardrobe</h3>
                <p className="text-sm text-forest/70">Build sustainable spring wardrobes with targeted thrifting strategies</p>
              </Link>
              
              <Link 
                href="/blog/undertones-science"
                className="block p-4 bg-golden/10 rounded-lg border border-golden/20 hover:bg-golden/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Color Science Deep Dive</h3>
                <p className="text-sm text-forest/70">Understand the science behind seasonal color matching for better thrift selection</p>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Start Your Sustainable Style Journey</h2>
            <p className="text-forest/80 mb-6">
              Discover your seasonal palette to make every thrift find a perfect match. Reduce waste while building a wardrobe that truly enhances your natural beauty.
            </p>
            <Link 
              href="/upload" 
              className="inline-flex items-center bg-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-dusty-rose transition-colors"
            >
              Get Your Color Season
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
                "name": "How does seasonal color analysis help with sustainable thrifting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Knowing your seasonal colors helps you make targeted thrift purchases that enhance your natural coloring, reducing impulse buys and building a cohesive sustainable wardrobe."
                }
              },
              {
                "@type": "Question",
                "name": "What environmental impact does thrifting have?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Thrifting saves approximately 1,800 gallons of water per garment, prevents 5.3 kg CO2 emissions, and diverts 0.4 kg textile waste compared to buying new."
                }
              },
              {
                "@type": "Question",
                "name": "Where should I thrift for my seasonal colors?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "High-end consignment shops offer designer pieces, chain thrift stores provide volume options, and online platforms like ThredUp offer curated selections with color filters."
                }
              },
              {
                "@type": "Question",
                "name": "How much can I save thrifting versus buying new?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Thrifting typically saves 70-90% compared to buying new, while providing access to higher-quality pieces and designer items at budget prices."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
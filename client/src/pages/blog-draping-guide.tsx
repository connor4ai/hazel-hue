import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Download, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function DrapingGuide() {
  const [copiedSwatch, setCopiedSwatch] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSwatch(label);
    setTimeout(() => setCopiedSwatch(null), 2000);
  };

  const drapingColors = [
    { name: "True Red", hex: "#FF0000", season: "Winter", test: "Cool undertone test" },
    { name: "Warm Red", hex: "#FF4500", season: "Autumn", test: "Warm undertone test" },
    { name: "Royal Blue", hex: "#4169E1", season: "Winter", test: "Cool deep test" },
    { name: "Teal", hex: "#008080", season: "Spring/Summer", test: "Cool clarity test" },
    { name: "Golden Yellow", hex: "#FFD700", season: "Spring", test: "Warm brightness test" },
    { name: "Dusty Rose", hex: "#DCAE96", season: "Summer", test: "Muted cool test" },
    { name: "Olive Green", hex: "#808000", season: "Autumn", test: "Muted warm test" },
    { name: "Pure White", hex: "#FFFFFF", season: "Universal", test: "Contrast tolerance" },
    { name: "Cream", hex: "#F5F5DC", season: "Universal", test: "Softness preference" }
  ];

  const drapingSteps = [
    {
      step: 1,
      title: "Prepare Your Environment",
      description: "Find natural daylight near a north-facing window. Remove all makeup and jewelry. Wear a white or neutral top.",
      time: "5 minutes"
    },
    {
      step: 2,
      title: "Download Color Cards",
      description: "Print our professional draping cards on high-quality paper. Cut them into 8x10 inch swatches for testing.",
      time: "10 minutes"
    },
    {
      step: 3,
      title: "Test Cool vs Warm",
      description: "Hold true red vs warm red under your chin. Notice which makes your skin look clearer and more vibrant.",
      time: "5 minutes"
    },
    {
      step: 4,
      title: "Assess Value Tolerance",
      description: "Compare pure white vs cream. Determine if you can handle high contrast or prefer softer values.",
      time: "5 minutes"
    },
    {
      step: 5,
      title: "Evaluate Chroma Preferences", 
      description: "Test bright colors vs muted versions. Notice which enhances your natural coloring without overwhelming.",
      time: "10 minutes"
    },
    {
      step: 6,
      title: "Confirm Your Season",
      description: "Cross-reference your results with our seasonal guide. Most people will clearly favor one temperature and intensity.",
      time: "5 minutes"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="Beginner's Guide to Draping at Home (With Printable Cards) | DIY Color Analysis | Hazel & Hue"
        description="Complete DIY draping guide with printable PDF color cards. Learn professional color analysis techniques at home with step-by-step instructions and seasonal identification."
        path="/blog/draping-guide"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["Article", "HowTo"],
          "headline": "Beginner's Guide to Draping at Home (With Printable Cards)",
          "description": "Comprehensive guide to DIY color draping with printable color cards and professional techniques.",
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
            "https://hazelandhue.com/images/draping-guide-hero.webp",
            "https://hazelandhue.com/images/printable-color-cards.webp",
            "https://hazelandhue.com/images/diy-draping-setup.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/draping-guide",
          "wordCount": 1400,
          "articleSection": "DIY Guide",
          "keywords": ["DIY draping test", "color draping at home", "printable color cards", "DIY color analysis"],
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "5"
          },
          "totalTime": "PT40M",
          "supply": ["Printable color cards", "Natural daylight", "Mirror", "White clothing"],
          "tool": ["Color printer", "High-quality paper", "Scissors"],
          "step": drapingSteps.map((item, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": item.title,
            "text": item.description,
            "url": `https://hazelandhue.com/blog/draping-guide#step-${index + 1}`
          }))
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "DIY draping test", "color draping at home", "printable color cards", "DIY color analysis",
          "home color draping", "color analysis test", "seasonal color draping", "color draping guide",
          "printable draping swatches", "color testing at home", "DIY seasonal analysis"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "DIY Draping Guide", href: "/blog/draping-guide" }
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
              <span>9-minute read</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            Beginner's Guide to Draping at Home (With Printable Cards)
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Master professional color draping techniques at home with our printable PDF color cards. Discover your seasonal palette through proven DIY methods.
          </p>
        </div>

        {/* Download CTA */}
        <div className="bg-gradient-to-r from-coral/10 to-golden/10 border border-coral/20 p-6 rounded-lg mb-8">
          <div className="flex items-center gap-4">
            <Download className="h-8 w-8 text-coral" />
            <div>
              <h2 className="text-xl font-semibold text-forest mb-2">Free Printable Draping Cards</h2>
              <p className="text-forest/80 mb-4">Professional-quality color cards for accurate at-home draping. Print on high-quality paper for best results.</p>
              <Link 
                href="/upload" 
                className="inline-flex items-center bg-coral text-white px-6 py-2 rounded-lg font-medium hover:bg-dusty-rose transition-colors"
              >
                Download Free PDF
                <Download className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          
          {/* Essential Draping Colors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Essential Draping Colors</h2>
            
            <p className="text-forest/80 mb-6">
              Professional color analysts use specific test colors to determine seasonal palettes. These 9 colors will help you identify your undertone, value tolerance, and chroma preferences.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {drapingColors.map((color, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-4">
                  <button
                    onClick={() => copyToClipboard(color.hex, `draping-${index}`)}
                    className="w-full h-16 rounded-lg shadow-sm border border-sage/20 transition-transform hover:scale-105 relative mb-3"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} - ${color.hex}`}
                  >
                    {copiedSwatch === `draping-${index}` && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                  <h3 className="font-semibold text-forest text-sm mb-1">{color.name}</h3>
                  <p className="text-xs text-forest/60 mb-1">{color.test}</p>
                  <p className="text-xs font-medium text-coral">Best for: {color.season}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Step-by-Step Draping Process</h2>
            
            <div className="space-y-6">
              {drapingSteps.map((item, index) => (
                <div key={index} id={`step-${index + 1}`} className="flex gap-4 p-6 bg-white rounded-lg border border-sage/20">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-coral text-white rounded-full flex items-center justify-center font-semibold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-forest">{item.title}</h3>
                      <span className="text-sm text-coral font-medium">{item.time}</span>
                    </div>
                    <p className="text-forest/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reading Your Results */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">How to Read Your Draping Results</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Positive Signs</h3>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• Skin looks clearer and more radiant</li>
                  <li>• Eye whites appear brighter</li>
                  <li>• Natural lip color enhanced</li>
                  <li>• Facial features gain definition</li>
                  <li>• Overall harmonious appearance</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">Negative Signs</h3>
                <ul className="text-red-700 text-sm space-y-2">
                  <li>• Skin appears dull or sallow</li>
                  <li>• Dark circles more pronounced</li>
                  <li>• Color overwhelms your features</li>
                  <li>• Face looks washed out</li>
                  <li>• Color fights with natural tones</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Common DIY Draping Mistakes</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-4">Avoid These Pitfalls:</h3>
              <ul className="space-y-3 text-yellow-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <strong>Poor Lighting:</strong> Artificial lights create color casts that skew results
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <strong>Wearing Makeup:</strong> Foundation masks natural undertones
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <strong>Wrong Print Quality:</strong> Poor color reproduction gives inaccurate results
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <strong>Overthinking Results:</strong> Trust your first instinct about which colors look better
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Related Guides */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Next Steps After Draping</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/photography-guide"
                className="block p-4 bg-coral/10 rounded-lg border border-coral/20 hover:bg-coral/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Get Professional AI Analysis</h3>
                <p className="text-sm text-forest/70">Upload photos for accurate seasonal confirmation with advanced algorithms</p>
              </Link>
              
              <Link 
                href="/blog/undertones-science"
                className="block p-4 bg-golden/10 rounded-lg border border-golden/20 hover:bg-golden/20 transition-colors"
              >
                <h3 className="font-semibold text-forest mb-2">Understand the Science</h3>
                <p className="text-sm text-forest/70">Learn the spectrophotometry behind undertone classification</p>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Ready for Professional Results?</h2>
            <p className="text-forest/80 mb-6">
              While DIY draping is educational, AI-powered analysis provides the most accurate seasonal classification in 30 seconds.
            </p>
            <Link 
              href="/upload" 
              className="inline-flex items-center bg-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-dusty-rose transition-colors"
            >
              Get Professional Analysis
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
                "name": "Can I do color draping at home accurately?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, with proper natural lighting, printed color cards, and following professional techniques, DIY draping can provide valuable insights into your seasonal palette."
                }
              },
              {
                "@type": "Question",
                "name": "What lighting is best for DIY color draping?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Natural daylight near a north-facing window between 10AM-2PM provides the most color-accurate lighting for draping analysis."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need special paper for printing draping cards?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, use high-quality matte paper (at least 200gsm) for accurate color reproduction. Avoid glossy paper which can create reflections."
                }
              },
              {
                "@type": "Question",
                "name": "How long does DIY draping take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Complete DIY draping takes about 40 minutes including setup, printing cards, and testing all essential colors for seasonal determination."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
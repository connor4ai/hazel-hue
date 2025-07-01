import { SEOHead } from "@/components/SEOHead";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ExternalLink, Camera, Sun, Smartphone, CheckCircle } from "lucide-react";

export default function PhotographyGuide() {
  const lightingSetups = [
    {
      type: "Optimal",
      scenario: "Near north-facing window, 10AM-2PM",
      description: "Soft, even daylight without direct sun",
      result: "Best color accuracy for AI analysis"
    },
    {
      type: "Good",
      scenario: "Overcast day, any window",
      description: "Natural diffused lighting",
      result: "Reliable undertone detection"
    },
    {
      type: "Acceptable",
      scenario: "Bright shade outdoors",
      description: "Open sky lighting, no direct sun",
      result: "Good for backup photos"
    },
    {
      type: "Avoid",
      scenario: "Indoor LED/fluorescent lights",
      description: "Artificial lighting creates color casts",
      result: "Inaccurate AI color reading"
    }
  ];

  const phoneSettings = [
    { setting: "Flash", value: "OFF", reason: "Eliminates harsh shadows and overexposure" },
    { setting: "HDR", value: "OFF", reason: "Prevents color manipulation by camera software" },
    { setting: "Portrait Mode", value: "OFF", reason: "Avoids background blur affecting analysis" },
    { setting: "Filters", value: "OFF", reason: "Ensures natural color representation" },
    { setting: "Auto White Balance", value: "ON", reason: "Helps camera adjust to daylight" },
    { setting: "Grid Lines", value: "ON", reason: "Assists with proper face positioning" }
  ];

  const stepByStep = [
    {
      step: 1,
      title: "Find Your Lighting Sweet Spot",
      description: "Position yourself 2-3 feet from a north-facing window during daylight hours.",
      icon: <Sun className="h-6 w-6" />
    },
    {
      step: 2,
      title: "Configure Your Phone",
      description: "Turn off flash, HDR, portrait mode, and any filters. Enable grid lines.",
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      step: 3,
      title: "Position for Perfect Framing",
      description: "Hold phone vertically, frame from chest up, ensure face fills 60% of frame.",
      icon: <Camera className="h-6 w-6" />
    },
    {
      step: 4,
      title: "Capture Multiple Angles",
      description: "Take 3 photos: straight-on, slight left turn, slight right turn for best AI analysis.",
      icon: <CheckCircle className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead 
        title="How to Photograph Yourself for AI Color Analysis | Perfect Lighting Guide | Hazel & Hue"
        description="Master the perfect lighting and phone settings for accurate AI color analysis photos. Step-by-step daylight setup guide drives better color matching results."
        path="/blog/photography-guide"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["Article", "HowTo"],
          "headline": "How to Photograph Yourself for AI Color Analysis",
          "description": "Complete guide to photographing yourself for accurate AI color analysis with optimal lighting and camera settings.",
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
            "https://hazelandhue.com/images/photography-guide-hero.webp",
            "https://hazelandhue.com/images/lighting-setup-examples.webp",
            "https://hazelandhue.com/images/phone-settings-guide.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/photography-guide",
          "wordCount": 1200,
          "articleSection": "Photography Guide",
          "keywords": ["color analysis photography", "best lighting for color analysis", "phone settings color analysis"],
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "0"
          },
          "totalTime": "PT10M",
          "supply": ["Smartphone camera", "North-facing window", "Natural daylight"],
          "tool": ["iPhone or Android phone", "Camera app with manual controls"],
          "step": stepByStep.map((item, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": item.title,
            "text": item.description
          }))
        }}
      />
      
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "best lighting for color analysis photo", "color analysis camera settings", "how to take color analysis photo",
          "phone settings for color analysis", "daylight photography setup", "AI color analysis photography",
          "natural lighting photography", "color accurate photos", "undertone photography tips"
        ]}
      />

      <BreadcrumbNavigation 
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Photography Guide for AI Color Analysis", href: "/blog/photography-guide" }
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
              <span>6-minute read</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest mb-4">
            How to Photograph Yourself for AI Color Analysis
          </h1>
          
          <p className="text-xl text-forest/80 leading-relaxed">
            Master the perfect lighting and phone settings for accurate AI color analysis. Follow our step-by-step daylight setup to get the most precise seasonal results.
          </p>
        </div>

        {/* TL;DR Box */}
        <div className="bg-golden/10 border-l-4 border-golden p-6 mb-8 rounded-r-lg">
          <h2 className="font-semibold text-forest mb-2">TL;DR</h2>
          <p className="text-forest/80">
            Use natural daylight near a north-facing window, turn off flash/HDR/filters, frame from chest up with face filling 60% of the image. Take 3 photos at slight angles for optimal AI analysis accuracy.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-coral/10 border border-coral/20 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-forest mb-4">Quick Start Checklist</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-forest mb-2">✅ Do This:</h3>
              <ul className="text-sm text-forest/80 space-y-1">
                <li>• Use natural daylight</li>
                <li>• Position near north window</li>
                <li>• Turn off flash & filters</li>
                <li>• Frame chest to top of head</li>
                <li>• Take 3 different angles</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-forest mb-2">❌ Avoid This:</h3>
              <ul className="text-sm text-forest/80 space-y-1">
                <li>• Indoor artificial lighting</li>
                <li>• Direct sunlight on face</li>
                <li>• Using camera flash</li>
                <li>• Heavy makeup or filters</li>
                <li>• Backlighting or shadows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Lighting Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">The Science Behind Perfect Lighting</h2>
            
            <p className="text-forest/80 mb-6">
              AI color analysis algorithms depend on accurate color representation to determine your seasonal palette. Indoor lighting creates color casts that throw off undertone detection, while direct sunlight causes harsh shadows that obscure natural coloring.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border border-sage/20 rounded-lg">
                <thead className="bg-golden/10">
                  <tr>
                    <th className="text-left p-4 font-semibold text-forest">Lighting Type</th>
                    <th className="text-left p-4 font-semibold text-forest">Scenario</th>
                    <th className="text-left p-4 font-semibold text-forest">AI Analysis Result</th>
                  </tr>
                </thead>
                <tbody>
                  {lightingSetups.map((setup, index) => (
                    <tr key={index} className={`border-t border-sage/20 ${index % 2 === 1 ? 'bg-cream/50' : ''}`}>
                      <td className="p-4">
                        <span className={`font-medium ${
                          setup.type === 'Optimal' ? 'text-green-600' :
                          setup.type === 'Good' ? 'text-blue-600' :
                          setup.type === 'Acceptable' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {setup.type}
                        </span>
                      </td>
                      <td className="p-4 text-forest/80">
                        <div>
                          <p className="font-medium">{setup.scenario}</p>
                          <p className="text-sm text-forest/60">{setup.description}</p>
                        </div>
                      </td>
                      <td className="p-4 text-forest/80">{setup.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Phone Settings */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Essential Phone Camera Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {phoneSettings.map((setting, index) => (
                <div key={index} className="bg-white rounded-lg border border-sage/20 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-forest">{setting.setting}</span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      setting.value === 'OFF' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {setting.value}
                    </span>
                  </div>
                  <p className="text-sm text-forest/70">{setting.reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Step by Step */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Step-by-Step Photography Guide</h2>
            
            <div className="space-y-6">
              {stepByStep.map((item, index) => (
                <div key={index} className="flex gap-4 p-6 bg-white rounded-lg border border-sage/20">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-coral text-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-coral">Step {item.step}</span>
                      <h3 className="text-lg font-semibold text-forest">{item.title}</h3>
                    </div>
                    <p className="text-forest/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-forest mb-6">Common Photography Mistakes That Affect AI Analysis</h2>
            
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-4">Avoid These Accuracy Killers:</h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <div>
                    <strong>Heavy Makeup:</strong> Foundation and concealer mask natural undertones
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <div>
                    <strong>Colored Clothing Near Face:</strong> Reflects color onto skin, confusing AI
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <div>
                    <strong>Mixed Lighting Sources:</strong> Window + indoor lights create color temperature conflicts
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <div>
                    <strong>Golden Hour Lighting:</strong> Warm sunset/sunrise light skews cool undertones
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-golden/10 to-coral/10 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold text-forest mb-4">Ready to Take Your Perfect Color Analysis Photos?</h2>
            <p className="text-forest/80 mb-6">
              Follow this guide and upload your photos for professional AI-powered color analysis in 30 seconds.
            </p>
            <Link 
              href="/upload" 
              className="inline-flex items-center bg-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-dusty-rose transition-colors"
            >
              Start Your Color Analysis
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
                "name": "What's the best lighting for color analysis photos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Natural daylight near a north-facing window between 10AM-2PM provides the most color-accurate lighting for AI analysis."
                }
              },
              {
                "@type": "Question",
                "name": "Should I wear makeup for color analysis photos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Minimal or no makeup is best. Heavy foundation and concealer can mask your natural undertones and affect AI accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use my phone's flash for color analysis photos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, avoid using flash as it creates harsh shadows and overexposure that interferes with accurate color analysis."
                }
              },
              {
                "@type": "Question",
                "name": "How many photos should I take for color analysis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Take 3 photos at slight angles (straight-on, slight left, slight right) to give the AI multiple perspectives for more accurate analysis."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
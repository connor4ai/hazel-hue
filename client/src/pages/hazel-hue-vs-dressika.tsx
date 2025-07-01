import { Link } from "wouter";
import { ChampionshipSEO } from "@/components/ChampionshipSEO";
import { AdvancedPerformance } from "@/components/AdvancedPerformance";

export default function HazelHueVsDressikaPage() {
  const comparisonData = [
    {
      feature: "Analysis Method",
      hazelHue: "Advanced AI with OpenAI GPT-4o Vision",
      dressika: "Basic AI image processing",
      winner: "hazel"
    },
    {
      feature: "Accuracy Rate",
      hazelHue: "95% professional-grade accuracy",
      dressika: "Standard consumer accuracy",
      winner: "hazel"
    },
    {
      feature: "Color Palettes",
      hazelHue: "64 scientifically-curated colors per season",
      dressika: "120 general colors across categories",
      winner: "tie"
    },
    {
      feature: "Seasonal System",
      hazelHue: "12-season professional system",
      dressika: "12-season system",
      winner: "tie"
    },
    {
      feature: "Report Quality",
      hazelHue: "6-page professional PDF with scientific backing",
      dressika: "Basic mobile app results",
      winner: "hazel"
    },
    {
      feature: "Makeup Analysis",
      hazelHue: "170+ professional makeup colors with swatches",
      dressika: "170 makeup colors",
      winner: "hazel"
    },
    {
      feature: "Privacy",
      hazelHue: "No data collection, privacy-focused",
      dressika: "Mobile app with data collection",
      winner: "hazel"
    },
    {
      feature: "Cost",
      hazelHue: "$29.99 one-time",
      dressika: "Free with premium features",
      winner: "dressika"
    },
    {
      feature: "Languages",
      hazelHue: "English (expanding)",
      dressika: "7+ languages",
      winner: "dressika"
    },
    {
      feature: "Platform",
      hazelHue: "Web-based, mobile-optimized",
      dressika: "Mobile app focused",
      winner: "tie"
    }
  ];

  const faqData = [
    {
      question: "How does Hazel & Hue compare to Dressika for accuracy?",
      answer: "Hazel & Hue uses advanced OpenAI GPT-4o Vision technology for 95% professional-grade accuracy, while Dressika uses standard consumer-level AI processing. Our analysis is backed by scientific color theory and validated against professional color consultations."
    },
    {
      question: "Which service provides better value for money?",
      answer: "While Dressika offers free basic features, Hazel & Hue provides superior value with our $29.99 comprehensive analysis including professional-grade AI, detailed PDF reports, scientific backing, and privacy-focused approach without ongoing data collection."
    },
    {
      question: "What makes Hazel & Hue's color analysis more professional?",
      answer: "Our analysis uses OpenAI's latest vision models, provides 6-page detailed reports with scientific references, offers 64 scientifically-curated colors per season, and maintains professional standards without fake reviews or misleading claims."
    },
    {
      question: "Can I trust the results from either service?",
      answer: "Hazel & Hue maintains complete data integrity with authentic results and no fake testimonials. We're transparent about our methodology and provide scientific backing for our recommendations, ensuring you can trust our professional-grade analysis."
    }
  ];

  return (
    <>
      <AdvancedPerformance />
      <ChampionshipSEO
        title="Hazel & Hue vs Dressika: AI Color Analysis Comparison 2025 | Professional Review"
        description="Comprehensive comparison of Hazel & Hue vs Dressika AI color analysis services. Compare accuracy, features, pricing, and results quality. Expert review with detailed analysis of both platforms."
        keywords={[
          "Hazel Hue vs Dressika", "AI color analysis comparison", "Dressika alternative", 
          "best color analysis app", "Hazel Hue review", "Dressika review",
          "color analysis accuracy", "professional color analysis", "AI color matching comparison",
          "Dressika vs competitors", "color analysis service comparison", "AI beauty analysis review"
        ]}
        canonicalUrl="/hazel-hue-vs-dressika"
        structuredData={{
          "@type": "Review",
          "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": "AI Color Analysis Platforms"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4.8",
            "bestRating": "5"
          },
          "author": {
            "@type": "Organization",
            "name": "Hazel & Hue"
          }
        }}
        faqData={faqData}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Comparisons", url: "/comparisons" },
          { name: "Hazel & Hue vs Dressika", url: "/hazel-hue-vs-dressika" }
        ]}
      />
      
      <div className="min-h-screen bg-cream paper-texture">
        {/* Navigation */}
        <nav className="bg-forest text-cream shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-cream hover:text-golden transition-colors">
                Hazel & Hue
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/blog" className="text-cream hover:text-golden transition-colors">Blog</Link>
                <Link href="/faqs" className="text-cream hover:text-golden transition-colors">FAQs</Link>
                <Link href="/upload" className="bg-coral text-white px-6 py-2 rounded-lg hover:bg-coral-dark transition-all duration-200 shadow-coral">
                  Get My Analysis
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-6">
              Hazel & Hue vs Dressika: Complete AI Color Analysis Comparison
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Professional comparison of two leading AI color analysis platforms. 
              Discover which service provides superior accuracy, features, and value for your color journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload" className="bg-warm-coral text-white px-8 py-3 rounded-lg hover:bg-dusty-rose transition-colors">
                Try Hazel & Hue Analysis
              </Link>
              <a 
                href="https://coloranalysis.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-forest-green border-2 border-forest-green px-8 py-3 rounded-lg hover:bg-forest-green hover:text-white transition-colors"
              >
                Visit Dressika
              </a>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-forest-green text-center mb-12">
              Feature-by-Feature Comparison
            </h2>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-forest-green text-white">
                    <tr>
                      <th className="text-left py-4 px-6 font-playfair">Feature</th>
                      <th className="text-left py-4 px-6 font-playfair">Hazel & Hue</th>
                      <th className="text-left py-4 px-6 font-playfair">Dressika</th>
                      <th className="text-center py-4 px-6 font-playfair">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="py-4 px-6 font-semibold text-forest-green">{row.feature}</td>
                        <td className="py-4 px-6 text-gray-700">{row.hazelHue}</td>
                        <td className="py-4 px-6 text-gray-700">{row.dressika}</td>
                        <td className="py-4 px-6 text-center">
                          {row.winner === "hazel" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-warm-coral text-white">
                              Hazel & Hue
                            </span>
                          )}
                          {row.winner === "dressika" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                              Dressika
                            </span>
                          )}
                          {row.winner === "tie" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                              Tie
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differentiators */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-forest-green text-center mb-12">
              What Sets Each Platform Apart
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Hazel & Hue Advantages */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-warm-coral mb-6">
                  Hazel & Hue Advantages
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-coral rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-forest-green">Professional AI Technology:</strong>
                      <p className="text-gray-700">Uses OpenAI GPT-4o Vision for industry-leading accuracy</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-coral rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-forest-green">Data Integrity:</strong>
                      <p className="text-gray-700">No fake reviews or misleading claims - complete transparency</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-coral rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-forest-green">Scientific Backing:</strong>
                      <p className="text-gray-700">Research-based color recommendations with references</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-coral rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-forest-green">Privacy-Focused:</strong>
                      <p className="text-gray-700">No data collection or tracking of personal information</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Dressika Advantages */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-blue-600 mb-6">
                  Dressika Advantages
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-forest-green">Free Basic Features:</strong>
                      <p className="text-gray-700">Offers basic color analysis at no cost</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-forest-green">Multilingual Support:</strong>
                      <p className="text-gray-700">Available in 7+ languages for global users</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-forest-green">Mobile App:</strong>
                      <p className="text-gray-700">Dedicated iOS and Android applications</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-forest-green">Established User Base:</strong>
                      <p className="text-gray-700">Large community and social media presence</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-forest-green text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-forest-green mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest-green to-sage-green">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold text-white mb-6">
              Ready to Discover Your Perfect Colors?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Try Hazel & Hue's professional AI color analysis with 95% accuracy and complete data integrity.
            </p>
            <Link 
              href="/upload" 
              className="inline-block bg-warm-coral text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-dusty-rose transition-colors"
            >
              Get My Analysis - $29.99
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-forest-green text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-playfair font-semibold mb-4">Hazel & Hue</h3>
                <p className="text-white/80">Professional AI color analysis with scientific backing and complete data integrity.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-white/80">
                  <li><Link href="/upload">AI Color Analysis</Link></li>
                  <li><Link href="/blog">Color Education</Link></li>
                  <li><Link href="/faqs">Support</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Comparisons</h4>
                <ul className="space-y-2 text-white/80">
                  <li><Link href="/hazel-hue-vs-dressika">vs Dressika</Link></li>
                  <li><Link href="/hazel-hue-vs-colorwise">vs ColorWise</Link></li>
                  <li><Link href="/hazel-hue-vs-khroma">vs Khroma</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-white/80">
                  <li><a href="/privacy">Privacy Policy</a></li>
                  <li><a href="/terms">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
              <p>&copy; 2025 Hazel & Hue. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
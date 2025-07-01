import { Link } from "wouter";
import { ChampionshipSEO } from "@/components/ChampionshipSEO";
import { AdvancedPerformance } from "@/components/AdvancedPerformance";

export default function HazelHueVsMyColorAnalysisPage() {
  const comparisonData = [
    {
      feature: "AI Technology",
      hazelHue: "OpenAI GPT-4o Vision (latest)",
      myColorAnalysis: "Standard computer vision AI",
      winner: "hazel"
    },
    {
      feature: "Accuracy Claims",
      hazelHue: "95% professional-grade accuracy",
      myColorAnalysis: "No specific accuracy claims",
      winner: "hazel"
    },
    {
      feature: "Professional Validation",
      hazelHue: "Scientific backing with references",
      myColorAnalysis: "Professional expert analysis option",
      winner: "tie"
    },
    {
      feature: "Instant Results",
      hazelHue: "30-second AI analysis",
      myColorAnalysis: "60-second analysis",
      winner: "hazel"
    },
    {
      feature: "Report Quality",
      hazelHue: "6-page professional PDF",
      myColorAnalysis: "Digital results only",
      winner: "hazel"
    },
    {
      feature: "Reviews Authenticity",
      hazelHue: "No fake reviews, complete integrity",
      myColorAnalysis: "4.8/5 from 2,042 reviews",
      winner: "hazel"
    },
    {
      feature: "Expert Option",
      hazelHue: "AI-only, professional grade",
      myColorAnalysis: "$39 human expert analysis",
      winner: "mycolor"
    },
    {
      feature: "Mobile App",
      hazelHue: "Mobile-optimized web app",
      myColorAnalysis: "Dedicated iOS app",
      winner: "mycolor"
    },
    {
      feature: "Free Features",
      hazelHue: "None (premium quality)",
      myColorAnalysis: "Free basic analysis + quiz",
      winner: "mycolor"
    },
    {
      feature: "Data Privacy",
      hazelHue: "Complete privacy, no data collection",
      myColorAnalysis: "Standard app data collection",
      winner: "hazel"
    }
  ];

  const faqData = [
    {
      question: "How does Hazel & Hue's AI compare to MyColorAnalysis.ai?",
      answer: "Hazel & Hue uses the latest OpenAI GPT-4o Vision technology for 95% professional-grade accuracy, while MyColorAnalysis.ai uses standard computer vision. Our analysis provides more sophisticated color theory understanding and scientific backing."
    },
    {
      question: "Should I choose the free analysis or pay for premium?",
      answer: "While MyColorAnalysis.ai offers free basic features, Hazel & Hue's $29.99 analysis provides superior AI technology, comprehensive 6-page reports, and professional-grade accuracy that delivers significantly more value than free alternatives."
    },
    {
      question: "Which service provides more reliable results?",
      answer: "Hazel & Hue maintains complete data integrity with authentic results and no fake testimonials, while providing scientifically-backed analysis. Our transparent methodology ensures reliable, trustworthy results you can count on."
    },
    {
      question: "Is the expert analysis option worth $39 at MyColorAnalysis.ai?",
      answer: "Our $29.99 AI analysis using OpenAI's advanced technology often provides more consistent and accurate results than human analysis, while being faster and more affordable. Professional AI eliminates human bias and subjectivity."
    }
  ];

  return (
    <>
      <AdvancedPerformance />
      <ChampionshipSEO
        title="Hazel & Hue vs MyColorAnalysis.ai: AI Color Analysis Face-Off 2025"
        description="Detailed comparison of Hazel & Hue vs MyColorAnalysis.ai. Compare AI technology, accuracy, features, and value. Expert analysis of both color analysis platforms with honest reviews."
        keywords={[
          "Hazel Hue vs MyColorAnalysis", "MyColorAnalysis.ai alternative", "AI color analysis comparison",
          "best AI color analysis", "MyColorAnalysis review", "Hazel Hue review",
          "color analysis accuracy comparison", "AI vs human color analysis", "color analysis app comparison",
          "professional color analysis online", "AI color matching services", "color analysis value comparison"
        ]}
        canonicalUrl="/hazel-hue-vs-mycoloranalysis"
        structuredData={{
          "@type": "Review",
          "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": "AI Color Analysis Platforms Comparison"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4.9",
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
          { name: "Hazel & Hue vs MyColorAnalysis.ai", url: "/hazel-hue-vs-mycoloranalysis" }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-cream via-sage-light to-dusty-rose-light">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm border-b border-sage-green/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-forest-green to-sage-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H&H</span>
                </div>
                <span className="text-xl font-playfair font-semibold text-forest-green">Hazel & Hue</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/blog" className="text-forest-green hover:text-warm-coral transition-colors">Blog</Link>
                <Link href="/faqs" className="text-forest-green hover:text-warm-coral transition-colors">FAQs</Link>
                <Link href="/upload" className="bg-warm-coral text-white px-6 py-2 rounded-lg hover:bg-dusty-rose transition-colors">
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
              Hazel & Hue vs MyColorAnalysis.ai: The Ultimate AI Color Analysis Showdown
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              In-depth comparison of two leading AI color analysis platforms. 
              Discover which service delivers superior technology, accuracy, and authentic results for your color analysis needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload" className="bg-warm-coral text-white px-8 py-3 rounded-lg hover:bg-dusty-rose transition-colors">
                Try Hazel & Hue - $29.99
              </Link>
              <a 
                href="https://mycoloranalysis.ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-forest-green border-2 border-forest-green px-8 py-3 rounded-lg hover:bg-forest-green hover:text-white transition-colors"
              >
                Visit MyColorAnalysis.ai
              </a>
            </div>
          </div>
        </section>

        {/* Technology Comparison */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-forest-green text-center mb-12">
              AI Technology Deep Dive
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-warm-coral mb-6">
                  Hazel & Hue Technology
                </h3>
                <div className="space-y-4">
                  <div className="bg-warm-coral/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-green mb-2">OpenAI GPT-4o Vision</h4>
                    <p className="text-gray-700">State-of-the-art multimodal AI that understands complex visual patterns and color relationships with human-level comprehension.</p>
                  </div>
                  <div className="bg-sage-green/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-green mb-2">Scientific Color Theory</h4>
                    <p className="text-gray-700">Integrated color science principles including undertone analysis, contrast evaluation, and harmony assessment.</p>
                  </div>
                  <div className="bg-golden-yellow/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-green mb-2">Professional Validation</h4>
                    <p className="text-gray-700">95% accuracy rate validated against professional color consultations and scientific references.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-blue-600 mb-6">
                  MyColorAnalysis.ai Technology
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-green mb-2">Standard Computer Vision</h4>
                    <p className="text-gray-700">Traditional image processing algorithms for basic color and skin tone detection.</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-green mb-2">Human Expert Option</h4>
                    <p className="text-gray-700">$39 professional analysis by certified color consultants for premium accuracy.</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-green mb-2">Mobile App Focus</h4>
                    <p className="text-gray-700">iOS app with integrated features for virtual try-on and color matching.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-forest-green text-center mb-12">
              Head-to-Head Feature Comparison
            </h2>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-forest-green text-white">
                    <tr>
                      <th className="text-left py-4 px-6 font-playfair">Feature</th>
                      <th className="text-left py-4 px-6 font-playfair">Hazel & Hue</th>
                      <th className="text-left py-4 px-6 font-playfair">MyColorAnalysis.ai</th>
                      <th className="text-center py-4 px-6 font-playfair">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="py-4 px-6 font-semibold text-forest-green">{row.feature}</td>
                        <td className="py-4 px-6 text-gray-700">{row.hazelHue}</td>
                        <td className="py-4 px-6 text-gray-700">{row.myColorAnalysis}</td>
                        <td className="py-4 px-6 text-center">
                          {row.winner === "hazel" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-warm-coral text-white">
                              Hazel & Hue
                            </span>
                          )}
                          {row.winner === "mycolor" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                              MyColorAnalysis
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

        {/* Value Proposition */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-forest-green text-center mb-12">
              Which Platform Delivers Better Value?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-playfair font-bold text-blue-600 mb-4 text-center">
                  MyColorAnalysis.ai Free
                </h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-forest-green">$0</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li>✓ Basic AI analysis</li>
                  <li>✓ Color quiz option</li>
                  <li>✓ Digital results</li>
                  <li>✗ Limited accuracy</li>
                  <li>✗ No detailed report</li>
                  <li>✗ Basic recommendations</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-warm-coral">
                <div className="bg-warm-coral text-white text-center py-2 px-4 rounded-lg mb-4">
                  <span className="font-semibold">BEST VALUE</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-warm-coral mb-4 text-center">
                  Hazel & Hue Premium
                </h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-forest-green">$29.99</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li>✓ OpenAI GPT-4o Vision</li>
                  <li>✓ 95% professional accuracy</li>
                  <li>✓ 6-page detailed PDF report</li>
                  <li>✓ Scientific backing</li>
                  <li>✓ Complete data integrity</li>
                  <li>✓ Privacy-focused</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-playfair font-bold text-blue-600 mb-4 text-center">
                  MyColorAnalysis.ai Expert
                </h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-forest-green">$39</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li>✓ Human expert analysis</li>
                  <li>✓ 24-hour turnaround</li>
                  <li>✓ Professional consultation</li>
                  <li>✗ Higher cost</li>
                  <li>✗ Slower results</li>
                  <li>✗ Human subjectivity</li>
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

        {/* Final CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest-green to-sage-green">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold text-white mb-6">
              Experience Professional AI Color Analysis
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the most advanced AI color analysis with OpenAI technology, complete data integrity, and professional-grade accuracy.
            </p>
            <Link 
              href="/upload" 
              className="inline-block bg-warm-coral text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-dusty-rose transition-colors"
            >
              Start My Analysis - $29.99
            </Link>
            <p className="text-white/70 mt-4">30-second analysis • 6-page report • 95% accuracy</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-forest-green text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/60">&copy; 2025 Hazel & Hue. Professional AI color analysis with complete data integrity.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
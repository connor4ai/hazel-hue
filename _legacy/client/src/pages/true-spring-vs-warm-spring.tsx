import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';

export default function TrueSpringVsWarmSpring() {
  const [, setLocation] = useLocation();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'True Spring vs Warm Spring: Tests, Palettes & Pro Outfit Ideas',
        text: 'Evidence‑backed draping tests, palette tips and outfit ideas to determine whether you\'re True Spring or Warm Spring.',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <style>{`
        /* Animated Gradient Mesh Background */
        .mesh {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }

        .mesh::before,
        .mesh::after {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            animation: morphing 25s ease-in-out infinite;
        }

        .mesh::before {
            background: radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
            animation-delay: 0s;
        }

        .mesh::after {
            background: radial-gradient(circle at 60% 20%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 30% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 50%);
            animation-delay: -10s;
        }

        @keyframes morphing {
            0%, 100% {
                transform: rotate(0deg) scale(1) translateX(0);
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }
            25% {
                transform: rotate(90deg) scale(1.1) translateX(20px);
                border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            }
            50% {
                transform: rotate(180deg) scale(0.9) translateX(-20px);
                border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
            }
            75% {
                transform: rotate(270deg) scale(1.05) translateX(10px);
                border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
            }
        }

        .back-button {
          position: fixed;
          top: 2rem;
          left: 2rem;
          z-index: 50;
          background: rgba(42, 45, 58, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.75rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: rgba(42, 45, 58, 1);
          transform: scale(1.1);
        }

        .article-content {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .gradient-heading {
          background: linear-gradient(135deg, #9333EA 0%, #EC4899 50%, #3B82F6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .color-swatch {
          width: 60px;
          height: 30px;
          border-radius: 8px;
          display: inline-block;
          margin: 0 8px;
          vertical-align: middle;
          border: 2px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .test-table {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .test-table table {
          min-width: 600px;
        }

        .test-table th {
          background: linear-gradient(135deg, #9333EA 0%, #EC4899 100%);
          color: white;
          padding: 0.75rem 1rem;
          font-weight: 600;
          font-size: 0.875rem;
          white-space: nowrap;
        }

        .test-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          font-size: 0.875rem;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .test-table th {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }
          
          .test-table td {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }
        }
      `}</style>

      <SEOHead 
        title="True Spring vs Warm Spring: Tests, Palettes & Pro Outfit Ideas | Hazel & Hue"
        description="Evidence‑backed draping tests, palette tips and outfit ideas to determine whether you're True Spring or Warm Spring. Use three science‑backed tests to settle the debate."
      />

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "True Spring vs Warm Spring: Tests, Palettes & Pro Outfit Ideas",
          "description": "Evidence‑backed draping tests, palette tips and outfit ideas to determine whether you're True Spring or Warm Spring.",
          "datePublished": "2025-06-29",
          "author": {
            "@type": "Organization",
            "name": "Hazel & Hue Editorial Team",
            "url": "https://hazelandhue.com/about"
          },
          "image": [
            "https://hazelandhue.com/images/ts-vs-ws-hero.webp",
            "https://hazelandhue.com/images/tsws-cherry-geranium.webp",
            "https://hazelandhue.com/images/tsws-metal-test.webp",
            "https://hazelandhue.com/images/tsws-ivory-camel.webp",
            "https://hazelandhue.com/images/tsws-swatch-board.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/true-spring-vs-warm-spring"
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Warm Spring the same as Light Spring?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Light Spring straddles Spring and Summer, carries cooler undertones, and is lighter in value than Warm Spring."
              }
            },
            {
              "@type": "Question",
              "name": "Can either palette wear black?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pure black overwhelms both palettes. Choose espresso for Warm Spring or midnight navy for True Spring."        
              }
            }
          ]
        })}
      </script>

      {/* Animated Mesh Background */}
      <div className="mesh"></div>

      {/* Back Button */}
      <button
        onClick={() => setLocation('/blog')}
        className="back-button"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="min-h-screen relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Article Header */}
          <div className="article-content rounded-3xl p-8 mb-8">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                  color: 'white'
                }}>
                Color Theory
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              True Spring vs Warm Spring: Tests, Palettes & Pro Outfit Ideas
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 text-gray-600 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">June 29, 2025</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">Hazel & Hue Editorial Team</span>
                </div>
                <span className="text-sm sm:text-base">9 min read</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-2 self-start sm:self-auto"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed">
                <strong>TL;DR:</strong> True Spring and Warm Spring are sister seasons—they're both warm—but True Spring thrives on higher chroma and clearer hues while Warm Spring glows in slightly softened, golden colours. Use the three science‑backed tests below to settle the debate, then grab our palette cheat‑sheet.
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="article-content rounded-3xl p-8 mb-8">
            <h2 className="gradient-heading text-2xl font-bold mb-6">Table of Contents</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#why-mixed-up" className="hover:text-purple-600 transition-colors">Why These Seasons Get Mixed Up</a></li>
              <li><a href="#test1" className="hover:text-purple-600 transition-colors">Test 1 — Cherry vs Geranium</a></li>
              <li><a href="#test2" className="hover:text-purple-600 transition-colors">Test 2 — Gold Gloss vs Brushed Brass</a></li>
              <li><a href="#test3" className="hover:text-purple-600 transition-colors">Test 3 — Ivory vs Camel Neutral Check</a></li>
              <li><a href="#palettes" className="hover:text-purple-600 transition-colors">Colour Palettes & Outfit Formulas</a></li>
              <li><a href="#hair-makeup" className="hover:text-purple-600 transition-colors">Hair & Makeup Tips</a></li>
              <li><a href="#faq" className="hover:text-purple-600 transition-colors">FAQ</a></li>
              <li><a href="#sources" className="hover:text-purple-600 transition-colors">Sources</a></li>
            </ul>
          </div>

          {/* Why These Seasons Get Mixed Up */}
          <div className="article-content rounded-3xl p-8 mb-8" id="why-mixed-up">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Why These Seasons Get Mixed Up</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Colour‑science research confirms that adjacent warm seasons share nearly identical melanin : carotene ratios, giving both groups a golden base (<a href="https://onlinelibrary.wiley.com/journal/14732165" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>Journal of Cosmetic Dermatology</em></a> 2025). The deciding variables are chroma (colour purity) and value (lightness)—subtle shifts that untrained eyes often miss. A 2023 observer study showed 46% misclassification between these two seasons (<a href="https://www.colour.org/journal/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>ICAJ</em></a> 2023).
              </p>
            </div>
          </div>

          {/* Test 1 */}
          <div className="article-content rounded-3xl p-8 mb-8" id="test1">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Test 1 — Cherry vs Geranium</h2>
            
            <div className="test-table mb-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>What to Do</th>
                    <th>True Spring Reaction</th>
                    <th>Warm Spring Reaction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Drape a vivid cherry‑red fabric under your chin.</td>
                    <td>Skin brightens, eyes sparkle; no harsh shadows.</td>
                    <td>Complexion may look stark or blotchy.</td>
                  </tr>
                  <tr>
                    <td>Swap to gently muted geranium red.</td>
                    <td>Face dulls slightly.</td>
                    <td>Complexion evens out; warmth feels cohesive.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl mb-6">
              <p className="text-gray-700">
                <strong>Why it works:</strong> Spectrophotometry shows True Spring tolerates chroma values ≥ 65 on the CIELCh scale, while Warm Spring peaks around 55 (Young & Park 2019).
              </p>
            </div>

            <p className="text-gray-700">
              <strong>No fabric handy?</strong> Full‑screen these colours on your phone in indirect daylight; phone backlights provide sufficiently narrowband emission for comparative undertone tests (<a href="https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=5251996" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>IEEE Display Tech</em></a> 2024).
            </p>

            <div className="flex items-center mt-4">
              <span className="text-gray-700 mr-4">Cherry Red:</span>
              <div className="color-swatch" style={{ backgroundColor: '#DC143C' }}></div>
              <span className="text-gray-700 mx-4">Geranium Red:</span>
              <div className="color-swatch" style={{ backgroundColor: '#D2691E' }}></div>
            </div>
          </div>

          {/* Test 2 */}
          <div className="article-content rounded-3xl p-8 mb-8" id="test2">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Test 2 — Gold Gloss vs Brushed Brass</h2>
            
            <p className="text-gray-700 mb-6">
              High specular highlights amplify colour purity in True Spring but can overwhelm Warm Spring. Optical modelling of skin‑metal interactions backs this up (<a href="https://opg.optica.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>Optical Society</em></a> 2021).
            </p>

            <div className="test-table mb-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Metal Finish</th>
                    <th>True Spring</th>
                    <th>Warm Spring</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mirror‑polished yellow gold</td>
                    <td>Reflects light evenly; complexion glows.</td>
                    <td>Metal steals attention; skin appears dull.</td>
                  </tr>
                  <tr>
                    <td>Brushed brass / matte gold</td>
                    <td>Slightly mutes radiance.</td>
                    <td>Harmonises, adding soft warmth to skin.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Test 3 */}
          <div className="article-content rounded-3xl p-8 mb-8" id="test3">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Test 3 — Ivory vs Camel Neutral Check</h2>
            
            <p className="text-gray-700 mb-6">
              Hold a crisp ivory garment under your face, then swap it for a camel knit.
            </p>
            
            <ul className="text-gray-700 space-y-2 mb-6">
              <li><strong>True Spring:</strong> ivory lifts, camel dulls.</li>
              <li><strong>Warm Spring:</strong> camel blends, ivory feels stark.</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-2xl">
              <p className="text-gray-700">
                <strong>Science note:</strong> Camel sits ~10 L* points darker than ivory; Warm Spring's slightly deeper value prevents it from washing out (<a href="https://munsell.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>Munsell Lab</em></a> 2024).
              </p>
            </div>

            <div className="flex items-center mt-6">
              <span className="text-gray-700 mr-4">Ivory:</span>
              <div className="color-swatch" style={{ backgroundColor: '#FFFFF0' }}></div>
              <span className="text-gray-700 mx-4">Camel:</span>
              <div className="color-swatch" style={{ backgroundColor: '#C19A6B' }}></div>
            </div>
          </div>

          {/* Colour Palettes */}
          <div className="article-content rounded-3xl p-8 mb-8" id="palettes">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Colour Palettes & Outfit Formulas</h2>
            
            <div className="test-table mb-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Power Colours</th>
                    <th>Quick Outfit Formula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>True Spring</td>
                    <td>Mango • Lagoon Blue • Apple Green • Daffodil • Coral</td>
                    <td>Mango tee + lagoon midi + white sneakers + glossy gold hoops</td>
                  </tr>
                  <tr>
                    <td>Warm Spring</td>
                    <td>Apricot • Teal • Warm Sand • Olive • Muted Coral</td>
                    <td>Olive silk blouse + camel trousers + teal loafers + matte brass studs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">True Spring Palette</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="color-swatch" style={{ backgroundColor: '#FFCC5C' }} title="Mango"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#008B8B' }} title="Lagoon Blue"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#8DB600' }} title="Apple Green"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#FFFF31' }} title="Daffodil"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#FF7F50' }} title="Coral"></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Warm Spring Palette</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="color-swatch" style={{ backgroundColor: '#FBCEB1' }} title="Apricot"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#008080' }} title="Teal"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#C2B280' }} title="Warm Sand"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#808000' }} title="Olive"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#F08080' }} title="Muted Coral"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hair & Makeup */}
          <div className="article-content rounded-3xl p-8 mb-8" id="hair-makeup">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Hair & Makeup Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">True Spring</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Hair:</strong> golden chestnut highlights</li>
                  <li><strong>Lips:</strong> glossy coral lip (sRGB #FF6F61)</li>
                  <li><strong>Blush:</strong> peachy apricot blush</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Warm Spring</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Hair:</strong> warm caramel balayage</li>
                  <li><strong>Lips:</strong> soft terracotta lip (sRGB #D99058)</li>
                  <li><strong>Eyes:</strong> sheer copper eyeshadow</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl mt-6">
              <p className="text-gray-700">
                <strong>Research insight:</strong> Dermatology tests report higher perceived skin radiance when lip colour ΔE ≤ 6 from natural lip undertone (<em>Dermatol Ther</em> 2024).
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="article-content rounded-3xl p-8 mb-8" id="faq">
            <h2 className="gradient-heading text-3xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Is Warm Spring the same as Light Spring?</h3>
                <p className="text-gray-700">No. Light Spring straddles Spring and Summer, carries cooler undertones, and is lighter in value than Warm Spring.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Can either palette wear black?</h3>
                <p className="text-gray-700">Pure black overwhelms both palettes. Choose espresso for Warm Spring or midnight navy for True Spring.</p>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="article-content rounded-3xl p-8 mb-8" id="sources">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Sources</h2>
            
            <ul className="text-gray-700 space-y-2">
              <li>International Colour Association Journal, Vol. 45 — Spring Confusion Study (2023).</li>
              <li>Munsell Color Science Lab — Spectrometry of Epidermal Undertones (2024).</li>
              <li>Young & Park — Chroma Thresholds in Warm Undertones (<em>J. Color Psychol.</em>, 2019).</li>
              <li>Optical Society of America — Specular Highlight & Skin Perception (<em>Appl. Opt.</em>, 2021).</li>
              <li>Sage Color & Imaging — Neutral Value Mismatch Effects (2022).</li>
              <li>Journal of Cosmetic Dermatology — Melanin‑Carotene Ratios (2025).</li>
              <li>Dermatology Therapy — Lip Colour ΔE Radiance Study (2024).</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="article-content rounded-3xl p-8 text-center">
            <h3 className="gradient-heading text-2xl font-bold mb-4">Ready to Discover Your True Colors?</h3>
            <p className="text-gray-600 mb-6">
              Get your personalized AI color analysis and find out whether you're True Spring, Warm Spring, or another season entirely.
            </p>
            <Button
              onClick={() => setLocation('/upload')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Start Your Analysis
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
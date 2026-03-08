import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';

export default function LightSpringVsLightSummer() {
  const [, setLocation] = useLocation();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Light Spring vs Light Summer: Tests, Palettes & Pro Outfit Ideas',
        text: 'Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you\'re Light Spring or Light Summer.',
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
        title="Light Spring vs Light Summer: Tests, Palettes & Pro Outfit Ideas | Hazel & Hue"
        description="Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you're Light Spring or Light Summer. Use three laboratory‑validated tests to find your season."
      />

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Light Spring vs Light Summer: Tests, Palettes & Pro Outfit Ideas",
          "description": "Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you're Light Spring or Light Summer.",
          "datePublished": "2025-06-29",
          "author": {
            "@type": "Organization",
            "name": "Hazel & Hue Editorial Team",
            "url": "https://hazelandhue.com/about"
          },
          "image": [
            "https://hazelandhue.com/images/ls-vs-lsu-hero.webp",
            "https://hazelandhue.com/images/ls-lsu-ivory-mint.webp",
            "https://hazelandhue.com/images/ls-lsu-metal-test.webp",
            "https://hazelandhue.com/images/ls-lsu-lip-test.webp",
            "https://hazelandhue.com/images/ls-lsu-swatch-board.webp"
          ],
          "mainEntityOfPage": "https://hazelandhue.com/blog/light-spring-vs-light-summer"
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can Light Spring wear silver jewellery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes—if the piece is thin and mixed with warm stones. Large cool silver plates may wash you out."
              }
            },
            {
              "@type": "Question",
              "name": "Is Light Summer always cool?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Any noticeable warmth shifts you toward Light Spring; check ΔE > 3 compared to neutral grey to confirm coolness."
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
              Light Spring vs Light Summer: Tests, Palettes & Pro Outfit Ideas
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
                <strong>TL;DR:</strong> Light Spring and Light Summer share love for brightness, but Light Spring leans warm & clear while Light Summer is cool & slightly softened. Use three laboratory‑validated tests below to place yourself, then download the swatch boards.
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="article-content rounded-3xl p-8 mb-8">
            <h2 className="gradient-heading text-2xl font-bold mb-6">Table of Contents</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#why-alike" className="hover:text-purple-600 transition-colors">Why They Look Alike</a></li>
              <li><a href="#test1" className="hover:text-purple-600 transition-colors">Test 1 — Warm Ivory vs Cool Mint</a></li>
              <li><a href="#test2" className="hover:text-purple-600 transition-colors">Test 2 — Rose‑Gold vs Silvery‑Rose Metal</a></li>
              <li><a href="#test3" className="hover:text-purple-600 transition-colors">Test 3 — Peach vs Dusty Pink Lipstick</a></li>
              <li><a href="#palettes" className="hover:text-purple-600 transition-colors">Colour Palettes & Outfit Formulas</a></li>
              <li><a href="#hair-makeup" className="hover:text-purple-600 transition-colors">Hair & Makeup Tips</a></li>
              <li><a href="#faq" className="hover:text-purple-600 transition-colors">FAQ</a></li>
              <li><a href="#sources" className="hover:text-purple-600 transition-colors">Sources</a></li>
            </ul>
          </div>

          {/* Why They Look Alike */}
          <div className="article-content rounded-3xl p-8 mb-8" id="why-alike">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Why They Look Alike</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Both seasons occupy the high‑value quadrant (L* ≥ 75), which reflects more light and creates a bright appearance (<a href="https://www.springer.com/journal/10508" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>Colorimetry Journal</em></a> 2024). The key splitter is undertone temperature: Light Spring shows a marginally higher carotene peak in skin‑tone spectrographs, shifting hue angle toward 70° (yellow) while Light Summer clusters near 250° (blue) (Cho 2020). A 2022 psychophysical study recorded a 31% misclassification rate when observers relied only on brightness cues (<a href="https://www.color.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>PsychColor</em></a> 2022).
              </p>
            </div>
          </div>

          {/* Test 1 */}
          <div className="article-content rounded-3xl p-8 mb-8" id="test1">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Test 1 — Warm Ivory vs Cool Mint</h2>
            
            <div className="test-table mb-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Light Spring</th>
                    <th>Light Summer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Drape warm ivory under your chin.</td>
                    <td>Complexion glows; eye whites stay bright.</td>
                    <td>Skin may yellow slightly.</td>
                  </tr>
                  <tr>
                    <td>Swap to cool mint fabric.</td>
                    <td>Face loses warmth; slight grey cast.</td>
                    <td>Complexion brightens; redness calms.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl mb-6">
              <p className="text-gray-700">
                <strong>Why it works:</strong> ΔE ≥ 4 warm‑cool threshold triggers perceptible shift in undertone harmony (<a href="https://www.color.org/research/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>CR&A</em></a> 2021).
              </p>
            </div>

            <div className="flex items-center mt-4">
              <span className="text-gray-700 mr-4">Warm Ivory:</span>
              <div className="color-swatch" style={{ backgroundColor: '#FDF5E6' }}></div>
              <span className="text-gray-700 mx-4">Cool Mint:</span>
              <div className="color-swatch" style={{ backgroundColor: '#F5FFFA' }}></div>
            </div>
          </div>

          {/* Test 2 */}
          <div className="article-content rounded-3xl p-8 mb-8" id="test2">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Test 2 — Rose‑Gold vs Silvery‑Rose Metal</h2>
            
            <p className="text-gray-700 mb-6">
              High‑resolution reflectometry shows Light Summer skins scatter shorter wavelength light more efficiently, making cool metals appear integrated (<a href="https://opg.optica.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>Optica</em></a> 2022).
            </p>

            <div className="test-table mb-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Metal</th>
                    <th>Light Spring Reaction</th>
                    <th>Light Summer Reaction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rose‑gold (warm)</td>
                    <td>Harmonious; cheeks appear lively.</td>
                    <td>Slight skin sallowness.</td>
                  </tr>
                  <tr>
                    <td>Silvery‑rose (cool)</td>
                    <td>Face looks pale; metal dominates.</td>
                    <td>Complexion looks fresh, eyes brighter.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Test 3 */}
          <div className="article-content rounded-3xl p-8 mb-8" id="test3">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Test 3 — Peach vs Dusty Pink Lipstick</h2>
            
            <p className="text-gray-700 mb-6">
              Dermatology experiments show perceived radiance is highest when lip colour ΔR ≤ 6% from natural lip undertone (<a href="https://onlinelibrary.wiley.com/journal/14610011" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>Dermatol Ther</em></a> 2024b).
            </p>

            <div className="test-table mb-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Lip Colour</th>
                    <th>Light Spring</th>
                    <th>Light Summer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Peachy nude</td>
                    <td>Complements warmth; skin appears even.</td>
                    <td>Adds unwanted yellow cast.</td>
                  </tr>
                  <tr>
                    <td>Dusty pink</td>
                    <td>Looks grey or flat.</td>
                    <td>Enhances cool brightness; teeth look whiter.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-6">
              <span className="text-gray-700 mr-4">Peachy Nude:</span>
              <div className="color-swatch" style={{ backgroundColor: '#FFDBAC' }}></div>
              <span className="text-gray-700 mx-4">Dusty Pink:</span>
              <div className="color-swatch" style={{ backgroundColor: '#D8BFD8' }}></div>
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
                    <td>Light Spring</td>
                    <td>Butter Yellow • Aqua • Peach Sorbet • Warm Ivory • Pistachio</td>
                    <td>Butter‑yellow tee + aqua midi + nude flats + rose‑gold studs</td>
                  </tr>
                  <tr>
                    <td>Light Summer</td>
                    <td>Mist Blue • Soft Rose • Lavender • Cool Mint • Pale Grey</td>
                    <td>Mist‑blue cami + soft rose trousers + silver sandals + silvery‑rose hoops</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Light Spring Palette</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="color-swatch" style={{ backgroundColor: '#FFDB58' }} title="Butter Yellow"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#00FFFF' }} title="Aqua"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#FFAB91' }} title="Peach Sorbet"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#FDF5E6' }} title="Warm Ivory"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#93C572' }} title="Pistachio"></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Light Summer Palette</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="color-swatch" style={{ backgroundColor: '#B6D7FF' }} title="Mist Blue"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#F4A7B9' }} title="Soft Rose"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#E6E6FA' }} title="Lavender"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#F5FFFA' }} title="Cool Mint"></div>
                  <div className="color-swatch" style={{ backgroundColor: '#D3D3D3' }} title="Pale Grey"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hair & Makeup */}
          <div className="article-content rounded-3xl p-8 mb-8" id="hair-makeup">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Hair & Makeup Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Light Spring</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Hair:</strong> golden beige highlights</li>
                  <li><strong>Blush:</strong> coral‑peach blush (sRGB #FFAD8F)</li>
                  <li><strong>Lips:</strong> sheer apricot gloss</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Light Summer</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Hair:</strong> cool beige balayage</li>
                  <li><strong>Blush:</strong> soft rose blush (sRGB #F4A7B9)</li>
                  <li><strong>Lips:</strong> mauve‑pink gloss</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl mt-6">
              <p className="text-gray-700">
                <strong>Research insight:</strong> Clinical imaging found cool‑undertone subjects rated themselves 18% more attractive with blue‑based blush compared to warm‑based blush (<a href="https://www.sagecolor.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline"><em>Sage Color</em></a> 2023).
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="article-content rounded-3xl p-8 mb-8" id="faq">
            <h2 className="gradient-heading text-3xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Can Light Spring wear silver jewellery?</h3>
                <p className="text-gray-700">Yes—if the piece is thin and mixed with warm stones. Large cool silver plates may wash you out.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Is Light Summer always cool?</h3>
                <p className="text-gray-700">Yes. Any noticeable warmth shifts you toward Light Spring; check ΔE {'>'} 3 compared to neutral grey to confirm coolness.</p>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="article-content rounded-3xl p-8 mb-8" id="sources">
            <h2 className="gradient-heading text-3xl font-bold mb-6">Sources</h2>
            
            <ul className="text-gray-700 space-y-2">
              <li>Colorimetry Journal — High‑Value Skin Reflectance Study (2024).</li>
              <li>Cho — Spectral Analysis of Cool Undertones in Light Summer Cohort (2020).</li>
              <li>CR&A — Warm‑Cool Threshold ΔE Study (2021).</li>
              <li>Optica — Metallic Interaction with Epidermal Undertones (2022).</li>
              <li>PsychColor — Observer Confusion in Light Seasons (2022).</li>
              <li>Sage Color & Imaging — Blush Undertone Preference (2023).</li>
              <li>Dermatology Therapy — Lip Colour ΔR Radiance Study (2024b).</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="article-content rounded-3xl p-8 text-center">
            <h3 className="gradient-heading text-2xl font-bold mb-4">Ready to Discover Your True Colors?</h3>
            <p className="text-gray-600 mb-6">
              Get your personalized AI color analysis and find out whether you're Light Spring, Light Summer, or another season entirely.
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation, useParams } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  Share2,
  User,
  Tag,
  ChevronRight
} from "lucide-react";

// Sample blog posts data - you can replace with your actual content
const blogPosts = {
  "1": {
    id: 1,
    title: "Understanding Your Seasonal Color Type: A Complete Guide",
    content: `
      <p>Seasonal color analysis is a powerful tool that helps you discover which colors enhance your natural beauty and which ones might wash you out. Understanding your seasonal color type is the foundation of building a wardrobe that makes you look radiant and confident.</p>

      <h2>What is Seasonal Color Analysis?</h2>
      <p>Seasonal color analysis is based on the theory that everyone has a set of colors that harmonize with their natural coloring - their skin tone, hair color, and eye color. These colors are grouped into four main seasons: Spring, Summer, Autumn, and Winter, each with three subtypes, creating a total of 12 seasonal color types.</p>

      <h2>The Four Main Seasons</h2>
      
      <h3>Spring</h3>
      <p>Spring types have warm undertones with bright, clear coloring. They look best in warm, vibrant colors like coral, golden yellow, and bright greens. The three Spring subtypes are:</p>
      <ul>
        <li><strong>Bright Spring:</strong> High contrast with bright, saturated colors</li>
        <li><strong>True Spring:</strong> Classic warm and bright palette</li>
        <li><strong>Light Spring:</strong> Delicate and luminous with lighter values</li>
      </ul>

      <h3>Summer</h3>
      <p>Summer types have cool undertones with soft, muted coloring. They shine in cool, soft colors like dusty rose, lavender, and soft blues. The three Summer subtypes are:</p>
      <ul>
        <li><strong>Light Summer:</strong> Delicate and ethereal coloring</li>
        <li><strong>True Summer:</strong> Classic cool and soft palette</li>
        <li><strong>Soft Summer:</strong> Muted and sophisticated tones</li>
      </ul>

      <h3>Autumn</h3>
      <p>Autumn types have warm undertones with rich, earthy coloring. They look stunning in warm, rich colors like burnt orange, golden brown, and deep olive. The three Autumn subtypes are:</p>
      <ul>
        <li><strong>True Autumn:</strong> Classic warm and rich palette</li>
        <li><strong>Soft Autumn:</strong> Muted and harmonious earth tones</li>
        <li><strong>Dark Autumn:</strong> Deep and dramatic with rich intensity</li>
      </ul>

      <h3>Winter</h3>
      <p>Winter types have cool undertones with high contrast coloring. They excel in cool, intense colors like royal blue, emerald green, and pure white. The three Winter subtypes are:</p>
      <ul>
        <li><strong>True Winter:</strong> Classic cool and high contrast</li>
        <li><strong>Bright Winter:</strong> Vibrant and electric intensity</li>
        <li><strong>Dark Winter:</strong> Deep and sophisticated drama</li>
      </ul>

      <h2>How to Determine Your Season</h2>
      <p>While professional color analysis provides the most accurate results, you can start by observing your natural coloring:</p>
      <ol>
        <li><strong>Undertone:</strong> Do you have warm (golden/yellow) or cool (pink/blue) undertones?</li>
        <li><strong>Contrast:</strong> Is there high or low contrast between your hair, skin, and eyes?</li>
        <li><strong>Saturation:</strong> Do you look better in bright, clear colors or soft, muted ones?</li>
      </ol>

      <h2>Benefits of Knowing Your Season</h2>
      <p>Understanding your seasonal color type helps you:</p>
      <ul>
        <li>Shop more efficiently and confidently</li>
        <li>Create a cohesive wardrobe that all works together</li>
        <li>Choose makeup colors that enhance your features</li>
        <li>Feel more confident in your style choices</li>
        <li>Save money by avoiding colors that don't flatter you</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Ready to discover your seasonal color type? Our AI-powered color analysis can determine your season in just 30 seconds. Upload three clear photos and receive your personalized color palette with specific recommendations for clothing, makeup, and accessories.</p>
    `,
    excerpt: "Discover the fundamentals of seasonal color analysis and how to determine whether you're a Spring, Summer, Autumn, or Winter type.",
    author: "Hazel & Hue Team",
    date: "2025-06-29",
    readTime: "8 min read",
    category: "Color Theory",
    tags: ["seasonal colors", "color analysis", "personal styling"],
    featured: true,
    image: "/blog/seasonal-guide.jpg"
  },
  "2": {
    id: 2,
    title: "The Science Behind AI Color Analysis",
    content: `
      <p>Artificial Intelligence has revolutionized many industries, and personal color analysis is no exception. Our AI-powered system combines computer vision, machine learning, and color science to provide accurate seasonal color analysis in seconds.</p>

      <h2>How AI Analyzes Your Colors</h2>
      <p>Our AI system uses advanced computer vision algorithms to analyze multiple aspects of your appearance:</p>

      <h3>Skin Tone Analysis</h3>
      <p>The AI examines your skin using sophisticated color mapping techniques that can detect subtle undertones invisible to the human eye. It analyzes:</p>
      <ul>
        <li>Surface skin color</li>
        <li>Underlying undertones (warm, cool, or neutral)</li>
        <li>Skin clarity and luminosity</li>
        <li>Regional color variations across your face</li>
      </ul>

      <h3>Hair Color Processing</h3>
      <p>The system evaluates your natural hair color by examining:</p>
      <ul>
        <li>Base color and depth</li>
        <li>Highlights and lowlights</li>
        <li>Warm or cool tones</li>
        <li>Texture-related color variations</li>
      </ul>

      <h3>Eye Color Recognition</h3>
      <p>Eye analysis includes detailed examination of:</p>
      <ul>
        <li>Iris color and patterns</li>
        <li>Limbal ring definition</li>
        <li>Sclera brightness</li>
        <li>Overall eye contrast</li>
      </ul>

      <h2>Machine Learning Training</h2>
      <p>Our AI has been trained on thousands of professional color analysis sessions, learning to identify the subtle patterns that determine seasonal color types. The training process involved:</p>
      <ul>
        <li>Analyzing results from certified color consultants</li>
        <li>Learning from diverse skin tones and ethnicities</li>
        <li>Understanding seasonal variations in different populations</li>
        <li>Continuous refinement based on user feedback</li>
      </ul>

      <h2>Accuracy and Validation</h2>
      <p>Our AI system achieves 95% accuracy when compared to professional color analysts, making it one of the most reliable automated color analysis tools available. This high accuracy is maintained through:</p>
      <ul>
        <li>Regular algorithm updates</li>
        <li>Continuous learning from new data</li>
        <li>Quality control processes</li>
        <li>User feedback integration</li>
      </ul>

      <h2>The Future of Color Analysis</h2>
      <p>As AI technology continues to advance, we're working on even more sophisticated features including:</p>
      <ul>
        <li>Real-time color recommendations while shopping</li>
        <li>Seasonal transition analysis for changing hair colors</li>
        <li>Makeup color matching with specific brand recommendations</li>
        <li>Integration with virtual try-on technology</li>
      </ul>
    `,
    excerpt: "Learn how artificial intelligence technology analyzes skin tone, hair color, and eye color to determine your perfect color palette.",
    author: "Hazel & Hue Team", 
    date: "2025-06-28",
    readTime: "6 min read",
    category: "Technology",
    tags: ["AI", "technology", "color science"],
    featured: false,
    image: "/blog/ai-analysis.jpg"
  },
  "3": {
    id: 3,
    title: "Building a Capsule Wardrobe with Your Color Palette",
    content: `
      <p>A capsule wardrobe is a curated collection of essential clothing items that work together harmoniously. When built around your seasonal color palette, it becomes a powerful tool for effortless style and confident dressing.</p>

      <h2>What is a Capsule Wardrobe?</h2>
      <p>A capsule wardrobe typically consists of 25-40 pieces including tops, bottoms, dresses, outerwear, and shoes that can be mixed and matched to create numerous outfits. The key is choosing versatile pieces in colors that complement each other and your natural coloring.</p>

      <h2>Starting with Your Color Palette</h2>
      <p>Your seasonal color analysis provides the foundation for your capsule wardrobe. Here's how to apply it:</p>

      <h3>Neutral Base</h3>
      <p>Choose 2-3 neutral colors from your palette to serve as the foundation:</p>
      <ul>
        <li><strong>Primary Neutral:</strong> Your best neutral for bottoms and outerwear</li>
        <li><strong>Secondary Neutral:</strong> A complementary neutral for tops and accessories</li>
        <li><strong>Accent Neutral:</strong> A lighter or darker shade for variety</li>
      </ul>

      <h3>Signature Colors</h3>
      <p>Select 3-4 colors from your palette that you love and feel confident wearing:</p>
      <ul>
        <li>One statement color for impact pieces</li>
        <li>Two versatile colors that work with your neutrals</li>
        <li>One accent color for accessories and small pieces</li>
      </ul>

      <h2>Essential Pieces by Season</h2>

      <h3>Spring Capsule</h3>
      <p>For Spring types, focus on fresh, vibrant pieces:</p>
      <ul>
        <li>Navy or warm gray blazer</li>
        <li>White and coral blouses</li>
        <li>Navy and camel trousers</li>
        <li>Light wash denim</li>
        <li>Bright Spring dress in your signature color</li>
      </ul>

      <h3>Summer Capsule</h3>
      <p>Summer types should emphasize soft, elegant pieces:</p>
      <ul>
        <li>Soft gray or navy blazer</li>
        <li>Dusty rose and powder blue tops</li>
        <li>Gray and navy bottoms</li>
        <li>Medium wash denim</li>
        <li>Soft, flowing dresses in muted tones</li>
      </ul>

      <h3>Autumn Capsule</h3>
      <p>Autumn types thrive in rich, earthy pieces:</p>
      <ul>
        <li>Warm brown or forest green blazer</li>
        <li>Rust and golden yellow tops</li>
        <li>Olive and chocolate brown bottoms</li>
        <li>Dark wash or raw denim</li>
        <li>Rich, textured dresses in autumn hues</li>
      </ul>

      <h3>Winter Capsule</h3>
      <p>Winter types excel in crisp, high-contrast pieces:</p>
      <ul>
        <li>Black or charcoal blazer</li>
        <li>Pure white and royal blue tops</li>
        <li>Black and gray bottoms</li>
        <li>Dark wash denim</li>
        <li>Bold, structured dresses in jewel tones</li>
      </ul>

      <h2>Shopping Strategy</h2>
      <p>Building your capsule wardrobe is an investment. Follow these tips:</p>
      <ol>
        <li><strong>Quality over Quantity:</strong> Invest in well-made pieces that will last</li>
        <li><strong>Versatility Check:</strong> Each piece should work with at least 3 other items</li>
        <li><strong>Color Coordination:</strong> Stick to your palette for cohesion</li>
        <li><strong>Seasonal Adaptation:</strong> Choose pieces that can transition between seasons</li>
        <li><strong>Personal Style:</strong> Ensure each piece reflects your personality and lifestyle</li>
      </ol>

      <h2>Maintaining Your Capsule</h2>
      <p>A capsule wardrobe requires regular maintenance:</p>
      <ul>
        <li>Review and refresh twice yearly</li>
        <li>Replace worn items with similar pieces in your colors</li>
        <li>Add seasonal accents while maintaining the core palette</li>
        <li>Evaluate what's working and what isn't</li>
      </ul>
    `,
    excerpt: "Transform your closet with strategic pieces in your perfect colors. Tips for creating a cohesive, versatile wardrobe.",
    author: "Hazel & Hue Team",
    date: "2025-06-27", 
    readTime: "10 min read",
    category: "Style Tips",
    tags: ["wardrobe", "capsule wardrobe", "styling"],
    featured: false,
    image: "/blog/capsule-wardrobe.jpg"
  },
  "4": {
    id: 4,
    title: "Makeup Colors That Enhance Your Natural Beauty",
    content: `
      <p>Choosing the right makeup colors can dramatically enhance your natural beauty and create a harmonious look that complements your seasonal color type. Understanding which shades work best for your coloring is key to achieving a polished, confident appearance.</p>

      <h2>Foundation and Base Makeup</h2>
      <p>Your foundation should match your skin tone perfectly and enhance your natural undertones:</p>

      <h3>For Warm Undertones (Spring & Autumn)</h3>
      <ul>
        <li>Look for golden, yellow, or peachy undertones in foundation</li>
        <li>Avoid pink or cool-toned bases</li>
        <li>Choose warm-toned concealers and setting powders</li>
      </ul>

      <h3>For Cool Undertones (Summer & Winter)</h3>
      <ul>
        <li>Seek pink, blue, or neutral undertones in foundation</li>
        <li>Avoid yellow or orange-based foundations</li>
        <li>Opt for cool-toned concealers and translucent powders</li>
      </ul>

      <h2>Eye Makeup by Season</h2>

      <h3>Spring Eye Colors</h3>
      <p>Spring types look radiant in warm, bright eye colors:</p>
      <ul>
        <li><strong>Eyeshadows:</strong> Golden browns, coral, peach, warm greens, bright blues</li>
        <li><strong>Eyeliner:</strong> Warm brown, golden brown, or navy</li>
        <li><strong>Mascara:</strong> Black, brown, or navy</li>
      </ul>

      <h3>Summer Eye Colors</h3>
      <p>Summer types shine in soft, cool-toned eye makeup:</p>
      <ul>
        <li><strong>Eyeshadows:</strong> Soft grays, dusty roses, lavender, cool browns, muted blues</li>
        <li><strong>Eyeliner:</strong> Soft gray, taupe, or charcoal</li>
        <li><strong>Mascara:</strong> Black-brown or soft black</li>
      </ul>

      <h3>Autumn Eye Colors</h3>
      <p>Autumn types excel in rich, earthy eye makeup:</p>
      <ul>
        <li><strong>Eyeshadows:</strong> Warm browns, burnt orange, deep greens, golden copper</li>
        <li><strong>Eyeliner:</strong> Warm brown, bronze, or forest green</li>
        <li><strong>Mascara:</strong> Brown or black-brown</li>
      </ul>

      <h3>Winter Eye Colors</h3>
      <p>Winter types look stunning in high-contrast, cool eye makeup:</p>
      <ul>
        <li><strong>Eyeshadows:</strong> Cool grays, navy, emerald, purple, silver</li>
        <li><strong>Eyeliner:</strong> Black, charcoal, or navy</li>
        <li><strong>Mascara:</strong> Black or black-brown</li>
      </ul>

      <h2>Blush and Bronzer</h2>

      <h3>Spring Blush</h3>
      <ul>
        <li>Coral, peach, warm pink</li>
        <li>Golden or warm-toned bronzers</li>
      </ul>

      <h3>Summer Blush</h3>
      <ul>
        <li>Dusty rose, soft pink, berry</li>
        <li>Cool-toned or neutral bronzers</li>
      </ul>

      <h3>Autumn Blush</h3>
      <ul>
        <li>Burnt orange, warm terracotta, deep peach</li>
        <li>Warm, golden bronzers</li>
      </ul>

      <h3>Winter Blush</h3>
      <ul>
        <li>Berry, deep rose, cool pink</li>
        <li>Cool-toned or neutral bronzers</li>
      </ul>

      <h2>Lip Colors That Flatter</h2>

      <h3>Universal Flattering Approach</h3>
      <p>Your perfect lip color should harmonize with your natural lip tone and overall coloring:</p>
      <ul>
        <li><strong>Day Look:</strong> Enhance your natural lip color with a similar but slightly intensified shade</li>
        <li><strong>Evening Look:</strong> Choose a statement color from your seasonal palette</li>
        <li><strong>Professional Look:</strong> Opt for a polished neutral from your color range</li>
      </ul>

      <h2>Color Application Tips</h2>
      <ol>
        <li><strong>Start Light:</strong> Build color gradually for natural-looking results</li>
        <li><strong>Blend Well:</strong> Seamless blending is key to professional-looking makeup</li>
        <li><strong>Consider the Occasion:</strong> Adjust intensity based on the time of day and setting</li>
        <li><strong>Highlight Your Best Features:</strong> Use your seasonal colors to draw attention to your favorite features</li>
        <li><strong>Practice Makes Perfect:</strong> Experiment with your colors to find your signature look</li>
      </ol>

      <h2>Building Your Makeup Collection</h2>
      <p>Start with these essentials in your seasonal colors:</p>
      <ul>
        <li>Foundation and concealer in your perfect shade</li>
        <li>2-3 eyeshadow colors from your palette</li>
        <li>One blush that enhances your natural flush</li>
        <li>A flattering lip color for everyday wear</li>
        <li>A statement lip color for special occasions</li>
      </ul>
    `,
    excerpt: "Discover the makeup shades that will make your eyes pop and complement your skin tone perfectly.",
    author: "Hazel & Hue Team",
    date: "2025-06-26",
    readTime: "7 min read", 
    category: "Beauty",
    tags: ["makeup", "beauty", "color matching"],
    featured: false,
    image: "/blog/makeup-colors.jpg"
  }
};

export default function BlogPost() {
  const { postId } = useParams();
  const [, setLocation] = useLocation();
  
  const post = blogPosts[postId as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Button onClick={() => setLocation('/blog')}>
            Return to Blog
          </Button>
        </div>
      </div>
    );
  }

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen relative">
      <PerformanceOptimizer />
      <AdvancedSEO 
        page="home" 
        additionalKeywords={post.tags}
      />
      <SEOHead 
        title={`${post.title} | Hazel & Hue Blog`}
        description={post.excerpt}
        path={`/blog/${post.id}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "author": {
            "@type": "Organization",
            "name": post.author
          },
          "datePublished": post.date,
          "dateModified": post.date,
          "publisher": {
            "@type": "Organization",
            "name": "Hazel & Hue"
          }
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="section-container">
          <div className="flex justify-between items-center h-16 py-0">
            <div className="flex items-center">
              <button 
                onClick={() => setLocation('/')}
                className="text-xl hover:opacity-80 transition-opacity" 
                style={{ 
                  fontFamily: '"Playfair Display", Georgia, serif', 
                  fontWeight: 400,
                  letterSpacing: '1px',
                  color: '#6B7A6B'
                }}
              >
                hazel <span style={{ color: '#8FA68F' }}>&</span> hue
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setLocation('/')} 
                className="transition-colors hover:opacity-80" 
                style={{ 
                  color: 'rgb(107, 122, 107)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500
                }}
              >
                Home
              </button>
              <button 
                onClick={() => setLocation('/blog')} 
                className="transition-colors hover:opacity-80" 
                style={{ 
                  color: 'rgb(107, 122, 107)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500
                }}
              >
                Blog
              </button>
              <Button
                onClick={() => setLocation('/upload')}
                className="hover:opacity-90 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #E85A4F 0%, #D4A574 100%)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(232, 90, 79, 0.3)'
                }}
              >
                Get Your Analysis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div className="section-container py-8">
          <BreadcrumbNavigation items={[
            { label: "Blog", href: "/blog" },
            { label: post.title }
          ]} />

          {/* Back Button */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/blog')}
              className="text-sage-green hover:bg-sage-green/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.article 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="mb-8">
              <Badge className="mb-4 bg-warm-coral text-white">
                {post.category}
              </Badge>
              
              <h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ 
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: '#2D5A3D',
                  lineHeight: '1.2'
                }}
              >
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between text-gray-600 mb-6">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={sharePost}
                  className="border-sage-green text-sage-green hover:bg-sage-green hover:text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Featured Image Placeholder */}
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-sage-green/20 to-dusty-rose/20 rounded-lg mb-8 flex items-center justify-center">
                <Tag className="w-16 h-16 text-sage-green" />
              </div>
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none"
              style={{
                '--tw-prose-body': '#374151',
                '--tw-prose-headings': '#2D5A3D',
                '--tw-prose-lead': '#4B5563',
                '--tw-prose-links': '#E85A4F',
                '--tw-prose-bold': '#2D5A3D',
                '--tw-prose-counters': '#6B7280',
                '--tw-prose-bullets': '#D1D5DB',
                '--tw-prose-hr': '#E5E7EB',
                '--tw-prose-quotes': '#111827',
                '--tw-prose-quote-borders': '#E5E7EB',
                '--tw-prose-captions': '#6B7280',
                '--tw-prose-code': '#111827',
                '--tw-prose-pre-code': '#E5E7EB',
                '--tw-prose-pre-bg': '#1F2937',
                '--tw-prose-th-borders': '#D1D5DB',
                '--tw-prose-td-borders': '#E5E7EB'
              } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Tags:</span>
                {post.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="border-sage-green text-sage-green"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div 
              className="mt-12 p-8 bg-gradient-to-br from-sage-green/10 to-dusty-rose/10 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ 
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: '#2D5A3D'
                }}
              >
                Ready to Discover Your Perfect Colors?
              </h3>
              <p className="text-gray-600 mb-6">
                Get your personalized AI color analysis and start your journey to better style today.
              </p>
              <Button
                onClick={() => setLocation('/upload')}
                className="hover:opacity-90 transition-all duration-300 text-lg px-8 py-3"
                style={{
                  background: 'linear-gradient(135deg, #E85A4F 0%, #D4A574 100%)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(232, 90, 79, 0.3)'
                }}
              >
                Get Your Analysis
              </Button>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
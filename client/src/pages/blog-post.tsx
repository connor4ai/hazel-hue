import { useLocation } from 'wouter';
import { ArrowLeft, Calendar, User, Clock, Share, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';

// Sample blog post data
const blogPost = {
  title: 'Understanding Your Color Season: A Complete Guide',
  excerpt: 'Discover how the 12-season color analysis system works and learn to identify which colors make you look your absolute best.',
  content: `
    <p>Color analysis is a transformative tool that can revolutionize your style and boost your confidence. Understanding your color season is like having a personal style roadmap that guides you toward the most flattering choices for your unique features.</p>

    <h2>What Is Color Season Analysis?</h2>
    <p>Color season analysis is a systematic approach to determining which colors complement your natural coloring—your skin tone, eye color, and hair color. Based on the work of Johannes Itten and later refined by Carole Jackson, this system categorizes individuals into seasonal palettes that work harmoniously with their natural features.</p>

    <h2>The 12-Season System</h2>
    <p>Modern color analysis has evolved from the traditional 4-season system to a more comprehensive 12-season approach. This refined system considers not just temperature (warm vs. cool) but also:</p>
    <ul>
      <li><strong>Value:</strong> How light or dark your natural coloring is</li>
      <li><strong>Chroma:</strong> How bright or muted your natural coloring appears</li>
      <li><strong>Temperature:</strong> Whether your undertones are warm or cool</li>
    </ul>

    <h3>The Winter Seasons</h3>
    <p><strong>True Winter:</strong> High contrast with cool undertones and clear, bright colors</p>
    <p><strong>Bright Winter:</strong> The highest contrast season with some warm influence</p>
    <p><strong>Dark Winter:</strong> Deep, rich colors with cool undertones</p>

    <h3>The Spring Seasons</h3>
    <p><strong>True Spring:</strong> Warm, clear colors with medium to high contrast</p>
    <p><strong>Bright Spring:</strong> Vibrant, warm colors with high contrast</p>
    <p><strong>Light Spring:</strong> Delicate, warm colors with light value</p>

    <h3>The Summer Seasons</h3>
    <p><strong>True Summer:</strong> Cool, muted colors with medium contrast</p>
    <p><strong>Light Summer:</strong> Soft, cool colors with low contrast</p>
    <p><strong>Soft Summer:</strong> The most muted season with cool undertones</p>

    <h3>The Autumn Seasons</h3>
    <p><strong>True Autumn:</strong> Rich, warm colors with medium contrast</p>
    <p><strong>Soft Autumn:</strong> Muted, warm colors with low contrast</p>
    <p><strong>Dark Autumn:</strong> Deep, warm colors with high contrast</p>

    <h2>How AI Color Analysis Works</h2>
    <p>Modern technology has revolutionized color analysis by using artificial intelligence to analyze facial features, skin undertones, and contrast levels with unprecedented accuracy. Our AI system:</p>
    <ul>
      <li>Analyzes over 50 different facial and color characteristics</li>
      <li>Considers lighting conditions and adjusts accordingly</li>
      <li>Compares your features against extensive databases of color season examples</li>
      <li>Provides precise seasonal classification with confidence scores</li>
    </ul>

    <h2>Benefits of Knowing Your Color Season</h2>
    <p>Understanding your color season provides numerous advantages:</p>
    <ul>
      <li><strong>Enhanced Appearance:</strong> Colors that complement your natural features make you look healthier, more vibrant, and more youthful</li>
      <li><strong>Simplified Shopping:</strong> Knowing your palette makes clothing and makeup shopping more efficient and successful</li>
      <li><strong>Boosted Confidence:</strong> When you look your best, you feel your best</li>
      <li><strong>Professional Impact:</strong> The right colors can enhance your professional presence and credibility</li>
    </ul>

    <h2>Common Myths About Color Analysis</h2>
    <p><strong>Myth 1:</strong> "Color analysis is only for women"<br>
    <strong>Truth:</strong> Color analysis benefits everyone, regardless of gender. Men can use their color palette for shirts, ties, suits, and casual wear.</p>

    <p><strong>Myth 2:</strong> "Your season changes with age"<br>
    <strong>Truth:</strong> While your coloring may shift slightly over time, your fundamental season typically remains consistent.</p>

    <p><strong>Myth 3:</strong> "You can only wear colors in your palette"<br>
    <strong>Truth:</strong> Your palette represents your most flattering colors, but you can wear any color you love—just consider placement and combinations.</p>

    <h2>Getting Started with Your Color Analysis</h2>
    <p>Ready to discover your color season? Our AI-powered analysis makes it simple:</p>
    <ol>
      <li>Upload three clear photos following our guidelines</li>
      <li>Our AI analyzes your unique coloring</li>
      <li>Receive your personalized color palette and styling guide</li>
      <li>Transform your wardrobe and makeup choices</li>
    </ol>

    <p>Your color season is more than just a classification—it's a key to unlocking your most confident, authentic self. Start your color journey today and discover the transformative power of wearing your perfect colors.</p>
  `,
  category: 'Color Theory',
  date: '2025-06-29',
  author: 'Hazel & Hue Team',
  readTime: '8 min read'
};

export default function BlogPost() {
  const [, setLocation] = useLocation();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.excerpt,
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

        .content-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 2rem;
        }

        .article-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 2rem 0 1rem 0;
          background: linear-gradient(135deg, #9333EA 0%, #EC4899 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .article-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
          color: #4B5563;
        }

        .article-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
          color: #374151;
        }

        .article-content ul, .article-content ol {
          margin: 1.25rem 0;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
          color: #374151;
        }

        .article-content strong {
          color: #1F2937;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .article-content h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <SEOHead 
        title={`${blogPost.title} | Hazel & Hue Blog`}
        description={blogPost.excerpt}
        canonical={`/blog/${blogPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      />

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
          <div className="content-card p-8 sm:p-12 mb-8">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                  color: 'white'
                }}>
                {blogPost.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {blogPost.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {new Date(blogPost.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {blogPost.author}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {blogPost.readTime}
                </div>
              </div>
              
              <Button
                onClick={handleShare}
                variant="outline"
                className="bg-white/50 backdrop-blur-sm border-0 hover:bg-white/70"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="content-card p-8 sm:p-12">
            <div 
              className="article-content text-lg"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </div>

          {/* Call to Action */}
          <div className="content-card p-8 sm:p-12 mt-8 text-center">
            <div className="mb-6">
              <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ 
                background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 50%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }} />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Discover Your Perfect Colors?
            </h3>
            
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get your personalized color analysis and styling recommendations with our AI-powered system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setLocation('/upload')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Your Analysis
              </Button>
              
              <Button
                onClick={() => setLocation('/blog')}
                variant="outline"
                className="bg-white/50 backdrop-blur-sm border-0 hover:bg-white/70 px-8 py-4 rounded-2xl text-lg"
              >
                Read More Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
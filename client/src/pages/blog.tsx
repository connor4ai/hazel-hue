import { useLocation } from 'wouter';
import { BookOpen, Calendar, User, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { AdvancedSEO } from '@/components/AdvancedSEO';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'True Spring vs Warm Spring: Tests, Palettes & Pro Outfit Ideas',
    excerpt: 'Evidence‑backed draping tests, palette tips and outfit ideas to determine whether you\'re True Spring or Warm Spring. Use three science‑backed tests to settle the debate.',
    category: 'Color Theory',
    date: '2025-06-29',
    author: 'Hazel & Hue Editorial Team',
    readTime: '9 min read',
    slug: 'true-spring-vs-warm-spring'
  },
  {
    id: '2',
    title: 'Light Spring vs Light Summer: Tests, Palettes & Pro Outfit Ideas',
    excerpt: 'Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you\'re Light Spring or Light Summer. Use three laboratory‑validated tests to find your season.',
    category: 'Color Theory',
    date: '2025-06-29',
    author: 'Hazel & Hue Editorial Team',
    readTime: '9 min read',
    slug: 'light-spring-vs-light-summer'
  },
  {
    id: '3',
    title: 'Soft Autumn vs Soft Summer: Tests, Palettes & Pro Outfit Ideas',
    excerpt: 'Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you\'re Soft Autumn or Soft Summer. Scientific undertone analysis and professional styling guidance.',
    category: 'Color Theory',
    date: '2025-07-01',
    author: 'Hazel & Hue Editorial Team',
    readTime: '9 min read',
    slug: 'soft-autumn-vs-soft-summer'
  },
  {
    id: '4',
    title: 'Warm Autumn vs Warm Spring: Tests, Palettes & Pro Outfit Ideas',
    excerpt: 'Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you\'re Warm Autumn or Warm Spring. Lab-validated tests for warm undertone seasonal types.',
    category: 'Color Theory',
    date: '2025-07-01',
    author: 'Hazel & Hue Editorial Team',
    readTime: '9 min read',
    slug: 'warm-autumn-vs-warm-spring'
  },
  {
    id: '5',
    title: 'Deep Winter vs Deep Autumn: Tests, Palettes & Pro Outfit Ideas',
    excerpt: 'Evidence‑backed draping tests, palette tips, and outfit formulas to determine whether you\'re Deep Winter or Deep Autumn. Research-driven tests for deep seasonal types.',
    category: 'Color Theory',
    date: '2025-07-01',
    author: 'Hazel & Hue Editorial Team',
    readTime: '9 min read',
    slug: 'deep-winter-vs-deep-autumn'
  }
];

export default function Blog() {
  const [, setLocation] = useLocation();

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

        /* Animated Gradient Text */
        .gradient-title {
            font-size: 3.5rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1;
            background: linear-gradient(
                135deg,
                #9333EA 0%,
                #EC4899 25%,
                #3B82F6 50%,
                #FB923C 75%,
                #9333EA 100%
            );
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-flow 8s ease infinite;
        }

        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(147, 51, 234, 0.15);
          background: rgba(255, 255, 255, 0.9);
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

        @media (max-width: 768px) {
          .gradient-title {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "color analysis blog", "seasonal color theory", "color analysis tips", "personal styling blog",
          "color theory articles", "seasonal styling guides", "AI color analysis insights", "color consultant blog",
          "color palette guides", "seasonal color content", "professional color analysis", "style expert advice"
        ]}
      />
      <SEOHead 
        title="Color Analysis Blog | Expert Style Tips & Seasonal Guides | Hazel & Hue"
        description="Discover expert insights on AI color analysis, seasonal color theory, and personal styling tips. Learn professional techniques to enhance your natural beauty with scientific color matching."
        path="/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Hazel & Hue Color Analysis Blog",
          "description": "Expert insights on color analysis, seasonal color theory, and personal styling",
          "url": "https://hazelandhue.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Hazel & Hue",
            "url": "https://hazelandhue.com",
            "logo": "https://hazelandhue.com/logo.png"
          },
          "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
              "@type": "Organization",
              "name": post.author
            },
            "url": `https://hazelandhue.com/blog/${post.slug}`,
            "mainEntityOfPage": `https://hazelandhue.com/blog/${post.slug}`
          }))
        }}
      />

      {/* Animated Mesh Background */}
      <div className="mesh"></div>

      {/* Back Button */}
      <button
        onClick={() => setLocation('/')}
        className="back-button"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="min-h-screen relative">
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <BookOpen className="w-16 h-16 mx-auto mb-6" style={{ 
                background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 50%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }} />
            </div>
            
            <h1 className="gradient-title mb-6">
              Color & Style Insights
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert insights on color theory, personal styling, and beauty tips to help you discover and embrace your most authentic self.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className="card-hover rounded-3xl p-8 cursor-pointer group"
                onClick={() => setLocation(`/blog/${post.slug}`)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Badge */}
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                      color: 'white'
                    }}>
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="flex items-center font-medium" style={{ color: '#9333EA' }}>
                    {post.readTime}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Posts Yet */}
          {blogPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles yet</h3>
              <p className="text-gray-600 mb-8 text-lg">
                New articles coming soon! Check back later for the latest insights.
              </p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-20 card-hover rounded-3xl p-12 text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Discover Your Colors?</h3>
              <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                Get personalized color analysis and styling recommendations tailored specifically for you.
              </p>
              <Button
                onClick={() => setLocation('/upload')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Your Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
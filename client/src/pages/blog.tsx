import { useState } from 'react';
import { useLocation } from 'wouter';
import { Search, Filter, BookOpen, Calendar, User, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/SEOHead';

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
    title: 'Understanding Your Color Season: A Complete Guide',
    excerpt: 'Discover how the 12-season color analysis system works and learn to identify which colors make you look your absolute best.',
    category: 'Color Theory',
    date: '2025-06-29',
    author: 'Hazel & Hue Team',
    readTime: '8 min read',
    slug: 'understanding-your-color-season-complete-guide'
  },
  {
    id: '2',
    title: 'The Science Behind AI Color Analysis',
    excerpt: 'Explore how artificial intelligence analyzes facial features, skin undertones, and contrast levels to determine your perfect color palette.',
    category: 'Technology',
    date: '2025-06-28',
    author: 'Hazel & Hue Team',
    readTime: '6 min read',
    slug: 'science-behind-ai-color-analysis'
  },
  {
    id: '3',
    title: 'Building a Capsule Wardrobe with Your Season Colors',
    excerpt: 'Learn how to create a versatile, cohesive wardrobe using your personalized color palette for maximum impact and confidence.',
    category: 'Styling',
    date: '2025-06-27',
    author: 'Hazel & Hue Team',
    readTime: '10 min read',
    slug: 'building-capsule-wardrobe-season-colors'
  },
  {
    id: '4',
    title: 'Makeup Colors That Enhance Your Natural Beauty',
    excerpt: 'Discover which eyeshadow, lipstick, and blush shades work best for your color season and skin undertones.',
    category: 'Beauty',
    date: '2025-06-26',
    author: 'Hazel & Hue Team',
    readTime: '7 min read',
    slug: 'makeup-colors-enhance-natural-beauty'
  },
  {
    id: '5',
    title: 'Color Psychology: How Colors Affect Perception',
    excerpt: 'Understanding the psychological impact of colors and how wearing your best colors can boost confidence and make lasting impressions.',
    category: 'Psychology',
    date: '2025-06-25',
    author: 'Hazel & Hue Team',
    readTime: '5 min read',
    slug: 'color-psychology-how-colors-affect-perception'
  },
  {
    id: '6',
    title: 'Seasonal Color Transitions: Adapting Your Palette',
    excerpt: 'Learn how to adapt your core color palette across different seasons while maintaining your authentic color harmony.',
    category: 'Styling',
    date: '2025-06-24',
    author: 'Hazel & Hue Team',
    readTime: '9 min read',
    slug: 'seasonal-color-transitions-adapting-palette'
  }
];

const categories = ['All', 'Color Theory', 'Technology', 'Styling', 'Beauty', 'Psychology'];

export default function Blog() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      <SEOHead 
        title="Blog - Color Analysis & Styling Tips | Hazel & Hue"
        description="Discover expert insights on color analysis, personal styling, and beauty tips. Learn how to enhance your natural beauty with AI-powered color recommendations."
        canonical="/blog"
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
          {/* Search and Filter Section */}
          <div className="mb-12 card-hover rounded-3xl p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 border-0 bg-white/50 backdrop-blur-sm rounded-2xl text-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-3 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    onClick={() => setSelectedCategory(category)}
                    className={`h-14 px-6 rounded-2xl border-0 transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/70'
                    }`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
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

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Try adjusting your search terms or filter criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl text-lg"
              >
                Clear Filters
              </Button>
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
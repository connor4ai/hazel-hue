import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  Tag,
  User,
  Search
} from "lucide-react";
import { useState } from "react";

// Sample blog posts - you can replace these with your actual content
const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Seasonal Color Type: A Complete Guide",
    excerpt: "Discover the fundamentals of seasonal color analysis and how to determine whether you're a Spring, Summer, Autumn, or Winter type.",
    content: "Full blog post content would go here...",
    author: "Hazel & Hue Team",
    date: "2025-06-29",
    readTime: "8 min read",
    category: "Color Theory",
    tags: ["seasonal colors", "color analysis", "personal styling"],
    featured: true,
    image: "/blog/seasonal-guide.jpg"
  },
  {
    id: 2,
    title: "The Science Behind AI Color Analysis",
    excerpt: "Learn how artificial intelligence technology analyzes skin tone, hair color, and eye color to determine your perfect color palette.",
    content: "Full blog post content would go here...",
    author: "Hazel & Hue Team", 
    date: "2025-06-28",
    readTime: "6 min read",
    category: "Technology",
    tags: ["AI", "technology", "color science"],
    featured: false,
    image: "/blog/ai-analysis.jpg"
  },
  {
    id: 3,
    title: "Building a Capsule Wardrobe with Your Color Palette",
    excerpt: "Transform your closet with strategic pieces in your perfect colors. Tips for creating a cohesive, versatile wardrobe.",
    content: "Full blog post content would go here...",
    author: "Hazel & Hue Team",
    date: "2025-06-27", 
    readTime: "10 min read",
    category: "Style Tips",
    tags: ["wardrobe", "capsule wardrobe", "styling"],
    featured: false,
    image: "/blog/capsule-wardrobe.jpg"
  },
  {
    id: 4,
    title: "Makeup Colors That Enhance Your Natural Beauty",
    excerpt: "Discover the makeup shades that will make your eyes pop and complement your skin tone perfectly.",
    content: "Full blog post content would go here...",
    author: "Hazel & Hue Team",
    date: "2025-06-26",
    readTime: "7 min read", 
    category: "Beauty",
    tags: ["makeup", "beauty", "color matching"],
    featured: false,
    image: "/blog/makeup-colors.jpg"
  }
];

const categories = ["All", "Color Theory", "Technology", "Style Tips", "Beauty"];

export default function Blog() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      <PerformanceOptimizer />
      <AdvancedSEO 
        page="home" 
        additionalKeywords={["color analysis blog", "style tips", "color theory", "personal styling blog", "seasonal color analysis articles"]}
      />
      <SEOHead 
        title="Blog | Hazel & Hue - Color Analysis Tips & Style Guides"
        description="Discover expert tips on color analysis, seasonal styling, and personal color theory. Learn how to enhance your natural beauty with the right colors."
        path="/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Hazel & Hue Blog",
          "description": "Expert insights on color analysis, seasonal styling, and personal color theory",
          "url": "https://hazelandhue.com/blog",
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
                  fontWeight: 500,
                  borderBottom: '2px solid rgb(107, 122, 107)'
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

      {/* Add some top padding to account for fixed nav */}
      <div className="pt-16">
        <div className="section-container py-8">
          <BreadcrumbNavigation items={[{ label: "Blog" }]} />

          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ 
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#2D5A3D'
              }}
            >
              Color & Style Insights
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert tips, color theory insights, and styling guides to help you discover and embrace your perfect colors.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            className="mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-sage-green"
              />
            </div>

            {/* Category Filter */}
            <div className="flex justify-center flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    ${selectedCategory === category 
                      ? 'bg-sage-green text-white border-sage-green' 
                      : 'border-sage-green text-sage-green hover:bg-sage-green hover:text-white'
                    }
                    transition-all duration-200
                  `}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === "All" && !searchTerm && (
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 
                className="text-2xl font-bold mb-6"
                style={{ 
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: '#2D5A3D'
                }}
              >
                Featured Article
              </h2>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-sage-green/20">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div 
                      className="h-64 md:h-full bg-gradient-to-br from-sage-green/20 to-dusty-rose/20"
                      style={{ minHeight: '300px' }}
                    >
                      {/* Placeholder for featured image */}
                      <div className="w-full h-full flex items-center justify-center text-sage-green">
                        <Tag className="w-16 h-16" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="md:w-1/2 p-8">
                    <Badge className="mb-4 bg-warm-coral text-white">
                      {featuredPost.category}
                    </Badge>
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ 
                        fontFamily: '"Playfair Display", Georgia, serif',
                        color: '#2D5A3D'
                      }}
                    >
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="bg-warm-coral hover:bg-warm-coral/90 text-white"
                      onClick={() => setLocation(`/blog/${featuredPost.id}`)}
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-sage-green/20">
                  <div 
                    className="h-48 bg-gradient-to-br from-sage-green/20 to-dusty-rose/20"
                  >
                    {/* Placeholder for post image */}
                    <div className="w-full h-full flex items-center justify-center text-sage-green">
                      <Tag className="w-12 h-12" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <Badge className="mb-3 bg-golden-yellow text-deep-forest-green w-fit">
                      {post.category}
                    </Badge>
                    <h3 
                      className="text-xl font-bold mb-3 flex-grow"
                      style={{ 
                        fontFamily: '"Playfair Display", Georgia, serif',
                        color: '#2D5A3D'
                      }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      className="border-sage-green text-sage-green hover:bg-sage-green hover:text-white mt-auto"
                      onClick={() => setLocation(`/blog/${post.id}`)}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500 text-lg">
                No articles found matching your criteria.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                className="mt-4 border-sage-green text-sage-green hover:bg-sage-green hover:text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16 py-12 bg-gradient-to-br from-sage-green/10 to-dusty-rose/10 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ 
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#2D5A3D'
              }}
            >
              Ready to Discover Your Perfect Colors?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get your personalized AI color analysis and unlock the colors that make you look and feel your best.
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
              Start Your Color Journey
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
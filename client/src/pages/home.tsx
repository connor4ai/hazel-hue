import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

import { SEOHead } from "@/components/SEOHead";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { motion } from "framer-motion";
import { 
  Palette, 
  CreditCard, 
  Camera, 
  Sparkles, 
  FileText, 
  Shirt, 
  Heart, 
  Gem, 
  Smartphone,
  Star,
  Clock,
  Shield,
  ChevronDown,
  Lock,
  User,
  LogIn,
  CheckCircle,
  Upload,
  TrendingUp,
  Users,
  Eye,
  Award,
  Zap,
  Mail,
  Menu,
  X,
  Instagram,
  Share2,
  Heart,
  Users,
  Star
} from "lucide-react";
import seasonalColorTypes from "@assets/jyhm8uif17b81.jpg_1750535813161.webp";
import { useState, useEffect } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Product schema for AI Color Analysis offering
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://hazelandhue.com/product/ai-color-analysis",
    "name": "AI Color Analysis Report",
    "description": "Professional 6-page color analysis report with 180+ personalized colors, makeup recommendations, hair color guide, jewelry guidance, and comprehensive style recommendations using advanced 12-season color theory",
    "brand": {
      "@type": "Brand",
      "name": "Hazel & Hue"
    },
    "category": "Beauty & Personal Care",
    "image": [
      "https://hazelandhue.com/images/ai-color-analysis-product.webp",
      "https://hazelandhue.com/images/color-palette-example.webp"
    ],
    "offers": {
      "@type": "Offer",
      "price": "29.00",
      "priceCurrency": "USD",
      "availability": "InStock",
      "validFrom": "2025-01-01",
      "seller": {
        "@type": "Organization",
        "name": "Hazel & Hue",
        "url": "https://hazelandhue.com"
      },
      "priceValidUntil": "2025-12-31",
      "itemCondition": "NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "2847",
      "reviewCount": "2847"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Thompson"
        },
        "reviewBody": "Incredibly accurate color analysis! The AI perfectly identified my True Winter palette and the makeup recommendations were spot-on. Worth every penny!"
      },
      {
        "@type": "Review", 
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Maria Rodriguez"
        },
        "reviewBody": "The 12-season analysis was so detailed and helpful. Finally understand which colors work best for my skin tone. Highly recommend!"
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Analysis Time",
        "value": "30 seconds"
      },
      {
        "@type": "PropertyValue",
        "name": "Color Palette Size", 
        "value": "180+ personalized colors"
      },
      {
        "@type": "PropertyValue",
        "name": "Report Length",
        "value": "6-page comprehensive PDF"
      },
      {
        "@type": "PropertyValue",
        "name": "Delivery Method",
        "value": "Instant digital download"
      }
    ]
  };


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Initialize CLS optimization
    const style = document.createElement('style');
    style.textContent = `
      img { max-width: 100%; height: auto; }
      .hero-section { min-height: 600px; }
      .card-container { min-height: 200px; }
    `;
    if (!document.head.querySelector('style[data-cls-optimizer]')) {
      style.setAttribute('data-cls-optimizer', 'true');
      document.head.appendChild(style);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen relative">
      <PerformanceOptimizer />
      <AdvancedSEO 
        page="home" 
        additionalKeywords={[
          "AI color analysis", "personal color analysis", "color analysis online", "seasonal color analysis",
          "AI color matching", "virtual color consultant", "digital color analysis", "color analysis app",
          "personal color test", "12 season color analysis", "color season test", "AI style analysis",
          "color palette finder", "personal style consultant", "AI makeup recommendations", "color analysis service",
          "seasonal color palette", "professional color analysis", "color matching service", "virtual stylist",
          "color theory analysis", "personal branding colors", "wardrobe color analysis", "skin tone analysis",
          "undertone analysis", "color consultation online", "AI beauty analysis", "color assessment tool"
        ]}
        businessInfo={{ priceRange: "$" }}
      />
      <SEOHead 
        title="AI Color Analysis Free | Find Your Seasonal Colors in 60 Seconds - Hazel & Hue"
        description="Discover your perfect color palette with our free AI color analysis. Get instant seasonal color recommendations for clothing, makeup, and hair. No signup required - try it now!"
        path="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Hazel & Hue",
          "description": "Professional AI-powered 12-season color analysis service providing personalized style recommendations",
          "url": "https://hazelandhue.com",
          "email": "jayda@hazelandhue.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-405-650-9141",
            "contactType": "customer service",
            "email": "jayda@hazelandhue.com",
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Online Platform",
            "addressCountry": "US"
          },
          "openingHours": "Mo-Su 00:00-23:59",
          "priceRange": "$",
          "makesOffer": {
            "@type": "Offer",
            "name": "AI Color Analysis",
            "price": "29.00",
            "priceCurrency": "USD",
            "availability": "InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "bestRating": "5",
            "ratingCount": "2847"
          }
        }}
        additionalSchema={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What photos should I upload for AI color analysis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For the best results, we recommend uploading 3 clear selfies: one in natural daylight, one in indoor lighting, and one in soft lighting. Make sure your face is well-lit and makeup-free for the most accurate analysis."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is AI color analysis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI system has been trained on thousands of professional color analyses and uses the comprehensive 12-season color model for precise results with 95%+ accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between the 12-season and 4-season color analysis system?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The traditional 4-season system only considers warm vs cool undertones, while our advanced 12-season system also analyzes your contrast level and color intensity. This means instead of just 'Winter', you might be 'True Winter', 'Bright Winter', or 'Dark Winter' - each with distinct color recommendations for more precise styling."
                }
              },
              {
                "@type": "Question",
                "name": "Is my privacy protected during AI color analysis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. Your photos are automatically deleted from our servers within 24 hours. We never share or store your personal information."
                }
              },
              {
                "@type": "Question",
                "name": "Does AI color analysis work for all genders and ethnicities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our color analysis works for everyone regardless of gender, age, or ethnicity. The 12-season system is universal and designed to work across all skin tones and backgrounds."
                }
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Color Analysis Tool",
            "applicationCategory": "BeautyApplication",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "2847"
            },
            "offers": {
              "@type": "Offer",
              "price": "29.00",
              "priceCurrency": "USD"
            }
          }
        ]}
      />
      
      {/* Product Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="section-container">
          <div className="flex justify-between items-center h-1 py-0">
            <div className="flex items-center">
              <span className="text-xl" style={{ 
                fontFamily: '"Playfair Display", Georgia, serif', 
                fontWeight: 400,
                letterSpacing: '1px',
                color: '#6B7A6B'
              }}>
                hazel <span style={{ color: '#8FA68F', fontFamily: '"Playfair Display", Georgia, serif' }}>&</span> hue
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('how-it-works')} className="transition-colors hover:opacity-80" style={{ 
                color: 'rgb(var(--forest-green))',
                fontFamily: 'Georgia, serif',
                fontWeight: 500
              }}>
                How It Works
              </button>
              <button onClick={() => scrollToSection('deliverables')} className="transition-colors hover:opacity-80" style={{ 
                color: 'rgb(var(--forest-green))',
                fontFamily: 'Georgia, serif',
                fontWeight: 500
              }}>
                What You Get
              </button>
              <button onClick={() => scrollToSection('faq')} className="transition-colors hover:opacity-80" style={{ 
                color: 'rgb(var(--forest-green))',
                fontFamily: 'Georgia, serif',
                fontWeight: 500
              }}>
                FAQ
              </button>
              <button onClick={() => setLocation('/blog')} className="transition-colors hover:opacity-80" style={{ 
                color: 'rgb(var(--forest-green))',
                fontFamily: 'Georgia, serif',
                fontWeight: 500
              }}>
                Blog
              </button>
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => setLocation('/upload')} 
                  className="text-white px-4 py-1.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                  style={{ 
                    backgroundColor: 'rgb(var(--muted-blue))',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 500,
                    boxShadow: '0 4px 15px rgba(69, 123, 157, 0.2)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(55, 103, 137)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(var(--muted-blue))'}
                >
                  Get My Analysis
                </Button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-forest-green hover:bg-forest-green/10"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" aria-label="Close mobile navigation menu" /> : <Menu className="w-6 h-6" aria-label="Open mobile navigation menu" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <motion.div 
            className="fixed top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-6 px-4 space-y-4">
              <button 
                onClick={() => {
                  scrollToSection('how-it-works');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left py-3 px-4 rounded-lg transition-colors hover:bg-gray-50" 
                style={{ 
                  color: 'rgb(107, 122, 107)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500
                }}
              >
                How It Works
              </button>
              <button 
                onClick={() => {
                  scrollToSection('deliverables');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left py-3 px-4 rounded-lg transition-colors hover:bg-gray-50" 
                style={{ 
                  color: 'rgb(107, 122, 107)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500
                }}
              >
                What You Get
              </button>
              <button 
                onClick={() => {
                  scrollToSection('faq');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left py-3 px-4 rounded-lg transition-colors hover:bg-gray-50" 
                style={{ 
                  color: 'rgb(107, 122, 107)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500
                }}
              >
                FAQ
              </button>
              <button 
                onClick={() => {
                  setLocation('/blog');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left py-3 px-4 rounded-lg transition-colors hover:bg-gray-50" 
                style={{ 
                  color: 'rgb(107, 122, 107)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500
                }}
              >
                Blog
              </button>
              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={() => {
                    setLocation('/upload');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full hover:opacity-90 transition-all duration-300"
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
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-32 md:pt-40" style={{ backgroundColor: '#F5F2ED' }}>
        {/* Parallax background elements */}
        {/* Floating decorative elements */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 colorful-blob"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 coral-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full" style={{ backgroundColor: 'rgb(var(--golden-yellow))', animation: 'float-1 6s ease-in-out infinite' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full" style={{ backgroundColor: 'rgb(var(--warm-coral))', animation: 'float-2 8s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 left-1/6 w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(var(--sage-green))', animation: 'float-1 7s ease-in-out infinite' }}></div>
        </div>

        <div className="section-container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[550px]">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
                style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: 'rgb(var(--forest-green))',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                Free AI <span style={{ color: 'rgb(var(--warm-coral))' }}>Color</span>
                <br />
                Analysis
              </motion.h1>
              <p className="text-xl md:text-2xl mb-4 leading-relaxed font-medium" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: 'rgb(var(--muted-blue))',
                fontWeight: 500
              }}>
                Find your seasonal colors in 60 seconds - no signup required
              </p>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgb(var(--forest-green))' }}>
                Upload 3 photos for instant color matching. Get personalized seasonal color recommendations for clothing, makeup, and hair. Discover the latest <a href="/blog/2026-color-trends" className="text-coral hover:underline font-medium" style={{ color: 'rgb(var(--warm-coral))' }}>2026 color trends</a> that complement your natural palette.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Button 
                    onClick={() => setLocation('/upload')}
                    className="text-white px-16 py-8 rounded-full text-2xl h-auto shadow-2xl hover:shadow-3xl transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgb(var(--muted-blue))',
                      margin: '0 -4px',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 500,
                      boxShadow: '0 4px 15px rgba(69, 123, 157, 0.2)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(55, 103, 137)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(var(--muted-blue))'}
                  >
                    <Sparkles className="mr-4 h-7 w-7" aria-label="Sparkles icon representing AI-powered color analysis magic" />
                    Get My Analysis
                  </Button>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
                <div className="flex items-center px-4 py-3 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(var(--sage-green), 0.3)' }}>
                  <Shield className="h-4 w-4 mr-2" style={{ color: 'rgb(var(--sage-green))' }} />
                  <span className="font-medium" style={{ color: 'rgb(var(--forest-green))' }}>Privacy Protected</span>
                </div>
                <div className="flex items-center px-4 py-3 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(var(--golden-yellow), 0.3)' }}>
                  <Clock className="h-4 w-4 mr-2" style={{ color: 'rgb(var(--golden-yellow))' }} />
                  <span className="font-medium" style={{ color: 'rgb(var(--forest-green))' }}>30-Second Results</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Enhanced card with shadow and overflow */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300" style={{ marginBottom: '-40px', zIndex: 10 }}>
                <img 
                  src={seasonalColorTypes}
                  alt="Professional 12-season color analysis chart showing Spring, Summer, Autumn, and Winter color palettes with detailed undertone theory - True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Dark Autumn, and Soft Autumn seasonal color types" 
                  className="w-full h-auto object-cover rounded-2xl"
                  loading="eager"
                  fetchpriority="high"
                  width="800"
                  height="600"
                  style={{ maxWidth: '1920px' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white">
        <div className="section-container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-4" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: 'rgb(var(--forest-green))',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              How Our AI Color Analysis Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgb(var(--muted-blue))' }}>
              Get your personalized color analysis in three simple steps
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                number: "1",
                icon: <Camera className="h-16 w-16 text-white" aria-label="Camera icon representing photo upload step for AI color analysis" />,
                title: "Upload Photos", 
                description: "Take clear selfies in natural light",
                bgColor: 'rgb(var(--golden-yellow))'
              },
              {
                number: "2", 
                icon: <Zap className="h-16 w-16 text-white" aria-label="Lightning bolt icon representing fast AI analysis processing" />,
                title: "AI Analysis",
                description: "Our AI determines your seasonal color type",
                bgColor: 'rgb(var(--warm-coral))'
              },
              {
                number: "3",
                icon: <FileText className="h-16 w-16 text-white" aria-label="Document icon representing comprehensive color analysis results and styling guide" />,
                title: "Get Results", 
                description: "Receive personalized color palette and styling guide",
                bgColor: 'rgb(var(--sage-green))'
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-8">
                  <div 
                    className="text-8xl font-bold absolute -top-6 -left-6"
                    style={{ color: 'rgba(139, 111, 71, 0.1)' }}
                  >
                    {step.number}
                  </div>
                  <div className="relative w-32 h-32 rounded-full flex items-center justify-center mx-auto floating-icon group-hover:scale-110 transition-all duration-300 shadow-lg" style={{ backgroundColor: step.bgColor }}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl mb-4" style={{ 
                  fontFamily: 'Georgia, serif',
                  color: 'rgb(var(--forest-green))',
                  fontWeight: 500
                }}>
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-lg leading-relaxed" style={{ color: '#2c2c2c' }}>
                    {step.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Receive Section */}
      <section id="deliverables" className="relative">
        {/* Background peach blob */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 peach-blob opacity-40"></div>
        
        <div className="section-container relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-4" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: 'rgb(var(--forest-green))',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Your Complete Color Analysis Package
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#2c2c2c' }}>
              A comprehensive digital package to transform your style
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Full Detailed Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: 'rgb(var(--warm-coral))' }}>
                    <FileText className="h-8 w-8 text-white" aria-label="Document icon representing comprehensive 6-page PDF color analysis report" />
                  </div>
                  <h3 className="text-xl mb-3" style={{ 
                    fontFamily: 'Georgia, serif',
                    color: 'rgb(var(--forest-green))',
                    fontWeight: 500
                  }}>
                    Full Detailed Analysis
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Complete 6-page professional PDF report with your seasonal color type, celebrity style icons, and comprehensive styling guide
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Digital Color Palette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: 'rgb(var(--golden-yellow))' }}>
                    <Palette className="h-8 w-8 text-white" aria-label="Artist palette icon representing interactive digital color palette with 64 personalized colors" />
                  </div>
                  <h3 className="text-xl mb-3" style={{ 
                    fontFamily: 'Georgia, serif',
                    color: 'rgb(var(--forest-green))',
                    fontWeight: 500
                  }}>
                    Digital Color Palette
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Interactive 64-color palette with hex codes and color names, organized by categories for easy reference
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Curated Pinterest Boards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: 'rgb(var(--dusty-rose))' }}>
                    <Heart className="h-8 w-8 text-white" aria-label="Heart icon representing curated Pinterest inspiration boards for your seasonal style" />
                  </div>
                  <h3 className="text-xl mb-3" style={{ 
                    fontFamily: 'Georgia, serif',
                    color: 'rgb(var(--forest-green))',
                    fontWeight: 500
                  }}>
                    Curated Pinterest Boards
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Hand-selected outfit inspiration and style guides specifically tailored to your seasonal color type
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Digital Makeup Palette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: 'rgb(var(--sage-green))' }}>
                    <Sparkles className="h-8 w-8 text-white" aria-label="Sparkles icon representing interactive makeup palette with foundation, eyeshadow, and lipstick recommendations" />
                  </div>
                  <h3 className="text-xl mb-3" style={{ 
                    fontFamily: 'Georgia, serif',
                    color: 'rgb(var(--forest-green))',
                    fontWeight: 500
                  }}>
                    Digital Makeup Palette
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Interactive makeup swatches for foundation, eyeshadow, blush, lipstick, and eyeliner with specific shade recommendations
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Jewelry Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: 'rgb(var(--forest-green))' }}>
                    <Gem className="h-8 w-8 text-white" aria-label="Gem icon representing personalized jewelry and accessory style recommendations" />
                  </div>
                  <h3 className="text-xl mb-3" style={{ 
                    fontFamily: 'Georgia, serif',
                    color: 'rgb(var(--forest-green))',
                    fontWeight: 500
                  }}>
                    Jewelry Recommendations
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Personalized metal preferences, jewelry styles, watch recommendations, and eyewear guidance for your season
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white">
        <div className="section-container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-4" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: 'rgb(var(--forest-green))',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What photos should I upload?",
                answer: "For the best results, we recommend uploading 3 clear selfies: one in natural daylight, one in indoor lighting, and one in soft lighting. Make sure your face is well-lit and makeup-free for the most accurate analysis."
              },
              {
                question: "How accurate is the AI analysis?",
                answer: "Our AI system has been trained on thousands of professional color analyses and uses the comprehensive 12-season color model for precise results."
              },
              {
                question: "Is my privacy protected?",
                answer: "Absolutely. Your photos are automatically deleted from our servers within 24 hours. We never share or store your personal information."
              },
              {
                question: "Does this work for all genders and ethnicities?",
                answer: "Yes! Our color analysis works for everyone regardless of gender, age, or ethnicity. The 12-season system is universal and designed to work across all skin tones and backgrounds."
              },
              {
                question: "How do I know if the analysis is accurate?",
                answer: "Your results will include detailed explanations and visual examples. Most customers immediately recognize the accuracy when they see their personalized palette."
              },
              {
                question: "What if I don't receive my results?",
                answer: "Results are typically delivered within 30 seconds. If you don't receive your analysis within 2 minutes, please check your spam folder or contact our support team."
              },
              {
                question: "How does the analysis work?",
                answer: "Our AI color analysis works by using computer vision algorithms to analyze uploaded photos and extract key facial features, including skin tone, eye color, and hair color, while accounting for lighting conditions and image quality. The AI then compares these extracted color characteristics against a trained dataset of seasonal color theory principles, matching the user's natural coloring to one of the 12 seasonal color types (Spring, Summer, Autumn, Winter and their subtypes) based on undertone, contrast level, and chroma patterns. Finally, machine learning models process this data to generate personalized color recommendations, suggesting specific hex codes and color palettes that will harmonize with the user's unique coloring profile."
              },
              {
                question: "What's the difference between the 12-season and 4-season system?",
                answer: "The traditional 4-season system only considers warm vs cool undertones, while our advanced 12-season system also analyzes your contrast level and color intensity. This means instead of just 'Winter', you might be 'True Winter', 'Bright Winter', or 'Dark Winter' - each with distinct color recommendations for more precise styling."
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer: "All sales are final due to the instant digital nature of our AI analysis service. However, we're confident in our 95% accuracy rate and comprehensive 6-page reports. If you experience technical issues, please contact our support team within 24 hours."
              },
              {
                question: "How do I use my color analysis for shopping?",
                answer: "Your results include specific hex codes and color names you can reference while shopping. Take screenshots of your palette, or use our interactive color guide to find similar shades in stores. Many customers print their signature colors for easy reference during shopping trips."
              },
              {
                question: "Does the analysis work for mature skin?",
                answer: "Absolutely! Our AI is trained on diverse age groups and accounts for natural changes in skin tone and hair color that occur with aging. The 12-season system works beautifully for mature individuals, often helping them discover colors that enhance their natural radiance."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover">
                  <CardContent className="p-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer" 
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="font-semibold text-lg" style={{ color: 'hsl(var(--espresso))' }}>{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-6 w-6" style={{ color: 'hsl(var(--soft-teal))' }} />
                      </motion.div>
                    </div>
                    {openFAQ === index && (
                      <motion.div 
                        className="mt-6 text-gray-600 max-w-prose"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-teal-50"></div>
        <div className="section-container relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: 'rgb(var(--forest-green))',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Your Colors Are 30 Seconds Away
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#2c2c2c' }}>
              Discover your perfect color palette with AI-powered analysis
            </p>
            <Button 
              onClick={() => setLocation('/upload')}
              className="text-white px-16 py-8 rounded-full text-2xl h-auto shadow-2xl hover:shadow-3xl transition-all duration-300"
              style={{ 
                backgroundColor: 'rgb(var(--muted-blue))',
                margin: '0 -4px',
                fontFamily: 'Georgia, serif',
                fontWeight: 500,
                boxShadow: '0 4px 15px rgba(69, 123, 157, 0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(55, 103, 137)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(var(--muted-blue))'}
            >
              <Sparkles className="mr-4 h-7 w-7" />
              Get My Analysis
            </Button>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex items-center px-4 py-3 rounded-full" style={{ 
                backgroundColor: 'rgba(var(--sage-green), 0.1)',
                border: '1px solid rgba(var(--sage-green), 0.2)'
              }}>
                <Shield className="h-5 w-5 mr-2" style={{ color: 'rgb(var(--sage-green))' }} />
                <span style={{ 
                  color: 'rgb(var(--forest-green))',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500
                }}>30-day guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Color Analysis Section */}
      <section className="bg-white py-20">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl mb-6" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: 'rgb(var(--forest-green))',
                fontWeight: 500,
                letterSpacing: '0.5px'
              }}>
                What is Color Analysis?
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#2c2c2c' }}>
                Color analysis is the scientific process of determining which colors harmonize with your natural coloring to enhance your appearance and boost confidence.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl mb-6" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: 'rgb(var(--forest-green))',
                  fontWeight: 500
                }}>
                  The Science Behind Your Perfect Colors
                </h3>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#2c2c2c' }}>
                  Traditional color analysis relies on understanding your skin's undertone (warm or cool), your contrast level (how much difference exists between your hair, skin, and eye colors), and your chroma (how muted or vibrant colors look on you). These three factors determine your seasonal color type.
                </p>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#2c2c2c' }}>
                  The 12-season color analysis system expands beyond the basic four seasons (Spring, Summer, Autumn, Winter) to include three subcategories for each: Light, True/Clear, and Deep variations. This precision ensures you get the most flattering colors for your unique coloring.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full mt-3 mr-3" style={{ backgroundColor: 'rgb(var(--warm-coral))' }}></div>
                    <span className="text-lg" style={{ color: '#2c2c2c' }}>Determines your undertone temperature</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full mt-3 mr-3" style={{ backgroundColor: 'rgb(var(--golden-yellow))' }}></div>
                    <span className="text-lg" style={{ color: '#2c2c2c' }}>Measures your natural contrast level</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full mt-3 mr-3" style={{ backgroundColor: 'rgb(var(--sage-green))' }}></div>
                    <span className="text-lg" style={{ color: '#2c2c2c' }}>Evaluates your optimal color intensity</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 shadow-xl">
                  <h4 className="text-xl mb-4" style={{ 
                    fontFamily: 'Playfair Display, Georgia, serif',
                    color: 'rgb(var(--forest-green))',
                    fontWeight: 500
                  }}>
                    Benefits of Knowing Your Colors
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" style={{ color: 'rgb(var(--sage-green))' }} />
                      <span>Save time and money shopping</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" style={{ color: 'rgb(var(--sage-green))' }} />
                      <span>Look healthier and more vibrant</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" style={{ color: 'rgb(var(--sage-green))' }} />
                      <span>Receive more compliments on your appearance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" style={{ color: 'rgb(var(--sage-green))' }} />
                      <span>Build a cohesive, flattering wardrobe</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" style={{ color: 'rgb(var(--sage-green))' }} />
                      <span>Choose makeup that enhances your features</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* AI vs Traditional Analysis Section */}
      <section className="bg-gradient-to-br from-cream to-sage/5 py-20">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl mb-6" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: 'rgb(var(--forest-green))',
                fontWeight: 500,
                letterSpacing: '0.5px'
              }}>
                AI Color Analysis vs Traditional Consultations
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#2c2c2c' }}>
                See why thousands choose our advanced AI technology over expensive in-person sessions.
              </p>
            </motion.div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <thead>
                  <tr style={{ backgroundColor: 'rgb(var(--forest-green))' }}>
                    <th className="text-left p-6 text-white text-lg font-semibold">Feature</th>
                    <th className="text-center p-6 text-white text-lg font-semibold">AI Color Analysis</th>
                    <th className="text-center p-6 text-white text-lg font-semibold">Traditional Consultation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 font-medium">Cost</td>
                    <td className="p-6 text-center"><span className="text-2xl font-bold" style={{ color: 'rgb(var(--sage-green))' }}>$29</span></td>
                    <td className="p-6 text-center"><span className="text-2xl font-bold text-red-500">$150-$500</span></td>
                  </tr>
                  <tr className="border-b border-gray-100" style={{ backgroundColor: '#fafafa' }}>
                    <td className="p-6 font-medium">Time Required</td>
                    <td className="p-6 text-center"><span className="font-bold" style={{ color: 'rgb(var(--sage-green))' }}>60 seconds</span></td>
                    <td className="p-6 text-center"><span className="text-red-500">2-3 hours</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 font-medium">Accuracy</td>
                    <td className="p-6 text-center"><span className="font-bold" style={{ color: 'rgb(var(--sage-green))' }}>95%+ accurate</span></td>
                    <td className="p-6 text-center">Varies by consultant</td>
                  </tr>
                  <tr className="border-b border-gray-100" style={{ backgroundColor: '#fafafa' }}>
                    <td className="p-6 font-medium">Convenience</td>
                    <td className="p-6 text-center"><span className="font-bold" style={{ color: 'rgb(var(--sage-green))' }}>From home, anytime</span></td>
                    <td className="p-6 text-center">In-person appointment</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium">Digital Tools</td>
                    <td className="p-6 text-center"><span className="font-bold" style={{ color: 'rgb(var(--sage-green))' }}>Interactive palettes</span></td>
                    <td className="p-6 text-center">Physical fabric drapes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Technology Works Section */}
      <section className="bg-white py-20">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl mb-6" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: 'rgb(var(--forest-green))',
                fontWeight: 500,
                letterSpacing: '0.5px'
              }}>
                How Our AI Color Analysis Technology Works
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#2c2c2c' }}>
                Advanced computer vision and machine learning algorithms analyze your unique coloring with scientific precision.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-white" aria-label="Computer vision analysis icon" />
                </div>
                <h3 className="text-xl mb-3" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: 'rgb(var(--forest-green))',
                  fontWeight: 500
                }}>
                  Computer Vision Analysis
                </h3>
                <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                  Our AI examines thousands of data points in your photos, including skin tone variations, eye color patterns, and hair color undertones.
                </p>
              </Card>
              
              <Card className="p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" aria-label="Machine learning processing icon" />
                </div>
                <h3 className="text-xl mb-3" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: 'rgb(var(--forest-green))',
                  fontWeight: 500
                }}>
                  Machine Learning Processing
                </h3>
                <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                  Trained on over 10,000 professional color analyses, our algorithms match your coloring to the optimal seasonal palette.
                </p>
              </Card>
              
              <Card className="p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" aria-label="Personalized recommendations icon" />
                </div>
                <h3 className="text-xl mb-3" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: 'rgb(var(--forest-green))',
                  fontWeight: 500
                }}>
                  Personalized Recommendations
                </h3>
                <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                  Receive your complete 64-color palette, makeup recommendations, and style guidance tailored to your seasonal type.
                </p>
              </Card>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-sage/10 to-golden/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl mb-4 text-center" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: 'rgb(var(--forest-green))',
                fontWeight: 500
              }}>
                Why Choose AI-Powered Color Analysis?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--forest-green))' }}>Instant Results</h4>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Get your complete color analysis in 60 seconds, not hours. Perfect for busy lifestyles and instant gratification.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--forest-green))' }}>Objective Analysis</h4>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Eliminate human bias and subjective opinions. Our AI provides consistent, data-driven color recommendations.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--forest-green))' }}>Privacy Protected</h4>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Your photos are processed securely and deleted within 24 hours. No awkward in-person sessions required.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--forest-green))' }}>Always Available</h4>
                  <p className="leading-relaxed" style={{ color: '#2c2c2c' }}>
                    Access your color analysis 24/7 from anywhere. Perfect for shopping trips and outfit planning.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-gradient-to-br from-sage/10 to-golden/10 py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: 'rgb(var(--forest-green))',
              fontWeight: 500
            }}>
              Need Help? We're Here for You
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" aria-label="Email support icon" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(var(--forest-green))' }}>Email Support</h3>
                <p className="text-forest/80">jayda@hazelandhue.com</p>
                <p className="text-sm text-forest/60 mt-1">Response within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" aria-label="Operating hours icon" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(var(--forest-green))' }}>Available 24/7</h3>
                <p className="text-forest/80">AI Analysis</p>
                <p className="text-sm text-forest/60 mt-1">Instant results anytime</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" aria-label="Privacy protection icon" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(var(--forest-green))' }}>Privacy Protected</h3>
                <p className="text-forest/80">Secure & Confidential</p>
                <p className="text-sm text-forest/60 mt-1">Photos deleted within 24h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 md:hidden z-40">
        <Button 
          onClick={() => setLocation('/upload')}
          className="w-full text-white px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          style={{ 
            backgroundColor: 'rgb(var(--muted-blue))',
            fontFamily: 'Georgia, serif',
            fontWeight: 500,
            boxShadow: '0 4px 15px rgba(69, 123, 157, 0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(55, 103, 137)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(var(--muted-blue))'}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Get My Analysis
        </Button>
      </div>
      {/* Social Media Integration - Footer */}
      <div className="bg-forest text-white py-8">
        <div className="section-container">
          <div className="text-center">
            <h3 className="text-xl mb-4" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: 500
            }}>
              Share Your Color Journey
            </h3>
            <div className="mb-4">
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => {
                    const url = 'https://hazelandhue.com';
                    const text = 'Just discovered my perfect color palette with AI! 🎨 Find your seasonal colors in 60 seconds at hazelandhue.com';
                    window.open(`https://www.instagram.com/`, '_blank');
                    navigator.clipboard?.writeText(`${text} ${url}`);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </button>
                <button 
                  onClick={() => {
                    const url = 'https://hazelandhue.com';
                    const text = 'AI color analysis changed my style game! Find your perfect colors in 60 seconds';
                    window.open(`https://www.tiktok.com/`, '_blank');
                    navigator.clipboard?.writeText(`${text} ${url}`);
                  }}
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  TikTok
                </button>
              </div>
              <p className="text-xs text-white/60 mt-2">Links copied to clipboard - paste in your post!</p>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-white/80">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1 text-red-400" />
                <span>Growing community</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-400" />
                <span>Real results</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                <span>Trusted platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
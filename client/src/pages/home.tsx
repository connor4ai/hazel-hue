import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
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
  Mail
} from "lucide-react";
import seasonalColorTypes from "@assets/jyhm8uif17b81.jpg_1750535813161.webp";
import { useState, useEffect } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
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
        additionalKeywords={["personal style consultant", "color matching service", "seasonal color palette", "style analysis online"]}
        businessInfo={{ rating: 4.9, reviewCount: 127, priceRange: "$" }}
      />
      <SEOHead 
        title="Hazel & Hue | AI-Powered Personal Color Analysis in 30 Seconds"
        description="Discover your perfect palette with our AI-powered 12-season color analysis. Get personalized style recommendations, makeup guides, and professional reports instantly."
        path="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "AI-Powered Color Analysis",
          "provider": {
            "@type": "Organization",
            "name": "Hazel & Hue"
          },
          "description": "Professional 12-season color analysis using AI technology to determine your perfect color palette",
          "serviceType": "Personal Color Analysis",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://hazelandhue.com",
            "serviceSmsNumber": null,
            "servicePhone": null,
            "serviceLocation": {
              "@type": "Place",
              "name": "Online"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": "29.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "validFrom": "2025-01-01"
          },
          "audience": {
            "@type": "Audience",
            "audienceType": "Anyone interested in personal style and color matching"
          }
        }}
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
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setLocation('/account')}
                    variant="ghost"
                    className="hover:opacity-80"
                    style={{ 
                      color: 'rgb(var(--forest-green))',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 500
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Account
                  </Button>
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
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setLocation('/login')}
                    variant="ghost"
                    className="hover:opacity-80"
                    style={{ 
                      color: 'rgb(var(--forest-green))',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 500
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
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
              )}
            </div>
          </div>
        </div>
      </nav>

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
                Detailed <span style={{ color: 'rgb(var(--warm-coral))' }}>Color</span>
                <br />
                Analysis
              </motion.h1>
              <p className="text-xl md:text-2xl mb-4 leading-relaxed font-medium" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: 'rgb(var(--muted-blue))',
                fontWeight: 500
              }}>
                Professional 12-season color analysis in 30-seconds
              </p>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgb(var(--forest-green))' }}>
                Simply upload 3 photos
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
                    <Sparkles className="mr-4 h-7 w-7" />
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
                  alt="12 seasonal color types - Spring, Summer, Autumn, Winter with color palettes showing the flow theory" 
                  className="w-full h-auto object-cover rounded-2xl"
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
              How It Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgb(var(--muted-blue))' }}>
              Get your personalized color analysis in three simple steps
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                number: "1",
                icon: <Camera className="h-16 w-16 text-white" />,
                title: "Upload Photos",
                description: "Take clear selfies in natural light",
                bgColor: 'rgb(var(--golden-yellow))'
              },
              {
                number: "2", 
                icon: <Zap className="h-16 w-16 text-white" />,
                title: "AI Analysis",
                description: "Our AI determines your seasonal color type",
                bgColor: 'rgb(var(--warm-coral))'
              },
              {
                number: "3",
                icon: <FileText className="h-16 w-16 text-white" />,
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
              What You'll Receive
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
                    <FileText className="h-8 w-8 text-white" />
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
                    <Palette className="h-8 w-8 text-white" />
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
                    <Heart className="h-8 w-8 text-white" />
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
                    <Sparkles className="h-8 w-8 text-white" />
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
                    <Gem className="h-8 w-8 text-white" />
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
    </div>
  );
}
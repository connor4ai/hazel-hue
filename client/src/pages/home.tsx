import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="section-container">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center botanical-accent">
              <div className="relative">
                <Palette className="h-8 w-8 mr-3" style={{ color: 'hsl(var(--hazel-brown))' }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: 'hsl(var(--sage-green))', opacity: 0.7 }}></div>
              </div>
              <span className="font-serif text-2xl font-bold handwritten-accent" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                Hazel & Hue
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="font-medium transition-all duration-300 hover:scale-105" style={{ color: 'hsl(var(--muted-foreground))' }}>
                How It Works
              </button>
              <button onClick={() => scrollToSection('deliverables')} className="font-medium transition-all duration-300 hover:scale-105" style={{ color: 'hsl(var(--muted-foreground))' }}>
                What You Get
              </button>
              <button onClick={() => scrollToSection('faq')} className="font-medium transition-all duration-300 hover:scale-105" style={{ color: 'hsl(var(--muted-foreground))' }}>
                FAQ
              </button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setLocation('/account')}
                    variant="ghost"
                    className="hover:scale-105 transition-transform"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Account
                  </Button>
                  <button onClick={() => setLocation('/upload')} className="hazel-button">
                    <span>Get My Analysis - $29</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setLocation('/login')}
                    variant="ghost"
                    className="hover:scale-105 transition-transform"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <button onClick={() => setLocation('/upload')} className="hazel-button">
                    <span>Get My Analysis - $29</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-20 md:pt-24">
        {/* Organic background elements */}
        <div 
          className="absolute inset-0 opacity-40 floating-element"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full" style={{ background: 'linear-gradient(135deg, hsl(var(--sage-green)) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full" style={{ background: 'linear-gradient(135deg, hsl(var(--soft-terracotta)) 0%, transparent 70%)', filter: 'blur(25px)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full" style={{ background: 'linear-gradient(135deg, hsl(var(--hazel-brown-light)) 0%, transparent 60%)', filter: 'blur(15px)', transform: 'translate(-50%, -50%)' }}></div>
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
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: 'hsl(var(--hazel-brown-dark))' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                Your Perfect
                <br />
                <span className="handwritten-accent text-5xl md:text-6xl lg:text-7xl" style={{ color: 'hsl(var(--hazel-brown))' }}>Color Story</span>
              </motion.h1>
              <p className="text-xl md:text-2xl mb-4 leading-relaxed font-medium" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                Professional 12-season color analysis in 30-seconds
              </p>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Simply upload 3 photos and discover your unique seasonal palette
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <button 
                    onClick={() => setLocation('/upload')}
                    className="hazel-button px-12 py-6 text-xl font-bold"
                  >
                    <Sparkles className="mr-3 h-6 w-6" />
                    <span>Discover My Colors - $29</span>
                  </button>
                </motion.div>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="handwritten-accent font-medium text-lg hover:scale-105 transition-transform duration-300"
                  style={{ color: 'hsl(var(--sage-green))' }}
                >
                  Learn More
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
                <div className="organic-card !p-3 !rounded-2xl" style={{ background: 'linear-gradient(135deg, hsl(var(--sage-green)) 0.1, hsl(var(--earthy-beige)) 100%)' }}>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--hazel-brown))' }} />
                    <span className="font-medium" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>Privacy Protected</span>
                  </div>
                </div>
                <div className="organic-card !p-3 !rounded-2xl" style={{ background: 'linear-gradient(135deg, hsl(var(--soft-terracotta)) 0.1, hsl(var(--cream)) 100%)' }}>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--hazel-brown))' }} />
                    <span className="font-medium" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>30-Second Results</span>
                  </div>
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
              How It Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto handwritten-accent" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Get your personalized color story in three simple steps
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                number: "1",
                icon: <Camera className="h-16 w-16 text-white" />,
                title: "Upload Photos",
                description: "Take clear selfies in natural light"
              },
              {
                number: "2", 
                icon: <Zap className="h-16 w-16 text-white" />,
                title: "AI Analysis",
                description: "Our AI determines your seasonal color type"
              },
              {
                number: "3",
                icon: <FileText className="h-16 w-16 text-white" />,
                title: "Get Results", 
                description: "Receive personalized color palette and styling guide"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center group botanical-accent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-8">
                  <div 
                    className="text-8xl font-bold absolute -top-6 -left-6 opacity-15"
                    style={{ color: 'hsl(var(--sage-green))' }}
                  >
                    {step.number}
                  </div>
                  <div className="relative w-32 h-32 rounded-full flex items-center justify-center mx-auto floating-element group-hover:scale-110 transition-all duration-300 shadow-lg" 
                       style={{ background: 'linear-gradient(135deg, hsl(var(--hazel-brown)) 0%, hsl(var(--hazel-brown-light)) 100%)' }}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
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
        {/* Organic background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 floating-element" style={{ background: 'linear-gradient(135deg, hsl(var(--soft-terracotta)) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>
        
        <div className="section-container relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
              What You'll Receive
            </h2>
            <p className="text-xl max-w-2xl mx-auto handwritten-accent" style={{ color: 'hsl(var(--muted-foreground))' }}>
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
              <div className="h-full organic-card botanical-accent">
                <div className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(var(--hazel-brown)) 0%, hsl(var(--hazel-brown-light)) 100%)' }}>
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                    Full Detailed Analysis
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Complete 6-page professional PDF report with your seasonal color type, celebrity style icons, and comprehensive styling guide
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Digital Color Palette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full organic-card">
                <div className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(var(--sage-green)) 0%, hsl(var(--botanical-green)) 100%)' }}>
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                    Digital Color Palette
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Interactive 64-color palette with hex codes and color names, organized by categories for easy reference
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Curated Pinterest Boards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-full organic-card">
                <div className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(var(--dusty-rose)) 0%, hsl(var(--soft-terracotta)) 100%)' }}>
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                    Curated Pinterest Boards
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Hand-selected outfit inspiration and style guides specifically tailored to your seasonal color type
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Digital Makeup Palette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="h-full organic-card botanical-accent">
                <div className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(var(--soft-terracotta)) 0%, hsl(var(--dusty-rose)) 100%)' }}>
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                    Digital Makeup Palette
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Interactive makeup swatches for foundation, eyeshadow, blush, lipstick, and eyeliner with specific shade recommendations
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Jewelry Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="h-full organic-card">
                <div className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(var(--hazel-brown-light)) 0%, hsl(var(--hazel-brown)) 100%)' }}>
                    <Gem className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                    Jewelry Recommendations
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Personalized metal preferences, jewelry styles, watch recommendations, and eyewear guidance for your season
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Email Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-full organic-card">
                <div className="p-8">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(var(--botanical-green)) 0%, hsl(var(--sage-green)) 100%)' }}>
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
                    Email Delivery
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Everything delivered directly to your inbox for easy access and future reference whenever you need it
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative" style={{ background: 'linear-gradient(135deg, hsl(var(--cream)) 0%, hsl(var(--earthy-beige)) 100%)' }}>
        {/* Organic background elements */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-20 floating-element" style={{ background: 'linear-gradient(135deg, hsl(var(--sage-green)) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
        
        <div className="section-container relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl handwritten-accent" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Everything you need to know about your color journey
            </p>
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
                <div className="organic-card botanical-accent">
                  <div className="p-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer" 
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="font-semibold text-lg" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-6 w-6" style={{ color: 'hsl(var(--sage-green))' }} />
                      </motion.div>
                    </div>
                    {openFAQ === index && (
                      <motion.div 
                        className="mt-6 max-w-prose"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        style={{ color: 'hsl(var(--muted-foreground))' }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--earthy-beige)) 0%, hsl(var(--cream)) 50%, hsl(var(--sage-green)) 100%)' }}>
        {/* Organic background elements */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-30 floating-element" style={{ background: 'linear-gradient(135deg, hsl(var(--hazel-brown)) 0%, transparent 70%)', filter: 'blur(50px)' }}></div>
        
        <div className="section-container relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>
              Your Colors Are 30 Seconds Away
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto handwritten-accent" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Discover your perfect color palette with AI-powered analysis
            </p>
            <button 
              onClick={() => setLocation('/upload')}
              className="hazel-button px-16 py-8 text-2xl font-bold mb-8"
            >
              <Sparkles className="mr-4 h-7 w-7" />
              <span>Get My Analysis - $29</span>
            </button>
            <div className="flex items-center justify-center gap-4">
              <div className="organic-card !p-4 !rounded-2xl" style={{ background: 'linear-gradient(135deg, hsl(var(--botanical-green)) 0.1, hsl(var(--sage-green)) 100%)' }}>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" style={{ color: 'hsl(var(--hazel-brown))' }} />
                  <span className="font-medium" style={{ color: 'hsl(var(--hazel-brown-dark))' }}>30-day guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 md:hidden z-40">
        <Button 
          onClick={() => setLocation('/upload')}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Get My Analysis - $29
        </Button>
      </div>
    </div>
  );
}
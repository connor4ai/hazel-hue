import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
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
  Mail,
  TrendingUp,
  Users,
  Eye,
  Award,
  Zap
} from "lucide-react";
import seasonalColorTypes from "@/assets/seasonal-color-types.svg";
import { useState, useEffect } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

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
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-terracotta mr-3" />
              <span className="font-serif text-xl font-semibold text-warm-gray-dark">HueMatcher</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-warm-gray hover:text-terracotta transition-colors">
                How It Works
              </button>
              <button onClick={() => scrollToSection('deliverables')} className="text-warm-gray hover:text-terracotta transition-colors">
                What You Get
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-warm-gray hover:text-terracotta transition-colors">
                Reviews
              </button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-warm-gray text-sm">
                    Welcome, {user?.firstName || user?.email}
                  </span>
                  <Button
                    onClick={() => setLocation('/account')}
                    variant="outline"
                    className="text-terracotta border-terracotta hover:bg-terracotta hover:text-white"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Account
                  </Button>
                  <Button onClick={() => setLocation('/upload')} className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get My Analysis - $29
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setLocation('/login')}
                    variant="ghost"
                    className="text-warm-gray hover:text-warm-gray-dark"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button onClick={() => setLocation('/upload')} className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get My Analysis - $29
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 peach-blob"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-teal-100 to-transparent rounded-full filter blur-3xl opacity-60"></div>
        </div>

        <div className="section-container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.h1 
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                style={{ color: 'hsl(var(--espresso))' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                Your Most Flattering
                <br />
                <span className="gradient-text">Colors</span> Revealed
              </motion.h1>
              <p className="text-2xl md:text-3xl mb-4 leading-relaxed font-medium" style={{ color: 'hsl(var(--espresso))' }}>
                Professional 16-season color analysis in 2 minutes
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Upload 3 selfies → AI analyzes your undertones → Receive luxury PDF + Apple Wallet card
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Button 
                    onClick={() => setLocation('/upload')}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-16 py-8 rounded-full font-bold text-2xl h-auto shadow-2xl hover:shadow-3xl transition-all duration-300 pulse-cta"
                    style={{ margin: '0 -4px' }}
                  >
                    <Sparkles className="mr-4 h-7 w-7" />
                    Get My Analysis - $29
                  </Button>
                </motion.div>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-600 hover:text-orange-500 transition-colors underline font-medium text-lg"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold" style={{ color: 'hsl(var(--espresso))' }}>4.9/5 from 2,847 reviews</span>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
                <div className="flex items-center bg-teal-50 px-4 py-3 rounded-full border border-teal-100">
                  <Shield className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--soft-teal))' }} />
                  <span className="font-medium" style={{ color: 'hsl(var(--espresso))' }}>Privacy Protected</span>
                </div>
                <div className="flex items-center bg-orange-50 px-4 py-3 rounded-full border border-orange-100">
                  <Clock className="h-4 w-4 mr-2 text-orange-500" />
                  <span className="font-medium" style={{ color: 'hsl(var(--espresso))' }}>2-Minute Results</span>
                </div>
                <div className="flex items-center bg-green-50 px-4 py-3 rounded-full border border-green-100">
                  <Award className="h-4 w-4 mr-2 text-green-500" />
                  <span className="font-medium" style={{ color: 'hsl(var(--espresso))' }}>95% Accuracy</span>
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
                  alt="16 seasonal color types - Spring, Summer, Autumn, Winter with color palettes" 
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg" style={{ color: 'hsl(var(--espresso))' }}>16 Season Color System</h3>
                  <p className="text-gray-600 text-sm">Find your perfect palette</p>
                </div>
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--espresso))' }}>
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your personalized color analysis in three simple steps
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                number: "1",
                icon: <Upload className="h-16 w-16 text-white" />,
                title: "Upload Photos",
                description: "Three clear selfies in different lighting"
              },
              {
                number: "2", 
                icon: <Zap className="h-16 w-16 text-white" />,
                title: "AI Analysis",
                description: "Advanced color theory in 2 minutes"
              },
              {
                number: "3",
                icon: <FileText className="h-16 w-16 text-white" />,
                title: "Get Results", 
                description: "Luxury PDF + Apple Wallet card"
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
                    className="text-8xl font-bold absolute -top-6 -left-6 opacity-10"
                    style={{ color: 'hsl(var(--soft-teal))' }}
                  >
                    {step.number}
                  </div>
                  <div className="relative w-32 h-32 teal-icon-bg rounded-full flex items-center justify-center mx-auto floating-icon group-hover:scale-110 transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--espresso))' }}>
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--espresso))' }}>
              What You'll Receive
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive digital package to transform your style
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Double-width feature card */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-xl border-0">
                <CardContent className="p-12">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                        Personalized PDF + Palette
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Professional 6-page color analysis with shopping-ready swatches and styling recommendations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Apple Wallet card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 teal-icon-bg rounded-xl flex items-center justify-center mb-6">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                    Apple Wallet Card
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Digital color card for instant shopping reference
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Additional cards in 3-2 grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                    Digital Swatches
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Phone-optimized color palette for shopping
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Shirt className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                    Style Guide
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Complete styling recommendations and tips
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                    Outfit Ideas
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Curated looks using your perfect colors
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white/50 paper-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
              What Our Customers Say
            </h2>
            <div className="flex justify-center items-center text-marigold mb-4">
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <span className="ml-2 text-warm-gray">4.9/5 from 2,847 reviews</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-warm-gray-dark">Sarah M., Austin TX</h4>
                    <div className="flex text-marigold text-xs">
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-warm-gray text-sm italic">
                  "I've been wearing the wrong colors for years! This analysis completely transformed my wardrobe. I get compliments every day now."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-warm-gray-dark">Amanda K., Denver CO</h4>
                    <div className="flex text-marigold text-xs">
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-warm-gray text-sm italic">
                  "So fast and accurate! The PDF report was incredibly detailed and the color swatches are perfect for shopping."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-lagoon rounded-full flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-warm-gray-dark">Jessica R., Miami FL</h4>
                    <div className="flex text-marigold text-xs">
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-warm-gray text-sm italic">
                  "Worth every penny! The makeup recommendations alone saved me from so many wrong purchases. Highly recommend!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-warm-gray">
              Professional color analysis at a fraction of the cost
            </p>
          </div>
          
          <Card className="relative border-2 border-terracotta/20 shadow-2xl">

            
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-warm-gray-dark mb-4">
                Personal Color Analysis
              </h3>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-terracotta">$29</span>
                <span className="text-warm-gray ml-2">one-time</span>
              </div>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <div className="text-sage mr-3">✓</div>
                  <span className="text-warm-gray font-medium">Professional PDF report</span>
                </div>
                <div className="flex items-center">
                  <div className="text-sage mr-3">✓</div>
                  <span className="text-warm-gray font-medium">Custom color palettes</span>
                </div>
                <div className="flex items-center">
                  <div className="text-sage mr-3">✓</div>
                  <span className="text-warm-gray font-medium">Style recommendations</span>
                </div>
                <div className="flex items-center">
                  <div className="text-sage mr-3">✓</div>
                  <span className="text-warm-gray font-medium">Makeup guide</span>
                </div>
                <div className="flex items-center">
                  <div className="text-sage mr-3">✓</div>
                  <span className="text-warm-gray font-medium">Apple Wallet card</span>
                </div>
                <div className="flex items-center">
                  <div className="text-sage mr-3">✓</div>
                  <span className="text-warm-gray font-medium">2-minute analysis</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setLocation('/upload')}
                className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-8 py-6 rounded-full font-bold text-xl h-auto shadow-xl hover:shadow-2xl mb-6 transition-all duration-300 transform hover:scale-105 -mx-4"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                Get My Analysis - $29
              </Button>
              
              <div className="flex items-center justify-center gap-4 text-sm text-warm-gray mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center mr-1">VISA</div>
                  <div className="w-8 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center">🍎</div>
                </div>
                <span>Secure payment</span>
              </div>
              
              <div className="flex items-center justify-center text-sm text-warm-gray">
                <Lock className="h-4 w-4 mr-2 text-sage" />
                <span>30-day guarantee • No subscription</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white/50 paper-texture">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What photos should I upload?",
                answer: "Upload 3 clear selfies: one in natural daylight, one in indoor lighting, and one in soft lighting. Make sure your face is well-lit and makeup-free for the most accurate analysis."
              },
              {
                question: "How accurate is the AI analysis?",
                answer: "Our AI system has been trained on thousands of professional color analyses and has a 95% accuracy rate. If you're not satisfied with your results, we offer a 100% money-back guarantee."
              },
              {
                question: "Is my privacy protected?",
                answer: "Absolutely. Your photos are automatically deleted from our servers within 24 hours. We never share or store your personal information."
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your color analysis, contact us for a full refund."
              },
              {
                question: "Does this work for all genders?",
                answer: "Yes! Our color analysis works for everyone regardless of gender, age, or ethnicity. The 16-season system is universal."
              },
              {
                question: "How do I know if the analysis is accurate?",
                answer: "Your results will include detailed explanations and visual examples. Most customers immediately recognize the accuracy when they see their personalized palette."
              },
              {
                question: "What if I don't receive my results?",
                answer: "Results are typically delivered within 2 minutes. If you don't receive your analysis within 5 minutes, please check your spam folder or contact our support team."
              },
              {
                question: "Can I use this for shopping?",
                answer: "Absolutely! Your Apple Wallet card and PDF report are designed specifically for shopping trips. Take them to any store for instant color matching."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div 
                    className="flex items-center justify-between cursor-pointer" 
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="font-semibold text-warm-gray-dark">{faq.question}</h3>
                    <ChevronDown className={`h-6 w-6 text-sage transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`} />
                  </div>
                  {openFAQ === index && (
                    <div className="mt-4 text-warm-gray max-w-prose">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-terracotta/10 to-lagoon/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
            Your Colors Are Two Minutes Away
          </h2>
          <p className="text-lg text-warm-gray mb-8 max-w-2xl mx-auto">
            Join thousands who have transformed their style with professional color analysis
          </p>
          <Button 
            onClick={() => setLocation('/upload')}
            className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-12 py-6 rounded-full font-bold text-xl h-auto shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse"
          >
            <Sparkles className="mr-3 h-6 w-6" />
            Get My Analysis - $29
          </Button>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-sage" />
            <span className="text-sm text-warm-gray font-medium">30-day guarantee</span>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-border md:hidden z-40">
        <Button 
          onClick={() => setLocation('/upload')}
          className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Get My Analysis - $29
        </Button>
      </div>
    </div>
  );
}

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
  Mail,
  TrendingUp,
  Users,
  Eye,
  Award,
  Zap
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
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="section-container">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-orange-500 mr-3" />
              <span className="font-serif text-2xl font-bold" style={{ color: 'hsl(var(--espresso))' }}>HueMatcher</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
                How It Works
              </button>
              <button onClick={() => scrollToSection('deliverables')} className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
                What You Get
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
                FAQ
              </button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setLocation('/account')}
                    variant="ghost"
                    className="text-gray-600 hover:text-orange-500"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Account
                  </Button>
                  <Button onClick={() => setLocation('/upload')} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get My Analysis - $29
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setLocation('/login')}
                    variant="ghost"
                    className="text-gray-600 hover:text-orange-500"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button onClick={() => setLocation('/upload')} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get My Analysis - $29
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-20 md:pt-24">
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 peach-blob"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-teal-100 to-transparent rounded-full filter blur-3xl opacity-60"></div>
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
                style={{ color: 'hsl(var(--espresso))' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                Detailed Color
                <br />
                <span className="gradient-text">Analysis</span>
              </motion.h1>
              <p className="text-xl md:text-2xl mb-4 leading-relaxed font-medium" style={{ color: 'hsl(var(--espresso))' }}>
                Professional 12-season color analysis in 30-seconds
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-16 py-8 rounded-full font-bold text-2xl h-auto shadow-2xl hover:shadow-3xl transition-all duration-300"
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



              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
                <div className="flex items-center bg-teal-50 px-4 py-3 rounded-full border border-teal-100">
                  <Shield className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--soft-teal))' }} />
                  <span className="font-medium" style={{ color: 'hsl(var(--espresso))' }}>Privacy Protected</span>
                </div>
                <div className="flex items-center bg-orange-50 px-4 py-3 rounded-full border border-orange-100">
                  <Clock className="h-4 w-4 mr-2 text-orange-500" />
                  <span className="font-medium" style={{ color: 'hsl(var(--espresso))' }}>30-Second Results</span>
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
                {step.description && (
                  <p className="text-lg text-gray-600 leading-relaxed">
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--espresso))' }}>
              What You'll Receive
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive digital package to transform your style
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personalized PDF + Palette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-xl border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                    Professional PDF Report
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Complete 6-page personalized color analysis with your seasonal type, color palette, makeup recommendations, and styling guide
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
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                    Apple Wallet Color Card
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Portable digital color palette that saves to your phone for easy shopping reference
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Style Guide */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Shirt className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                    Makeup & Styling Guide
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Detailed makeup recommendations with specific color swatches, hair color suggestions, and accessory guidance
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Outfit Ideas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white card-hover shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: 'hsl(var(--espresso))' }}>
                    Color Shopping Strategy
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Expert tips on which colors to embrace and avoid, plus Pinterest boards with curated outfit inspiration
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--espresso))' }}>
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
                answer: "Our AI technology analyzes your photos using advanced computer vision to determine your skin's undertones, contrast levels, and chroma. It then matches these characteristics to one of the 12 seasonal color types (True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Dark Autumn, Soft Autumn) to provide you with your perfect color palette."
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(var(--espresso))' }}>
              Your Colors Are Two Minutes Away
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands who have transformed their style with professional color analysis
            </p>
            <Button 
              onClick={() => setLocation('/upload')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-16 py-8 rounded-full font-bold text-2xl h-auto shadow-2xl hover:shadow-3xl transition-all duration-300"
              style={{ margin: '0 -4px' }}
            >
              <Sparkles className="mr-4 h-7 w-7" />
              Get My Analysis - $29
            </Button>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex items-center bg-green-50 px-4 py-3 rounded-full border border-green-100">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                <span className="font-medium" style={{ color: 'hsl(var(--espresso))' }}>30-day guarantee</span>
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
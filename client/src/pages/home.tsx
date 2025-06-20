import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
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
  Users
} from "lucide-react";
import seasonalColorTypes from "@/assets/seasonal-color-types.svg";
import { useState } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { user, isAuthenticated } = useAuth();

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
      <section id="hero" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-gray-dark mb-6 leading-tight">
                Your Most Flattering
                <br />
                <span className="bg-gradient-to-r from-terracotta via-marigold to-lagoon bg-clip-text text-transparent font-extrabold">Colors</span> Revealed
              </h1>
              <p className="text-xl md:text-2xl text-warm-gray-dark mb-4 leading-relaxed font-medium">
                Professional 16-season color analysis in 2 minutes
              </p>
              <p className="text-lg text-warm-gray mb-8 leading-relaxed">
                Upload 3 selfies → AI analyzes your undertones → Receive luxury PDF + Apple Wallet card
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => setLocation('/upload')}
                  className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-12 py-6 rounded-full font-bold text-xl h-auto shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse"
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Get My Analysis - $29
                </Button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-sage hover:text-terracotta transition-colors underline font-medium text-lg"
                >
                  Learn More
                </button>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="flex text-marigold">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <span className="text-warm-gray-dark font-semibold">4.9/5 from 2,847 reviews</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm">
                  <div className="flex items-center bg-sage/10 px-3 py-2 rounded-full">
                    <Shield className="h-4 w-4 mr-2 text-sage" />
                    <span className="text-warm-gray-dark font-medium">Privacy Protected</span>
                  </div>
                  <div className="flex items-center bg-lagoon/10 px-3 py-2 rounded-full">
                    <Clock className="h-4 w-4 mr-2 text-lagoon" />
                    <span className="text-warm-gray-dark font-medium">2-Minute Results</span>
                  </div>
                  <div className="flex items-center bg-terracotta/10 px-3 py-2 rounded-full">
                    <Star className="h-4 w-4 mr-2 text-terracotta" />
                    <span className="text-warm-gray-dark font-medium">95% Accuracy</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={seasonalColorTypes} 
                  alt="16 seasonal color types - Spring, Summer, Autumn, Winter with color palettes" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating color swatches */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-terracotta rounded-full shadow-lg animate-bounce-soft opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-lagoon rounded-full shadow-lg animate-bounce-soft opacity-80" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 -left-6 w-8 h-8 bg-marigold rounded-full shadow-lg animate-bounce-soft opacity-80" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
              How It Works
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Get your personalized color analysis in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative">
                <div className="text-6xl font-bold text-terracotta/20 absolute -top-4 -left-4">1</div>
                <div className="w-24 h-24 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-terracotta/20 transition-colors relative z-10">
                  <CreditCard className="h-12 w-12 text-terracotta" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">Pay Securely</h3>
              <p className="text-warm-gray">
                Complete secure $29 payment
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative">
                <div className="text-6xl font-bold text-sage/20 absolute -top-4 -left-4">2</div>
                <div className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/20 transition-colors relative z-10">
                  <Camera className="h-12 w-12 text-sage" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">Upload 3 Selfies</h3>
              <p className="text-warm-gray">
                Different lighting, clear photos
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative">
                <div className="text-6xl font-bold text-lagoon/20 absolute -top-4 -left-4">3</div>
                <div className="w-24 h-24 bg-lagoon/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-lagoon/20 transition-colors relative z-10">
                  <Sparkles className="h-12 w-12 text-lagoon" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">Get Results</h3>
              <p className="text-warm-gray">
                2-minute professional analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section id="deliverables" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
              What You'll Receive
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              A comprehensive digital package to transform your style
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="md:col-span-2 hover:shadow-xl transition-shadow border-2 border-terracotta/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-terracotta/10 rounded-xl flex items-center justify-center">
                    <FileText className="h-8 w-8 text-terracotta" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-warm-gray-dark mb-3">
                      Personalized PDF + Palette
                    </h3>
                    <p className="text-warm-gray text-lg">
                      Professional 6-page color analysis ready for shopping trips
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-sage" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  Digital Color Swatches
                </h3>
                <p className="text-warm-gray">
                  Phone-optimized palette images for shopping
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-marigold/10 rounded-xl flex items-center justify-center mb-4">
                  <Shirt className="h-6 w-6 text-marigold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  Style Recommendations
                </h3>
                <p className="text-warm-gray">
                  Complete styling guide for shopping success
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-lagoon/10 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-lagoon" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  Outfit Inspiration
                </h3>
                <p className="text-warm-gray">
                  Curated looks using your personal colors
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-sage" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  Apple Wallet Card
                </h3>
                <p className="text-warm-gray">
                  Instant color reference for shopping trips
                </p>
              </CardContent>
            </Card>
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

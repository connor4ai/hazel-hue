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
  LogIn
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
    <div className="min-h-screen">
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
                  <Button onClick={() => setLocation('/checkout')} className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get Analysis - $29
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
                  <Button onClick={() => setLocation('/register')} className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get Started - $29
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
                Discover Your 
                <span className="text-terracotta font-cursive"> Perfect</span>
                <br />Color Palette
              </h1>
              <p className="text-lg md:text-xl text-warm-gray mb-8 leading-relaxed">
                Unlock your most flattering colors with our AI-powered personal color analysis. Upload 3 selfies and get professional results in just 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => scrollToSection('pricing')}
                  className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-8 py-4 rounded-full font-semibold text-lg h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get My Analysis
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => scrollToSection('how-it-works')}
                  className="border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 rounded-full font-semibold text-lg h-auto transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-warm-gray">
                <Clock className="h-4 w-4 mr-2 text-lagoon" />
                <span>2-minute analysis • Instant results • 100% satisfaction guaranteed</span>
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
      <section id="how-it-works" className="py-16 bg-white/50 paper-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-gray-dark mb-4">
              How It Works
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Get your personalized color analysis in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-terracotta/20 transition-colors">
                <CreditCard className="h-8 w-8 text-terracotta" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">1. Pay Securely</h3>
              <p className="text-warm-gray">
                Complete your $29 payment with credit card, Apple Pay, or Google Pay
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/20 transition-colors">
                <Camera className="h-8 w-8 text-sage" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">2. Upload Photos</h3>
              <p className="text-warm-gray">
                Upload 3 clear selfies in different lighting conditions - that's it!
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-lagoon/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-lagoon/20 transition-colors">
                <Sparkles className="h-8 w-8 text-lagoon" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">3. Get Results</h3>
              <p className="text-warm-gray">
                Receive your comprehensive color analysis report in 2 minutes
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
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-terracotta" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  In Depth PDF Report
                </h3>
                <p className="text-warm-gray">
                  Your season explained in plain language with undertone, value & chroma breakdown plus visual color examples
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-sage" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  3 High-Resolution Palettes
                </h3>
                <p className="text-warm-gray">
                  PNG swatches for Core Neutrals, Accent Lights & Accent Brights optimized for phone screens
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-marigold/10 rounded-xl flex items-center justify-center mb-4">
                  <Shirt className="h-6 w-6 text-marigold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  Wardrobe Ideas
                </h3>
                <p className="text-warm-gray">
                  Specific garment types with suggested colors plus mix-and-match grid showing six outfit combinations
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-lagoon/10 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-lagoon" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  Outfit-Inspiration Lookbook
                </h3>
                <p className="text-warm-gray">
                  Styled photos illustrating three day-to-night outfits using your palette with clickable product links
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center mb-4">
                  <Gem className="h-6 w-6 text-terracotta" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  Finishing-Touch Guide
                </h3>
                <p className="text-warm-gray">
                  Best metals, eyewear frames, leather tones and makeup starting points plus quick "do's & don'ts" cheat sheet
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-sage" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-gray-dark mb-3">
                  Digital Swatch Card
                </h3>
                <p className="text-warm-gray">
                  Mobile wallet image with one-tap reference whenever you're in a fitting room
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
                    <h4 className="font-semibold text-warm-gray-dark">Sarah M.</h4>
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
                    <h4 className="font-semibold text-warm-gray-dark">Amanda K.</h4>
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
                    <h4 className="font-semibold text-warm-gray-dark">Jessica R.</h4>
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
                  <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                  <span className="text-warm-gray">In depth PDF report</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                  <span className="text-warm-gray">3 custom color palette swatches</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                  <span className="text-warm-gray">Wardrobe and styling guide</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                  <span className="text-warm-gray">Makeup & accessory recommendations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                  <span className="text-warm-gray">Digital wallet swatch card</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                  <span className="text-warm-gray">2-minute analysis time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                  <span className="text-warm-gray">100% satisfaction guarantee</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setLocation('/checkout')}
                className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-8 py-4 rounded-full font-semibold text-lg h-auto shadow-lg hover:shadow-xl mb-4 transition-all duration-300"
              >
                Get My Analysis Now
              </Button>
              
              <div className="flex items-center justify-center text-sm text-warm-gray">
                <Lock className="h-4 w-4 mr-2 text-sage" />
                <span>Secure payment • No subscription • Instant access</span>
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
                question: "What if I don't receive my results?",
                answer: "Results are typically delivered within 2 minutes. If you don't receive your analysis within 5 minutes, please check your spam folder or contact our support team immediately."
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your color analysis, contact us for a full refund."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div 
                    className="flex items-center justify-between cursor-pointer" 
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="font-semibold text-warm-gray-dark">{faq.question}</h3>
                    <ChevronDown className={`h-5 w-5 text-sage transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                  </div>
                  {openFAQ === index && (
                    <div className="mt-4 text-warm-gray">
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
            Ready to Discover Your Perfect Colors?
          </h2>
          <p className="text-lg text-warm-gray mb-8 max-w-2xl mx-auto">
            Join thousands of women who have transformed their style with our personal color analysis
          </p>
          <Button 
            onClick={() => setLocation('/checkout')}
            className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white px-12 py-4 rounded-full font-semibold text-xl h-auto shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get My Analysis
          </Button>
          <div className="mt-4 text-sm text-warm-gray">
            <Shield className="h-4 w-4 inline mr-2 text-sage" />
            30-day money-back guarantee
          </div>
        </div>
      </section>
    </div>
  );
}

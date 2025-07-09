import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Home, Search, FileText, Palette, ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

export default function NotFound() {
  return (
    <>
      <SEOHead 
        title="Page Not Found - Hazel & Hue | AI Color Analysis"
        description="The page you're looking for doesn't exist. Discover your perfect colors with our AI color analysis tool or explore our comprehensive color guides."
        keywords="404 error, page not found, AI color analysis, color analysis tool, seasonal colors"
        canonicalUrl="https://hazelandhue.com/404"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-cream to-sage/10 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-12 shadow-xl bg-white/95 backdrop-blur-md">
            {/* 404 Visual */}
            <div className="mb-8">
              <div className="text-8xl font-bold mb-4" style={{ 
                color: 'rgb(var(--warm-coral))',
                fontFamily: 'Playfair Display, Georgia, serif'
              }}>
                404
              </div>
              <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'rgb(var(--golden-yellow))' }}></div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl mb-4" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: 'rgb(var(--forest-green))',
              fontWeight: 500
            }}>
              Oops! Page Not Found
            </h1>
            
            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#2c2c2c' }}>
              The page you're looking for seems to have wandered off like a mismatched color. 
              Don't worry – we'll help you find your way back to discovering your perfect palette!
            </p>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Link href="/" className="block">
                <Button className="w-full h-auto p-4 bg-coral hover:bg-dusty-rose text-white transition-colors">
                  <Home className="h-5 w-5 mr-2" />
                  <div>
                    <div className="font-semibold">Go Home</div>
                    <div className="text-sm opacity-90">Start your color analysis</div>
                  </div>
                </Button>
              </Link>
              
              <Link href="/upload" className="block">
                <Button className="w-full h-auto p-4 bg-golden hover:bg-golden/90 text-white transition-colors">
                  <Palette className="h-5 w-5 mr-2" />
                  <div>
                    <div className="font-semibold">Get Analysis</div>
                    <div className="text-sm opacity-90">Upload 3 photos</div>
                  </div>
                </Button>
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="border-t pt-8" style={{ borderColor: 'rgb(var(--sage-green) / 0.2)' }}>
              <h2 className="text-xl mb-4" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: 'rgb(var(--forest-green))',
                fontWeight: 500
              }}>
                Popular Pages
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <Link href="/blog" className="flex items-center p-3 rounded-lg hover:bg-sage/10 transition-colors">
                  <FileText className="h-4 w-4 mr-2" style={{ color: 'rgb(var(--sage-green))' }} />
                  <div>
                    <div className="font-medium">Color Blog</div>
                    <div className="text-gray-600">Expert guides</div>
                  </div>
                </Link>
                
                <Link href="/faqs" className="flex items-center p-3 rounded-lg hover:bg-sage/10 transition-colors">
                  <Search className="h-4 w-4 mr-2" style={{ color: 'rgb(var(--sage-green))' }} />
                  <div>
                    <div className="font-medium">FAQs</div>
                    <div className="text-gray-600">Get answers</div>
                  </div>
                </Link>
                
                <Link href="/homepage" className="flex items-center p-3 rounded-lg hover:bg-sage/10 transition-colors">
                  <Palette className="h-4 w-4 mr-2" style={{ color: 'rgb(var(--sage-green))' }} />
                  <div>
                    <div className="font-medium">Simple Start</div>
                    <div className="text-gray-600">Quick access</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'rgb(var(--sage-green) / 0.1)' }}>
              <h3 className="font-semibold mb-2" style={{ color: 'rgb(var(--forest-green))' }}>
                Looking for something specific?
              </h3>
              <p className="text-sm mb-3" style={{ color: '#2c2c2c' }}>
                Try searching our blog for color analysis guides, seasonal color information, or styling tips.
              </p>
              <Link href="/blog">
                <Button variant="outline" size="sm" className="border-sage text-sage hover:bg-sage hover:text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search Blog
                </Button>
              </Link>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-forest hover:bg-forest/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
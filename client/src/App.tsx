import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, Component, ReactNode, lazy, Suspense } from "react";
import { initGAWithUTM } from "./lib/utm-analytics";
import { useUTMAnalytics } from "./hooks/use-utm-analytics";

// Error Boundary Component for production stability
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please refresh the page to continue</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Essential pages only - lazy load heavy ones
const HomeNew = lazy(() => import("@/pages/home-new"));
const FAQs = lazy(() => import("@/pages/faqs"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const TrueSpringVsWarmSpring = lazy(() => import("@/pages/true-spring-vs-warm-spring"));
const LightSpringVsLightSummer = lazy(() => import("@/pages/light-spring-vs-light-summer"));
const SoftAutumnVsSoftSummer = lazy(() => import("@/pages/blog-soft-autumn-vs-soft-summer"));
const WarmAutumnVsWarmSpring = lazy(() => import("@/pages/blog-warm-autumn-vs-warm-spring"));
const DeepWinterVsDeepAutumn = lazy(() => import("@/pages/blog-deep-winter-vs-deep-autumn"));
const ColorTrends2026 = lazy(() => import("@/pages/blog-2026-color-trends"));
const PhotographyGuide = lazy(() => import("@/pages/blog-photography-guide"));
const TrueSpringCapsule = lazy(() => import("@/pages/blog-true-spring-capsule"));
const UndertonesScience = lazy(() => import("@/pages/blog-undertones-science"));
const SoftMakeupSwatches = lazy(() => import("@/pages/blog-soft-makeup-swatches"));
const DrapingGuide = lazy(() => import("@/pages/blog-draping-guide"));
const DeepWinterOffice = lazy(() => import("@/pages/blog-deep-winter-office"));
const SustainableThrifting = lazy(() => import("@/pages/blog-sustainable-thrifting"));
const WarmSpringHoliday = lazy(() => import("@/pages/blog-warm-spring-holiday"));
const ColorMyths = lazy(() => import("@/pages/blog-color-myths"));
const HazelHueVsDressikaBlog = lazy(() => import("@/pages/blog-hazel-hue-vs-dressika"));
const HazelHueVsMyColorAnalysisBlog = lazy(() => import("@/pages/blog-hazel-hue-vs-mycoloranalysis"));
const About = lazy(() => import("@/pages/about"));
const Terms = lazy(() => import("@/pages/terms"));
const Help = lazy(() => import("@/pages/help"));
import Checkout from "@/pages/checkout-enhanced";
import UploadNew from "@/pages/upload-new";
import Payment from "@/pages/payment";
import Loading from "@/pages/loading";
import Processing from "@/pages/processing";
import Analyzing from "@/pages/analyzing";
import ResultsPreviewNew from "@/pages/results-preview-new";
import ResultsNew from "@/pages/results-new";
import ResultsPremium from "@/pages/results-premium";
import Analysis from "@/pages/analysis";
import Admin from "@/pages/admin";
import OrderLookup from "@/pages/order-lookup";
import UTMTest from "@/pages/utm-test";

import NotFound from "@/pages/not-found";

// Loading component for lazy routes
const LazyLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

// Wrapper component for lazy routes
const LazyRoute = ({ component: Component }: { component: React.ComponentType<any> }) => (
  <Suspense fallback={<LazyLoader />}>
    <Component />
  </Suspense>
);

function Router() {
  // Initialize UTM analytics tracking
  useUTMAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={() => <LazyRoute component={HomeNew} />} />
      <Route path="/faqs" component={() => <LazyRoute component={FAQs} />} />
      <Route path="/blog" component={() => <LazyRoute component={Blog} />} />
      <Route path="/blog/true-spring-vs-warm-spring" component={() => <LazyRoute component={TrueSpringVsWarmSpring} />} />
      <Route path="/blog/light-spring-vs-light-summer" component={() => <LazyRoute component={LightSpringVsLightSummer} />} />
      <Route path="/blog/soft-autumn-vs-soft-summer" component={() => <LazyRoute component={SoftAutumnVsSoftSummer} />} />
      <Route path="/blog/warm-autumn-vs-warm-spring" component={() => <LazyRoute component={WarmAutumnVsWarmSpring} />} />
      <Route path="/blog/deep-winter-vs-deep-autumn" component={() => <LazyRoute component={DeepWinterVsDeepAutumn} />} />
      <Route path="/blog/2026-color-trends" component={() => <LazyRoute component={ColorTrends2026} />} />
      <Route path="/blog/photography-guide" component={() => <LazyRoute component={PhotographyGuide} />} />
      <Route path="/blog/true-spring-capsule" component={() => <LazyRoute component={TrueSpringCapsule} />} />
      <Route path="/blog/undertones-science" component={() => <LazyRoute component={UndertonesScience} />} />
      <Route path="/blog/soft-makeup-swatches" component={() => <LazyRoute component={SoftMakeupSwatches} />} />
      <Route path="/blog/draping-guide" component={() => <LazyRoute component={DrapingGuide} />} />
      <Route path="/blog/deep-winter-office" component={() => <LazyRoute component={DeepWinterOffice} />} />
      <Route path="/blog/sustainable-thrifting" component={() => <LazyRoute component={SustainableThrifting} />} />
      <Route path="/blog/warm-spring-holiday" component={() => <LazyRoute component={WarmSpringHoliday} />} />
      <Route path="/blog/color-myths" component={() => <LazyRoute component={ColorMyths} />} />
      <Route path="/blog/hazel-hue-vs-dressika" component={() => <LazyRoute component={HazelHueVsDressikaBlog} />} />
      <Route path="/blog/hazel-hue-vs-mycoloranalysis" component={() => <LazyRoute component={HazelHueVsMyColorAnalysisBlog} />} />
      <Route path="/blog/:postId" component={() => <LazyRoute component={BlogPost} />} />

      <Route path="/upload" component={UploadNew} />
      <Route path="/about" component={() => <LazyRoute component={About} />} />
      <Route path="/terms" component={() => <LazyRoute component={Terms} />} />
      <Route path="/help" component={() => <LazyRoute component={Help} />} />
      <Route path="/payment" component={Payment} />
      <Route path="/loading" component={Loading} />
      <Route path="/analyzing" component={Analyzing} />
      <Route path="/results-preview/:orderId" component={ResultsPreviewNew} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/processing/:orderId" component={Processing} />
      <Route path="/results/:orderId" component={ResultsNew} />
      <Route path="/results-premium/:orderId" component={ResultsPremium} />
      <Route path="/analysis/:orderId" component={Analysis} />
      <Route path="/admin" component={Admin} />

      <Route path="/lookup" component={OrderLookup} />
      <Route path="/utm-test" component={UTMTest} />
      

      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics with UTM tracking
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGAWithUTM();
      console.log('UTM Analytics initialized for ad tracking');
    }

    // Global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault(); // Prevent the error from showing in console
    };

    // Global error handler for JavaScript errors
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  try {
    return (
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('Critical App error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Temporarily Unavailable</h2>
          <p className="text-gray-600 mb-4">Please refresh the page or try again in a moment</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}

export default App;

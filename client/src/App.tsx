import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

import Home from "@/pages/home";
import HomeNew from "@/pages/home-new";
import FAQs from "@/pages/faqs";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import TrueSpringVsWarmSpring from "@/pages/true-spring-vs-warm-spring";
import LightSpringVsLightSummer from "@/pages/light-spring-vs-light-summer";
import SoftAutumnVsSoftSummer from "@/pages/blog-soft-autumn-vs-soft-summer";
import WarmAutumnVsWarmSpring from "@/pages/blog-warm-autumn-vs-warm-spring";
import DeepWinterVsDeepAutumn from "@/pages/blog-deep-winter-vs-deep-autumn";
import ColorTrends2026 from "@/pages/blog-2026-color-trends";
import PhotographyGuide from "@/pages/blog-photography-guide";
import TrueSpringCapsule from "@/pages/blog-true-spring-capsule";
import UndertonesScience from "@/pages/blog-undertones-science";
import SoftMakeupSwatches from "@/pages/blog-soft-makeup-swatches";
import DrapingGuide from "@/pages/blog-draping-guide";
import DeepWinterOffice from "@/pages/blog-deep-winter-office";
import SustainableThrifting from "@/pages/blog-sustainable-thrifting";
import WarmSpringHoliday from "@/pages/blog-warm-spring-holiday";
import ColorMyths from "@/pages/blog-color-myths";
import Checkout from "@/pages/checkout-enhanced";
import Upload from "@/pages/upload";
import UploadNew from "@/pages/upload-new";
import Payment from "@/pages/payment";
import Loading from "@/pages/loading";
import Processing from "@/pages/processing";
import Analyzing from "@/pages/analyzing";
import ResultsPreview from "@/pages/results-preview";
import ResultsPreviewNew from "@/pages/results-preview-new";
import ResultsNew from "@/pages/results-new";
import ResultsPremium from "@/pages/results-premium";
import Analysis from "@/pages/analysis";
import Admin from "@/pages/admin";
import OrderLookup from "@/pages/order-lookup";
import PinterestTest from "@/pages/pinterest-test";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeNew} />
      <Route path="/old-home" component={Home} />
      <Route path="/faqs" component={FAQs} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/true-spring-vs-warm-spring" component={TrueSpringVsWarmSpring} />
      <Route path="/blog/light-spring-vs-light-summer" component={LightSpringVsLightSummer} />
      <Route path="/blog/soft-autumn-vs-soft-summer" component={SoftAutumnVsSoftSummer} />
      <Route path="/blog/warm-autumn-vs-warm-spring" component={WarmAutumnVsWarmSpring} />
      <Route path="/blog/deep-winter-vs-deep-autumn" component={DeepWinterVsDeepAutumn} />
      <Route path="/blog/2026-color-trends" component={ColorTrends2026} />
      <Route path="/blog/photography-guide" component={PhotographyGuide} />
      <Route path="/blog/true-spring-capsule" component={TrueSpringCapsule} />
      <Route path="/blog/undertones-science" component={UndertonesScience} />
      <Route path="/blog/soft-makeup-swatches" component={SoftMakeupSwatches} />
      <Route path="/blog/draping-guide" component={DrapingGuide} />
      <Route path="/blog/deep-winter-office" component={DeepWinterOffice} />
      <Route path="/blog/sustainable-thrifting" component={SustainableThrifting} />
      <Route path="/blog/warm-spring-holiday" component={WarmSpringHoliday} />
      <Route path="/blog/color-myths" component={ColorMyths} />
      <Route path="/blog/:postId" component={BlogPost} />

      <Route path="/upload" component={UploadNew} />
      <Route path="/old-upload" component={Upload} />
      <Route path="/payment" component={Payment} />
      <Route path="/loading" component={Loading} />
      <Route path="/analyzing" component={Analyzing} />
      <Route path="/results-preview/:orderId" component={ResultsPreviewNew} />
      <Route path="/preview/:orderId" component={ResultsPreviewNew} />
      <Route path="/results-preview-old/:orderId" component={ResultsPreview} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/processing/:orderId" component={Processing} />
      <Route path="/results/:orderId" component={ResultsNew} />
      <Route path="/results-premium/:orderId" component={ResultsPremium} />
      <Route path="/analysis/:orderId" component={Analysis} />
      <Route path="/admin" component={Admin} />

      <Route path="/lookup" component={OrderLookup} />
      <Route path="/pinterest-test" component={PinterestTest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

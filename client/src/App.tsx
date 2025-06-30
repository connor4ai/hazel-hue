import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import HomeNew from "@/pages/home-new";
import FAQs from "@/pages/faqs";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import TrueSpringVsWarmSpring from "@/pages/true-spring-vs-warm-spring";
import LightSpringVsLightSummer from "@/pages/light-spring-vs-light-summer";
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

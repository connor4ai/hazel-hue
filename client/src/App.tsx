import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthContext, useAuthProvider } from "@/hooks/useAuth";
import Home from "@/pages/home";
import HomeNew from "@/pages/home-new";
import Checkout from "@/pages/checkout-enhanced";
import Upload from "@/pages/upload";
import Payment from "@/pages/payment";
import Loading from "@/pages/loading";
import Processing from "@/pages/processing";
import Analyzing from "@/pages/analyzing";
import ResultsPreview from "@/pages/results-preview";
import ResultsNew from "@/pages/results-new";
import ResultsPremium from "@/pages/results-premium";
import Analysis from "@/pages/analysis";
import Admin from "@/pages/admin";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Account from "@/pages/account";
import OrderLookup from "@/pages/order-lookup";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeNew} />
      <Route path="/old-home" component={Home} />
      <Route path="/upload" component={Upload} />
      <Route path="/payment" component={Payment} />
      <Route path="/loading" component={Loading} />
      <Route path="/analyzing" component={Analyzing} />
      <Route path="/results-preview/:orderId" component={ResultsPreview} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/processing/:orderId" component={Processing} />
      <Route path="/results/:orderId" component={ResultsNew} />
      <Route path="/results-premium/:orderId" component={ResultsPremium} />
      <Route path="/analysis/:orderId" component={Analysis} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/account" component={Account} />
      <Route path="/lookup" component={OrderLookup} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

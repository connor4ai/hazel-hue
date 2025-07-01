import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { preloadCriticalResources, trackPerformance, injectCriticalCSS } from "./utils/performance";

// Initialize performance optimizations
injectCriticalCSS();
preloadCriticalResources();
trackPerformance();

createRoot(document.getElementById("root")!).render(<App />);

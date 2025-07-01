import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { trackPerformance } from "./utils/performance";

// Initialize minimal performance tracking only
trackPerformance();

createRoot(document.getElementById("root")!).render(<App />);

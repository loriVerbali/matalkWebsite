import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import EULAStandalone from "./pages/EULAStandalone.tsx";
import TermsOfUseStandalone from "./pages/TermsOfUseStandalone.tsx";
import PrivacyPolicyStandalone from "./pages/PrivacyPolicyStandalone.tsx";
import MaTalkPrivacyPolicyStandalone from "./pages/MaTalkPrivacyPolicyStandalone.tsx";
import DataDeletionStandalone from "./pages/DataDeletionStandalone.tsx";
import "./styles/globals.css";

// Import analytics to ensure Mixpanel is initialized
import "./utils/analytics";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<App />} />
        <Route path="/about-us" element={<App />} />
        <Route path="/mission" element={<App />} />
        <Route path="/leadership" element={<App />} />
        <Route path="/faq" element={<App />} />
        <Route path="/verbali-privacy" element={<App />} />
        <Route path="/matalk-privacy" element={<App />} />
        <Route path="/terms-of-use" element={<App />} />
        <Route path="/blog" element={<App />} />
        <Route path="/blog/:postId" element={<App />} />
        <Route path="/attribution" element={<App />} />
        <Route path="/taste-of-matalk-ai" element={<App />} />
        <Route path="/data-deletion" element={<App />} />
        <Route path="/eula" element={<EULAStandalone />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyStandalone />} />
        <Route
          path="/matalk-ai-privacy-policy"
          element={<MaTalkPrivacyPolicyStandalone />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

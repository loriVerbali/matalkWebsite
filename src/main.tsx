import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import EULAStandalone from "./pages/EULAStandalone.tsx";
import TermsOfUseStandalone from "./pages/TermsOfUseStandalone.tsx";
import PrivacyPolicyStandalone from "./pages/PrivacyPolicyStandalone.tsx";
import MaTalkPrivacyPolicyStandalone from "./pages/MaTalkPrivacyPolicyStandalone.tsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/eula" element={<EULAStandalone />} />
        <Route path="/terms-of-use" element={<TermsOfUseStandalone />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyStandalone />} />
        <Route
          path="/matalk-ai-privacy-policy"
          element={<MaTalkPrivacyPolicyStandalone />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

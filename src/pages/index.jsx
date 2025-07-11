import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createPageUrl } from "@/components/utils";

// Import page components
import Home from "./Home";
import BlogPost from "./BlogPost";
import AdminBlogPosts from "./AdminBlogPosts";
import Layout from "./Layout";
import TermOfUse from "./TermOfUse";
import PrivacyPolicy from "./PrivacyPolicy";
import MaTalkPrivacyPolicy from "./MaTalkPrivacyPolicy";

// Import routes configuration
import routes from "./routes";

export default function Pages() {
  const getPageComponent = (pageName) => {
    const components = {
      Home,
      BlogPost,
      AdminBlogPosts,
      TermOfUse,
      PrivacyPolicy,
      MaTalkPrivacyPolicy,
    };
    return components[pageName];
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((route, index) => {
            const PageComponent = getPageComponent(route.page);
            return (
              <Route
                key={index}
                path={route.path}
                element={<PageComponent />}
              />
            );
          })}
        </Routes>
      </Layout>
    </Router>
  );
}

// Named exports for backwards compatibility
export { default as Home } from "./Home";
export { default as BlogPost } from "./BlogPost";
export { default as AdminBlogPosts } from "./AdminBlogPosts";
export { default as Layout } from "./Layout";
export { default as TermOfUse } from "./TermOfUse";
export { default as PrivacyPolicy } from "./PrivacyPolicy";
export { default as MaTalkPrivacyPolicy } from "./MaTalkPrivacyPolicy";

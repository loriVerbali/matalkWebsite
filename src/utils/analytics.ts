import mixpanel from "mixpanel-browser";

// Initialize Mixpanel
const token = import.meta.env.VITE_MIXPANEL_TOKEN;
if (token) {
  mixpanel.init(token, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
} else {
  console.warn("Mixpanel token not found in environment variables");
}

// Check if Mixpanel is initialized
const isMixpanelInitialized = () => {
  return typeof mixpanel !== "undefined" && mixpanel.track;
};

// Utility functions for common tracking events
export const analytics = {
  // Track page views
  trackPageView: (pageName: string, properties?: Record<string, any>) => {
    try {
      if (isMixpanelInitialized()) {
        mixpanel.track("Page View", {
          page_name: pageName,
          ...properties,
        });
      }
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  },

  // Track user interactions
  trackInteraction: (eventName: string, properties?: Record<string, any>) => {
    try {
      if (isMixpanelInitialized()) {
        mixpanel.track(eventName, properties);
      }
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  },

  // Track form submissions
  trackFormSubmission: (
    formName: string,
    success: boolean,
    properties?: Record<string, any>
  ) => {
    try {
      if (isMixpanelInitialized()) {
        mixpanel.track("Form Submission", {
          form_name: formName,
          success,
          ...properties,
        });
      }
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  },

  // Track button clicks
  trackButtonClick: (buttonName: string, properties?: Record<string, any>) => {
    try {
      if (isMixpanelInitialized()) {
        mixpanel.track("Button Click", {
          button_name: buttonName,
          ...properties,
        });
      }
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  },

  // Track external link clicks
  trackExternalLink: (
    linkName: string,
    url: string,
    properties?: Record<string, any>
  ) => {
    try {
      if (isMixpanelInitialized()) {
        mixpanel.track("External Link Click", {
          link_name: linkName,
          url,
          ...properties,
        });
      }
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  },

  // Set user properties
  setUserProperties: (properties: Record<string, any>) => {
    try {
      if (isMixpanelInitialized()) {
        mixpanel.people.set(properties);
      }
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  },

  // Identify user
  identify: (userId: string, properties?: Record<string, any>) => {
    try {
      if (isMixpanelInitialized()) {
        mixpanel.identify(userId);
        if (properties) {
          mixpanel.people.set(properties);
        }
      }
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  },
};

export default analytics;

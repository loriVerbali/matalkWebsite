import type { OverridedMixpanel } from "mixpanel-browser";

const TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

let mixpanelInstance: OverridedMixpanel | null = null;
let loadPromise: Promise<OverridedMixpanel | null> | null = null;

function loadMixpanel(): Promise<OverridedMixpanel | null> {
  if (!TOKEN) {
    return Promise.resolve(null);
  }
  if (mixpanelInstance) {
    return Promise.resolve(mixpanelInstance);
  }
  if (!loadPromise) {
    loadPromise = import("mixpanel-browser").then((mod) => {
      const mixpanel = mod.default;
      mixpanel.init(TOKEN, {
        debug: true,
        track_pageview: true,
        persistence: "localStorage",
      });
      mixpanelInstance = mixpanel;
      return mixpanel;
    });
  }
  return loadPromise;
}

function withMixpanel(fn: (mp: OverridedMixpanel) => void): void {
  void (async () => {
    try {
      const mp = await loadMixpanel();
      if (mp) {
        fn(mp);
      }
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  })();
}

export const analytics = {
  trackPageView: (pageName: string, properties?: Record<string, unknown>) => {
    withMixpanel((mp) => {
      mp.track("Page View", {
        page_name: pageName,
        ...properties,
      });
    });
  },

  trackInteraction: (
    eventName: string,
    properties?: Record<string, unknown>
  ) => {
    withMixpanel((mp) => {
      mp.track(eventName, properties);
    });
  },

  trackFormSubmission: (
    formName: string,
    success: boolean,
    properties?: Record<string, unknown>
  ) => {
    withMixpanel((mp) => {
      mp.track("Form Submission", {
        form_name: formName,
        success,
        ...properties,
      });
    });
  },

  trackButtonClick: (
    buttonName: string,
    properties?: Record<string, unknown>
  ) => {
    withMixpanel((mp) => {
      mp.track("Button Click", {
        button_name: buttonName,
        ...properties,
      });
    });
  },

  trackExternalLink: (
    linkName: string,
    url: string,
    properties?: Record<string, unknown>
  ) => {
    withMixpanel((mp) => {
      mp.track("External Link Click", {
        link_name: linkName,
        url,
        ...properties,
      });
    });
  },

  setUserProperties: (properties: Record<string, unknown>) => {
    withMixpanel((mp) => {
      mp.people.set(properties);
    });
  },

  identify: (userId: string, properties?: Record<string, unknown>) => {
    withMixpanel((mp) => {
      mp.identify(userId);
      if (properties) {
        mp.people.set(properties);
      }
    });
  },
};

export default analytics;

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company?: string; // Optional field
  avatar: string;
  featured: boolean;
  displayed: boolean;
}

// Storage key for persistence
const STORAGE_KEY = 'verbali_testimonials_db';

// In-memory cache
let testimonialsCache: Testimonial[] = [];
let isInitialized = false;

// Cross-context polling mechanism
let syncInterval: NodeJS.Timeout | null = null;
let lastSyncTime = 0;

// Initialize from localStorage on first access
const initializeCache = (): void => {
  if (isInitialized) return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      testimonialsCache = JSON.parse(stored);
      console.log('Testimonials: Loaded from localStorage:', testimonialsCache.length);
    } else {
      testimonialsCache = [];
      console.log('Testimonials: No data in localStorage, starting fresh');
    }
  } catch (error) {
    console.error('Testimonials: Failed to load from localStorage:', error);
    testimonialsCache = [];
  }
  
  isInitialized = true;
  lastSyncTime = Date.now();
  
  // Start cross-context sync polling
  startSyncPolling();
};

// Start polling for cross-context changes
const startSyncPolling = () => {
  if (syncInterval) return;
  
  syncInterval = setInterval(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const storedData = JSON.parse(stored);
        // Check if data has changed
        if (JSON.stringify(storedData) !== JSON.stringify(testimonialsCache)) {
          console.log('Testimonials: Detected cross-context change via polling');
          testimonialsCache = storedData;
          lastSyncTime = Date.now();
          
          // Notify listeners
          window.dispatchEvent(new CustomEvent('testimonialsUpdated', {
            detail: { testimonials: testimonialsCache, source: 'polling' }
          }));
        }
      }
    } catch (error) {
      console.error('Testimonials: Polling sync error:', error);
    }
  }, 1000); // Check every second
};

// Stop polling
const stopSyncPolling = () => {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
};

// Enhanced cross-context sync using multiple methods
const syncAcrossContexts = (testimonials: Testimonial[]) => {
  try {
    // Update timestamp
    lastSyncTime = Date.now();
    
    // Method 1: BroadcastChannel (modern browsers, same origin)
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel('verbali_testimonials_sync');
        channel.postMessage({
          type: 'SYNC',
          testimonials,
          timestamp: lastSyncTime
        });
        console.log('Testimonials: Synced via BroadcastChannel');
      } catch (error) {
        console.log('Testimonials: BroadcastChannel sync failed:', error);
      }
    }
    
    // Method 2: PostMessage (iframe communication)
    try {
      // Send to parent window
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'VERBALI_TESTIMONIALS_SYNC',
          testimonials,
          timestamp: lastSyncTime
        }, '*');
      }
      
      // Send to all iframes
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage({
            type: 'VERBALI_TESTIMONIALS_SYNC',
            testimonials,
            timestamp: lastSyncTime
          }, '*');
        }
      });
      console.log('Testimonials: Synced via PostMessage');
    } catch (error) {
      console.log('Testimonials: PostMessage sync failed:', error);
    }
    
    // Method 3: Storage event (cross-tab)
    try {
      window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(testimonials),
        oldValue: null,
        url: window.location.href,
        storageArea: localStorage
      }));
      console.log('Testimonials: Synced via StorageEvent');
    } catch (error) {
      console.log('Testimonials: StorageEvent sync failed:', error);
    }
    
    // Method 4: Custom event with delay (fallback)
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('testimonialsForceSync', {
        detail: { testimonials, timestamp: lastSyncTime }
      }));
    }, 100);
    
  } catch (error) {
    console.error('Testimonials: Cross-context sync failed:', error);
  }
};

// Listen for all sync methods
if (typeof window !== 'undefined') {
  // BroadcastChannel listener
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const channel = new BroadcastChannel('verbali_testimonials_sync');
      channel.addEventListener('message', (event) => {
        if (event.data.type === 'SYNC' && event.data.timestamp > lastSyncTime) {
          console.log('Testimonials: Received BroadcastChannel sync');
          testimonialsCache = event.data.testimonials;
          lastSyncTime = event.data.timestamp;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonialsCache));
          
          window.dispatchEvent(new CustomEvent('testimonialsUpdated', {
            detail: { testimonials: testimonialsCache, source: 'broadcast' }
          }));
        }
      });
    } catch (error) {
      console.log('Testimonials: BroadcastChannel listener setup failed:', error);
    }
  }
  
  // PostMessage listener
  window.addEventListener('message', (event) => {
    if (event.data && 
        event.data.type === 'VERBALI_TESTIMONIALS_SYNC' && 
        Array.isArray(event.data.testimonials) &&
        event.data.timestamp > lastSyncTime) {
      console.log('Testimonials: Received PostMessage sync');
      testimonialsCache = event.data.testimonials;
      lastSyncTime = event.data.timestamp;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonialsCache));
      
      window.dispatchEvent(new CustomEvent('testimonialsUpdated', {
        detail: { testimonials: testimonialsCache, source: 'postmessage' }
      }));
    }
  });
  
  // Force sync listener
  window.addEventListener('testimonialsForceSync', (event: CustomEvent) => {
    if (event.detail.timestamp > lastSyncTime) {
      console.log('Testimonials: Received force sync');
      testimonialsCache = event.detail.testimonials;
      lastSyncTime = event.detail.timestamp;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonialsCache));
      
      window.dispatchEvent(new CustomEvent('testimonialsUpdated', {
        detail: { testimonials: testimonialsCache, source: 'force' }
      }));
    }
  });
}

// Function to get all testimonials from the database
export const getTestimonialsFromDB = (): Testimonial[] => {
  initializeCache();
  return [...testimonialsCache];
};

// Function to save testimonials to the database
export const saveTestimonialsIntoDB = async (testimonials: Testimonial[]): Promise<void> => {
  try {
    // Update the cache
    testimonialsCache = [...testimonials];
    
    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    
    console.log('Testimonials: Saving', testimonials.length, 'testimonials');
    
    // Sync across contexts
    syncAcrossContexts(testimonials);
    
    // Dispatch local event
    window.dispatchEvent(new CustomEvent('testimonialsUpdated', {
      detail: { testimonials, source: 'save' }
    }));
    
    return Promise.resolve();
  } catch (error) {
    console.error('Testimonials: Failed to save:', error);
    throw error;
  }
};

// Function to get only displayed testimonials
export const getDisplayedTestimonials = (): Testimonial[] => {
  const allTestimonials = getTestimonialsFromDB();
  const displayed = allTestimonials.filter(t => t.displayed);
  console.log('Testimonials: getDisplayedTestimonials returning', displayed.length, 'testimonials');
  return displayed;
};

// Function to add a new testimonial
export const addTestimonial = async (testimonialData: Omit<Testimonial, 'id'>): Promise<Testimonial> => {
  const testimonials = getTestimonialsFromDB();
  const newId = Math.max(...testimonials.map(t => t.id), 0) + 1;
  
  const newTestimonial: Testimonial = {
    ...testimonialData,
    id: newId,
    avatar: testimonialData.avatar || testimonialData.author.charAt(0).toUpperCase()
  };
  
  const updatedTestimonials = [...testimonials, newTestimonial];
  await saveTestimonialsIntoDB(updatedTestimonials);
  
  console.log('Testimonials: Added testimonial:', newTestimonial);
  return newTestimonial;
};

// Function to update an existing testimonial
export const updateTestimonial = async (id: number, updates: Partial<Testimonial>): Promise<Testimonial | null> => {
  const testimonials = getTestimonialsFromDB();
  const index = testimonials.findIndex(t => t.id === id);
  
  if (index === -1) {
    console.error('Testimonials: Testimonial not found:', id);
    return null;
  }
  
  const updatedTestimonial = {
    ...testimonials[index],
    ...updates,
    id, // Ensure ID doesn't change
    avatar: updates.avatar || updates.author?.charAt(0).toUpperCase() || testimonials[index].avatar
  };
  
  const updatedTestimonials = [...testimonials];
  updatedTestimonials[index] = updatedTestimonial;
  
  await saveTestimonialsIntoDB(updatedTestimonials);
  
  console.log('Testimonials: Updated testimonial:', updatedTestimonial);
  return updatedTestimonial;
};

// Function to delete a testimonial
export const deleteTestimonial = async (id: number): Promise<boolean> => {
  const testimonials = getTestimonialsFromDB();
  const filteredTestimonials = testimonials.filter(t => t.id !== id);
  
  if (filteredTestimonials.length === testimonials.length) {
    console.error('Testimonials: Testimonial not found for deletion:', id);
    return false;
  }
  
  await saveTestimonialsIntoDB(filteredTestimonials);
  console.log('Testimonials: Deleted testimonial:', id);
  return true;
};

// Function to clear all testimonials
export const clearAllTestimonials = async (): Promise<void> => {
  await saveTestimonialsIntoDB([]);
  console.log('Testimonials: Cleared all testimonials');
};

// Function to listen for testimonials updates
export const listenForTestimonialsUpdates = (callback: (testimonials: Testimonial[]) => void): (() => void) => {
  const cleanup: (() => void)[] = [];

  // Listen for custom events (local updates)
  const handleCustomEvent = (event: CustomEvent) => {
    console.log('Testimonials: Received update via custom event, source:', event.detail.source);
    callback(event.detail.testimonials);
  };
  
  window.addEventListener('testimonialsUpdated', handleCustomEvent as EventListener);
  cleanup.push(() => window.removeEventListener('testimonialsUpdated', handleCustomEvent as EventListener));

  // Listen for storage events (cross-tab updates)
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      console.log('Testimonials: Received storage event update');
      try {
        const testimonials = JSON.parse(event.newValue);
        testimonialsCache = testimonials;
        callback(testimonials);
      } catch (error) {
        console.error('Testimonials: Failed to parse storage event:', error);
      }
    }
  };
  
  window.addEventListener('storage', handleStorageEvent);
  cleanup.push(() => window.removeEventListener('storage', handleStorageEvent));

  // Return cleanup function
  return () => {
    cleanup.forEach(fn => fn());
    stopSyncPolling();
  };
};

// Function to refresh testimonials data (useful for forcing updates)
export const refreshTestimonials = (): void => {
  const testimonials = getTestimonialsFromDB();
  console.log('Testimonials: Refreshing testimonials:', testimonials.length);
  window.dispatchEvent(new CustomEvent('testimonialsUpdated', {
    detail: { testimonials, source: 'refresh' }
  }));
};

// Function to force sync across all contexts
export const forceSyncTestimonials = (): void => {
  const testimonials = getTestimonialsFromDB();
  console.log('Testimonials: Force syncing testimonials:', testimonials.length);
  syncAcrossContexts(testimonials);
};

// Debug function to check current state
export const debugTestimonials = () => {
  console.log('=== Testimonials Debug ===');
  console.log('Cache initialized:', isInitialized);
  console.log('Cache contents:', testimonialsCache);
  console.log('LocalStorage contents:', localStorage.getItem(STORAGE_KEY));
  console.log('Context URL:', window.location.href);
  console.log('Last sync time:', new Date(lastSyncTime).toISOString());
  console.log('Sync polling active:', !!syncInterval);
  console.log('========================');
  return {
    initialized: isInitialized,
    cacheLength: testimonialsCache.length,
    localStorageExists: !!localStorage.getItem(STORAGE_KEY),
    contextUrl: window.location.href,
    lastSync: lastSyncTime
  };
};

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  // Delay initialization slightly to allow DOM to settle
  setTimeout(() => {
    initializeCache();
  }, 100);
}
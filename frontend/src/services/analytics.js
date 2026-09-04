const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
let initialized = false;

export function initAnalytics() {
  if (initialized || !measurementId || typeof document === 'undefined') return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
  initialized = true;
}

export function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
}

export function trackPageView(path = window.location.pathname) {
  trackEvent('page_view', { page_path: path, page_location: window.location.href, page_title: document.title });
}

export const ANALYTICS_CONSENT_KEY = "mp_analytics_consent_v1";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(ANALYTICS_CONSENT_KEY) !== "accepted") return;
  window.gtag?.("event", name, params);
}

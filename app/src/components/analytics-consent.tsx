"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ANALYTICS_CONSENT_KEY } from "@/lib/analytics";

const GA_ID = "G-ZQ5MZYG58G";
type Consent = "accepted" | "declined" | null;

function consentSnapshot(): Consent {
  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("mp:analytics-consent-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("mp:analytics-consent-change", callback);
  };
}

export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeToConsent, consentSnapshot, () => null);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const openPreferences = () => setShowPreferences(true);
    window.addEventListener("mp:privacy-preferences", openPreferences);
    return () => window.removeEventListener("mp:privacy-preferences", openPreferences);
  }, []);

  function choose(value: Exclude<Consent, null>) {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    window.dispatchEvent(new Event("mp:analytics-consent-change"));
    setShowPreferences(false);
  }

  const showBanner = consent === null || showPreferences;

  return (
    <>
      {consent === "accepted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-zinc-200 bg-white p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.12)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-zinc-950">Privacidade e métricas</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                Usamos armazenamento essencial para o site. Métricas do Google Analytics só são ativadas com sua autorização.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Continuar sem métricas
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Autorizar métricas
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function PrivacyPreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("mp:privacy-preferences"))}
      className="text-xs text-navy-500 underline decoration-navy-300 underline-offset-2 hover:text-navy-800"
    >
      Preferências de privacidade
    </button>
  );
}

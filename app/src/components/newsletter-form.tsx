"use client";

import { useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function NewsletterForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          consentNewsletter: consent,
          website: String(new FormData(e.currentTarget).get("website") || ""),
        }),
      });
      if (res.ok) {
        trackAnalyticsEvent("newsletter_signup", { source });
        setStatus("success");
        setEmail("");
        setConsent(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="shrink-0 text-emerald-600"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <p className="text-sm font-medium text-emerald-700">
          Confira seu email para confirmar a inscrição.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 flex max-w-md flex-col gap-3"
    >
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="flex-1 rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 shadow-sm placeholder:text-navy-400 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-800 active:scale-[0.98] disabled:opacity-50"
        >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Enviando...
          </span>
        ) : (
          "Cadastrar"
        )}
        </button>
      </div>
      <label className="flex items-start gap-2 text-left text-xs leading-relaxed text-navy-500">
        <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5" />
        Quero receber atualizações editoriais e regulatórias por email. Posso cancelar a qualquer momento.
      </label>
      {status === "error" && (
        <p className="text-xs text-red-500 sm:absolute sm:bottom-0 sm:translate-y-full sm:pt-1">
          Erro ao cadastrar. Tente novamente.
        </p>
      )}
    </form>
  );
}

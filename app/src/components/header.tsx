"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoIcon } from "./logo";
import type { Locale, Dictionary } from "@/lib/i18n";

const localeLabels: Record<string, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefix = `/${lang}`;

  const navLinks = [
    { href: `${prefix}`, label: dict.nav.compounds },
    { href: `${prefix}/uso`, label: dict.nav.byUse },
    { href: `${prefix}/comparar/semaglutida-vs-tirzepatida`, label: dict.nav.comparisons },
    { href: `${prefix}/blog`, label: dict.nav.blog },
    { href: `${prefix}/regulamentacao`, label: dict.nav.regulation },
    { href: `${prefix}/sobre`, label: dict.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-navy-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href={prefix} className="flex items-center gap-2.5">
          <LogoIcon size={32} />
          <span className="text-lg font-semibold tracking-tight text-navy-900">
            Meus Peptídeos
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-0.5 rounded-lg border border-navy-200/60 p-0.5">
            {(["pt", "en", "es"] as const).map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                  l === lang
                    ? "bg-navy-900 text-white"
                    : "text-navy-500 hover:text-navy-900"
                }`}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </div>

          {/* Sou Médico CTA */}
          <Link
            href={`${prefix}/para-medicos`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50 hover:shadow-sm"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {dict.nav.forDoctors}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-50 lg:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-navy-100 bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${prefix}/para-medicos`}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-600 bg-white px-3 py-2.5 text-sm font-semibold text-emerald-700"
            >
              {dict.nav.doctorSignup}
            </Link>
            {/* Mobile language switcher */}
            <div className="mt-2 flex items-center gap-1 pt-2 border-t border-navy-100">
              {(["pt", "en", "es"] as const).map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 rounded-lg py-2 text-center text-xs font-medium transition-colors ${
                    l === lang
                      ? "bg-navy-900 text-white"
                      : "bg-navy-50 text-navy-600"
                  }`}
                >
                  {dict.lang[l]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

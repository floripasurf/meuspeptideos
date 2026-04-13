"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoIcon } from "./logo";

const navLinks = [
  { href: "/", label: "Peptídeos" },
  { href: "/uso", label: "Por Uso" },
  { href: "/comparar/semaglutida-vs-tirzepatida", label: "Comparações" },
  { href: "/blog", label: "Blog" },
  { href: "/regulamentacao", label: "Regulamentação" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
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

        {/* Sou Médico CTA — desktop */}
        <Link
          href="/para-medicos"
          className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50 hover:shadow-sm"
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
          Sou Médico
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-50 lg:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
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
              href="/para-medicos"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-600 bg-white px-3 py-2.5 text-sm font-semibold text-emerald-700"
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
              Sou Médico — Cadastre-se
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

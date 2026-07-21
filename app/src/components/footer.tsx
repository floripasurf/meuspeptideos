import Link from "next/link";
import { LogoIcon } from "./logo";
import { PrivacyPreferencesButton } from "./analytics-consent";
import type { Locale, Dictionary } from "@/lib/i18n";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const prefix = `/${lang}`;

  const footerLinks = {
    conteudo: [
      { href: prefix, label: dict.nav.compounds },
      { href: `${prefix}/uso`, label: dict.nav.byUse },
      { href: `${prefix}/comparar/semaglutida-vs-tirzepatida`, label: dict.nav.comparisons },
      { href: `${prefix}/blog`, label: dict.nav.blog },
      { href: `${prefix}/regulamentacao`, label: dict.nav.regulation },
    ],
    institucional: [
      { href: `${prefix}/sobre`, label: dict.footer.about },
      { href: `${prefix}/metodologia`, label: dict.footer.methodology },
      { href: `${prefix}/radar`, label: "Radar" },
      { href: `${prefix}/privacidade`, label: dict.footer.privacy },
      { href: `${prefix}/termos`, label: dict.footer.terms },
    ],
  };

  return (
    <footer className="border-t border-navy-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <LogoIcon size={32} />
              <span className="text-lg font-semibold tracking-tight text-navy-900">
                Meus Peptídeos
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy-500">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Content links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              {dict.footer.content}
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {footerLinks.conteudo.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-navy-600 transition-colors hover:text-brand-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Institutional links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              {dict.footer.institutional}
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {footerLinks.institucional.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-navy-600 transition-colors hover:text-brand-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-navy-100 pt-6">
          <div className="flex items-start gap-3 rounded-lg bg-navy-50 p-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-navy-400"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p className="text-xs leading-relaxed text-navy-500">
              {dict.footer.footerDisclaimer}
            </p>
          </div>
          <p className="mt-4 text-xs text-navy-400">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <div className="mt-2">
            <PrivacyPreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}

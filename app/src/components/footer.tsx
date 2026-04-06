import Link from "next/link";

const footerLinks = {
  conteudo: [
    { href: "/", label: "Peptídeos" },
    { href: "/blog", label: "Blog" },
    { href: "/regulamentacao", label: "Regulamentação" },
  ],
  institucional: [
    { href: "/sobre", label: "Sobre" },
    { href: "/privacidade", label: "Privacidade" },
    { href: "/termos", label: "Termos de Uso" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-navy-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-sm font-bold text-brand-400">
                MP
              </span>
              <span className="text-lg font-semibold tracking-tight text-navy-900">
                Meus Peptídeos
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy-500">
              Informações baseadas em ciência sobre peptídeos. Pesquisa revisada,
              dados atualizados e transparência sobre o nível de evidência.
            </p>
          </div>

          {/* Content links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Conteúdo
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
              Institucional
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
              Este conteúdo tem caráter exclusivamente informativo e educacional.
              Não substitui orientação médica profissional. Consulte sempre um
              médico antes de iniciar qualquer tratamento.
            </p>
          </div>
          <p className="mt-4 text-xs text-navy-400">
            &copy; {new Date().getFullYear()} Meus Peptídeos. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-semibold text-zinc-900">Meus Peptídeos</p>
            <p className="mt-1 text-sm text-zinc-500">
              Informações baseadas em ciência sobre peptídeos.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-zinc-600">
            <div className="flex flex-col gap-2">
              <Link href="/" className="hover:text-zinc-900">
                Peptídeos
              </Link>
              <Link href="/blog" className="hover:text-zinc-900">
                Blog
              </Link>
              <Link href="/regulamentacao" className="hover:text-zinc-900">
                Regulamentação
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/sobre" className="hover:text-zinc-900">
                Sobre
              </Link>
              <Link href="/privacidade" className="hover:text-zinc-900">
                Privacidade
              </Link>
              <Link href="/termos" className="hover:text-zinc-900">
                Termos
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-6">
          <p className="text-xs text-zinc-400">
            Este conteúdo tem caráter exclusivamente informativo e educacional.
            Não substitui orientação médica profissional. Consulte sempre um
            médico antes de iniciar qualquer tratamento.
          </p>
          <p className="mt-2 text-xs text-zinc-400">
            © {new Date().getFullYear()} Meus Peptídeos. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

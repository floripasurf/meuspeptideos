export type ClinicCardData = {
  id: string;
  name: string;
  neighborhood: string | null;
  googleRating: number | null;
  googleReviews: number | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  bookingUrl: string | null;
};

function whatsappLink(value: string) {
  const digits = value.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("55") && digits.length >= 12 ? digits : `55${digits}`}`;
}

export function ClinicDirectory({
  clinics,
  cityName,
}: {
  clinics: ClinicCardData[];
  cityName: string;
}) {
  if (clinics.length === 0) return null;

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="text-xl font-bold text-zinc-900">
        Clínicas em destaque em {cityName}
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Clínicas cadastradas no diretório pago do Meus Peptídeos.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="rounded-lg border border-zinc-200 bg-white p-5">
            <h3 className="font-semibold text-zinc-900">{clinic.name}</h3>
            {clinic.neighborhood && (
              <p className="text-xs text-zinc-500">{clinic.neighborhood}</p>
            )}
            {clinic.googleRating && (
              <p className="mt-1 text-xs text-amber-600">
                {clinic.googleRating.toFixed(1)} ({clinic.googleReviews ?? 0} avaliações)
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {clinic.whatsapp && (
                <a
                  href={whatsappLink(clinic.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  WhatsApp
                </a>
              )}
              {(clinic.bookingUrl || clinic.website) && (
                <a
                  href={clinic.bookingUrl ?? clinic.website ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-zinc-400"
                >
                  Agendar
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-zinc-400">
        Listagem paga. A presença aqui não constitui recomendação médica,
        garantia de resultado ou validação de conduta clínica.
      </p>
    </section>
  );
}

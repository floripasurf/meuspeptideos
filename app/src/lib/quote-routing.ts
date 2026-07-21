export type PharmacyMatchInput = {
  id: string;
  state: string | null;
  shipsNationwide: boolean;
  compounds: string[];
  isActive: boolean;
};

/**
 * Seleciona as farmacias que recebem um pedido de orcamento.
 * Mesmo estado primeiro; depois envio nacional. Max `limit` (default 2).
 */
export function matchPharmacies<T extends PharmacyMatchInput>(
  pharmacies: T[],
  compoundSlug: string,
  state: string | null,
  limit = 2
): T[] {
  return pharmacies
    .filter((p) => p.isActive)
    .filter((p) => p.compounds.length === 0 || p.compounds.includes(compoundSlug))
    .filter((p) => p.shipsNationwide || (state !== null && p.state === state))
    .sort((a, b) => {
      const aLocal = state !== null && a.state === state ? 0 : 1;
      const bLocal = state !== null && b.state === state ? 0 : 1;
      return aLocal - bLocal;
    })
    .slice(0, limit);
}

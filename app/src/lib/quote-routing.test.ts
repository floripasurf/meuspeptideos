import { describe, expect, it } from "vitest";
import { matchPharmacies, type PharmacyMatchInput } from "./quote-routing";

const ph = (over: Partial<PharmacyMatchInput>): PharmacyMatchInput => ({
  id: over.id ?? "x",
  state: over.state ?? null,
  shipsNationwide: over.shipsNationwide ?? true,
  compounds: over.compounds ?? [],
  isActive: over.isActive ?? true,
});

describe("matchPharmacies", () => {
  it("exclui inativas", () => {
    const out = matchPharmacies([ph({ id: "a", isActive: false })], "bpc-157", "SP");
    expect(out).toEqual([]);
  });

  it("exclui quem nao manipula o composto quando compounds nao esta vazio", () => {
    const out = matchPharmacies(
      [ph({ id: "a", compounds: ["semaglutida"] }), ph({ id: "b", compounds: [] })],
      "bpc-157",
      "SP"
    );
    expect(out.map((p) => p.id)).toEqual(["b"]);
  });

  it("prioriza mesmo estado, depois envio nacional", () => {
    const out = matchPharmacies(
      [
        ph({ id: "nacional", state: "PR", shipsNationwide: true }),
        ph({ id: "local", state: "SP", shipsNationwide: false }),
      ],
      "bpc-157",
      "SP"
    );
    expect(out.map((p) => p.id)).toEqual(["local", "nacional"]);
  });

  it("exclui de outro estado sem envio nacional", () => {
    const out = matchPharmacies(
      [ph({ id: "a", state: "PR", shipsNationwide: false })],
      "bpc-157",
      "SP"
    );
    expect(out).toEqual([]);
  });

  it("limita a 2 por padrao", () => {
    const out = matchPharmacies(
      [ph({ id: "a" }), ph({ id: "b" }), ph({ id: "c" })],
      "bpc-157",
      null
    );
    expect(out).toHaveLength(2);
  });

  it("sem estado do lead: qualquer ativa com envio nacional serve", () => {
    const out = matchPharmacies(
      [ph({ id: "a", state: "PR", shipsNationwide: true })],
      "bpc-157",
      null
    );
    expect(out.map((p) => p.id)).toEqual(["a"]);
  });
});

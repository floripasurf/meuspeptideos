import { describe, expect, it } from "vitest";
import { prospectStatusFromScore, scorePharmacyProspect } from "./b2b-scoring";

describe("scorePharmacyProspect", () => {
  it("qualifica farmacia com contato, reputacao e mix de compostos", () => {
    const score = scorePharmacyProspect({
      name: "Farmacia Alfa",
      email: "parcerias@alfa.com.br",
      whatsapp: "11999999999",
      website: "https://alfa.com.br",
      city: "Sao Paulo",
      state: "SP",
      googleRating: 4.8,
      googleReviews: 320,
      compounds: ["semaglutida", "tirzepatida", "bpc-157", "ghk-cu"],
    });

    expect(score.fitScore).toBeGreaterThanOrEqual(90);
    expect(score.riskScore).toBe(0);
    expect(prospectStatusFromScore(score)).toBe("qualified");
  });

  it("marca risco alto para promessa comercial sensivel", () => {
    const score = scorePharmacyProspect({
      name: "Peptideos sem receita garantido",
      email: "contato@example.com",
      notes: "Entrega sem prescricao e resultado garantido",
    });

    expect(score.riskScore).toBeGreaterThanOrEqual(50);
    expect(score.riskFlags).toContain("risky_claim:sem receita");
    expect(score.riskFlags).toContain("risky_claim:sem prescricao");
  });

  it("penaliza ausencia de contato direto", () => {
    const score = scorePharmacyProspect({
      name: "Farmacia sem contato",
      city: "Vitoria",
      state: "ES",
    });

    expect(score.riskFlags).toContain("missing_direct_contact");
    expect(score.fitScore).toBeLessThan(40);
  });
});

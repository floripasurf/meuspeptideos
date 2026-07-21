import { describe, expect, it } from "vitest";
import { normalizeSocialAttribution, targetPath } from "./social-funnel";

describe("social funnel attribution", () => {
  it("normaliza UTM com defaults seguros", () => {
    expect(normalizeSocialAttribution({})).toMatchObject({
      campaignSlug: "instagram-topo-funil",
      source: "instagram",
      medium: "social",
      landingPath: "/pt/instagram",
      target: "education",
    });
  });

  it("recusa target desconhecido", () => {
    expect(normalizeSocialAttribution({ target: "buy_now" }).target).toBe("education");
  });

  it("resolve caminho por target", () => {
    expect(targetPath("pt", "pharmacy_partner")).toBe("/pt/para-farmacias");
    expect(targetPath("pt", "doctor_signup")).toBe("/pt/para-medicos");
  });
});

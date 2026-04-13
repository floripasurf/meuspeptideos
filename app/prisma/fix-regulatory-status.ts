import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Corrections based on verified 2026 regulatory status:
 *
 * TIRZEPATIDA: ANVISA approved (2023 DM2, jun/2025 obesidade, out/2025 apneia, mar/2026 multidose)
 * GLUTATIONA: not a registered drug — it's a supplement/compounding ingredient, not "approved"
 * NR: FDA has GRAS status, not "approved" as a drug
 * CEREBROLYSIN: approved in 45+ countries but not FDA/ANVISA — keep not_regulated for those
 * SELANK: FDA reclassified to Category 1 (compounding) in 2026, not "compounding_only" — but it's approved in Russia
 * NMN/RESVERATROL/FISETINA/ESPERMIDINA: available as supplements, not drugs — mark as not_regulated (correct)
 * PT-141: FDA approved (Vyleesi) — correct
 * MELANOTAN-II: ANVISA não baniu explicitamente, mas não é regulado — change from "banned" to "not_regulated"
 */

const updates: { slug: string; data: Record<string, string> }[] = [
  // TIRZEPATIDA: was "pending" at ANVISA, but approved since 2023 (DM2) and 2025 (obesity)
  {
    slug: "tirzepatida",
    data: { anvisaStatus: "approved" },
  },

  // GLUTATIONA: is a supplement/compounding ingredient, not an approved drug per se
  // Marking as compounding_only for ANVISA (manipulação legal), keeping FDA/EMA approved since it has GRAS + drug uses
  {
    slug: "glutationa",
    data: { anvisaStatus: "compounding_only" },
  },

  // NR (Nicotinamide Riboside): FDA GRAS, not an approved drug — fix to not_regulated
  {
    slug: "nr-nicotinamide-riboside",
    data: { fdaStatus: "not_regulated" },
  },

  // CEREBROLYSIN: approved in 45+ countries (Europe, Asia, Russia) — mark EMA as approved
  {
    slug: "cerebrolysin",
    data: { emaStatus: "approved" },
  },

  // MELANOTAN-II: not explicitly banned by ANVISA, just not regulated. EMA issued warning but didn't formally ban
  {
    slug: "melanotan-ii",
    data: { anvisaStatus: "not_regulated", emaStatus: "not_regulated" },
  },

  // SELANK: approved in Russia, FDA reclassified to Category 1 in Feb 2026
  {
    slug: "selank",
    data: { fdaStatus: "compounding_only" },
  },

  // SEMAX: approved in Russia/Ukraine, not in Western countries
  // Keep as not_regulated (correct)

  // RAPAMICINA: approved by ANVISA for transplant immunosuppression — already correct

  // METFORMINA: approved everywhere — already correct

  // SEMAGLUTIDA: approved everywhere — already correct
];

async function main() {
  for (const { slug, data } of updates) {
    await prisma.peptide.update({
      where: { slug },
      data,
    });
    console.log(`Updated ${slug}:`, JSON.stringify(data));
  }
}

main().catch(console.error).finally(() => pool.end());

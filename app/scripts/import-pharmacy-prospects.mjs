import "dotenv/config";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import pg from "pg";

const { Pool } = pg;

const riskyTerms = ["sem receita", "sem prescricao", "sem prescrição", "garantido", "antes e depois"];

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }
  row.push(current);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function splitList(value) {
  return String(value || "")
    .split(/[;|,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function score(row) {
  let fitScore = 20;
  let riskScore = 0;
  const flags = [];
  if (row.email) fitScore += 15;
  if (row.whatsapp) fitScore += 12;
  if (row.website) fitScore += 10;
  if (row.city && row.state) fitScore += 10;
  const reviews = Number(row.googleReviews || 0);
  const rating = Number(row.googleRating || 0);
  if (reviews >= 250) fitScore += 16;
  else if (reviews >= 75) fitScore += 10;
  else if (reviews >= 20) fitScore += 5;
  if (rating >= 4.6) fitScore += 12;
  else if (rating >= 4.2) fitScore += 8;
  else if (rating > 0 && rating < 3.8) {
    riskScore += 15;
    flags.push("low_rating");
  }
  if (row.compounds.length >= 4) fitScore += 10;
  else if (row.compounds.length >= 1) fitScore += 5;
  const text = [row.name, row.website, row.notes, ...row.compounds].join(" ").toLowerCase();
  for (const term of riskyTerms) {
    if (text.includes(term)) {
      riskScore += 18;
      flags.push(`risky_claim:${term}`);
    }
  }
  if (!row.email && !row.whatsapp) {
    riskScore += 20;
    flags.push("missing_direct_contact");
  }
  return {
    fitScore: Math.max(0, Math.min(100, Math.round(fitScore - Math.min(riskScore, 35)))),
    riskScore: Math.max(0, Math.min(100, Math.round(riskScore))),
    riskFlags: [...new Set(flags)],
  };
}

const file = process.argv[2];
if (!file) {
  console.error("Uso: node scripts/import-pharmacy-prospects.mjs caminho/prospects.csv");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL ausente");
  process.exit(1);
}

const [header, ...lines] = parseCsv(readFileSync(file, "utf8"));
const keys = header.map((item) => item.trim());
const rows = lines.map((line) => Object.fromEntries(keys.map((key, index) => [key, line[index]?.trim() || ""])));
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
let imported = 0;

for (const raw of rows) {
  if (!raw.name) continue;
  const row = {
    name: raw.name,
    slug: slugify(raw.name),
    email: raw.email ? raw.email.toLowerCase() : null,
    whatsapp: raw.whatsapp || null,
    website: raw.website || null,
    googlePlaceId: raw.googlePlaceId || null,
    googleMapsUrl: raw.googleMapsUrl || null,
    address: raw.address || null,
    city: raw.city || null,
    state: raw.state ? raw.state.toUpperCase() : null,
    googleRating: raw.googleRating ? Number(raw.googleRating) : null,
    googleReviews: raw.googleReviews ? Number(raw.googleReviews) : null,
    compounds: splitList(raw.compounds),
    notes: raw.notes || null,
  };
  const scores = score(row);
  const status = scores.riskScore >= 60 ? "rejected" : scores.fitScore >= 65 ? "qualified" : "discovered";
  await pool.query(
    `insert into "PharmacyProspect"
      ("id","name","slug","email","whatsapp","website","googlePlaceId","googleMapsUrl","address","city","state","googleRating","googleReviews","compounds","source","status","fitScore","riskScore","riskFlags","evidence","outreachNotes","updatedAt")
     values
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'csv',$15,$16,$17,$18,$19::jsonb,$20,now())
     on conflict ("googlePlaceId") do update set
      "name" = excluded."name",
      "email" = excluded."email",
      "whatsapp" = excluded."whatsapp",
      "website" = excluded."website",
      "googleMapsUrl" = excluded."googleMapsUrl",
      "address" = excluded."address",
      "city" = excluded."city",
      "state" = excluded."state",
      "googleRating" = excluded."googleRating",
      "googleReviews" = excluded."googleReviews",
      "compounds" = excluded."compounds",
      "fitScore" = excluded."fitScore",
      "riskScore" = excluded."riskScore",
      "riskFlags" = excluded."riskFlags",
      "evidence" = excluded."evidence",
      "outreachNotes" = excluded."outreachNotes",
      "updatedAt" = now()`,
    [
      randomUUID(),
      row.name,
      row.slug,
      row.email,
      row.whatsapp,
      row.website,
      row.googlePlaceId,
      row.googleMapsUrl,
      row.address,
      row.city,
      row.state,
      row.googleRating,
      row.googleReviews,
      row.compounds,
      status,
      scores.fitScore,
      scores.riskScore,
      scores.riskFlags,
      JSON.stringify({ importedFrom: file, raw }),
      row.notes,
    ],
  );
  imported += 1;
}

await pool.end();
console.log(`prospects importados: ${imported}`);

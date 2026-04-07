// 27 capitais brasileiras + algumas cidades grandes para SEO local
export type City = {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  region: string;
  population: number;
};

export const cities: City[] = [
  // Sudeste
  { slug: "sao-paulo", name: "São Paulo", state: "São Paulo", stateAbbr: "SP", region: "Sudeste", population: 12300000 },
  { slug: "rio-de-janeiro", name: "Rio de Janeiro", state: "Rio de Janeiro", stateAbbr: "RJ", region: "Sudeste", population: 6700000 },
  { slug: "belo-horizonte", name: "Belo Horizonte", state: "Minas Gerais", stateAbbr: "MG", region: "Sudeste", population: 2500000 },
  { slug: "vitoria", name: "Vitória", state: "Espírito Santo", stateAbbr: "ES", region: "Sudeste", population: 365000 },
  { slug: "campinas", name: "Campinas", state: "São Paulo", stateAbbr: "SP", region: "Sudeste", population: 1200000 },
  { slug: "santos", name: "Santos", state: "São Paulo", stateAbbr: "SP", region: "Sudeste", population: 433000 },

  // Sul
  { slug: "porto-alegre", name: "Porto Alegre", state: "Rio Grande do Sul", stateAbbr: "RS", region: "Sul", population: 1500000 },
  { slug: "curitiba", name: "Curitiba", state: "Paraná", stateAbbr: "PR", region: "Sul", population: 1900000 },
  { slug: "florianopolis", name: "Florianópolis", state: "Santa Catarina", stateAbbr: "SC", region: "Sul", population: 510000 },
  { slug: "joinville", name: "Joinville", state: "Santa Catarina", stateAbbr: "SC", region: "Sul", population: 600000 },

  // Nordeste
  { slug: "salvador", name: "Salvador", state: "Bahia", stateAbbr: "BA", region: "Nordeste", population: 2900000 },
  { slug: "fortaleza", name: "Fortaleza", state: "Ceará", stateAbbr: "CE", region: "Nordeste", population: 2700000 },
  { slug: "recife", name: "Recife", state: "Pernambuco", stateAbbr: "PE", region: "Nordeste", population: 1700000 },
  { slug: "natal", name: "Natal", state: "Rio Grande do Norte", stateAbbr: "RN", region: "Nordeste", population: 900000 },
  { slug: "joao-pessoa", name: "João Pessoa", state: "Paraíba", stateAbbr: "PB", region: "Nordeste", population: 800000 },
  { slug: "maceio", name: "Maceió", state: "Alagoas", stateAbbr: "AL", region: "Nordeste", population: 1000000 },
  { slug: "aracaju", name: "Aracaju", state: "Sergipe", stateAbbr: "SE", region: "Nordeste", population: 660000 },
  { slug: "teresina", name: "Teresina", state: "Piauí", stateAbbr: "PI", region: "Nordeste", population: 870000 },
  { slug: "sao-luis", name: "São Luís", state: "Maranhão", stateAbbr: "MA", region: "Nordeste", population: 1100000 },

  // Centro-Oeste
  { slug: "brasilia", name: "Brasília", state: "Distrito Federal", stateAbbr: "DF", region: "Centro-Oeste", population: 3100000 },
  { slug: "goiania", name: "Goiânia", state: "Goiás", stateAbbr: "GO", region: "Centro-Oeste", population: 1500000 },
  { slug: "campo-grande", name: "Campo Grande", state: "Mato Grosso do Sul", stateAbbr: "MS", region: "Centro-Oeste", population: 920000 },
  { slug: "cuiaba", name: "Cuiabá", state: "Mato Grosso", stateAbbr: "MT", region: "Centro-Oeste", population: 620000 },

  // Norte
  { slug: "manaus", name: "Manaus", state: "Amazonas", stateAbbr: "AM", region: "Norte", population: 2200000 },
  { slug: "belem", name: "Belém", state: "Pará", stateAbbr: "PA", region: "Norte", population: 1500000 },
  { slug: "porto-velho", name: "Porto Velho", state: "Rondônia", stateAbbr: "RO", region: "Norte", population: 540000 },
  { slug: "rio-branco", name: "Rio Branco", state: "Acre", stateAbbr: "AC", region: "Norte", population: 420000 },
  { slug: "boa-vista", name: "Boa Vista", state: "Roraima", stateAbbr: "RR", region: "Norte", population: 440000 },
  { slug: "macapa", name: "Macapá", state: "Amapá", stateAbbr: "AP", region: "Norte", population: 510000 },
  { slug: "palmas", name: "Palmas", state: "Tocantins", stateAbbr: "TO", region: "Norte", population: 310000 },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

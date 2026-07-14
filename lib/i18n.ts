// Bilingual (EN/FR) resource strings for the Panier dashboard.
// Using a single resource file is the internationalization best practice:
// every user-facing string lives here, so adding a language = adding a column.

export type Lang = "en" | "fr";

export type ItemKey =
  | "tomatoes"
  | "bananas"
  | "apples"
  | "chicken"
  | "groundbeef"
  | "carrots"
  | "onions"
  | "potatoes";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇨🇦" },
  { code: "fr", label: "Français", flag: "🇨🇦" },
];

interface Strings {
  // chrome
  appName: string;
  tagline: string;
  langLabel: string;
  syntheticNote: string;
  dataSource: string;

  // controls
  controls: string;
  item: string;
  month: string;
  currency: string;
  unit: string;
  perKg: string;
  perLb: string;

  // trend chart
  trendTitle: (item: string) => string;
  trendContext: string;
  trendY: string;
  trendX: string;
  latest: string;
  change24: string;
  avg: string;

  // compare chart
  compareTitle: (month: string) => string;
  compareContext: string;
  compareY: string;
  cheapest: string;
  priciest: string;

  // misc
  footer: string;
  perUnit: (unit: string) => string;
}

export const ITEM_NAMES: Record<ItemKey, Record<Lang, string>> = {
  tomatoes: { en: "Tomatoes", fr: "Tomates" },
  bananas: { en: "Bananas", fr: "Bananes" },
  apples: { en: "Apples", fr: "Pommes" },
  chicken: { en: "Chicken breast", fr: "Poitrine de poulet" },
  groundbeef: { en: "Ground beef", fr: "Bœuf haché" },
  carrots: { en: "Carrots", fr: "Carottes" },
  onions: { en: "Onions", fr: "Oignons" },
  potatoes: { en: "Potatoes", fr: "Pommes de terre" },
};

export const t: Record<Lang, Strings> = {
  en: {
    appName: "Panier",
    tagline: "Canadian food prices, month by month",
    langLabel: "Language",
    syntheticNote:
      "Demo data — representative values adapted from a Statistics Canada table.",
    dataSource: "Source: adapted from Statistics Canada, Table 18-10-0245-01.",

    controls: "Controls",
    item: "Food item",
    month: "Month",
    currency: "Currency",
    unit: "Unit",
    perKg: "per kilogram",
    perLb: "per pound",

    trendTitle: (item) => `Price trend — ${item}`,
    trendContext:
      "How the average retail price of the selected item moved over 2023–2024. A line chart is used because the data is a continuous time series.",
    trendY: "Price",
    trendX: "Month",
    latest: "Latest",
    change24: "24-month change",
    avg: "Average",

    compareTitle: (month) => `Price comparison — ${month}`,
    compareContext:
      "Average retail price of every tracked item for the selected month. A bar chart is used because we are comparing distinct categories.",
    compareY: "Price",
    cheapest: "Cheapest",
    priciest: "Priciest",

    footer: "Built for SEG3125 · Data is illustrative.",
    perUnit: (unit) => `Price (${unit})`,
  },
  fr: {
    appName: "Panier",
    tagline: "Les prix des aliments au Canada, mois par mois",
    langLabel: "Langue",
    syntheticNote:
      "Données de démonstration — valeurs représentatives adaptées d’un tableau de Statistique Canada.",
    dataSource:
      "Source : adapté de Statistique Canada, tableau 18-10-0245-01.",

    controls: "Commandes",
    item: "Aliment",
    month: "Mois",
    currency: "Devise",
    unit: "Unité",
    perKg: "par kilogramme",
    perLb: "par livre",

    trendTitle: (item) => `Évolution du prix — ${item}`,
    trendContext:
      "Évolution du prix de détail moyen de l’aliment choisi sur 2023–2024. Un graphique linéaire est utilisé, car il s’agit d’une série temporelle continue.",
    trendY: "Prix",
    trendX: "Mois",
    latest: "Dernier",
    change24: "Variation sur 24 mois",
    avg: "Moyenne",

    compareTitle: (month) => `Comparaison des prix — ${month}`,
    compareContext:
      "Prix de détail moyen de chaque aliment suivi pour le mois choisi. Un diagramme à barres est utilisé, car on compare des catégories distinctes.",
    compareY: "Prix",
    cheapest: "Le moins cher",
    priciest: "Le plus cher",

    footer: "Réalisé pour SEG3125 · Données à titre indicatif.",
    perUnit: (unit) => `Prix (${unit})`,
  },
};

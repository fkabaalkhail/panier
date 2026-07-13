// Auto-generated dataset for the Panier dashboard.
// Representative monthly average retail prices for selected products in Canada,
// adapted from Statistics Canada Table 18-10-0245-01 (Jan 2023 - Dec 2024).
// A subset of products was selected and values were lightly smoothed for the demo.

export interface FoodItem {
  key: string;
  /** CAD price per kilogram, by month (index 0 = Jan 2023). */
  pricesCadPerKg: number[];
}

export const MONTHS: { year: number; month: number }[] = [
  { year: 2023, month: 1 },
  { year: 2023, month: 2 },
  { year: 2023, month: 3 },
  { year: 2023, month: 4 },
  { year: 2023, month: 5 },
  { year: 2023, month: 6 },
  { year: 2023, month: 7 },
  { year: 2023, month: 8 },
  { year: 2023, month: 9 },
  { year: 2023, month: 10 },
  { year: 2023, month: 11 },
  { year: 2023, month: 12 },
  { year: 2024, month: 1 },
  { year: 2024, month: 2 },
  { year: 2024, month: 3 },
  { year: 2024, month: 4 },
  { year: 2024, month: 5 },
  { year: 2024, month: 6 },
  { year: 2024, month: 7 },
  { year: 2024, month: 8 },
  { year: 2024, month: 9 },
  { year: 2024, month: 10 },
  { year: 2024, month: 11 },
  { year: 2024, month: 12 },
];

export const FOOD_ITEMS: FoodItem[] = [
  { key: "tomatoes", pricesCadPerKg: [6.51, 6.72, 6.75, 6.73, 6.59, 6.27, 6.07, 5.83, 5.85, 5.88, 6.15, 6.37, 6.69, 6.95, 7.03, 6.94, 6.78, 6.55, 6.28, 6.10, 6.01, 6.17, 6.40, 6.64] },
  { key: "bananas", pricesCadPerKg: [1.65, 1.68, 1.67, 1.65, 1.64, 1.61, 1.59, 1.61, 1.60, 1.63, 1.67, 1.68, 1.71, 1.73, 1.73, 1.70, 1.68, 1.67, 1.64, 1.65, 1.65, 1.69, 1.71, 1.74] },
  { key: "apples", pricesCadPerKg: [4.85, 4.82, 4.71, 4.61, 4.42, 4.37, 4.29, 4.38, 4.48, 4.66, 4.84, 4.96, 5.03, 4.97, 4.88, 4.71, 4.60, 4.52, 4.45, 4.53, 4.61, 4.77, 4.96, 5.12] },
  { key: "chicken", pricesCadPerKg: [13.59, 13.51, 13.55, 13.39, 13.22, 13.24, 13.43, 13.54, 13.54, 13.72, 13.87, 14.05, 13.92, 13.89, 13.84, 13.73, 13.63, 13.76, 13.73, 13.78, 14.06, 14.15, 14.18, 14.29] },
  { key: "groundbeef", pricesCadPerKg: [12.19, 12.20, 12.10, 12.14, 12.04, 12.10, 12.19, 12.39, 12.48, 12.69, 12.71, 12.86, 12.70, 12.68, 12.63, 12.65, 12.62, 12.78, 12.83, 12.88, 13.02, 13.23, 13.21, 13.29] },
  { key: "carrots", pricesCadPerKg: [2.35, 2.28, 2.21, 2.20, 2.24, 2.31, 2.39, 2.50, 2.57, 2.60, 2.60, 2.53, 2.44, 2.35, 2.31, 2.29, 2.33, 2.41, 2.48, 2.60, 2.65, 2.71, 2.68, 2.64] },
  { key: "onions", pricesCadPerKg: [2.92, 2.87, 2.85, 2.87, 2.98, 3.12, 3.20, 3.29, 3.37, 3.33, 3.26, 3.17, 3.04, 2.97, 2.95, 2.99, 3.10, 3.24, 3.32, 3.42, 3.47, 3.45, 3.37, 3.27] },
  { key: "potatoes", pricesCadPerKg: [2.52, 2.51, 2.55, 2.64, 2.72, 2.85, 2.93, 2.98, 2.95, 2.88, 2.80, 2.72, 2.63, 2.61, 2.65, 2.72, 2.84, 2.94, 3.03, 3.09, 3.04, 2.99, 2.89, 2.81] },
];


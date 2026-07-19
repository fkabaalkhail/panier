# Panier — Canadian Food Price Dashboard

A small **bilingual (English / French) interactive dashboard** built for
SEG3125 (Analysis and Design of User Interfaces), Assignment 5.

It explores average retail food prices in Canada with two complementary charts
and a handful of interactive controls.

## Features

- **Line chart** — price trend of a selected food item over 2023–2024 (continuous time series).
- **Bar chart** — price comparison of every tracked item for a selected month (category comparison).
- **Interactions** — pick the food item, the month, the currency (CAD / EUR) and the unit (kg / lb).
- **Localization** — full EN/FR UI with a language selector, plus locale-aware
  number, currency and date formatting (`en-CA` vs `fr-CA`).
- **Dark theme** — consistent with the rest of my portfolio.

## Data

Representative monthly average retail prices for eight products, adapted from
**Statistics Canada, Table 18-10-0245-01**. A subset of products was selected and
values were lightly smoothed for the demo; the UI flags the data as illustrative.

## Tech

Next.js (App Router) · React · TypeScript · Tailwind CSS · Recharts.

All user-facing strings live in a single resource file (`lib/i18n.ts`) and all
formatting logic in `lib/format.ts`.

## Develop

```bash
npm install
npm run dev
```

Part of the portfolio at https://aba-alkhail.dev

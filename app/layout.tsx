import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Panier – Canadian Food Price Dashboard",
  description:
    "A bilingual (EN/FR) interactive dashboard exploring average retail food prices in Canada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-black text-white/60 antialiased">
        {children}
      </body>
    </html>
  );
}

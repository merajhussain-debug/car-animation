import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELOCE | Drive the Future Today — Luxury Electric Performance",
  description:
    "Experience next-generation performance, safety, and autonomous technology. VELOCE — the pinnacle of luxury electric automotive engineering. 350 km/h top speed, 800 km range, full self-driving capability.",
  keywords: [
    "luxury car",
    "electric vehicle",
    "autonomous driving",
    "EV",
    "performance car",
    "VELOCE",
  ],
  openGraph: {
    title: "VELOCE | Drive the Future Today",
    description:
      "Experience next-generation performance, safety, and autonomous technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

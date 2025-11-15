import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.occult369.com'),
  title: "Occult369 | Best Numerology & Astrology Services Online",
  description:
    "Discover your true self with Occult369 — India's leading numerology and astrology platform. Get personalized readings, life path insights, name corrections, and future predictions from expert numerologists.",
  keywords: [
    "Occult369",
    "numerology services",
    "astrology predictions",
    "name correction numerology",
    "best numerologist in India",
    "life path number calculator",
    "numerology online consultation",
    "Vedic astrology",
    "business name numerology",
    "numerology for success",
    "numerology by date of birth",
    "personalized horoscope",
    "career prediction astrology",
    "spiritual growth guidance",
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}

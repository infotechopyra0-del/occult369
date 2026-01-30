import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

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
        <Providers>
          {children}
          <WhatsAppWidget />
          <Toaster position="top-right" richColors />
        </Providers>
        <footer className="w-full bg-[#301934] border-t border-[#B8860B]/30 text-[#F5F5DC] py-6 px-4 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-heading font-semibold tracking-wide">&copy; {new Date().getFullYear()} Occult369. All rights reserved.</div>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/shipping" className="hover:text-[#B8860B] transition-colors">Shipping</a>
              <a href="/returns" className="hover:text-[#B8860B] transition-colors">Returns</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

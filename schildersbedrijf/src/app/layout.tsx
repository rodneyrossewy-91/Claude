import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "SchilderPro – Vakmanschap in Schilderwerk",
    template: "%s | SchilderPro",
  },
  description:
    "Professioneel schildersbedrijf voor binnen- en buitenschilderwerk. Meer dan 15 jaar ervaring, hoogwaardige materialen en garantie op al ons werk. Gratis offerte aanvragen.",
  keywords: [
    "schildersbedrijf",
    "schilderwerk",
    "binnenschilderwerk",
    "buitenschilderwerk",
    "spuitwerk",
    "houtrot reparatie",
    "schilder Amsterdam",
    "professioneel schilderwerk",
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://schilderpro.nl",
    siteName: "SchilderPro",
    title: "SchilderPro – Vakmanschap in Schilderwerk",
    description:
      "Professioneel schildersbedrijf voor binnen- en buitenschilderwerk. Meer dan 15 jaar ervaring, gratis offerte.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

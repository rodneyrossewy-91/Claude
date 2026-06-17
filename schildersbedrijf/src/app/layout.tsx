import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Van der Berg Schildersbedrijf | Vakmanschap in Schilderwerk',
    template: '%s | Van der Berg Schildersbedrijf',
  },
  description:
    'Van der Berg Schildersbedrijf — meer dan 15 jaar vakmanschap in binnenschilderwerk, buitenschilderwerk, spuitwerk en houtrot reparatie. Gratis offerte aanvragen.',
  keywords: [
    'schildersbedrijf',
    'schilder Utrecht',
    'binnenschilderwerk',
    'buitenschilderwerk',
    'spuitwerk',
    'houtrot reparatie',
    'Van der Berg',
  ],
  authors: [{ name: 'Van der Berg Schildersbedrijf' }],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Van der Berg Schildersbedrijf',
    title: 'Van der Berg Schildersbedrijf | Vakmanschap in Schilderwerk',
    description:
      'Meer dan 15 jaar vakmanschap in binnenschilderwerk, buitenschilderwerk, spuitwerk en houtrot reparatie. Gratis offerte aanvragen.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

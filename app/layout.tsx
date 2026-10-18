import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Jost } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'afterAURAskin by ROSAURA — Rosaura Skin Clinic',
  description:
    'Perawatan kulit berbasis bukti medis, diformulasikan oleh dr. Gita Rosadila di Rosaura Skin Clinic, Belitang, OKU Timur.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${jost.variable}`}>
      <body className="font-sans bg-pearl text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}

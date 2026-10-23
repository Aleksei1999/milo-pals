import type { Metadata, Viewport } from 'next';
import { Gochi_Hand, Lilita_One, Nunito } from 'next/font/google';
import './globals.css';

// круглый жирный для логотипа и заголовков, рукописный для реплик героев, мягкий гротеск для текста
const display = Lilita_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--ff-display',
  display: 'swap',
});
const hand = Gochi_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--ff-hand',
  display: 'swap',
});
const body = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--ff-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Milo & Pals | Different Worlds. Same Friends.',
  description:
    'Milo, Zoe, Bibo and Nova travel between worlds in a little spaceship called The Explorer. A new animated series, coming soon.',
};

export const viewport: Viewport = { themeColor: '#0c0f2e' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${hand.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}

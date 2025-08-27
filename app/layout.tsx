import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import LenisProvider from './components/LenisProvider';
import AnimatedCursor from 'react-animated-cursor';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ricardo Vargas | Developer Portfolio',
  description:
    'Portfolio of Ricardo Vargas, a software developer focused on building intuitive, performant, and elegant digital products. Passionate about turning ideas into clean, user-first experiences.',
  keywords: [
    'Software Engineer',
    'Frontend Development',
    'Web Applications',
    'Clean Architecture',
    'UI/UX',
    'Design Systems',
    'Performance',
    'Accessibility',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'Ricardo Vargas Portfolio',
  ],
  authors: [{ name: 'Ricardo Vargas' }],
  creator: 'Ricardo Vargas',
  openGraph: {
    title: 'Ricardo Vargas – Developer Portfolio',
    description:
      'Explore the portfolio of Ricardo Vargas: a developer creating modern, accessible, and impactful web experiences with a focus on design and performance.',
    url: 'https://your-domain.com',
    siteName: 'Ricardo Vargas Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ricardo Vargas – Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AnimatedCursor
        innerSize={12}
        outerSize={40}
        color="120,120,120" // neutral gray
        outerAlpha={0.18}
        innerScale={0.7}
        outerScale={1.7}
        outerStyle={{ border: '3px solid #b0b0b0', background: 'transparent' }}
        innerStyle={{ background: 'transparent', border: '2px solid #d1d1d1' }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

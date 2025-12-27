import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Auth from '@/components/layout/Auth';
import Analytics from '@/components/layout/Analytics';
import SpeedOptimization from '@/components/layout/SpeedOptimization';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: "Learncil | Quality Online Education for Kids & Adults",
    template: "%s | Learncil"
  },
  description: "Discover engaging online courses for K-12 students and adults. Expert teachers, interactive learning, and flexible schedules. Start your educational journey today!",
  keywords: ["online education", "K-12 learning", "adult education", "math tutoring", "english lessons", "science courses", "nigerian education", "homeschooling", "online tutoring"],
  authors: [{ name: "Learncil" }],
  creator: "Learncil Team",
  publisher: "Learncil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://learncil.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://learncil.com',
    title: 'Learncil | Quality Online Education for Kids & Adults',
    description: 'Discover engaging online courses for K-12 students and adults. Expert teachers, interactive learning, and flexible schedules. Start your educational journey today!',
    siteName: 'Learncil',
    images: [
      {
        url: '/learncil.png',
        width: 1200,
        height: 630,
        alt: 'Learncil - Online Education Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learncil | Quality Online Education for Kids & Adults',
    description: 'Discover engaging online courses for K-12 students and adults. Expert teachers, interactive learning, and flexible schedules. Start your educational journey today!',
    images: ['/learncil.png'],
    site: '@learncil',
    creator: '@learncil',
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
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'education',
  classification: 'online learning platform',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  }
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to important domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Learncil",
            "url": "https://learncil.com",
            "logo": "https://learncil.com/learncil.png",
            "description": "Discover engaging online courses for K-12 students and adults. Expert teachers, interactive learning, and flexible schedules. Start your educational journey today!",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lagos",
              "addressCountry": "NG"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+234-812-345-6789",
              "contactType": "Customer Support",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://twitter.com/learncil",
              "https://facebook.com/learncil",
              "https://instagram.com/learncil"
            ]
          })}
        </script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics gtagId="G-XXXXXXXXXX" gtmId="GTM-XXXXXXX" />
        <SpeedOptimization />
      </body>
    </html>
  );
}
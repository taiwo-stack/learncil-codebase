"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Auth from '@/components/layout/Auth';
import SEO from '@/components/layout/SEO';
import Analytics from '@/components/layout/Analytics';
import SpeedOptimization from '@/components/layout/SpeedOptimization';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    // Dynamically import and initialize Firebase auth
    const initAuth = async () => {
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        const { auth } = await import('@/components/layout/firebase');

        // Only proceed if auth is available
        if (!auth) {
          console.warn('Firebase auth is not initialized');
          return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error initializing auth:', error);
      }
    };

    initAuth();
  }, []);

  // Check if current page is a dashboard page
  const isDashboardPage = pathname?.includes('/dashboard/');

  // Show navbar only on non-dashboard pages or when not authenticated
  const shouldShowNavbar = !isDashboardPage || !isAuthenticated;
  const shouldShowFooter = !isDashboardPage || !isAuthenticated;

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Transform your learning journey with Learncil. Access expert-led courses, personalized instruction, and comprehensive educational resources designed for students of all levels." />
          <meta name="keywords" content="online learning, courses, education, e-learning, tutorials, student learning, learncil" />
          <meta name="author" content="Learncil" />
          <meta name="robots" content="index, follow" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://learncil.com/" />
          <meta property="og:title" content="Learncil - Online Learning Platform" />
          <meta property="og:description" content="Transform your learning journey with expert-led courses and personalized instruction." />
          <meta property="og:site_name" content="Learncil" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://learncil.com/" />
          <meta name="twitter:title" content="Learncil - Online Learning Platform" />
          <meta name="twitter:description" content="Transform your learning journey with expert-led courses and personalized instruction." />
          
          <title>Learncil - Online Learning Platform</title>
          <link rel="canonical" href="https://learncil.com/" />
          <SEO />
        </head>
        <body className={inter.className}>
          <div style={{ visibility: 'hidden' }}>{children}</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Transform your learning journey with Learncil. Access expert-led courses, personalized instruction, and comprehensive educational resources designed for students of all levels." />
        <meta name="keywords" content="online learning, courses, education, e-learning, tutorials, student learning, learncil" />
        <meta name="author" content="Learncil" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://learncil.com/" />
        <meta property="og:title" content="Learncil - Online Learning Platform" />
        <meta property="og:description" content="Transform your learning journey with expert-led courses and personalized instruction." />
        <meta property="og:site_name" content="Learncil" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://learncil.com/" />
        <meta name="twitter:title" content="Learncil - Online Learning Platform" />
        <meta name="twitter:description" content="Transform your learning journey with expert-led courses and personalized instruction." />
        
        <title>Learncil - Online Learning Platform</title>
        <link rel="canonical" href="https://learncil.com/" />
        <SEO />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            {shouldShowNavbar && <Navbar onLoginClick={() => setShowAuth(true)} />}
            <main className="flex-1">{children}</main>
            {showAuth && <Auth onClose={() => setShowAuth(false)} />}
            {shouldShowFooter && <Footer />}
          </div>
        </ThemeProvider>
        <Analytics gtagId="G-XXXXXXXXXX" gtmId="GTM-XXXXXXX" />
        <SpeedOptimization />
      </body>
    </html>
  );
}
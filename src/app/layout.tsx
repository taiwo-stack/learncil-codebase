"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Auth from '@/components/layout/Auth';


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
          <title>Learncil | Your Gateway to Quality Education</title>
          <meta name="description" content="Access high-quality courses, expert teachers, and a supportive learning community. Start your educational journey with Learncil today." />
          <meta name="keywords" content="education, online courses, learning, teachers, students, e-learning, education platform" />
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
        <title>Learncil | Your Gateway to Quality Education</title>
        <meta name="description" content="Access high-quality courses, expert teachers, and a supportive learning community. Start your educational journey with Learncil today." />
        <meta name="keywords" content="education, online courses, learning, teachers, students, e-learning, education platform" />
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
      </body>
    </html>
  );
}
'use client';

import { useEffect } from 'react';

export default function SpeedOptimization() {
  useEffect(() => {
    // Preload critical resources
    const preloadLink = (href: string, as: string = 'script') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    };

    // Preload critical fonts
    preloadLink('/fonts/Inter.woff2', 'font');
    
    // Preconnect to external domains
    const preconnect = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preconnect to Google services
    preconnect('https://fonts.googleapis.com');
    preconnect('https://fonts.gstatic.com');
    preconnect('https://www.googletagmanager.com');
    preconnect('https://www.google-analytics.com');
    preconnect('https://www.gstatic.com');

    // Prefetch critical images
    const prefetchImage = (src: string) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      document.head.appendChild(link);
    };

    // Prefetch hero images
    prefetchImage('/learncil-hero-image.png');
    prefetchImage('/learncil.png');

    // Optimize font loading
    const optimizeFonts = () => {
      // Add font-display swap for better performance
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    };

    optimizeFonts();

    // Lazy load non-critical images
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach((img) => {
        if (!img.getAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    };

    lazyLoadImages();

    // Optimize CSS delivery
    const optimizeCSS = () => {
      // Remove unused CSS classes
      const style = document.createElement('style');
      style.textContent = `
        /* Critical CSS for above-the-fold content */
        .hero-section { min-height: 60vh; }
        .container { max-width: 1200px; margin: 0 auto; }
        .btn { transition: all 0.3s ease; }
      `;
      document.head.appendChild(style);
    };

    optimizeCSS();

  }, []);

  return null;
}
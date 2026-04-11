'use client';

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: Record<string, unknown>;
  robots?: string;
}

const defaultTitle = "Learncil | Your Gateway to Quality Education";
const defaultDescription = "Access high-quality courses, expert teachers, and a supportive learning community. Start your educational journey with Learncil today.";
const defaultKeywords = "education, online courses, learning, teachers, students, e-learning, education platform";
const defaultImage = "https://learncil.com/learncil.png";
const defaultUrl = "https://learncil.com";

export default function SEO({
  title = defaultTitle,
  description = defaultDescription,
  keywords = defaultKeywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = defaultImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage = ogImage,
  schema,
  robots = "index, follow"
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "robots", content: robots },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "charset", content: "UTF-8" },
      { name: "author", content: "Learncil" },
      { name: "copyright", content: "Learncil" },
      
      // Open Graph
      { property: "og:title", content: ogTitle || title },
      { property: "og:description", content: ogDescription || description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: ogType },
      { property: "og:url", content: canonical || window.location.href },
      { property: "og:site_name", content: "Learncil" },
      { property: "og:locale", content: "en_NG" },
      
      // Twitter Cards
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: twitterTitle || ogTitle || title },
      { name: "twitter:description", content: twitterDescription || ogDescription || description },
      { name: "twitter:image", content: twitterImage || ogImage },
      { name: "twitter:site", content: "@learncil" },
      { name: "twitter:creator", content: "@learncil" },
      
      // Additional meta tags
      { name: "theme-color", content: "#007bff" },
      { name: "msapplication-TileColor", content: "#007bff" },
      { name: "format-detection", content: "telephone=no" },
    ];

    // Add or update meta tags
    metaTags.forEach(({ name, property, content }) => {
      let meta = document.querySelector(`meta[${name ? 'name' : 'property'}="${name || property}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (property) meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    });

    // Add canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Add structured data (JSON-LD)
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    // Add organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Learncil",
      "url": defaultUrl,
      "logo": ogImage,
      "description": description,
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
    };

    let orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization"]');
    if (!orgScript) {
      orgScript = document.createElement('script');
      orgScript.setAttribute('type', 'application/ld+json');
      orgScript.setAttribute('data-schema', 'organization');
      document.head.appendChild(orgScript);
    }
    orgScript.textContent = JSON.stringify(organizationSchema);

  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, twitterTitle, twitterDescription, twitterImage, schema, robots]);

  return null;
}
"use client";
import { Metadata } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SEO from '@/components/layout/SEO';
import HeroSection from '@/components/layout/hero-section';
import ServicesSection from '@/components/layout/services-section';
import FeaturedCourses from '@/components/courses/featured-courses';
import Calltoaction from '@/components/courses/calltoaction';
import FoundersSection from '@/components/layout/founders-section';
import SpecialCourses from '@/components/courses/special-courses';
import BookingSection from '@/components/layout/booking';
import AboutExperienceSection from '@/components/layout/about-experience';
import StudentTestimonial from '@/components/layout/studenttestimonial';



export const metadata: Metadata = {
  title: 'Learncil - Online Learning Platform',
  description: 'Transform your learning journey with Learncil. Access expert-led courses, personalized instruction, and comprehensive educational resources designed for students of all levels.',
  keywords: 'online learning, courses, education, e-learning, tutorials, student learning',
  openGraph: {
    title: 'Learncil - Online Learning Platform',
    description: 'Transform your learning journey with expert-led courses and personalized instruction.',
    url: 'https://learncil.com',
    siteName: 'Learncil',
    images: [
      {
        url: 'https://learncil.com/og-image.jpg', // Add your logo/banner here
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learncil - Online Learning Platform',
    description: 'Transform your learning journey with expert-led courses and personalized instruction.',
    images: ['https://learncil.com/og-image.jpg'],
  },
};



export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <SEO
        title="Learncil | Quality Online Education for Kids & Adults"
        description="Discover engaging online courses for K-12 students and adults. Expert teachers, interactive learning, and flexible schedules. Start your educational journey today!"
        keywords="online education, K-12 learning, adult education, math tutoring, english lessons, science courses, nigerian education, homeschooling, online tutoring"
        canonical="https://learncil.com"
        ogTitle="Learncil - Transform Your Learning Experience Online"
        ogDescription="High-quality online education platform offering personalized learning for students and adults. Join thousands of satisfied learners today."
        ogImage="https://learncil.com/learncil.png"
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle="Learncil - Online Education Made Easy"
        twitterDescription="Quality online courses for all ages. Start learning today!"
        twitterImage="https://learncil.com/learncil.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Learncil - Online Education Platform",
          "url": "https://learncil.com",
          "description": "Discover engaging online courses for K-12 students and adults. Expert teachers, interactive learning, and flexible schedules.",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Learncil",
            "url": "https://learncil.com"
          },
          "mainEntity": {
            "@type": "EducationalOrganization",
            "name": "Learncil",
            "url": "https://learncil.com",
            "description": "Online education platform providing quality learning experiences"
          }
        }}
      />
      
      <div className="flex flex-col">
        <div id="home">
          <HeroSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="about">
          <AboutExperienceSection />
        </div>
        <div id="courses">
          <FeaturedCourses />
        </div>
        <SpecialCourses />
        <Calltoaction />
        <div id="booking">
          <BookingSection />
        </div>
        <FoundersSection />
        <div id="testimonials">
          <StudentTestimonial />
        </div>
      </div>
    </>
  );

  useEffect(() => {
    // Dynamically import and initialize Firebase
    const initAuth = async () => {
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        const { doc, getDoc } = await import('firebase/firestore');
        const { auth, db } = await import('@/components/layout/firebase');

        // Only proceed if auth and db are available
        if (!auth || !db) {
          console.warn('Firebase is not initialized');
          return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is logged in, redirect to their dashboard
            try {
              if (!db) {
                console.warn('Database not available for user redirect');
                return;
              }
              const userDocRef = doc(db, 'users', user.uid);
              const userDoc = await getDoc(userDocRef);

              if (userDoc.exists()) {
                const userData = userDoc.data();
                const role = userData.role;

                if (role === 'student') {
                  router.replace(`/student/dashboard/${user.uid}`);
                } else if (role === 'admin') {
                  router.replace(`/admin/dashboard/${user.uid}`);
                } else if (role === 'instructor') {
                  router.replace(`/instructor/dashboard/${user.uid}`);
                }
              }
            } catch (error) {
              console.error('Error fetching user role:', error);
            }
          }
          // If not logged in, stay on homepage
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error initializing auth:', error);
      }
    };

    initAuth();
  }, [router]);
}
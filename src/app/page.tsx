"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/layout/hero-section';
import ServicesSection from '@/components/layout/services-section';
import FeaturedCourses from '@/components/courses/featured-courses';
import Calltoaction from '@/components/courses/calltoaction';
import FoundersSection from '@/components/layout/founders-section';
import SpecialCourses from '@/components/courses/special-courses';
import BookingSection from '@/components/layout/booking';
import AboutExperienceSection from '@/components/layout/about-experience';
import StudentTestimonial from '@/components/layout/studenttestimonial';

export default function HomePage() {
  const router = useRouter();

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

  return (
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
  );
}
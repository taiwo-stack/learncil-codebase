"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/components/layout/firebase';
import HeroSection from '@/components/layout/hero-section'
import ServicesSection from '@/components/layout/services-section'
import FeaturedCourses from '@/components/tours/featured-courses'
import Calltoaction from '@/components/tours/calltoaction'
import FoundersSection from '@/components/layout/founders-section'
import SpecialCourses from '@/components/tours/special-courses'
// import Instructors from '@/components/layout/instructors'
import BookingSection from '@/components/layout/booking'
// import { BlogSection } from '@/components/blog/blog-section'
import AboutExperienceSection from '@/components/layout/about-experience'
import StudentTestimonial from '@/components/layout/studenttestimonial'

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in, redirect to their dashboard
        try {
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
      {/* <Instructors /> */}
      <div id="testimonials">
        <StudentTestimonial />
      </div>
     

      {/*<BlogSection />*/}
    </div>
  )
}


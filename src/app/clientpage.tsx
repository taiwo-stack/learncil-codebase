"use client";

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
import StudentTestimonial from '@/components/layout/studenttestimonial';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const user = session.user;
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          return;
        }

        if (profile) {
          if (profile.role === 'admin') {
            router.replace(`/admin/dashboard/${user.id}`);
          }
        }
      }
    };

    checkUserAndRedirect();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        checkUserAndRedirect();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

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
        <div id="courses">
          <FeaturedCourses />
        </div>
        <SpecialCourses />
        <Calltoaction />
        <div id="booking">
          <BookingSection />
        </div>
        <div id="testimonials">
          <StudentTestimonial />
        </div>
      </div>
    </>
  );
}
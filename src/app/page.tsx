import { Metadata } from 'next';
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
  title: {
    default: "Learncil | Quality Online Education for Kids & Adults",
    template: "%s | Learncil"
  },
  description: "Discover engaging online courses for K-12 students and adults. Expert teachers, interactive learning, and flexible schedules. Start your educational journey today!",
  keywords: ["online education", "K-12 learning", "adult education", "math tutoring", "english lessons", "science courses", "nigerian education", "homeschooling", "online tutoring"],
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
  alternates: {
    canonical: 'https://learncil.com',
  },
  verification: {
    google: 'your-google-site-verification-code',
  }
};

export default function HomePage() {
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
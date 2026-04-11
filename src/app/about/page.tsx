'use client';

import SEO from '@/components/layout/SEO';
import AboutHero from '@/components/layout/about-hero';
import AboutExperienceSection from '@/components/layout/about-experience';
import FoundersSection from '@/components/layout/founders-section';

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us | Learncil"
        description="Learn more about Learncil Academy, our mission, our founders, and how we are shaping the future of education."
      />
      
      <AboutHero />
      
      <div id="about-us">
        <AboutExperienceSection />
      </div>
      
      <div id="about-founder">
        <FoundersSection />
      </div>
    </>
  );
}

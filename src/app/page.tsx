import { HeroSection } from '@/components/layout/hero-section'
import { FeaturedTours } from '@/components/tours/featured-tours'

import WhyChoose from '@/components/layout/whychooseus-section'
import Testimonials from '@/components/layout/testimonials'
import { BlogSection } from '@/components/blog/blog-section'
import AboutExperienceSection from '@/components/layout/about-experience'
import AmbassadorHighlight from '@/components/ambassador/ambassadorHightlight'
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutExperienceSection />
      <FeaturedTours />
      <WhyChoose/>  
      <AmbassadorHighlight />
      <Testimonials />
      <BlogSection />
    </div>
  )
}
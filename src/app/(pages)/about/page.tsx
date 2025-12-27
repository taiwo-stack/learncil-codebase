import { Metadata } from 'next';
import Breadcrumbs from "@/components/layout/Breadcrumbs"

export const metadata: Metadata = {
  title: {
    default: "About BoxOutcity | Premium Travel & Tourism Services",
    template: "%s | BoxOutcity"
  },
  description: "Discover our story, mission, and values. BoxOutcity is a licensed travel company offering authentic experiences across Nigeria and West Africa since 2020.",
  keywords: ["about boxoutcity", "travel company", "nigeria tourism", "west africa tours", "travel agency", "tour operator"],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://learncil.com/about',
    title: 'About BoxOutcity - Your Trusted Travel Partner',
    description: 'Learn about our journey, team, and commitment to authentic travel experiences in West Africa',
    siteName: 'BoxOutcity',
    images: [
      {
        url: '/about_leancil_1.png',
        width: 1200,
        height: 630,
        alt: 'About BoxOutcity - Our Story',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About BoxOutcity - Premium Travel Experiences',
    description: 'Discover our story and passion for travel',
    images: ['/about_leancil_1.png'],
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
    canonical: 'https://learncil.com/about',
  },
  verification: {
    google: 'your-google-site-verification-code',
  }
};

export default function AboutUsPage() {
  return (
    <>
      <Breadcrumbs />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop"
              alt="Travel adventure"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/85 to-emerald-700/90"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute top-20 left-10 w-16 h-16 text-emerald-300/20 animate-spin-slow" style={{animation: 'spin 20s linear infinite'}} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg className="absolute top-40 right-20 w-12 h-12 text-emerald-300/20 animate-bounce" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <svg className="absolute bottom-32 left-32 w-8 h-8 text-emerald-300/20 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <svg className="absolute bottom-20 right-40 w-10 h-10 text-emerald-300/20" style={{animation: 'bounce 3s ease-in-out infinite'}} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
              <svg className="w-5 h-5 text-emerald-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-white font-medium">Your Journey Starts Here</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              About <span className="text-emerald-300">BoxOutcity</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Creating unforgettable travel experiences that connect you with the soul of every destination
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="/tours"
                className="group bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all inline-flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Explore Our Tours
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </a>
              <a 
                href="/contact"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all shadow-xl"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 -mt-20 relative z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                <svg className="w-10 h-10 text-emerald-600 mb-4 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Happy Travelers</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                <svg className="w-10 h-10 text-emerald-600 mb-4 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Tour Destinations</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                <svg className="w-10 h-10 text-emerald-600 mb-4 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
                <div className="text-gray-600 font-medium">Tours Completed</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                <svg className="w-10 h-10 text-emerald-600 mb-4 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <div className="text-4xl font-bold text-gray-900 mb-2">4.9</div>
                <div className="text-gray-600 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full">
                    Our Story
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Turning Travel Dreams Into Reality
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  BoxOutcity was born from a simple belief: travel should be more than just visiting places—it should be about creating meaningful connections, discovering hidden gems, and experiencing authentic cultures.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Since 2020, we've been curating exceptional travel experiences across Nigeria and West Africa. What started as a passion project has grown into a community of travelers, guides, and local partners dedicated to showcasing the incredible diversity and beauty of our region.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Every tour we design is crafted with care, ensuring you don't just see a destination—you feel it, taste it, and carry it with you long after you return home.
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <svg className="w-12 h-12 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <div>
                    <div className="font-bold text-gray-900">Licensed & Certified</div>
                    <div className="text-gray-600">Recognized by Nigeria Tourism Board</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=1000&fit=crop"
                    alt="Travel experiences"
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl max-w-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-2xl">4.9/5</div>
                      <div className="text-gray-600">Customer Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-white px-4 py-2 rounded-full inline-block mb-4">
                Our Purpose
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Mission & Vision
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be West Africa's most trusted and innovative travel company, inspiring a new generation of conscious travelers who explore with purpose, respect, and wonder.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To curate authentic, safe, and sustainable travel experiences that celebrate African culture, empower local communities, and create lifelong memories for every traveler.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full inline-block mb-4">
                What We Stand For
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at BoxOutcity
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Value 1 */}
              <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <svg className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Experiences</h3>
                <p className="text-gray-600 leading-relaxed">
                  We create genuine connections with local cultures, taking you beyond tourist spots to experience the real heart of each destination.
                </p>
              </div>

              {/* Value 2 */}
              <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <svg className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Safety First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your security is our priority. We maintain the highest safety standards with licensed guides, insured vehicles, and 24/7 support.
                </p>
              </div>

              {/* Value 3 */}
              <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <svg className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18 6.52l-2.25 4.45H13v6h3v-4.52l2.5-1.25V22h3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  We partner with local communities, ensuring tourism benefits the people and places you visit through sustainable practices.
                </p>
              </div>

              {/* Value 4 */}
              <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <svg className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.5 6h-11c-.83 0-1.5.67-1.5 1.5v9c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zm-11 1.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm0 9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm11-9h-2V8h-1.5V6.5h-5V8H9V6.5H7.5V8h-2v-2C6.93 6 8.07 6 9.5 6h5c1.43 0 2.57 0 4 0zM7.5 16c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm11 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable Travel</h3>
                <p className="text-gray-600 leading-relaxed">
                  We're committed to eco-friendly tourism that preserves natural beauty and cultural heritage for future generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20 bg-gray-50 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-white px-4 py-2 rounded-full inline-block mb-4">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Milestones That Define Us
              </h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200"></div>

              <div className="space-y-12">
                {/* Milestone 1 */}
                <div className="flex items-center gap-8 md:flex-row">
                  {/* Content */}
                  <div className="flex-1 md:text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all inline-block">
                      <div className="text-emerald-600 font-bold text-lg mb-2">2020</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">BoxOutcity Founded</h4>
                      <p className="text-gray-600">Started with a dream to showcase Nigeria's beauty</p>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Spacer for even layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>

                {/* Milestone 2 */}
                <div className="flex items-center gap-8 md:flex-row-reverse">
                  {/* Content */}
                  <div className="flex-1 md:text-left">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all inline-block">
                      <div className="text-emerald-600 font-bold text-lg mb-2">2021</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">First 100 Tours</h4>
                      <p className="text-gray-600">Reached milestone of 100 successful tours</p>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Spacer for even layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>

                {/* Milestone 3 */}
                <div className="flex items-center gap-8 md:flex-row">
                  {/* Content */}
                  <div className="flex-1 md:text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all inline-block">
                      <div className="text-emerald-600 font-bold text-lg mb-2">2022</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Regional Expansion</h4>
                      <p className="text-gray-600">Extended services across West Africa</p>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Spacer for even layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>

                {/* Milestone 4 */}
                <div className="flex items-center gap-8 md:flex-row-reverse">
                  {/* Content */}
                  <div className="flex-1 md:text-left">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all inline-block">
                      <div className="text-emerald-600 font-bold text-lg mb-2">2023</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Ambassador Program</h4>
                      <p className="text-gray-600">Launched community-driven growth initiative</p>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18 6.52l-2.25 4.45H13v6h3v-4.52l2.5-1.25V22h3z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Spacer for even layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>

                {/* Milestone 5 */}
                <div className="flex items-center gap-8 md:flex-row">
                  {/* Content */}
                  <div className="flex-1 md:text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all inline-block">
                      <div className="text-emerald-600 font-bold text-lg mb-2">2024</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">500+ Happy Travelers</h4>
                      <p className="text-gray-600">Celebrated serving over 500 satisfied customers</p>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Spacer for even layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full inline-block mb-4">
                The People Behind BoxOutcity
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Passionate professionals dedicated to making your travel dreams come true
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="group bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-emerald-500 hover:shadow-2xl transition-all">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                    alt="Adewale Johnson"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Adewale Johnson</h4>
                  <p className="text-emerald-600 font-semibold mb-3">Founder & CEO</p>
                  <p className="text-gray-600 text-sm">Passionate traveler with 10+ years of experience in tourism</p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="group bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-emerald-500 hover:shadow-2xl transition-all">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                    alt="Chioma Okafor"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Chioma Okafor</h4>
                  <p className="text-emerald-600 font-semibold mb-3">Head of Operations</p>
                  <p className="text-gray-600 text-sm">Expert in logistics and customer experience management</p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="group bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-emerald-500 hover:shadow-2xl transition-all">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
                    alt="Ibrahim Musa"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Ibrahim Musa</h4>
                  <p className="text-emerald-600 font-semibold mb-3">Lead Tour Guide</p>
                  <p className="text-gray-600 text-sm">Cultural ambassador and storyteller extraordinaire</p>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="group bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-emerald-500 hover:shadow-2xl transition-all">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
                    alt="Funmi Adeleke"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Funmi Adeleke</h4>
                  <p className="text-emerald-600 font-semibold mb-3">Marketing Director</p>
                  <p className="text-gray-600 text-sm">Creative strategist connecting travelers with adventures</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-emerald-700 px-4 relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-5 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-500 rounded-full opacity-10 animate-bounce" style={{animationDuration: '3s'}}></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose BoxOutcity?
              </h2>
              <p className="text-xl text-emerald-100">
                We're more than just a tour company
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <svg className="w-12 h-12 text-emerald-200 mb-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <h3 className="text-2xl font-bold text-white mb-4">Local Partnerships</h3>
                <p className="text-emerald-100">
                  We work directly with local communities, ensuring your travel supports authentic experiences and economic growth.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <svg className="w-12 h-12 text-emerald-200 mb-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <h3 className="text-2xl font-bold text-white mb-4">24/7 Support</h3>
                <p className="text-emerald-100">
                  Our team is always available to assist you before, during, and after your journey for complete peace of mind.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <svg className="w-12 h-12 text-emerald-200 mb-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18 6.52l-2.25 4.45H13v6h3v-4.52l2.5-1.25V22h3z"/>
                </svg>
                <h3 className="text-2xl font-bold text-white mb-4">Personalized Service</h3>
                <p className="text-emerald-100">
                  Every traveler is unique. We customize tours to match your interests, pace, and travel style perfectly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join hundreds of satisfied travelers who've discovered the magic of West Africa with BoxOutcity
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/tours"
                className="group bg-emerald-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
              >
                Explore Tours
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </a>
              <a
                href="/contact"
                className="bg-white border-2 border-emerald-600 text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg inline-flex items-center gap-2"
              >
                Get In Touch
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
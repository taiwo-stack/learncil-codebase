"use client"

import { Shield, Heart, Globe, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const features = [
  {
    icon: Globe,
    title: "Authentic Tours",
    description: "Experience Nigeria through the eyes of locals"
  },
  {
    icon: Heart,
    title: "Cultural Immersion",
    description: "Connect deeply with traditions and communities"
  },
  {
    icon: Shield,
    title: "Safe Experiences",
    description: "Your safety and comfort are our top priority"
  }
]

export default function AboutExperienceSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative Icons */}
      <div className="absolute top-32 left-20 text-emerald-300 opacity-30 hidden lg:block">
        <svg className="w-16 h-16 animate-spin" style={{ animationDuration: '20s' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-40 right-32 text-blue-300 opacity-30 hidden lg:block">
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>

      {/* Dotted Path Decoration */}
      <div className="absolute top-1/2 left-0 w-full h-px hidden lg:block">
        <div className="border-t-2 border-dashed border-emerald-200 opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">


          {/* Left Side - Visual Content */}
          <div className="relative order-2 lg:order-1" data-aos="fade-right">
            <div className="relative">
    
              {/* Main Image/Video Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                
                {!isVideoPlaying ? (
                  <>
                    {/* Photo Collage */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {/* Top Left - Large */}
                      <div className="col-span-2 relative h-64 sm:h-80 overflow-hidden group">
                        <img
                          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop"
                          alt="Tour experience"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>


                      {/* Bottom Left */}
                      <div className="relative h-40 sm:h-48 overflow-hidden group">
                        <img
                          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop"
                          alt="Cultural experience"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>    

               
                      {/* Bottom Right */}
                      <div className="relative h-40 sm:h-48 overflow-hidden group">
                        <img
                          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                          alt="Adventure moment"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>




                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
                    >
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 ml-1 group-hover:text-emerald-700" fill="currentColor" />
                    </button>
                  </>
                ) : (
                  <div className="aspect-video bg-gray-900">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="Tour experience video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>




              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Happy Travelers</div>
                </div>
              </div>

              {/* Decorative Compass */}
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
                <svg className="w-10 h-10 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
                </svg>
              </div>
            </div>
          </div>


          {/* Right Side - Text Content */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8" data-aos="fade-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
                About the Experience
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              We Take You Beyond the{" "}
              <span className="text-emerald-600 relative inline-block">
                Ordinary Journey
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="currentColor" strokeWidth="3"/>
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              At Boxout City Tour, we don't just show you Nigeria—we help you feel it. 
              From hidden local gems to iconic landmarks, every tour is crafted to connect 
              you authentically with our rich culture, warm people, and unforgettable stories.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group text-center sm:text-left"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 rounded-2xl mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/about">
                <button className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>



            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>4.9/5 Rating</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
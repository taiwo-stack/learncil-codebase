"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Piter Bowman",
    role: "Business CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    polaroidImage: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=600&fit=crop",
    testimonial: "Leverage Agile Frameworks To Provide A Robust Synopsis For High Level Overviews. Iterative In Approaches To Corporate Strategy Data Foster Go To Collaborative Thinking.",
    teamImages: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Travel Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    polaroidImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop",
    testimonial: "An incredible experience from start to finish! The attention to detail and personalized service made our vacation truly unforgettable. Highly recommend to anyone seeking adventure.",
    teamImages: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    ]
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Adventure Enthusiast",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    polaroidImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    testimonial: "Outstanding service and amazing destinations! Every moment was perfectly planned and executed. The team went above and beyond to ensure we had the trip of a lifetime.",
    teamImages: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    ]
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Family Traveler",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    polaroidImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop",
    testimonial: "Perfect for families! They took care of every detail, making our vacation stress-free and enjoyable. The kids had an amazing time, and so did we. Can't wait to book our next adventure!",
    teamImages: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    ]
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 6000) // Auto-advance every 6 seconds

    return () => clearInterval(interval)
  }, [currentIndex])

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setIsAnimating(false)
      }, 500)
    }
  }

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
        setIsAnimating(false)
      }, 500)
    }
  }

  const goToTestimonial = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsAnimating(false)
      }, 500)
    }
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gray-50 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-emerald-600 font-semibold mb-2 text-sm md:text-base">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real experiences from travelers who trusted us with their adventures
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center max-w-6xl mx-auto">
          {/* Left Side - Polaroid Image Stack */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1 min-h-[400px] sm:min-h-[450px]">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {/* Background Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-100 rounded-full blur-3xl opacity-30 -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>
              
              {/* Polaroid Stack */}
              <div className="relative pt-8">
                {/* Bottom Polaroid - Next Image Preview (slightly rotated and offset) */}
                <div className="absolute top-16 sm:top-20 -right-6 sm:-right-10 lg:-right-12 w-full bg-white p-3 sm:p-4 shadow-2xl transform rotate-6 z-0">
                  <div className="relative aspect-square overflow-hidden bg-gray-200">
                    <img
                      src={testimonials[(currentIndex + 1) % testimonials.length].polaroidImage}
                      alt="Next testimonial"
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                  <div className="h-12 sm:h-16"></div>
                </div>

                {/* Middle Polaroid - Second Next Preview (more rotated) */}
                <div className="absolute top-12 sm:top-14 -right-3 sm:-right-6 lg:-right-8 w-full bg-white p-3 sm:p-4 shadow-xl transform rotate-3 opacity-50 z-0">
                  <div className="aspect-square bg-gray-300"></div>
                  <div className="h-12 sm:h-16"></div>
                </div>

                {/* Main Polaroid with Current Image */}
                <div className={`relative bg-white p-4 sm:p-5 md:p-6 shadow-2xl transform transition-all duration-700 z-10 ${
                  isAnimating ? 'opacity-0 scale-95 rotate-12' : 'opacity-100 scale-100 -rotate-2'
                } hover:rotate-0 hover:scale-105`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-200">
                    <img
                      src={currentTestimonial.polaroidImage}
                      alt={`${currentTestimonial.name}'s travel moment`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    {/* Decorative Corner Tape Effect */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 border-t-4 border-r-4 border-white/70 opacity-80"></div>
                    <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 border-b-4 border-l-4 border-white/70 opacity-80"></div>
                  </div>
                  <div className="h-16 sm:h-20 flex items-center justify-center">
                    <p className="text-gray-600 italic text-xs sm:text-sm font-handwriting">
                      Adventure memories ✈️ #{currentIndex + 1}
                    </p>
                  </div>
                </div>

                {/* Decorative Airplane Icon - Repositioned */}
                <div className="absolute -top-2 -left-12 sm:-left-16 lg:-left-20 text-emerald-500 opacity-20 animate-pulse pointer-events-none">
                  <svg className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 transform -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>

                {/* Small Location Pin Decoration */}
                <div className="absolute -bottom-8 right-8 sm:right-12 bg-emerald-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg animate-bounce pointer-events-none">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Testimonial Content */}
          <div className="order-1 lg:order-2 relative space-y-6">
            <div className={`transition-all duration-500 ${
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              {/* Author Info at Top */}
              <div className="mb-6">
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {currentTestimonial.name}
                </h4>
                <p className="text-gray-600 text-base sm:text-lg lg:text-xl">
                  {currentTestimonial.role}
                </p>
              </div>

              {/* Testimonial Text with Quote Icon */}
              <div className="relative pr-8 sm:pr-12 lg:pr-16">
                {/* Quote Icon on the right */}
                <div className="absolute -top-8 right-0 pointer-events-none">
                  <Quote className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-emerald-500 opacity-10 fill-emerald-200" />
                </div>

                <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-6 leading-relaxed relative z-10">
                  {currentTestimonial.testimonial}
                </blockquote>
              </div>

              {/* Divider */}
              <div className="w-16 h-1 bg-emerald-500 mb-6"></div>

              {/* Author Image - Single */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-emerald-500">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">Verified Traveler</p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-6 pt-4">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToTestimonial(idx)}
                      className={`transition-all duration-300 ${
                        idx === currentIndex
                          ? 'w-10 h-2.5 bg-emerald-600'
                          : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                      } rounded-full`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
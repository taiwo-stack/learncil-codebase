"use client"

import { useState, useEffect } from 'react'
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop',
      title: 'TOUR TRAVEL & ADVENTURE',
      highlight: ' CAM',
    },
    {
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop',
      title: 'EXPLORE AMAZING DESTINATIONS',
      highlight: ' NOW',
    },
    {
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop',
      title: 'DISCOVER NEW EXPERIENCES',
      highlight: ' TODAY',
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] overflow-visible pb-32 md:pb-24">
      {/* Background Images with Smooth Transition */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Booking Badge */}
      <div className="absolute top-4 md:top-24 right-8 md:right-16 z-20 bg-green-500/20 backdrop-blur-sm border-2 border-green-400 px-6 py-3 rotate-3 hover:rotate-0 transition-transform duration-300">
        <Link href="/booking">
          <span className="text-white font-bold text-lg md:text-xl italic">Booking</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-8 md:py-12">
        {/* Top Content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-3xl">
            {/* Small Tagline */}
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Plane className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-semibold text-sm md:text-base italic">
                Explore the world
              </span>
            </div>

            {/* Main Title with Fixed Height */}
            <div className="relative mb-5 md:mb-6" style={{ minHeight: '145px'}}>
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <h1 className="text-[45px] sm:text-5xl md:text-6xl lg:text-[55px] font-bold text-white leading-tight">
                    {slide.title.split(slide.highlight)[0]}
                    <span className="text-green-400">{slide.highlight}</span>
                  </h1>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-200 text-base md:text-lg mb-6 md:mb-8 max-w-xl">
              Welcome to our tour platform! We are a professional and reliable travel company that offers a wide range of adventure services to unforgettable destinations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-lg uppercase tracking-wide">
                Book A Tour
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2">
                LIST A TOUR
                <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs">✓</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar - Positioned to Overlay Next Section */}
        <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 px-4 sm:px-6 lg:px-8 z-30">
          <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Destination */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
                  <MapPin className="h-4 w-4 text-green-500" />
                  Destination
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm">
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Calabar</option>
                  <option>Enugu</option>
                  <option>Obudu</option>
                  <option>Jos</option>
                  <option>Port Harcourt</option>
                  <option>Ondo</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm">
                  <option>Booking Type</option>
                  <option>Adventure</option>
                  <option>Cultural</option>
                  <option>beach</option>
                  <option>Wildlife Safari</option>
                  <option>Historical</option>
                  <option>City Tour</option>
                  <option>Hiking & Trekking</option>
                  <option>Food & Culinary</option>
                  <option>Relaxation & Wellness</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Duration
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm">
                  <option>2-4 days tour</option>
                  <option>5-7 days tour</option>
                  <option>1-2 weeks</option>
                  <option>2+ weeks</option>
                </select>
              </div>

              {/* Guests */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
                  <Users className="h-4 w-4 text-green-500" />
                  Guests
                </label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    defaultValue="0" 
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 whitespace-nowrap">
                    <Search className="h-5 w-5" />
                    <span className="hidden lg:inline">Search</span>
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
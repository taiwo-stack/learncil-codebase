"use client"

import { useState } from "react"
import { MapPin, Clock, Users, Star, Camera, Search, SlidersHorizontal, ArrowRight } from "lucide-react"

// Import from tours data file
// Make sure tours-data.ts is in src/data/tours-data.ts
// Then uncomment this line and remove the inline data below:
// import { toursDatabase, getCategories } from '@/data/tours-data'

// Temporary inline data - REPLACE THIS with import above in your actual project
interface Tour {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number
  duration: string
  category: string
  location: string
  badge?: string
  images: string[]
  maxParticipants: number
  rating: number
  reviews: number
}

 import { toursDatabase } from '@/data/tours-data'


// This should come from: import { getCategories } from '@/data/tours-data'
const getCategories = (): string[] => {
  const cats = toursDatabase.map(tour => tour.category)
  return ["All", ...Array.from(new Set(cats))]
}

const categories = getCategories()

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount)
}

export default function TourListingPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [duration, setDuration] = useState("all")

  // Filter tours based on selections
  const filteredTours = toursDatabase.filter(tour => {
    const matchesCategory = activeCategory === "All" || tour.category === activeCategory
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesPrice = true
    if (priceRange === "budget") matchesPrice = tour.price < 100000
    else if (priceRange === "mid") matchesPrice = tour.price >= 100000 && tour.price < 150000
    else if (priceRange === "luxury") matchesPrice = tour.price >= 150000

    let matchesDuration = true
    const days = parseInt(tour.duration)
    if (duration === "short") matchesDuration = days <= 4
    else if (duration === "medium") matchesDuration = days >= 5 && days <= 6
    else if (duration === "long") matchesDuration = days >= 7

    return matchesCategory && matchesSearch && matchesPrice && matchesDuration
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-white py-16 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')",
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/85 to-green-900/90"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Explore Amazing Tours
            </h1>
            <p className="text-xl lg:text-2xl text-emerald-50 mb-8">
              Discover unforgettable experiences across Nigeria
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Prices" },
                    { value: "budget", label: "Under ₦100k" },
                    { value: "mid", label: "₦100k - ₦150k" },
                    { value: "luxury", label: "₦150k+" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        checked={priceRange === option.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Duration</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "Any Duration" },
                    { value: "short", label: "1-4 days" },
                    { value: "medium", label: "5-6 days" },
                    { value: "long", label: "7+ days" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="duration"
                        value={option.value}
                        checked={duration === option.value}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setPriceRange("all")
                  setDuration("all")
                  setSearchQuery("")
                  setActiveCategory("All")
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all ${
                      activeCategory === category
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredTours.length}</span> tour{filteredTours.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Tours Grid */}
            {filteredTours.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <a
                    key={tour.id}
                    href={`/tour/${tour.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    {/* Image */}
                    <div className="relative h-52 lg:h-56 overflow-hidden">
                      <img
                        src={tour.images[0]}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          {tour.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex gap-2">
                        <button className="bg-white/90 hover:bg-white px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1 text-xs font-medium transition-all">
                          <Camera className="h-3.5 w-3.5" />
                          {tour.images.length}
                        </button>
                      </div>

                      {/* Badge at bottom */}
                      {tour.badge && (
                        <div className="absolute bottom-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                            tour.badge === "Trending" ? "bg-emerald-500 text-white" :
                            tour.badge === "Hot Sell" ? "bg-red-500 text-white" :
                            "bg-blue-500 text-white"
                          }`}>
                            {tour.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Location */}
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{tour.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 min-h-[56px] group-hover:text-emerald-600 transition-colors">
                        {tour.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(tour.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({tour.reviews} reviews)</span>
                      </div>

                      {/* Details */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-emerald-600 flex-shrink-0" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-emerald-600 flex-shrink-0" />
                          <span>{tour.maxParticipants} max</span>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(tour.price)}
                          </span>
                          <span className="text-sm text-gray-400 line-through ml-2">
                            {formatCurrency(tour.originalPrice)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm">View</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No tours found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms to find more tours.
                  </p>
                  <button
                    onClick={() => {
                      setPriceRange("all")
                      setDuration("all")
                      setSearchQuery("")
                      setActiveCategory("All")
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { MapPin, Clock, Users, Star, Camera, X, ChevronLeft, ChevronRight, Bookmark } from "lucide-react"

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

type Tab = string

const formatCurrency = (amount: number): string =>
  amount.toLocaleString("en-US", { style: "currency", currency: "NGN" })

const tours = [
  {
    id: "1",
    title: "Days and 6 nights From Moscow",
    description: "Experience the stunning coastal views and vibrant culture",
    price: 169,
    originalPrice: 199,
    duration: "5 days",
    category: "Featured",
    location: "Nigeria, Abuja",
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478827536114-da961b7f86a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
    ],
    maxParticipants: 12,
    rating: 5,
    reviews: 1
  },
  {
    id: "2",
    title: "Days and 6 nights From Moscow",
    description: "Adventure camping under the stars with scenic mountain views",
    price: 169,
    originalPrice: 199,
    duration: "5 days",
    category: "Featured",
    location: "Nigeria, Asaba",
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?w=800&h=600&fit=crop"
    ],
    maxParticipants: 12,
    rating: 5,
    reviews: 1
  },
  {
    id: "3",
    title: "Days and 6 nights From Moscow",
    description: "Thrilling surfing experience on pristine beaches",
    price: 169,
    originalPrice: 199,
    duration: "5 days",
    category: "Featured",
    location: "Nigeria, Uyo",
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
    ],
    maxParticipants: 12,
    rating: 5,
    reviews: 1
  },
  {
    id: "4",
    title: "Days and 6 nights From Moscow",
    description: "Conquer mountain peaks and witness breathtaking sunsets",
    price: 169,
    originalPrice: 199,
    duration: "5 days",
    category: "Featured",
    location: "Nigeria, Lagos",
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    maxParticipants: 12,
    rating: 5,
    reviews: 1
  }
]

const tabs = ["Adventure", "Cultural", "City Tour", "Relaxation", "Historical"]

export function FeaturedTours() {
  const [activeTab, setActiveTab] = useState("New York")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [tourTitle, setTourTitle] = useState("")

  interface OpenLightboxParams {
    images: string[]
    tourTitle: string
  }

  const openLightbox = ({ images, tourTitle }: OpenLightboxParams) => {
    setLightboxImages(images)
    setTourTitle(tourTitle)
    setCurrentImageIndex(0)
    setLightboxOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <p className="text-emerald-600 font-medium mb-2 text-sm sm:text-base">Explore the world</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 px-4">
            Amazing Featured Tour
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-green-500 italic">
            Across Nigeria, the Gaint of Africa
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 px-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium transition-all text-sm sm:text-base ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden group">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span className="bg-green-600 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                    {tour.category}
                  </span>
                </div>

                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1.5 sm:gap-2">
                  <button
                    onClick={() => openLightbox({ images: tour.images, tourTitle: tour.title })}
                    className="bg-white/90 hover:bg-white px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full shadow-md flex items-center gap-0.5 sm:gap-1 text-xs font-medium transition-all"
                  >
                    <Camera className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                    <span className="hidden xs:inline">{tour.images.length}</span>
                  </button>
                  <button className="bg-white/90 hover:bg-white p-1 sm:p-1.5 rounded-full shadow-md transition-all">
                    <Users className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                  </button>
                </div>

                {/* Badge at bottom */}
                {tour.badge && (
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                    <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                      tour.badge === "Trending" ? "bg-green-500 text-white" :
                      tour.badge === "Hot sell" ? "bg-red-500 text-white" :
                      "bg-blue-500 text-white"
                    }`}>
                      {tour.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                {/* Location */}
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
                  <MapPin className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 text-green-600 flex-shrink-0" />
                  <span className="truncate">{tour.location}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg mb-3 line-clamp-2 min-h-[48px] sm:min-h-[56px]">
                  {tour.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                  {[...Array(tour.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-xs sm:text-sm text-gray-600 ml-1">({tour.reviews} Review)</span>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b">
                  <div className="flex items-center">
                    <Clock className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 text-emerald-600 flex-shrink-0" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 text-emerald-600 flex-shrink-0" />
                    <span>{tour.maxParticipants} Person</span>
                  </div>
                </div>

                {/* Price and Bookmark */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                      {formatCurrency(tour.price)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 line-through ml-1.5 sm:ml-2">
                      {formatCurrency(tour.originalPrice)}
                    </span>
                  </div>
                  <button className="p-1.5 sm:p-2 hover:bg-emerald-50 rounded-full transition-colors">
                    <Bookmark className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
            VIEW ALL TOUR
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="h-6 sm:h-8 w-6 sm:w-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 p-2 sm:p-3 rounded-full z-10"
          >
            <ChevronLeft className="h-5 sm:h-8 w-5 sm:w-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 p-2 sm:p-3 rounded-full z-10"
          >
            <ChevronRight className="h-5 sm:h-8 w-5 sm:w-8" />
          </button>

          <div className="max-w-5xl w-full">
            <div className="text-center mb-3 sm:mb-4 px-2">
              <h3 className="text-white text-base sm:text-xl font-semibold mb-1 line-clamp-2">{tourTitle}</h3>
              <p className="text-gray-400 text-sm">
                {currentImageIndex + 1} / {lightboxImages.length}
              </p>
            </div>
            
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={lightboxImages[currentImageIndex]}
                alt={`${tourTitle} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4 justify-center overflow-x-auto pb-2 px-2 scrollbar-hide">
              {lightboxImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex
                      ? "border-emerald-500 scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
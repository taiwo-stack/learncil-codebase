"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { 
  MapPin, Clock, Users, Star, Camera, X, ChevronLeft, ChevronRight, 
  Calendar, Shield, CheckCircle, AlertCircle, MessageSquare, Share2,
  Heart, Phone, Mail, MapPinned, Utensils, Home, Ban, Info,
  ArrowRight, Minus, Plus, CreditCard, ArrowLeft
} from "lucide-react"


import { getTourById, Tour } from '@/data/tours-data'


const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount)
}

interface TourDetailsPageProps {
  tourId?: string // This comes from URL params: /tour/[id]
}

export default function TourDetailsPage({ tourId = "abuja-adventure-7days" }: TourDetailsPageProps) {
  const [tour, setTour] = useState<Tour | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [participants, setParticipants] = useState(1)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    participants: 1,
    specialRequests: ""
  })

  // Load tour data on mount or when tourId changes
  useEffect(() => {
    const tourData = getTourById(tourId)
    if (tourData) {
      setTour(tourData)
    }
  }, [tourId])

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Not Found</h2>
          <p className="text-gray-600 mb-6">The tour you're looking for doesn't exist.</p>
          <a 
            href="/tours"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tours
          </a>
        </div>
      </div>
    )
  }

  const totalPrice = tour.price * participants

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length)
  }

  const incrementParticipants = () => {
    if (participants < tour.maxParticipants) {
      setParticipants(participants + 1)
      setBookingData(prev => ({ ...prev, participants: participants + 1 }))
    }
  }

  const decrementParticipants = () => {
    if (participants > 1) {
      setParticipants(participants - 1)
      setBookingData(prev => ({ ...prev, participants: participants - 1 }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking data:", bookingData)
    alert(`Booking submitted! Total: ${formatCurrency(totalPrice)}. We'll contact you shortly to complete payment.`)
    setShowBookingModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <a 
            href="/tours"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Tours
          </a>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <section className="relative bg-black">
        <div className="container mx-auto px-4 py-6">
          {/* Main Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-4">
            <img
              src={tour.images[currentImageIndex]}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>

            {/* View All Photos Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-semibold transition-all"
            >
              <Camera className="w-5 h-5" />
              View all {tour.images.length} photos
            </button>

            {/* Badge */}
            {tour.badge && (
              <div className="absolute top-4 left-4">
                <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {tour.badge}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tour.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentImageIndex
                    ? "border-emerald-500 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title & Quick Info */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-emerald-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{tour.location}</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {tour.title}
                  </h1>
                  <p className="text-gray-600 mb-4">{tour.shortDescription}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-colors">
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </button>
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{tour.rating}</span>
                <span className="text-gray-600">({tour.reviews} reviews)</span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{tour.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Max People</p>
                    <p className="font-semibold text-gray-900">{tour.maxParticipants}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Departure</p>
                    <p className="font-semibold text-gray-900 text-sm">Every Sat</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-green-600">{tour.availability}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-md mb-6">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {["overview", "itinerary", "included", "location", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-semibold capitalize whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "text-emerald-600 border-b-2 border-emerald-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h3>
                      <p className="text-gray-700 leading-relaxed">{tour.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-emerald-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <MapPinned className="w-6 h-6 text-emerald-600" />
                          <h4 className="font-bold text-gray-900">Meeting Point</h4>
                        </div>
                        <p className="text-gray-700">{tour.meetingPoint}</p>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="w-6 h-6 text-blue-600" />
                          <h4 className="font-bold text-gray-900">Departure Time</h4>
                        </div>
                        <p className="text-gray-700">{tour.departureTime}</p>
                        <p className="text-sm text-gray-600 mt-1">Return: {tour.returnTime}</p>
                      </div>
                    </div>

                    {/* Tour Guide */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Your Tour Guide</h4>
                      <div className="flex items-center gap-4">
                        <img
                          src={tour.tourGuide.image}
                          alt={tour.tourGuide.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div className="flex-1">
                          <h5 className="text-xl font-bold text-gray-900">{tour.tourGuide.name}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold">{tour.tourGuide.rating}</span>
                            <span className="text-gray-600">• {tour.tourGuide.tours} tours</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tour.tourGuide.languages.map((lang: string) => (
                              <span key={lang} className="text-xs bg-white px-2 py-1 rounded-full text-gray-700">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === "itinerary" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Day by Day Itinerary</h3>
                    {tour.itinerary.map((day: any, idx: number) => (
                      <div key={idx} className="relative pl-8 pb-8 border-l-2 border-emerald-200 last:border-l-0 last:pb-0">
                        <div className="absolute -left-4 top-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">Day {day.day}: {day.title}</h4>
                          <p className="text-gray-700 mb-4">{day.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {day.activities.map((activity: string, i: number) => (
                              <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Included Tab */}
                {activeTab === "included" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        What's Included
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {tour.included.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Ban className="w-6 h-6 text-red-600" />
                        What's Not Included
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {tour.notIncluded.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
                            <Ban className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === "location" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Location</h3>
                    <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126074.30207334895!2d7.398533!3d9.0579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x99a8fe4168c50bc8!2sAbuja%2C%20Nigeria!5e0!3m2!1sen!2s!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-2">Meeting Point Details</h4>
                      <p className="text-gray-700 mb-4">{tour.meetingPoint}</p>
                      <p className="text-sm text-gray-600">
                        Our representative will be waiting at the arrivals hall with a Boxout Tours sign.
                        Please arrive 30 minutes before departure time.
                      </p>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                      <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                        Write a Review
                      </button>
                    </div>

                    {/* Review Summary */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-gray-900">{tour.rating}</div>
                          <div className="flex gap-0.5 mt-2 justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{tour.reviews} reviews</p>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-3 mb-2">
                              <span className="text-sm text-gray-600 w-8">{star} ★</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400"
                                  style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : 5}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="bg-gray-50 rounded-xl p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                                JD
                              </div>
                              <div>
                                <h5 className="font-bold text-gray-900">John Doe</h5>
                                <p className="text-sm text-gray-600">March 2024</p>
                              </div>
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">
                            Amazing experience! The tour was well-organized and our guide was fantastic. 
                            Highly recommend this tour to anyone visiting Abuja.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-emerald-600">
                    {formatCurrency(tour.price)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {formatCurrency(tour.originalPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">per person</p>
              </div>

              {/* Participants Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Number of Participants
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <button
                    onClick={decrementParticipants}
                    disabled={participants <= 1}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shadow-md"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{participants}</div>
                    <div className="text-xs text-gray-600">
                      {participants === 1 ? "Person" : "People"}
                    </div>
                  </div>
                  <button
                    onClick={incrementParticipants}
                    disabled={participants >= tour.maxParticipants}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Min: {tour.minParticipants} • Max: {tour.maxParticipants} participants
                </p>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-4"
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </button>

              {/* Contact Options */}
              <div className="space-y-3">
                <a
                  href="tel:+2348012345678"
                  className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
                <a
                  href="mailto:tours@boxout.com"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Professional tour guides</span>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Need Help?</h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Have questions about this tour? Our team is here to help!
                    </p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                      Contact Support →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Complete Your Booking</h3>
                  <p className="text-gray-600 mt-1">{tour.title}</p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleBookingSubmit} className="p-6">
              {/* Booking Summary */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-4">Booking Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Tour Package</span>
                    <span className="font-semibold">{formatCurrency(tour.price)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Participants</span>
                    <span className="font-semibold">{participants} {participants === 1 ? 'person' : 'people'}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Duration</span>
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="pt-3 border-t border-emerald-200 flex justify-between">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-emerald-600">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-4">Personal Information</h4>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={bookingData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={bookingData.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Tours depart {tour.departureDate}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                    placeholder="Dietary requirements, accessibility needs, etc."
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-emerald-600 hover:underline font-semibold">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-emerald-600 hover:underline font-semibold">
                      Cancellation Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Payment Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Payment Process</p>
                    <p>
                      After submitting this form, our team will contact you within 2 hours to confirm your booking 
                      and provide payment instructions via bank transfer or online payment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 p-3 rounded-full z-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 p-3 rounded-full z-10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-w-6xl w-full">
            <div className="text-center mb-4 px-2">
              <h3 className="text-white text-xl font-semibold mb-1">{tour.title}</h3>
              <p className="text-gray-400 text-sm">
                {currentImageIndex + 1} / {tour.images.length}
              </p>
            </div>
            
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={tour.images[currentImageIndex]}
                alt={`${tour.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-2 px-2">
              {tour.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
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
    </div>
  )
}
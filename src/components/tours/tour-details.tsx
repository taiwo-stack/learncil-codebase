"use client"

import { useEffect, useState } from 'react'
import { MapPin, Clock, Users, Star, Calendar, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tour } from '@/types'
const formatCurrency = (amount: number) =>
  amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });

interface TourDetailsProps {
  tourId: string
}

export function TourDetails({ tourId }: TourDetailsProps) {
  const [tour, setTour] = useState<Tour | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual API call
  const mockTour: Tour = {
    id: tourId,
    title: 'Lagos City Explorer',
    description: 'Experience the vibrant energy of Lagos, Nigeria\'s bustling commercial capital. This comprehensive city tour takes you through the heart of Lagos Island, Victoria Island, and Ikoyi, showcasing the city\'s rich history, modern architecture, and dynamic culture.',
    price: 25000,
    duration: '1 Day (8 hours)',
    category: 'city',
    location: 'Lagos, Nigeria',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    maxParticipants: 20,
    features: [
      'Professional English-speaking guide',
      'Air-conditioned transportation',
      'Traditional Nigerian lunch',
      'Entrance fees to attractions',
      'Bottled water throughout the day',
      'Small group experience (max 20 people)'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Lagos City Highlights',
        description: 'Full day exploration of Lagos key attractions',
        activities: [
          '9:00 AM - Pick up from hotel',
          '9:30 AM - National Theatre and Arts & Crafts Village',
          '11:00 AM - Lagos Island and Brazilian Quarter',
          '12:30 PM - Traditional lunch at local restaurant',
          '2:00 PM - Victoria Island business district',
          '3:30 PM - Lekki Conservation Centre',
          '5:00 PM - Return to hotel'
        ]
      }
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTour(mockTour)
      setLoading(false)
    }, 1000)
  }, [tourId])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!tour) {
    return <div>Tour not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {tour.images.slice(1, 3).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${tour.title} ${index + 2}`}
              className="w-full h-32 md:h-38 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Tour Info */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">
            {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm">4.9 (127 reviews)</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {tour.location}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-primary mr-2" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-primary mr-2" />
            <span>Max {tour.maxParticipants} people</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-primary mr-2" />
            <span>Daily departures</span>
          </div>
        </div>

        <div className="mb-6">
          <span className="text-3xl font-bold text-primary">
            {formatCurrency(tour.price)}
          </span>
          <span className="text-muted-foreground ml-2">per person</span>
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About This Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>What&apos;s Included</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tour.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Shield className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Itinerary */}
      <Card>
        <CardHeader>
          <CardTitle>Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          {tour.itinerary.map((day) => (
            <div key={day.day} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold mb-2">{day.title}</h3>
              <p className="text-muted-foreground mb-3">{day.description}</p>
              <ul className="space-y-1">
                {day.activities.map((activity, index) => (
                  <li key={index} className="text-sm text-muted-foreground pl-4 relative">
                    <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
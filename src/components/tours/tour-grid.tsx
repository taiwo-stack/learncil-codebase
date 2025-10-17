"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Users, Star } from 'lucide-react'
import { Tour } from '@/types'
const formatCurrency = (amount: number) =>
  amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });

export function TourGrid() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual API call
  const mockTours: Tour[] = [
    {
      id: '1',
      title: 'Lagos City Explorer',
      description: 'Discover the vibrant culture, bustling markets, and historic sites of Lagos',
      price: 25000,
      duration: '1 Day',
      category: 'city',
      location: 'Lagos, Nigeria',
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
      maxParticipants: 20,
      features: ['Professional Guide', 'Transportation', 'Local Lunch'],
      itinerary: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Abuja Heritage Tour',
      description: 'Explore the architectural marvels and government district of the capital',
      price: 35000,
      duration: '2 Days',
      category: 'cultural',
      location: 'Abuja, Nigeria',
      images: ['https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=400&h=300&fit=crop'],
      maxParticipants: 15,
      features: ['Hotel Accommodation', 'All Meals', 'Expert Guide'],
      itinerary: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '3',
      title: 'Calabar Adventure',
      description: 'Experience the beauty of Cross River and the famous Calabar Carnival',
      price: 50000,
      duration: '3 Days',
      category: 'adventure',
      location: 'Calabar, Nigeria',
      images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'],
      maxParticipants: 12,
      features: ['Adventure Activities', 'Accommodation', 'All Meals'],
      itinerary: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '4',
      title: 'Jos Plateau Getaway',
      description: 'Enjoy the cool climate and scenic beauty of the Jos Plateau',
      price: 40000,
      duration: '2 Days',
      category: 'getaway',
      location: 'Jos, Nigeria',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'],
      maxParticipants: 18,
      features: ['Scenic Views', 'Hotel Stay', 'Local Cuisine'],
      itinerary: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '5',
      title: 'Kano Ancient City',
      description: 'Explore the ancient walls and traditional markets of historic Kano',
      price: 30000,
      duration: '1 Day',
      category: 'cultural',
      location: 'Kano, Nigeria',
      images: ['https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop'],
      maxParticipants: 25,
      features: ['Historical Sites', 'Cultural Guide', 'Traditional Lunch'],
      itinerary: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '6',
      title: 'Yankari Safari',
      description: 'Wildlife adventure in Nigeria\'s premier game reserve',
      price: 60000,
      duration: '3 Days',
      category: 'adventure',
      location: 'Bauchi, Nigeria',
      images: ['https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=400&h=300&fit=crop'],
      maxParticipants: 10,
      features: ['Game Drives', 'Safari Lodge', 'Wildlife Photography'],
      itinerary: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTours(mockTours)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48 overflow-hidden">
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
              {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
            </div>
          </div>
          
          <CardHeader>
            <CardTitle className="line-clamp-1">{tour.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {tour.location}
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {tour.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {tour.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Max {tour.maxParticipants}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(tour.price)}
                </span>
                <span className="text-muted-foreground text-sm ml-1">per person</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">4.9</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/tours/${tour.id}`}>
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
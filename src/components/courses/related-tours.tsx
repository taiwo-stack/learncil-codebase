"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Star } from 'lucide-react'
import { Tour } from '@/types'
const formatCurrency = (amount: number) =>
  amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });

interface RelatedToursProps {
  currentTourId: string
}

export function RelatedTours({ currentTourId }: RelatedToursProps) {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual API call
  const mockRelatedTours: Tour[] = [
    {
      id: '2',
      title: 'Abuja Heritage Tour',
      description: 'Explore the architectural marvels and government district',
      price: 35000,
      duration: '2 Days',
      category: 'cultural',
      location: 'Abuja, Nigeria',
      images: ['https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=400&h=300&fit=crop'],
      maxParticipants: 15,
      features: [],
      itinerary: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '3',
      title: 'Calabar Adventure',
      description: 'Experience the beauty of Cross River and Calabar Carnival',
      price: 50000,
      duration: '3 Days',
      category: 'adventure',
      location: 'Calabar, Nigeria',
      images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'],
      maxParticipants: 12,
      features: [],
      itinerary: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]

  useEffect(() => {
    // Simulate API call to get related tours
    setTimeout(() => {
      const filteredTours = mockRelatedTours.filter(tour => tour.id !== currentTourId)
      setTours(filteredTours)
      setLoading(false)
    }, 1000)
  }, [currentTourId])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (tours.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {tour.duration}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm">4.9</span>
                </div>
              </div>
              
              <div className="mt-3">
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(tour.price)}
                </span>
                <span className="text-muted-foreground text-sm ml-1">per person</span>
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
    </div>
  )
}

"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Users, CreditCard, Send } from 'lucide-react'

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  participants: z.number().min(1, 'Must have at least 1 participant').max(20, 'Maximum 20 participants'),
  bookingDate: z.string().min(1, 'Please select a date'),
  specialRequests: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingFormProps {
  tourId: string
}

export function BookingForm({ tourId }: BookingFormProps) {
  const [loading, setLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  })

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const bookingData = {
        ...data,
        tourId,
        totalAmount: data.participants * 25000, // Mock price calculation
        status: 'pending',
        paymentStatus: 'pending'
      }
      
      console.log('Booking submitted:', bookingData)
      alert('Booking request submitted successfully! We will contact you soon.')
      reset()
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to submit booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Book This Tour
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              {...register('fullName')}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <Input
              {...register('phone')}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Participants</label>
            <Input
              {...register('participants', { valueAsNumber: true })}
              type="number"
              min="1"
              max="20"
              defaultValue="1"
            />
            {errors.participants && (
              <p className="text-sm text-red-600 mt-1">{errors.participants.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Preferred Date</label>
            <Input
              {...register('bookingDate')}
              type="date"
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.bookingDate && (
              <p className="text-sm text-red-600 mt-1">{errors.bookingDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
            <textarea
              {...register('specialRequests')}
              className="w-full min-h-[80px] px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Any special requirements or requests..."
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
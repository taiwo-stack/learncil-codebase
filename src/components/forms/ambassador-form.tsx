"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus } from 'lucide-react'

const ambassadorSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
  socialMedia: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  experience: z.string().min(50, 'Please describe your experience (minimum 50 characters)'),
  motivation: z.string().min(50, 'Please explain your motivation (minimum 50 characters)'),
})

type AmbassadorFormData = z.infer<typeof ambassadorSchema>

export function AmbassadorForm() {
  const [loading, setLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AmbassadorFormData>({
    resolver: zodResolver(ambassadorSchema)
  })

  const onSubmit = async (data: AmbassadorFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Ambassador application submitted:', data)
      alert('Application submitted successfully! We will review and get back to you soon.')
      reset()
    } catch (error) {
      console.error('Ambassador form error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-center justify-center">
          <UserPlus className="h-5 w-5 mr-2" />
          Join as Ambassador
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <Input
              {...register('fullName')}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
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
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <Input
              {...register('phone')}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <Input
              {...register('location')}
              placeholder="Your city/state"
            />
            {errors.location && (
              <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Social Media Profile</label>
            <Input
              {...register('socialMedia')}
              placeholder="Instagram, Twitter, or personal website URL"
            />
            {errors.socialMedia && (
              <p className="text-sm text-red-600 mt-1">{errors.socialMedia.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Travel Experience *</label>
            <textarea
              {...register('experience')}
              className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Tell us about your travel experience and what makes you a great ambassador..."
            />
            {errors.experience && (
              <p className="text-sm text-red-600 mt-1">{errors.experience.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Why Join Us? *</label>
            <textarea
              {...register('motivation')}
              className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="What motivates you to become our ambassador? How can you help promote our tours?"
            />
            {errors.motivation && (
              <p className="text-sm text-red-600 mt-1">{errors.motivation.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Apply Now
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

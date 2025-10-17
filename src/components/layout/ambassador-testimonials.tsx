import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

export function AmbassadorTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      role: 'Travel Blogger & Ambassador',
      earnings: '₦150,000+ monthly',
      comment: 'Being a TourismCo ambassador has been incredible! The commission structure is fair and the support team is amazing.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 2,
      name: 'James Thompson',
      role: 'Social Media Influencer',
      earnings: '₦200,000+ monthly',
      comment: 'The marketing resources provided are top-notch. I\'ve been able to refer many clients and earn substantial commissions.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 3,
      name: 'Aisha Bello',
      role: 'Corporate Ambassador',
      earnings: '₦120,000+ monthly',
      comment: 'The flexibility and support make this the perfect side hustle. I love sharing travel experiences with my network.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our successful ambassadors who are earning while sharing their passion for travel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary font-medium">{testimonial.earnings}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground">{testimonial.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

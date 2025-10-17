import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  Gift, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  Star 
} from 'lucide-react'

export function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Competitive Commissions',
      description: 'Earn up to 15% commission on every successful booking you refer. The more you refer, the more you earn!'
    },
    {
      icon: Gift,
      title: 'Exclusive Perks',
      description: 'Get access to exclusive tours, early bird discounts, and special packages available only to our ambassadors.'
    },
    {
      icon: BookOpen,
      title: 'Marketing Resources',
      description: 'Access professional marketing materials, social media content, and promotional tools to help you succeed.'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Work on your own terms and schedule. Perfect for bloggers, influencers, and travel enthusiasts.'
    },
    {
      icon: MessageCircle,
      title: 'Dedicated Support',
      description: 'Get personalized support from our ambassador team to help you maximize your earning potential.'
    },
    {
      icon: Star,
      title: 'Recognition Program',
      description: 'Top performing ambassadors get special recognition, bonuses, and opportunities for featured collaborations.'
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Ambassador Benefits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover all the amazing benefits of becoming a TourismCo Ambassador
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Users, DollarSign, Award, Globe } from 'lucide-react'

export function AmbassadorHero() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Commission',
      description: 'Up to 15% on every booking'
    },
    {
      icon: Globe,
      title: 'Free Tours',
      description: 'Exclusive access to our tours'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Top performer rewards'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join our ambassador network'
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-r from-primary/90 to-primary/70">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-6">Join Our Ambassador Program</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Share your love for travel and earn while helping others discover amazing destinations. 
            Join our community of passionate travel ambassadors today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white/90">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
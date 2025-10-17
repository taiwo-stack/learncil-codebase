import { Heart, Globe, Users, Award } from 'lucide-react'

export function BrandStory() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We believe travel transforms lives and creates lasting memories'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting you to amazing destinations across the world'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Building a community of travelers who share amazing experiences'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing exceptional service and unforgettable journeys'
    }
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Founded with a passion for exploration and discovery, we&apos;ve been creating
            unforgettable travel experiences for adventurers around the world. Our mission
            is to make travel accessible, enjoyable, and transformative for everyone.
          </p>
          <p className="text-lg text-muted-foreground">
            From humble beginnings to becoming a trusted name in tourism, we continue 
            to innovate and provide exceptional service that exceeds expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

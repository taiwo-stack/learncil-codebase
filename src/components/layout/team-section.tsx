import { Card, CardContent } from '@/components/ui/card'
import { Linkedin, Twitter, Mail } from 'lucide-react'

export function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Founder & CEO',
      bio: 'Passionate traveler with 15+ years of experience in tourism industry',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'john@tourismco.com'
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Head of Operations',
      bio: 'Expert in tour planning and customer experience management',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'jane@tourismco.com'
      }
    },
    {
      id: 3,
      name: 'David Wilson',
      role: 'Lead Tour Guide',
      bio: 'Local expert with deep knowledge of Nigerian culture and history',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'david@tourismco.com'
      }
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our passionate team of travel experts is dedicated to creating 
            extraordinary experiences for every traveler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center overflow-hidden">
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                
                <div className="flex justify-center space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

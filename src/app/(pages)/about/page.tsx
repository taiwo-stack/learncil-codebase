"use client"

import { useState } from "react"
import { 
  MapPin, Heart, Shield, Users, Award, Globe, 
  Camera, Compass, Star, Sparkles, ArrowRight,
  CheckCircle2, Target, Eye, Leaf, HandHeart, 
  Building2, ChevronRight
} from "lucide-react"
import SEO from "@/components/layout/SEO"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface Stat {
  number: string
  label: string
  icon: any
}

interface Value {
  icon: any
  title: string
  description: string
}

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
}

interface Milestone {
  year: string
  event: string
  description: string
  icon: any
}

export default function AboutUsPage() {
  const [activeValue, setActiveValue] = useState<number>(0)

  const stats: Stat[] = [
    { number: "500+", label: "Happy Travelers", icon: Users },
    { number: "50+", label: "Tour Destinations", icon: MapPin },
    { number: "100+", label: "Tours Completed", icon: CheckCircle2 },
    { number: "4.9", label: "Average Rating", icon: Star }
  ]

  const values: Value[] = [
    {
      icon: Heart,
      title: "Authentic Experiences",
      description: "We create genuine connections with local cultures, taking you beyond tourist spots to experience the real heart of each destination."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Your security is our priority. We maintain the highest safety standards with licensed guides, insured vehicles, and 24/7 support."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "We partner with local communities, ensuring tourism benefits the people and places you visit through sustainable practices."
    },
    {
      icon: Leaf,
      title: "Sustainable Travel",
      description: "We're committed to eco-friendly tourism that preserves natural beauty and cultural heritage for future generations."
    }
  ]

  const team: TeamMember[] = [
    {
      name: "Adewale Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Passionate traveler with 10+ years of experience in tourism"
    },
    {
      name: "Chioma Okafor",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Expert in logistics and customer experience management"
    },
    {
      name: "Ibrahim Musa",
      role: "Lead Tour Guide",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Cultural ambassador and storyteller extraordinaire"
    },
    {
      name: "Funmi Adeleke",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Creative strategist connecting travelers with adventures"
    }
  ]

  const milestones: Milestone[] = [
    { 
      year: "2020", 
      event: "BoxOutcity Founded", 
      description: "Started with a dream to showcase Nigeria's beauty",
      icon: Building2
    },
    { 
      year: "2021", 
      event: "First 100 Tours", 
      description: "Reached milestone of 100 successful tours",
      icon: CheckCircle2
    },
    { 
      year: "2022", 
      event: "Regional Expansion", 
      description: "Extended services across West Africa",
      icon: Globe
    },
    { 
      year: "2023", 
      event: "Ambassador Program", 
      description: "Launched community-driven growth initiative",
      icon: Users
    },
    { 
      year: "2024", 
      event: "500+ Happy Travelers", 
      description: "Celebrated serving over 500 satisfied customers",
      icon: Award
    }
  ]

  return (
    <>
      <SEO 
        title="About BoxOutcity | Premium Travel & Tourism Services"
        description="Discover our story, mission, and values. BoxOutcity is a licensed travel company offering authentic experiences across Nigeria and West Africa since 2020."
        keywords="about boxoutcity, travel company, nigeria tourism, west africa tours, travel agency, tour operator"
        canonical="https://learncil.com/about"
        ogTitle="About BoxOutcity - Your Trusted Travel Partner"
        ogDescription="Learn about our journey, team, and commitment to authentic travel experiences in West Africa"
        ogImage="https://learncil.com/about_leancil_1.png"
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle="About BoxOutcity - Premium Travel Experiences"
        twitterDescription="Discover our story and passion for travel"
        twitterImage="https://learncil.com/about_leancil_1.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About BoxOutcity",
          "url": "https://learncil.com/about",
          "description": "Learn about BoxOutcity's mission, vision, values, and team dedicated to providing exceptional travel experiences.",
          "mainEntity": {
            "@type": "Organization",
            "name": "BoxOutcity",
            "foundingDate": "2020",
            "description": "Premium travel company offering tours across Nigeria and West Africa",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lagos",
              "addressCountry": "NG"
            }
          }
        }}
      />
      
      <Breadcrumbs />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop"
              alt="Travel adventure"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/85 to-emerald-700/90"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Compass className="absolute top-20 left-10 w-16 h-16 text-emerald-300/20 animate-spin-slow" style={{animation: 'spin 20s linear infinite'}} />
            <MapPin className="absolute top-40 right-20 w-12 h-12 text-emerald-300/20 animate-bounce" />
            <Star className="absolute bottom-32 left-32 w-8 h-8 text-emerald-300/20 animate-pulse" />
            <Camera className="absolute bottom-20 right-40 w-10 h-10 text-emerald-300/20" style={{animation: 'bounce 3s ease-in-out infinite'}} />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <span className="text-white font-medium">Your Journey Starts Here</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              About <span className="text-emerald-300">BoxOutcity</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Creating unforgettable travel experiences that connect you with the soul of every destination
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="/tours"
                className="group bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all inline-flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Explore Our Tours
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/contact"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all shadow-xl"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 -mt-20 relative z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1"
                  >
                    <Icon className="w-10 h-10 text-emerald-600 mb-4 mx-auto" />
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full">
                    Our Story
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Turning Travel Dreams Into Reality
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  BoxOutcity was born from a simple belief: travel should be more than just visiting places—it should be about creating meaningful connections, discovering hidden gems, and experiencing authentic cultures.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Since 2020, we've been curating exceptional travel experiences across Nigeria and West Africa. What started as a passion project has grown into a community of travelers, guides, and local partners dedicated to showcasing the incredible diversity and beauty of our region.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Every tour we design is crafted with care, ensuring you don't just see a destination—you feel it, taste it, and carry it with you long after you return home.
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <Award className="w-12 h-12 text-emerald-600" />
                  <div>
                    <div className="font-bold text-gray-900">Licensed & Certified</div>
                    <div className="text-gray-600">Recognized by Nigeria Tourism Board</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=1000&fit=crop"
                    alt="Travel experiences"
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl max-w-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-2xl">4.9/5</div>
                      <div className="text-gray-600">Customer Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-white px-4 py-2 rounded-full inline-block mb-4">
                Our Purpose
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Mission & Vision
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be West Africa's most trusted and innovative travel company, inspiring a new generation of conscious travelers who explore with purpose, respect, and wonder.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To curate authentic, safe, and sustainable travel experiences that celebrate African culture, empower local communities, and create lifelong memories for every traveler.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full inline-block mb-4">
                What We Stand For
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at BoxOutcity
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer"
                    onMouseEnter={() => setActiveValue(index)}
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                      <Icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20 bg-gray-50 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-white px-4 py-2 rounded-full inline-block mb-4">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Milestones That Define Us
              </h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon
                  const isEven = index % 2 === 0
                  return (
                    <div key={index} className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Content */}
                      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all inline-block">
                          <div className="text-emerald-600 font-bold text-lg mb-2">{milestone.year}</div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h4>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>

                      {/* Icon Circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Spacer for even layout */}
                      <div className="flex-1 hidden md:block"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full inline-block mb-4">
                The People Behind BoxOutcity
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Passionate professionals dedicated to making your travel dreams come true
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-emerald-500 hover:shadow-2xl transition-all"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-emerald-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-emerald-700 px-4 relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-5 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-500 rounded-full opacity-10 animate-bounce" style={{animationDuration: '3s'}}></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose BoxOutcity?
              </h2>
              <p className="text-xl text-emerald-100">
                We're more than just a tour company
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <HandHeart className="w-12 h-12 text-emerald-200 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Local Partnerships</h3>
                <p className="text-emerald-100">
                  We work directly with local communities, ensuring your travel supports authentic experiences and economic growth.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <Shield className="w-12 h-12 text-emerald-200 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">24/7 Support</h3>
                <p className="text-emerald-100">
                  Our team is always available to assist you before, during, and after your journey for complete peace of mind.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <Users className="w-12 h-12 text-emerald-200 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Personalized Service</h3>
                <p className="text-emerald-100">
                  Every traveler is unique. We customize tours to match your interests, pace, and travel style perfectly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join hundreds of satisfied travelers who've discovered the magic of West Africa with BoxOutcity
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/tours"
                className="group bg-emerald-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
              >
                Explore Tours
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="bg-white border-2 border-emerald-600 text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg inline-flex items-center gap-2"
              >
                Get In Touch
                <ChevronRight className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
"use client"

import { useState } from "react"
import { Users, Trophy, Sparkles, ArrowRight, Star, TrendingUp, Gift, ChevronRight } from "lucide-react"

const ambassadorTiers = [
  {
    id: 1,
    name: "Silver",
    icon: Star,
    color: "from-gray-300 to-gray-400",
    borderColor: "border-gray-300",
    iconColor: "text-gray-600",
    bgColor: "bg-gray-50",
    description: "Students & Fresh Graduates",
    commission: "5%",
    highlight: "Perfect for beginners",
    benefits: ["Unique referral link", "5% commission", "Free badge", "Gift rewards"]
  },
  {
    id: 2,
    name: "Gold",
    icon: Trophy,
    color: "from-yellow-400 to-yellow-600",
    borderColor: "border-yellow-400",
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "Active Social Media Users",
    commission: "5%",
    highlight: "Quarterly tour treats",
    benefits: ["Everything in Silver", "Branded merchandise", "Quarterly getaway", "Social spotlight"]
  },
  {
    id: 3,
    name: "Platinum",
    icon: Sparkles,
    color: "from-blue-400 to-purple-600",
    borderColor: "border-purple-400",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Travel Enthusiasts & Creators",
    commission: "5%",
    highlight: "5K+ followers required",
    benefits: ["Premium tour kit", "Free access to tours", "Content collaboration", "Special rewards"]
  },
  {
    id: 4,
    name: "Diamond",
    icon: Sparkles,
    color: "from-cyan-400 via-blue-500 to-purple-600",
    borderColor: "border-cyan-400",
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    description: "Influencers & Top Performers",
    commission: "5%",
    highlight: "20K+ followers",
    benefits: ["Elite perks", "Luxury retreats", "Equity rewards", "Hall of Fame"]
  }
]

const stats = [
  { value: "500+", label: "Active Ambassadors" },
  { value: "₦2M+", label: "Paid in Commissions" },
  { value: "10K+", label: "Bookings Referred" }
]

export default function AmbassadorHighlight() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null)

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gray-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      {/* Floating Icons Animation */}
      <div className="absolute top-20 left-10 text-emerald-600 opacity-10 animate-bounce">
        <Users className="w-16 h-16" />
      </div>
      <div className="absolute bottom-20 right-20 text-emerald-600 opacity-10 animate-pulse">
        <Trophy className="w-20 h-20" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Join Our Team</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Become a Boxout Ambassador
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Turn your passion for travel into earnings. Share amazing experiences, earn commissions, 
            and unlock exclusive rewards as part of our ambassador family.
          </p>

          {/* Stats Bar */}
          
        </div>

        {/* Ambassador Tiers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ambassadorTiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.id}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`relative bg-white rounded-2xl p-6 border-2 ${tier.borderColor} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group ${
                  hoveredTier === tier.id ? 'ring-4 ring-emerald-200' : ''
                }`}
              >
                {/* Gradient Background Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Top Badge */}
                <div className={`inline-flex items-center gap-2 ${tier.bgColor} px-3 py-1.5 rounded-full mb-4`}>
                  <Icon className={`w-4 h-4 ${tier.iconColor}`} />
                  <span className={`text-xs font-bold ${tier.iconColor}`}>{tier.name}</span>
                </div>

                {/* Description */}
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {tier.description}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  {tier.highlight}
                </p>

                {/* Commission Badge */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
                  <div className="text-2xl font-bold text-emerald-600">{tier.commission}</div>
                  <div className="text-xs text-gray-600">Commission Rate</div>
                </div>

                {/* Benefits List */}
                <div className="space-y-2">
                  {tier.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                  {tier.benefits.length > 3 && (
                    <div className="text-xs text-emerald-600 font-semibold pt-1">
                      +{tier.benefits.length - 3} more benefits
                    </div>
                  )}
                </div>

                {/* Hover Effect Arrow */}
                <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                  hoveredTier === tier.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <ArrowRight className={`w-5 h-5 ${tier.iconColor}`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 sm:p-10 lg:p-12 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Gift className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Your Ambassador Journey?
            </h3>
            <p className="text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of ambassadors earning commissions, enjoying exclusive rewards, 
              and sharing incredible travel experiences with their networks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2">
                Explore Ambassador Program
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-all">
                Watch How It Works
              </button>
            </div>

            {/* Quick Facts */}
            <div className="mt-10 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-8 text-emerald-50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">No joining fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Bi-weekly payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Lifetime rewards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Trusted by ambassadors across Nigeria</p>
          <div className="flex justify-center items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="flex gap-0.5 ml-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 font-semibold ml-2">4.9/5 Ambassador Rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
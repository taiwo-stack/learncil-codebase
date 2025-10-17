"use client"

import { useState } from "react"
import { 
  ArrowRight, CheckCircle, Users, TrendingUp, Gift, 
  Star, Trophy, Award, Sparkles, Shield, Zap, 
  Camera, Share2, DollarSign, BarChart3, Clock,
  ChevronRight, ChevronDown, Play, MapPin, Heart
} from "lucide-react"

const ambassadorTiers = [
  {
    id: "silver",
    name: "Silver Ambassador",
    badge: "🥈",
    color: "from-gray-300 to-gray-500",
    borderColor: "border-gray-400",
    bgColor: "bg-gray-50",
    iconColor: "text-gray-600",
    targetAudience: "For Students, NYSC Corps Members, Fresh Graduates & Everyday Promoters",
    illustration: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
    requirements: [
      "Must be a student, NYSC corps member, fresh graduate, or everyday promoter",
      "Complete online registration and attend orientation",
      "Willing to actively share referral links",
      "Participate in at least 1-month training session",
      "Commit to quarterly reporting and dashboard tracking"
    ],
    benefits: [
      "Unique referral link",
      "Access to ALL Ambassadors Community",
      "5% commission on every confirmed booking",
      "Recruit minimum of 20 other Silver Ambassadors",
      "Earn Tour Points (TP) on 10 confirmed bookings",
      "Gift items: Data, Cash, VR Gadget, Pressing Iron, Standing Fan, Gas Cylinder, Electric Kettle",
      "Free Ambassadorial Badge",
      "Qualify to become Gold Ambassador"
    ]
  },
  {
    id: "gold",
    name: "Gold Ambassador",
    badge: "🥇",
    color: "from-yellow-400 to-yellow-600",
    borderColor: "border-yellow-500",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    targetAudience: "For Stay-home Mums, Affiliate Marketers, Employees & Everyday Promoters",
    illustration: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    requirements: [
      "Must be a stay-home mum, affiliate marketer, employee, or everyday promoter",
      "Must be a travel lover",
      "Must be active on any social media",
      "Complete online registration and attend orientation",
      "Participate in at least 1-month training session",
      "Commit to quarterly reporting and dashboard tracking"
    ],
    benefits: [
      "Unique referral link",
      "Access to ALL Ambassadors Community",
      "5% commission on every confirmed booking",
      "Free branded shirts and face caps after recruiting 20 Ambassadors",
      "Quarterly tour treat with the Boxout team",
      "20-49 TP = Free quarterly getaway",
      "50-99 TP = Electrical appliances",
      "Spotlight feature on Boxout's social media",
      "Free Ambassadorial Badge",
      "Qualify to become Platinum Ambassador"
    ]
  },
  {
    id: "platinum",
    name: "Platinum Ambassador",
    badge: "💎",
    color: "from-purple-400 to-purple-600",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    targetAudience: "For Nigerians in Diaspora, Travel Enthusiasts, Photographers & Culture Advocates",
    illustration: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
    requirements: [
      "Minimum 5,000 followers on at least one active social media platform (Instagram, TikTok, YouTube, or Twitter/X)",
      "Provide proof of 10+ confirmed travel/tour bookings",
      "Host at least 1 live online session promoting travel, culture, or lifestyle (last 3 months)",
      "Submit portfolio: minimum 2 videos or photo stories showing tourism/culture engagement",
      "Demonstrate leadership qualities (recruited, managed, or mentored a team)",
      "Commit to quarterly reporting and dashboard tracking"
    ],
    benefits: [
      "Unique referral link",
      "Access to ALL Ambassadors Community",
      "5% commission on every confirmed booking",
      "Premium Tour Kit (Shirt, Cargo Pants, Branded Backpack, ID Card)",
      "Highly discounted team trips & retreats",
      "Free access to select tours as media coverage opportunities",
      "Collaboration with Boxout marketing team for content co-creation",
      "Special 'Verified Platinum Badge' on profile/dashboard",
      "Exclusive invite to private influencer dinners & networking mixers",
      "Brand Sponsorship Deals opportunities",
      "100-199 TP = Gadgets valued at ₦100k",
      "200-299 TP = Gadgets valued at ₦150k",
      "Qualify to become Diamond Ambassador",
      "Certificate of recognition"
    ]
  },
  {
    id: "diamond",
    name: "Diamond Ambassador",
    badge: "💠",
    color: "from-cyan-400 via-blue-500 to-purple-600",
    borderColor: "border-cyan-500",
    bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
    iconColor: "text-cyan-600",
    targetAudience: "For Influencers, Bloggers, Content Creators & Social Media Managers",
    illustration: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop",
    requirements: [
      "Minimum 20,000 engaged followers on at least one social media platform",
      "Provide proof of 20+ confirmed travel/tour bookings",
      "Recognized thought leader or top performer in travel/culture/lifestyle (3+ consecutive months)",
      "Hosted or co-hosted at least 1 major travel/tour event",
      "Content portfolio: 6+ travel/cultural pieces with proven audience engagement",
      "Demonstrate leadership capacity (mentoring/managing teams)",
      "Commit to minimum 1-year active participation",
      "Willing to represent Boxout at industry events, conferences, or brand partnerships",
      "Commit to quarterly reporting and dashboard tracking"
    ],
    benefits: [
      "Unique referral link",
      "Access to ALL Ambassadors Community",
      "5% commission on every confirmed booking",
      "Quarterly leadership recognition award",
      "300-399 TP = Gadgets valued at ₦250k",
      "400-499 TP = Gadgets valued at ₦300k",
      "500-1000 TP = Gadgets + Special Award valued at ₦700k",
      "Opportunity to co-host selected Boxout tours",
      "Featured in Boxout's Ambassador Hall of Fame",
      "Leadership mentoring opportunities & priority invites to exclusive events",
      "Diamond-only retreat (annual luxury trip with Boxout leadership)",
      "VIP recognition on Boxout's website and official travel brochures",
      "Special media spotlight (featured interviews, documentary clips, brand story)",
      "Lifetime ambassador status (after 2 years of consistent top performance)",
      "Equity rewards - profit-sharing on special tours"
    ]
  }
]

const howItWorksSteps = [
  {
    number: "1",
    icon: Shield,
    title: "Sign Up & Verify",
    description: "Choose your category (Silver, Gold, Platinum, Diamond) and complete verification with required documents."
  },
  {
    number: "2",
    icon: Share2,
    title: "Share Your Referral Link",
    description: "Invite others to book tours or become ambassadors using your unique tracking link."
  },
  {
    number: "3",
    icon: TrendingUp,
    title: "Earn & Level Up",
    description: "Get paid bi-weekly, unlock rewards, and climb tiers automatically based on your performance."
  }
]

const whyJoinReasons = [
  {
    icon: DollarSign,
    title: "Earn While You Inspire",
    description: "Get 5% commission for every tour booking made through your unique link."
  },
  {
    icon: BarChart3,
    title: "Track & Grow Easily",
    description: "Your dashboard tracks referrals, points, and tier upgrades automatically."
  },
  {
    icon: Gift,
    title: "Unlock Exclusive Rewards",
    description: "From travel gadgets to luxury retreats — earn more as you grow."
  }
]

export default function AmbassadorPage() {
  const [selectedTier, setSelectedTier] = useState("silver")
  const [expandedTier, setExpandedTier] = useState<string | null>("silver")

  const currentTier = ambassadorTiers.find(tier => tier.id === selectedTier)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop')",
          }}
        ></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-300 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-300 rounded-full opacity-10 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-white rounded-full opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Ambassador Program</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Become a Boxout<br />City Tours Ambassador
          </h1>
          
          <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
            Earn, Explore, and Inspire Others to Travel Nigeria
          </p>
          
          <p className="text-lg mb-10 max-w-2xl mx-auto opacity-80">
            Join our community of explorers, storytellers, and travel influencers shaping tourism across Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#apply"
              className="group bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2"
            >
              Join the Program
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#tiers"
              className="text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-all flex items-center gap-2"
            >
              Explore Ambassador Levels
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>

          {/* Stats */}
          {/* <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1">500+</div>
              <div className="text-sm opacity-80">Active Ambassadors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1">₦2M+</div>
              <div className="text-sm opacity-80">Commissions Paid</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1">10K+</div>
              <div className="text-sm opacity-80">Bookings Referred</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Why Become an Ambassador */}
      <section className="py-16 lg:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Become an Ambassador?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a thriving community and unlock amazing benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyJoinReasons.map((reason, idx) => {
              const Icon = reason.icon
              return (
                <div key={idx} className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to start your ambassador journey
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600" style={{width: '85%', margin: '0 auto'}}></div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {howItWorksSteps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className="text-center">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-full text-2xl font-bold mb-6 shadow-xl">
                      <Icon className="w-10 h-10" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-emerald-900 rounded-full flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ambassador Categories - Main Section */}
      <section id="tiers" className="py-16 lg:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Ambassador Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the tier that best fits your profile and goals
            </p>
          </div>

          {/* Tier Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {ambassadorTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedTier === tier.id
                    ? `bg-gradient-to-r ${tier.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <span className="mr-2">{tier.badge}</span>
                {tier.name}
              </button>
            ))}
          </div>

          {/* Selected Tier Display */}
          {currentTier && (
            <div className={`bg-gradient-to-br ${currentTier.color} rounded-3xl overflow-hidden shadow-2xl`}>
              <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                {/* Left Side - Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
                  <img 
                    src={currentTier.illustration}
                    alt={currentTier.name}
                    className="relative rounded-2xl w-full h-full object-cover shadow-xl"
                  />
                  <div className="absolute top-4 left-4 text-6xl">{currentTier.badge}</div>
                </div>

                {/* Right Side - Content */}
                <div className="text-white">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">{currentTier.name}</h3>
                  <p className="text-lg mb-6 opacity-90">{currentTier.targetAudience}</p>

                  {/* Requirements */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Entry Requirements
                    </h4>
                    <ul className="space-y-2">
                      {currentTier.requirements.slice(0, 5).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                      {currentTier.requirements.length > 5 && (
                        <li className="text-sm font-semibold opacity-80 pl-6">
                          +{currentTier.requirements.length - 5} more requirements
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Benefits Preview */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {currentTier.benefits.slice(0, 4).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                      <li className="text-sm font-semibold opacity-80 pl-6">
                        +{currentTier.benefits.length - 4} more benefits
                      </li>
                    </ul>
                  </div>

                  <button className="mt-8 w-full bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    Apply for {currentTier.name}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Expandable Details for All Tiers */}
          <div className="mt-12 space-y-4">
            {ambassadorTiers.map((tier) => (
              <div key={tier.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{tier.badge}</span>
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-gray-900">{tier.name}</h4>
                      <p className="text-sm text-gray-600">{tier.targetAudience}</p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-400 transition-transform ${
                      expandedTier === tier.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedTier === tier.id && (
                  <div className="px-6 pb-6 grid md:grid-cols-2 gap-8">
                    {/* Full Requirements */}
                    <div>
                      <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        All Requirements
                      </h5>
                      <ul className="space-y-2">
                        {tier.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Full Benefits */}
                    <div>
                      <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Gift className="w-5 h-5 text-emerald-600" />
                        All Benefits
                      </h5>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking & Payments */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Track Your Success in Real-Time
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Every ambassador gets a personalized dashboard with live tracking, automated upgrades, and bi-weekly payments.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Unique Referral Code</h4>
                    <p className="text-gray-600 text-sm">Get your personalized tracking link to share</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Live Dashboard Tracking</h4>
                    <p className="text-gray-600 text-sm">Monitor bookings, Tour Points, and earnings in real-time</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Bi-weekly Payments</h4>
                    <p className="text-gray-600 text-sm">Receive your commissions every two weeks</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Auto-Upgrade System</h4>
                    <p className="text-gray-600 text-sm">Get notified when you qualify for tier upgrades</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-bold text-gray-900">Ambassador Dashboard</h5>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Referrals</span>
                      <span className="font-bold text-emerald-600">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tour Points (TP)</span>
                      <span className="font-bold text-emerald-600">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Commission Earned</span>
                      <span className="font-bold text-emerald-600">₦234,500</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
                        <Zap className="w-4 h-4" />
                        You're 3 bookings away from Gold!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 text-white text-center">
                  <p className="text-sm font-semibold mb-1">🎉 Congratulations!</p>
                  <p className="text-xs opacity-90">You've unlocked the Quarterly Getaway reward!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation & Verification Process */}
      <section className="py-16 lg:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple Verification & Auto-Upgrade
            </h2>
            <p className="text-lg text-gray-600">
              Our automated system makes your ambassador journey seamless
            </p>
          </div>

          <div className="relative">
            {/* Vertical Timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-600 hidden md:block"></div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0 relative z-10">
                  1
                </div>
                <div className="bg-white rounded-xl p-6 flex-1 shadow-lg border-2 border-gray-200">
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Sign Up & Choose Tier</h4>
                  <p className="text-gray-600">Complete online registration and select your ambassador category based on your profile.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0 relative z-10">
                  2
                </div>
                <div className="bg-white rounded-xl p-6 flex-1 shadow-lg border-2 border-gray-200">
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Upload ID or Proof</h4>
                  <p className="text-gray-600">Submit required verification documents (Student ID, NYSC card, social media proof, etc.).</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0 relative z-10">
                  3
                </div>
                <div className="bg-white rounded-xl p-6 flex-1 shadow-lg border-2 border-gray-200">
                  <h4 className="font-bold text-xl text-gray-900 mb-2">System Verifies Automatically</h4>
                  <p className="text-gray-600">Our admin team reviews and approves your application with one-click verification.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0 relative z-10">
                  4
                </div>
                <div className="bg-white rounded-xl p-6 flex-1 shadow-lg border-2 border-gray-200">
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Start Earning Immediately</h4>
                  <p className="text-gray-600">Get your unique referral link and begin sharing to earn commissions and Tour Points.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0 relative z-10">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 flex-1 shadow-lg border-2 border-yellow-300">
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Auto-Upgrade When Eligible</h4>
                  <p className="text-gray-600">Dashboard tracks your performance. When you meet criteria for a higher tier, you receive an auto-upgrade email!</p>
                  {/* <div className="mt-4 bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-gray-700 italic">"🎉 Congrats! You're now eligible for Gold Tier!"</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Quarterly Audits Notice */}
          <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Ongoing Performance Monitoring</h4>
                <p className="text-gray-600 text-sm">
                  We conduct quarterly audits to ensure program quality. Inactive ambassadors may be downgraded with advance notice and re-engagement support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Testimonials */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Join a Thriving Community
            </h2>
            <p className="text-lg text-gray-600">
              Hear from our successful ambassadors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Amina"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Amina R.</h4>
                  <p className="text-sm text-emerald-600 font-semibold">💎 Platinum Ambassador</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I started as a Silver Ambassador — now I'm leading tours across Africa! The support and rewards are incredible."
              </p>
              <div className="flex gap-0.5 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                  alt="David"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className="font-bold text-gray-900">David O.</h4>
                  <p className="text-sm text-yellow-600 font-semibold">🥇 Gold Ambassador</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Best side hustle ever! I've earned over ₦500k in commissions while doing what I love - sharing travel experiences."
              </p>
              <div className="flex gap-0.5 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  alt="Chioma"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Chioma N.</h4>
                  <p className="text-sm text-cyan-600 font-semibold">💠 Diamond Ambassador</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The Diamond retreat was life-changing! Plus, the equity rewards program is a game-changer for content creators like me."
              </p>
              <div className="flex gap-0.5 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Group Photo */}
          <div className="mt-12 relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=400&fit=crop"
              alt="Boxout Ambassador Community"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Our Amazing Community</h3>
                <p className="text-lg opacity-90">500+ ambassadors across Nigeria making travel accessible to everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="apply" className="py-16 lg:py-24 px-4 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-5 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-emerald-400 rounded-full opacity-5 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10 text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Gift className="w-10 h-10" />
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Travel, Earn, and Make an Impact?
          </h2>
          
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join the Boxout Ambassador Program today and start your journey to becoming a travel influencer in Nigeria.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            
            <a 
  href="/ambassador-signup" 
  className="group bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-3"
>
  Sign Up Now
  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
</a>
            
          </div>

          {/* Quick Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-1">No Joining Fees</h4>
              <p className="text-sm opacity-80">100% Free to join</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-1">Bi-weekly Payments</h4>
              <p className="text-sm opacity-80">Regular commission payouts</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-1">Auto-Upgrade System</h4>
              <p className="text-sm opacity-80">Climb tiers automatically</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-1">Lifetime Rewards</h4>
              <p className="text-sm opacity-80">Benefits that last forever</p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  )
}
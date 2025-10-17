"use client"

import { useState } from "react"
import { 
  ArrowRight, ArrowLeft, CheckCircle, Upload, 
  User, Mail, Phone, MapPin, Star, Trophy, 
  Award, Sparkles, Shield, AlertCircle, Instagram,
  Youtube, Twitter, Linkedin, Camera, FileText,
  X, Lock, Eye, EyeOff, LogIn
} from "lucide-react"

// Add keyframes for animation
const styles = `
  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-scale-in {
    animation: scale-in 0.3s ease-out;
  }
`

const tiers = [
  {
    id: "silver",
    name: "Silver Ambassador",
    badge: "🥈",
    color: "from-gray-300 to-gray-500",
    iconColor: "text-gray-600",
    bgColor: "bg-gray-50",
    description: "For Students, NYSC Corps Members, Fresh Graduates & Everyday Promoters",
    requirements: [
      "Student ID, NYSC card, or Valid ID",
      "1-month training commitment",
      "Quarterly reporting"
    ]
  },
  {
    id: "gold",
    name: "Gold Ambassador",
    badge: "🥇",
    color: "from-yellow-400 to-yellow-600",
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "For Stay-home Mums, Affiliate Marketers, Employees & Everyday Promoters",
    requirements: [
      "Valid ID",
      "Active on social media",
      "Travel lover & passionate promoter"
    ]
  },
  {
    id: "platinum",
    name: "Platinum Ambassador",
    badge: "💎",
    color: "from-purple-400 to-purple-600",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "For Travel Enthusiasts, Photographers & Culture Advocates",
    requirements: [
      "5,000+ social media followers",
      "Proof of 10+ travel bookings",
      "Content portfolio required"
    ]
  },
  {
    id: "diamond",
    name: "Diamond Ambassador",
    badge: "💠",
    color: "from-cyan-400 to-blue-600",
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    description: "For Influencers, Bloggers, Content Creators & Social Media Managers",
    requirements: [
      "20,000+ engaged followers",
      "Proof of 20+ travel bookings",
      "Major event hosting experience"
    ]
  }
]

export default function AmbassadorSignup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTier, setSelectedTier] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    
    // Tier Selection
    tier: "",
    category: "",
    
    // Social Media (for Platinum/Diamond)
    instagramHandle: "",
    instagramFollowers: "",
    tiktokHandle: "",
    tiktokFollowers: "",
    youtubeChannel: "",
    youtubeSubscribers: "",
    twitterHandle: "",
    twitterFollowers: "",
    
    // Experience (for Platinum/Diamond)
    travelBookings: "",
    liveSessionLink: "",
    portfolioLinks: "",
    leadershipExperience: "",
    eventHostingExperience: "",
    
    // Document Uploads
    idDocument: null as File | null,
    proofDocument: null as File | null,
    portfolioDocument: null as File | null,
    
    // Agreements
    agreeTraining: false,
    agreeReporting: false,
    agreeTerms: false
  })

  const totalSteps = selectedTier === "platinum" || selectedTier === "diamond" ? 5 : 4

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target?.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }))
    }
  }

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId)
    setFormData(prev => ({ ...prev, tier: tierId }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", loginData)
    // Handle login logic here - call your authentication API
    // On success, redirect to dashboard
    window.location.href = "/ambassador-dashboard"
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
    setShowSuccessModal(true)
  }

  const selectedTierData = tiers.find(t => t.id === selectedTier)

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gray-50">
        {/* Login/Signup Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl transform animate-scale-in max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {isLoginMode ? "Welcome Back!" : "Create Account"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {isLoginMode ? "Login to your ambassador dashboard" : "Join the Boxcity Ambassador Program"}
                  </p>
                </div>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-8 py-6">
                {isLoginMode ? (
                  // Login Form
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginInputChange}
                          required
                          className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={loginData.rememberMe}
                          onChange={handleLoginInputChange}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <a href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                        Forgot Password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-5 h-5" />
                      Login to Dashboard
                    </button>
                  </form>
                ) : (
                  // Signup Redirect Message
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <User className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Ready to Become an Ambassador?
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Start your journey by completing our ambassador application form. It only takes a few minutes!
                    </p>
                    <button
                      onClick={() => {
                        setShowLoginModal(false)
                        // Scroll to top to start the signup process
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="w-full bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      Start Application
                    </button>
                  </div>
                )}

                {/* Toggle between Login/Signup */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                    {" "}
                    <button
                      onClick={() => setIsLoginMode(!isLoginMode)}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      {isLoginMode ? "Sign up here" : "Login here"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform animate-scale-in">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Application Submitted Successfully!
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Thank you for applying to become a <strong>{selectedTierData?.name}</strong>! 
                We'll review your application and get back to you within <strong>48 hours</strong>.
              </p>

              {/* What's Next Section */}
              <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-emerald-900 mb-2 text-sm">What's Next?</h4>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Check your email for a confirmation message</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Our team will verify your documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>You'll receive your referral link and dashboard access</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href="/ambassadors"
                  className="block w-full bg-emerald-600 text-white text-center px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Back to Ambassador Program
                </a>
                <a
                  href="/"
                  className="block w-full border-2 border-gray-300 text-gray-700 text-center px-6 py-3 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  Go to Homepage
                </a>
              </div>

              {/* Reference Number */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  Application Reference: <span className="font-mono font-semibold text-gray-700">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs text-gray-600">Ambassador Application</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setShowLoginModal(true)
                    setIsLoginMode(true)
                  }}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <a href="/ambassadors" className="text-gray-600 hover:text-gray-700 font-semibold text-sm">
                  ← Back to Program
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div key={idx} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      idx + 1 < currentStep 
                        ? 'bg-emerald-600 text-white' 
                        : idx + 1 === currentStep 
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-200' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {idx + 1 < currentStep ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                    </div>
                  </div>
                  {idx < totalSteps - 1 && (
                    <div className={`h-1 flex-1 mx-2 transition-all ${
                      idx + 1 < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <span className={`text-xs ${currentStep === 1 ? 'font-semibold text-emerald-600' : 'text-gray-600'}`}>
                  Tier Selection
                </span>
              </div>
              <div className="flex-1 text-center">
                <span className={`text-xs ${currentStep === 2 ? 'font-semibold text-emerald-600' : 'text-gray-600'}`}>
                  Personal Info
                </span>
              </div>
              {(selectedTier === "platinum" || selectedTier === "diamond") && (
                <div className="flex-1 text-center">
                  <span className={`text-xs ${currentStep === 3 ? 'font-semibold text-emerald-600' : 'text-gray-600'}`}>
                    Social & Experience
                  </span>
                </div>
              )}
              <div className="flex-1 text-center">
                <span className={`text-xs ${currentStep === totalSteps - 1 ? 'font-semibold text-emerald-600' : 'text-gray-600'}`}>
                  Documents
                </span>
              </div>
              <div className="flex-1 text-center">
                <span className={`text-xs ${currentStep === totalSteps ? 'font-semibold text-emerald-600' : 'text-gray-600'}`}>
                  Review & Submit
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form - Continue with existing form structure... */}
        {/* I'll include the first step as example, rest remains the same */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Tier Selection */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Ambassador Tier</h2>
                  <p className="text-gray-600">Select the category that best matches your profile</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {tiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleTierSelect(tier.id)}
                      className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                        selectedTier === tier.id
                          ? `border-emerald-500 shadow-xl ring-4 ring-emerald-200 scale-105`
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedTier === tier.id
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-gray-300 bg-white'
                      }`}>
                        {selectedTier === tier.id && <CheckCircle className="w-5 h-5 text-white" />}
                      </div>

                      <div className="text-4xl mb-3">{tier.badge}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Requirements:</p>
                        {tier.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedTier && (
                  <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-900 mb-1">
                          Great choice! You've selected {selectedTierData?.name}
                        </p>
                        <p className="text-sm text-emerald-700">
                          Make sure you have the required documents ready before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Rest of the steps remain the same as original file... */}
            {/* Include all other steps here */}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous Step
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={currentStep === 1 && !selectedTier}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
                    currentStep === 1 && !selectedTier
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl hover:scale-105'
                  }`}
                >
                  Next Step
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 rounded-full font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit Application
                </button>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Need help? Contact us at{" "}
                <a href="mailto:ambassadors@boxouttours.com" className="text-emerald-600 hover:underline font-semibold">
                  ambassadors@boxouttours.com
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
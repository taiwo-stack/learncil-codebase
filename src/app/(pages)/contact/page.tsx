"use client"

import { useState } from "react"
import { 
  Mail, Phone, MapPin, Clock, Send, MessageCircle,
  Facebook, Instagram, Twitter, Linkedin, Youtube,
  CheckCircle2, AlertCircle, Loader2, ChevronDown,
  HeadphonesIcon, Globe, ArrowRight
} from "lucide-react"

interface ContactMethod {
  icon: any
  title: string
  details: string[]
  action: string
}

interface SocialLink {
  icon: any
  name: string
  url: string
  hoverColor: string
}

interface FAQ {
  question: string
  answer: string
}

interface OfficeHour {
  day: string
  hours: string
}

type FormStatus = "idle" | "loading" | "success" | "error"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setTimeout(() => setFormStatus("idle"), 3000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods: ContactMethod[] = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+234 812 345 6789", "+234 901 234 5678"],
      action: "tel:+2348123456789"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@boxoutcity.com", "support@boxoutcity.com"],
      action: "mailto:info@boxoutcity.com"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["+234 812 345 6789", "24/7 Available"],
      action: "https://wa.me/2348123456789"
    },
    {
      icon: MapPin,
      title: "Visit Office",
      details: ["123 Travel Street", "Lagos, Nigeria"],
      action: "https://maps.google.com"
    }
  ]

  const socialLinks: SocialLink[] = [
    { 
      icon: Facebook, 
      name: "Facebook", 
      url: "https://facebook.com/boxoutcity",
      hoverColor: "hover:bg-blue-600"
    },
    { 
      icon: Instagram, 
      name: "Instagram", 
      url: "https://instagram.com/boxoutcity",
      hoverColor: "hover:bg-pink-600"
    },
    { 
      icon: Twitter, 
      name: "Twitter", 
      url: "https://twitter.com/boxoutcity",
      hoverColor: "hover:bg-blue-400"
    },
    { 
      icon: Youtube, 
      name: "YouTube", 
      url: "https://youtube.com/boxoutcity",
      hoverColor: "hover:bg-red-600"
    },
    { 
      icon: Linkedin, 
      name: "LinkedIn", 
      url: "https://linkedin.com/company/boxoutcity",
      hoverColor: "hover:bg-blue-700"
    }
  ]

  const faqs: FAQ[] = [
    {
      question: "How do I book a tour?",
      answer: "You can book a tour directly through our website by selecting your preferred tour and filling out the booking form. Alternatively, you can contact us via phone, email, or WhatsApp for personalized assistance."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, card payments (Visa, Mastercard), mobile money, and online payment platforms like Paystack and Flutterwave. Full payment details will be provided upon booking confirmation."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 30+ days before tour date receive 100% refund. 15-29 days: 50% refund. Less than 14 days: no refund, but you can reschedule once at no extra cost (subject to availability)."
    },
    {
      question: "Are your tours suitable for families with children?",
      answer: "Yes! Many of our tours are family-friendly. We offer special rates for children and can customize tours to accommodate families. Please inform us about children's ages when booking so we can make appropriate arrangements."
    },
    {
      question: "What should I bring on the tour?",
      answer: "Essentials include comfortable clothing, sunscreen, hat, water bottle, camera, and any personal medications. We'll send you a detailed packing list specific to your chosen tour upon booking confirmation."
    },
    {
      question: "Do you provide travel insurance?",
      answer: "Travel insurance is not automatically included but is highly recommended. We can connect you with trusted insurance providers or you can arrange your own coverage before the tour date."
    }
  ]

  const officeHours: OfficeHour[] = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/85 to-emerald-700/90"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Mail className="absolute top-20 left-10 w-12 h-12 text-emerald-300/20 animate-bounce" />
          <Phone className="absolute top-32 right-20 w-10 h-10 text-emerald-300/20 animate-pulse" />
          <MessageCircle className="absolute bottom-32 left-1/4 w-14 h-14 text-emerald-300/20 animate-bounce" style={{animationDelay: '0.5s'}} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
            <HeadphonesIcon className="w-5 h-5 text-emerald-300" />
            <span className="text-white font-medium">We're Here to Help</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Get In <span className="text-emerald-300">Touch</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-4">
            Have questions? We'd love to hear from you
          </p>
          
          <p className="text-lg text-gray-300">
            Send us a message and we'll respond within 24 hours
          </p>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 -mt-16 relative z-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <a
                  key={index}
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{method.title}</h3>
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                  <div className="mt-4 text-emerald-600 font-semibold text-sm flex items-center gap-1">
                    Contact Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Form & Info */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and our team will get back to you within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors"
                        placeholder="+234 812 345 6789"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Tour Booking Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="custom">Custom Tour Request</option>
                      <option value="ambassador">Ambassador Program</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : formStatus === "success" ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Success/Error Messages */}
                  {formStatus === "success" && (
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-900">Message sent successfully!</p>
                        <p className="text-sm text-emerald-700">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  {formStatus === "error" && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900">Something went wrong!</p>
                        <p className="text-sm text-red-700">Please try again or contact us directly.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office Hours */}
              <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                      <span className="font-semibold text-gray-900">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>24/7 WhatsApp support available for urgent matters</span>
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
                <p className="text-gray-600 mb-6">
                  Stay connected and get the latest updates on our tours, special offers, and travel tips
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center transition-all ${social.hoverColor} hover:text-white`}
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Emergency?</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  If you're currently on a tour and need immediate assistance:
                </p>
                <a 
                  href="tel:+2348123456789"
                  className="block w-full bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-red-700 transition-colors"
                >
                  Call Emergency Line
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600">
              123 Abasanjo Road, Abeokuta, Nigeria
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">
            {/* Placeholder for Google Maps */}
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-gray-100/50"></div>
              <div className="relative z-10 text-center p-8">
                <MapPin className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Boxoutcity Tours Office</h3>
                <p className="text-gray-600 mb-4">123 Obasanjo Road, Abeokuta</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Get Directions
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              {/* In production, replace with actual Google Maps iframe */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full inline-block mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-emerald-500 transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-bold text-lg text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              Send us a message
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      
    </div>
  )
}
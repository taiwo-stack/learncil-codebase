"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { 
  Mail, Phone, MapPin, Send, Facebook, Twitter, 
  Instagram, ArrowUp, CheckCircle2
} from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    
    setSubscribeStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success')
            setEmail('')
      setAgreed(false)
      setTimeout(() => setSubscribeStatus('idle'), 3000)
    }, 1500)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigationLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Courses', id: 'courses' },
    { label: 'Booking', id: 'booking' },
    { label: 'Testimonials', id: 'testimonials' }
  ]

  return (
    <footer className="bg-[#1e3a8a] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link
  href="/"
  className="inline-flex items-center justify-center bg-white rounded-2xl px-3 py-2 shadow-sm"
>
  <Image
    src="/logolearcil.png"
    alt="Learncil Logo"
    width={80}
    height={40}
    className="h-10 sm:h-12 w-auto object-contain"
    priority
  />
</Link>

            <p className="text-blue-200 mt-4 text-sm mb-6 leading-relaxed">
              Empowering learners worldwide with quality education and innovative learning solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <a href="mailto:info@learncil.com" className="hover:text-blue-300 transition-colors">
                  info@learncil.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <a href="tel:+234 7067900116" className="hover:text-blue-300 transition-colors">
                  +234 706 790 0161
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <span> Zone 1, 1 Dakar St, Wuse 904101, Abuja, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="text-blue-200 hover:text-white transition-colors text-sm text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-blue-200 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Newsletter</h4>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-blue-900/50 border border-blue-700 text-white placeholder:text-blue-300 focus:outline-none focus:border-blue-400 text-sm"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={!agreed || subscribeStatus === 'loading'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {subscribeStatus === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-blue-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-blue-900/50"
                />
                <span className="text-blue-200 text-xs leading-tight">
                  I agree to all your terms and policies
                </span>
              </label>

              {subscribeStatus === 'success' && (
                <div className="text-blue-300 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Successfully subscribed!
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.facebook.com/share/178xxmY14n/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              {/* <a
                href="https://twitter.com/learncil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a> */}
              <a
                href="https://www.instagram.com/learncilacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href=" https://www.linkedin.com/company/learncil-academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1e40af] py-6 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm">
              Copyright © 2025 by <Link href="/" className="text-white hover:text-blue-300 font-semibold">LearnCil</Link>. All Rights Reserved
            </p>
            
            {/* Bottom Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/learncil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/learncil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/learncil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/learncil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
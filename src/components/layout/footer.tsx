"use client"

import Link from 'next/link'
import { useState } from 'react'
import { 
  Mail, Phone, MapPin, Send, Facebook, Twitter, 
  Instagram, ArrowUp, CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
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

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Blog Insights', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1478131143081-80f7f8?w=200&h=200&fit=crop'
  ]

  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none">
                <path d="M20 5L5 15V25L20 35L35 25V15L20 5Z" fill="#10B981" opacity="0.3"/>
                <path d="M20 10L10 17V27L20 34L30 27V17L20 10Z" fill="#10B981"/>
                <circle cx="20" cy="20" r="4" fill="white"/>
              </svg>
              <span className="text-xl font-bold text-white">Boxoutcity</span>
            </Link>
            
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              The world's first and largest digital market for crypto collectibles and non-fungible
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="mailto:info@boxoutcity.com" className="hover:text-emerald-500 transition-colors">
                  Info@boxoutcity.Com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="tel:6845550102490" className="hover:text-emerald-500 transition-colors">
                  684 555-0102 490
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>6391 Elgin St. Celina, NYC 10299</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Services Req</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Gallery</h4>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((image, index) => (
                <Link 
                  key={index} 
                  href="/gallery"
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Adress"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-[#2a2a2a] border border-gray-700 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={!agreed || subscribeStatus === 'loading'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="mt-1 w-4 h-4 rounded border-gray-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 bg-[#2a2a2a]"
                />
                <span className="text-gray-400 text-xs leading-tight">
                  I agree to all your terms and policies
                </span>
              </label>

              {subscribeStatus === 'success' && (
                <div className="text-emerald-500 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Successfully subscribed!
                </div>
              )}
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://facebook.com/boxcity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/boxcity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/boxcity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://pinterest.com/boxcity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0f0f0f] py-6 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              Copyright © 2024 by <Link href="/" className="text-emerald-500 hover:text-emerald-400">Boxoutcity</Link>. All Rights Reserved
            </p>
            
            {/* Bottom Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/boxcity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/boxcity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://vimeo.com/boxcity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 003.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                </svg>
              </a>
              <a
                href="https://pinterest.com/boxcity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-colors"
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
"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, Calendar, Phone, Mail, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fa } from 'zod/v4/locales'
import Image from 'next/image'


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const navigationItems = [
    { href: '/', label: 'Home', hasDropdown: false },
    { href: '/tours', label: 'Tour', hasDropdown: false },
    {href: '/ambassadors', label: 'Ambassador Program', hasDropdown: false},
    { href: '/blog', label: 'Blog', hasDropdown: false },
    { href: '/gallery', label: 'Gallery', hasDropdown: false },
    {href: '/about', label: 'About Us', hasDropdown: false},
    { href: '/contact', label: 'Contact Us', hasDropdown: false },
    
   
   
  ]

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-12 text-sm">
            {/* Left side - Contact Info */}
            <div className="hidden lg:flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span>Thursday, Mar 26, 2021</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-600" />
                <a href="mailto:info@boxoutcity.Com" className="hover:text-green-600">Info@boxoutcity.Com</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-600" />
                <a href="tel:6845550102490" className="hover:text-green-600">684 555-0102 490</a>
              </div>
            </div>

            {/* Right side - Booking & Social */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <Link href="/booking" className="text-green-600 hover:text-green-700 font-medium">
                  Booking Now
                </Link>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Follow Us:</span>
              <div className="flex items-center space-x-2">
                <a href="#" className="text-gray-600 hover:text-green-600">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center">
                <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none">
                  <path d="M20 5L5 15V25L20 35L35 25V15L20 5Z" fill="#10B981" opacity="0.2"/>
                  <path d="M20 10L10 17V27L20 34L30 27V17L20 10Z" fill="#10B981"/>
                  <circle cx="20" cy="20" r="4" fill="white"/>
                </svg>
                <span className="ml-2 text-2xl font-bold text-gray-900">Boxoutcity</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors font-medium py-8"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                </div>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* <button className="text-gray-700 hover:text-green-600">
                <span className="flex items-center space-x-1">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </button> 
              <div className="flex items-center space-x-2 border-l pl-4">
                <span className="text-gray-700 flex items-center space-x-1">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>English</span>
                  <ChevronDown className="h-4 w-4" />
                </span>
              </div>*/}

             

              <div className="flex items-center space-x-2">
                
                <Link 
                    href="/ambassador-signup" 
                    className="font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors inline-flex items-center justify-center gap-1"
                  >
                    Become Ambassador
                  </Link>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {/* Mobile Contact Info */}
            {/* <div className="py-3 space-y-2 border-b border-gray-200 mb-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-green-600" />
                <a href="mailto:Info@Webmail.Com">Info@Webmail.Com</a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-green-600" />
                <a href="tel:6845550102490">684 555-0102 490</a>
              </div>
            </div> */}

            {/* Mobile Menu Items */}
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-3 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-medium">{item.label}</span>
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}

            <div className="flex items-center justify-between px-3 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors">
                <Link  className="font-medium" href="/account">My Account</Link>
            </div>

            {/* Mobile Booking Button */}
            <div className="pt-3 border-t border-gray-200 flex gap-4">
              <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                <Link href="/booking">Booking Now</Link>
              </Button>
              <Link 
  href="/ambassador-signup" 
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md text-center transition-colors inline-flex items-center justify-center"
>
  Become Ambassador
</Link>
            </div>


            {/* Mobile Language & Currency */}
            {/* <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <button className="flex items-center space-x-1 text-sm text-gray-700">
                <span>English</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center space-x-1 text-sm text-gray-700">
                <span>USD</span>
                <ChevronDown className="h-4 w-4" />
              </button> 
            </div>*/}
          </div>
        </div>
      )}
    </nav>
  )
}
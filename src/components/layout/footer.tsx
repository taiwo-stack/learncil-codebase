"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  Mail, Phone, MapPin, Send, Facebook, Instagram, 
  ArrowUp, CheckCircle2, X
} from 'lucide-react'

export function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [showPolicy, setShowPolicy] = useState(false)
  const [legalSettings, setLegalSettings] = useState<{ privacy_policy_url?: string, terms_of_service_url?: string }>({});

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(json => {
        if (json.data) setLegalSettings(json.data);
      })
      .catch(console.error);
  }, []);

  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = async () => {
    if (!email || !agreed) return

    setSubscribeStatus('loading')

    try {
      // Send to Google Sheets via Google Apps Script Web App
      const response = await fetch('https://script.google.com/macros/s/AKfycbzXy_fywzD23e5mDkdiMBgBkJADkveDdnG9NRC92DtZYl1CgHNIR92XbgdliBPFJjgl/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          agreedToPolicy: agreed,
        }),
      })

      setSubscribeStatus('success')
      setEmail('')
      setAgreed(false)
      
      setTimeout(() => {
        setSubscribeStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Subscription error:', error)
      setSubscribeStatus('error')
      
      setTimeout(() => {
        setSubscribeStatus('idle')
      }, 3000)
    }
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

  const handleNavigation = (id: string) => {
    if (id === 'about') {
      import('next/navigation').then(({ useRouter }) => {
        // Since Footer is a component, we use the router from the hook if available
        // or just use window.location if we want to be simple, but the component already has usePathname.
      });
      // Actually, it's easier to just use Link or router.push
      window.location.href = '/about';
    } else {
      if (pathname === '/') {
        scrollToSection(id);
      } else {
        window.location.href = `/#${id}`;
      }
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
                <a href="tel:+2347067900161" className="hover:text-blue-300 transition-colors">
                  +234 706 790 0161
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <span>Block 1, Dakar Street, Wuse Zone 1, Abuja, Nigeria</span>
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
                    onClick={() => handleNavigation(link.id)}
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
                <Link href={legalSettings.privacy_policy_url || "/privacy"} target={legalSettings.privacy_policy_url ? "_blank" : "_self"} className="text-blue-200 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={legalSettings.terms_of_service_url || "/terms"} target={legalSettings.terms_of_service_url ? "_blank" : "_self"} className="text-blue-200 hover:text-white transition-colors text-sm">
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
                  I agree to the{' '}
                  <button
                    onClick={() => setShowPolicy(true)}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>

              {subscribeStatus === 'success' && (
                <div className="text-green-400 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Successfully subscribed!
                </div>
              )}
              
              {subscribeStatus === 'error' && (
                <div className="text-red-400 text-xs">
                  Subscription failed. Please try again.
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
              <a
                href="https://www.instagram.com/learncilacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/learncil-academy/"
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

      {/* Privacy Policy Modal */}
      {showPolicy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
              <button
                onClick={() => setShowPolicy(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">
                    Newsletter Subscription Privacy Policy
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">1. Information We Collect</h5>
                  <p className="text-sm leading-relaxed">
                    When you subscribe to our newsletter, we collect your email address. This is the only personal information we collect through the newsletter subscription form.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">2. How We Use Your Information</h5>
                  <p className="text-sm leading-relaxed mb-2">
                    We use your email address to:
                  </p>
                  <ul className="text-sm space-y-1 ml-4 list-disc">
                    <li>Send you our newsletter with educational updates, tips, and resources</li>
                    <li>Inform you about new courses, features, and services at LearnCil Academy</li>
                    <li>Share promotional offers and special announcements</li>
                    <li>Communicate important updates about our platform</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">3. Data Storage and Security</h5>
                  <p className="text-sm leading-relaxed">
                    Your email address is securely stored in our database. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">4. Sharing Your Information</h5>
                  <p className="text-sm leading-relaxed">
                    We do not sell, trade, or rent your email address to third parties. We may share your information only with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">5. Your Rights</h5>
                  <p className="text-sm leading-relaxed mb-2">You have the right to:</p>
                  <ul className="text-sm space-y-1 ml-4 list-disc">
                    <li>Unsubscribe from our newsletter at any time by clicking the unsubscribe link in any email</li>
                    <li>Request access to the personal information we hold about you</li>
                    <li>Request correction or deletion of your personal information</li>
                    <li>Object to the processing of your personal information</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">6. Email Frequency</h5>
                  <p className="text-sm leading-relaxed">
                    We typically send newsletters on a weekly or bi-weekly basis. You can adjust your email preferences or unsubscribe at any time.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">7. Children's Privacy</h5>
                  <p className="text-sm leading-relaxed">
                    Our newsletter is intended for parents and guardians. We do not knowingly collect email addresses from children under 13 years of age.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">8. Changes to This Policy</h5>
                  <p className="text-sm leading-relaxed">
                    We may update this privacy policy from time to time. We will notify subscribers of any material changes by email or through a notice on our website.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">9. Contact Us</h5>
                  <p className="text-sm leading-relaxed">
                    If you have any questions about this privacy policy or wish to exercise your rights, please contact us at:
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Email:</strong> info@learncil.com<br />
                    <strong>Website:</strong> learncil.com
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-900">
                    <strong>By subscribing to our newsletter, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of your email address as described.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowPolicy(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

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
                href="https://www.facebook.com/share/178xxmY14n/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/learncilacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/learncil-academy/"
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
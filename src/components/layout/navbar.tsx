'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, ShoppingCart, Heart, ChevronDown, Phone, Mail, Clock, 
  Menu, X, User, Facebook, Twitter, Linkedin, Youtube, LogOut, 
  Instagram, BookOpen
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Hide the navbar completely on dashboard pages to prevent duplicate headers
  const isDashboard = pathname?.includes('/dashboard');

  // Track Supabase auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEnrollClick = () => {
    scrollToSection('booking');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu after navigation
    setMobileMenuOpen(false);
  };

  interface NavItem {
    label: string;
    sectionId: string;
    href: string;
    hasDropdown?: boolean;
  }

  const handleNavItemClick = (item: NavItem) => {
    if (item.href) {
      if (item.href === '/about') {
        router.push('/about');
      } else if (item.href.startsWith('/#')) {
        if (pathname === '/') {
          scrollToSection(item.sectionId);
        } else {
          router.push(item.href);
        }
      } else if (item.href === '/') {
        if (pathname === '/') {
          scrollToSection('home');
        } else {
          router.push('/');
        }
      }
    } else if (item.sectionId) {
      scrollToSection(item.sectionId);
    }
    setMobileMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { label: 'HOME', sectionId: 'home', href: '/' },
    { label: 'SERVICES', sectionId: 'services', href: '/#services' },
    { label: 'ABOUT US', sectionId: 'about', href: '/about' },
    { label: 'COURSES', sectionId: 'courses', href: '/#courses' },
    { label: 'TESTIMONIALS', sectionId: 'testimonials', href: '/#testimonials' },
  ];

  if (isDashboard) return null;

  return (
    <header className="w-full bg-white shadow-sm relative z-50">
      {/* Top Bar */}
      <div className="bg-[#1C3C68] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Top Bar */}
          <div className="md:hidden flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span className="text-xs">+234 706 790 0161</span>
            </div>
            <div className="flex items-center gap-x-3">
              <a href="https://www.facebook.com/share/178xxmY14n/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><Facebook size={14} /></a>
              <a href="https://www.instagram.com/learncilacademy" target="_blank" rel="noopener noreferrer"><Instagram size={14} /></a>
            </div>
          </div>

          {/* Desktop Top Bar */}
          <div className="hidden md:flex justify-between items-center text-xs">
            <div className="flex items-center gap-x-6">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>+234 906 1814 608</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>info@learncil.com</span>
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              <span>Follow Us:</span>
              <div className="flex gap-x-3">
                <a href="https://www.facebook.com/share/178xxmY14n/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><Facebook size={16} /></a>
                <a href="https://www.instagram.com/learncilacademy" target="_blank" rel="noopener noreferrer"><Instagram size={16} /></a>
                <a href="https://www.linkedin.com/company/learncil-academy/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="relative z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4">
            <Image
              src="/logolearcil.png"
              alt="Learncil Logo"
              width={150}
              height={50}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-x-8 ml-8">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavItemClick(item)}
                  className="flex items-center gap-1 text-black font-medium hover:text-[#4A90E2] transition"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={16} />}
                </button>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-x-4 ml-auto">
            {/* Login / Logout */}
            {user ? (
              <button onClick={handleLogout} className="hidden lg:inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium text-sm">
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <button onClick={handleEnrollClick} className="hidden lg:inline-flex items-center gap-2 bg-[#4A90E2] text-white px-4 py-2 rounded-md hover:bg-[#3272b4] transition font-medium text-sm">
                <BookOpen size={16} /> Enroll
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed inset-y-0 right-0 max-w-[300px] w-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto">
                <div className="flex flex-col p-4">
                  {navItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavItemClick(item)}
                      className="flex items-center justify-between py-3 text-gray-800 font-medium hover:text-[#4A90E2] transition border-b border-gray-100"
                    >
                      {item.label}
                      {item.hasDropdown && <ChevronDown size={16} />}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Mobile Bottom Actions */}
              <div className="border-t p-4 space-y-4">
                {user ? (
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium text-sm">
                    <LogOut size={16} /> Logout
                  </button>
                ) : (
                  <button onClick={handleEnrollClick} className="w-full flex items-center justify-center gap-2 bg-[#4A90E2] text-white px-4 py-2 rounded-md hover:bg-[#3272b4] transition font-medium text-sm">
                    <BookOpen size={16} /> Enroll
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 z-10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
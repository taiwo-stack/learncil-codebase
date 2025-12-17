'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, ChevronDown, Phone, Mail, Clock, Menu, X, User, Facebook, Twitter, Linkedin, Youtube, LogOut } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      console.warn('Firebase auth is not initialized');
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!auth) {
      console.warn('Firebase auth is not initialized');
      return;
    }
    try {
      await signOut(auth as any);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'HOME', hasDropdown: false, sectionId: 'home' },
    { label: 'SERVICES', hasDropdown: false, sectionId: 'services' },
    { label: 'ABOUT US', hasDropdown: false, sectionId: 'about' },
    { label: 'COURSES', hasDropdown: false, sectionId: 'courses' },
    { label: 'TESTIMONIALS', hasDropdown: false, sectionId: 'testimonials' },
    { label: 'BLOG', hasDropdown: false, sectionId: 'blog' },
    // { label: '', hasDropdown: false }
  ];

  return (
    <header className="w-full bg-white shadow-sm">
  {/* Top Bar */}
  <div className="bg-[#1C3C68] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Top Bar */}
          <div className="md:hidden flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-white" />
              <span className="text-xs">+234 906 1814 608</span>
            </div>
            <div className="flex items-center gap-x-3">
              <a href="#" className="hover:opacity-90 transition-opacity"><Facebook size={14} className="text-white" /></a>
              <a href="#" className="hover:opacity-90 transition-opacity"><Twitter size={14} className="text-white" /></a>
            </div>
          </div>

          {/* Desktop Top Bar */}
          <div className="hidden md:flex justify-between items-center text-xs">
            <div className="flex items-center gap-x-6">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-white" />
                <span>+234 906 1814 608</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-white" />
                <span>info@learncil.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-white" />
                <span>Mon - Sat: 8:00 - 15:00</span>
              </div>
            </div>
            
            <div className="flex items-center gap-x-4">
              <span>Follow Us:</span>
              <div className="flex gap-x-3">
                <a href="#" className="hover:opacity-90 transition-opacity"><Facebook size={16} className="text-white" /></a>
                <a href="#" className="hover:opacity-90 transition-opacity"><Twitter size={16} className="text-white" /></a>
                <a href="#" className="hover:opacity-90 transition-opacity"><Linkedin size={16} className="text-white" /></a>
                <a href="#" className="hover:opacity-90 transition-opacity"><Youtube size={16} className="text-white" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="relative z-10">
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
                  onClick={() => scrollToSection(item.sectionId)}
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
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
              <input
                type="text"
                placeholder="Search For Course...."
                className="bg-transparent outline-none text-sm w-full"
              />
              <Search size={18} className="text-gray-400" />
            </div>

            {/* Icons */}
            {/* <div className="hidden sm:flex items-center gap-x-4">
              <div className="relative cursor-pointer">
                <Heart size={22} className="text-[#1C3C68]" />
                <span className="absolute -top-2 -right-2 bg-[#4A90E2] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
              </div>
              <div className="relative cursor-pointer">
                <ShoppingCart size={22} className="text-[#1C3C68]" />
                <span className="absolute -top-2 -right-2 bg-[#4A90E2] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">5</span>
              </div>
            </div> */}

            {/* Login/Logout Button */}
            {user ? (
              <button onClick={handleLogout} className="hidden lg:inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium text-sm">
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <button onClick={onLoginClick} className="hidden lg:inline-flex items-center gap-2 bg-[#4A90E2] text-white px-4 py-2 rounded-md hover:bg-[#3272b4] transition font-medium text-sm">
                <User size={16} />
                Login
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
        <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed inset-y-0 right-0 max-w-[300px] w-full bg-white shadow-lg transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              {/* Mobile Search */}
              <div className="p-4 border-b">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="Search For Course...."
                    className="bg-transparent outline-none text-sm w-full"
                  />
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto">
                <div className="flex flex-col p-4">
                  {navItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToSection(item.sectionId)}
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
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Heart size={20} className="text-[#1C3C68]" />
                    <span>Wishlist (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={20} className="text-[#1C3C68]" />
                    <span>Cart (5)</span>
                  </div>
                </div>
                {user ? (
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium text-sm">
                    <LogOut size={16} />
                    Logout
                  </button>
                ) : (
                  <button onClick={onLoginClick} className="w-full flex items-center justify-center gap-2 bg-[#4A90E2] text-white px-4 py-2 rounded-md hover:bg-[#3272b4] transition font-medium text-sm">
                    <User size={16} />
                    Login / Register
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button 
                className="absolute top-4 right-4"
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


 
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, ShoppingCart, Heart, ChevronDown, Phone, Mail, Clock, 
  Menu, X, User, Facebook, Twitter, Linkedin, Youtube, LogOut, 
  Instagram, BookOpen
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Track Firebase auth state
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth as any);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // const handleLoginClick = () => {
  //   // Example: redirect to login page
  //   router.push('/login');
  // };

  const handleEnrollClick = () => {
    scrollToSection('booking');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu after navigation
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'HOME', hasDropdown: false, sectionId: 'home' },
    { label: 'SERVICES', hasDropdown: false, sectionId: 'services' },
    { label: 'ABOUT US', hasDropdown: false, sectionId: 'about' },
    { label: 'COURSES', hasDropdown: false, sectionId: 'courses' },
    { label: 'TESTIMONIALS', hasDropdown: false, sectionId: 'testimonials' },
    // { label: 'BLOG', hasDropdown: false, sectionId: 'blog' },
  ];

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
            {/* Login / Logout */}
            {user ? (
              <button onClick={handleLogout} className="hidden lg:inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium text-sm">
                <LogOut size={16} /> Logout
              </button>
            ) : (
              // <button onClick={handleLoginClick} className="hidden lg:inline-flex items-center gap-2 bg-[#4A90E2] text-white px-4 py-2 rounded-md hover:bg-[#3272b4] transition font-medium text-sm">
              //   <User size={16} /> Login
              // </button>
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
              {/* Mobile Search */}
              {/* <div className="p-4 border-b">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="Search For Course...."
                    className="bg-transparent outline-none text-sm w-full"
                  />
                  <Search size={18} className="text-gray-400" />
                </div>
              </div> */}

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
                {user ? (
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium text-sm">
                    <LogOut size={16} /> Logout
                  </button>
                ) : (
                  // <button onClick={handleLoginClick} className="w-full flex items-center justify-center gap-2 bg-[#4A90E2] text-white px-4 py-2 rounded-md hover:bg-[#3272b4] transition font-medium text-sm">
                  //   <User size={16} /> Login / Register
                  // </button>
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
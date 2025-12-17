"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { LogOut, Menu, X, User, Home, BookOpen, Users, Settings, BarChart3, Calendar } from 'lucide-react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'admin' | 'instructor';
  uid: string;
}

export default function DashboardLayout({ children, role, uid }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);
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
    setLoggingOut(true);
    try {
      await signOut(auth as any);
      // Force a page reload to ensure clean state transition
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      setLoggingOut(false);
    }
  };

  const getNavItems = () => {
    const baseItems = [
      { href: `/${role}/dashboard/${uid}`, label: 'Dashboard', icon: Home },
    ];

    if (role === 'student') {
      return [
        ...baseItems,
        { href: `/${role}/dashboard/${uid}/appointments`, label: 'My Appointments', icon: Calendar },
        { href: `/${role}/dashboard/${uid}/courses`, label: 'My Courses', icon: BookOpen },
        { href: `/${role}/dashboard/${uid}/assignments`, label: 'Assignments', icon: BarChart3 },
        { href: `/${role}/dashboard/${uid}/profile`, label: 'Profile', icon: User },
      ];
    } else if (role === 'instructor') {
      return [
        ...baseItems,
        { href: `/${role}/dashboard/${uid}/appointments`, label: 'My Appointments', icon: Calendar },
        { href: `/${role}/dashboard/${uid}/courses`, label: 'My Courses', icon: BookOpen },
        { href: `/${role}/dashboard/${uid}/students`, label: 'Students', icon: Users },
        { href: `/${role}/dashboard/${uid}/profile`, label: 'Profile', icon: User },
      ];
    } else if (role === 'admin') {
      return [
        ...baseItems,
        { href: `/${role}/dashboard/${uid}/manage-appointments`, label: 'Manage Appointments', icon: Calendar },
        { href: `/${role}/dashboard/${uid}/users`, label: 'Users', icon: Users },
        { href: `/${role}/dashboard/${uid}/courses`, label: 'Courses', icon: BookOpen },
        { href: `/${role}/dashboard/${uid}/analytics`, label: 'Analytics', icon: BarChart3 },
        { href: `/${role}/dashboard/${uid}/settings`, label: 'Settings', icon: Settings },
      ];
    }
    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logout Overlay */}
      {loggingOut && (
        <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-900">Logging out...</p>
            <p className="text-sm text-gray-600 mt-2">Please wait while we sign you out</p>
          </div>
        </div>
      )}

      {/* Top Header */}
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 bg-[#4A90E2] px-4 sm:px-6 py-3 sm:py-4 rounded-br-[40px] ml-4 lg:ml-0">
              <div className="relative">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 bg-[#F5A623] rounded-sm transform rotate-45"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 bg-[#F5A623] rounded-full"></div>
              </div>
              <span className="text-black text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide">Learncil</span>
            </Link>
          </div>

          {/* Centered Dashboard Title */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-semibold text-gray-900 capitalize">
              {role} Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {loggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
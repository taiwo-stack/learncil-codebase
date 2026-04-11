"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LogOut, Menu, X, User, Home, BookOpen, Users, Calendar, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
  uid: string;
}

export default function DashboardLayout({ children, uid }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // Execute signout asynchronously to prevent hanging if the network or corrupted session delays it
      supabase.auth.signOut().catch(console.error);
      
      // Wait 500ms just for the visual effect, then forcibly redirect to clear state instantly
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.error('Error signing out:', error);
      setLoggingOut(false);
    }
  };

  const navItems = [
    { href: `/admin/dashboard/${uid}`, label: 'Dashboard', icon: Home },
    { href: `/admin/dashboard/${uid}/appointments`, label: 'All Appointments', icon: Calendar },
    { href: `/admin/dashboard/${uid}/courses`, label: 'Manage Courses', icon: BookOpen },
    { href: `/admin/dashboard/${uid}/settings`, label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row">
      {/* Logout Overlay */}
      {loggingOut && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-blue-100 mx-auto opacity-20"></div>
            </div>
            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">Logging out...</p>
            <p className="text-sm text-gray-500 mt-2">Securing your session</p>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Left) */}
      <aside className="hidden lg:flex flex-col w-72 h-screen fixed top-0 left-0 bg-white border-r border-slate-200 shadow-[2px_0_12px_rgba(0,0,0,0.02)] z-30">
        <div className="p-8">
          <Link href="/" className="block">
            <Image
              src="/logolearcil.png"
              alt="Learncil Logo"
              width={160}
              height={50}
              className="h-10 w-auto mb-2"
              priority
            />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Admin Portal</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
          {navItems.map((item) => {
            const isActive = mounted && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600 border border-transparent hover:border-slate-100'
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <User size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.email?.split('@')[0] || 'Admin'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all duration-300 disabled:opacity-50"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
        {/* Mobile Header (Top) */}
        <header className="lg:hidden h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logolearcil.png" alt="Learncil Logo" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{user?.email}</p>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Administrator</p>
             </div>
             <button 
              onClick={handleLogout}
              className="p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200"
             >
                <LogOut size={18} />
             </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 mb-24 lg:mb-0">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 hidden lg:block">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-slate-500 mt-1">Manage appointments and academic operations</p>
            </div>
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Visible only on mobile/tablet) */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
        <nav className="bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-2xl h-18 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = mounted && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-20 h-14 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-blue-400' : 'text-slate-400'
                }`}
              >
                <div className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-500/10 text-blue-400' : ''}`}>
                  <item.icon className="h-6 w-6" />
                  {isActive && <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
          <Link
            href={`/admin/dashboard/${uid}`}
            className="flex flex-col items-center justify-center gap-1 w-20 h-14 text-slate-400"
          >
             <div className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <User className="h-6 w-6" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
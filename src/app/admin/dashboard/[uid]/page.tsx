"use client";

import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AuthGuard from '@/components/layout/AuthGuard';

export default function AdminDashboardPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = use(params);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', uid)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchProfile();
    }
  }, [uid]);

  if (loading) {
    return (
      <DashboardLayout uid={uid}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <AuthGuard>
      <DashboardLayout uid={uid}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card */}
          <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, Admin! 👋
              </h2>
              <p className="text-blue-100 text-lg max-w-xl">
                Here is your administrative overview. Keep track of all incoming appointments and enrollment requests across the platform.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">System Controls</h3>
            <p className="text-sm text-gray-500 mt-1">Manage global appointments</p>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}

"use client";

import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AuthGuard from '@/components/layout/AuthGuard';
import AppointmentManagement from '@/components/layout/AppointmentManagement';

export default function AdminAppointmentsPage({ params }: { params: Promise<{ uid: string }> }) {
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
      } catch (err: any) {
        console.error('Error fetching profile:', {
          message: err.message,
          code: err.code,
          details: err.details,
          hint: err.hint,
          raw: err
        });
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
        {profile && (
          <AppointmentManagement userEmail={profile.email} userRole="admin" />
        )}
      </DashboardLayout>
    </AuthGuard>
  );
}

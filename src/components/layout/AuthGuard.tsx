"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface AuthGuardProps {
  children: React.ReactNode;
  role?: 'admin' | 'student' | 'instructor';
}

export default function AuthGuard({ children, role = 'admin' }: AuthGuardProps) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user;

      if (!user) {
        // If no user is logged in, redirect to the homepage.
        router.replace('/');
        return;
      }

      try {
        // Fetch user role from Supabase database
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError || !profile) {
          setError('User profile not found. Please contact support.');
          router.replace('/');
          return;
        }

        // Enforce role strictness
        if (profile.role !== role) {
          setError(`Access denied. ${role.charAt(0).toUpperCase() + role.slice(1)} privileges required.`);
          router.replace('/');
          return;
        }

        // Additional security: Check if admin account is active
        if (profile.status === 'inactive' || profile.status === 'suspended') {
          setError('Your administrator account has been deactivated. Please contact support.');
          router.replace('/');
          return;
        }

        // Check if user is accessing their own secure dynamic route
        const urlUid = params.uid as string;
        if (urlUid && urlUid !== user.id) {
          setError('Access denied. Invalid session link.');
          router.replace(`/admin/dashboard/${user.id}`);
          return;
        }

        // Authentication and authorization passed
        setLoading(false);
      } catch (err) {
        console.error('Auth verification error:', err);
        setError('Failed to verify user profile.');
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, params.uid]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
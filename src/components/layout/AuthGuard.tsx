"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface AuthGuardProps {
  children: React.ReactNode;
  role?: 'admin' | 'student' | 'instructor';
}

export default function AuthGuard({ children, role }: AuthGuardProps) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      console.warn('Firebase auth is not initialized');
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // If no user is logged in, redirect to the homepage.
        router.replace('/');
        return;
      }

      try {
        // Fetch user role from Firestore
        if (!db) {
          console.warn('Database not available for user verification');
          return;
        }
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // This case might happen if a user is authenticated but their profile document is missing.
          // You might want to log them out or redirect to an error page.
          setError('User profile not found. Please contact support.');
          router.replace('/');
          return;
        }

        const userData = userDoc.data();
        const userRole = userData.role; // 'student', 'admin', or 'instructor'

        // Validate user role exists and is valid
        if (!userRole || !['admin', 'student', 'instructor'].includes(userRole)) {
          setError('Invalid user role. Please contact support.');
          router.replace('/');
          return;
        }

        // Check if user is accessing their own dashboard (for dynamic routes)
        const urlUid = params.uid as string;
        if (urlUid && urlUid !== user.uid) {
          // User is trying to access someone else's dashboard
          setError('Access denied. You can only access your own dashboard.');
          // Redirect to their own dashboard
          if (userRole === 'admin') {
            router.replace(`/admin/dashboard/${user.uid}`);
          } else if (userRole === 'student') {
            router.replace(`/student/dashboard/${user.uid}`);
          } else if (userRole === 'instructor') {
            router.replace(`/instructor/dashboard/${user.uid}`);
          }
          return;
        }

        let hasAccess = false;
        if (role === 'admin' && userRole === 'admin') {
          hasAccess = true;
        } else if (role === 'student' && userRole === 'student') {
          hasAccess = true;
        } else if (role === 'instructor' && userRole === 'instructor') {
          hasAccess = true;
        } else if (!role) {
          // If no role is required for the page, anyone logged in has access.
          hasAccess = true;
        }

        // Additional security: Check if user account is active
        if (userData.status === 'inactive' || userData.status === 'suspended') {
          setError('Your account has been deactivated. Please contact support.');
          router.replace('/');
          return;
        }

        if (hasAccess) {
          // If the user is authenticated and has the correct role, stop loading.
          setLoading(false);
        } else {
          // If the user does not have access, redirect them to their own dashboard.
          if (userRole === 'admin') {
            router.replace(`/admin/dashboard/${user.uid}`);
          } else if (userRole === 'student') {
            router.replace(`/student/dashboard/${user.uid}`);
          } else if (userRole === 'instructor') {
            router.replace(`/instructor/dashboard/${user.uid}`);
          } else {
            router.replace('/');
          }
        }
      } catch (err) {
        setError('Failed to verify user role.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, role, params.uid]);

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
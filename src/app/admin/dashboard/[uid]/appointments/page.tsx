"use client";

import AuthGuard from '@/components/layout/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AppointmentManagement from '@/components/layout/AppointmentManagement';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/components/layout/firebase'


export default function AdminAppointmentsPage() {
  const params = useParams();
  const uid = params.uid as string;
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserEmail(userData.email);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchUserEmail();
    }
  }, [uid]);

  if (loading) {
    return (
      <AuthGuard role="admin">
        <DashboardLayout role="admin" uid={uid}>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard role="admin">
      <DashboardLayout role="admin" uid={uid}>
        <AppointmentManagement userEmail={userEmail} userRole="admin" />
      </DashboardLayout>
    </AuthGuard>
  );
}
"use client";

import AuthGuard from '@/components/layout/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/components/layout/firebase';

interface UserData {
  email: string;
  role: string;
  createdAt: Date;
  lastLogin: Date;
}

export default function AdminDashboard() {
  const params = useParams();
  const uid = params.uid as string;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            email: data.email,
            role: data.role,
            createdAt: data.createdAt?.toDate() || new Date(),
            lastLogin: data.lastLogin?.toDate() || new Date(),
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  if (loading) {
    return (
      <AuthGuard role="admin">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-lg font-semibold">Loading your dashboard...</p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard role="admin">
      <DashboardLayout role="admin" uid={uid}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your learning platform effectively.</p>
          </div>

          {userData && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Administrator Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Email:</span>
                  <p className="text-gray-900">{userData.email}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Member since:</span>
                  <p className="text-gray-900">{userData.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Last login:</span>
                  <p className="text-gray-900">{userData.lastLogin.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">User Management</h2>
              <p className="text-gray-600">Manage students and staff accounts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-green-600">Course Management</h2>
              <p className="text-gray-600">Create and edit courses.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-purple-600">Analytics</h2>
              <p className="text-gray-600">View analytics and reports.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-orange-600">Settings</h2>
              <p className="text-gray-600">Configure system settings.</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
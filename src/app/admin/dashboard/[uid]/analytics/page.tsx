"use client";

import AuthGuard from '@/components/layout/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AppointmentAnalytics from '@/components/layout/AppointmentAnalytics';
import { useParams } from 'next/navigation';

export default function AdminAnalyticsPage() {
  const params = useParams();
  const uid = params.uid as string;

  return (
    <AuthGuard role="admin">
      <DashboardLayout role="admin" uid={uid}>
        <AppointmentAnalytics />
      </DashboardLayout>
    </AuthGuard>
  );
}
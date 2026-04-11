"use client";

import { use } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AuthGuard from '@/components/layout/AuthGuard';
import SettingsManagement from '@/components/layout/SettingsManagement';

export default function AdminSettingsPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = use(params);

  return (
    <AuthGuard>
      <DashboardLayout uid={uid}>
        <SettingsManagement />
      </DashboardLayout>
    </AuthGuard>
  );
}

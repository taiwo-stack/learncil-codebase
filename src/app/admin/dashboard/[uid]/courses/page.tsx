"use client";

import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AuthGuard from '@/components/layout/AuthGuard';
import CourseManagement from '@/components/layout/CourseManagement';

export default function AdminCoursesPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = use(params);

  return (
    <AuthGuard>
      <DashboardLayout uid={uid}>
        <CourseManagement />
      </DashboardLayout>
    </AuthGuard>
  );
}

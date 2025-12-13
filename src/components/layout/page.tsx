'use client';

import AuthGuard from '@/components/layout/AuthGuard';

export default function StudentDashboard() {
  return (
    <AuthGuard role="student">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="mt-4">Welcome, Student! This is your dashboard.</p>
        {/* You can start building your student-specific components here */}
      </div>
    </AuthGuard>
  );
}
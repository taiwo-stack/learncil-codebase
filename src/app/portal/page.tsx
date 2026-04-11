"use client";

import { useRouter } from 'next/navigation';
import Auth from '@/components/layout/Auth';

export default function PortalPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Auth showCloseButton={false} />
    </div>
  );
}

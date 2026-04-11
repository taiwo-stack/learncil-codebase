import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: 'city' | 'getaway' | 'adventure' | 'cultural';
  location: string;
  images: string[];
  maxParticipants: number;
  features: string[];
  itinerary: ItineraryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'student' | 'instructor';
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  bookingDate: string;
  participantsCount: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface Ambassador {
  id: string;
  userId: string;
  referralCode: string;
  totalReferrals: number;
  totalEarnings: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

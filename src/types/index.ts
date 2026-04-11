export interface Tour {
  id: string
  title: string
  description: string
  price: number
  duration: string
  category: 'city' | 'getaway' | 'adventure' | 'cultural'
  location: string
  images: string[]
  maxParticipants: number
  features: string[]
  itinerary: ItineraryItem[]
  createdAt: string
  updatedAt: string
}

export interface ItineraryItem {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface User {
  id: string
  email: string
  fullName: string
  phone?: string
  role: 'student' | 'instructor' | 'admin' | 'guest'
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  userId: string
  tourId: string
  bookingDate: string
  participantsCount: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  specialRequests?: string
  ambassadorId?: string
  createdAt: string
  updatedAt: string
}

export interface Ambassador {
  id: string
  userId: string
  referralCode: string
  totalReferrals: number
  totalEarnings: number
  status: 'active' | 'inactive'
  createdAt: string
}

export interface AmbassadorApplication {
  id: string
  fullName: string
  email: string
  phone: string
  location: string
  socialMedia?: string
  experience: string
  motivation: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export interface ContactMessage {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface BookingFormData {
  fullName: string
  email: string
  phone: string
  participants: number
  bookingDate: string
  specialRequests?: string
  referralCode?: string
}

export interface FilterOptions {
  category?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  duration?: string
}

export interface PaginationParams {
  limit: number
  offset: number
  total?: number
  hasMore?: boolean
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
  pagination?: PaginationParams
}

export interface AuthResponse {
  user: User
  token: string
}

export interface DashboardStats {
  totalBookings: number
  completedBookings: number
  totalSpent: number
  ambassadorStats?: AmbassadorStats
}

export interface AmbassadorStats {
  totalEarnings: number
  totalReferrals: number
  monthlyCommission: number
  monthlyReferrals: number
  referralCode: string
}

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
}

export interface Course {
  id: string;
  type: 'curriculum' | 'tech';
  title: string;
  duration: string;
  image_url: string;
  level: string;
  status: 'draft' | 'published' | 'archived';
  curriculum_data: {
    keyStage?: string;
    yearGroups?: string[];
    subject?: string;
    examBoard?: string;
    pdf_url?: string;
  };
  tech_data: {
    gradeLevel?: string;
    category?: string;
    tools?: string[];
    projects?: number;
    ageRange?: string;
    pdf_url?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CourseAssignment {
  id: string;
  courseId: string;
  studentId: string;
  instructorId: string;
  assignedAt: string;
  status: 'active' | 'completed' | 'dropped';
}
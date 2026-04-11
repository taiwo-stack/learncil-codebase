"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Edit, 
  X, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye, 
  BookOpen, 
  Star, 
  MessageSquare 
} from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  appointmentDate: string;
  appointmentTime: string;
  duration: string;
  timezone: string;
  detailedMessage: string;
  studentName: string;
  yearGroup: string;
  curriculum: string;
  primaryGoal: string;
  meetingPlatform: string;
  status: string;
  created_at: string;
  appointment_date_time: string;
  contactMethod?: string;
  specialRequirements?: string;
}

interface AppointmentManagementProps {
  userEmail: string;
  userRole: string;
}

export default function AppointmentManagement({ userEmail, userRole }: AppointmentManagementProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchAppointments();

    // Set up Realtime listener
    const channel = supabase
      .channel('appointments-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newApt = payload.new as Appointment;
            // Only add if it belongs to this user/role
            if (userRole === 'admin' || newApt.email === userEmail || newApt.assigned_instructor === userEmail) {
              setAppointments((prev) => [newApt, ...prev]);
            }
          } else if (payload.eventType === 'UPDATE') {
            setAppointments((prev) => 
              prev.map(apt => apt.id === payload.new.id ? payload.new as Appointment : apt)
            );
          } else if (payload.eventType === 'DELETE') {
            setAppointments((prev) => 
              prev.filter(apt => apt.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userEmail, userRole]);

  const fetchAppointments = async () => {
    try {
      let query = supabase.from('appointments').select('*').order('created_at', { ascending: false });

      if (userRole === 'admin') {
        // Admins see all appointments
      } else if (userRole === 'instructor') {
        query = query.eq('assigned_instructor', userEmail);
      } else {
        query = query.eq('email', userEmail);
      }

      const { data, error } = await query;
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);

      if (error) throw error;

      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      await updateAppointmentStatus(appointmentId, 'cancelled');
    }
  };

  const viewAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const now = new Date();
    const appointmentDate = new Date(apt.appointmentDate);

    switch (filter) {
      case 'upcoming':
        return appointmentDate >= now && apt.status !== 'cancelled';
      case 'past':
        return appointmentDate < now || apt.status === 'completed' || apt.status === 'cancelled';
      case 'pending':
        return apt.status === 'pending';
      case 'confirmed':
        return apt.status === 'confirmed';
      case 'cancelled':
        return apt.status === 'cancelled';
      default:
        return true;
    }
  });

  // Data parsing helper for the modal
  const getDisplayInfo = (apt: Appointment) => {
    const requirements = apt.specialRequirements || '';
    const extraInfo: Record<string, string> = {};
    
    if (requirements.includes('|')) {
      requirements.split('|').forEach(part => {
        const [key, ...val] = part.split(':');
        if (key && val.length > 0) {
          extraInfo[key.trim()] = val.join(':').trim();
        }
      });
    }
    
    return {
      studentName: apt.studentName || extraInfo['Student'] || 'Not Provided',
      yearGroup: apt.yearGroup || extraInfo['Year Group'] || 'Not Provided',
      curriculum: apt.curriculum || extraInfo['Curriculum'] || 'Not Provided',
      primaryGoal: apt.primaryGoal || extraInfo['Goal'] || 'Not Provided',
      meetingPlatform: apt.meetingPlatform || extraInfo['Platform'] || 'Not Provided'
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading appointments...</span>
      </div>
    );
  }

  const modalDisplayInfo = selectedAppointment ? getDisplayInfo(selectedAppointment) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Book New Appointment
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[
          { key: 'all', label: 'All' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'pending', label: 'Pending' },
          { key: 'confirmed', label: 'Confirmed' },
          { key: 'past', label: 'Past' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
              filter === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {filter === 'all' ? 'You haven\'t booked any appointments yet.' : `No ${filter} appointments.`}
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span className="ml-1 capitalize">{appointment.status}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Booked on {new Date(appointment.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => viewAppointmentDetails(appointment)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  {appointment.status === 'pending' && (
                    <>
                      {userRole === 'admin' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => cancelAppointment(appointment.id)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <X className="w-4 h-4 mr-1" />
                        {userRole === 'admin' ? 'Close' : 'Cancel'}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {appointment.appointmentTime} ({appointment.duration} min)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 capitalize">
                    {appointment.subject.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {appointment.detailedMessage && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Appointment Details:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    {appointment.detailedMessage}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <span>Contact: {appointment.contactMethod}</span>
                {appointment.yearGroup && <span>Grade: {appointment.yearGroup}</span>}
                {appointment.timezone && <span>Timezone: {appointment.timezone}</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Appointment Details Modal */}
      {showModal && selectedAppointment && modalDisplayInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 rounded-t-2xl">
              <div className="relative flex justify-between items-center text-white">
                <div>
                  <h3 className="text-2xl font-bold">Appointment Details</h3>
                  <p className="opacity-80 text-sm">Review complete appointment information</p>
                </div>
                <button onClick={() => setShowModal(false)} className="hover:bg-white/10 p-2 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8 text-gray-900">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedAppointment.status)}`}>
                  {getStatusIcon(selectedAppointment.status)}
                  <span className="ml-2 capitalize">{selectedAppointment.status}</span>
                </div>
                <div className="flex gap-3">
                  <a 
                    href={`https://wa.me/${selectedAppointment.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <Phone size={16}/> WhatsApp Client
                  </a>
                  <div className="text-sm text-gray-500 self-center">
                    Booked on {new Date(selectedAppointment.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Section 1: Client Contacts */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 space-y-4">
                  <h4 className="font-bold text-blue-900 border-b border-blue-100 pb-2 flex items-center gap-2">
                    <User size={18}/> Contact Info
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-blue-600 font-medium uppercase">Parent Name</p>
                      <p className="text-sm font-semibold">{selectedAppointment.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium uppercase">Email</p>
                      <p className="text-sm font-semibold">{selectedAppointment.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium uppercase">Phone</p>
                      <p className="text-sm font-semibold">{selectedAppointment.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Academic Profile */}
                <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100 space-y-4">
                  <h4 className="font-bold text-purple-900 border-b border-purple-100 pb-2 flex items-center gap-2">
                    <BookOpen size={18}/> Student Profile
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-purple-600 font-medium uppercase">Learner Name</p>
                      <p className="text-sm font-semibold">{modalDisplayInfo.studentName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 font-medium uppercase">Year Group / Grade</p>
                      <p className="text-sm font-semibold capitalize">{modalDisplayInfo.yearGroup.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 font-medium uppercase">Curriculum</p>
                      <p className="text-sm font-semibold capitalize">{modalDisplayInfo.curriculum}</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Strategic Goals */}
                <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-100 space-y-4">
                  <h4 className="font-bold text-amber-900 border-b border-amber-100 pb-2 flex items-center gap-2">
                    <Star size={18}/> Consultation Goals
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-amber-600 font-medium uppercase">Primary Goal</p>
                      <p className="text-sm font-semibold capitalize">{modalDisplayInfo.primaryGoal.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-600 font-medium uppercase">Inquiry Type</p>
                      <p className="text-sm font-semibold capitalize">{selectedAppointment.subject?.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-600 font-medium uppercase">Preferred Platform</p>
                      <p className="text-sm font-semibold capitalize">{modalDisplayInfo.meetingPlatform.replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2"><Clock size={18}/> Appointment Time</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-emerald-600 font-medium uppercase">Date</p>
                      <p className="text-sm font-semibold">{new Date(selectedAppointment.appointmentDate).toDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-600 font-medium uppercase">Time & Timezone</p>
                      <p className="text-sm font-semibold">{selectedAppointment.appointmentTime} ({selectedAppointment.timezone})</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><MessageSquare size={18}/> Additional Notes</h4>
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    {selectedAppointment.detailedMessage || "No additional notes provided."}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition"
                >
                  Close Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
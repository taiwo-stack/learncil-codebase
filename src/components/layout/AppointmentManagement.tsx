"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { Calendar, Clock, MapPin, Phone, Mail, User, Edit, X, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

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
  currentGrade: string;
  contactMethod: string;
  alternativeContact: string;
  bestContactTime: string;
  company: string;
  referralSource: string;
  experienceLevel: string;
  specialRequirements: string;
  status: string;
  createdAt: Date;
  appointmentDateTime: Date;
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
  }, [userEmail]);

  const fetchAppointments = async () => {
    try {
      const appointmentsRef = collection(db, 'appointments');

      let q;
      if (userRole === 'instructor') {
        // For instructors, show appointments assigned to them
        q = query(
          appointmentsRef,
          where('assignedInstructor', '==', userEmail), // userEmail prop is actually userId for instructors
          orderBy('createdAt', 'desc')
        );
      } else {
        // For students, show appointments by their email
        q = query(
          appointmentsRef,
          where('email', '==', userEmail),
          orderBy('createdAt', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      const appointmentsData: Appointment[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        appointmentsData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          appointmentDateTime: data.appointmentDateTime?.toDate() || new Date(),
        } as Appointment);
      });

      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId);
      await updateDoc(appointmentRef, {
        status: newStatus
      });

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading appointments...</span>
      </div>
    );
  }

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
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
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
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
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
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600">
            {filter === 'all' ? 'You haven\'t booked any appointments yet.' : `No ${filter} appointments.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span className="ml-1 capitalize">{appointment.status}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Booked on {appointment.createdAt.toLocaleDateString()}
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
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirm
                      </button>
                      <button
                        onClick={() => cancelAppointment(appointment.id)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
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
                {appointment.currentGrade && <span>Grade: {appointment.currentGrade}</span>}
                {appointment.experienceLevel && <span>Experience: {appointment.experienceLevel}</span>}
                {appointment.timezone && <span>Timezone: {appointment.timezone}</span>}
              </div>

              {appointment.specialRequirements && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">Special Requirements:</h4>
                  <p className="text-sm text-yellow-700">{appointment.specialRequirements}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Appointment Details Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            {/* Header with Gradient */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 rounded-t-2xl">
              <div className="absolute inset-0 bg-black bg-opacity-10 rounded-t-2xl"></div>
              <div className="relative flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Appointment Details</h3>
                  <p className="text-blue-100 text-sm">Complete information about this appointment</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Status Badge and Booking Date */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getStatusColor(selectedAppointment.status)}`}>
                  {getStatusIcon(selectedAppointment.status)}
                  <span className="ml-2 capitalize">{selectedAppointment.status}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Booked on {selectedAppointment.createdAt.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Personal Information</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <User className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                        <p className="text-gray-900 font-semibold">{selectedAppointment.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <Mail className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Email Address</p>
                        <p className="text-gray-900 font-medium">{selectedAppointment.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <Phone className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</p>
                        <p className="text-gray-900 font-medium">{selectedAppointment.phone}</p>
                      </div>
                    </div>
                    {selectedAppointment.currentGrade && (
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Grade/Level</p>
                        <p className="text-gray-900 font-medium">{selectedAppointment.currentGrade}</p>
                      </div>
                    )}
                    {selectedAppointment.experienceLevel && (
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Experience Level</p>
                        <p className="text-gray-900 font-medium">{selectedAppointment.experienceLevel}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Appointment Details Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Appointment Details</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                        <p className="text-gray-900 font-semibold">
                          {new Date(selectedAppointment.appointmentDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Time & Duration</p>
                        <p className="text-gray-900 font-semibold">{selectedAppointment.appointmentTime} ({selectedAppointment.duration} min)</p>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Subject</p>
                      <p className="text-gray-900 font-medium capitalize">{selectedAppointment.subject.replace('-', ' ')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Timezone</p>
                        <p className="text-gray-900 font-medium">{selectedAppointment.timezone}</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Contact Method</p>
                        <p className="text-gray-900 font-medium capitalize">{selectedAppointment.contactMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Message Section */}
              {selectedAppointment.detailedMessage && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-gray-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Appointment Message</h4>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-base">{selectedAppointment.detailedMessage}</p>
                  </div>
                </div>
              )}

              {/* Additional Information Grid */}
              {(selectedAppointment.alternativeContact || selectedAppointment.bestContactTime || selectedAppointment.referralSource || selectedAppointment.company) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedAppointment.alternativeContact && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                      <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-purple-500" />
                        Alternative Contact
                      </h5>
                      <p className="text-gray-700 font-medium">{selectedAppointment.alternativeContact}</p>
                    </div>
                  )}
                  {selectedAppointment.bestContactTime && (
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                      <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        Best Contact Time
                      </h5>
                      <p className="text-gray-700 font-medium">{selectedAppointment.bestContactTime}</p>
                    </div>
                  )}
                  {selectedAppointment.referralSource && (
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                      <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-teal-500" />
                        Referral Source
                      </h5>
                      <p className="text-gray-700 font-medium capitalize">{selectedAppointment.referralSource.replace('-', ' ')}</p>
                    </div>
                  )}
                  {selectedAppointment.company && (
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                      <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Edit className="w-4 h-4 text-indigo-500" />
                        Company
                      </h5>
                      <p className="text-gray-700 font-medium">{selectedAppointment.company}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Special Requirements */}
              {selectedAppointment.specialRequirements && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Special Requirements</h4>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                    <p className="text-yellow-800 font-medium leading-relaxed">{selectedAppointment.specialRequirements}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200 border border-gray-200"
                >
                  Close
                </button>
                {selectedAppointment.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'confirmed');
                        setShowModal(false);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      ✓ Confirm Appointment
                    </button>
                    <button
                      onClick={() => {
                        cancelAppointment(selectedAppointment.id);
                        setShowModal(false);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      ✕ Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/components/layout/firebase';
import AuthGuard from '@/components/layout/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Eye, CheckCircle, Clock as ClockIcon, XCircle } from 'lucide-react';

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
  referralSource: string;
  specialRequirements: string;
  status: 'open' | 'inprogress' | 'closed';
  assignedInstructor?: string;
  createdAt: any;
  appointmentDateTime: any;
}

export default function InstructorAppointmentsPage() {
  const params = useParams();
  const uid = params.uid as string;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'open' | 'inprogress' | 'closed'>('open');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "appointments"),
      where('assignedInstructor', '==', uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointmentsData: Appointment[] = [];
      querySnapshot.forEach((doc) => {
        appointmentsData.push({
          id: doc.id,
          ...doc.data()
        } as Appointment);
      });
      setAppointments(appointmentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  const updateAppointmentStatus = async (appointmentId: string, newStatus: 'open' | 'inprogress' | 'closed') => {
    try {
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const filteredAppointments = appointments.filter(apt => apt.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'inprogress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <CheckCircle className="w-4 h-4" />;
      case 'inprogress': return <ClockIcon className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <AuthGuard role="instructor">
        <DashboardLayout role="instructor" uid={uid}>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg font-semibold">Loading appointments...</div>
          </div>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard role="instructor">
      <DashboardLayout role="instructor" uid={uid}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="mt-2 text-gray-600">Manage your assigned appointment bookings</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Open</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointments.filter(apt => apt.status === 'open').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ClockIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointments.filter(apt => apt.status === 'inprogress').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Closed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointments.filter(apt => apt.status === 'closed').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow-sm border rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('open')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'open'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Open ({appointments.filter(apt => apt.status === 'open').length})
                </button>
                <button
                  onClick={() => setActiveTab('inprogress')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'inprogress'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  In Progress ({appointments.filter(apt => apt.status === 'inprogress').length})
                </button>
                <button
                  onClick={() => setActiveTab('closed')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'closed'
                      ? 'border-gray-500 text-gray-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Closed ({appointments.filter(apt => apt.status === 'closed').length})
                </button>
              </nav>
            </div>

            {/* Appointments List */}
            <div className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No {activeTab} appointments found.
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{appointment.name}</h3>
                          <p className="text-sm text-gray-500">{appointment.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(appointment.appointmentDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(appointment.appointmentTime)}</span>
                          </div>
                        </div>

                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowModal(true);
                          }}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Modal */}
          {showModal && selectedAppointment && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'open')}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          selectedAppointment.status === 'open'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-800'
                        }`}
                      >
                        Open
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'inprogress')}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          selectedAppointment.status === 'inprogress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-800'
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'closed')}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          selectedAppointment.status === 'closed'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        Closed
                      </button>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {selectedAppointment.name}</p>
                        <p><span className="font-medium">Email:</span> {selectedAppointment.email}</p>
                        <p><span className="font-medium">Phone:</span> {selectedAppointment.phone}</p>
                        <p><span className="font-medium">Grade:</span> {selectedAppointment.currentGrade || 'Not specified'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Appointment Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Subject:</span> {selectedAppointment.subject}</p>
                        <p><span className="font-medium">Date:</span> {formatDate(selectedAppointment.appointmentDate)}</p>
                        <p><span className="font-medium">Time:</span> {formatTime(selectedAppointment.appointmentTime)}</p>
                        <p><span className="font-medium">Duration:</span> {selectedAppointment.duration}</p>
                        <p><span className="font-medium">Timezone:</span> {selectedAppointment.timezone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Communication Preferences */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Communication Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><span className="font-medium">Preferred Method:</span> {selectedAppointment.contactMethod}</p>
                        <p><span className="font-medium">Alternative Contact:</span> {selectedAppointment.alternativeContact || 'None'}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Best Contact Time:</span> {selectedAppointment.bestContactTime || 'Not specified'}</p>
                        <p><span className="font-medium">Referral Source:</span> {selectedAppointment.referralSource || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Messages</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Detailed Message:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                          {selectedAppointment.detailedMessage || 'No additional message'}
                        </p>
                      </div>
                      {selectedAppointment.specialRequirements && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Special Requirements:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                            {selectedAppointment.specialRequirements}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
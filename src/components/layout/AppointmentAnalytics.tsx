"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, Users, Clock, TrendingUp, CheckCircle, XCircle, AlertCircle, BarChart3 } from 'lucide-react';

interface AnalyticsData {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  todayAppointments: number;
  thisWeekAppointments: number;
  thisMonthAppointments: number;
  averageDuration: number;
  popularSubjects: { subject: string; count: number }[];
  contactMethodStats: { method: string; count: number }[];
  hourlyDistribution: { hour: string; count: number }[];
}

export default function AppointmentAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
      }

      const { data: appointments, error } = await supabase
        .from('appointments')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!appointments) {
        setLoading(false);
        return;
      }

      // Calculate analytics
      const totalAppointments = appointments.length;
      const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;
      const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed').length;
      const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;
      const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled').length;

      // Today's appointments
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const todayAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate >= today && aptDate < tomorrow;
      }).length;

      // This week's appointments
      const weekStart = new Date(now.getTime() - now.getDay() * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      const thisWeekAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate >= weekStart && aptDate < weekEnd;
      }).length;

      // This month's appointments
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const thisMonthAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate >= monthStart && aptDate < monthEnd;
      }).length;

      // Average duration
      const durations = appointments
        .filter(apt => apt.duration)
        .map(apt => parseInt(apt.duration));
      const averageDuration = durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : 0;

      // Popular subjects
      const subjectCount: { [key: string]: number } = {};
      appointments.forEach(apt => {
        const subject = apt.subject || 'Other';
        subjectCount[subject] = (subjectCount[subject] || 0) + 1;
      });
      const popularSubjects = Object.entries(subjectCount)
        .map(([subject, count]) => ({ subject, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Contact method stats
      const contactCount: { [key: string]: number } = {};
      appointments.forEach(apt => {
        const method = apt.contactMethod || 'Not specified';
        contactCount[method] = (contactCount[method] || 0) + 1;
      });
      const contactMethodStats = Object.entries(contactCount)
        .map(([method, count]) => ({ method, count }))
        .sort((a, b) => b.count - a.count);

      // Hourly distribution
      const hourlyCount: { [key: string]: number } = {};
      appointments.forEach(apt => {
        const hour = apt.appointmentTime?.split(':')[0] || 'Unknown';
        hourlyCount[hour] = (hourlyCount[hour] || 0) + 1;
      });
      const hourlyDistribution = Object.entries(hourlyCount)
        .map(([hour, count]) => ({ hour, count }))
        .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

      setAnalytics({
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        todayAppointments,
        thisWeekAppointments,
        thisMonthAppointments,
        averageDuration,
        popularSubjects,
        contactMethodStats,
        hourlyDistribution
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading analytics...</span>
      </div>
    );
  }

  if (!analytics) {
    return <div className="text-center py-12 text-gray-600">No analytics data available for this range.</div>;
  }

  const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Analytics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Last 7 days</option>
          <option value="month">This month</option>
          <option value="year">This year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Appointments"
          value={analytics.totalAppointments}
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending"
          value={analytics.pendingAppointments}
          icon={AlertCircle}
          color="bg-yellow-500"
        />
        <StatCard
          title="Confirmed"
          value={analytics.confirmedAppointments}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          title="Completed"
          value={analytics.completedAppointments}
          icon={CheckCircle}
          color="bg-purple-500"
        />
      </div>

      {/* Time-based Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
          <div className="text-3xl font-bold text-blue-600">{analytics.todayAppointments}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
          <div className="text-3xl font-bold text-green-600">{analytics.thisWeekAppointments}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
          <div className="text-3xl font-bold text-purple-600">{analytics.thisMonthAppointments}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Popular Subjects
          </h3>
          <div className="space-y-3">
            {analytics.popularSubjects.map((item, index) => (
              <div key={item.subject} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {item.subject.replace('-', ' ')}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Contact Preferences
          </h3>
          <div className="space-y-3">
            {analytics.contactMethodStats.map((item) => (
              <div key={item.method} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {item.method}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${analytics.totalAppointments > 0 ? (item.count / analytics.totalAppointments) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Hourly Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {analytics.hourlyDistribution.map((item) => (
            <div key={item.hour} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{item.count}</div>
              <div className="text-sm text-gray-600">{item.hour}:00</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Duration</h3>
          <div className="text-3xl font-bold text-orange-600">{analytics.averageDuration} min</div>
          <p className="text-sm text-gray-600 mt-2">Average appointment length</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancellation Rate</h3>
          <div className="text-3xl font-bold text-red-600">
            {analytics.totalAppointments > 0
              ? Math.round((analytics.cancelledAppointments / analytics.totalAppointments) * 100)
              : 0}%
          </div>
          <p className="text-sm text-gray-600 mt-2">Percentage of cancelled appointments</p>
        </div>
      </div>
    </div>
  );
}
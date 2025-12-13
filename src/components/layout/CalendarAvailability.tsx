
"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

interface CalendarAvailabilityProps {
  selectedDate: string;
  selectedTime: string;
  duration: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onDurationSelect: (duration: string) => void;
}

interface TimeSlot {
  value: string;
  label: string;
  available: boolean;
  bookedCount: number;
  time: string;
}

const timeSlots = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" }
];

const durations = [
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" }
];

export default function CalendarAvailability({
  selectedDate,
  selectedTime,
  duration,
  onDateSelect,
  onTimeSelect,
  onDurationSelect
}: CalendarAvailabilityProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Business hours: 9 AM to 6 PM, Monday to Saturday
  const isBusinessDay = (date: Date) => {
    const day = date.getDay();
    return day >= 1 && day <= 6; // Monday to Saturday
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Check availability for a specific date
  const checkAvailability = async (date: string) => {
    setLoading(true);
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(
        appointmentsRef,
        where('appointmentDate', '==', date),
        where('status', 'in', ['pending', 'confirmed'])
      );

      const querySnapshot = await getDocs(q);
      const bookedSlots: { [key: string]: number } = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const time = data.appointmentTime;
        const duration = parseInt(data.duration) || 60;

        // Mark the time slot and any overlapping slots as booked
        const startHour = parseInt(time.split(':')[0]);
        const endHour = startHour + Math.ceil(duration / 60);

        for (let hour = startHour; hour < endHour; hour++) {
          const slotTime = `${hour.toString().padStart(2, '0')}:00`;
          bookedSlots[slotTime] = (bookedSlots[slotTime] || 0) + 1;
        }
      });

      const slots: TimeSlot[] = timeSlots.map(slot => ({
        ...slot,
        time: slot.value,
        bookedCount: bookedSlots[slot.value] || 0,
        available: (bookedSlots[slot.value] || 0) < 3 // Max 3 bookings per slot
      }));

      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailableSlots(timeSlots.map(slot => ({ ...slot, time: slot.value, bookedCount: 0, available: true })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      checkAvailability(selectedDate);
    }
  }, [selectedDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate === formatDate(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Select Date & Time
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h4 className="text-lg font-medium text-white">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h4>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <div key={index} className="aspect-square">
                {date ? (
                  <button
                    onClick={() => onDateSelect(formatDate(date))}
                    disabled={!isBusinessDay(date) || isPastDate(date)}
                    className={`
                      w-full h-full flex items-center justify-center text-sm rounded-lg transition-colors
                      ${isSelectedDate(date)
                        ? 'bg-blue-600 text-white'
                        : isToday(date)
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                        : 'text-white hover:bg-white/10'
                      }
                      ${(!isBusinessDay(date) || isPastDate(date)) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {date.getDate()}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Available Times</h4>

          {selectedDate ? (
            <>
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => onDurationSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition"
                >
                  {durations.map((dur) => (
                    <option key={dur.value} value={dur.value} className="text-black">
                      {dur.label}
                    </option>
                  ))}
                </select>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                  <p className="text-gray-400 mt-2">Checking availability...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && onTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={`
                        p-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between
                        ${selectedTime === slot.time
                          ? 'bg-blue-600 text-white'
                          : slot.available
                          ? 'bg-green-600/20 text-green-300 border border-green-500/50 hover:bg-green-600/30'
                          : 'bg-red-600/20 text-red-300 border border-red-500/50 cursor-not-allowed'
                        }
                      `}
                    >
                      <span>{slot.label}</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className="text-xs">{3 - slot.bookedCount}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-4 text-xs text-gray-400">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500/50 rounded"></div>
                  <span>Available (shows remaining slots)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500/50 rounded"></div>
                  <span>Fully booked</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>Please select a date to view available times</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
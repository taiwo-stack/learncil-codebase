"use client";

import { useState, useEffect } from 'react';
import { Clock, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
  { value: "09:00", label: "09:00 AM" },
  { value: "09:30", label: "09:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "13:30", label: "01:30 PM" },
  { value: "14:00", label: "02:00 PM" },
  { value: "14:30", label: "02:30 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "15:30", label: "03:30 PM" },
  { value: "16:00", label: "04:00 PM" },
  { value: "16:30", label: "04:30 PM" },
  { value: "17:00", label: "05:00 PM" },
  { value: "17:30", label: "05:30 PM" },
];

export default function CalendarAvailability({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: Omit<CalendarAvailabilityProps, 'duration' | 'onDurationSelect'>) {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate next 14 business days (Mon-Sat)
  const upcomingDays = (() => {
    const days = [];
    const current = new Date();
    while (days.length < 14) {
      const day = current.getDay();
      if (day >= 1 && day <= 6) {
        days.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  })();

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  useEffect(() => {
    if (!selectedDate && upcomingDays.length > 0) {
      onDateSelect(formatDate(upcomingDays[0]));
    }
  }, []);

  const checkAvailability = async (date: string) => {
    setLoading(true);
    try {
      const { data: appointments, error } = await supabase
        .from('appointments')
        .select('appointmentTime, duration')
        .eq('appointmentDate', date)
        .in('status', ['pending', 'confirmed']);

      if (error) throw error;

      const bookedSlots: { [key: string]: number } = {};

      appointments?.forEach((apt) => {
        const time = apt.appointmentTime;
        const dur = parseInt(apt.duration) || 30;
        const [h, m] = time.split(':').map(Number);
        const startTimeInMinutes = h * 60 + m;
        const endTimeInMinutes = startTimeInMinutes + dur;

        timeSlots.forEach(slot => {
          const [sh, sm] = slot.value.split(':').map(Number);
          const slotStartInMinutes = sh * 60 + sm;
          const slotEndInMinutes = slotStartInMinutes + 30;
          if (slotStartInMinutes < endTimeInMinutes && slotEndInMinutes > startTimeInMinutes) {
            bookedSlots[slot.value] = (bookedSlots[slot.value] || 0) + 1;
          }
        });
      });

      const slots: TimeSlot[] = timeSlots.map(slot => ({
        ...slot,
        time: slot.value,
        bookedCount: bookedSlots[slot.value] || 0,
        available: (bookedSlots[slot.value] || 0) < 2,
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

  return (
    <div className="w-full max-w-full bg-white/5 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10 shadow-2xl overflow-hidden">
      <div className="flex flex-col gap-4">

        {/* Date Ribbon */}
        <div>
          <div className="flex items-center justify-between mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Select Date</span>
            <span className="text-blue-400">Next 14 Days</span>
          </div>
          {/* Scrollable row — overflow-x-auto here, NOT on parent */}
          <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar snap-x scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
            {upcomingDays.map((date) => {
              const formatted = formatDate(date);
              const isSelected = selectedDate === formatted;
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = date.getDate();

              return (
                <button
                  key={formatted}
                  type="button"
                  onClick={() => onDateSelect(formatted)}
                  className={[
                    'flex-none w-9 py-1.5 rounded-xl flex flex-col items-center justify-center transition-all snap-start border text-center',
                    isSelected
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg scale-105'
                      : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10',
                  ].join(' ')}
                >
                  <span className={`text-[8px] font-bold uppercase mb-0.5 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                    {dayName}
                  </span>
                  <span className="text-[11px] font-bold">{dayNum}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div className="border-t border-white/5 pt-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-blue-400" /> Time
            </h4>
            {selectedDate && !loading && (
              <div className="text-[9px] text-gray-400 font-bold bg-white/5 px-2 py-0.5 rounded-full">
                {new Date(selectedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-[200px] overflow-y-auto custom-scrollbar w-full">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => slot.available && onTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={[
                    'py-2 rounded-lg text-center transition-all border w-full',
                    selectedTime === slot.time
                      ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-lg'
                      : slot.available
                      ? 'bg-white/5 text-gray-300 border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5'
                      : 'bg-red-500/5 text-gray-600 border-transparent cursor-not-allowed opacity-30',
                  ].join(' ')}
                >
                  <div className="text-[9px] leading-tight mb-0.5">{slot.label}</div>
                  <div className={`text-[7px] flex items-center justify-center gap-0.5 ${slot.available ? 'text-blue-400/70' : 'text-gray-500'}`}>
                    <Users className="w-1.5 h-1.5" /> {2 - slot.bookedCount}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-[7px] text-gray-500 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Selected</div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-white/10 rounded-full" /> Available</div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500/20 rounded-full" /> Full</div>
          </div>
        </div>
      </div>
    </div>
  );
}
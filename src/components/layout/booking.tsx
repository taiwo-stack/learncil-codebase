"use client";

import { useState, FormEvent } from "react";
import { BookOpen, CheckCircle2, Video, Mic, MoreHorizontal } from 'lucide-react';
import { ArrowRight, Calendar, Clock, MessageSquare, User, Building, Star, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import CalendarAvailability from "./CalendarAvailability";

const subjects = [
  { value: "student-enrollment", label: "Student Enrollment" },
  { value: "consultation", label: "Consultation" },
  { value: "curriculum-review", label: "Curriculum Review" },
  { value: "payment-enquiries", label: "Payment & Billing" },
  { value: "others", label: "Others" }
];

const yearGroups = [
  { value: "reception", label: "Reception / Early Years" },
  { value: "year-1", label: "Year 1 / Grade 1" },
  { value: "year-2", label: "Year 2 / Grade 2" },
  { value: "year-3", label: "Year 3 / Grade 3" },
  { value: "year-4", label: "Year 4 / Grade 4" },
  { value: "year-5", label: "Year 5 / Grade 5" },
  { value: "year-6", label: "Year 6 / Grade 6" },
  { value: "year-7", label: "Year 7 / Grade 7" },
  { value: "year-8", label: "Year 8 / Grade 8" },
  { value: "year-9", label: "Year 9 / Grade 9" },
  { value: "year-10", label: "Year 10 / Grade 10" },
  { value: "year-11", label: "Year 11 / Grade 11" },
  { value: "year-12", label: "Year 12 / Grade 12" },
  { value: "year-13", label: "Year 13 / Grade 13" },
];

const curriculums = [
  { value: "british", label: "British (National Curriculum)" },
  { value: "american", label: "American" },
  { value: "nigerian", label: "Nigerian" },
  { value: "hybrid", label: "Hybrid / Custom" }
];

const meetingPlatforms = [
  { value: "whatsapp-video", label: "WhatsApp Video Call" },
  { value: "whatsapp-audio", label: "WhatsApp Audio Call" },
  { value: "zoom", label: "Zoom" },
  { value: "google-meet", label: "Google Meet" }
];

const primaryGoals = [
  { value: "exam-prep", label: "Exam Preparation (GCSE/SATs)" },
  { value: "remedial-support", label: "Remedial / Catch-up Support" },
  { value: "academic-enrichment", label: "Academic Enrichment" },
  { value: "homeschool-guidance", label: "Homeschool Guidance" }
];

const timezones = [
  { value: "UTC+0", label: "GMT (London, Lagos)" },
  { value: "UTC+1", label: "WAT (Lagos, Berlin)" },
  { value: "UTC-5", label: "EST (New York)" },
  { value: "UTC-8", label: "PST (Los Angeles)" },
  { value: "UTC+3", label: "EAT (Nairobi)" }
];

const contactMethods = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone Call" },
  { value: "email", label: "Email" }
];

const referralSources = [
  { value: "google", label: "Google Search" },
  { value: "social-media", label: "Social Media" },
  { value: "friend", label: "Friend/Family" },
  { value: "advertisement", label: "Advertisement" },
  { value: "other", label: "Other" }
];

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "", // Parent Name
    email: "", // Parent Email
    phone: "", // Parent Phone
    studentName: "",
    yearGroup: "",
    curriculum: "",
    primaryGoal: "",
    subject: "", // Consultation Type
    appointmentDate: "",
    appointmentTime: "",
    duration: "30",
    timezone: "UTC+1",
    meetingPlatform: "",
    detailedMessage: "", // Additional Notes
    contactMethod: "",
    alternativeContact: "",
    bestContactTime: "",
    referralSource: "",
    specialRequirements: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredBase = ['name', 'email', 'studentName', 'yearGroup', 'curriculum', 'primaryGoal', 'subject', 'meetingPlatform', 'appointmentDate', 'appointmentTime', 'contactMethod'];
    
    // Dynamically require phone if WhatsApp is selected
    const requiredFields = [...requiredBase];
    if (formData.meetingPlatform.includes('whatsapp')) {
      requiredFields.push('phone');
    }

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      const fieldLabels: {[key: string]: string} = {
        name: 'Parent Name',
        email: 'Email',
        phone: 'Phone Number (Required for WhatsApp)',
        studentName: 'Student Name',
        yearGroup: 'Year Group',
        curriculum: 'Curriculum',
        primaryGoal: 'Educational Goal',
        subject: 'Consultation Type',
        meetingPlatform: 'Meeting Platform',
        appointmentDate: 'Date',
        appointmentTime: 'Time',
        contactMethod: 'Contact Method'
      };
      const missingLabels = missingFields.map(f => fieldLabels[f] || f);
      setError(`Please fill out: ${missingLabels.join(', ')}.`);
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // 0. Verify slot availability right before insertion
      const { data: existingAppts, error: countError } = await supabase
        .from('appointments')
        .select('id')
        .eq('appointmentDate', formData.appointmentDate)
        .eq('appointmentTime', formData.appointmentTime)
        .in('status', ['pending', 'confirmed']);

      if (countError) throw countError;

      if (existingAppts && existingAppts.length >= 2) {
         setError("This time slot has just been fully booked. Please select another time.");
         setLoading(false);
         setCurrentStep(3); // Return to scheduling view
         return;
      }

      // 1. Save to Supabase
      // Build all additional info into specialRequirements to avoid missing-column errors
      const additionalInfo = [
        formData.studentName ? `Student: ${formData.studentName}` : '',
        formData.yearGroup   ? `Year Group: ${formData.yearGroup}` : '',
        formData.curriculum  ? `Curriculum: ${formData.curriculum}` : '',
        formData.primaryGoal ? `Goal: ${formData.primaryGoal}` : '',
        formData.meetingPlatform ? `Platform: ${formData.meetingPlatform}` : '',
        formData.contactMethod ? `Contact: ${formData.contactMethod}` : '',
        formData.alternativeContact ? `Alt Contact: ${formData.alternativeContact}` : '',
        formData.bestContactTime ? `Best Time: ${formData.bestContactTime}` : '',
        formData.referralSource ? `Source: ${formData.referralSource}` : '',
        formData.duration ? `Duration: ${formData.duration}` : '',
        formData.timezone ? `Timezone: ${formData.timezone}` : '',
      ].filter(Boolean).join(' | ');

      const finalSpecialRequirements = formData.specialRequirements
        ? `${formData.specialRequirements} | ${additionalInfo}`
        : additionalInfo;

      const { error: supabaseError } = await supabase.from("appointments").insert([
        {
          name:                formData.name,
          email:               formData.email,
          phone:               formData.phone,
          subject:             formData.subject,
          appointmentDate:     formData.appointmentDate,
          appointmentTime:     formData.appointmentTime,
          duration:            formData.duration,
          timezone:            formData.timezone,
          contactMethod:       formData.contactMethod,
          detailedMessage:     formData.detailedMessage,
          specialRequirements: finalSpecialRequirements,
          status:              "pending",
          appointment_date_time: new Date(`${formData.appointmentDate}T${formData.appointmentTime}`).toISOString(),
          created_at:          new Date().toISOString(),
        }
      ]);

      if (supabaseError) throw supabaseError;

      setMessage("Enrollment inquiry sent successfully! We will contact you shortly.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        studentName: "",
        yearGroup: "",
        curriculum: "",
        primaryGoal: "",
        subject: "",
        appointmentDate: "",
        appointmentTime: "",
        duration: "30",
        timezone: "UTC+1",
        meetingPlatform: "",
        detailedMessage: "",
        contactMethod: "",
        alternativeContact: "",
        bestContactTime: "",
        referralSource: "",
        specialRequirements: ""
      });

      setCurrentStep(1);
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || "Failed to book appointment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#0f3460] to-[#16213e] relative overflow-hidden py-16">
      {/* Advanced Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.1)_0deg,rgba(147,51,234,0.1)_120deg,rgba(236,72,153,0.1)_240deg,rgba(59,130,246,0.1)_360deg)] animate-spin-slow"></div>

      {/* Dynamic Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.15),transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.12),transparent_50%)] animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_10%,rgba(34,197,94,0.1),transparent_50%)] animate-pulse" style={{animationDelay: '3s'}}></div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-gradient-shift"></div>

      {/* Glassmorphism Layer */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-gradient-to-br from-black/10 via-transparent to-black/5"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Content */}
          <div className="relative text-white hidden lg:block order-2 lg:order-1">
             <div className="mb-8">
              <div className="flex items-center gap-2 text-blue-400 font-medium mb-4">
                <div className="w-6 h-0.5 bg-blue-400"></div>
                <span>BOOKING APPOINTMENT</span>
              </div>
              <h2 className="text-3xl text-white  lg:text-4xl font-bold mb-4">
                Start Enrollment With Our Instructors
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Take the first step toward personalized, future-ready learning. Meet with a LearnCil instructor to review your child's needs, choose the right program, and complete enrollment with ease.
              </p>
            </div>

            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/call-to-actionx.png"
                alt="Professional consultation"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="order-1 lg:order-2 min-w-0 w-full">
            {/* Multi-step Form */}
            <div className="bg-white/5 backdrop-blur-sm w-full max-w-full my-8 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Progress Header */}
              <div className="bg-white/10 px-4 py-4 border-b border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-semibold">
                    {currentStep === 1 && "Basic Information"}
                    {currentStep === 2 && "Schedule Appointment"}
                    {currentStep === 3 && "Additional Details"}
                  </h3>
                  <span className="text-white/70 text-sm">Step {currentStep} of 3</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form className="p-2 sm:p-6 space-y-6 w-full max-w-full" onSubmit={handleSubmit}>
                {/* Step 1: Parent Information */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Parent/Guardian Name*</label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Email Address*</label>
                        <input
                          type="email"
                          placeholder="Best email to reach you"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Phone Number*</label>
                        <input
                          type="tel"
                          placeholder="WhatsApp preferred"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Preferred Contact Method*</label>
                        <select
                          value={formData.contactMethod}
                          onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                        >
                          <option value="">Select method</option>
                          {contactMethods.map((method) => (
                            <option key={method.value} value={method.value} className="text-black">
                              {method.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Student Profile */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-white text-sm font-medium">Student's Full Name*</label>
                      <input
                        type="text"
                        placeholder="Name of the learner"
                        value={formData.studentName}
                        onChange={(e) => handleInputChange('studentName', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Year Group / Grade*</label>
                        <select
                          value={formData.yearGroup}
                          onChange={(e) => handleInputChange('yearGroup', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                        >
                          <option value="">Select level</option>
                          {yearGroups.map((group) => (
                            <option key={group.value} value={group.value} className="text-black">
                              {group.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Curriculum of Interest*</label>
                        <select
                          value={formData.curriculum}
                          onChange={(e) => handleInputChange('curriculum', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                        >
                          <option value="">Select curriculum</option>
                          {curriculums.map((curr) => (
                            <option key={curr.value} value={curr.value} className="text-black">
                              {curr.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-white text-sm font-medium">Primary Educational Goal*</label>
                      <select
                        value={formData.primaryGoal}
                        onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                      >
                        <option value="">What is the main goal?</option>
                        {primaryGoals.map((goal) => (
                          <option key={goal.value} value={goal.value} className="text-black">
                            {goal.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Consultation & Scheduling */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Consultation Type*</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                        >
                          <option value="">Select type</option>
                          {subjects.map((s) => (
                            <option key={s.value} value={s.value} className="text-black">
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Meeting Platform*</label>
                        <select
                          value={formData.meetingPlatform}
                          onChange={(e) => handleInputChange('meetingPlatform', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                        >
                          <option value="">Preferred platform</option>
                          {meetingPlatforms.map((p) => (
                            <option key={p.value} value={p.value} className="text-black">
                              {p.label}
                            </option>
                          ))}
                        </select>
                        {formData.meetingPlatform.includes('whatsapp') && !formData.phone && (
                          <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                             <Phone className="w-2.5 h-2.5" /> Phone number is required for WhatsApp calls.
                          </p>
                        )}
                      </div>
                    </div>

                    <CalendarAvailability
                      selectedDate={formData.appointmentDate}
                      selectedTime={formData.appointmentTime}
                      onDateSelect={(date) => handleInputChange('appointmentDate', date)}
                      onTimeSelect={(time) => handleInputChange('appointmentTime', time)}
                    />

                    <div className="space-y-2">
                      <label className="block text-white text-sm font-medium">Additional Consultation Notes (Optional)</label>
                      <textarea
                        placeholder="Anything else we should know?"
                        value={formData.detailedMessage}
                        onChange={(e) => handleInputChange('detailedMessage', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-green-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? "Booking..." : "Confirm Appointment"}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {message && <p className="text-green-400 text-sm text-center mt-4 p-3 bg-green-500/10 rounded-lg">{message}</p>}
                {error && <p className="text-red-400 text-sm text-center mt-4 p-3 bg-red-500/10 rounded-lg">{error}</p>}
              </form>
            </div>

            {/* Contact Information - Below Form */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Quickly Get in Touch</h3>
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp Contact */}
                <a
                  href="https://wa.me/2347067900161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-row items-center gap-2 bg-white rounded-xl p-2 sm:p-4 hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 flex-shrink-0 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors">
                    <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 font-medium text-sm truncate">WhatsApp</div>
                    <div className="text-green-600 text-xs truncate">+234 706 790 0161</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </a>

                {/* Email Contact */}
                <a
                  href="mailto:info@learncil.com"
                  className="group flex flex-row items-center gap-2 bg-red-500 rounded-xl p-2 sm:p-4 hover:bg-red-600 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 flex-shrink-0 bg-white rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm truncate">Email</div>
                    <div className="text-red-100 text-xs truncate">info@learncil.com</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
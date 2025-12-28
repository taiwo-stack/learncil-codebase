"use client";

import { useState, FormEvent } from "react";
import { BookOpen, CheckCircle2, Video, Mic, MoreHorizontal } from 'lucide-react';
import { ArrowRight, Calendar, Clock, MessageSquare, User, Building, Star, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import CalendarAvailability from "./CalendarAvailability";

const subjects = [
  { value: "student-enrollment", label: "Student Enrollment" },
  { value: "payment-enquiries", label: "Payment Enquiries" },
  { value: "consultation", label: "Consultation" },
  { value: "course-information", label: "Course Information" },
  { value: "technical-support", label: "Technical Support" },
  { value: "others", label: "Others" }
];

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

const timezones = [
  { value: "UTC+1", label: "West Africa Time (UTC+1)" },
  { value: "UTC+0", label: "Greenwich Mean Time (UTC+0)" },
  { value: "UTC-5", label: "Eastern Time (UTC-5)" },
  { value: "UTC-8", label: "Pacific Time (UTC-8)" }
];

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "sms", label: "SMS" },
  { value: "whatsapp", label: "WhatsApp" }
];

const referralSources = [
  { value: "google", label: "Google Search" },
  { value: "social-media", label: "Social Media" },
  { value: "friend", label: "Friend/Family" },
  { value: "website", label: "Website" },
  { value: "advertisement", label: "Advertisement" },
  { value: "other", label: "Other" }
];

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    appointmentDate: "",
    appointmentTime: "",
    duration: "",
    timezone: "UTC+1",
    detailedMessage: "",
    currentGrade: "",
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
    const requiredFields = ['name', 'email', 'phone', 'subject', 'appointmentDate', 'appointmentTime', 'duration', 'contactMethod'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setError(`Please fill out all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // 1. Save to Firebase
      await addDoc(collection(db, "appointments"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "open",
        assignedInstructor: null,
        appointmentDateTime: new Date(`${formData.appointmentDate}T${formData.appointmentTime}`),
      });

      // 2. Send to Google Sheets
      try {
        await fetch('https://script.google.com/macros/s/AKfycbzhIfaAzKGkHPYx1u0NMh0hp8Yv5HaXcfQwPh-TXsHQE3ySWMM_Wi1Bsa2KaZG4Gxb5Ig/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            appointmentDateTime: `${formData.appointmentDate} ${formData.appointmentTime}`,
            status: "open"
          }),
        });
      } catch (sheetsError) {
        console.error('Google Sheets error (non-blocking):', sheetsError);
        // Continue even if Google Sheets fails - data is already in Firebase
      }

      setMessage("Appointment booked successfully! We will get back to you shortly via your preferred contact method.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        appointmentDate: "",
        appointmentTime: "",
        duration: "",
        timezone: "UTC+1",
        detailedMessage: "",
        currentGrade: "",
        contactMethod: "",
        alternativeContact: "",
        bestContactTime: "",
        referralSource: "",
        specialRequirements: ""
      });

      setCurrentStep(1);
    } catch (err) {
      setError("Failed to book appointment. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#0f3460] to-[#16213e] relative overflow-hidden py-16">
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

      {/* Enhanced Animated Wave Pattern */}
      <div className="absolute inset-0">
        <svg className="absolute w-full h-full opacity-6" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.15)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.15)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.1)" />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.1)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.1)" />
            </linearGradient>
          </defs>
          <path d="M0,500 C200,400 400,600 600,500 C800,400 1000,600 1200,500" stroke="url(#waveGradient)" fill="none" strokeWidth="3">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0,500 C200,400 400,600 600,500 C800,400 1000,600 1200,500;
                      M0,500 C200,600 400,400 600,500 C800,600 1000,400 1200,500;
                      M0,500 C200,400 400,600 600,500 C800,400 1000,600 1200,500"/>
          </path>
          <path d="M-200,600 C0,500 200,700 400,600 C600,500 800,700 1000,600" stroke="url(#waveGradient2)" fill="none" strokeWidth="2" opacity="0.7">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M-200,600 C0,500 200,700 400,600 C600,500 800,700 1000,600;
                      M-200,600 C0,700 200,500 400,600 C600,700 800,500 1000,600;
                      M-200,600 C0,500 200,700 400,600 C600,500 800,700 1000,600"/>
          </path>
        </svg>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-full blur-2xl animate-float-complex"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-purple-500/12 to-pink-500/8 rounded-full blur-2xl animate-float-complex" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/8 rounded-full blur-2xl animate-float-complex" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-gradient-to-br from-pink-500/12 to-indigo-500/8 rounded-full blur-2xl animate-float-complex" style={{animationDelay: '6s'}}></div>


      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Left side - Image */}
          
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

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
           

            {/* Multi-step Form */}
            <div className="bg-white/5 backdrop-blur-sm  my-8 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Progress Header */}
              <div className="bg-white/10 px-6 py-4 border-b border-white/10">
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

              <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Full Name*</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
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
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Phone Number*</label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Subject*</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                        >
                          <option value="">Select appointment type</option>
                          {subjects.map((subject) => (
                            <option key={subject.value} value={subject.value} className="text-black">
                              {subject.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-white text-sm font-medium">Current Grade/Level (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g., Grade 10, College Freshman"
                        value={formData.currentGrade}
                        onChange={(e) => handleInputChange('currentGrade', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Scheduling */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <CalendarAvailability
                      selectedDate={formData.appointmentDate}
                      selectedTime={formData.appointmentTime}
                      duration={formData.duration}
                      onDateSelect={(date) => handleInputChange('appointmentDate', date)}
                      onTimeSelect={(time) => handleInputChange('appointmentTime', time)}
                      onDurationSelect={(duration) => handleInputChange('duration', duration)}
                    />

                    <div className="space-y-2">
                      <label className="block text-white text-sm font-medium">Timezone</label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                      >
                        {timezones.map((tz) => (
                          <option key={tz.value} value={tz.value} className="text-black">
                            {tz.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Details */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-white text-sm font-medium">What are the things you want us to know before appointment?*</label>
                      <textarea
                        placeholder="Please share any specific topics, concerns, or information you'd like us to know before your appointment..."
                        value={formData.detailedMessage}
                        onChange={(e) => handleInputChange('detailedMessage', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all resize-none"
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
                        <option value="">Select your preferred contact method</option>
                        {contactMethods.map((method) => (
                          <option key={method.value} value={method.value} className="text-black">
                            {method.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Alternative Contact (Optional)</label>
                        <input
                          type="text"
                          placeholder="Alternative phone/email"
                          value={formData.alternativeContact}
                          onChange={(e) => handleInputChange('alternativeContact', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Best Time to Contact (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g., 9 AM - 5 PM, Evenings"
                          value={formData.bestContactTime}
                          onChange={(e) => handleInputChange('bestContactTime', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">How did you hear about us?</label>
                        <select
                          value={formData.referralSource}
                          onChange={(e) => handleInputChange('referralSource', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all appearance-none"
                        >
                          <option value="">Select source</option>
                          {referralSources.map((source) => (
                            <option key={source.value} value={source.value} className="text-black">
                              {source.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Special Requirements (Optional)</label>
                        <input
                          type="text"
                          placeholder="Accessibility needs, etc."
                          value={formData.specialRequirements}
                          onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                        />
                      </div>
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
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Quickily Get in Touch</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* WhatsApp Contact */}
                <a
                  href="https://wa.me/2347067900161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-white rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium">WhatsApp</div>
                    <div className="text-green-600 text-sm">+234 706 790 0161</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Email Contact */}
                <a
                  href="mailto:admin@learncil.com"
                  className="group flex items-center gap-4 bg-red-500 rounded-xl p-4 hover:bg-red-600 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Mail className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">Email</div>
                    <div className="text-red-100 text-sm">admin@learncil.com</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
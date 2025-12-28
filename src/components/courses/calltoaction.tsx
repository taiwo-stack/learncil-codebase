'use client';

import { BookOpen, CheckCircle2, ArrowRight, Phone, Video, Mic, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

export default function Calltoaction() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
      {/* Decorative Wave Lines - Top Right */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 lg:w-96 h-32 sm:h-48 md:h-64 opacity-20 pointer-events-none">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <path
            d="M 0 150 Q 100 100, 200 150 T 400 150"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 0 180 Q 100 130, 200 180 T 400 180"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 0 210 Q 100 160, 200 210 T 400 210"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Decorative Wave Lines - Bottom Right */}
      <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 right-10 sm:right-16 md:right-20 w-32 sm:w-48 md:w-64 lg:w-72 h-32 sm:h-48 opacity-20 pointer-events-none hidden md:block">
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <path
            d="M 300 0 Q 200 50, 100 0 T -100 0"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 300 30 Q 200 80, 100 30 T -100 30"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8 animate-fade-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm md:text-base">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="uppercase tracking-wider">JOIN A LIVE CLASS TODAY</span>
            </div>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Learning Designed for Real Children 
              <br className="hidden sm:block" />
              <span className="sm:inline"> </span>and Real Progress
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              Give your child access to engaging online lessons that build confidence, strengthen skills, and make learning feel exciting and achievable. Our platform brings together expert tutors, interactive digital tools, and supportive guidance that helps every learner succeed.
            </p>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 sm:mt-0">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                  Clear, Easy-to-Use Learning Platform
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 sm:mt-0">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                  High Student Engagement and Measurable Progress
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 sm:mt-0">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                  Supportive, Trained Educators Focused on Child's Growth
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get your Child Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Student Avatars Section */}
            <div className="pt-4 sm:pt-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 inline-block border border-gray-100 w-full sm:w-auto">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex -space-x-2 sm:-space-x-3">
                    {/* Avatar 1 */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                      L
                    </div>
                    {/* Avatar 2 */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                      E
                    </div>
                    {/* Avatar 3 */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                      A
                    </div>
                    {/* Avatar 4 */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                      R
                    </div>
                    {/* Avatar 5 */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                      N
                    </div>
                    {/* Avatar 6 */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                      C
                    </div>
                    {/* Avatar 7 */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                      I
                    </div>
                    {/* Plus More */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 sm:border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm sm:text-base md:text-lg shadow-lg">
                      L
                    </div>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">Building Strong</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Foundations for Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Video Interface */}
          <div className="relative animate-fade-in-right mt-8 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              {/* Video Call Interface */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                {/* Video Background */}
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] xl:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900">
                  {/* Placeholder for video - Replace with actual image */} 
                  <Image
                    src="/call-to-action.png" 
                    alt="Woman in video call with headphones"
                    fill
                    className="object-cover"
                  />
                  
                  {/* Control Bar */}
                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-3 md:gap-4 bg-white/95 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-2xl">
                    
                    <button className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                    
                    <button className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                    
                    <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors shadow-lg">
                      <Phone className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </button>
                  
                    <button className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                  </div> 
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out;
        }
      `}</style>
    </section>
  );
}
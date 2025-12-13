'use client';

import { useState, useRef, useEffect } from 'react';
import { BookOpen, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Instructors() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const instructors = [
    {
      name: 'Jennifer Patricia',
      role: 'Senior Instructor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    },
    {
      name: 'Hirmar Ubunti',
      role: 'Instructor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    },
    {
      name: 'Lily Michelle',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    },
    {
      name: 'Daniel Thomas',
      role: 'Junior Instructor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Instructor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'Senior Instructor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    },
  ];

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Ensure scrollability flags are correct on mount and resize
  useEffect(() => {
    checkScrollability();
    const onResize = () => checkScrollability();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // scroll by ~80% of visible width for predictable behavior across screen sizes
      const scrollAmount = Math.max(200, Math.floor(scrollContainerRef.current.clientWidth * 0.8));
      const newScrollLeft = direction === 'left'
        ? Math.max(0, scrollContainerRef.current.scrollLeft - scrollAmount)
        : Math.min(scrollContainerRef.current.scrollWidth, scrollContainerRef.current.scrollLeft + scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative Elements */}
      {/* Top Left - Leaf Pattern */}
      <div className="absolute top-10 left-10 opacity-20">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <ellipse cx="30" cy="20" rx="12" ry="25" fill="#3B82F6" transform="rotate(-30 30 20)" />
          <ellipse cx="50" cy="40" rx="12" ry="25" fill="#3B82F6" transform="rotate(-10 50 40)" />
          <ellipse cx="35" cy="65" rx="12" ry="25" fill="#3B82F6" transform="rotate(20 35 65)" />
          <ellipse cx="60" cy="75" rx="12" ry="25" fill="#3B82F6" transform="rotate(40 60 75)" />
          <ellipse cx="45" cy="100" rx="12" ry="25" fill="#3B82F6" transform="rotate(60 45 100)" />
        </svg>
      </div>

      {/* Top Center - Branch Pattern */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-20">
        <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
          <circle cx="40" cy="20" r="8" fill="#3B82F6" />
          <line x1="40" y1="28" x2="40" y2="50" stroke="#3B82F6" strokeWidth="3" />
          <circle cx="40" cy="50" r="6" fill="#3B82F6" />
          <line x1="40" y1="56" x2="25" y2="75" stroke="#3B82F6" strokeWidth="3" />
          <circle cx="25" cy="75" r="6" fill="#3B82F6" />
          <line x1="40" y1="56" x2="55" y2="75" stroke="#3B82F6" strokeWidth="3" />
          <circle cx="55" cy="75" r="6" fill="#3B82F6" />
          <line x1="40" y1="56" x2="40" y2="95" stroke="#3B82F6" strokeWidth="3" />
          <circle cx="40" cy="95" r="6" fill="#3B82F6" />
        </svg>
      </div>

      {/* Right Side - Curved Line */}
      <div className="absolute top-20 right-0 w-48 h-64 opacity-20">
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
          <path
            d="M 180 50 Q 120 150, 180 250"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom Left - Flower/Lotus Pattern */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          <ellipse cx="50" cy="40" rx="15" ry="30" fill="#3B82F6" />
          <ellipse cx="50" cy="40" rx="15" ry="30" fill="#3B82F6" transform="rotate(60 50 40)" />
          <ellipse cx="50" cy="40" rx="15" ry="30" fill="#3B82F6" transform="rotate(120 50 40)" />
          <ellipse cx="50" cy="40" rx="15" ry="30" fill="#3B82F6" transform="rotate(180 50 40)" />
          <ellipse cx="50" cy="40" rx="15" ry="30" fill="#3B82F6" transform="rotate(240 50 40)" />
          <ellipse cx="50" cy="40" rx="15" ry="30" fill="#3B82F6" transform="rotate(300 50 40)" />
        </svg>
      </div>

      {/* Bottom Center - Spiral Pattern */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <path
            d="M 50 50 Q 50 30, 70 30 Q 90 30, 90 50 Q 90 70, 70 70 Q 50 70, 50 50 Q 50 35, 65 35 Q 80 35, 80 50 Q 80 65, 65 65 Q 50 65, 50 50"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm md:text-base mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="uppercase tracking-wider">OUR INSTRUCTOR</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
            Meet Our Expert Instructor
          </h2>
        </div>

        {/* Instructors Scrollable Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            aria-disabled={!canScrollLeft}
            className={
              `absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 group ` +
              (canScrollLeft ? 'bg-white hover:bg-blue-600 hover:text-white' : 'bg-white/60 opacity-60 pointer-events-none')
            }
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            aria-disabled={!canScrollRight}
            className={
              `absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 group ` +
              (canScrollRight ? 'bg-white hover:bg-blue-600 hover:text-white' : 'bg-white/60 opacity-60 pointer-events-none')
            }
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Instructors */}
          <div
            id="instructors-container"
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            className="flex gap-8 md:gap-10 lg:gap-12 overflow-x-auto scroll-smooth hide-scrollbar px-4 py-8"
          >
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="group flex-shrink-0 w-72 md:w-80 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  {/* Decorative Circle Border with Dots */}
                  <div className="relative">
                    {/* Outer decorative circle */}
                    <svg
                      className="absolute inset-0 w-full h-full -m-4"
                      viewBox="0 0 300 300"
                    >
                      {/* Partial circle arc */}
                      <path
                        d="M 250 150 A 100 100 0 1 1 150 50"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.3"
                      />
                      {/* Top dot */}
                      <circle cx="150" cy="50" r="5" fill="#3B82F6" />
                      {/* Bottom dot */}
                      <circle cx="150" cy="280" r="5" fill="#3B82F6" />
                    </svg>

                    {/* Profile Image Container */}
                    <div className="relative aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>

                    {/* Plus Button */}
                    <button className="absolute bottom-4 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-110 group-hover:shadow-2xl">
                      <Plus className="w-6 h-6 text-white" strokeWidth={3} />
                    </button>
                  </div>

                  {/* Instructor Info */}
                  <div className="text-center mt-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      {instructor.name}
                    </h3>
                    <p className="text-sm md:text-base text-blue-600 font-medium">
                      {instructor.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}



'use client';

import { CheckCircle2, XCircle, ArrowRight, GraduationCap, Video } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [firstLine, setFirstLine] = useState("Your Child Deserves a");
  const [secondLine, setSecondLine] = useState("Tutor Who Understands Their World and Their Digital Future.");
  const [thirdLine1, setThirdLine1] = useState('');
  const [thirdLine2, setThirdLine2] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState(2); // 2: typing first, 1: typing third

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const thirdText1 = "Guiding Every Child to Learn, Confidently,";
  const thirdText2 = "Grow Globally, and Thrive in Digital World.";


  useEffect(() => {
    if (phase === 1) {
      // Typing third, after done, wait 8s, then type first
      // But since startTypingThird is called when entering phase 1
    } else if (phase === 2) {
      // Typing first
      setFirstLine('');
      setSecondLine('');
      setIsTyping(true);
      setShowCursor(true);
      let i = 0;
      const firstText = "Your Child Deserves a ";
      const secondText = "Tutor Who Understands Their World and Their Digital Future.";
      const interval = setInterval(() => {
        if (i < firstText.length) {
          setFirstLine(firstText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            let j = 0;
            const interval2 = setInterval(() => {
              if (j < secondText.length) {
                setSecondLine(secondText.slice(0, j + 1));
                j++;
              } else {
                clearInterval(interval2);
                setIsTyping(false);
                setShowCursor(false);
                // After typing first, wait 8s, then back to phase 1
                setTimeout(() => {
                  setPhase(1);
                }, 8000);
              }
            }, 50);
          }, 500);
        }
      }, 50);
    }
  }, [phase]);

  const startTypingThird = () => {
    setThirdLine1('');
    setThirdLine2('');
    setIsTyping(true);
    setShowCursor(true);
    let i = 0;
    const interval1 = setInterval(() => {
      if (i < thirdText1.length) {
        setThirdLine1(thirdText1.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval1);
        setTimeout(() => {
          let j = 0;
          const interval2 = setInterval(() => {
            if (j < thirdText2.length) {
              setThirdLine2(thirdText2.slice(0, j + 1));
              j++;
            } else {
              clearInterval(interval2);
              setIsTyping(false);
              setShowCursor(false);
              // After typing third, wait 8s, then type first
              setTimeout(() => {
                setPhase(2);
              }, 8000);
            }
          }, 50);
        }, 500);
      }
    }, 50);
  };

  useEffect(() => {
    if (phase === 1) {
      startTypingThird();
    }
  }, [phase]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (isTyping) {
        setShowCursor(prev => !prev);
      }
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isTyping]);

   return (
  <section className="relative lg:min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/20 to-white">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.15),transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)] animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,219,226,0.12),transparent_50%)] animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x"></div>

      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5"></div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoNzQsMTQ0LDIyNiwwLjIpIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        {/* Top Left Wavy Lines */}
        <svg className="absolute top-10 left-10 w-48 md:w-64 h-48 md:h-64 opacity-20 animate-float" viewBox="0 0 200 200">
          <path d="M 20 100 Q 50 80, 80 100 T 140 100 T 200 100" stroke="#4A90E2" strokeWidth="2" fill="none" />
          <path d="M 20 120 Q 50 100, 80 120 T 140 120 T 200 120" stroke="#4A90E2" strokeWidth="2" fill="none" />
          <path d="M 20 140 Q 50 120, 80 140 T 140 140 T 200 140" stroke="#4A90E2" strokeWidth="2" fill="none" />
        </svg>

        {/* Top Right Circle Pattern */}
        <svg className="absolute -top-20 -right-20 w-64 md:w-96 h-64 md:h-96 opacity-10 animate-float-delayed" viewBox="0 0 400 400">
          <circle cx="200" cy="100" r="150" stroke="#4A90E2" strokeWidth="3" fill="none" />
          <circle cx="200" cy="100" r="180" stroke="#1C3C68" strokeWidth="2" fill="none" />
        </svg>

        {/* Left Side Chevron Pattern */}
        <div className="absolute top-1/4 left-0 animate-float-slow hidden md:block">
            <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-20">
            <path d="M 10 20 L 25 30 L 10 40" stroke="#1C3C68" strokeWidth="2" fill="none" />
            <path d="M 20 20 L 35 30 L 20 40" stroke="#1C3C68" strokeWidth="2" fill="none" />
            <path d="M 30 20 L 45 30 L 30 40" stroke="#1C3C68" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Bottom Left Wavy Pattern */}
        <svg className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-32 md:w-48 h-32 md:h-48 opacity-15 animate-float" viewBox="0 0 200 200">
          <path d="M 0 100 Q 25 80, 50 100 T 100 100 T 150 100 T 200 100" stroke="#4A90E2" strokeWidth="2" fill="none" />
          <path d="M 0 120 Q 25 100, 50 120 T 100 120 T 150 120 T 200 120" stroke="#4A90E2" strokeWidth="2" fill="none" />
        </svg>

        {/* Floating Dots Pattern - Bottom Center */}
  <div className="absolute bottom-8 md:bottom-32 left-1/4 animate-float-delayed hidden sm:block">
          <div className="grid grid-cols-6 md:grid-cols-8 gap-1.5 md:gap-2">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 md:w-2 h-1.5 md:h-2 bg-[#4A90E2] rounded-full opacity-40"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animation: 'pulse 3s ease-in-out infinite'
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Side Decorative Circles */}
          <div className="absolute top-1/3 right-10 animate-float-slow opacity-10 hidden lg:block">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#4A90E2" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="#1C3C68" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="#4A90E2" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-10 pb-8 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1 text-center md:text-left mx-auto lg:mx-0 max-w-2xl px-4 sm:px-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-black">
              <div className="w-6 md:w-8 h-0.5 bg-[#F5A623]"></div>
              <span className="uppercase tracking-wider">Learncil Personalized Tutoring</span>
            </div>

            {/* Heading */}
            <div className="space-y-2 md:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight min-h-[200px]">
                {phase === 2 ? (
                  <>
                    <span className="text-[#1C3C68]">{firstLine}</span>
                    <br />
                    <span className="text-black">{secondLine}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#1C3C68]">{thirdLine1}</span>
                    {thirdLine1 === thirdText1 && <br />}
                    <span className="text-black">{thirdLine2}</span>
                  </>
                )}
                {showCursor && <span>|</span>}
              </h1>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6 text-[#1C3C68] flex-shrink-0" />
                <span className="font-medium text-black">Personalized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 md:w-6 h-5 md:h-6 bg-[#F5A623] rounded-full flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-3 md:w-4 h-3 md:h-4 text-white" />
                </div>
                <span className="font-medium text-black">Learn Confidently</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 md:w-6 h-5 md:h-6 bg-[#1C3C68] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 md:w-4 h-3 md:h-4 text-white" />
                </div>
                <span className="font-medium text-black">Understand Better</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 items-center sm:items-start">
              <button
                onClick={() => scrollToSection('booking')}
                className="group flex items-center justify-center gap-2 bg-[#F5A623] text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-[#e08f15] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                GET STARTED
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="group flex items-center justify-center gap-2 bg-[#1C3C68] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-[#162a49] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                OUR COURSES
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content - Image Section (hidden on small screens) */}
          <div className="relative animate-fade-in-right order-2 lg:order-2 hidden lg:block">
            <div className="relative w-full max-w-xl mx-auto">
              <div className="relative w-full h-[28rem] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/learncil-hero-image.png"
                  alt="Group of students learning together"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Stats Cards (hidden on small screens) */}
              {/* Active Students Card - Bottom Left */}
              <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-[-100px] bg-white rounded-xl md:rounded-2xl shadow-2xl p-2 sm:p-3 md:p-4 hidden lg:flex lg:items-center lg:gap-4 animate-float z-10 w-[120px] sm:w-[180px] md:w-[200px]">
                <div className="bg-[#1C3C68] rounded-full p-2 sm:p-2.5 md:p-3 flex-shrink-0">
                  <GraduationCap className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black whitespace-nowrap">
                  Learn<span className="text-[#4A90E2]">+</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Grow & Excel</div>
                </div>
              </div>

              {/* Online Video Courses Card - Top Right (hidden on small screens) */}
              <div className="absolute top-[10%] sm:top-[15%] md:top-[15%] -right-8 sm:-right-6 bg-white rounded-xl md:rounded-2xl shadow-2xl p-2 sm:p-3 md:p-4 hidden lg:flex lg:items-center lg:gap-4 animate-float-delayed z-10 w-[140px] sm:w-[20px] md:w-[220px]">
                <div className="bg-[#F5A623] rounded-full p-2 sm:p-2.5 md:p-3 flex-shrink-0">
                  <Video className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
                    Access<span className="text-[#F5A623]">+</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Anywhere</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(10px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out;
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
          background-size: 200% 200%;
        }

        @media (max-width: 1024px) {
          .animate-float, .animate-float-delayed {
            animation: float 4s ease-in-out infinite;
          }
        }
      `}</style>
    </section>
  );
}

'use client';

import { FileText, CheckSquare, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutExperienceSection() {
  const [firstImageError, setFirstImageError] = useState(false);
  const [secondImageError, setSecondImageError] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border-4 border-blue-100 rounded-full opacity-30 animate-float-slow"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-blue-100 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Side - Creative Image Layout */}
          <div className="relative">
            {/* Mobile/Tablet Layout (Hidden on Desktop) */}
            <div className="block lg:hidden">
              <div className="relative px-4">
                {/* First Image */}
                <div className="relative w-full h-[280px] md:h-[340px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 bg-blue-50">
                  <Image
                    src={firstImageError ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KM0ZoGIaKKKBCUtIKKBiHFIKM0UAJR3paKAENApaKAG/jRilooASig0UAFGaSikA6iiigYlJS0UAJRS0lAhKKXFJQMKKWigBKKKWgBKO9FFACUUtJQAlFLSUALRSUtAxKQ0tJSELRSUUDFpKWkoAKKKKACiiigApKKKAEpaTNFMQtJRRQAlLSUtIYUlFFABRRRQB//2Q==" : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=75"}
                    alt="Students studying together in library"
                    fill
                    className="object-cover"
                    priority
                    onError={() => setFirstImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Experience Badge - Overlapping both images */}
                <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-full w-40 h-40 md:w-48 md:h-48 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-center group hover:scale-105 transition-all duration-500">
                    {/* Enhanced Gradient Border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-white via-white to-blue-50"></div>
                    
                    {/* Inner Content */}
                    <div className="relative z-10 text-center p-4">
                      {/* Icon */}
                      <div className="mb-1">
                        <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-500">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-sm transform rotate-45 group-hover:rotate-[225deg] transition-transform duration-500"></div>
                        </div>
                      </div>
                      
                      {/* Text Content */}
                      <div className="mt-2">
                        <div className="text-[11px] md:text-sm uppercase tracking-wider text-blue-600 font-medium">Personalized Learning</div>
                        <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent my-1">100%</div>
                        <div className="text-[11px] md:text-sm uppercase tracking-wider text-gray-600 font-medium">Trusted by Families</div>
                      </div>
                    </div>

                    {/* Rotating Circle Text */}
                    <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                      <defs>
                        <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"></path>
                      </defs>
                      <text className="text-[11px] md:text-[13px]" fill="#3B82F6">
                        <textPath href="#circlePath" startOffset="0%">
                          • TRANSFORMING EDUCATION • INSPIRING FUTURES • LEARNING EXCELLENCE •
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Second Image */}
                <div className="relative w-full h-[280px] md:h-[340px] mt-4 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 bg-blue-50">
                  <Image
                    src={secondImageError ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KM0ZoGIaKKKBCUtIKKBiHFIKM0UAJR3paKAENApaKAG/jRilooASig0UAFGaSikA6iiigYlJS0UAJRS0lAhKKXFJQMKKWigBKKKWgBKO9FFACUUtJQAlFLSUALRSUtAxKQ0tJSELRSUUDFpKWkoAKKKKACiiigApKKKAEpaTNFMQtJRRQAlLSUtIYUlFFABRRRQB//2Q==" : "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&q=75"}
                    alt="Students collaborating on laptop"
                    fill
                    className="object-cover"
                    onError={() => setSecondImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Desktop Layout (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block relative h-[700px]">
              {/* Main Image */}
              <div className="absolute top-0 left-0 w-[65%] h-[70%] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 bg-blue-50">
                <Image
                  src={firstImageError ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KM0ZoGIaKKKBCUtIKKBiHFIKM0UAJR3paKAENApaKAG/jRilooASig0UAFGaSikA6iiigYlJS0UAJRS0lAhKKXFJQMKKWigBKKKWgBKO9FFACUUtJQAlFLSUALRSUtAxKQ0tJSELRSUUDFpKWkoAKKKKACiiigApKKKAEpaTNFMQtJRRQAlLSUtIYUlFFABRRRQB//2Q==" : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=75"}
                  alt="Students studying together in library"
                  fill
                  className="object-cover"
                  priority
                  onError={() => setFirstImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-[15%] right-[5%] z-30">
                <div className="relative bg-white rounded-full w-52 h-52 shadow-2xl flex items-center justify-center animate-float group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400 opacity-20"></div>
                  <div className="absolute inset-[3px] rounded-full bg-white"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-xs uppercase tracking-widest text-blue-600"><b>Learncil</b></div>
                    <div className="text-5xl font-extrabold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">100%</div>
                    <div className="text-xs uppercase tracking-widest text-gray-600"><b>Trusted</b></div>
                  </div>
                </div>
              </div>

              {/* Secondary Image */}
              <div className="absolute bottom-0 right-0 w-[60%] h-[55%] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 bg-blue-50">
                <Image
                  src={secondImageError ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KM0ZoGIaKKKBCUtIKKBiHFIKM0UAJR3paKAENApaKAG/jRilooASig0UAFGaSikA6iiigYlJS0UAJRS0lAhKKXFJQMKKWigBKKKWgBKO9FFACUUtJQAlFLSUALRSUtAxKQ0tJSELRSUUDFpKWkoAKKKKACiiigApKKKAEpaTNFMQtJRRQAlLSUtIYUlFFABRRRQB//2Q==" : "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&q=75"}
                  alt="Students collaborating on laptop"
                  fill
                  className="object-cover"
                  onError={() => setSecondImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="uppercase tracking-wider text-blue-600 font-bold text-sm">GET TO KNOW ABOUT US</span>
            </div>

            {/* Heading with Gradient */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
              Shaping Confident,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Curious, and Future-Ready Learners
              </span>
              <br />
              Everywhere.
              
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              LearnCil Academy is a modern learning community designed to help every child grow with confidence, curiosity, and the skills they need to succeed in today’s world. We believe that education should feel engaging, personal, and empowering not confusing, stressful, or one-size-fits-all.
        </p>

            {/* Enhanced Features List */}
            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <CheckSquare className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-base md:text-lg text-gray-700 font-semibold pt-0.5">
                  <b>Personalized mastery-based learning: </b>Learning tailored to each child’s strengths and pace.
                </p>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <CheckSquare className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-base md:text-lg text-gray-700 font-semibold pt-0.5">
                  <b>Culturally sensitive teaching: </b>Instruction that respects identity and learning style.
                </p>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <CheckSquare className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-base md:text-lg text-gray-700 font-semibold pt-0.5">
                  <b>Curriculum versatility:</b> Support for British, American, Nigerian, and hybrid systems.
                </p>
              </div>

              
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <CheckSquare className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-base md:text-lg text-gray-700 font-semibold pt-0.5">
                 <b>Tech-forward instruction: </b> Digital tools and interactive platforms that enhance learning.
                </p>
              </div>

            </div>

            {/* Enhanced CTA Button */}
            <div className="pt-6">
              <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-xl font-bold text-base md:text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden">
                <span className="absolute inset-0 w-0 bg-white opacity-10 group-hover:w-full transition-all duration-500"></span>
                <span className="relative">ABOUT MORE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </section>
  );
}
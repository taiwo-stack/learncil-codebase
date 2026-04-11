'use client';

import { CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function AboutExperienceSection() {
  const features = [
    {
      title: "Personalized Mastery-Based Learning",
      description: "Learning tailored to each child's unique strengths, pace, and individual learning style."
    },
    {
      title: "Culturally Sensitive Teaching",
      description: "Instruction that deeply respects identity, heritage, and diverse cultural backgrounds."
    },
    {
      title: "Curriculum Versatility",
      description: "Expert support for British, American, Nigerian, and innovative hybrid educational systems."
    },
    {
      title: "Tech-Forward Instruction",
      description: "Advanced digital tools and interactive platforms that enhance the modern learning experience."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Clean Image Composition */}
          <div className="relative animate-fade-in">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6 pt-12">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                    alt="Students studying"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-full overflow-hidden border-8 border-blue-50 bg-blue-50 flex items-center justify-center p-8">
                   <div className="text-center">
                     <span className="block text-4xl font-extrabold text-[#1C3C68]">100%</span>
                     <span className="text-xs uppercase tracking-widest font-bold text-gray-500">Trusted</span>
                   </div>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-blue-50 transform hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                    alt="Learning together"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl transform hover:translate-y-2 transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80"
                    alt="Classroom"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Right Side Content */}
          <div className="space-y-8 animate-fade-in-right">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-md border border-blue-100">
                <span className="uppercase tracking-widest text-[#1C3C68] font-bold text-xs">Getting to Know Us</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Shaping Confident, <span className="text-[#1C3C68]">Curious</span>, and Future-Ready Learners
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                LearnCil Academy is a modern learning community designed to help every child grow with confidence. We believe education should be engaging, personal, and empowering—never one-size-fits-all.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid sm:grid-cols-1 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#1C3C68] transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4 text-[#1C3C68] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button 
                onClick={() => document.getElementById('about-founder')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 bg-[#1C3C68] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#152e50] transition-all shadow-lg hover:shadow-[#1C3C68]/20"
              >
                OUR LEADERSHIP
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
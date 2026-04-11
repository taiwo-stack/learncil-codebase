'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#1C3C68]">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
              <span className="uppercase tracking-widest text-blue-200 font-bold text-xs">Who We Are</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Empowering the Next Generation of <span className="text-blue-400">Global Leaders</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-xl">
              LearnCil Academy is more than just an education platform. We are a community dedicated to shaping curious minds and building future-ready skills.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('about-founder')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#1C3C68] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/10 flex items-center gap-2"
              >
                Meet Our Founders <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=75"
                alt="About Learncil"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3C68]/60 to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-6 rounded-2xl shadow-xl hidden md:block">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm opacity-80 uppercase tracking-widest font-bold">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

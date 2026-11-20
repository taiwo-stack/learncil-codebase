'use client';

import { ArrowRight, CheckCircle2, TrendingUp, Video } from 'lucide-react';
import Image from 'next/image';

const highlights = ['Personalized', 'Learn Confidently', 'Understand Better'];

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-sky/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-brand-gold/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="animate-in fade-in slide-in-from-bottom-4 text-center duration-700 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-navy ring-1 ring-brand-navy/10">
              <span className="h-2 w-2 rounded-full bg-brand-gold" />
              Personalized Tutoring · Coding · AI · STEAM
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-brand-navy-dark sm:text-4xl lg:text-5xl">
              Your Child Deserves a Tutor Who Understands Their World and{' '}
              <span className="relative whitespace-nowrap text-brand-navy">
                Their Digital Future.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 -z-10 h-3 w-full rounded-full bg-brand-gold/40"
                />
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
              Guiding every child to learn confidently, grow globally, and thrive
              in the digital world.
            </p>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold text-brand-navy-dark sm:text-base">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-brand-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('booking')}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-7 py-3.5 text-base font-bold text-brand-navy-dark shadow-lg shadow-brand-gold/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold-dark hover:shadow-xl sm:w-auto"
              >
                Book a consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-brand-navy ring-2 ring-brand-navy/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-navy hover:text-white hover:ring-brand-navy sm:w-auto"
              >
                Explore courses
              </button>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              Supporting UK, US, Canadian and Nigerian curricula
            </p>
          </div>

          {/* Image */}
          <div className="animate-in fade-in slide-in-from-bottom-6 relative mx-auto w-full max-w-md duration-1000 lg:max-w-lg">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] bg-brand-gold/25"
            />
            <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-brand-navy/10">
              <Image
                src="/learncil-hero-image.png"
                alt="Group of students learning together"
                fill
                sizes="(min-width: 1024px) 512px, 90vw"
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl ring-1 ring-brand-navy/10 sm:-left-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-white">
                <Video className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold leading-tight text-brand-navy-dark">
                Live online
                <br />
                classes
              </span>
            </div>

            <div className="absolute -bottom-2 left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl ring-1 ring-brand-navy/10 sm:-left-6 sm:bottom-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-navy-dark">
                <TrendingUp className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold leading-tight text-brand-navy-dark">
                Regular progress
                <br />
                updates
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

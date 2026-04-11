"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

type Student = {
  id: string;
  name: string;
  role?: string;
  image: string;
  quote: string;
  rating?: number; // 0-5
};

const defaultStudents: Student[] = [
  {
    id: "funmito",
    name: "Funmito Dorcas",
    role: "Parent",
    image: "/parent_1.png",
    quote:
      "LearnCil took the time to understand my child's strengths and learning gaps through a thorough assessment. They provided a clear learning plan, consistent progress updates, and supportive instructors who made my child more confident and engaged. The structured approach and personalized guidance truly exceeded my expectations.",
    rating: 5,
  },
  {
    id: "aisha",
    name: "Aisha Anathony",
    role: "Parent",
    image: "/parent_2.jpg",
    quote:
      "The LearnCil experience was truly transformational. My child received hands-on support, personalized lessons, and encouragement from instructors who genuinely cared. I noticed improvements not just academically but also in confidence and curiosity.",
    rating: 5,
  },
  {
    id: "okewumi",
    name: "Okewumi Taiwo",
    role: "Parent",
    image: "/parent_3.png",
    quote:
      "LearnCil provides a supportive and structured environment. The lesson plans are clear, the curriculum is engaging, and the regular feedback helps us stay updated on our child's progress. I highly recommend LearnCil to any parent who wants real academic improvement.",
    rating: 5,
  },
];


export default function StudentTestimonial({
  students = defaultStudents,
}: {
  students?: Student[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // simple auto-advance every 8s
    const t = setInterval(() => setIndex((i) => (i + 1) % students.length), 8000);
    return () => clearInterval(t);
  }, [students.length]);

  const prev = () => setIndex((i) => (i - 1 + students.length) % students.length);
  const next = () => setIndex((i) => (i + 1) % students.length);

  const s = students[index];

  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50/30 to-rose-50/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">
            Parent Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">
            What Say&apos;s About Learncil
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - big image (centered) */}
          <div className="order-1 lg:order-1 flex justify-center lg:justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-md lg:max-w-none">
              <div className="relative h-80 lg:h-[420px] bg-gray-100 flex items-center justify-center">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Right - quote and meta (fixed min-height to avoid layout shift) */}
          <div className="order-2 lg:order-2">
            <div className="relative min-h-[320px] md:min-h-[420px] flex flex-col justify-between">
              <div>
                {/* Quote mark */}
                <div className="text-blue-500 text-6xl md:text-7xl leading-none mb-4">&quot;</div>

                <blockquote className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {s.quote}
                </blockquote>
              </div>

              {/* Divider line */}
              <div className="w-full h-px bg-gray-200 my-4"></div>

              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(max-width: 96px) 100vw, 96px"
                    className="object-cover object-top"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg text-gray-900 truncate">{s.name}</div>
                  <div className="text-sm text-blue-600 font-medium">{s.role}</div>

                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <div className="flex items-center text-amber-400 mr-2">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="ml-1 font-semibold text-amber-600">{s.rating ?? "—"}</span>
                    </div>
                    <div className="text-xs text-gray-500">(based on recent feedback)</div>
                  </div>
                </div>

                {/* Controls positioned as part of the flex layout */}
                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex justify-center gap-4 mt-8 lg:hidden">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition"
          >
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

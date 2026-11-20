"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  testimonials as defaultTestimonials,
  type Testimonial,
} from "@/data/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Avatar({ person }: { person: Testimonial }) {
  return (
    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-brand-navy-100 ring-2 ring-white">
      {person.image ? (
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="48px"
          className="object-cover object-top"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-bold text-brand-navy">
          {initials(person.name)}
        </span>
      )}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-brand-gold text-brand-gold" : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function StudentTestimonial({
  students = defaultTestimonials,
}: {
  students?: Testimonial[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const sync = useCallback((embla: NonNullable<CarouselApi>) => {
    setSnapCount(embla.scrollSnapList().length);
    setSelected(embla.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    sync(api);
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api, sync]);

  const showControls = snapCount > 1;

  return (
    <section className="bg-brand-navy-50 px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-gold-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-gold-dark">
            Parent stories
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-brand-navy-dark md:text-4xl">
            What parents say about LearnCil
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Real feedback from families who have learned with us.
          </p>
        </div>

        {/* Cards */}
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          aria-label="Parent testimonials"
        >
          <CarouselContent className="-ml-6">
            {students.map((person) => (
              <CarouselItem
                key={person.id}
                className="pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/10 transition-shadow duration-300 hover:shadow-lg">
                  <div className="mb-5 flex items-center justify-between">
                    <Quote
                      className="h-9 w-9 fill-brand-gold/20 text-brand-gold"
                      aria-hidden="true"
                    />
                    {person.rating ? <Stars rating={person.rating} /> : null}
                  </div>

                  <blockquote className="flex-1 text-[15px] leading-7 text-slate-700">
                    {person.quote}
                  </blockquote>

                  <figcaption className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6">
                    <Avatar person={person} />
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-brand-navy-dark">
                        {person.name}
                      </div>
                      {person.role ? (
                        <div className="text-sm text-slate-500">
                          {person.role}
                        </div>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Controls (only shown when there are more cards than fit on screen) */}
        {showControls && (
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm ring-1 ring-brand-navy/10 transition hover:bg-brand-navy hover:text-white disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: snapCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === selected}
                  className={`h-2.5 rounded-full transition-all ${
                    i === selected
                      ? "w-7 bg-brand-gold"
                      : "w-2.5 bg-brand-navy/20 hover:bg-brand-navy/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm ring-1 ring-brand-navy/10 transition hover:bg-brand-navy hover:text-white disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Invite more stories */}
        <p className="mt-10 text-center text-sm text-slate-600">
          Learning with LearnCil?{" "}
          <a
            href="mailto:info@learncil.com?subject=My%20LearnCil%20experience"
            className="font-semibold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-navy-dark"
          >
            Share your experience
          </a>
        </p>
      </div>
    </section>
  );
}

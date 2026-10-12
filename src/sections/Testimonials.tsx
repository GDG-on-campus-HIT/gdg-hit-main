"use client";
import React from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLoadTestimonialQuery } from "@/redux/features/api/apiSlice";
import { GradientWord, Reveal, SectionHeading } from "@/components/home/primitives";
import { accentCycle, accentStyles } from "@/components/home/accents";

type Testimonial = { _id?: string; name: string; department: string; message: string };

const MARQUEE_THRESHOLD = 4;

function Testimonials() {
  const { data } = useLoadTestimonialQuery({});
  const testimonials: Testimonial[] = data?.testimonials ?? [];

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="relative py-16 md:py-24">
      <div className="max-container">
        <SectionHeading
          align="center"
          title={
            <>
              Words from Our <GradientWord accent="blue">Community</GradientWord>
            </>
          }
          description="Hear from our members about their experiences, growth, and the impact GDG HIT has had on their tech journey."
        />

        {testimonials.length < MARQUEE_THRESHOLD && (
          <div
            className={cn(
              "mx-auto grid gap-4",
              testimonials.length === 1 ? "max-w-2xl" : "md:grid-cols-2",
              testimonials.length === 3 && "lg:grid-cols-3"
            )}
          >
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial._id ?? testimonial.name} delay={0.08 * index} className="h-full">
                <TestimonialQuote testimonial={testimonial} index={index} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {testimonials.length >= MARQUEE_THRESHOLD && (
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className="mx-auto"
        />
      )}
    </section>
  );
}

function TestimonialQuote({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const accent = accentStyles[accentCycle[index % accentCycle.length]];

  return (
    <figure className="gradient-card relative flex h-full flex-col gap-8 overflow-hidden rounded-3xl border border-black/5 p-8 dark:border-white/5 md:p-10">
      <Quote className={cn("h-8 w-8 opacity-80", accent.text)} />
      <blockquote className="flex-1 text-lg leading-relaxed tracking-tight text-neutral-800 dark:text-neutral-200 md:text-xl">
        {testimonial.message}
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-black/5 pt-6 dark:border-white/5">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold uppercase ring-1",
            accent.chip
          )}
        >
          {testimonial.name.substring(0, 1)}
        </span>
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">{testimonial.name}</p>
          <p className="text-xs text-neutral-500">{testimonial.department}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Testimonials;

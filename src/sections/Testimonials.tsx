"use client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLoadTestimonialQuery } from "@/redux/features/api/apiSlice";
import React from "react";

function Testimonials() {
  const { isLoading, data } = useLoadTestimonialQuery({});

  return (
    <section className="w-full py-16">
      <div className="max-container">
        <div className=" mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl text-center white-gradient-text mb-3 leading-[1.25]">
            Words from Our{" "}
            <span className="from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="max-w-2xl text-center mx-auto text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            Hear from our members about their experiences, growth, and the
            impact GDG HIT has had on their tech journey.
          </p>
        </div>
      </div>
      <div className=" rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        {data && data.testimonials && (
          <InfiniteMovingCards
            items={data.testimonials}
            direction="right"
            speed="slow"
          />
        )}
      </div>
    </section>
  );
}

export default Testimonials;

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
    subtitle: "GDG HIT Member",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
    subtitle: "GDG HIT Member",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    subtitle: "GDG HIT Member",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    subtitle: "GDG HIT Member",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
    subtitle: "GDG HIT Member",
  },
];

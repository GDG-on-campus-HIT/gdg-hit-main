'use client';

import Link from "next/link";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { CtaLink, GradientWord } from "@/components/home/primitives";
import { cn } from "@/lib/utils";
import { EventType } from "@/app/(root)/events/types";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { useGetActiveRecruitmentFormQuery } from "@/redux/features/api/apiSlice";

const fanPhotos = [
  {
    src: "/img/sliders/3.jpg",
    alt: "Certificates and medals from a GDG HIT quiz",
    position: "z-0 hidden md:block md:-translate-x-[125%] md:translate-y-10 md:-rotate-[10deg] md:scale-[0.82]",
  },
  {
    src: "/img/group-img1.jpeg",
    alt: "The GDG HIT core team in front of the Haldia Institute of Technology building",
    position: "z-10 -translate-x-[58%] translate-y-4 -rotate-[6deg] scale-[0.9] md:-translate-x-[68%]",
  },
  {
    src: "/img/team-2026.jpg",
    alt: "The GDG HIT community at night in front of the lit HIT campus sign",
    position: "z-20 scale-[1.06] md:scale-110",
  },
  {
    src: "/img/sliders/5.jpg",
    alt: "Quiz winners holding their certificates and medals",
    position: "z-10 translate-x-[58%] translate-y-4 rotate-[6deg] scale-[0.9] md:translate-x-[68%]",
  },
  {
    src: "/img/sliders/1.jpg",
    alt: "A packed classroom at a GDG HIT session with faculty in the front row",
    position: "z-0 hidden md:block md:translate-x-[125%] md:translate-y-10 md:rotate-[10deg] md:scale-[0.82]",
  },
];

function PhotoFan() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto mt-16 h-[190px] w-full max-w-6xl sm:h-[250px] md:mt-20 md:h-[300px] lg:h-[350px]">
      {fanPhotos.map((photo, index) => (
        <div
          key={photo.src}
          className={cn(
            "absolute left-1/2 top-0 -ml-[105px] w-[210px] sm:-ml-[140px] sm:w-[280px] lg:-ml-[170px] lg:w-[340px]",
            photo.position
          )}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + Math.abs(index - 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
            src={photo.src}
            alt={photo.alt}
            width={1024}
            height={768}
            fetchPriority={index === 2 ? "high" : undefined}
            loading={index === 2 ? undefined : "lazy"}
            className="aspect-[4/3] w-full rounded-2xl border border-black/10 object-cover shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] dark:border-white/10 dark:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const { data } = useEventQuery({});
  const { data: activeRecruitmentData } = useGetActiveRecruitmentFormQuery({});

  const events: EventType[] = data?.events ?? [];
  const nextEvent =
    events.find((event) => event.is_upcoming) ?? events.find((event) => event.registration_open);
  const recruitmentForm = activeRecruitmentData?.form;

  const announcement = nextEvent
    ? {
        text: `Next up: ${[nextEvent.name, nextEvent.eventDate].filter(Boolean).join(", ")}.`,
        href: `/events/${nextEvent._id}`,
        action: "Register",
      }
    : recruitmentForm
      ? {
          text: "We're recruiting. Build, learn and lead with us.",
          href: `/recruitment/form?formId=${recruitmentForm._id}`,
          action: "Apply now",
        }
      : null;

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/30 via-red-500/15 to-yellow-500/25 opacity-50 blur-[140px] dark:opacity-30" />
        <div className="absolute bottom-0 left-1/2 h-[20rem] w-[50rem] -translate-x-1/2 rounded-full bg-green-500/15 opacity-50 blur-[140px] dark:opacity-25" />
      </div>
      <Spotlight
        className="-top-40 left-0 motion-reduce:animate-none motion-reduce:opacity-100 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="max-container relative z-10 flex flex-col items-center pb-20 pt-12 text-center md:pb-28 md:pt-24">
        <h1 className="max-w-6xl tracking-tight">
          <span className="white-gradient-text block text-xl font-medium sm:text-2xl md:text-3xl lg:text-4xl">
            Step into the world of possibilities with GDG HIT
          </span>
          <span className="mt-3 block text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <GradientWord accent="red">Grow,</GradientWord>{" "}
            <GradientWord accent="blue">Connect</GradientWord>{" "}
            <GradientWord accent="green">and</GradientWord>{" "}
            <GradientWord accent="yellow">Lead</GradientWord>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
          A free, student-run Google Developer Group at Haldia Institute of Technology. Workshops,
          study jams, hackathons and DevFest, open to every branch and year.
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <CtaLink href="/events">Explore events</CtaLink>
          <CtaLink href="/about-us" variant="secondary">
            Learn more
          </CtaLink>
        </div>

        {announcement && (
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
            <span aria-hidden className="h-2 w-2 rounded-full bg-green-500" />
            {announcement.text}
            <Link
              href={announcement.href}
              className="font-medium text-neutral-900 underline decoration-blue-500 underline-offset-4 hover:decoration-2 dark:text-white"
            >
              {announcement.action}
            </Link>
          </p>
        )}

        <PhotoFan />
      </div>
    </section>
  );
}

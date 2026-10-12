'use client';

import Link from "next/link";
import React from "react";
import { InfiniteMovingCardImg } from "@/components/ui/infinite-moving-cards-img";
import FeaturedEventCard from "@/components/events/FeaturedEventCard";
import { Spotlight } from "@/components/ui/spotlight";
import { CtaLink, GradientWord } from "@/components/home/primitives";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { useGetActiveRecruitmentFormQuery } from "@/redux/features/api/apiSlice";

export function HeroSection() {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data } = useEventQuery({});
  const { data: activeRecruitmentData } = useGetActiveRecruitmentFormQuery({});

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const eventsArray: any[] = data?.events ?? [];
  const upcomingEvent = eventsArray.find((event) => event.is_upcoming === true);
  const registrationOpenEvent = eventsArray.find(
    (event) => event.registration_open === true && !upcomingEvent
  );
  const activeRecruitmentForm = activeRecruitmentData?.form;

  const primaryEvent = upcomingEvent ?? registrationOpenEvent;

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/30 via-red-500/15 to-yellow-500/25 opacity-50 blur-[140px] dark:opacity-30" />
        <div className="absolute bottom-0 right-[-10rem] h-[24rem] w-[24rem] rounded-full bg-green-500/20 opacity-40 blur-[120px] dark:opacity-20" />
      </div>
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="max-container relative z-10 flex flex-col items-center pb-20 pt-20 text-center md:pt-32">
        <h1 className="max-w-6xl tracking-tight">
          <span className="white-gradient-text block text-xl font-medium sm:text-2xl md:text-3xl lg:text-4xl">
            Step into the World of Possibilities with GDG HIT
          </span>
          <span className="mt-3 block text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <GradientWord accent="red">Grow,</GradientWord>{" "}
            <GradientWord accent="blue">Connect</GradientWord>{" "}
            <GradientWord accent="green">and</GradientWord>{" "}
            <GradientWord accent="yellow">Lead</GradientWord>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
          Join a vibrant community of developers, innovators, and tech enthusiasts.
          Experience the power of Google Developer technologies and shape the
          future of technology.
        </p>

        <div className="mt-10 flex min-h-[48px] flex-col items-center gap-3 sm:flex-row">
          {isMounted && (
            <>
              {primaryEvent ? (
                <CtaLink href={`/events/${primaryEvent._id}`}>Register now</CtaLink>
              ) : (
                <CtaLink href="/events">Explore events</CtaLink>
              )}
              <CtaLink href="/about-us" variant="secondary">
                Learn more
              </CtaLink>
            </>
          )}
        </div>

        {isMounted && activeRecruitmentForm && (
          <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
            We&apos;re recruiting — build, learn and lead with us.{" "}
            <Link
              href={`/recruitment/form?formId=${activeRecruitmentForm._id}`}
              className="font-medium text-neutral-900 underline decoration-blue-500 underline-offset-4 transition-all hover:decoration-2 dark:text-white"
            >
              Apply now
            </Link>
          </p>
        )}

        {isMounted && upcomingEvent ? (
          <FeaturedEventCard
            event={upcomingEvent}
            label="Upcoming event"
            className="mt-16 max-w-5xl md:mt-20"
          />
        ) : (
          <div className="relative mt-16 w-full md:mt-20">
            <InfiniteMovingCardImg
              items={galleryImages}
              direction="right"
              speed="slow"
              className="mx-auto [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
            />
          </div>
        )}
      </div>
    </section>
  );
}

const galleryImages = [
  { image: "/img/group-img1.jpeg" },
  { image: "/img/sliders/1.jpg" },
  { image: "/img/sliders/2.jpg" },
  { image: "/img/sliders/3.jpg" },
  { image: "/img/sliders/4.jpg" },
  { image: "/img/sliders/5.jpg" },
];

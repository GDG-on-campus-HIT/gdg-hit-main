"use client";
import React from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { EventType } from "@/app/(root)/events/types";
import EventTile from "@/components/events/EventTile";
import {
  GradientWord,
  Reveal,
  SectionHeading,
  SectionLink,
} from "@/components/home/primitives";

const MAX_EVENTS = 5;

const Events: React.FC = () => {
  const { isLoading } = useEventQuery({});
  const { event } = useSelector((state: any) => state.event);

  const events: EventType[] = (Array.isArray(event) ? event : [])
    .filter((item: EventType) => item?._id && item?.name)
    .slice(0, MAX_EVENTS);

  return (
    <section id="events" className="relative py-16 md:py-24">
      <div className="max-container">
        <SectionHeading
          title={
            <>
              Shaping the <GradientWord accent="red">Future</GradientWord>
              <br className="hidden sm:block" /> Through Our Events
            </>
          }
          description="Explore workshops, hackathons, speaker sessions, and tech meetups designed to enhance learning, collaboration, and innovation."
          action={<SectionLink href="/events">View all events</SectionLink>}
        />

        {isLoading && events.length === 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: MAX_EVENTS }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "gradient-card animate-pulse rounded-3xl border border-black/5 dark:border-white/5",
                  index === 0 ? "h-[420px] md:col-span-2 lg:row-span-2 lg:h-auto" : "h-[260px]"
                )}
              />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {events.map((item, index) => (
              <Reveal
                key={item._id}
                delay={0.05 * index}
                className={cn("h-full", index === 0 && "md:col-span-2 lg:row-span-2")}
              >
                <EventTile event={item} featured={index === 0} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-black/15 p-12 text-center dark:border-white/10">
            <p className="text-neutral-600 dark:text-neutral-400">
              New events are on the way. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;

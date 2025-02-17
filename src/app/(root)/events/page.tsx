"use client";

import React from "react";

import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { useSelector } from "react-redux";
import EventCard from "@/components/EventCards";

export default function EventsPage() {
  const { isLoading, isError, data } = useEventQuery({});
  const { event } = useSelector((state: any) => state.event);

  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <section className="max-container my-20">
        <div className=" mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25] text-center">
            Shaping the{" "}
            <span className="from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent text-center">
              Future
            </span>{" "}
            {/* <br /> */}
            Through Our Events
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed  mx-auto text-center">
          Explore workshops, hackathons, speaker sessions, and tech meetups designed to enhance learning, collaboration, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
          {event &&
            event.map((event: any) => (
              <EventCard
                key={event._id}
                event={event}
                variant="compact"
                className="w-full"
              />
            ))}
        </div>
      </section>
    </div>
  );
}

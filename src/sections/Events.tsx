"use client";
import EventCard from "@/components/EventCards";
import React from "react";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { useSelector } from "react-redux";

const Events: React.FC = () => {
  const { isLoading, isError, data } = useEventQuery({});
  const { event } = useSelector((state: any) => state.event);
  return (
    <section className=" py-6 flex w-full">
      <div className="max-container w-full">
        <div className=" mb-8 w-full">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
            Shaping the{" "}
            <span className="from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
              Future
            </span>{" "}
            <br />
            Through Our Events
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
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
      </div>
    </section>
  );
};

export default Events;

"use client";

import React, { useEffect, useRef } from "react";
import { EventType, EventCategory } from "@/app/(root)/events/types";
import { gsap } from "gsap";
import EventCard from "@/components/EventCards";

interface EventSectionProps {
  events: EventType[];
  category: EventCategory;
}

const EventSection: React.FC<EventSectionProps> = ({ events, category }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate events when they change
    if (containerRef.current && eventRefs.current.length > 0) {
      // Clear previous refs
      eventRefs.current = eventRefs.current.slice(0, events.length);

      // GSAP Stagger Animation
      gsap.fromTo(
        eventRefs.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [events, category]);

  const handleRef = (index: number) => (el: HTMLDivElement | null) => {
    eventRefs.current[index] = el;
  };

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5"
    >
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={event.id} ref={handleRef(index)}>
            <EventCard
              event={event}
              category={category}
              variant="compact"
              className="w-full"
            />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-600 dark:text-gray-300">
            No {category} events at the moment
          </p>
        </div>
      )}
    </div>
  );
};

export default EventSection;

"use client";

import React, { useState, useEffect, useRef } from "react";
import EventSection from "@/app/(root)/events/components/EventSection";
import { gsap } from "gsap";
import { EventType, EventCategory } from "@/app/(root)/events/types";
import Navbar from "@/components/Navbar";

const staticEvents: EventType[] = [
  {
    id: "1",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "11",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "10",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "9",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "8",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "7",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "6",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "5",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "4",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "3",
    title: "Google I/O Extended 2024",
    description: "Join us for the local Google I/O Extended event",
    date: "2024-07-15",
    location: "Tech Hub, City Center",
    category: "upcoming",
    imageUrl: "/img/events/image.png",
    registrationLink: "https://example.com/register",
  },

  {
    id: "2",
    title: "Ui Ux BootCamp",
    description: "Annual winter hackathon for developers",
    date: "2024-01-20",
    location: "Online Event",
    category: "past",
    imageUrl: "/img/events/image.png",
    registrationLink:
      "https://gdg.community.dev/events/details/google-gdg-on-campus-bengal-institute-of-technology-kolkata-india-presents-uiux-bootcamp-day-1/cohost-gdg-on-campus-haldia-institute-of-technology-haldia-india",
  },
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] =
    useState<EventCategory>("upcoming");
  const pageRef = useRef(null);
  const headingRef = useRef(null);
  const categoryToggleRef = useRef(null);

  const filteredEvents = staticEvents.filter(
    (event) => event.category === activeCategory
  );

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    }

    if (categoryToggleRef.current) {
      tl.fromTo(
        categoryToggleRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.4"
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen" ref={pageRef}>
      {/* Main Content */}
      <section className="max-container my-20">
        <div className=" mb-8">
          <h2
            ref={headingRef}
            className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25] text-center"
          >
            Shaping the{" "}
            <span className="from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent text-center">
              Future
            </span>{" "}
            {/* <br /> */}
            Through Our Events
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed  mx-auto text-center">
            A student-led community exploring Google Developer technologies,
            fostering innovation, and empowering students through hands-on
            learning.
          </p>
        </div>
        <div ref={categoryToggleRef} className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-gray-100 dark:bg-gray-800/50 p-1 shadow-lg backdrop-blur-sm">
            {(["upcoming", "past"] as EventCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category === "upcoming" ? "Upcoming Events" : "Past Events"}
              </button>
            ))}
          </div>
        </div>

        <EventSection events={filteredEvents} category={activeCategory} />
      </section>
    </div>
  );
}

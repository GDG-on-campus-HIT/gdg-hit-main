import EventCard from "@/components/EventCards";
import React from "react";
import { EventType } from "@/app/(root)/events/types";
import MaxWidthWrapper from "@/hooks/MaxWidthWrapper";

const Events: React.FC = () => {
  const events: EventType[] = [
    {
      id: "1",
      imageUrl: "/img/image1.png",
      date: "2024-11-10",
      title: "UI/UX Bootcamp Day 1",
      location: "GDG on Campus Haldia Institute of Technology - Haldia, India",
      description:
        "Join us for an interactive UI/UX bootcamp covering design principles.",
      registrationLink: "https://example.com/register",
      category: "upcoming",
    },
    {
      id: "2",
      imageUrl: "/img/image1.png",
      date: "2024-11-11",
      title: "Tech Talks 2024",
      location: "HIT Auditorium - Haldia, India",
      description: "An insightful conference featuring top tech leaders.",
      registrationLink: "https://example.com/register",
      category: "upcoming",
    },
    {
      id: "3",
      imageUrl: "/img/image1.png",
      date: "2024-11-12",
      title: "Hack the Future",
      location: "HIT Campus - Haldia, India",
      description: "A thrilling hackathon to innovate and create solutions.",
      registrationLink: "https://example.com/register",
      category: "upcoming",
    },
    {
      id: "4",
      imageUrl: "/img/image1.png",
      date: "2024-11-13",
      title: "AI Summit 2024",
      location: "Tech Park - Haldia, India",
      description: "Exploring the future of artificial intelligence.",
      registrationLink: "https://example.com/register",
      category: "upcoming",
    },
  ];

  return (
    <section className=" py-6 flex w-full">
      <div className="max-container">
        <div className=" mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
            Shaping the{" "}
            <span className="from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent">Future</span>{" "}
            
            <br />Through Our Events
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            A student-led community exploring Google Developer technologies,
            fostering innovation, and empowering students through hands-on
            learning.
          </p>
        </div>

        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              category="upcoming"
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

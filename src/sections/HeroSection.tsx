'use client';

import PrimaryButton from "@/components/PrimaryButton";
import RegisterNowButton from "@/components/RegisterNowButton";
import { InfiniteMovingCardImg } from "@/components/ui/infinite-moving-cards-img";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";
import React from "react";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { useGetActiveRecruitmentFormQuery } from "@/redux/features/api/apiSlice";

export function HeroSection() {
  const [isMounted, setIsMounted] = React.useState(false);
  const { isLoading, isError, data } = useEventQuery({});
  const { data: activeRecruitmentData } = useGetActiveRecruitmentFormQuery({});

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get events safely
  const eventsArray: any[] = data?.events ?? [];
  const upcomingEvent = eventsArray.find((event) => event.is_upcoming === true);

  return (
    <div className="min-h-[40rem] h-screen w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden border">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="max-container relative z-10 w-full pt-24 max-sm:pt-32">
        <h1 className="text-2xl md:text-5xl font-bold text-center white-gradient-text bg-opacity-50">
          <span className="white-gradient-text font-bold">
            Step into the World of Possibilities <br />
          </span>
          <span>
            <span className="from-red-400 to-red-600 bg-gradient-to-b bg-clip-text text-transparent">Grow,</span>{" "}
            <span className="from-blue-400 to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">Connect</span>{" "}
            <span className="from-green-400 to-green-600 bg-gradient-to-b bg-clip-text text-transparent">and</span>{" "}
            <span className="from-yellow-400 to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">Lead </span>{" "}
            <span className="white-gradient-text font-bold">with GDG HIT!</span>
          </span>
        </h1>

        <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed text-center mx-auto my-3">
          Join a vibrant community of developers, innovators, and tech enthusiasts. Experience the power of Google Developer technologies and shape the future of technology.
        </p>

        <div className="w-full flex items-start justify-center space-x-5 mt-6 ">
          {isMounted && (
            <>
              {upcomingEvent ? (
                <RegisterNowButton eventId={upcomingEvent._id} />
              ) : (
                <Link href="/events">
                  <PrimaryButton>
                    Recent Events
                  </PrimaryButton>
                </Link>
              )}

              <Link href="/about-us">
                <button className="px-8 py-2 rounded-full relative gradient-card text-gray-700 dark:text-white text-sm hover:shadow-2xl transition duration-200 border dark:border-white/10">
                  <span className="relative z-20 font-medium">Learn more</span>
                </button>
              </Link>
            </>
          )}
        </div>

        {activeRecruitmentData?.form && (
          <div className=" text-center mt-8 ">
            <p className="text-gray-700 dark:text-gray-300 text-xl">
              We’re recruiting — Build, Learn, and Lead with us.
            </p>
            <div className="flex justify-center items-center mt-5">
              <Link href="/recruitment">
                <PrimaryButton>Join Our Community</PrimaryButton>
              </Link>
            </div>
          </div>
        )}

        <InfiniteMovingCardImg
          items={testimonials}
          direction="right"
          speed="slow"
          className="mt-10"
        />
      </div>
    </div>
  );
}

const testimonials = [
  { image: "/img/group-img1.jpeg" },
  { image: "/img/sliders/1.jpg" },
  { image: "/img/sliders/2.jpg" },
  { image: "/img/sliders/3.jpg" },
  { image: "/img/sliders/4.jpg" },
  { image: "/img/sliders/5.jpg" },
];

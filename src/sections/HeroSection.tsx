import PrimaryButton from "@/components/PrimaryButton";
import { InfiniteMovingCardImg } from "@/components/ui/infinite-moving-cards-img";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";
import React from "react";

export function HeroSection() {
  return (
    <div className="min-h-[40rem] h-screen w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="max-container relative z-10  w-full pt-24 max-sm:pt-32">
        {/* <img src="/gdg-logo.svg" alt="" className="mx-auto my-6 w-28 max-sm:w-16" /> */}
        <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Step into the World of Possibilities <br />
          <span className="">
            {" "}
            <span className="from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
              Grow,
            </span>{" "}
            <span className="from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">
              Connect
            </span>{" "}
            <span className="from-green-400  to-green-600 bg-gradient-to-b bg-clip-text text-transparent">
              and
            </span>{" "}
            <span className="from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
              Lead{" "}
            </span>{" "}
            with GDG HIT!
          </span>
        </h1>
        <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed text-center mx-auto my-3">
          Join a vibrant community of developers, innovators, and tech
          enthusiasts. Experience the power of Google Developer technologies and
          shape the future of technology.
        </p>
        <div className="w-full flex items-start justify-center space-x-5">
          <Link href="/recruitment/form" >
          <PrimaryButton>Join Now</PrimaryButton>
          </Link>


          <Link href="/about-us" >
          <button className="px-8 py-2 rounded-full relative gradient-card text-white text-sm hover:shadow-2xl  transition duration-200 border dark:border-white/10">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <span className="relative z-20 font-medium">Learn more</span>
          </button>
          </Link>
        </div>
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
  {
    image: "/img/group-img1.jpeg",
  },
  {
    image: "/img/group-img2.jpeg",
  },
  {
    image: "/img/group-img1.jpeg",
  },
  {
    image: "/img/group-img2.jpeg",
  },
  {
    image: "/img/group-img1.jpeg",
  },
  {
    image: "/img/group-img2.jpeg",
  },
  {
    image: "/img/group-img1.jpeg",
  },
  {
    image: "/img/group-img2.jpeg",
  },
  {
    image: "/img/group-img1.jpeg",
  },
  {
    image: "/img/group-img2.jpeg",
  },
];

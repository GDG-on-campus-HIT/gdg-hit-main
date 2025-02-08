import { InfiniteMovingCardImg } from "@/components/ui/infinite-moving-cards-img";
import { Spotlight } from "@/components/ui/spotlight";
import React from "react";


export function HeroSection() {
  return (
    <div className="min-h-[40rem] h-screen w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="max-container relative z-10  w-full pt-16 md:pt-0 max-sm:pt-24">
        <img src="/gdg-logo.svg" alt="" className="mx-auto my-6 w-28 max-sm:w-16" />
        <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Google Developer Groups <br />
          <span className="text-2xl max-sm:text-base"> <span className="from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">On Campus</span> Haldia Institute of Technology</span>
          
        </h1>
        <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed text-center mx-auto my-3">
        Join a vibrant community of developers, innovators, and tech enthusiasts. Experience the power of Google Developer technologies and shape the future of technology.
        </p>

        <InfiniteMovingCardImg items={testimonials}
        direction="right"
        speed="slow"/>
      </div>

    </div>
    
    
  );
}




const testimonials = [
  {
    image:
    "/img/group-img1.jpeg"
  },
  {
    image:
    "/img/group-img2.jpeg"
  },
];
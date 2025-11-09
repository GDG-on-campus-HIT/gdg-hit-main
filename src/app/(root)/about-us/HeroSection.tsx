import PrimaryButton from "@/components/PrimaryButton";
import { Spotlight } from "@/components/ui/spotlight";
import React from "react";

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[40rem] h-screen max-md:h-auto flex items-center overflow-x-hidden"
    >
     <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="relative max-container py-32 px-4">
        <div className="animate__animated animate__fadeIn w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight px-2">
            <span className="block">
              {" "}
              <span className="from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
                Empowering
              </span>{" "}
              <span className="from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">
                Innovators
              </span>
            </span>
            <br className="my-2"/>
            <span className="block">
              <span className="from-green-400  to-green-600 bg-gradient-to-b bg-clip-text text-transparent">
                Building
              </span>{" "}
              <span className="from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                the Future
              </span>{" "}
            </span>
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-relaxed text-center mx-auto my-5 px-4">
            Join GDG On Campus HIT - where innovation meets technology. We&apos;re a
            community of passionate developers, designers, and tech enthusiasts
            shaping the future of technology.
          </p>
          <div className="w-full flex flex-wrap justify-center gap-4 sm:gap-5 items-center px-4">
        <PrimaryButton>Join Our Community</PrimaryButton>

          <button className="px-6 sm:px-8 py-2 rounded-full relative gradient-card text-white text-sm hover:shadow-2xl  transition duration-200 border dark:border-white/10 w-full sm:w-auto">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <span className="relative z-20 font-medium">Learn More</span>
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

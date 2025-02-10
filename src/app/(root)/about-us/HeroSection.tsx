import PrimaryButton from "@/components/PrimaryButton";
import { Spotlight } from "@/components/ui/spotlight";
import React from "react";

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[40rem] h-screen max-md:h-auto flex items-center "
    >
     <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="relative max-container py-32">
        <div className="animate__animated animate__fadeIn">
          <h1 className="text-2xl space-y-2 md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-[1.25]">
            <span className="">
              {" "}
              <span className="from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
                Empowering
              </span>{" "}
              <span className="from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">
                Innovators
              </span>
              <br className="my-3"/>
              <span className="from-green-400  to-green-600 bg-gradient-to-b bg-clip-text text-transparent">
                Building
              </span>{" "}
              <span className="from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                the Future
              </span>{" "}
            </span>
          </h1>
          <p className="max-w-2xl  text-base text-gray-700 dark:text-gray-400 leading-relaxed text-center mx-auto my-5">
            Join GDG On Campus HIT - where innovation meets technology. We&apos;re a
            community of passionate developers, designers, and tech enthusiasts
            shaping the future of technology.
          </p>
          <div className="w-full flex  justify-center space-x-5 max-sm:space-x-0 max-sm:space-y-4 max-sm:flex-col items-center">
        <PrimaryButton>Join Our Community</PrimaryButton>

          <button className="px-8 py-2 rounded-full relative gradient-card text-white text-sm hover:shadow-2xl  transition duration-200 border dark:border-white/10">
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

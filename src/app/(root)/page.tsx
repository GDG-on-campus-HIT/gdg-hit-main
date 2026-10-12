import About from "@/sections/About";
import Events from "@/sections/Events";
import TestimonialsSection from "@/sections/Testimonials";
import WhyChooseSection from "@/sections/WhyUs";
import ActivitiesComponent from "@/sections/Activities";
import React from "react";
import TeamMembers from "@/sections/TeamMembers";
import { HeroSection } from "@/sections/HeroSection";
const LandingPage = () => {
  return (
    <div className="relative overflow-hidden pt-20">
      <HeroSection />
      <About />
      <ActivitiesComponent />
      <Events />
      <WhyChooseSection />
      <TeamMembers />
      <TestimonialsSection />
    </div>
  );
};

export default LandingPage;

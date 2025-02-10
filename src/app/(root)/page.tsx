import About from "@/sections/About";
import Events from "@/sections/Events";
import TestimonialsSection from "@/sections/Testimonials";
import WhyChooseSection from "@/sections/WhyUs";
import ActivitiesComponent from "@/sections/Activities";
import React from "react";
import TeamMembers from "@/sections/TeamMembers";
import { HeroSection } from "@/sections/HeroSection";
import NewsletterSection from "@/sections/NewsletterSection";

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden ">
      <HeroSection />
      <About />
      <WhyChooseSection />
      <ActivitiesComponent />
      <TeamMembers />
      <Events />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default LandingPage;

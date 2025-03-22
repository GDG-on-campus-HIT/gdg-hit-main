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
      <div>
      <p>Server URI: {process.env.NEXT_PUBLIC_SERVER_URI}</p>
      <p>Base URL: {process.env.NEXT_PUBLIC_BASE_URL}</p>
      <p>Env: {process.env.NEXT_PUBLIC_ENV}</p>
    </div>
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

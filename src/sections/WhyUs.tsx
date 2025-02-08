import React from "react";
import { Book, Users, Briefcase, Shield, Globe2, Zap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const WhyChooseSection = () => {
  const features = [
    {
      icon: <Book className="w-8 h-8" />,
      color: "bg-blue-600",
      title: "Free Workshops",
      description:
        "Access to high-quality technical workshops and training sessions at no cost",
    },
    {
      icon: <Users className="w-8 h-8" />,
      color: "bg-green-600",
      title: "Strong Community",
      description:
        "Join a vibrant community of tech enthusiasts and industry experts",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      color: "bg-purple-600",
      title: "Practical Learning",
      description: "Hands-on experience with cutting-edge Google technologies",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      color: "bg-red-600",
      title: "Expert Mentorship",
      description:
        "Direct guidance from industry professionals and Google experts",
    },
    {
      icon: <Globe2 className="w-8 h-8" />,
      color: "bg-amber-600",
      title: "Global Network",
      description:
        "Connect with GDG communities worldwide for broader exposure",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      color: "bg-indigo-600",
      title: "Career Growth",
      description: "Opportunities for personal and professional development",
    },
  ];

  return (
    <div className="w-full  py-10 max-sm:py-2 ">
      <div className="max-container mx-auto">
        {/* Header */}
        <div className=" mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
            Why <span className="from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent"> GDG HIT</span> Stands<br/>Above the Rest
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            A student-led community exploring Google Developer technologies,
            fostering innovation, and empowering students through hands-on
            learning.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div className="relative gradient-card border-[1px] dark:border-white/5 rounded-xl" key={index}>
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="group relative  p-6 transition-all duration-300 hover:scale-[1.02] ">
                {/* Icon Container */}
                <div
                  className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-gray-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                {/* <div className="absolute inset-0 rounded-xl border border-gray-300 dark:border-gray-600 group-hover:border-blue-500/50 transition-colors duration-300"></div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;

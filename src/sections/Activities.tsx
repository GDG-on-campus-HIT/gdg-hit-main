import React from "react";
import { Package, Lightbulb, CloudLightning, Users } from "lucide-react";

import MaxWidthWrapper from "@/hooks/MaxWidthWrapper";

const ActivitiesComponent = () => {
  const activities = [
    {
      icon: Package,
      title: "Free Workshops",
      description:
        "Regular technical workshops on various Google technologies and development tools.",
      lightBg: "bg-blue-50",
      darkBg: "bg-gray-800 bg-opacity-50",
      darkBorder: "border-gray-700",
      lightText: "text-blue-900",
      darkText: "text-blue-200",
      lightIcon: "text-blue-600",
      darkIcon: "text-blue-300",
    },
    {
      icon: Lightbulb,
      title: "Gen AI Study Jams",
      description:
        "Focused sessions on Generative AI technologies and their applications.",
      lightBg: "bg-purple-50",
      darkBg: "bg-gray-800 bg-opacity-50",
      darkBorder: "border-gray-700",
      lightText: "text-purple-900",
      darkText: "text-purple-200",
      lightIcon: "text-purple-600",
      darkIcon: "text-purple-300",
    },
    {
      icon: CloudLightning,
      title: "Cloud Study Jams",
      description:
        "Hands-on learning sessions focused on Google Cloud Platform and services.",
      lightBg: "bg-green-50",
      darkBg: "bg-gray-800 bg-opacity-50",
      darkBorder: "border-gray-700",
      lightText: "text-green-900",
      darkText: "text-green-200",
      lightIcon: "text-green-600",
      darkIcon: "text-green-300",
    },
    {
      icon: Users,
      title: "DevFest Meetups",
      description:
        "Annual developer festival featuring keynotes, technical sessions, and networking.",
      lightBg: "bg-red-50",
      darkBg: "bg-gray-800 bg-opacity-50",
      darkBorder: "border-gray-700",
      lightText: "text-red-900",
      darkText: "text-red-200",
      lightIcon: "text-red-600",
      darkIcon: "text-red-300",
    },
  ];

  return (
    <div className="w-full py-20 max-sm:py-12">
      <div className="max-container transition-colors duration-300">
      <div className=" mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
            What We Do at
            <br />
            <span className="from-green-400  to-green-600 bg-gradient-to-b bg-clip-text text-transparent">
              {" "}
             GDG HIT
            </span>
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            A student-led community exploring Google Developer technologies,
            fostering innovation, and empowering students through hands-on
            learning.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`
              relative group
              gradient-card
              rounded-3xl p-6
              backdrop-blur-xl
              
              shadow-lg dark:shadow-xl
              transform transition-all duration-300
              hover:scale-105 hover:rotate-3
              hover:shadow-xl dark:hover:shadow-2xl
            `}
            >
              <div className="absolute inset-0 bg-white/5 dark:bg-white/10 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <div
                className={`
              w-16 h-16 rounded-2xl mb-4 flex items-center justify-center
              bg-white/20 dark:bg-white/5
              backdrop-blur-md
            `}
              >
                <activity.icon
                  className={`
                  w-8 h-8 
                  ${activity.lightIcon} dark:${activity.darkIcon}
                `}
                />
              </div>
              <h3
                className={`
              text-xl font-bold mb-2
              dark:text-gray-300
            `}
              >
                {activity.title}
              </h3>
              <p
                className={`
              text-sm 
              text-gray-600 dark:text-gray-400
            `}
              >
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesComponent;

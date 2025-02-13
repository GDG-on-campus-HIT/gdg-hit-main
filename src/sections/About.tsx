import React from "react";
import { Globe, Users, Calendar, ExternalLink } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: (
        <Calendar className="w-8 h-8 text-blue-500 dark:text-blue-600/80 transition-transform group-hover:scale-110" />
      ),
      title: "Free & Accessible Events",
      description:
        "Open to all students interested in technology and innovation.",
    },
    {
      icon: (
        <Users className="w-8 h-8 text-green-500 transition-transform group-hover:scale-110" />
      ),
      title: "Strong Community",
      description: "Connect with like-minded tech enthusiasts and mentors.",
    },
    {
      icon: (
        <Globe className="w-8 h-8 text-red-500 transition-transform group-hover:scale-110" />
      ),
      title: "Global Network",
      description: "Part of the worldwide Google Developers Group community.",
    },
  ];

  const missionPoints = [
    "Hands-on workshops and training",
    "Expert mentorship programs",
    "Networking opportunities",
    "Project collaborations",
    "Tech talks and seminars",
  ];

  return (
    <main className="w-full   transition-colors duration-300 overflow-hidden py-16">
      {/* Hero Section with Google-inspired design */}

      <div className="max-container  ">
        {/* Header Section */}
        <div className=" mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3">
            Who We Are and What
            <br /> We{" "}
            <span className="from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
              {" "}
              Stand For
            </span>
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
          Learn how GDG HIT fosters a vibrant tech community, empowering students through innovation, collaboration, and real-world learning opportunities.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* Left Section - Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6  gradient-card transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section - Mission */}
          <div className="p-6 gradient-card flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-300">
                Our Mission
              </h2>
            </div>

            <div className="space-y-3 flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Empower students with practical knowledge of Google technologies
                through:
              </p>
              <ul className="space-y-2 overflow-y-auto">
                {missionPoints.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-800 dark:text-gray-400 group text-sm"
                  >
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-blue-600 dark:bg-blue-600/90 text-white font-bold text-xs group-hover:scale-110 transition-transform">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#join-us"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-500/80 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              Join our community <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;

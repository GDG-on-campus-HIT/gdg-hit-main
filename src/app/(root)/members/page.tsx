"use client";

import MemberCard from "@/components/MemberCard";
import React, { useState } from "react";

interface ProfileImage {
  public_id: string;
  url: string;
}

interface Member {
  profile_image: ProfileImage;
  _id: string;
  name: string;
  department: string;
  designation: string;
  email_id: string;
  batch: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
  leader: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const members = {
  coreTeam: [
    {
      _id: "1",
      name: "John Doe",
      designation: "President",
      profile_image: {
        url: "/assets/members/deepak-kumar.png",
      },
      bio: "Experienced leader with a passion for technology and innovation.",
      batch: "2021-25",
      leader: true,
    },
    {
      _id: "2",
      name: "Jane Smith",
      designation: "Vice-President",
      profile_image: {
        url: "/assets/members/deepak-kumar.png",
      },
      bio: "Dedicated to fostering collaboration and driving impactful projects.",
      batch: "2021-25",
      leader: true,
    },
  ],
  mediaTeam: {
    mediaHead: [
      {
        _id: "3",
        name: "Alice Johnson",
        designation: "Media Head",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Creative professional with expertise in media and content strategy.",
        batch: "2021-25",
        leader: true,
      },
    ],
    photographer: [
      {
        _id: "4",
        name: "Bob Brown",
        designation: "Photographer",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Passionate about capturing moments and telling stories through photography.",
        batch: "2022-26",
        leader: false,
      },
    ],
    graphicDesigner: [
      {
        _id: "5",
        name: "Charlie Davis",
        designation: "Graphic Designer",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Transforming ideas into visually stunning designs.",
        batch: "2022-26",
        leader: false,
      },
    ],
    contentWriter: [
      {
        _id: "6",
        name: "Diana Evans",
        designation: "Content Writer",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Crafting compelling narratives that resonate with audiences.",
        batch: "2022-26",
        leader: false,
      },
    ],
    videoEditor: [
      {
        _id: "7",
        name: "Ethan Harris",
        designation: "Video Editor",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Bringing stories to life through seamless video editing.",
        batch: "2022-26",
        leader: false,
      },
    ],
  },
  prTeam: [
    {
      _id: "8",
      name: "Fiona Clark",
      designation: "PR Head",
      profile_image: {
        url: "/assets/members/deepak-kumar.png",
      },
      bio: "Building strong relationships and promoting the club's mission.",
      batch: "2021-25",
      leader: true,
    },
    {
      _id: "9",
      name: "George Lewis",
      designation: "PR",
      profile_image: {
        url: "/assets/members/deepak-kumar.png",
      },
      bio: "Effective communicator with a knack for public relations.",
      batch: "2022-26",
      leader: false,
    },
  ],
  techTeam: {
    webDeveloper: [
      {
        _id: "10",
        name: "Hannah White",
        designation: "Web Developer",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Passionate about building user-friendly and responsive websites.",
        batch: "2022-26",
        leader: false,
      },
    ],
    appDeveloper: [
      {
        _id: "11",
        name: "Ian Green",
        designation: "App Developer",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Creating innovative mobile applications that solve real-world problems.",
        batch: "2023-27",
        leader: false,
      },
    ],
    machineLearning: [
      {
        _id: "12",
        name: "Jessica King",
        designation: "Machine Learning",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Exploring the potential of AI and machine learning to drive innovation.",
        batch: "2023-27",
        leader: false,
      },
    ],
    techMember: [
      {
        _id: "13",
        name: "Kevin Adams",
        designation: "Technical Member",
        profile_image: {
          url: "/assets/members/deepak-kumar.png",
        },
        bio: "Enthusiastic about coding and solving technical challenges.",
        batch: "2023-27",
        leader: false,
      },
    ],
  },
};

const MembersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"core" | "media" | "pr" | "tech">(
    "core"
  );

  // Render members based on the active tab and subcategory
  const renderMembers = () => {
    if (!members) return null;

    switch (activeTab) {
      case "core":
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Core Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.coreTeam.map((member, index) => (
                <MemberCard
                  key={`${index} ${member.name}`}
                  name={member.name}
                  role={member.designation}
                  bio={member.bio}
                  imageSrc={member.profile_image.url}
                />
              ))}
            </div>
          </div>
        );

      case "media":
        return (
          <div className="space-y-8">
            {Object.entries(members.mediaTeam).map(([subcategory, members]) => (
              <div key={subcategory} className="my-4">
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white capitalize">
                  {subcategory.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {members.map((member, index) => (
                    <MemberCard
                      key={`${index} ${member.name}`}
                      name={member.name}
                      role={member.designation}
                      bio={member.bio}
                      imageSrc={member.profile_image.url}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "pr":
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              PR Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.prTeam.map((member, index) => (
                <MemberCard
                  key={`${index} ${member.name}`}
                  name={member.name}
                  role={member.designation}
                  bio={member.bio}
                  imageSrc={member.profile_image.url}
                />
              ))}
            </div>
          </div>
        );

      case "tech":
        return (
          <div className="space-y-8">
            {Object.entries(members.techTeam).map(([subcategory, members]) => (
              <div key={subcategory}>
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white capitalize">
                  {subcategory.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {members.map((member, index) => (
                    <MemberCard
                      key={`${index} ${member.name}`}
                      name={member.name}
                      role={member.designation}
                      bio={member.bio}
                      imageSrc={member.profile_image.url}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen transition-colors duration-300">
      <div className="max-container py-24">
        <div className="mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25] text-center">
            The{" "}
            <span className="from-yellow-400 to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
              Faces
            </span>{" "}
            Behind GDG HIT
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed text-center mx-auto">
            A student-led community exploring Google Developer technologies,
            fostering innovation, and empowering students through hands-on
            learning.
          </p>
        </div>

        {/* Tabs for Categories */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("core")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "core"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Core Team
          </button>
          <button
            onClick={() => setActiveTab("tech")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "tech"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Tech Team
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "media"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Media Team
          </button>
          <button
            onClick={() => setActiveTab("pr")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "pr"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            PR Team
          </button>
        </div>

        {/* Render Members */}
        {renderMembers()}
      </div>
    </div>
  );
};

export default MembersPage;

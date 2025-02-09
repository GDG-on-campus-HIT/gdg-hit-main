"use client";
import React from "react";
import { memberCategories } from "@/data/members";



// Reorganize categories without the organizer
const reorganizedCategories = {
  "Core Team": memberCategories["Core Team"].filter(
    (member) => !member.isOrganizer
  ),
  "Tech Members": [
    {
      category: "Web Developers",
      members: memberCategories["Tech Members"][0].members,
    },
    {
      category: "App Developers",
      members: memberCategories["Tech Members"][1].members,
    },
    {
      category: "ML/Ops",
      members: memberCategories["Tech Members"][2].members,
    },
  ],
  "Media Team": [
    {
      category: "Graphics Designers",
      members: memberCategories["Media Team"][0].members,
    },
    {
      category: "Video Editors",
      members: memberCategories["Media Team"][1].members,
    },
    {
      category: "Content Writers",
      members: memberCategories["Media Team"][2].members,
    },
    {
      category: "Photographers",
      members: memberCategories["Media Team"][3].members,
    },
  ],
  "PR Team": memberCategories["PR Team"],
};

const MembersPage: React.FC = () => {
  return (
    <div className="relative min-h-screen  transition-colors duration-300">
      <div className="max-container py-24">
        <div className=" mb-8 ">
        <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25] text-center">
            The{" "}
            <span className="from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
              Faces
            </span>{" "}
            Behind
            {/* <br /> */}
            GDG HIT
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed text-center mx-auto">
            A student-led community exploring Google Developer technologies,
            fostering innovation, and empowering students through hands-on
            learning.
          </p>
        </div>


      </div>
    </div>
  );
};

export default MembersPage;

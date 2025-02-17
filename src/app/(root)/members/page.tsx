"use client";
import MemberCard from "@/components/MemberCard";
import { useMemberQuery } from "@/redux/features/api/member/memberApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

interface MembersState {
  coreTeam: Member[];
  mediaTeam: Record<string, Member[]>;
  prTeam: Member[];
  techTeam: Record<string, Member[]>;
}

const MembersPage: React.FC = () => {
  const { isLoading, isError, data } = useMemberQuery({});
  const { members } = useSelector(
    (state: { member: { members: MembersState } }) => state.member
  );

  const [activeTab, setActiveTab] = useState<"core" | "media" | "pr" | "tech">(
    "core"
  );
 

  const renderMemberCards = (members: Member[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member, index) => (
        <MemberCard
          key={`${index}-${member._id}`}
          name={member.name}
          role={member.designation}
          bio={member.bio}
          imageSrc={member.profile_image.url}
          linkedin={member.linkedin_url}
        />
      ))}
    </div>
  );

  const renderTeamSection = (
    title: string,
    members: Member[] | Record<string, Member[]>
  ) => (
    <div className="space-y-8">
      {Array.isArray(members) ? (
        <>
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            {title}
          </h3>
          {renderMemberCards(members)}
        </>
      ) : (
        Object.entries(members).map(([subcategory, members]) => (
          <div key={subcategory} className="my-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white capitalize">
              {subcategory.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            {renderMemberCards(members)}
          </div>
        ))
      )}
    </div>
  );


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading members</div>;

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
          Get to know the passionate leaders driving GDG HIT, fostering innovation, collaboration, and growth within our tech community.
          </p>
        </div>

        {/* Tabs for Categories */}
        <div className="flex justify-center gap-4 mb-8 max-sm:flex-col items-center">
          {(["core", "tech", "media", "pr"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {tab === "core"
                ? "Core Team"
                : tab === "tech"
                ? "Tech Team"
                : tab === "media"
                ? "Media Team"
                : "PR Team"}
            </button>
          ))}
        </div>

        {/* Render Members */}
        {members && (
          <>
            {activeTab === "core" &&
              renderTeamSection("Core Team", members.coreTeam)}
            {activeTab === "media" &&
              renderTeamSection("Media Team", members.mediaTeam)}
            {activeTab === "pr" && renderTeamSection("PR Team", members.prTeam)}
            {activeTab === "tech" &&
              renderTeamSection("Tech Team", members.techTeam)}
          </>
        )}
      </div>
    </div>
  );
};

export default MembersPage;

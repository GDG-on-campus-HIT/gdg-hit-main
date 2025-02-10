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

function TeamMembers() {
  const { isLoading, isError, data } = useMemberQuery({});
  const { members } = useSelector((state: any) => state.member);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  useEffect(() => {
    setIsClient(true); // Set to true after component mounts on the client
  }, []);

  if (!isClient) {
    return null; // Return nothing during SSR to avoid hydration mismatch
  }

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  if (isError) {
    return <div>Error loading members</div>; // Show error state if the query fails
  }

  return (
    <section className="">
      <div className="max-container">
        <div className="mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
            The{" "}
            <span className="from-yellow-400 to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
              Faces
            </span>{" "}
            Behind
            <br />
            GDG HIT
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            A student-led community exploring Google Developer technologies,
            fostering innovation, and empowering students through hands-on
            learning.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5 my-20 max-sm:my-5 max-sm:gap-10 max-md:grid-cols-3 max-sm:grid-cols-1 max-sm:p-4">
          {members &&
            members.coreTeam.map((item: Member, index: number) => (
              <MemberCard
                key={`${index} ${item.name}`}
                name={item.name}
                role={item.designation}
                bio={item.bio || ""}
                imageSrc={item.profile_image.url}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default TeamMembers;

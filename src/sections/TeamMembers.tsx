"use client";
import React from "react";
import { useSelector } from "react-redux";
import MemberCard from "@/components/MemberCard";
import { useMemberQuery } from "@/redux/features/api/member/memberApi";
import { GradientWord, Reveal, SectionHeading, SectionLink } from "@/components/home/primitives";

interface Member {
  profile_image: { public_id: string; url: string };
  _id: string;
  name: string;
  designation: string;
  bio: string;
  linkedin_url: string;
}

const SKELETON_COUNT = 8;

function TeamMembers() {
  const { isLoading, isError } = useMemberQuery({});
  const { members } = useSelector((state: any) => state.member);

  const coreTeam: Member[] = members?.coreTeam ?? [];

  if (isError && coreTeam.length === 0) {
    return null;
  }

  return (
    <section id="team" className="relative py-16 md:py-24">
      <div className="max-container">
        <SectionHeading
          title={
            <>
              The <GradientWord accent="yellow">Faces</GradientWord> Behind
              <br /> GDG HIT
            </>
          }
          description="Get to know the passionate leaders driving GDG HIT, fostering innovation, collaboration, and growth within our tech community."
          action={<SectionLink href="/members">Meet the full team</SectionLink>}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading && coreTeam.length === 0
            ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <div key={index} className="w-full">
                  <div className="aspect-square w-full animate-pulse rounded-2xl bg-neutral-200/60 dark:bg-white/[0.03]" />
                  <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-neutral-200/60 dark:bg-white/[0.05]" />
                  <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-neutral-200/60 dark:bg-white/[0.04]" />
                </div>
              ))
            : coreTeam.map((member, index) => (
                <Reveal key={member._id} delay={0.04 * (index % 4)}>
                  <MemberCard
                    id={member._id}
                    name={member.name}
                    role={member.designation}
                    bio={member.bio || ""}
                    imageSrc={member.profile_image?.url}
                    linkedin={member.linkedin_url}
                  />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}

export default TeamMembers;

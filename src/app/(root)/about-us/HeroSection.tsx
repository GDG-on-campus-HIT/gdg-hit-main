"use client";

import React from "react";
import { CtaLink, GradientWord, Reveal } from "@/components/home/primitives";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { useMemberQuery } from "@/redux/features/api/member/memberApi";

type MemberGroup = { _id: string }[] | Record<string, { _id: string }[]>;

const countMembers = (members?: Record<string, MemberGroup>) => {
  if (!members) return 0;
  const ids = new Set<string>();
  Object.values(members).forEach((group) => {
    const lists = Array.isArray(group) ? [group] : Object.values(group ?? {});
    lists.forEach((list) => list.forEach((member) => ids.add(member._id)));
  });
  return ids.size;
};

function HeroSection() {
  const { data: eventData } = useEventQuery({});
  const { data: memberData } = useMemberQuery({});

  const eventCount = (eventData?.events ?? []).length;
  const memberCount = countMembers(memberData?.members);

  const stats = [
    eventCount > 0 && { value: `${eventCount}+`, label: "Events hosted" },
    memberCount > 0 && { value: `${memberCount}`, label: "Team members" },
    { value: "100%", label: "Free to join" },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <section className="relative isolate overflow-hidden pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-14rem] h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-green-500/20 via-blue-500/15 to-red-500/20 opacity-50 blur-[140px] dark:opacity-30" />
      </div>

      <div className="max-container pb-16 pt-12 md:pb-24 md:pt-20">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="white-gradient-text text-4xl leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
              Empowering Innovators,
              <br className="hidden sm:block" /> Building the{" "}
              <GradientWord accent="green">Future</GradientWord>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              Join GDG On Campus HIT, where innovation meets technology. We&apos;re a community of
              passionate developers, designers, and tech enthusiasts shaping the future of
              technology.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/events">Explore events</CtaLink>
            <CtaLink href="/contact-us" variant="secondary">
              Get in touch
            </CtaLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <div className="overflow-hidden rounded-3xl border border-black/5 dark:border-white/5">
            <img
              src="/img/team-2026.jpg"
              alt="The GDG On Campus HIT team at night in front of the HIT campus sign"
              className="h-[260px] w-full object-cover object-[center_62%] sm:h-[380px] md:h-[480px]"
            />
          </div>
          <dl className="mt-8 grid grid-cols-3 divide-x divide-black/10 dark:divide-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0 md:px-8">
                <dt className="text-xs text-neutral-500 sm:text-sm">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export default HeroSection;

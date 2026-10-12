"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Calendar, Check, Globe, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientWord, Reveal, SectionHeading, SectionLink } from "@/components/home/primitives";
import { Accent, accentStyles } from "@/components/home/accents";

const features: { icon: typeof Calendar; accent: Accent; title: string; description: string }[] = [
  {
    icon: Calendar,
    accent: "blue",
    title: "Free & Accessible Events",
    description: "Open to all students interested in technology and innovation.",
  },
  {
    icon: Users,
    accent: "green",
    title: "Strong Community",
    description: "Connect with like-minded tech enthusiasts and mentors.",
  },
  {
    icon: Globe,
    accent: "red",
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

const About = () => {
  const { event } = useSelector((state: any) => state.event);
  const { members } = useSelector((state: any) => state.member);

  const eventCount = Array.isArray(event) ? event.length : 0;
  const memberCount = members
    ? Object.values(members).reduce<number>(
        (total, group) => total + (Array.isArray(group) ? group.length : 0),
        0
      )
    : 0;

  const stats = [
    eventCount > 0 && { value: `${eventCount}+`, label: "Events hosted" },
    memberCount > 0 && { value: `${memberCount}+`, label: "Team members" },
    { value: "100%", label: "Free to join" },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <section id="about" className="relative py-16 md:py-24">
      <div className="max-container">
        <SectionHeading
          title={
            <>
              Who We Are and What
              <br className="hidden sm:block" /> We <GradientWord accent="red">Stand For</GradientWord>
            </>
          }
          description="Learn how GDG HIT fosters a vibrant tech community, empowering students through innovation, collaboration, and real-world learning opportunities."
          action={<SectionLink href="/about-us">More about us</SectionLink>}
        />

        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <div className="gradient-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 p-8 dark:border-white/5 md:p-10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-300">Our Mission</h3>
              </div>

              <p className="white-gradient-text mt-6 max-w-xl text-2xl leading-snug tracking-tight md:text-3xl">
                Empower students with practical knowledge of Google technologies.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {missionPoints.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-auto pt-10">
                <SectionLink href="/events">Join our next event</SectionLink>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-4 md:col-span-2">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={0.08 * (index + 1)} className="flex-1">
                <div className="gradient-card group flex h-full items-start gap-4 rounded-3xl border border-black/5 p-6 transition-colors duration-300 hover:border-black/10 dark:border-white/5 dark:hover:border-white/10">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110",
                      accentStyles[feature.accent].chip
                    )}
                  >
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="md:col-span-6" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/5">
              <img
                src="/img/group-img1.jpeg"
                alt="GDG On Campus HIT team at Haldia Institute of Technology"
                className="h-[320px] w-full object-cover object-[center_60%] md:h-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
                <p className="max-w-md text-xl font-medium leading-snug tracking-tight text-white md:text-2xl">
                  A campus community of builders, designers and dreamers.
                </p>
                <dl className="flex gap-8 md:gap-12">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-xs uppercase tracking-[0.18em] text-white/60">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;

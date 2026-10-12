"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CtaLink, GradientWord, Reveal, SectionHeading } from "@/components/home/primitives";
import { Accent, accentStyles } from "@/components/home/accents";

const values: { accent: Accent; title: string; description: string }[] = [
  {
    accent: "blue",
    title: "Innovation First",
    description:
      "Fostering a culture of innovation and creative problem-solving through technology and collaboration.",
  },
  {
    accent: "red",
    title: "Community Growth",
    description:
      "Building a strong, inclusive community of learners, developers, and tech enthusiasts.",
  },
  {
    accent: "green",
    title: "Technical Excellence",
    description:
      "Striving for excellence in everything we do, from code to community engagement.",
  },
];

const goals: { accent: Accent; title: string; items: string[] }[] = [
  {
    accent: "yellow",
    title: "Our Purpose",
    items: [
      "Empower students with technical skills",
      "Foster innovation and creativity",
      "Build a strong tech community",
    ],
  },
  {
    accent: "blue",
    title: "Our Commitment",
    items: [
      "Quality learning experiences",
      "Inclusive and diverse community",
      "Continuous improvement",
    ],
  },
];

function StorySection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-container grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="white-gradient-text text-4xl leading-[1.1] tracking-tight md:text-5xl">
            Who <GradientWord accent="blue">We Are</GradientWord>
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
            <p>
              GDG On Campus HIT is the Haldia Institute of Technology chapter of Google Developer
              Groups on Campus, a global programme of student-led communities for anyone curious
              about Google developer technologies.
            </p>
            <p>
              We run free workshops, study jams, hackathons and speaker sessions, and we build real
              projects together across web, app, machine learning, design and content. Whatever
              your branch or year, there&apos;s a place for you here.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="relative">
            <div className="overflow-hidden rounded-3xl border border-black/5 dark:border-white/5">
              <img
                src="/img/sliders/4.jpg"
                alt="Students at a hands-on GDG HIT session"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-neutral-500">
              A hands-on session on campus.
            </figcaption>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 -z-10 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-container">
        <SectionHeading
          title={
            <>
              Our Mission <GradientWord accent="red">&amp; Values</GradientWord>
            </>
          }
          description="Guided by innovation, driven by community, committed to excellence."
        />

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {values.map((value, index) => {
            const accent = accentStyles[value.accent];
            return (
              <Reveal key={value.title} delay={0.06 * index}>
                <div className="group relative border-t border-black/10 pt-8 dark:border-white/10">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-px left-0 h-px w-12 transition-all duration-700 ease-out group-hover:w-full",
                      accent.bar
                    )}
                  />
                  <span className={cn("font-mono text-sm tabular-nums", accent.text)}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-2">
          {goals.map((goal, index) => {
            const accent = accentStyles[goal.accent];
            return (
              <Reveal key={goal.title} delay={0.08 * index} className="h-full">
                <div className="gradient-card relative h-full overflow-hidden rounded-3xl border border-black/5 p-8 dark:border-white/5 md:p-10">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-2xl">
                    {goal.title}
                  </h3>
                  <ul className="mt-6 divide-y divide-black/5 dark:divide-white/5">
                    {goal.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-4 py-4 text-base text-neutral-700 dark:text-neutral-300"
                      >
                        <span aria-hidden className={cn("h-px w-5 shrink-0", accent.bar)} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br to-transparent blur-3xl",
                      accent.glow
                    )}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JoinSection() {
  return (
    <section className="relative pb-24 pt-8 md:pb-32">
      <div className="max-container">
        <Reveal>
          <div className="gradient-card relative overflow-hidden rounded-3xl border border-black/5 px-8 py-14 text-center dark:border-white/5 md:px-16 md:py-20">
            <div aria-hidden className="absolute inset-x-0 top-0 flex h-1">
              <span className="flex-1 bg-blue-500" />
              <span className="flex-1 bg-red-500" />
              <span className="flex-1 bg-yellow-500" />
              <span className="flex-1 bg-green-500" />
            </div>
            <h2 className="white-gradient-text mx-auto max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
              Be part of the <GradientWord accent="yellow">next chapter</GradientWord>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Come to an event, meet the team, or just say hello. Every member started as someone
              curious.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CtaLink href="/events">Explore events</CtaLink>
              <CtaLink href="/members" variant="secondary">
                Meet the team
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const MissionSection: React.FC = () => (
  <>
    <StorySection />
    <ValuesSection />
    <JoinSection />
  </>
);

export default MissionSection;

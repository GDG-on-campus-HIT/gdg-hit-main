import React from "react";
import { Package, Lightbulb, CloudLightning, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientWord, Reveal, SectionHeading } from "@/components/home/primitives";
import { Accent, accentStyles } from "@/components/home/accents";

const activities: { icon: typeof Package; accent: Accent; title: string; description: string }[] = [
  {
    icon: Package,
    accent: "blue",
    title: "Free Workshops",
    description:
      "Regular technical workshops on various Google technologies and development tools.",
  },
  {
    icon: Lightbulb,
    accent: "red",
    title: "Gen AI Study Jams",
    description: "Focused sessions on Generative AI technologies and their applications.",
  },
  {
    icon: CloudLightning,
    accent: "green",
    title: "Cloud Study Jams",
    description: "Hands-on learning sessions focused on Google Cloud Platform and services.",
  },
  {
    icon: Users,
    accent: "yellow",
    title: "DevFest Meetups",
    description:
      "Annual developer festival featuring keynotes, technical sessions, and networking.",
  },
];

const ActivitiesComponent = () => {
  return (
    <section id="activities" className="relative py-16 md:py-24">
      <div className="max-container">
        <SectionHeading
          title={
            <>
              What We Do at
              <br />
              <GradientWord accent="green">GDG HIT</GradientWord>
            </>
          }
          description="Engaging workshops, coding challenges, mentorship programs, and collaborative projects to enhance skills and innovation."
        />

        <ul className="border-t border-black/10 dark:border-white/10">
          {activities.map((activity, index) => {
            const accent = accentStyles[activity.accent];
            return (
              <li key={activity.title}>
                <Reveal delay={0.06 * index}>
                  <div className="group relative grid grid-cols-12 items-center gap-x-4 gap-y-3 border-b border-black/10 py-8 transition-colors duration-500 hover:bg-black/[0.015] dark:border-white/10 dark:hover:bg-white/[0.015] md:py-10">
                    <span
                      className={cn(
                        "col-span-2 font-mono text-sm tabular-nums md:col-span-1",
                        accent.text
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="col-span-10 flex items-center gap-4 md:col-span-5">
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110",
                          accent.chip
                        )}
                      >
                        <activity.icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight text-neutral-900 transition-transform duration-500 group-hover:translate-x-1 dark:text-neutral-100 md:text-2xl">
                        {activity.title}
                      </h3>
                    </div>

                    <p className="col-span-10 col-start-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 md:col-span-6 md:col-start-7 md:text-base">
                      {activity.description}
                    </p>

                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-px left-0 h-px w-0 transition-all duration-700 ease-out group-hover:w-full",
                        accent.bar
                      )}
                    />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ActivitiesComponent;

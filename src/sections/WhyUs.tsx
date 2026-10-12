import React from "react";
import { Book, Users, Briefcase, Shield, Globe2, Zap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { GradientWord, Reveal, SectionHeading } from "@/components/home/primitives";
import { Accent, accentStyles } from "@/components/home/accents";

const features: { icon: typeof Book; accent: Accent; title: string; description: string }[] = [
  {
    icon: Book,
    accent: "blue",
    title: "Free Workshops",
    description: "Access to high-quality technical workshops and training sessions at no cost",
  },
  {
    icon: Users,
    accent: "green",
    title: "Strong Community",
    description: "Join a vibrant community of tech enthusiasts and industry experts",
  },
  {
    icon: Briefcase,
    accent: "yellow",
    title: "Practical Learning",
    description: "Hands-on experience with cutting-edge Google technologies",
  },
  {
    icon: Shield,
    accent: "red",
    title: "Expert Mentorship",
    description: "Direct guidance from industry professionals and Google experts",
  },
  {
    icon: Globe2,
    accent: "blue",
    title: "Global Network",
    description: "Connect with GDG communities worldwide for broader exposure",
  },
  {
    icon: Zap,
    accent: "green",
    title: "Career Growth",
    description: "Opportunities for personal and professional development",
  },
];

const WhyChooseSection = () => {
  return (
    <section id="why-us" className="relative isolate py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[28rem] max-w-4xl -translate-y-1/2 rounded-full bg-blue-500/10 blur-[140px]"
      />
      <div className="max-container">
        <SectionHeading
          align="center"
          title={
            <>
              Why <GradientWord accent="blue">GDG HIT</GradientWord> Stands
              <br className="hidden sm:block" /> Above the Rest
            </>
          }
          description="Discover what makes GDG HIT the ideal tech community, offering hands-on learning, industry exposure, and a network of like-minded innovators."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={0.05 * index} className="h-full">
              <div className="relative h-full rounded-[1.5rem] border border-black/5 p-2 dark:border-white/5">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <div className="gradient-card group relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl p-6 md:p-7">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110",
                      accentStyles[feature.accent].chip
                    )}
                  >
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;

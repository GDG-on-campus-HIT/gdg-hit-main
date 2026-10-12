"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accent, accentStyles } from "./accents";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function GradientWord({
  accent,
  children,
}: {
  accent: Accent;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-b bg-clip-text text-transparent",
        accentStyles[accent].gradient
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  description,
  align = "left",
  action,
}: {
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-16",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        <h2 className="white-gradient-text text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
        variant === "primary"
          ? "border border-white/10 bg-gradient-to-bl from-blue-600 to-blue-950 text-white shadow-[0_10px_40px_-12px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 hover:shadow-[0_14px_50px_-12px_rgba(37,99,235,0.9)]"
          : "gradient-card border border-black/10 text-neutral-800 hover:border-black/20 dark:border-white/10 dark:text-white dark:hover:border-white/20",
        className
      )}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        />
      )}
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
    >
      {children}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-black/30 group-hover:bg-black/5 dark:border-white/10 dark:group-hover:border-white/30 dark:group-hover:bg-white/5">
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

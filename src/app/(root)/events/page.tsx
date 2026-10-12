"use client";

import React, { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { EventType } from "./types";
import EventTile from "@/components/events/EventTile";
import FeaturedEventCard from "@/components/events/FeaturedEventCard";
import { GradientWord, Reveal } from "@/components/home/primitives";

const ALL = "all";

const normalizeCategory = (category?: string) => category?.trim().toLowerCase() || "";

export default function EventsPage() {
  const { isLoading, isError, data, refetch } = useEventQuery({});
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");

  const events: EventType[] = useMemo(
    () => (data?.events ?? []).filter((event: EventType) => event?._id && event?.name),
    [data]
  );

  const featured =
    events.find((event) => event.is_upcoming) ??
    events.find((event) => event.registration_open) ??
    events[0];

  const featuredLabel = featured?.is_upcoming
    ? "Upcoming event"
    : featured?.registration_open
      ? "Registration open"
      : "Latest event";

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    events.forEach((event) => {
      const key = normalizeCategory(event.category);
      if (key && !seen.has(key)) seen.set(key, key);
    });
    return Array.from(seen.keys());
  }, [events]);

  const isFiltering = category !== ALL || query.trim() !== "";

  const visibleEvents = useMemo(() => {
    const search = query.trim().toLowerCase();
    return events.filter((event) => {
      if (!isFiltering && event._id === featured?._id) return false;
      if (category !== ALL && normalizeCategory(event.category) !== category) return false;
      if (!search) return true;
      return [event.name, event.description, event.venue, event.category]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(search));
    });
  }, [events, category, query, isFiltering, featured]);

  const clearFilters = () => {
    setCategory(ALL);
    setQuery("");
  };

  return (
    <div className="relative isolate overflow-hidden pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-14rem] h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-red-500/20 via-blue-500/15 to-yellow-500/20 opacity-50 blur-[140px] dark:opacity-30" />
      </div>

      <section className="max-container pb-24 pt-12 md:pt-20">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="white-gradient-text text-4xl leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
              Shaping the <GradientWord accent="red">Future</GradientWord>
              <br className="hidden sm:block" /> Through Our Events
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              Explore workshops, hackathons, speaker sessions, and tech meetups designed to
              enhance learning, collaboration, and innovation.
            </p>
          </div>
          {events.length > 0 && (
            <dl className="flex gap-10 md:text-right">
              <div>
                <dt className="text-sm text-neutral-500">Events hosted</dt>
                <dd className="mt-1 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                  {events.length}
                </dd>
              </div>
              {categories.length > 1 && (
                <div>
                  <dt className="text-sm text-neutral-500">Formats</dt>
                  <dd className="mt-1 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                    {categories.length}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </Reveal>

        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <div className="mt-16 rounded-3xl border border-dashed border-black/15 p-12 text-center dark:border-white/10">
            <p className="text-neutral-600 dark:text-neutral-400">
              We couldn&apos;t load events right now.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 text-sm font-medium text-neutral-900 underline decoration-blue-500 underline-offset-4 hover:decoration-2 dark:text-white"
            >
              Try again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-black/15 p-12 text-center dark:border-white/10">
            <p className="text-neutral-600 dark:text-neutral-400">
              New events are on the way. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <Reveal className="mt-12 md:mt-16" delay={0.1}>
                <FeaturedEventCard
                  event={featured}
                  label={featuredLabel}
                  cta={
                    featured.is_upcoming || featured.registration_open
                      ? "View details & register"
                      : "View event details"
                  }
                />
              </Reveal>
            )}

            <div className="mt-20 flex flex-col-reverse gap-6 border-b border-black/10 dark:border-white/10 md:flex-row md:items-end md:justify-between">
              <div
                role="tablist"
                aria-label="Filter events by format"
                className="-mb-px flex gap-6 overflow-x-auto [scrollbar-width:none] md:gap-8"
              >
                {[ALL, ...categories].map((item) => {
                  const active = category === item;
                  return (
                    <button
                      key={item}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setCategory(item)}
                      className={cn(
                        "relative shrink-0 whitespace-nowrap pb-4 text-sm font-medium capitalize transition-colors",
                        active
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                      )}
                    >
                      {item === ALL ? "All events" : item}
                      <span
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-500 transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              <label className="relative flex items-center border-b border-black/10 pb-3 dark:border-white/10 md:mb-4 md:w-72 md:border-0 md:pb-0">
                <Search className="pointer-events-none absolute left-0 h-4 w-4 text-neutral-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events"
                  aria-label="Search events"
                  className="w-full bg-transparent py-1 pl-7 pr-7 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none dark:text-white [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-0 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
            </div>

            <p className="mt-6 text-sm text-neutral-500">
              {isFiltering
                ? `${visibleEvents.length} ${visibleEvents.length === 1 ? "event" : "events"} found`
                : "More from our journey"}
            </p>

            {visibleEvents.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {visibleEvents.map((event, index) => (
                  <Reveal key={event._id} delay={0.04 * (index % 3)} className="h-full">
                    <EventTile event={event} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-black/15 p-12 text-center dark:border-white/10">
                <p className="text-neutral-600 dark:text-neutral-400">
                  No events match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm font-medium text-neutral-900 underline decoration-blue-500 underline-offset-4 hover:decoration-2 dark:text-white"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="mt-12 md:mt-16">
      <div className="gradient-card h-[420px] animate-pulse rounded-3xl border border-black/5 dark:border-white/5 md:h-[360px]" />
      <div className="mt-20 h-px bg-black/10 dark:bg-white/10" />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="gradient-card h-[300px] animate-pulse rounded-3xl border border-black/5 dark:border-white/5"
          />
        ))}
      </div>
    </div>
  );
}

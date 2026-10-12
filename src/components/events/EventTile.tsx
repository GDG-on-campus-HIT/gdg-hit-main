import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventType } from "@/app/(root)/events/types";

export function eventStatus(event: EventType) {
  if (event.is_upcoming) return "Upcoming";
  if (event.registration_open) return "Registration open";
  return null;
}

export default function EventTile({
  event,
  featured = false,
}: {
  event: EventType;
  featured?: boolean;
}) {
  const status = eventStatus(event);

  return (
    <Link
      href={`/events/${event._id}`}
      className="gradient-card group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 p-2 transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:shadow-2xl dark:border-white/5 dark:hover:border-white/15"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-0 lg:flex-1" : "aspect-[16/10]"
        )}
      >
        <img
          src={event.eventBanner?.url || "/img/events/image.png"}
          alt={event.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 dark:brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className={cn("flex flex-col gap-3 px-3 pb-3 pt-4", featured && "md:px-5 md:pb-5")}>
        {(event.category || status) && (
          <p className="text-xs capitalize text-neutral-500">
            {event.category}
            {status && (
              <span className="text-green-500">
                {event.category ? " · " : ""}
                {status}
              </span>
            )}
          </p>
        )}
        <h3
          className={cn(
            "font-semibold tracking-tight text-neutral-900 dark:text-white",
            featured ? "text-2xl md:text-3xl" : "line-clamp-2 text-lg"
          )}
        >
          {event.name}
        </h3>
        {featured && (
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {event.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-blue-500" />
            {event.eventDate}
          </span>
          {event.venue && (
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-green-500" />
              <span className="truncate">{event.venue}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

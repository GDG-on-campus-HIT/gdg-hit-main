import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventType } from "@/app/(root)/events/types";

export default function FeaturedEventCard({
  event,
  label,
  cta = "View details & register",
  className,
}: {
  event: EventType;
  label: string;
  cta?: string;
  className?: string;
}) {
  return (
    <Link
      href={`/events/${event._id}`}
      className={cn(
        "group grid w-full overflow-hidden rounded-3xl border border-black/10 bg-white/60 p-2 text-left backdrop-blur transition-colors hover:border-black/20 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 md:grid-cols-5",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:col-span-3 md:aspect-auto md:min-h-[340px]">
        <img
          src={event.eventBanner?.url || "/img/events/image.png"}
          alt={event.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col justify-between gap-6 p-6 md:col-span-2 md:p-8">
        <div>
          <p className="text-sm font-medium capitalize text-green-500">
            {label}
            {event.category ? ` · ${event.category}` : ""}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-3xl">
            {event.name}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {event.description}
          </p>
        </div>

        <div className="space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
          <p className="flex items-center gap-3">
            <Calendar className="h-4 w-4 shrink-0 text-blue-500" /> {event.eventDate}
          </p>
          {event.eventTime && (
            <p className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-yellow-500" /> {event.eventTime}
            </p>
          )}
          {event.venue && (
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-green-500" /> {event.venue}
            </p>
          )}
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

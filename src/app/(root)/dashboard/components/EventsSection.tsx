"use client";
import React from "react";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import Loader from "@/components/Loader/Loader";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface EventsSectionProps {
  user: any;
}

export default function EventsSection({ user }: EventsSectionProps) {
  const { data: eventData, isLoading } = useEventQuery({});

  // Get upcoming events
  const upcomingEvents = eventData?.events
    ?.filter((e: any) => e.is_upcoming || e.registration_open)
    ?.slice(0, 3) || [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="gradient-card rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold from-blue-400 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          📅 Upcoming Registered Events
        </h2>
        <Link href="/events">
          <span className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
            View All →
          </span>
        </Link>
      </div>

      {upcomingEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
          <p className="text-slate-400">No upcoming events registered yet.</p>
          <p className="text-slate-500 text-sm mt-2">
            Check out our{" "}
            <Link href="/events">
              <span className="text-blue-400 hover:text-blue-300">events page</span>
            </Link>{" "}
            to register for new events!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingEvents.map((event: any) => (
            <Link
              key={event._id}
              href={`/events/${event._id}`}
              className="block p-4 rounded-lg border border-slate-700 hover:border-blue-500 bg-slate-900/50 hover:bg-slate-900 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white hover:text-blue-400 transition-colors">
                    {event.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.eventTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {event.is_upcoming ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                      Upcoming
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">
                      Registration Open
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

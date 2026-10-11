"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, Clock, Download, MapPin, QrCode, Trophy } from "lucide-react";
import { useMyEventsQuery, type MyEvent } from "@/redux/features/api/me/meApi";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import EntryPass from "@/components/EntryPass";
import Loader from "@/components/Loader/Loader";

const POSITION_LABELS: Record<number, string> = { 1: "1st", 2: "2nd", 3: "3rd" };

function StatusBadge({ item }: { item: MyEvent }) {
  if (item.attendance) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-500">
        <CheckCircle2 className="h-3.5 w-3.5" /> Attended
      </span>
    );
  }
  if (item.event.is_upcoming) {
    return <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-500">Registered</span>;
  }
  return <span className="rounded-full bg-slate-500/15 px-3 py-1 text-xs font-semibold text-slate-400">Not attended</span>;
}

export default function EventsSection() {
  const { data, isLoading, isError, refetch } = useMyEventsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [passFor, setPassFor] = useState<MyEvent | null>(null);
  const events = data?.events ?? [];

  return (
    <div className="gradient-card rounded-xl p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold from-blue-400 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          📅 My Events
        </h2>
        <Link href="/events" className="text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300">
          Browse events →
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="py-10 text-center">
          <p className="text-slate-400">Couldn&apos;t load your events.</p>
          <button onClick={() => refetch()} className="mt-3 text-sm font-semibold text-blue-400 hover:text-blue-300">
            Try again
          </button>
        </div>
      ) : events.length === 0 ? (
        <div className="py-12 text-center">
          <Calendar className="mx-auto mb-4 h-12 w-12 text-slate-500 opacity-50" />
          <p className="text-slate-400">You haven&apos;t registered for any events yet.</p>
          <p className="mt-2 text-sm text-slate-500">
            Check out our{" "}
            <Link href="/events" className="text-blue-400 hover:text-blue-300">
              events page
            </Link>{" "}
            to register!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((item) => (
            <div
              key={item.registrationId}
              className="flex flex-col gap-4 rounded-lg border border-slate-700/60 bg-slate-900/40 p-4 transition-all hover:border-blue-500/60 sm:flex-row sm:items-center"
            >
              {item.event.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.event.image} alt="" className="h-20 w-full rounded-md object-cover sm:w-28" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/events/${item.event._id}`} className="font-semibold text-white hover:text-blue-400">
                    {item.event.name}
                  </Link>
                  <StatusBadge item={item} />
                  {item.position && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-500">
                      <Trophy className="h-3.5 w-3.5" /> {POSITION_LABELS[item.position]} place
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {item.event.eventDate}
                  </span>
                  {item.event.eventTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {item.event.eventTime}
                    </span>
                  )}
                  {item.event.venue && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {item.event.venue}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-shrink-0 flex-wrap gap-2">
                {item.certificate?.downloadUrl ? (
                  <a
                    href={item.certificate.downloadUrl}
                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
                  >
                    <Download className="h-4 w-4" /> Certificate
                  </a>
                ) : (
                  <button
                    onClick={() => setPassFor(item)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    <QrCode className="h-4 w-4" /> Entry pass
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!passFor} onOpenChange={(open) => !open && setPassFor(null)}>
        <DialogContent className="max-w-2xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Entry pass for {passFor?.event.name}</DialogTitle>
          {passFor && (
            <div className="rounded-2xl bg-white dark:bg-[#0E0E10]">
              <p className="px-6 pt-6 text-sm font-medium text-slate-400 md:px-8">{passFor.event.name}</p>
              <EntryPass
                qrUrl={passFor.pass.qrUrl}
                passUrl={passFor.pass.passUrl}
                eventName={passFor.event.name}
                checkedIn={passFor.attendance}
                checkedInAt={passFor.checkedInAt}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

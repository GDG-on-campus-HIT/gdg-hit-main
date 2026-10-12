"use client";
import React from "react";
import { CheckCircle2, ExternalLink, QrCode } from "lucide-react";

interface EntryPassProps {
  qrUrl: string;
  passUrl: string;
  eventName: string;
  checkedIn: boolean;
  checkedInAt?: string | null;
}

const formatTime = (value?: string | null) =>
  value ? new Date(value).toLocaleString([], { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : "";

export default function EntryPass({ qrUrl, passUrl, eventName, checkedIn, checkedInAt }: EntryPassProps) {
  return (
    <div className="gradient-card rounded-2xl border dark:border-white/10 border-neutral-300 p-6 md:p-8">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
        <div className="rounded-2xl bg-white p-3 shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt={`Entry pass QR code for ${eventName}`} width={220} height={220} className="h-52 w-52 md:h-56 md:w-56" />
        </div>

        <div className="flex-1 text-center md:text-left">
          {checkedIn ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              Checked in{checkedInAt ? ` · ${formatTime(checkedInAt)}` : ""}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-500">
              <QrCode className="h-4 w-4" />
              Entry pass
            </span>
          )}
          <h3 className="mt-3 text-2xl font-bold">Your entry pass</h3>
          <p className="mt-2 text-sm dark:text-slate-400 text-slate-600">
            {checkedIn
              ? "Your attendance is recorded. Your certificate will appear in your profile once it's issued."
              : "Show this QR code at the entrance. A GDG member will scan it to mark you present — you need to be marked present to receive your certificate."}
          </p>
          <p className="mt-1 text-xs dark:text-slate-500 text-slate-500">Don&apos;t share it — it&apos;s unique to your registration.</p>
          <a
            href={passUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Open full screen
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { Award, Copy, Download, ExternalLink, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useMyCertificatesQuery } from "@/redux/features/api/me/meApi";
import Loader from "@/components/Loader/Loader";

const POSITION_LABELS: Record<number, string> = { 1: "1st", 2: "2nd", 3: "3rd" };

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" }) : "";

export default function CertificatesSection() {
  const { data, isLoading, isError, refetch } = useMyCertificatesQuery(undefined, { refetchOnMountOrArgChange: true });
  const certificates = data?.certificates ?? [];

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Certificate ID copied");
    } catch {
      toast.error("Couldn't copy");
    }
  };

  return (
    <div className="gradient-card rounded-xl p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold from-yellow-400 to-yellow-600 bg-gradient-to-r bg-clip-text text-transparent">
          🏆 Your Certificates
        </h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="py-10 text-center">
          <p className="text-slate-400">Couldn&apos;t load your certificates.</p>
          <button onClick={() => refetch()} className="mt-3 text-sm font-semibold text-blue-400 hover:text-blue-300">
            Try again
          </button>
        </div>
      ) : certificates.length === 0 ? (
        <div className="py-12 text-center">
          <Award className="mx-auto mb-4 h-12 w-12 text-yellow-500 opacity-40" />
          <h3 className="mb-2 text-lg font-semibold text-white">No certificates yet</h3>
          <p className="mx-auto max-w-md text-slate-400">
            Attend an event and get your entry pass scanned at the venue. Certificates for everyone marked present show
            up here once the team issues them.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {certificates.map((cert) => (
            <div key={cert.code} className="rounded-lg border border-slate-700/60 bg-slate-900/40 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{cert.event?.name || "GDG event"}</p>
                  <p className="mt-1 text-xs text-slate-400">Issued {formatDate(cert.issuedAt)}</p>
                </div>
                {cert.kind === "winner" && cert.position ? (
                  <span className="flex-shrink-0 rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-500">
                    {POSITION_LABELS[cert.position]} place
                  </span>
                ) : (
                  <span className="flex-shrink-0 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">
                    Participation
                  </span>
                )}
              </div>

              <button
                onClick={() => copy(cert.code)}
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-white"
                title="Copy certificate ID"
              >
                {cert.code}
                <Copy className="h-3 w-3" />
              </button>

              <div className="mt-4 flex flex-wrap gap-2">
                {cert.downloadUrl && (
                  <a
                    href={cert.downloadUrl}
                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                )}
                {cert.viewUrl && (
                  <a
                    href={cert.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                  >
                    <ExternalLink className="h-4 w-4" /> View
                  </a>
                )}
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:text-white"
                  title="Public verification page — share this link"
                >
                  <ShieldCheck className="h-4 w-4" /> Verify link
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

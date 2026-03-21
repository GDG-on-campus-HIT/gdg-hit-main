"use client";
import React from "react";
import { useIsAlreadyRegisteredQuery } from "@/redux/features/api/apiSlice";
import Loader from "@/components/Loader/Loader";
import { FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

interface ApplicationsSectionProps {
  user: any;
}

export default function ApplicationsSection({ user }: ApplicationsSectionProps) {
  const { data: registrationData, isLoading } = useIsAlreadyRegisteredQuery({});

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="gradient-card rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold from-purple-400 to-purple-600 bg-gradient-to-r bg-clip-text text-transparent">
          📋 Recruitment Applications
        </h2>
        <Link href="/recruitment/form">
          <span className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors">
            Apply Now →
          </span>
        </Link>
      </div>

      {!registrationData?.isRegistered ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
          <p className="text-slate-400">No active applications yet.</p>
          <p className="text-slate-500 text-sm mt-2">
            Interested in joining our team?{" "}
            <Link href="/recruitment/form">
              <span className="text-purple-400 hover:text-purple-300">Apply here</span>
            </Link>
            !
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Application Card Example */}
          <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Recruitment Application Submitted
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Your application has been submitted successfully. We&apos;re reviewing your submission
                  and will get back to you soon with updates.
                </p>
                <div className="flex gap-4 mt-4">
                  <div className="text-sm">
                    <p className="text-slate-500">Status</p>
                    <p className="text-green-400 font-semibold">Under Review</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-slate-500">Submitted</p>
                    <p className="text-white font-semibold">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Pending
                </span>
              </div>
            </div>
          </div>

          {/* Note: In the future, this section will fetch and display multiple applications from the backend */}
          <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-blue-400 text-sm">
              ℹ️ Multiple applications and status tracking coming soon! We&apos;re building enhanced
              application management features.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React from "react";
import { Award, Download } from "lucide-react";
import Link from "next/link";

interface CertificatesSectionProps {
  user: any;
}

export default function CertificatesSection({ user }: CertificatesSectionProps) {
  return (
    <div className="gradient-card rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold from-yellow-400 to-yellow-600 bg-gradient-to-r bg-clip-text text-transparent">
          🏆 Your Certificates
        </h2>
      </div>

      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-6 opacity-20">
          <Award className="w-10 h-10 text-yellow-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          Earn Certificates by Attending Events
        </h3>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Complete events and workshops to earn digital certificates that you can download, print,
          and share on LinkedIn and other platforms.
        </p>

        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg hover:shadow-lg transition-all hover:scale-105">
          <Award className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Feature Coming Soon</span>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <h4 className="font-semibold text-white mb-2">📚 Attendance-Based</h4>
            <p className="text-slate-400 text-sm">
              Automatically generate certificates after attending our events and workshops
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <h4 className="font-semibold text-white mb-2">📥 Easy Download</h4>
            <p className="text-slate-400 text-sm">
              Download certificates as PDF and share them across your professional networks
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <h4 className="font-semibold text-white mb-2">📤 LinkedIn Ready</h4>
            <p className="text-slate-400 text-sm">
              Share your achievements directly to LinkedIn to showcase your learning journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Github, Linkedin, GraduationCap, Building, Calendar } from "lucide-react";
import { useGetMemberByIdQuery } from "@/redux/features/api/member/memberApi";
import Loader from "@/components/Loader/Loader";

interface ProfileImage {
  public_id: string;
  url: string;
}

interface Member {
  profile_image: ProfileImage;
  _id: string;
  name: string;
  department: string;
  designation: string;
  email_id: string;
  batch: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
  leader: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function MemberDetailsPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);
  const { id } = params;

  const { data, isLoading, isError } = useGetMemberByIdQuery(id);
  const member = data?.member as Member | undefined;

  if (isLoading) return <Loader />;

  if (isError || !member) {
    return (
      <div className="min-h-screen pt-28 pb-16 max-container flex items-center justify-center">
        <div className="text-center p-8 gradient-card border border-white/5 max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Member Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The member profile you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/members"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  const joinDate = member.createdAt
    ? new Date(member.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <div className="relative min-h-screen pt-28 pb-16 transition-colors duration-300">
      <div className="max-container">
        {/* Back Navigation Link */}
        <Link
          href="/members"
          className="group inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors w-fit mb-8"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Members</span>
        </Link>

        {/* Profile Details Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Image & Badges & Social Links */}
          <div className="md:col-span-1 flex flex-col items-center p-6 gradient-card border border-white/5 shadow-2xl relative overflow-hidden group">
            {/* Visual background glow element */}
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            
            {/* Profile Image container */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400/80 dark:border-yellow-400/50 shadow-lg relative bg-neutral-900 group-hover:scale-105 transition-transform duration-300">
              <img
                src={member.profile_image?.url || "/assets/Rectangle.svg"}
                alt={member.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Badges container */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {member.leader && (
                <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-md tracking-wider uppercase">
                  Leader
                </span>
              )}
              <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase">
                {member.department || "Core Team"}
              </span>
            </div>

            {/* Social Links container */}
            <div className="mt-8 flex gap-4 justify-center w-full pt-6 border-t border-white/5">
              {member.linkedin_url && (
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-bl from-neutral-800 to-neutral-950 border border-white/10 hover:border-blue-500/50 hover:scale-110 transition-all shadow-md group/social"
                >
                  <Linkedin className="text-gray-400 group-hover/social:text-blue-500 transition-colors w-5 h-5" />
                </a>
              )}
              {member.github_url && (
                <a
                  href={member.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-bl from-neutral-800 to-neutral-950 border border-white/10 hover:border-white/50 hover:scale-110 transition-all shadow-md group/social"
                >
                  <Github className="text-gray-400 group-hover/social:text-white transition-colors w-5 h-5" />
                </a>
              )}
              {member.email_id && (
                <a
                  href={`mailto:${member.email_id}`}
                  aria-label="Send Email"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-bl from-neutral-800 to-neutral-950 border border-white/10 hover:border-red-500/50 hover:scale-110 transition-all shadow-md group/social"
                >
                  <Mail className="text-gray-400 group-hover/social:text-red-500 transition-colors w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Bio & Core details grid */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold white-gradient-text leading-tight">
                {member.name}
              </h1>
              <p className="text-xl text-blue-500 dark:text-blue-400 font-semibold mt-2">
                {member.designation}
              </p>
            </div>

            {/* Bio Box */}
            <div className="p-6 gradient-card border border-white/5 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full blur-xl"></div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                {member.bio || "This team member hasn't added a biography yet."}
              </p>
            </div>

            {/* Quick Details Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Department info */}
              <div className="flex gap-4 p-5 gradient-card border border-white/5 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase">Department</p>
                  <p className="text-base text-gray-950 dark:text-gray-100 font-bold mt-1">
                    {member.department || "Core Operations"}
                  </p>
                </div>
              </div>

              {/* Batch info */}
              <div className="flex gap-4 p-5 gradient-card border border-white/5 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 text-green-500 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase">Batch/Year</p>
                  <p className="text-base text-gray-950 dark:text-gray-100 font-bold mt-1">
                    {member.batch || "N/A"}
                  </p>
                </div>
              </div>

              {/* Contact info */}
              <div className="flex gap-4 p-5 gradient-card border border-white/5 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10 text-red-500 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase">Email Address</p>
                  <p className="text-base text-gray-950 dark:text-gray-100 font-bold mt-1 truncate">
                    {member.email_id || "N/A"}
                  </p>
                </div>
              </div>

              {/* Join Date info */}
              <div className="flex gap-4 p-5 gradient-card border border-white/5 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-500 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase">Member Since</p>
                  <p className="text-base text-gray-950 dark:text-gray-100 font-bold mt-1">
                    {joinDate}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

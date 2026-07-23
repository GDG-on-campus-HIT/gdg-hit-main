"use client";
import Link from "next/link";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";

type Props = {
  id: string;
  name: string;
  imageSrc: string;
  role: string;
  bio: string;
  linkedin: string;
};

export default function MemberCard({ id, name, imageSrc, role, bio, linkedin }: Props) {
  return (
    <div className="min-w-[300px] w-full group relative">
      <div className="w-full relative aspect-square overflow-hidden items-center flex justify-center">
        <Link href={`/members/${id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={imageSrc}
            alt={name}
            className="h-auto aspect-square object-bottom object-contain grayscale-0 dark:grayscale dark:hover:grayscale-0 transition-transform duration-300 group-hover:scale-105"
          />
          <img
            src="/assets/Rectangle.svg"
            alt=""
            className="absolute bottom-0 -z-10 w-full dark:opacity-80 grayscale hover:grayscale-0 opacity-20"
          />
        </Link>

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 flex items-center justify-center right-2 w-10 h-10 rounded-full bg-gradient-to-bl from-[#3c3c3f] to-[#000000] border-[2px] dark:border-[#484848] hover:scale-110 transition-all cursor-pointer z-10"
          >
            <FaLinkedinIn className="text-white/60" size={18} />
          </a>
        )}
      </div>
      <Link href={`/members/${id}`} className="block p-2 cursor-pointer">
        <h3 className="dark:text-gray-300 font-semibold text-xl group-hover:text-yellow-400 transition-colors">
          {name}
        </h3>
        <h4 className="text-sm text-gray-400 mb-1 dark:text-blue-400">
          {role}
        </h4>
        <p className="dark:text-gray-500 text-sm line-clamp-2">{bio}</p>
      </Link>
    </div>
  );
}

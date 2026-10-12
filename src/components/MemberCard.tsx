"use client";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  imageSrc: string;
  role: string;
  bio: string;
  linkedin: string;
};

const accents = [
  { shape: "/assets/RectangleBlue.svg", role: "dark:text-blue-400 text-blue-600" },
  { shape: "/assets/RectangleRed.svg", role: "dark:text-red-400 text-red-600" },
  { shape: "/assets/RectangleYellow.svg", role: "dark:text-yellow-400 text-yellow-600" },
  { shape: "/assets/RectangleGreen.svg", role: "dark:text-green-400 text-green-600" },
];

function accentFor(name: string) {
  const hash = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return accents[hash % accents.length];
}

export default function MemberCard({ name, imageSrc, role, bio, linkedin }: Props) {
  const accent = accentFor(name);

  return (
    <div className="group w-full">
      <div className="relative isolate flex aspect-square w-full items-center justify-center overflow-hidden">
        <img
          src="/assets/Rectangle.svg"
          alt=""
          aria-hidden
          className="absolute bottom-0 -z-10 w-full opacity-20 transition-opacity duration-500 group-hover:opacity-0 dark:opacity-80"
        />
        <img
          src={accent.shape}
          alt=""
          aria-hidden
          className="absolute bottom-0 -z-10 w-full opacity-0 saturate-[0.85] transition-opacity duration-500 group-hover:opacity-70 dark:group-hover:opacity-60"
        />
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          className="aspect-square h-auto object-contain object-bottom transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03] dark:grayscale dark:group-hover:grayscale-0"
        />
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border-[2px] bg-gradient-to-bl from-[#3c3c3f] to-[#000000] transition-all duration-300 hover:scale-110 hover:border-[#0A66C2] hover:from-[#0A66C2] hover:to-[#004182] dark:border-[#484848]"
          >
            <FaLinkedinIn className="text-white/60 transition-colors group-hover:text-white/90" size={18} />
          </a>
        )}
      </div>
      <div className="p-2">
        <h3 className="text-xl font-semibold transition-colors dark:text-gray-300 dark:group-hover:text-white">
          {name}
        </h3>
        <h4 className={cn("mb-1 text-sm", accent.role)}>{role}</h4>
        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-500">{bio}</p>
      </div>
    </div>
  );
}

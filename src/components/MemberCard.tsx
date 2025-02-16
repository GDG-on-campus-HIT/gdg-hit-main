"use client";
import Link from "next/link";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";

type Props = {
  name: string;
  imageSrc: string;
  role: string;
  bio: string;
  linkedin:string
};

export default function MemberCard({ name, imageSrc, role, bio,linkedin }: Props) {
  return (
    <div className=" min-w-[300px] w-[300px]">
      <div className="w-full relative aspect-square overflow-hidden items-center flex justify-center ">
        <img
          src={imageSrc}
          alt=""
          className=" h-auto aspect-square object-bottom object-contain grayscale-0 dark:grayscale dark:hover:grayscale-0 group"
        />
        <img
          src="/assets/Rectangle.svg"
          alt=""
          className="absolute bottom-0 -z-10 w-full dark:opacity-80 grayscale hover:grayscale-0 opacity-20"
        />
        <Link href={linkedin}>
          <div className="absolute bottom-2 flex items-center justify-center right-2 w-10 h-10 rounded-full bg-gradient-to-bl from-[#3c3c3f] to-[#000000] border-[2px] dark:border-[#484848] hover:scale-110 transition-all cursor-pointer">
            <FaLinkedinIn className="text-white/60" size={18} />
          </div>
        </Link>
        {/* <img
          src="/assets/linkedin.png" 
          alt=""
          className="absolute bottom-2 right-2 w-10"
        /> */}
      </div>
      <div className="p-2">
        <h3 className="dark:text-gray-300 font-semibold text-xl ">{name}</h3>
        <h4 className={`text-sm text-gray-400 mb-1 dark:text-blue-400`}>
          {role}
        </h4>
        <p className="dark:text-gray-500 text-sm line-clamp-2">{bio}</p>
      </div>
    </div>
  );
}

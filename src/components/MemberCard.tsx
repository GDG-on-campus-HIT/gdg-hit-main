"use client"
import React from "react";

type Props = {
  name: string;
  imageSrc: string;
  role: string;
  bio: string;
};

export default function MemberCard({ name, imageSrc, role, bio }: Props) {
  return (
    <div className="w-full ">
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
        <img
          src="/assets/linkedin.png"
          alt=""
          className="absolute bottom-2 right-2 w-10"
        />
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

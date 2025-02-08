"use client";
import { cn } from "@/lib/utils";
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export const TestimonialCard = ({
  name,
  department,
  message,
}: {
  name: string;
  department: string;
  message: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.09]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-brandPrimary-10 dark:hover:bg-brandPrimary-0"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src="#" alt="@shadcn" />
          <AvatarFallback className="uppercase">
            {name.substring(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{department}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{message}</blockquote>
    </figure>
  );
};

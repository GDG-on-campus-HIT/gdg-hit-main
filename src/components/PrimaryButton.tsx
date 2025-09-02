import React from "react";
import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    className?: string;
};

function PrimaryButton({ children, className }: Props) {
  return (
    <button className={cn(
      "px-8 py-2 rounded-full relative bg-gradient-to-bl from-blue-600 to-blue-950 text-white text-sm hover:shadow-2xl transition duration-200 border dark:border-white/10",
      className
    )}>
      <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      <span className="relative z-20 font-medium">{children}</span>
    </button>
  );
}

export default PrimaryButton;

"use client";
import React from "react";
import { User } from "lucide-react";

interface DashboardHeaderProps {
  user: any;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="gradient-card p-8 rounded-xl">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold from-blue-400 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
            {getGreeting()}, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-slate-400 mt-2">
            Welcome to your GDG HIT Dashboard. Track your progress and stay updated!
          </p>
        </div>
      </div>
    </div>
  );
}

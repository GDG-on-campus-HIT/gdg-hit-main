"use client";
import React, { useMemo } from "react";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { Calendar, FileText, Award, CheckCircle } from "lucide-react";

interface DashboardStatsProps {
  user: any;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  color: string;
}) => (
  <div className="gradient-card p-6 rounded-lg hover:shadow-lg transition-all">
    <div className="flex items-center gap-4">
      <div className={`w-14 h-14 rounded-lg ${color} flex items-center justify-center`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  </div>
);

export default function DashboardStats({ user }: DashboardStatsProps) {
  const { data: eventData } = useEventQuery({});

  // Calculate stats (placeholder values until backend provides them)
  const stats = useMemo(() => {
    return {
      eventsAttended: 0, // Will be fetched from user event history
      activeApplications: 0, // Will be fetched from user applications
      certificatesEarned: 0, // Will be available when certificate API is ready
      upcomingEvents: eventData?.events?.filter((e: any) => e.is_upcoming)?.length || 0,
    };
  }, [eventData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Calendar}
        label="Events Attended"
        value={stats.eventsAttended}
        color="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <StatCard
        icon={FileText}
        label="Active Applications"
        value={stats.activeApplications}
        color="bg-gradient-to-br from-purple-500 to-purple-600"
      />
      <StatCard
        icon={Award}
        label="Certificates Earned"
        value={stats.certificatesEarned}
        color="bg-gradient-to-br from-yellow-500 to-yellow-600"
      />
      <StatCard
        icon={CheckCircle}
        label="Upcoming Events"
        value={stats.upcomingEvents}
        color="bg-gradient-to-br from-green-500 to-green-600"
      />
    </div>
  );
}

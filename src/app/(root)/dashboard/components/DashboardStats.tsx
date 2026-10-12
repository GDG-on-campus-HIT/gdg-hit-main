"use client";
import React, { useMemo } from "react";
import { useMyCertificatesQuery, useMyEventsQuery } from "@/redux/features/api/me/meApi";
import { Calendar, Award, CheckCircle, Ticket } from "lucide-react";

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
  const { data: eventsData } = useMyEventsQuery();
  const { data: certificatesData } = useMyCertificatesQuery();

  const stats = useMemo(() => {
    const events = eventsData?.events ?? [];
    return {
      registered: events.length,
      attended: events.filter((e) => e.attendance).length,
      certificates: certificatesData?.certificates?.length ?? 0,
      upcoming: events.filter((e) => e.event.is_upcoming && !e.attendance).length,
    };
  }, [eventsData, certificatesData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Ticket}
        label="Events Registered"
        value={stats.registered}
        color="bg-gradient-to-br from-purple-500 to-purple-600"
      />
      <StatCard
        icon={CheckCircle}
        label="Events Attended"
        value={stats.attended}
        color="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard
        icon={Award}
        label="Certificates Earned"
        value={stats.certificates}
        color="bg-gradient-to-br from-yellow-500 to-yellow-600"
      />
      <StatCard
        icon={Calendar}
        label="Upcoming For You"
        value={stats.upcoming}
        color="bg-gradient-to-br from-blue-500 to-blue-600"
      />
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | GDG HIT",
  description: "Your personal dashboard with events, applications, and certificates",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-900 to-black dark:from-slate-950 dark:via-slate-950 dark:to-black">
      {children}
    </div>
  );
}

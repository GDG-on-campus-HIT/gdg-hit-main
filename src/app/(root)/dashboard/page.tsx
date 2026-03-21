"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import EventsSection from "./components/EventsSection";
import ApplicationsSection from "./components/ApplicationsSection";
import CertificatesSection from "./components/CertificatesSection";

export default function DashboardPage() {
  const { user } = useSelector((state: any) => state.auth);
  const { data: userData, isLoading: isUserLoading } = useLoadUserQuery({});
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isUserLoading && !user?.email) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return <Loader />;
  }

  if (!user?.email) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <DashboardHeader user={user} />
      
      <div className="space-y-8 mt-8">
        <DashboardStats user={user} />
        
        <EventsSection user={user} />
        
        <ApplicationsSection user={user} />
        
        <CertificatesSection user={user} />
      </div>
    </div>
  );
}

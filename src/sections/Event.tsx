'use client';

import { motion } from "framer-motion";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface EventProps {
    event: any;
}

export function Event({ event }: EventProps) {
    if (!event || !event.registration_open) {
        return null;
    }

    return (
        <section className="w-full py-16 px-6 bg-gradient-to-br from-gray-900 to-black border-t border-b border-gray-800">
            <div className="max-w-4xl mx-auto">
                {/* Event Banner Background */}
                {event.eventBanner?.url && (
                    <div className="relative mb-8 rounded-lg overflow-hidden h-64 sm:h-80 w-full">
                        <Image
                            src={event.eventBanner.url}
                            alt={event.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                )}

                {/* Event Content */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {event.name}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-6">
                        {event.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <div className="text-white space-y-2">
                            <p className="font-semibold text-lg">📅 {event.eventDate}</p>
                            <p className="font-semibold text-lg">🕐 {event.eventTime}</p>
                            <p className="font-semibold text-lg">📍 {event.venue}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={`/events/${event._id}`}>
                            <PrimaryButton>Register Now</PrimaryButton>
                        </Link>
                        <Link href="/events">
                            <button className="px-8 py-2 rounded-full relative gradient-card text-white text-sm hover:shadow-2xl transition duration-200 border border-white/20">
                                <span className="relative z-20 font-medium">View All Events</span>
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

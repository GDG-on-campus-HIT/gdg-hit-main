'use client';

import { motion } from "framer-motion";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import React, { useState } from "react";
import { Calendar, Clock, MapPin, Zap, Target } from "lucide-react";

interface EventProps {
    event: any;
}



// Convert hex to RGB for usage
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : { r: 59, g: 130, b: 246 }; // Default blue
};

// Animated Background Component
const AnimatedBackground = ({ themeColor }: { themeColor: string }) => {
    const rgb = hexToRgb(themeColor);
    
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-black" />
            
            {/* Animated gradient blob - top right */}
            <motion.div
                className="absolute -top-64 -right-64 w-96 h-96 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08) 0%, transparent 70%)`,
                }}
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, 30, 50, 0],
                    scale: [1, 1.2, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            {/* Animated gradient blob - bottom left */}
            <motion.div
                className="absolute -bottom-64 -left-64 w-96 h-96 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06) 0%, transparent 70%)`,
                }}
                animate={{
                    x: [0, -40, 30, 0],
                    y: [0, -50, -30, 0],
                    scale: [1, 1.1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />
        </div>
    );
};

// Enhanced Button with hover microinteractions
const EnhancedEventButton = ({ children, href, variant = "primary", icon: Icon, themeColor }: any) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const rgb = hexToRgb(themeColor);

    return (
        <Link href={href}>
            <motion.button
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 relative overflow-hidden group flex items-center gap-2`}
                style={{
                    backgroundColor: variant === "primary" ? themeColor : "transparent",
                    color: "white",
                    border: variant === "secondary" ? `2px solid ${themeColor}` : "none",
                    boxShadow: isHovered
                        ? `0 20px 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${variant === "primary" ? 0.6 : 0.3})`
                        : undefined,
                }}
            >
                {/* Shimmer effect on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    animate={isHovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                    transition={{ duration: 0.6 }}
                />

                {/* Glow effect */}
                {variant === "primary" && (
                    <motion.div
                        className="absolute inset-0 rounded-full opacity-0"
                        animate={isHovered ? { opacity: [0.5, 0] } : { opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            boxShadow: `inset 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`,
                        }}
                    />
                )}

                <span className="relative z-10 flex items-center gap-2">
                    {Icon && <Icon size={20} />}
                    {children}
                </span>
            </motion.button>
        </Link>
    );
};

// Event Info Card with stagger animation
const EventInfoItem = ({ icon: Icon, label, value, delay, themeColor }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const rgb = hexToRgb(themeColor);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ scale: 1.08, y: -4 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-6 rounded-lg transition-all duration-300 relative group"
            style={{
                borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? 0.6 : 0.2})`,
                borderWidth: "1px",
                boxShadow: isHovered ? `0 0 24px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` : "none",
            }}
        >
            {/* Animated border glow */}
            <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                    border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`,
                }}
                animate={{
                    boxShadow: isHovered 
                        ? `inset 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1), 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)` 
                        : "none",
                }}
                transition={{ duration: 0.3 }}
            />
            <div className="flex items-center gap-3 mb-3">
                <motion.div
                    animate={{
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                >
                    <Icon style={{ color: themeColor }} size={24} />
                </motion.div>
            </div>
            <p className="font-semibold text-lg text-white mb-1">{label}</p>
            <motion.p 
                className="font-bold text-lg" 
                style={{ color: themeColor }}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
            >
                {value}
            </motion.p>
        </motion.div>
    );
};

export function Event({ event }: EventProps) {
    const themeColor = '#EC1C24'; // Brand color - Google red

    if (!event || !event.registration_open) {
        return null;
    }

    return (
        <section className="relative w-full py-20 px-6 overflow-hidden bg-slate-900">
            <AnimatedBackground themeColor={themeColor} />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Event Content Container */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Event Title with glow effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative mb-6"
                    >
                        <motion.div
                            className="absolute inset-0 blur-2xl -z-10"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${themeColor}33, transparent)`,
                            }}
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <h2 className="relative text-4xl md:text-6xl font-black text-white mb-2">
                            {event.name}
                        </h2>
                        <motion.div 
                            className="h-1 w-20 mx-auto rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${themeColor}, ${themeColor}99)`,
                            }}
                            animate={{
                                width: ["80px", "120px", "80px"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    {/* Event Description with fade-in */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        {event.description}
                    </motion.p>

                    {/* Event Details Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <EventInfoItem
                            icon={Calendar}
                            label="Date"
                            value={event.eventDate}
                            delay={0.5}
                            themeColor={themeColor}
                        />
                        <EventInfoItem
                            icon={Clock}
                            label="Time"
                            value={event.eventTime}
                            delay={0.6}
                            themeColor={themeColor}
                        />
                        <EventInfoItem
                            icon={MapPin}
                            label="Venue"
                            value={event.venue}
                            delay={0.7}
                            themeColor={themeColor}
                        />
                    </motion.div>

                    {/* CTA Buttons with staggered animation */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <EnhancedEventButton 
                            href={`/events/${event._id}`} 
                            variant="primary"
                            icon={Zap}
                            themeColor={themeColor}
                        >
                            Register Now
                        </EnhancedEventButton>
                        <EnhancedEventButton 
                            href="/events" 
                            variant="secondary"
                            icon={Target}
                            themeColor={themeColor}
                        >
                            View All Events
                        </EnhancedEventButton>
                    </motion.div>
                </motion.div>


            </div>
        </section>
    );
}

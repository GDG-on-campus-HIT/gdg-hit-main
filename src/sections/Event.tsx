'use client';

import { motion } from "framer-motion";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Zap, Target } from "lucide-react";

interface EventProps {
    event: any;
}

// Extract dominant color from image
const extractColorFromImage = (imageSrc: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 150;
                canvas.height = 150;
                const ctx = canvas.getContext('2d');
                
                if (ctx) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;

                    // Calculate average color
                    let r = 0, g = 0, b = 0;
                    const pixelCount = data.length / 4;

                    for (let i = 0; i < data.length; i += 4) {
                        const brightness = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
                        if (brightness > 50) { // Skip very dark pixels
                            r += data[i];
                            g += data[i + 1];
                            b += data[i + 2];
                        }
                    }

                    r = Math.floor(r / pixelCount);
                    g = Math.floor(g / pixelCount);
                    b = Math.floor(b / pixelCount);

                    // Convert to relatively saturated color
                    const hsl = rgbToHsl(r, g, b);
                    const saturatedColor = hslToRgb(hsl[0], Math.min(hsl[1] + 20, 100), Math.min(hsl[2] + 10, 90));
                    const hex = rgbToHex(saturatedColor[0], saturatedColor[1], saturatedColor[2]);
                    
                    resolve(hex);
                }
            } catch {
                resolve('#3b82f6'); // Fallback blue
            }
        };

        img.onerror = () => {
            resolve('#3b82f6'); // Fallback blue
        };

        img.src = imageSrc;
    });
};

// Helper functions for color conversion
const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return [h * 360, s * 100, l * 100];
};

const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
};

// Convert hex to RGB for usage
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : { r: 59, g: 130, b: 246 }; // Default blue
};

// Animated Professional Background Theme
const AnimatedEventBackground = ({ themeColor }: { themeColor: string }) => {
    const rgb = hexToRgb(themeColor);
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-black" />

            {/* Animated gradient orbs - top right */}
            <motion.div
                className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15) 0%, transparent 70%)`,
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Animated glow - bottom left */}
            <motion.div
                className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1) 0%, transparent 70%)`,
                }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />

            {/* Floating particles */}
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full opacity-30"
                    animate={{
                        y: [0, -20, 0],
                        x: [0, Math.sin(i) * 10, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                    }}
                    style={{
                        backgroundColor: themeColor,
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 20}%`,
                    }}
                />
            ))}

            {/* Subtle grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
                <defs>
                    <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-6 rounded-lg transition-all duration-300"
            style={{
                borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? 0.6 : 0.2})`,
                borderWidth: "1px",
            }}
        >
            <div className="flex items-center gap-3 mb-3">
                <Icon style={{ color: themeColor }} size={24} />
            </div>
            <p className="font-semibold text-lg text-white mb-1">{label}</p>
            <p className="font-bold text-lg" style={{ color: themeColor }}>{value}</p>
        </motion.div>
    );
};

export function Event({ event }: EventProps) {
    const [themeColor, setThemeColor] = useState('#3b82f6'); // Default blue
    const [colorLoaded, setColorLoaded] = useState(false);

    useEffect(() => {
        if (event?.eventBanner?.url) {
            extractColorFromImage(event.eventBanner.url).then((color) => {
                setThemeColor(color);
                setColorLoaded(true);
            });
        } else {
            setColorLoaded(true);
        }
    }, [event?.eventBanner?.url]);

    if (!event || !event.registration_open) {
        return null;
    }

    const hasBanner = event.eventBanner?.url;

    if (!colorLoaded) {
        return null; // Return null while loading color
    }

    return (
        <section className={`relative w-full py-20 px-6 overflow-hidden ${!hasBanner ? 'bg-slate-900' : ''}`}>
            {/* Poster as Background when present */}
            {hasBanner && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={event.eventBanner.url}
                        alt={event.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark overlay for readability */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
            )}

            {/* Animated Background - Fallback when no poster */}
            {!hasBanner && <AnimatedEventBackground themeColor={themeColor} />}

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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative mb-6"
                    >
                        <motion.div
                            className="absolute inset-0 blur-2xl"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${themeColor}33, transparent)`,
                            }}
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
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
                        <div 
                            className="h-1 w-20 mx-auto rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${themeColor}, ${themeColor}99)`,
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

                {/* Floating accent elements - only when no banner */}
                {!hasBanner && (
                    <>
                        <motion.div
                            className="absolute top-1/4 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                            style={{
                                background: `radial-gradient(circle, ${themeColor}0d 0%, transparent 70%)`,
                            }}
                            animate={{
                                y: [0, 20, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 -left-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                            style={{
                                background: `radial-gradient(circle, ${themeColor}08 0%, transparent 70%)`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                scale: [1, 0.9, 1],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                        />
                    </>
                )}
            </div>
        </section>
    );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import { EventType } from "@/app/(root)/events/types";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

interface Props {
  event: EventType;
  variant?: "default" | "compact";
  className?: string;
}

const EventCard: React.FC<Props> = ({
  event,
  variant = "default",
  className = "",
}) => {
  // Safety check for required event properties
  if (!event || !event._id || !event.name) {
    return null; // Don't render if essential data is missing
  }
  const hoverAnimation = {
    rest: { y: 0, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" },
    hover: {
      y: variant === "default" ? -8 : -5,
      boxShadow:
        variant === "default"
          ? "0 20px 30px rgba(0,0,0,0.2)"
          : "0 10px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const baseClasses = `
    relative overflow-hidden gradient-card 
    shadow-lg hover:shadow-xl transition-shadow duration-300
  `;

  const variantClasses = {
    default: `${baseClasses} h-auto`,
    compact: `${baseClasses} h-auto flex flex-col`,
  };

  const titleClasses = {
    default: "text-2xl font-bold",
    compact: "text-lg font-bold line-clamp-2",
  };

  const imageClasses = {
    default: "h-56",
    compact: "h-40",
  };

  const textSizeClasses = {
    default: "text-sm",
    compact: "text-xs",
  };

  return (

    <Link href={`/events/${event._id}`}>

      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={hoverAnimation}
        className={`${variantClasses[variant]} ${className} border-[1px] border-white/5 cursor-pointer`}
      >
        {/* Image Section */}
        <div className={`relative ${imageClasses[variant]} overflow-hidden`}>
          <img
            src={event.eventBanner?.url || "/img/events/image.png"}
            alt={event.name}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        </div>

        {/* Content Section */}
        <div
          className={`p-${variant === "default" ? "6" : "4"} ${
            variant === "default" ? "space-y-4" : "flex-grow flex flex-col"
          }`}
        >
          <h3
            className={`
              ${titleClasses[variant]} text-white 
              ${variant === "compact" ? "mb-2" : ""}
            `}
          >
            {event.name}
          </h3>

          <div
            className={`space-y-2 text-gray-400 ${
              variant === "compact" ? "mb-2" : ""
            }`}
          >
            <div className="flex items-center">
              <Calendar className={`mr-3 w-5 h-5 text-blue-500 ${textSizeClasses[variant]}`} />
              <span className={textSizeClasses[variant]}>{event.eventDate}</span>
            </div>
            <div className="flex items-center">
              <MapPin className={`mr-3 w-5 h-5 text-green-500 ${textSizeClasses[variant]}`} />
              <span className={`${textSizeClasses[variant]} truncate`}>{event.venue}</span>
            </div>
          </div>

          <p
            className={`text-gray-300 ${textSizeClasses[variant]} line-clamp-2 ${
              variant === "compact" ? "mb-3" : ""
            }`}
          >
            {event.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default EventCard;
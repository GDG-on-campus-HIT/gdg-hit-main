"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { EventType } from "@/app/(root)/events/types";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface EventCardProps {
  event: EventType;
  variant?: "default" | "compact";
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  variant = "default",
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { clearProps: "transform" });

    const enterAnimation = {
      y: variant === "default" ? -8 : -5,
      duration: 0.3,
      ease: "power2.out",
      boxShadow:
        variant === "default"
          ? "0 20px 30px rgba(0,0,0,0.2)"
          : "0 10px 15px rgba(0,0,0,0.1)",
    };

    const leaveAnimation = {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      boxShadow:
        variant === "default"
          ? "0 10px 20px rgba(0,0,0,0.1)"
          : "0 4px 6px rgba(0,0,0,0.05)",
    };

    card.addEventListener("mouseenter", () => {
      gsap.to(card, enterAnimation);
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, leaveAnimation);
    });

    return () => {
      gsap.killTweensOf(card);
    };
  }, [variant]);

  const baseClasses = `
    relative 
    
    overflow-hidden 
    gradient-card 
    shadow-lg hover:shadow-xl
    transition-shadow duration-300
    will-change-transform
  `;

  const variantClasses = {
    default: `
      ${baseClasses}
      h-auto
    `,
    compact: `
      ${baseClasses}
      h-auto flex flex-col
    `,
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
    <div
      ref={cardRef}
      style={{ transform: "translate3d(0, 0, 0)" }}
      className={`
        ${variantClasses[variant]} 
        ${className} border-[1px] border-white/5
      `}
    >
      {/* Image Section */}
      <div className={`relative ${imageClasses[variant]} overflow-hidden`}>
        <img
          src={event.eventBanner.url}
          alt={event.name}
          className="w-full h-full object-cover brightness-100 dark:brightness-90"
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
          ${titleClasses[variant]} 
          text-gray-900 dark:text-white 
          ${variant === "compact" ? "mb-2" : ""}
        `}
        >
          {event.name}
        </h3>

        <div
          className={`space-y-2 text-gray-600 dark:text-gray-400 ${
            variant === "compact" ? "mb-2" : ""
          }`}
        >
          <div className="flex items-center">
            <Calendar
              className={`mr-3 w-5 h-5 text-blue-500 ${textSizeClasses[variant]}`}
            />
            <span className={textSizeClasses[variant]}>{event.eventDate}</span>
          </div>
          <div className="flex items-center">
            <MapPin
              className={`mr-3 w-5 h-5 text-green-500 ${textSizeClasses[variant]}`}
            />
            <span className={`${textSizeClasses[variant]} truncate`}>
              {event.venue}
            </span>
          </div>
        </div>

        <p
          className={`
          text-gray-700 dark:text-gray-300 
          ${textSizeClasses[variant]} 
          line-clamp-2 
          ${variant === "compact" ? "mb-3" : ""}
        `}
        >
          {event.description}
        </p>

        <div
          className={`
          ${
            variant === "default"
              ? "flex justify-between"
              : "mt-auto flex justify-between"
          } 
          items-center
        `}
        >
          {/* {category === "upcoming" && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group inline-flex items-center 
                ${
                  variant === "default"
                    ? "px-5 py-2.5 text-sm"
                    : "px-3 py-1.5 text-xs"
                }
                bg-blue-600 hover:bg-blue-700 
                text-white 
                rounded-full 
                transition-all duration-300 
                shadow-md hover:shadow-lg
              `}
            >
              <span className={`mr-${variant === "default" ? "2" : "1"}`}>
                Register
              </span>
              <ArrowRight
                className={`
                ${variant === "default" ? "w-4 h-4" : "w-3 h-3"} 
                transition-transform group-hover:translate-x-1
              `}
              />
            </a>
          )}

          <span
            className={`
            ${variant === "default" ? "text-xs" : "text-[10px]"} 
            text-gray-500 dark:text-gray-600
          `}
          >
            Event ID: {event.id}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

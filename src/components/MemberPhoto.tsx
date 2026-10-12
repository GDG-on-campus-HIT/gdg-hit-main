"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type AvatarTone = "blue" | "red" | "yellow" | "green";

const TONES: Record<AvatarTone, { light: string; mid: string; dark: string }> = {
  blue: { light: "#aecbfa", mid: "#4285f4", dark: "#1a56c4" },
  red: { light: "#f6aea9", mid: "#ea4335", dark: "#b3261e" },
  yellow: { light: "#fde293", mid: "#fbbc04", dark: "#e37400" },
  green: { light: "#a8dab5", mid: "#34a853", dark: "#137333" },
};

const TONE_ORDER: AvatarTone[] = ["blue", "red", "yellow", "green"];

// Placeholder uploads (e.g. the 135x125 GDG logo) are tiny; real member cutouts are far larger.
const MIN_PHOTO_SIZE = 200;

const TITLES = new Set(["prof", "dr", "mr", "mrs", "ms", "er"]);

export function toneFor(name: string): AvatarTone {
  const hash = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return TONE_ORDER[hash % TONE_ORDER.length];
}

export function initialsFor(name: string) {
  const words = name
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word && !TITLES.has(word.toLowerCase()));
  if (words.length === 0) return "G";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function MemberAvatar({
  name,
  tone = toneFor(name),
  className,
}: {
  name: string;
  tone?: AvatarTone;
  className?: string;
}) {
  const id = useId();
  const { light, mid, dark } = TONES[tone];

  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label={name}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`${id}-head`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={mid} />
        </linearGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </defs>
      <path d="M86 104h28v28a14 8 0 0 1-28 0Z" fill={mid} />
      <path d="M86 112c8 5 20 5 28 0v8c-8 4-20 4-28 0Z" fill="black" fillOpacity="0.15" />
      <path d="M28 200C28 156 60 130 100 130C140 130 172 156 172 200Z" fill={`url(#${id}-body)`} />
      <path
        d="M82 133Q100 150 118 133"
        fill="none"
        stroke="black"
        strokeOpacity="0.18"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="100" cy="78" r="35" fill={`url(#${id}-head)`} />
      <text
        x="100"
        y="182"
        textAnchor="middle"
        fill="white"
        fillOpacity="0.92"
        fontSize="24"
        fontWeight="600"
        letterSpacing="2"
        fontFamily="inherit"
      >
        {initialsFor(name)}
      </text>
    </svg>
  );
}

type Status = "loading" | "ready" | "fallback";

export default function MemberPhoto({
  src,
  name,
  tone,
  className,
  loading,
}: {
  src?: string | null;
  name: string;
  tone?: AvatarTone;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<Status>(src ? "loading" : "fallback");

  const inspect = useCallback((img: HTMLImageElement) => {
    const isRealPhoto = img.naturalWidth >= MIN_PHOTO_SIZE && img.naturalHeight >= MIN_PHOTO_SIZE;
    setStatus(isRealPhoto ? "ready" : "fallback");
  }, []);

  useEffect(() => {
    if (!src) {
      setStatus("fallback");
      return;
    }
    setStatus("loading");
    const img = imgRef.current;
    if (img?.complete) inspect(img);
  }, [src, inspect]);

  if (status === "fallback") {
    return <MemberAvatar name={name} tone={tone} className={className} />;
  }

  return (
    <img
      ref={imgRef}
      src={src ?? undefined}
      alt={name}
      loading={loading}
      onLoad={(e) => inspect(e.currentTarget)}
      onError={() => setStatus("fallback")}
      className={cn(className, status === "loading" && "opacity-0")}
    />
  );
}

export type Accent = "blue" | "red" | "yellow" | "green";

export const accentStyles: Record<
  Accent,
  { dot: string; text: string; gradient: string; chip: string; bar: string; glow: string }
> = {
  blue: {
    dot: "bg-blue-500",
    text: "text-blue-500",
    gradient: "from-blue-400 to-blue-600",
    chip: "bg-blue-500/10 text-blue-500 ring-blue-500/20",
    bar: "bg-blue-500",
    glow: "from-blue-500/25",
  },
  red: {
    dot: "bg-red-500",
    text: "text-red-500",
    gradient: "from-red-400 to-red-600",
    chip: "bg-red-500/10 text-red-500 ring-red-500/20",
    bar: "bg-red-500",
    glow: "from-red-500/25",
  },
  yellow: {
    dot: "bg-yellow-500",
    text: "text-yellow-500",
    gradient: "from-yellow-400 to-yellow-600",
    chip: "bg-yellow-500/10 text-yellow-500 ring-yellow-500/20",
    bar: "bg-yellow-500",
    glow: "from-yellow-500/25",
  },
  green: {
    dot: "bg-green-500",
    text: "text-green-500",
    gradient: "from-green-400 to-green-600",
    chip: "bg-green-500/10 text-green-500 ring-green-500/20",
    bar: "bg-green-500",
    glow: "from-green-500/25",
  },
};

export const accentCycle: Accent[] = ["blue", "red", "yellow", "green"];

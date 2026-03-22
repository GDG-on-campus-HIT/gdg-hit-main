"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpidermanBackgroundProps {
  children?: React.ReactNode;
}

const SpidermanBackground: React.FC<SpidermanBackgroundProps> = ({ children }) => {
  return(
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-900 via-gray-900 to-blue-900 dark:from-red-950 dark:via-gray-950 dark:to-blue-950">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 via-transparent to-blue-600/20 opacity-40" />

      {/* Animated gradient blobs (Spider-Man red and blue) */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpidermanBackground;

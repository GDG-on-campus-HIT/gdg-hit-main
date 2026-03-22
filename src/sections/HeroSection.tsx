'use client';

import PrimaryButton from "@/components/PrimaryButton";
import RegisterNowButton from "@/components/RegisterNowButton";
import { InfiniteMovingCardImg } from "@/components/ui/infinite-moving-cards-img";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { useGetActiveRecruitmentFormQuery } from "@/redux/features/api/apiSlice";
import { motion } from "framer-motion";
import { Film, BookOpen, Zap, Globe2 } from "lucide-react";

// SVG Spider Icon Component
const SpiderIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
  </svg>
);

// Custom Web Icon SVG
const WebIcon = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="1" />
    <path d="M12 1v6m0 6v6" />
    <path d="M4.22 4.22l4.24 4.24m2.08 2.08l4.24 4.24" />
    <path d="M1 12h6m6 0h6" />
    <path d="M4.22 19.78l4.24-4.24m2.08-2.08l4.24-4.24" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// Marvel Comic-style halftone pattern
const HalftonePattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="halftone" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="3" fill="#EC1C24" opacity="0.8" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#halftone)" />
  </svg>
);

// Comic action text effect ("THWIP!")
const ComicActionText = ({ text, top, left, delay }: any) => (
  <motion.div
    className="absolute font-bold text-yellow-300 dark:text-yellow-400 pointer-events-none"
    style={{ top, left, textShadow: "2px 2px 0px #000, -2px -2px 0px #EC1C24" }}
    animate={{
      scale: [0.5, 1.2, 1],
      rotate: [Math.random() * 20 - 10, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 1.2,
      delay,
      repeat: Infinity,
      repeatDelay: 4,
    }}
  >
    <div className="text-2xl font-black" style={{ WebkitTextStroke: "1px black" }}>
      {text}
    </div>
  </motion.div>
);

// Speed lines effect (comic book style)
const SpeedLines = ({ count = 8, delay = 0 }: any) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={`speed-${i}`}
        className="absolute h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-transparent opacity-60 dark:opacity-40"
        style={{
          left: "-20%",
          top: `${10 + (i * 70) / count}%`,
          width: "40%",
        }}
        animate={{
          x: [0, 400],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 0.8,
          delay: delay + i * 0.05,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    ))}
  </>
);

// Comic book panel border effect
const ComicPanelBorder = () => (
  <div className="absolute inset-0 pointer-events-none border-8 border-black dark:border-gray-900 shadow-inset">
    <div className="absolute inset-1 border-2 border-yellow-300 dark:border-yellow-600" />
  </div>
);

// Spider web animation component with Marvel Comics aesthetic
const SpiderWebAnimation = () => {
  // Enhanced SVG web pattern with Marvel colors
  const SVGWebPattern = () => (
    <motion.svg
      className="absolute w-full h-full opacity-25 dark:opacity-35"
      viewBox="0 0 400 400"
      style={{ top: "5%", right: "5%", width: "300px", height: "300px" }}
    >
      <defs>
        <linearGradient id="webGradientMarvel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC1C24" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#DC2626" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#991B1B" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glowMarvel">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.8" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="comicSharp">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
          <feDiffuseLighting in="SourceGraphic" lightingColor="#fff" surfaceScale="5">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
        </filter>
      </defs>

      {/* Radial web lines - comic book style animated drawing effect */}
      <motion.line
        x1="200"
        y1="200"
        x2="200"
        y2="50"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2.5"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0 }}
      />
      <motion.line
        x1="200"
        y1="200"
        x2="320"
        y2="100"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2.5"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
      />
      <motion.line
        x1="200"
        y1="200"
        x2="350"
        y2="200"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2.5"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.line
        x1="200"
        y1="200"
        x2="320"
        y2="300"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2.5"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
      />
      <motion.line
        x1="200"
        y1="200"
        x2="200"
        y2="350"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2.5"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
      />
      <motion.line
        x1="200"
        y1="200"
        x2="80"
        y2="300"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2.5"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
      />
      <motion.line
        x1="200"
        y1="200"
        x2="50"
        y2="200"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2.5"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1.2 }}
      />
      <motion.line
        x1="200"
        y1="200"
        x2="80"
        y2="100"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2.5"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1.4 }}
      />

      {/* Marvel-style circular web rings with enhanced glow */}
      <motion.circle
        cx="200"
        cy="200"
        r="50"
        fill="none"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.1 }}
      />
      <motion.circle
        cx="200"
        cy="200"
        r="100"
        fill="none"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle
        cx="200"
        cy="200"
        r="150"
        fill="none"
        stroke="url(#webGradientMarvel)"
        strokeWidth="2"
        filter="url(#glowMarvel)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  );

  // Web shooting effect with Marvel styling
  const WebShootEffect = () => (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`web-shoot-${i}`}
          className="absolute h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent shadow-lg"
          style={{
            top: `${20 + i * 25}%`,
            left: "-10%",
            width: "120px",
            boxShadow: "0 0 20px rgba(236, 28, 36, 0.8)",
          }}
          animate={{
            x: [0, 550],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.3,
            delay: i * 0.4,
            repeat: Infinity,
            repeatDelay: 3.5,
          }}
        />
      ))}
      {/* Comic action text effects */}
      <ComicActionText text="THWIP!" top="25%" left="45%" delay={0} />
      <ComicActionText text="THWIP!" top="45%" left="60%" delay={0.8} />
    </>
  );

  // Spider-sense pulse animation - Marvel Comic style
  const SpiderSensePulse = () => (
    <motion.div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        left: "20%",
        top: "20%",
        width: "200px",
        height: "200px",
      }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(236, 28, 36, 0.8)",
          "0 0 0 60px rgba(236, 28, 36, 0.4)",
          "0 0 0 120px rgba(236, 28, 36, 0)",
        ],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        repeatDelay: 2.5,
      }}
    />
  );

  // Wall crawl effect (vertical movement) - Marvel style
  const WallCrawlEffect = () => (
    <>
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg opacity-60"
        style={{
          right: "15%",
          top: "-10px",
          boxShadow: "0 0 15px rgba(236, 28, 36, 0.6)",
        }}
        animate={{
          y: ["0%", "100vh"],
          opacity: [0, 0.6, 0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
      {/* Multiple crawlers for comic effect */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-red-500 opacity-40"
        style={{
          left: "25%",
          top: "-10px",
        }}
        animate={{
          y: ["0%", "100vh"],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 1,
        }}
      />
    </>
  );

  // Web zip line animation - Marvel style
  const WebZipLine = ({ delay, startX, startY, endX, endY }: any) => (
    <motion.svg
      className="absolute pointer-events-none"
      width="200"
      height="100"
      viewBox="0 0 200 100"
      style={{ left: startX, top: startY }}
    >
      <motion.line
        x1="0"
        y1="0"
        x2="200"
        y2="100"
        stroke="#EC1C24"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.3,
          delay,
          repeat: Infinity,
          repeatDelay: 3.5,
        }}
      />
      {/* Glow effect */}
      <motion.line
        x1="0"
        y1="0"
        x2="200"
        y2="100"
        stroke="#EC1C24"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.3,
          delay,
          repeat: Infinity,
          repeatDelay: 3.5,
        }}
      />
    </motion.svg>
  );

  // Energy burst effect (radial) - Marvel comic style
  const EnergyBurst = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [0, 1],
        opacity: [0.9, 0],
      }}
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        repeatDelay: 3.5,
      }}
    >
      <div className="w-24 h-24 rounded-full border-3 border-red-500 shadow-lg" style={{ boxShadow: "0 0 30px rgba(236, 28, 36, 0.7)" }} />
    </motion.div>
  );

  // Crawling spider animation
  const CrawlingSpider = () => {
    const path = [
      { x: "5%", y: "10%" },
      { x: "20%", y: "5%" },
      { x: "35%", y: "15%" },
      { x: "25%", y: "30%" },
      { x: "40%", y: "35%" },
      { x: "50%", y: "25%" },
      { x: "60%", y: "40%" },
      { x: "45%", y: "50%" },
      { x: "30%", y: "45%" },
      { x: "15%", y: "55%" },
      { x: "5%", y: "40%" },
      { x: "10%", y: "25%" },
    ];

    return (
      <motion.div
        className="absolute text-red-600 z-20"
        animate={{
          x: path.map((p) => `calc(${p.x} - 12px)`),
          y: path.map((p) => `calc(${p.y} - 12px)`),
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <SpiderIcon className="w-6 h-6" />
      </motion.div>
    );
  };

  // Web strand animation - creating webs
  const WebStrand = ({ delay, rotation }: { delay: number; rotation: number }) => (
    <motion.div
      className="absolute w-1 h-20 bg-gradient-to-b from-red-500 to-transparent opacity-60"
      style={{
        left: "50%",
        top: "20%",
        transformOrigin: "top center",
        rotate: rotation,
      }}
      animate={{
        scaleY: [0, 1, 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  );

  // Falling dewdrops on web
  const WebDrop = ({ delay, offsetX }: { delay: number; offsetX: number }) => (
    <motion.div
      className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full shadow-lg shadow-blue-400"
      style={{
        left: `calc(65% + ${offsetX}px)`,
        top: "15%",
      }}
      animate={{
        y: [0, 100, 120],
        opacity: [0, 1, 0.5],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    />
  );

  // Swinging motion effect
  const SwingEffect = () => (
    <motion.div
      className="absolute w-1 h-32 bg-gradient-to-b from-red-600 to-transparent opacity-30"
      style={{
        left: "40%",
        top: "-20%",
        transformOrigin: "top center",
      }}
      animate={{
        rotate: [-15, 15, -15],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  // Animated crawling spider with web creation
  const SpinningWeb = ({ 
    startX, 
    startY, 
    duration = 8,
    label = "web"
  }: any) => {
    return (
      <motion.svg
        className="absolute z-20"
        style={{
          width: "120px",
          height: "120px",
          left: startX,
          top: startY,
          transformOrigin: "center center",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id={`webGrad-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC1C24" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#991B1B" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Radial web lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 50 + 45 * Math.cos(rad);
          const y2 = 50 + 45 * Math.sin(rad);
          return (
            <line
              key={`radial-${label}-${angle}`}
              x1="50"
              y1="50"
              x2={x2}
              y2={y2}
              stroke={`url(#webGrad-${label})`}
              strokeWidth="1.5"
            />
          );
        })}
        
        {/* Circular web rings */}
        <circle cx="50" cy="50" r="15" fill="none" stroke={`url(#webGrad-${label})`} strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke={`url(#webGrad-${label})`} strokeWidth="1" />
        <circle cx="50" cy="50" r="45" fill="none" stroke={`url(#webGrad-${label})`} strokeWidth="1" />
      </motion.svg>
    );
  };

  // Charging power effect
  const PowerCharge = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "70%",
        top: "30%",
        width: "60px",
        height: "60px",
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 1,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      <div className="w-full h-full rounded-full border-2 border-blue-500 animate-pulse" />
    </motion.div>
  );

  return (
    <>
      {/* Marvel Comics Halftone Pattern Overlay */}
      <HalftonePattern />

      {/* SVG Web Drawing Pattern */}
      <SVGWebPattern />

      {/* Speed Lines - Comic Book Effect */}
      <SpeedLines count={10} delay={0} />
      <SpeedLines count={8} delay={2.5} />

      {/* Web Shooting Effects with Comic Action Text */}
      <WebShootEffect />

      {/* Spider-Sense Pulse */}
      <SpiderSensePulse />

      {/* Wall Crawl Effect */}
      <WallCrawlEffect />

      {/* Web Zip Lines */}
      <WebZipLine delay={0} startX="30%" startY="25%" endX="60%" endY="50%" />
      <WebZipLine delay={0.3} startX="60%" startY="35%" endX="20%" endY="60%" />

      {/* Energy Bursts */}
      {[0, 0.5, 1].map((delay) => (
        <EnergyBurst key={`burst-${delay}`} delay={delay} />
      ))}

      {/* Swinging Motion */}
      <SwingEffect />

      {/* Power Charging Effects */}
      {[0, 0.5].map((delay) => (
        <PowerCharge key={`charge-${delay}`} delay={delay} />
      ))}

      {/* Crawling Spider */}
      <CrawlingSpider />

      {/* Web Strands being created */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
        <WebStrand key={`strand-${i}`} delay={i * 0.1} rotation={rotation} />
      ))}

      {/* Animated web strands for background */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`web-${i}`}
          className="absolute w-1 bg-gradient-to-b from-red-600 to-transparent"
          style={{
            left: `${20 + i * 15}%`,
            top: 0,
            height: "100%",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleY: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Dew drops on web */}
      {[0, 1, 2, 3].map((i) => (
        <WebDrop key={`drop-${i}`} delay={i * 0.5} offsetX={i * 20} />
      ))}

      {/* Spider icons */}
      <motion.div
        className="absolute text-red-600 opacity-20"
        style={{ top: "10%", left: "10%", width: "40px", height: "40px" }}
        animate={{
          rotate: [0, 360],
          y: [0, 20, 0],
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <SpiderIcon className="w-10 h-10" />
      </motion.div>

      <motion.div
        className="absolute text-blue-600 opacity-15"
        style={{ bottom: "15%", right: "10%", width: "30px", height: "30px" }}
        animate={{
          rotate: [0, -360],
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <SpiderIcon className="w-8 h-8" />
      </motion.div>

      {/* Web corner patterns */}
      <motion.div
        className="absolute text-red-500 opacity-10"
        style={{ top: "5%", right: "5%", width: "60px", height: "60px" }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <WebIcon className="w-16 h-16" />
      </motion.div>

      {/* Comic Book Panel Border Effect */}
      <ComicPanelBorder />

      {/* Additional action text scattered around */}
      <ComicActionText text="POW!" top="15%" left="15%" delay={1.5} />
      <ComicActionText text="BANG!" top="70%" left="70%" delay={2.5} />

      {/* SPINNING WEBS */}
      
      {/* Web 1: Upper Right Corner */}
      <SpinningWeb 
        startX="80%"
        startY="0%"
        duration={10}
        label="web-1"
      />

      {/* Web 2: Upper Left Corner */}
      <SpinningWeb 
        startX="0%"
        startY="2%"
        duration={12}
        label="web-2"
      />

      {/* Web 3: Near Recruitment Button (lower center area) */}
      <SpinningWeb 
        startX="40%"
        startY="75%"
        duration={11}
        label="web-3"
      />
    </>
  );
};

// Spider-Man themed button component - Marvel Comics style
const SpidermanButton = ({
  children,
  href,
  variant = "primary",
  icon: IconComponent,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  icon?: React.ComponentType<{ className?: string }>;
}) => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Link href={href}>
      <div className="relative inline-block">
        {/* Web Line - appears on hover */}
        {isHovering && (
          <motion.svg
            className="absolute left-1/2 right-1/2 top-0 pointer-events-none"
            width="3"
            height="60"
            viewBox="0 0 3 60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              transform: "translateX(-1.5px) translateY(-60px)",
            }}
          >
            <line x1="1.5" y1="0" x2="1.5" y2="60" stroke="#EC1C24" strokeWidth="2" />
          </motion.svg>
        )}

        <motion.button
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={
            isHovering
              ? {
                rotate: [0, -8, 8, -8, 8, -4, 4, -2, 0],
                transformOrigin: "center top",
              }
              : { scale: 1.08, boxShadow: "0 0 30px rgba(236, 28, 36, 0.8)" }
          }
          transition={
            isHovering
              ? {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
              : {
                duration: 0.3,
              }
          }
          whileTap={{ scale: 0.92 }}
          className={`px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 relative overflow-visible group text-base md:text-lg border-2 ${variant === "primary"
            ? "bg-gradient-to-r from-[#EC1C24] to-red-700 hover:from-red-700 hover:to-red-900 text-white shadow-lg shadow-red-600/60 border-red-800 hover:border-red-900"
            : "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white shadow-lg shadow-blue-700/60 border-blue-900 hover:border-blue-950"
            }`}
        >
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25 transition-opacity duration-300" />
          <span className="absolute inset-0 border-2 border-yellow-300 opacity-0 group-hover:opacity-30 rounded-full transition-opacity" />
          <span className="relative z-10 flex items-center gap-2 font-black">
            {IconComponent && <IconComponent className="w-5 h-5" />}
            {children}
          </span>
        </motion.button>
      </div>
    </Link>
  );
};

export function HeroSection() {
  const [isMounted, setIsMounted] = React.useState(false);
  const { isLoading, isError, data } = useEventQuery({});
  const { data: activeRecruitmentData } = useGetActiveRecruitmentFormQuery({});

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get events safely
  const eventsArray: any[] = data?.events ?? [];
  // Check for upcoming events with is_upcoming flag
  const upcomingEvent = eventsArray.find((event) => event.is_upcoming === true);
  // Fallback to registration_open if no is_upcoming event found
  const registrationOpenEvent = eventsArray.find((event) => event.registration_open === true && !upcomingEvent);

  // Get active recruitment form
  const activeRecruitmentForm = activeRecruitmentData?.form;

  return (
    <div className="min-h-[40rem] h-screen w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden border">
      {/* Case 1: Upcoming Event with Banner */}
      {isMounted && upcomingEvent ? (
        <div className="relative w-full h-full">
          {/* Event Banner Background */}
          {upcomingEvent.eventBanner?.url && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={upcomingEvent.eventBanner.url}
                alt={upcomingEvent.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          )}

          {/* Event Content Overlay */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
            <div className="max-w-3xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {upcomingEvent.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6">
                {upcomingEvent.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <div className="text-white">
                  <p className="font-semibold">📅 {upcomingEvent.eventDate}</p>
                  <p className="font-semibold">🕐 {upcomingEvent.eventTime}</p>
                  <p className="font-semibold">📍 {upcomingEvent.venue}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`/events/${upcomingEvent._id}`}>
                  <PrimaryButton>Register Now</PrimaryButton>
                </Link>
                <Link href="/events">
                  <button className="px-8 py-2 rounded-full relative gradient-card text-white text-sm hover:shadow-2xl transition duration-200 border border-white/20">
                    <span className="relative z-20 font-medium">View All Events</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Default/Fallback View with Spider-Man Theme */
        <>
          {/* Spider Web Background Animations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <SpiderWebAnimation />
          </div>

          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          <div className="max-container relative z-10 w-full pt-24 max-sm:pt-32">
            <h1 className="text-2xl md:text-5xl font-bold text-center white-gradient-text bg-opacity-50">
              <span className="white-gradient-text font-bold">
                Step into the World of Possibilities <br />
              </span>
              <span>
                <span className="from-red-400 to-red-600 bg-gradient-to-b bg-clip-text text-transparent">Grow,</span>{" "}
                <span className="from-blue-400 to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">Connect</span>{" "}
                <span className="from-green-400 to-green-600 bg-gradient-to-b bg-clip-text text-transparent">and</span>{" "}
                <span className="from-yellow-400 to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">Lead </span>{" "}
                <span className="white-gradient-text font-bold">with GDG HIT!</span>
              </span>
            </h1>

            <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed text-center mx-auto my-3">
              Join a vibrant community of developers, innovators, and tech enthusiasts. Experience the power of Google Developer technologies and shape the future of technology.
            </p>

            <div className="w-full flex items-start justify-center flex-wrap gap-5 mt-6">
              {isMounted && (
                <>
                  {registrationOpenEvent ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RegisterNowButton eventId={registrationOpenEvent._id} />
                    </motion.div>
                  ) : (
                    <SpidermanButton href="/events" variant="primary" icon={Film}>
                      SWING INTO ACTION
                    </SpidermanButton>
                  )}

                  <SpidermanButton href="/about-us" variant="secondary" icon={BookOpen}>
                    DISCOVER YOUR POWER
                  </SpidermanButton>
                </>
              )}
            </div>

            {/* Recruitment Form CTA - Only shown if no upcoming event */}
            {activeRecruitmentForm && (
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-700 dark:text-gray-300 text-xl font-semibold flex items-center justify-center gap-2">
                  <Globe2 className="w-6 h-6" style={{ color: "#EC1C24" }} />
                  <span className="font-black">WITH GREAT OPPORTUNITY COMES GREAT RESPONSIBILITY!</span>
                </p>
                <div className="flex justify-center items-center mt-5">
                  <SpidermanButton
                    href={`/recruitment/form?formId=${activeRecruitmentForm._id}`}
                    variant="primary"
                    icon={Zap}
                  >
                    CHOOSE YOUR DESTINY
                  </SpidermanButton>
                </div>
              </motion.div>
            )}

            <InfiniteMovingCardImg
              items={testimonials}
              direction="right"
              speed="slow"
              className="mt-10"
            />
          </div>
        </>
      )}
    </div>
  );
}

const testimonials = [
  { image: "/img/group-img1.jpeg" },
  { image: "/img/sliders/1.jpg" },
  { image: "/img/sliders/2.jpg" },
  { image: "/img/sliders/3.jpg" },
  { image: "/img/sliders/4.jpg" },
  { image: "/img/sliders/5.jpg" },
];

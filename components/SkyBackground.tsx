"use client";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface Cloud {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const Cloud = memo(({ cloud }: { cloud: Cloud }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${cloud.x}%`,
      top: `${cloud.y}%`,
      width: `${cloud.size}px`,
      height: `${cloud.size * 0.6}px`,
      background: `radial-gradient(ellipse at center, rgba(255,255,255,${cloud.opacity}) 0%, rgba(255,255,255,0) 70%)`,
      filter: 'blur(20px)',
    }}
    animate={{
      x: [0, 100, 0],
      opacity: [cloud.opacity * 0.6, cloud.opacity, cloud.opacity * 0.6],
    }}
    transition={{
      duration: cloud.duration,
      delay: cloud.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
));

Cloud.displayName = 'Cloud';

export default function SkyBackground() {
  const clouds = useMemo(() => {
    const newClouds: Cloud[] = [];
    for (let i = 0; i < 12; i++) {
      newClouds.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50 + 10,
        size: Math.random() * 200 + 100,
        duration: Math.random() * 20 + 30,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }
    return newClouds;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient sky background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #e0f4ff 0%,
            #b3e5ff 20%,
            #81d4ff 40%,
            #6ac0ff 60%,
            #87ceeb 80%,
            #b0e0e6 100%)`,
        }}
      />

      {/* Animated clouds */}
      {clouds.map((cloud) => (
        <Cloud key={cloud.id} cloud={cloud} />
      ))}

      {/* Soft light glow from top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/3"
        style={{
          background: `radial-gradient(ellipse at center top, rgba(255,255,255,0.3) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle sun glow */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(255, 200, 87, 0.15) 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Far away mountains/hills silhouette */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        height="200"
        viewBox="0 0 1440 200"
        style={{ opacity: 0.08 }}
      >
        <defs>
          <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7fbfe8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5a9fd4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q180,50 360,100 T720,100 T1080,100 T1440,100 L1440,200 L0,200 Z"
          fill="url(#hillGradient)"
        />
        <path
          d="M0,120 Q200,70 400,120 T800,120 T1200,120 T1440,120 L1440,200 L0,200 Z"
          fill="#6ba3d9"
          opacity="0.1"
        />
      </svg>
    </div>
  );
}

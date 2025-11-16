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
  type: 'small' | 'medium' | 'large';
}

const CloudSVG = memo(({ cloud }: { cloud: Cloud }) => {
  const getCloudPath = (type: string) => {
    switch(type) {
      case 'small':
        return "M10,15 Q15,5 20,15 Q25,10 30,15 Q28,20 20,22 Q12,22 10,15";
      case 'medium':
        return "M15,20 Q25,5 35,20 Q45,12 55,20 Q52,28 40,30 Q25,30 15,20";
      case 'large':
        return "M20,25 Q35,8 50,25 Q65,15 80,25 Q78,35 60,38 Q35,38 20,25";
      default:
        return "M10,15 Q15,5 20,15 Q25,10 30,15 Q28,20 20,22 Q12,22 10,15";
    }
  };

  const getSizeMultiplier = (type: string) => {
    switch(type) {
      case 'small': return 1;
      case 'medium': return 1.5;
      case 'large': return 2;
      default: return 1;
    }
  };

  const multiplier = getSizeMultiplier(cloud.type);

  return (
    <motion.svg
      className="absolute"
      style={{
        left: `${cloud.x}%`,
        top: `${cloud.y}%`,
        width: `${cloud.size * multiplier}px`,
        height: `${cloud.size * multiplier * 0.6}px`,
      }}
      viewBox="0 0 100 40"
      animate={{
        x: [0, 150, 0],
        opacity: [cloud.opacity * 0.4, cloud.opacity, cloud.opacity * 0.4],
      }}
      transition={{
        duration: cloud.duration,
        delay: cloud.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Multiple layers for depth and realism */}
      <path
        d={getCloudPath(cloud.type)}
        fill={`rgba(255, 255, 255, ${cloud.opacity * 0.9})`}
        filter="blur(0.5px)"
      />
      <path
        d={getCloudPath(cloud.type)}
        fill={`rgba(255, 255, 255, ${cloud.opacity * 0.6})`}
        transform="translate(2, 2)"
        filter="blur(1px)"
      />
      <path
        d={getCloudPath(cloud.type)}
        fill={`rgba(255, 255, 255, ${cloud.opacity * 0.3})`}
        transform="translate(-2, -2)"
        filter="blur(1.5px)"
      />
    </motion.svg>
  );
});

CloudSVG.displayName = 'CloudSVG';

export default function SkyBackground() {
  const clouds = useMemo(() => {
    const newClouds: Cloud[] = [];
    
    // Create small clouds (high altitude)
    for (let i = 0; i < 8; i++) {
      newClouds.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 25 + 5,
        size: 60 + Math.random() * 40,
        duration: Math.random() * 40 + 60,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.2 + 0.1,
        type: 'small',
      });
    }

    // Create medium clouds (mid altitude)
    for (let i = 0; i < 6; i++) {
      newClouds.push({
        id: i + 100,
        x: Math.random() * 100,
        y: Math.random() * 20 + 25,
        size: 80 + Math.random() * 60,
        duration: Math.random() * 35 + 50,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.25 + 0.15,
        type: 'medium',
      });
    }

    // Create large clouds (low altitude, more visible)
    for (let i = 0; i < 5; i++) {
      newClouds.push({
        id: i + 200,
        x: Math.random() * 100,
        y: Math.random() * 20 + 45,
        size: 100 + Math.random() * 80,
        duration: Math.random() * 30 + 40,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.35 + 0.25,
        type: 'large',
      });
    }

    return newClouds;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient sky background - more refined */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #f0faff 0%,
            #e0f4ff 15%,
            #c8ecff 30%,
            #a8e0ff 50%,
            #87d4f5 70%,
            #70c9f0 85%,
            #a0d8e8 100%)`,
        }}
      />

      {/* Animated clouds layers */}
      {clouds.map((cloud) => (
        <CloudSVG key={cloud.id} cloud={cloud} />
      ))}

      {/* Soft light glow from top - more pronounced */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2/5"
        style={{
          background: `radial-gradient(ellipse 800px 300px at center top, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 250, 240, 0.2) 30%,
            transparent 70%)`,
          pointerEvents: 'none',
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Realistic sun glow */}
      <motion.div
        className="absolute top-32 right-1/4 rounded-full"
        style={{
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, 
            rgba(255, 220, 100, 0.25) 0%, 
            rgba(255, 180, 60, 0.12) 30%,
            rgba(255, 160, 40, 0.05) 60%,
            transparent 100%)`,
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary sun glow (inner) */}
      <motion.div
        className="absolute top-40 right-1/4 rounded-full"
        style={{
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, 
            rgba(255, 200, 80, 0.3) 0%, 
            transparent 70%)`,
          filter: 'blur(30px)',
        }}
        animate={{
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle horizon line with gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%,
            rgba(135, 206, 235, 0.05) 40%,
            rgba(100, 180, 200, 0.1) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Far away mountains/hills silhouette - more detailed */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        height="250"
        viewBox="0 0 1440 250"
        style={{ opacity: 0.06 }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7fbfe8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5a9fd4" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6ba3d9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4a7fb8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Main mountain range */}
        <path
          d="M0,150 Q180,80 360,150 T720,150 T1080,150 T1440,150 L1440,250 L0,250 Z"
          fill="url(#hillGradient1)"
        />
        {/* Secondary mountain range */}
        <path
          d="M0,170 Q200,100 400,170 T800,170 T1200,170 T1440,170 L1440,250 L0,250 Z"
          fill="url(#hillGradient2)"
        />
        {/* Distant hills */}
        <path
          d="M0,190 Q220,140 440,190 T880,190 T1320,190 T1440,190 L1440,250 L0,250 Z"
          fill="#5a8fc9"
          opacity="0.1"
        />
      </svg>

      {/* Atmospheric perspective - adds depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center bottom, 
            rgba(200, 220, 240, 0.1) 0%,
            transparent 60%)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
}

export default function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);
    
    // Generate static stars
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2,
        });
      }
      setStars(newStars);
    };

    // Generate shooting stars
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = [];
      for (let i = 0; i < 5; i++) {
        newShootingStars.push({
          id: i,
          startX: Math.random() * 100,
          startY: Math.random() * 30,
          endX: Math.random() * 100,
          endY: Math.random() * 30 + 70,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 5,
        });
      }
      setShootingStars(newShootingStars);
    };

    generateStars();
    generateShootingStars();

    // Regenerate shooting stars periodically
    const interval = setInterval(() => {
      generateShootingStars();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDark 
          ? 'bg-gradient-to-b from-gray-900 via-blue-900 to-black opacity-90' 
          : 'bg-gradient-to-b from-blue-50 via-indigo-100 to-blue-200 opacity-70'
      }`} />
      
      {/* Nebula Effect */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-20'}`}>
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
          isDark ? 'bg-purple-500 opacity-20' : 'bg-purple-300 opacity-30'
        }`} />
        <div className={`absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-1000 ${
          isDark ? 'bg-blue-500 opacity-15' : 'bg-blue-300 opacity-25'
        }`} />
        <div className={`absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full blur-3xl transition-all duration-1000 ${
          isDark ? 'bg-indigo-500 opacity-25' : 'bg-indigo-300 opacity-35'
        }`} />
      </div>

      {/* Static Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className={`absolute rounded-full transition-colors duration-1000 ${
            isDark ? 'bg-white' : 'bg-gray-700'
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((shootingStar) => (
        <motion.div
          key={`shooting-${shootingStar.id}`}
          className="absolute"
          style={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
          }}
          animate={{
            x: `${(shootingStar.endX - shootingStar.startX) * 10}px`,
            y: `${(shootingStar.endY - shootingStar.startY) * 10}px`,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: shootingStar.duration,
            repeat: Infinity,
            repeatDelay: 6,
            delay: shootingStar.delay,
            ease: "easeOut",
          }}
        >
          {/* Shooting star trail */}
          <div className={`w-px h-8 transform rotate-45 origin-top transition-all duration-1000 ${
            isDark 
              ? 'bg-gradient-to-b from-transparent via-white to-transparent' 
              : 'bg-gradient-to-b from-transparent via-gray-600 to-transparent'
          }`} />
          <div className={`absolute top-0 w-2 h-2 rounded-full blur-sm transition-colors duration-1000 ${
            isDark ? 'bg-white' : 'bg-gray-600'
          }`} />
        </motion.div>
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute w-1 h-1 rounded-full opacity-60 transition-colors duration-1000 ${
            isDark ? 'bg-cyan-400' : 'bg-blue-500'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            x: [-10, 10],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}

      {/* Distant Galaxies */}
      <motion.div
        className={`absolute top-1/3 right-1/5 w-4 h-4 rounded-full blur-sm transition-all duration-1000 ${
          isDark 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 opacity-40' 
            : 'bg-gradient-to-r from-purple-300 to-pink-300 opacity-60'
        }`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: isDark ? [0.4, 0.6, 0.4] : [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className={`absolute bottom-1/3 left-1/6 w-3 h-3 rounded-full blur-sm transition-all duration-1000 ${
          isDark 
            ? 'bg-gradient-to-r from-blue-400 to-cyan-400 opacity-50' 
            : 'bg-gradient-to-r from-blue-300 to-cyan-300 opacity-70'
        }`}
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: isDark ? [0.5, 0.3, 0.5] : [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
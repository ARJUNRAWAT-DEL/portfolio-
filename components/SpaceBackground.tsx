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

interface SpaceObject {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  type: 'rocket' | 'spaceship' | 'asteroid' | 'satellite';
}

export default function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
    
    // Generate static stars
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 4 + 2,
          delay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    // Generate shooting stars
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = [];
      for (let i = 0; i < 8; i++) {
        newShootingStars.push({
          id: i,
          startX: Math.random() * 100,
          startY: Math.random() * 30,
          endX: Math.random() * 100,
          endY: Math.random() * 30 + 70,
          duration: Math.random() * 3 + 1,
          delay: Math.random() * 6,
        });
      }
      setShootingStars(newShootingStars);
    };

    // Generate space objects (rockets, spaceships, etc.)
    const generateSpaceObjects = () => {
      const objects: SpaceObject[] = [];
      const types: SpaceObject['type'][] = ['rocket', 'spaceship', 'asteroid', 'satellite'];
      
      for (let i = 0; i < 8; i++) {
        objects.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 8,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      setSpaceObjects(objects);
    };

    generateStars();
    generateShootingStars();
    generateSpaceObjects();

    // Regenerate shooting stars periodically
    const shootingInterval = setInterval(() => {
      generateShootingStars();
    }, 8000);

    // Regenerate space objects less frequently
    const objectsInterval = setInterval(() => {
      generateSpaceObjects();
    }, 20000);

    return () => {
      clearInterval(shootingInterval);
      clearInterval(objectsInterval);
    };
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || !isClient) {
    return null;
  }

  const isDark = theme === 'dark';

  // Render space objects
  const renderSpaceObject = (obj: SpaceObject) => {
    const baseClasses = "absolute flex items-center justify-center";
    
    switch (obj.type) {
      case 'rocket':
        return (
          <div className={`${baseClasses} text-3xl transform`}>
            🚀
          </div>
        );
      case 'spaceship':
        return (
          <div className={`${baseClasses} text-2xl transform`}>
            🛸
          </div>
        );
      case 'asteroid':
        return (
          <div className={`${baseClasses} text-2xl transform`}>
            ☄️
          </div>
        );
      case 'satellite':
        return (
          <div className={`${baseClasses} text-2xl transform`}>
            🛰️
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Background - Always Black */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Cosmic Nebula Effects */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-1/6 left-1/5 w-96 h-96 rounded-full blur-3xl bg-purple-600"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/6 w-80 h-80 rounded-full blur-3xl bg-blue-600"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute bottom-1/5 left-1/2 w-64 h-64 rounded-full blur-3xl bg-indigo-600"
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Bright Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white shadow-lg"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced Shooting Stars */}
      {shootingStars.map((shootingStar) => (
        <motion.div
          key={`shooting-${shootingStar.id}`}
          className="absolute"
          style={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
          }}
          animate={{
            x: `${(shootingStar.endX - shootingStar.startX) * 15}px`,
            y: `${(shootingStar.endY - shootingStar.startY) * 15}px`,
            opacity: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: shootingStar.duration,
            repeat: Infinity,
            repeatDelay: 8,
            delay: shootingStar.delay,
            ease: "easeOut",
          }}
        >
          {/* Glowing trail */}
          <div className="relative">
            <div className="w-px h-12 transform rotate-45 origin-top bg-gradient-to-b from-transparent via-white to-transparent shadow-lg" />
            <div className="absolute top-0 w-3 h-3 rounded-full bg-white blur-sm shadow-lg" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }} />
            <div className="absolute top-0 w-1 h-1 rounded-full bg-cyan-400" />
          </div>
        </motion.div>
      ))}

      {/* Animated Space Objects */}
      {spaceObjects.map((obj) => (
        <motion.div
          key={`space-object-${obj.id}`}
          className="absolute z-10"
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
          }}
          animate={{
            x: [0, 100, -50, 150],
            y: [0, -30, 20, -10],
            rotate: obj.type === 'rocket' ? [0, 360] : [0, 180, 360],
            scale: [0.8, 1.2, 0.9, 1.1],
          }}
          transition={{
            duration: obj.duration,
            repeat: Infinity,
            delay: obj.delay,
            ease: "linear",
          }}
        >
          {renderSpaceObject(obj)}
        </motion.div>
      ))}

      {/* Floating Space Particles */}
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-cyan-300 opacity-70 shadow-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 4px rgba(0, 255, 255, 0.6)',
          }}
          animate={{
            y: [-30, -120],
            x: [0, Math.random() * 40 - 20],
            opacity: [0.7, 0.2, 0.7],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        />
      ))}

      {/* Distant Planets */}
      <motion.div
        className="absolute top-1/4 right-1/8 w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-orange-500 opacity-60"
        style={{
          boxShadow: '0 0 20px rgba(255, 69, 0, 0.4)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/12 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-70"
        style={{
          boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
        }}
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Saturn-like Planet with Rings */}
      <motion.div
        className="absolute top-1/2 left-1/6 opacity-50"
        animate={{
          rotate: [0, 360],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400" style={{ boxShadow: '0 0 25px rgba(251, 191, 36, 0.3)' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 border border-yellow-300 rounded-full opacity-60" />
        </div>
      </motion.div>

      {/* Cosmic Dust Clouds */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          x: [-100, 100],
          opacity: [0.1, 0.05, 0.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent blur-3xl" />
      </motion.div>

      {/* Space Station */}
      <motion.div
        className="absolute top-1/3 right-1/4 text-xl opacity-70"
        animate={{
          y: [-5, 5],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🏗️
      </motion.div>

      {/* Flying Comets */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`comet-${i}`}
          className="absolute text-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 200, -100],
            y: [0, -50, 100],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: Math.random() * 12 + 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          ☄️
        </motion.div>
      ))}
    </div>
  );
}
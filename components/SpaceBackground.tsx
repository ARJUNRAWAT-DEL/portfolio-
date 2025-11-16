"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { memo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const Star = memo(({ star }: { star: Star }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      width: `${star.size}px`,
      height: `${star.size}px`,
      left: `${star.x}%`,
      top: `${star.y}%`,
      willChange: 'opacity',
    }}
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{
      duration: star.duration,
      delay: star.delay,
      repeat: Infinity,
    }}
  />
));

Star.displayName = 'Star';

const StaticStarField = memo(function StaticStarField() {
  // Use CSS for static stars instead of React animations
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(1px 1px at 10px 20px, white, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
          radial-gradient(2px 2px at 50px 50px, white, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
          radial-gradient(2px 2px at 90px 10px, white, rgba(0,0,0,0))
        `,
        backgroundSize: '200px 200px',
        backgroundPosition: '0 0',
      }}
    />
  );
});

StaticStarField.displayName = 'StaticStarField';

export default function SpaceBackground() {
  const animatedStars = useMemo(() => {
    // Reduced animated stars from 150 to 15 for performance
    const newStars: Star[] = [];
    for (let i = 0; i < 15; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      });
    }
    return newStars;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      {/* Static star field using CSS for better performance */}
      <StaticStarField />
      
      {/* Minimal animated accent stars */}
      {animatedStars.map((star) => (
        <Star key={star.id} star={star} />
      ))}

      {/* Subtle glow accents */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl bg-blue-600 opacity-10"
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl bg-purple-600 opacity-10"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.15, 0.1, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
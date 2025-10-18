'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = [
        'from-cyan-400 to-blue-500',
        'from-purple-400 to-pink-500',
        'from-green-400 to-teal-500',
        'from-yellow-400 to-orange-500',
        'from-indigo-400 to-purple-500'
      ];

      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
          direction: Math.random() * Math.PI * 2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', generateParticles);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-r ${particle.color} opacity-30`}
          style={{
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [
              particle.x,
              particle.x + Math.cos(particle.direction) * 100,
              particle.x + Math.cos(particle.direction + Math.PI) * 100,
              particle.x
            ],
            y: [
              particle.y,
              particle.y + Math.sin(particle.direction) * 100,
              particle.y + Math.sin(particle.direction + Math.PI) * 100,
              particle.y
            ],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Mouse follower particles */}
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
      <motion.div
        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-60"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          delay: 0.1
        }}
      />
    </div>
  );
}
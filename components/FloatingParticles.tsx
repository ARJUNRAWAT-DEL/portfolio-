'use client';

import { motion } from 'framer-motion';
import { useMemo, memo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
}

const ParticleItem = memo(({ particle }: { particle: Particle }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-r ${particle.color} opacity-20`}
    style={{
      width: particle.size,
      height: particle.size,
      willChange: 'transform',
      left: `${particle.x}%`,
      top: `${particle.y}%`,
    }}
    animate={{
      x: [0, Math.cos(particle.direction) * 80, Math.cos(particle.direction + Math.PI) * 80, 0],
      y: [0, Math.sin(particle.direction) * 80, Math.sin(particle.direction + Math.PI) * 80, 0]
    }}
    transition={{
      duration: particle.speed * 3,
      repeat: Infinity,
      ease: 'linear'
    }}
  />
));

ParticleItem.displayName = 'ParticleItem';

export default function FloatingParticles() {
  const particles = useMemo(() => {
    const newParticles: Particle[] = [];
    const colors = [
      'from-cyan-400 to-blue-500',
      'from-purple-400 to-pink-500',
      'from-green-400 to-teal-500',
      'from-yellow-400 to-orange-500',
      'from-indigo-400 to-purple-500'
    ];

    // Reduced from 50 to 25 particles for better performance
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 1.5 + 0.5,
        direction: Math.random() * Math.PI * 2
      });
    }
    return newParticles;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <ParticleItem key={particle.id} particle={particle} />
      ))}
    </div>
  );
}
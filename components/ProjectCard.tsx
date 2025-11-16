"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { JapaneseColors, JapaneseShadows } from "../lib/japaneseColors";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  emoji: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  link,
  emoji,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Alternate Japanese colors for visual interest
  const colorScheme = {
    primary: JapaneseColors.sakuraPink,
    secondary: JapaneseColors.gold,
    accent: JapaneseColors.matchaGreen,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ 
        scale: 1.03,
        y: -15,
        rotateX: 5,
        rotateY: 2,
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group p-6 bg-white/95 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl border border-white/30 dark:border-gray-700/30 transition-all duration-500 relative overflow-hidden cursor-pointer"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px",
        boxShadow: isHovered ? JapaneseShadows.elevated : JapaneseShadows.soft,
      }}
    >
      {/* Animated background glow with Japanese colors */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        animate={{
          background: isHovered 
            ? [
                `radial-gradient(circle at 20% 50%, ${colorScheme.primary} 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 50%, ${colorScheme.secondary} 0%, transparent 50%)`,
                `radial-gradient(circle at 50% 20%, ${colorScheme.accent} 0%, transparent 50%)`,
                `radial-gradient(circle at 20% 50%, ${colorScheme.primary} 0%, transparent 50%)`
              ]
            : []
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Project emoji/icon with subtle animations */}
      <motion.div
        className="text-5xl mb-4 relative"
        animate={{
          rotate: isHovered ? [0, 8] : 0,
          scale: isHovered ? [1, 1.15] : 1,
          y: isHovered ? [0, -5] : 0
        }}
        transition={{ 
          duration: 0.8,
          type: "tween",
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20"
          style={{ backgroundColor: colorScheme.primary }}
          animate={{
            scale: isHovered ? [1, 1.4] : 1
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <span className="relative z-10">{emoji}</span>
      </motion.div>

      {/* Title with Japanese gradient */}
      <motion.h2
        className="text-2xl font-bold mb-3 relative"
        whileHover={{ scale: 1.02 }}
      >
        <motion.span
          className="bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary}, ${colorScheme.accent})`,
            backgroundSize: "200% auto"
          }}
          animate={{
            backgroundPosition: isHovered ? ["0%", "100%", "0%"] : ["0%"]
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
        >
          {title}
        </motion.span>
        
        {isHovered && (
          <motion.div
            className="absolute -inset-2 blur-lg -z-10"
            style={{
              backgroundColor: `${colorScheme.primary}10`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
        animate={{
          color: isHovered ? (typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? "#e5e7eb" : "#1f2937") : (typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? "#d1d5db" : "#4b5563")
        }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>

      {/* Tech stack with Japanese styling */}
      <motion.div 
        className="flex flex-wrap gap-2 mb-6"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {tech.map((techItem, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 }
            }}
            whileHover={{ 
              scale: 1.1,
              y: -2,
            }}
            className="px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 cursor-pointer font-medium"
            style={{
              backgroundColor: `${colorScheme.primary}15`,
              color: colorScheme.primary,
              borderColor: `${colorScheme.primary}40`,
              boxShadow: JapaneseShadows.subtle,
            }}
          >
            {techItem}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA Button with Japanese aesthetic */}
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ 
          scale: 1.05,
          boxShadow: JapaneseShadows.elevated,
        }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-white font-semibold transition-all duration-300 relative overflow-hidden group"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
          boxShadow: JapaneseShadows.medium,
        }}
      >
        {/* Button shine effect */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)"
          }}
          animate={{
            x: isHovered ? ["-100%", "100%"] : ["-100%"]
          }}
          transition={{
            duration: 0.8,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1
          }}
        />
        
        <span className="relative z-10">View Project</span>
        
        <motion.span
          className="relative z-10"
          animate={{ 
            x: isHovered ? [0, 5, 0] : [0],
            rotate: isHovered ? [0, 8, 0] : [0]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: isHovered ? Infinity : 0 
          }}
        >
          →
        </motion.span>
      </motion.a>

      {/* Corner accent decoration */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24"
        style={{
          clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)",
          backgroundColor: `${colorScheme.primary}10`,
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0.05,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Bottom edge glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, ${colorScheme.primary}50, ${colorScheme.secondary}50, ${colorScheme.accent}50)`,
        }}
        animate={{
          scaleX: isHovered ? [0, 1] : [0]
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import { useState } from "react";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ 
        scale: 1.03,
        y: -15,
        rotateX: 5,
        rotateY: 2,
        boxShadow: "0 25px 50px rgba(99, 102, 241, 0.2), 0 0 50px rgba(139, 92, 246, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group p-6 bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden cursor-pointer"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        animate={{
          background: isHovered 
            ? [
                "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, rgba(236,72,153,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)"
              ]
            : []
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Floating particles effect */}
      {isHovered && [1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
          initial={{ 
            x: Math.random() * 300, 
            y: Math.random() * 200,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: [
              Math.random() * 300,
              Math.random() * 300,
              Math.random() * 300
            ],
            y: [
              Math.random() * 200,
              Math.random() * 200,
              Math.random() * 200
            ],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Project emoji/icon with advanced animations */}
      <motion.div
        className="text-5xl mb-4 relative"
        animate={{
          rotate: isHovered ? [0, 10] : 0,
          scale: isHovered ? [1, 1.2] : 1,
          y: isHovered ? [0, -5] : 0
        }}
        transition={{ 
          duration: 1,
          type: "tween",
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100"
          animate={{
            scale: isHovered ? [1, 1.5] : 1
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <span className="relative z-10">{emoji}</span>
      </motion.div>

      {/* Title with enhanced effects */}
      <motion.h2
        className="text-2xl font-bold mb-3 relative"
        whileHover={{ scale: 1.02 }}
      >
        <motion.span
          className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: isHovered ? ["0%", "100%", "0%"] : ["0%"]
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% auto"
          }}
        >
          {title}
        </motion.span>
        
        {isHovered && (
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10 blur-lg -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}
      </motion.h2>

      {/* Description with typewriter effect */}
      <motion.p
        className="text-gray-300 mb-4 leading-relaxed"
        animate={{
          color: isHovered ? "#e5e7eb" : "#d1d5db"
        }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>

      {/* Enhanced Tech stack */}
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
              backgroundColor: "rgba(99, 102, 241, 0.3)",
              borderColor: "rgba(99, 102, 241, 0.6)",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)"
            }}
            className="px-3 py-1 text-xs bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 rounded-full border border-indigo-500/30 backdrop-blur-sm transition-all duration-200 cursor-pointer"
          >
            {techItem}
          </motion.span>
        ))}
      </motion.div>

      {/* Enhanced CTA Button */}
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg relative overflow-hidden group"
      >
        {/* Button shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: isHovered ? ["-100%", "100%"] : ["-100%"]
          }}
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1
          }}
        />
        
        <span className="relative z-10">View Project</span>
        
        <motion.span
          className="relative z-10"
          animate={{ 
            x: isHovered ? [0, 5, 0] : [0],
            rotate: isHovered ? [0, 10, 0] : [0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: isHovered ? Infinity : 0 
          }}
        >
          →
        </motion.span>
      </motion.a>

      {/* Corner accent decoration */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent"
        style={{
          clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)"
        }}
        animate={{
          opacity: isHovered ? 0.4 : 0.1,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Bottom edge glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100"
        animate={{
          scaleX: isHovered ? [0, 1] : [0]
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}

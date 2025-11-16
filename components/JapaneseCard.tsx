"use client";
import { motion } from "framer-motion";

interface JapaneseCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Japanese Aesthetic Card Component
 * Features: Neumorphic design, subtle shadows, minimalist approach
 */
export default function JapaneseCard({
  children,
  className = "",
  delay = 0,
}: JapaneseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`
        relative backdrop-blur-sm
        bg-white/40 dark:bg-black/20
        border border-white/20 dark:border-white/5
        rounded-2xl p-6 sm:p-8
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        overflow-hidden group
        ${className}
      `}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 transition-opacity duration-300" />

      {/* Japanese pattern accent - top left */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-rose-200/20 dark:from-rose-900/20 to-transparent rounded-full blur-2xl" />

      {/* Japanese pattern accent - bottom right */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-sky-200/20 dark:from-sky-900/20 to-transparent rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { JapaneseColors, JapaneseShadows, JapaneseGradients } from "../lib/japaneseColors";

interface SkillCardProps {
  name: string;
  level: number;
  color: string;
  index: number;
}

export default function SkillCard({ name, level, color, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Japanese aesthetic color mapping - rotate between sakura, matcha, and gold
  const japaneseColorMap: Record<string, { from: string; to: string; accent: string }> = {
    "from-blue-500 to-cyan-500": { from: JapaneseColors.sakuraPink, to: JapaneseColors.gold, accent: JapaneseColors.sakuraPink },
    "from-green-500 to-emerald-500": { from: JapaneseColors.matchaGreen, to: JapaneseColors.creamWhite, accent: JapaneseColors.matchaGreen },
    "from-purple-500 to-pink-500": { from: JapaneseColors.sakuraPink, to: JapaneseColors.matchaGreen, accent: JapaneseColors.gold },
    "from-blue-600 to-indigo-600": { from: JapaneseColors.midnightBlue, to: JapaneseColors.sakuraPink, accent: JapaneseColors.midnightBlue },
    "from-yellow-500 to-orange-500": { from: JapaneseColors.gold, to: JapaneseColors.sakuraPink, accent: JapaneseColors.gold },
    "from-green-600 to-teal-600": { from: JapaneseColors.matchaGreen, to: JapaneseColors.midnightBlue, accent: JapaneseColors.matchaGreen },
  };

  const gradientColors = japaneseColorMap[color] || { 
    from: JapaneseColors.sakuraPink, 
    to: JapaneseColors.gold, 
    accent: JapaneseColors.sakuraPink 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      {/* Glowing background with Japanese aesthetic */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-15"
        style={{
          background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
        }}
      />

      {/* Main card with neumorphic shadow */}
      <div 
        className="relative bg-white/95 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-white/40 dark:border-gray-700/30 transition-all duration-300 overflow-hidden"
        style={{
          boxShadow: isHovered ? JapaneseShadows.elevated : JapaneseShadows.soft,
        }}
      >
        {/* Animated top border with Japanese gradient */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            backgroundImage: `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to}, transparent)`,
            originX: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Skill name with Japanese gradient */}
        <motion.h3
          className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`,
          }}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
        >
          {name}
        </motion.h3>

        {/* Progress bar container */}
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Proficiency</span>
            <motion.span
              className="text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`,
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
            >
              {level}%
            </motion.span>
          </div>

          {/* Progress bar with neumorphic styling */}
          <div 
            className="w-full h-2.5 bg-gray-200/50 dark:bg-gray-700/30 rounded-full overflow-hidden"
            style={{
              boxShadow: JapaneseShadows.inset,
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
        </div>

        {/* Bottom shimmer effect with Japanese aesthetic */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-70"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${gradientColors.to}, ${gradientColors.from})`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

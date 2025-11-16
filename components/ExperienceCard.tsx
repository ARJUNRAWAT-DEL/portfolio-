"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { JapaneseColors, JapaneseShadows } from "../lib/japaneseColors";

interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  details: string[];
  technologies: string[];
  emoji: string;
  index: number;
}

export default function ExperienceCard({
  role,
  company,
  period,
  details,
  technologies,
  emoji,
  index,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Rotate Japanese colors for visual variety
  const jpColors = [
    { primary: JapaneseColors.sakuraPink, accent: JapaneseColors.gold },
    { primary: JapaneseColors.matchaGreen, accent: JapaneseColors.sakuraPink },
    { primary: JapaneseColors.midnightBlue, accent: JapaneseColors.matchaGreen },
    { primary: JapaneseColors.gold, accent: JapaneseColors.midnightBlue },
  ];

  const cardColor = jpColors[index % jpColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Timeline dot with Japanese aesthetic */}
      <motion.div
        className="absolute -left-8 top-6 w-4 h-4 rounded-full shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${cardColor.primary}, ${cardColor.accent})`,
          boxShadow: JapaneseShadows.elevated,
        }}
        whileHover={{ scale: 1.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full opacity-60"
          style={{ backgroundColor: cardColor.primary }}
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Card with neumorphic shadow */}
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white/90 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 transition-all duration-300 cursor-pointer group overflow-hidden relative"
        style={{
          boxShadow: isExpanded ? JapaneseShadows.medium : JapaneseShadows.soft,
        }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${cardColor.primary}, ${cardColor.accent})`,
          }}
          animate={{
            backgroundPosition: ["0%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <motion.div
                className="text-4xl"
                animate={{
                  rotate: isExpanded ? 10 : 0,
                  scale: isExpanded ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {emoji}
              </motion.div>

              <div className="flex-1">
                <motion.h3
                  className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-1"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${cardColor.primary}, ${cardColor.accent})`,
                  }}
                  animate={{
                    scale: isExpanded ? 1.05 : 1,
                  }}
                >
                  {role}
                </motion.h3>
                <p className="text-sm text-gray-700 dark:text-gray-400 font-medium">{company}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{period}</p>
              </div>
            </div>

            <motion.div
              animate={{
                rotate: isExpanded ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown
                size={20}
                style={{ color: cardColor.primary }}
              />
            </motion.div>
          </div>

          {/* Expandable content */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700/50">
              {/* Details */}
              <div className="space-y-2">
                {details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span style={{ color: cardColor.primary }} className="mt-1">•</span>
                    <span>{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Technologies */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700/50">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{
                        scale: 1.1,
                      }}
                      className="px-2.5 py-1.5 text-xs rounded-lg border transition-all font-medium"
                      style={{
                        backgroundColor: `${cardColor.primary}15`,
                        color: cardColor.primary,
                        borderColor: `${cardColor.primary}40`,
                        boxShadow: JapaneseShadows.subtle,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

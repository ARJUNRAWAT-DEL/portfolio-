"use client";
import { motion } from "framer-motion";
import { JapaneseColors, JapaneseGradients } from "../lib/japaneseColors";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center space-y-4 mb-12"
    >
      {subtitle && (
        <motion.p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: JapaneseColors.sakuraPink }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span 
          className="bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.matchaGreen}, ${JapaneseColors.gold})`,
          }}
        >
          {title}
        </span>
      </motion.h2>

      {description && (
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}

      {/* Decorative line with Japanese aesthetic */}
      <motion.div
        className="w-24 h-1 mx-auto rounded-full"
        style={{
          background: `linear-gradient(90deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.gold}, ${JapaneseColors.matchaGreen})`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import { JapaneseColors, JapaneseGradients } from "../lib/japaneseColors";

interface GradientAccentProps {
  position?: "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg";
  color?: "sakura" | "matcha" | "midnight" | "gold" | "gradient";
}

export default function GradientAccent({
  position = "top",
  size = "md",
  color = "gradient",
}: GradientAccentProps) {
  const sizeClass = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
  };

  const colorClass = {
    sakura: JapaneseColors.sakuraPink,
    matcha: JapaneseColors.matchaGreen,
    midnight: JapaneseColors.midnightBlue,
    gold: JapaneseColors.gold,
    gradient: JapaneseGradients.sakuraToGold,
  };

  const positionClass = {
    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
    right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  };

  return (
    <motion.div
      className={`absolute ${sizeClass[size]} ${positionClass[position]} rounded-full blur-3xl opacity-20 pointer-events-none`}
      style={{
        background: color === "gradient" 
          ? `linear-gradient(135deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.gold})`
          : colorClass[color as keyof typeof colorClass],
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

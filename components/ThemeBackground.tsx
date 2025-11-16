"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SpaceBackground from "./SpaceBackground";
import SkyBackground from "./SkyBackground";

export default function ThemeBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme === "dark" ? (
        <SpaceBackground />
      ) : (
        <SkyBackground />
      )}
    </>
  );
}

"use client";
import { motion } from 'framer-motion';
import { Rocket, Home, User, Briefcase, Code, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';
import { JapaneseColors, JapaneseShadows } from '../lib/japaneseColors';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isMounted]);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: theme === 'dark'
          ? `linear-gradient(180deg, rgba(25, 25, 112, 0.3) 0%, rgba(25, 25, 112, 0.1) 30%, transparent 100%)`
          : `linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 100%)`,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        borderBottom: 'none'
      }}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo - Left side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div 
            className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center"
            style={{ boxShadow: JapaneseShadows.elevated }}
          >
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-lg font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>
              Arjun Rawat
            </h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Data Science Enthusiast</p>
          </div>
        </motion.div>

        {/* Navigation Items - Center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:flex items-center gap-1"
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                  theme === 'dark' 
                    ? 'text-gray-200 hover:text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>

                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600"
                  style={{
                    boxShadow: `0 0 10px ${isActive ? 'rgba(34, 197, 222, 0.5)' : 'transparent'}`
                  }}
                />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Theme Toggle - Right side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>

      {/* Aesthetic bottom gradient line - very subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`h-px bg-gradient-to-r ${
          theme === 'dark'
            ? 'from-transparent via-cyan-500/20 to-transparent'
            : 'from-transparent via-blue-300/30 to-transparent'
        }`}
      />
    </motion.nav>
  );
}

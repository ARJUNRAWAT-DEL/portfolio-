"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Menu, 
  X, 
  Github, 
  Linkedin,
  FileText,
  Code,
  Rocket
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/projects', label: 'Projects', icon: Code },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const socialLinks = [
  { href: 'https://github.com/ARJUNRAWAT-DEL', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rwtarjun/', icon: Linkedin, label: 'LinkedIn' },
  { href: '/resume.pdf', icon: FileText, label: 'Resume' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-gray-900/80 dark:bg-gray-100/10 backdrop-blur-md rounded-xl border border-gray-700/50 dark:border-white/10 text-white dark:text-gray-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={24} />
      </motion.button>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: 0 }}
        className="fixed left-0 top-0 h-full w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700/50 z-40 hidden lg:flex flex-col"
      >
        <SidebarContent pathname={pathname} closeSidebar={() => {}} />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              suppressHydrationWarning={true}
            />
            
            {/* Sidebar */}
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 z-50 lg:hidden flex flex-col"
              suppressHydrationWarning={true}
            >
              <SidebarContent pathname={pathname} closeSidebar={() => setIsOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ pathname, closeSidebar }: { pathname: string; closeSidebar: () => void }) {
  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700/50" suppressHydrationWarning={true}>
        <div className="flex items-center justify-between" suppressHydrationWarning={true}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-3"
            suppressHydrationWarning={true}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center" suppressHydrationWarning={true}>
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div suppressHydrationWarning={true}>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Arjun Rawat</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full Stack Developer</p>
            </div>
          </motion.div>
          
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2" suppressHydrationWarning={true}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`} 
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700/50" suppressHydrationWarning={true}>
        <div className="flex items-center justify-between mb-4" suppressHydrationWarning={true}>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Social Links */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700/50" suppressHydrationWarning={true}>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Connect</p>
        <div className="flex space-x-3" suppressHydrationWarning={true}>
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          © 2024 Arjun Rawat
        </p>
      </div>
    </>
  );
}
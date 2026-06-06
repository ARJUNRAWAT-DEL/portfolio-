"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Download, Menu, X, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { id: 'home',       label: 'Home',       icon: Home },
  { id: 'about',      label: 'About',      icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects',       label: 'Projects',       icon: Code },
  { id: 'certifications', label: 'Credentials',    icon: Award },
  { id: 'contact',        label: 'Contact',        icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted]         = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!isMounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-50px 0px -50px 0px' }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isMounted]);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setMobileOpen(false);
  };

  if (!isMounted) return null;

  const navBg = scrolled
    ? 'rgba(6, 6, 12, 0.97)'
    : 'rgba(6, 6, 12, 0.80)';
  const navBorder = scrolled
    ? 'rgba(124, 58, 237, 0.15)'
    : 'rgba(255,255,255,0.04)';

  return (
    <>
      {/* ── Main bar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
        style={{
          background: navBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${navBorder}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
              AR
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white leading-none">Arjun Rawat</p>
              <p className="text-[10px] text-white/35 mt-0.5">Data Scientist · Software Engineer</p>
            </div>
          </motion.div>

          {/* Desktop nav items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center gap-1"
          >
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? 'text-white' : 'text-white/40 hover:text-white/75'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={13} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-px bg-violet-500"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right side: CV button + mobile hamburger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <a
              href="/Arjun-rawat-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors"
            >
              <Download size={13} />
              Resume
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/05 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-[65px] left-4 right-4 z-40 lg:hidden rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(10, 10, 18, 0.98)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="p-3 flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full text-left ${
                        isActive
                          ? 'bg-violet-600/15 text-white border border-violet-500/20'
                          : 'text-white/45 hover:text-white hover:bg-white/04'
                      }`}
                    >
                      <Icon size={15} className={isActive ? 'text-violet-400' : ''} />
                      {item.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
                      )}
                    </motion.button>
                  );
                })}

                {/* Resume in drawer */}
                <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <a
                    href="/Arjun-rawat-cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

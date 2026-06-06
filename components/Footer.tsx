"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github,   href: "https://github.com/ARJUNRAWAT-DEL",        label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/rwtarjun/",     label: "LinkedIn" },
    { icon: Mail,     href: "mailto:arjunrawat4741@gmail.com",           label: "Email" },
  ];

  const quickLinks = [
    { label: "About",      href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects",   href: "#projects" },
    { label: "Contact",    href: "#contact" },
  ];

  return (
    <footer
      className="relative border-t"
      style={{
        background: 'rgba(8, 8, 15, 0.97)',
        borderColor: 'rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
                AR
              </div>
              <div>
                <p className="font-semibold text-white text-sm leading-none">Arjun Rawat</p>
                <p className="text-xs text-white/35 mt-0.5">Data Science · AI · Engineering</p>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Building intelligent, production-ready systems at the intersection of data and software engineering.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">Navigate</p>
            <div className="space-y-2">
              {quickLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-violet-500" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">Connect</p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  title={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-violet-600/20 border border-white/08 transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-white/30">Vilnius, Lithuania · Open to remote</p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/25"
        >
          <div className="flex items-center gap-1">
            <span>© {currentYear} Arjun Rawat. Built with</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart size={12} className="text-violet-400" fill="currentColor" />
            </motion.div>
            <span>Next.js &amp; Tailwind.</span>
          </div>
          <a href="/Arjun-rawat-cv.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
            Download CV
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

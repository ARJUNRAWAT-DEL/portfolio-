'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight, Download } from 'lucide-react'

const fadeUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
})

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

export default function BentoGrid() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* ── Full-bleed background photo ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/paris-hero.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── Animated color blobs (sit above photo, below text) ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Dark base vignette — keeps left side readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.75) 40%, rgba(8,8,8,0.25) 70%, rgba(8,8,8,0.05) 100%)',
          }}
        />
        {/* Bottom fade so stats strip blends into next section */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 30%)',
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, transparent 20%)',
          }}
        />

        {/* Blob 1 — deep blue */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            right: 100,
            top: -80,
            background: 'radial-gradient(circle, rgba(29,78,216,0.35) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'heroBlob1 14s ease-in-out infinite',
          }}
        />
        {/* Blob 2 — violet */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            left: -80,
            bottom: 60,
            background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'heroBlob2 18s ease-in-out infinite',
          }}
        />
        {/* Blob 3 — teal */}
        <div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            left: '40%',
            top: '35%',
            background: 'radial-gradient(circle, rgba(13,148,136,0.2) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'heroBlob3 20s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Text content — overlaid ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col justify-end min-h-screen px-8 sm:px-14 lg:px-20 pb-16 lg:pb-20 pt-32 max-w-2xl"
      >
        {/* Location */}
        <motion.p
          variants={fadeUp(0)}
          className="text-white/35 text-xs uppercase tracking-[0.3em] font-light mb-10"
        >
          Vilnius, Lithuania
        </motion.p>

        {/* Name */}
        <motion.div variants={fadeUp(0.05)}>
          <h1 className="text-[clamp(3.5rem,9vw,8.5rem)] font-light text-white leading-[0.88] tracking-tight">
            Arjun
          </h1>
          <h1 className="text-[clamp(3.5rem,9vw,8.5rem)] font-light text-white/30 leading-[0.88] tracking-tight mb-10">
            Rawat
          </h1>
        </motion.div>

        {/* Role */}
        <motion.p
          variants={fadeUp(0.1)}
          className="text-white/55 text-base sm:text-lg font-light mb-10 max-w-sm leading-relaxed"
        >
          Data Scientist & AI Engineer, building intelligent systems at the intersection of data and software.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp(0.15)} className="flex flex-wrap gap-3 mb-14">
          <a
            href="mailto:arjunrawat4741@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-7 py-3 hover:bg-white/90 transition-colors"
          >
            Get in touch
            <ArrowUpRight size={13} />
          </a>
          <a
            href="/Arjun-rawat-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/25 text-white/65 text-sm font-medium px-7 py-3 hover:border-white/50 hover:text-white transition-colors"
          >
            <Download size={13} />
            Resume
          </a>
        </motion.div>

        {/* Stats + Socials */}
        <motion.div
          variants={fadeUp(0.2)}
          className="flex items-end justify-between pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex gap-8">
            {[
              { value: '4+',  label: 'Internships' },
              { value: '10+', label: 'Projects'    },
              { value: '3+',  label: 'Years'        },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-light text-white tracking-tight">{stat.value}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-5">
            {[
              { icon: Github,   href: 'https://github.com/ARJUNRAWAT-DEL',   label: 'GitHub'   },
              { icon: Linkedin, href: 'https://linkedin.com/in/rwtarjun',     label: 'LinkedIn' },
              { icon: Mail,     href: 'mailto:arjunrawat4741@gmail.com',      label: 'Email'    },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                title={label}
                className="text-white/30 hover:text-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

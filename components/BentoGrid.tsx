'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight, Download } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } } }

const cardBase =
  'rounded-2xl border transition-all duration-300 overflow-hidden'
const cardStyle = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.07)',
}
const cardHoverStyle = {
  background: 'rgba(255,255,255,0.04)',
  borderColor: 'rgba(124,58,237,0.25)',
}

export default function BentoGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-12 gap-3 w-full max-w-6xl mx-auto"
    >
      {/* ── Name Card ── col 4 */}
      <motion.div
        variants={item}
        className={`${cardBase} col-span-12 sm:col-span-4 p-8 flex flex-col justify-between min-h-[220px] group`}
        style={cardStyle}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, cardHoverStyle)}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, cardStyle)}
      >
        <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center">
          <span className="text-violet-300 text-sm font-bold">AR</span>
        </div>
        <div>
          <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-[0.9] mb-3">
            Arjun<br />
            <span className="text-white/75">Rawat</span>
          </h1>
          <p className="text-white/35 text-xs font-medium uppercase tracking-widest">
            Data Scientist · AI Engineer
          </p>
        </div>
      </motion.div>

      {/* ── Photo Card ── col 4 row 2 */}
      <motion.div
        variants={item}
        className={`${cardBase} col-span-12 sm:col-span-4 row-span-2 relative min-h-[460px]`}
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 via-violet-400 to-transparent z-10" />
        <img
          src="/arjun-profile.jpg"
          alt="Arjun Rawat"
          className="w-full h-full object-cover object-top opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 z-20">
          <span className="text-white/60 text-xs uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            Vilnius, Lithuania
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <p className="text-white/50 text-xs">arjunrawat-portfolio.vercel.app</p>
        </div>
      </motion.div>

      {/* ── Featured Project Card ── col 4 */}
      <motion.div
        variants={item}
        className={`${cardBase} col-span-12 sm:col-span-4 p-6 flex flex-col justify-between min-h-[220px] group cursor-pointer`}
        style={cardStyle}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, cardHoverStyle)}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, cardStyle)}
      >
        <div className="flex items-start justify-between">
          <span className="text-violet-400 text-xs uppercase tracking-widest font-semibold">Latest Project</span>
          <ArrowUpRight size={14} className="text-white/25 group-hover:text-violet-400 transition-colors" />
        </div>
        <div>
          <p className="text-white font-bold text-lg leading-tight mb-1">Aethel Finance</p>
          <p className="text-white/40 text-xs leading-relaxed">
            AI-powered financial management tool with GraphRAG, Kafka, Neo4j & real-time sentiment pipelines.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {['LangGraph', 'Kafka', 'Neo4j', 'React'].map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-md border border-violet-500/20 text-violet-300/70 bg-violet-600/08">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── About Card ── col 4 */}
      <motion.div
        variants={item}
        className={`${cardBase} col-span-12 sm:col-span-4 p-6 group`}
        style={cardStyle}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, cardHoverStyle)}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, cardStyle)}
      >
        <p className="text-white/30 text-xs uppercase tracking-widest mb-3">About</p>
        <p className="text-white/55 text-sm leading-relaxed">
          BSc Information Technology — VILNIUS TECH. Four internships in data science, AI engineering & big data across Lithuania and India.
          <br /><br />
          Currently at{' '}
          <span className="text-white/80 font-semibold">Cencora</span>.
          Previously{' '}
          <span className="text-white/80 font-semibold">Yara International</span>,{' '}
          <span className="text-white/80 font-semibold">Labmentix</span>{' '}&{' '}
          <span className="text-white/80 font-semibold">Accenture</span>.
        </p>
      </motion.div>

      {/* ── Skills Card ── col 4 */}
      <motion.div
        variants={item}
        className={`${cardBase} col-span-12 sm:col-span-4 p-6 group`}
        style={cardStyle}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, cardHoverStyle)}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, cardStyle)}
      >
        <p className="text-white/30 text-xs uppercase tracking-widest mb-5">Core Skills</p>
        <div className="flex flex-col gap-3">
          {[
            { name: 'Python & ML',    sub: 'PyTorch · Scikit-learn · NLP',   color: '#7c3aed' },
            { name: 'Data Pipelines', sub: 'Kafka · Spark · ETL',            color: '#a78bfa' },
            { name: 'Full-Stack',     sub: 'React · FastAPI · PostgreSQL',    color: '#6d28d9' },
            { name: 'Cloud',          sub: 'AWS · GCP · Azure',               color: '#8b5cf6' },
          ].map((skill, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: skill.color }} />
              <div className="flex flex-1 justify-between items-center">
                <span className="text-white/70 text-sm font-medium">{skill.name}</span>
                <span className="text-white/25 text-xs">{skill.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Stats Card ── col 8 */}
      <motion.div
        variants={item}
        className={`${cardBase} col-span-12 sm:col-span-8 p-8 flex items-center justify-around group`}
        style={cardStyle}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, cardHoverStyle)}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, cardStyle)}
      >
        {[
          { value: '4+', label: 'Internships',  sub: 'across 3 countries' },
          { value: '10+', label: 'Projects',    sub: 'shipped to production' },
          { value: '3+', label: 'Years',        sub: 'in tech & AI' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-4xl sm:text-5xl font-black text-white">{stat.value}</p>
            <p className="text-white/50 text-sm mt-1 font-medium">{stat.label}</p>
            <p className="text-white/25 text-xs mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Social Card ── col 4 */}
      <motion.div
        variants={item}
        className={`${cardBase} col-span-12 sm:col-span-4 p-6 flex flex-col justify-between group`}
        style={cardStyle}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, cardHoverStyle)}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, cardStyle)}
      >
        <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Connect</p>
        <div className="flex flex-col gap-2">
          {[
            { icon: Github,   label: 'GitHub',   href: 'https://github.com/ARJUNRAWAT-DEL' },
            { icon: Linkedin, label: 'LinkedIn',  href: 'https://linkedin.com/in/rwtarjun' },
            { icon: Mail,     label: 'Email',     href: 'mailto:arjunrawat4741@gmail.com' },
          ].map(({ icon: Icon, label, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/45 hover:text-white hover:bg-white/05 text-sm transition-all group/link"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <Icon size={14} />
              <span className="flex-1">{label}</span>
              <ArrowUpRight size={11} className="opacity-0 group-hover/link:opacity-60 transition-opacity" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* ── CTA Card ── col 12 */}
      <motion.div
        variants={item}
        className="col-span-12 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 40%, #6d28d9 100%)',
          border: '1px solid rgba(124,58,237,0.4)',
        }}
      >
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: '#a78bfa' }} />

        <div className="relative z-10">
          <p className="text-violet-200/70 text-xs uppercase tracking-widest font-semibold mb-2">
            Open to roles in data science, AI & engineering
          </p>
          <h3 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
            Let's build something<br />
            <span className="text-white/70">that matters.</span>
          </h3>
        </div>

        <div className="relative z-10 mt-6 sm:mt-0 flex gap-3">
          <a
            href="mailto:arjunrawat4741@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-violet-700 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/95 transition-colors"
          >
            Get in touch
            <ArrowUpRight size={14} />
          </a>
          <a
            href="/Arjun-rawat-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/15 transition-colors border border-white/20"
          >
            <Download size={14} />
            Resume
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Cpu,
  Download,
  Github,
  GraduationCap,
  Grid2X2,
  Home,
  Linkedin,
  Mail,
  User,
} from "lucide-react";
import {
  education,
  experiences,
  languages,
  learning,
  profile,
  projects,
} from "@/lib/portfolio";
import SkillGraph from "./SkillGraph";
import Projects from "./Projects";
import Learning from "./Learning";
import Clock from "./Clock";
import Contact from "./Contact";
import Telemetry from "./Telemetry";
import Assistant from "./Assistant";
const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "projects", label: "Projects", icon: Grid2X2 },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Learning", icon: Award },
  { id: "telemetry", label: "Telemetry", icon: Activity },
  { id: "contact", label: "Contact", icon: Mail },
];
const navigation = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Work", icon: Grid2X2 },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];
function Heading({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <header className="section-heading">
      <p className="section-label">
        <span>{number}</span>
        <i />
        {label}
      </p>
      <h2>{children}</h2>
    </header>
  );
}
export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [ask, setAsk] = useState(false);
  const activeGroup = ["education", "certifications"].includes(active)
    ? "about"
    : active === "experience"
      ? "projects"
      : active === "telemetry"
        ? "skills"
        : active;
  useEffect(() => {
    let queued = false;
    const update = () => {
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4)
          current = section.id;
      }
      setActive(current);
      queued = false;
    };
    const scroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  return (
    <>
      <nav className="primary-nav" aria-label="Main navigation">
        <ul>
          {navigation.map(({ id, label, icon: Icon }) => (
            <li key={id} className={activeGroup === id ? "current" : ""}>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={activeGroup === id ? "location" : undefined}
                title={label}
                onClick={() => {
                  setActive(id);
                }}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <main id="main">
        <section id="home" className="hero section-shell">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span>WÜRZBURG, GERMANY</span>
              <i /> AI · DATA · SOFTWARE
            </p>
            <h1>
              Arjun
              <br />
              <span>Rawat</span>
            </h1>
            <p className="hero-description">{profile.summary}</p>
            <p className="learning-line">
              <span>&gt;</span> learning PyTorch &amp; the mathematics of AI
              <span className="cursor">_</span>
            </p>
            <div className="hero-actions">
              <a className="action primary" href="#projects">
                VIEW PROJECTS <ArrowUpRight size={17} />
              </a>
              <a className="action" href="#contact">
                CONTACT ME <Mail size={16} />
              </a>
              <a
                className="action"
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
              >
                DOWNLOAD CV <Download size={16} />
              </a>
            </div>
            <dl className="recruiter-brief" aria-label="Recruiter information">
              <div>
                <dt>LOCATION</dt>
                <dd>Würzburg, Germany</dd>
              </div>
              <div>
                <dt>AVAILABILITY</dt>
                <dd>Werkstudent · up to 20 h/week</dd>
              </div>
              <div>
                <dt>FOCUS</dt>
                <dd>AI · data · software</dd>
              </div>
              <div>
                <dt>ENGLISH</dt>
                <dd>Professional working proficiency</dd>
              </div>
            </dl>
            <div className="hero-links">
              <Clock />
              <a
                className="social-circle"
                aria-label="GitHub"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} />
              </a>
              <a
                className="social-circle"
                aria-label="LinkedIn"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} />
              </a>
              <button className="cv-link assistant-link" onClick={() => setAsk(true)}>
                Ask portfolio assistant
              </button>
            </div>
          </div>
          <figure className="hero-portrait">
            <div className="hero-portrait-frame">
              <Image
                src="/arjun-professional.webp"
                alt="Arjun Rawat wearing a light suit outside a modern building"
                fill
                priority
                sizes="(max-width: 760px) 85vw, (max-width: 1000px) 40vw, 430px"
              />
              <div className="hero-portrait-shade" />
              <figcaption>
                <span className="portrait-overline">
                  AI · DATA · SOFTWARE
                </span>
                <strong>Engineering systems with purpose.</strong>
                <span>MSc Artificial Intelligence · JMU Würzburg</span>
              </figcaption>
            </div>
          </figure>
          <a href="#about" className="scroll-cue">
            <ArrowDown size={20} />
            <span>SCROLL TO EXPLORE</span>
          </a>
          <span className="hero-side mono">AR / PORTFOLIO — 2026</span>
        </section>
        <section id="about" className="section-shell">
          <Heading number="01" label="ABOUT">
            Engineering <em>intelligent</em>
            <br className="desktop-break" /> software
          </Heading>
          <div className="section-shortcuts" aria-label="More about Arjun">
            <a href="#experience">
              Experience <ArrowUpRight size={14} />
            </a>
            <a href="#education">
              Education <ArrowUpRight size={14} />
            </a>
            <a href="#certifications">
              Learning <ArrowUpRight size={14} />
            </a>
            <a href="#telemetry">
              GitHub activity <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="about-layout">
            <div className="console portrait-console">
              <div className="console-bar">
                <span>CAM_01</span>
                <span className="recording">● REC</span>
              </div>
              <div className="portrait-screen">
                <Image
                  src="/arjun-professional.webp"
                  alt="Arjun Rawat wearing a light suit"
                  fill
                  sizes="(max-width: 760px) 90vw, 360px"
                  className="portrait-photo"
                />
                <div className="photo-shade" />
                <div className="detection-frame">
                  <span className="mono">arjun / profile</span>
                </div>
                <span className="portrait-caption mono">
                  WÜRZBURG, DE <span>FRAME_01</span>
                </span>
              </div>
            </div>
            <div className="console about-log">
              <div className="console-bar">
                <span>LOG</span>
                <span>PERSONAL INTRODUCTION</span>
              </div>
              <div className="about-prose">
                <p>
                  I’m Arjun, an IT graduate and now an MSc Artificial
                  Intelligence student at <strong>JMU Würzburg</strong>. I’m
                  interested in the point where data, machine learning and
                  useful software come together.
                </p>
                <p>
                  My experience spans data operations, AI projects and software
                  development. I’ve worked with document assistants, multi-agent
                  applications and analytics dashboards — and I enjoy
                  understanding how each part fits together.
                </p>
                <p>
                  Right now, I’m strengthening my foundations in Python, PyTorch
                  and optimization while looking for a Werkstudent role where I
                  can keep learning and contribute.
                </p>
                <p className="availability">
                  <span className="status-dot" />
                  {profile.availability}
                </p>
              </div>
              <dl className="about-stats">
                <div>
                  <dt>ARTIFICIAL INTELLIGENCE</dt>
                  <dd>MSc</dd>
                </div>
                <div>
                  <dt>FEATURED PROJECTS</dt>
                  <dd>{projects.length}</dd>
                </div>
                <div>
                  <dt>LEARNING RECORDS</dt>
                  <dd>{learning.length}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="language-strip">
            {languages.map((l) => (
              <div key={l.name}>
                <span>{l.name}</span>
                <span>{l.level}</span>
              </div>
            ))}
          </div>
        </section>
        <section id="skills" className="section-shell">
          <Heading number="02" label="SKILLS">
            A neural map of my <em>toolkit</em>
          </Heading>
          <SkillGraph />
        </section>
        <section id="projects" className="projects-section">
          <div className="section-shell section-title-only">
            <Heading number="03" label="PROJECTS">
              Things I’ve <em>built</em>
            </Heading>
          </div>
          <Projects />
        </section>
        <section id="experience" className="section-shell">
          <Heading number="04" label="EXPERIENCE">
            Where I’ve <em>worked</em>
          </Heading>
          <div className="experience-list">
            {experiences.map((exp, i) => (
              <article className="experience-card" key={exp.company}>
                <div className="experience-meta mono">
                  <span>
                    LOG_0{i + 1} <b>{exp.type}</b>
                  </span>
                  <span>{exp.period}</span>
                </div>
                <div className="experience-content">
                  <div>
                    <h3>{exp.role}</h3>
                    <p className="company">{exp.company}</p>
                    <p className="location">{exp.location}</p>
                  </div>
                  <ul>
                    {exp.details.map((d) => (
                      <li key={d}>
                        <span>›</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="education" className="section-shell">
          <Heading number="05" label="EDUCATION">
            How I <em>learn</em>
          </Heading>
          <div className="education-grid">
            {education.map((ed, i) => (
              <article key={ed.degree} className="console education-card">
                <div className="console-bar">
                  <span>TRAINING_0{i + 1}</span>
                  <span>{ed.active ? "IN PROGRESS" : "COMPLETED"}</span>
                </div>
                <div className="education-body">
                  <span className="mono dim">{ed.period}</span>
                  <GraduationCap size={28} />
                  <h3>{ed.degree}</h3>
                  <p className="school">{ed.school}</p>
                  <p className="location">{ed.location}</p>
                  <p>{ed.description}</p>
                </div>
                <div className="training-status mono">
                  <span>TRAINING</span>
                  <span>
                    {ed.active ? (
                      <>
                        <span className="status-dot" /> RUNNING
                      </>
                    ) : (
                      "100% / COMPLETE"
                    )}
                  </span>
                </div>
                <div
                  className={`training-progress ${ed.active ? "running" : "complete"}`}
                />
              </article>
            ))}
          </div>
          <figure className="education-milestone console">
            <div className="education-milestone-photo">
              <Image
                src="/vilnius-tech-graduation.webp"
                alt="Arjun Rawat in graduation attire holding his degree outside VILNIUS TECH"
                fill
                sizes="(max-width: 760px) 90vw, 430px"
              />
              <span className="education-photo-index mono">MILESTONE_01</span>
            </div>
            <figcaption>
              <p className="section-label">
                <span>2026</span>
                <i /> GRADUATION MILESTONE
              </p>
              <h3>
                From IT foundations to
                <br /> <em>artificial intelligence.</em>
              </h3>
              <p>
                Completing my BSc in Information Technology at VILNIUS TECH
                marked four years of study across software, data, cloud and
                big-data foundations — and the starting point for my MSc in
                Artificial Intelligence at JMU Würzburg.
              </p>
              <div className="education-milestone-meta">
                <span>BSc Information Technology</span>
                <span>Vilnius, Lithuania</span>
                <span>2022–2026</span>
              </div>
            </figcaption>
          </figure>
        </section>
        <section id="certifications" className="section-shell">
          <Heading number="06" label="CERTIFICATIONS & LEARNING">
            Always <em>learning</em>
          </Heading>
          <Learning />
        </section>
        <section id="telemetry" className="section-shell">
          <Heading number="07" label="TELEMETRY">
            Live <em>signals</em>
          </Heading>
          <Telemetry />
        </section>
        <section id="contact" className="section-shell">
          <Heading number="08" label="CONTACT">
            Let’s build something
            <br />
            <em>intelligent</em>
          </Heading>
          <p className="section-intro">
            Have a data problem, a research idea or a role in mind? My inbox is
            open.
          </p>
          <Contact />
        </section>
      </main>
      <footer className="site-footer section-shell">
        <p className="eyebrow">END OF TRANSMISSION</p>
        <div className="footer-main">
          <span>
            Arjun Rawat<span className="accent">.</span>
          </span>
          <div>
            <a href={profile.githubUrl} aria-label="GitHub">
              <Github size={19} />
            </a>
            <a href={profile.linkedin} aria-label="LinkedIn">
              <Linkedin size={19} />
            </a>
            <a href="#home" aria-label="Back to top">
              <ArrowUp size={20} />
            </a>
          </div>
        </div>
        <div className="footer-bottom mono">
          <span>© 2026 ARJUN RAWAT</span>
          <span>BUILT WITH CURIOSITY · WÜRZBURG, DE</span>
          <a href={profile.cv} target="_blank" rel="noreferrer">
            DOWNLOAD CV ↗
          </a>
        </div>
      </footer>
      <Assistant
        requested={ask}
        onOpen={() => setAsk(true)}
        onClose={() => setAsk(false)}
      />
    </>
  );
}

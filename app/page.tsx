"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import ContactForm from "../components/ContactForm";
import BentoGrid from "../components/BentoGrid";

const SubtleBackground = dynamic(() => import("../components/SubtleBackground"), {
  loading: () => null,
  ssr: false
});

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const experiences = [
    {
      role: "Data Intake Specialist",
      company: "Cencora",
      period: "Nov 2025 – May 2026, Vilnius, Lithuania",
      details: [
        "Maintained efficient systems ensuring timely and accurate information flow to clients, handling intake of all program-specific correspondence",
        "Logged and updated data in relevant databases with high accuracy; ensured compliance with all policies, procedures, and regulatory requirements",
        "Coordinated sharing of program-specific information with internal teams using Microsoft Teams and SharePoint"
      ],
      technologies: ["Data Management", "SharePoint", "Microsoft Teams", "Compliance"],
    },
    {
      role: "Data Science with AI/ML Intern",
      company: "Labmentix",
      period: "Jul 2025 – Oct 2025, Remote",
      details: [
        "Applied supervised and unsupervised ML algorithms for real-world predictive modeling with strong emphasis on performance metrics and cross-validation",
        "Used Python, Pandas, NumPy, and Scikit-learn for end-to-end data preprocessing, feature engineering, and model optimization",
        "Created compelling data visualizations using Matplotlib and Seaborn to communicate insights to technical and non-technical stakeholders"
      ],
      technologies: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
    },
    {
      role: "Software Engineer Intern (IT)",
      company: "Yara International",
      period: "Jul 2025 – Sep 2025, Delhi, India",
      details: [
        "Developed an AI-powered document assistant using FastAPI, PostgreSQL (pgvector), and NLP models, improving document summarization efficiency by 25%",
        "Built and deployed a full-stack AI web application with React frontend and multiple integrated AI assistants, reducing application latency by 20%",
        "Streamlined debugging and CI/CD deployment pipelines using Git/GitHub, cutting release cycle time by 15%"
      ],
      technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector", "NLP", "React", "Git"],
    },
    {
      role: "Big Data Engineer Intern",
      company: "Accenture Baltics",
      period: "Jan 2024 – Feb 2024, Vilnius, Lithuania",
      details: [
        "Worked with AWS, Azure, and GCP to architect scalable data engineering solutions and cloud-based processing pipelines",
        "Built robust ETL pipelines using Python, SQL, and Apache Spark to process large-scale datasets; implemented NoSQL solutions (DynamoDB) for flexible analytics",
        "Gained hands-on experience with Hadoop, HDFS, MapReduce, and Kafka for distributed data handling and real-time streaming workflows"
      ],
      technologies: ["AWS", "Azure", "GCP", "Python", "SQL", "Apache Spark", "DynamoDB", "Hadoop", "Kafka"],
    },
    {
      role: "Bachelor of Science — Information Technology",
      company: "Vilnius Gediminas Technical University (VILNIUS TECH)",
      period: "Sep 2022 – Jun 2026, Vilnius, Lithuania",
      details: [
        "Graduated with a BSc in Information Technology",
        "Relevant Coursework: Data Structures & Algorithms, Big Data Analytics, Business Analytics, Cloud Computing, Software Engineering, Database Systems",
        "Applied academic knowledge throughout four real-world internships spanning data science, AI engineering, and big data"
      ],
      technologies: ["Information Technology", "Software Engineering", "Big Data", "Cloud Computing"],
    }
  ];

  const projects = [
    {
      title: "Aethel Finance — AI Financial Management Tool",
      description: "AI-powered personal finance platform with a real-time sentiment-to-liquidity pipeline using Apache Kafka and Spark Streaming to detect market events and trigger automated portfolio adjustments.",
      tech: ["Python", "LangGraph", "Kafka", "Neo4j", "React", "PostgreSQL", "pgvector"],
      link: "https://github.com/ARJUNRAWAT-DEL",
      featured: true,
      image: null,
      metrics: ["Real-time Kafka + Spark pipeline", "GraphRAG with Neo4j & LLMs", "Generative UI War Room dashboard"]
    },
    {
      title: "AI-Powered Document Assistant",
      description: "AI assistant using NLP and FastAPI to process and summarize 200+ pages in under 5 minutes. Built for Yara International — improved document summarization efficiency by 25% with REST API integration.",
      tech: ["Python", "FastAPI", "PostgreSQL", "pgvector", "NLP"],
      link: "https://github.com/ARJUNRAWAT-DEL/INTELLIDOC",
      metrics: ["200+ pages in under 5 min", "25% efficiency improvement", "REST API integration"]
    },
    {
      title: "Multi-Agent Simulator",
      description: "Scalable web app where AI assistants collaborate to perform complex tasks, improving task execution efficiency by 30%. Intuitive React frontend with live performance dashboards and real-time agent monitoring.",
      tech: ["React", "FastAPI", "PostgreSQL", "NLP", "Python"],
      link: "https://github.com/ARJUNRAWAT-DEL/multi-agents-simulator-",
      metrics: ["30% efficiency improvement", "Real-time dashboards"]
    },
    {
      title: "Smart Retail Analytics Platform",
      description: "AI-powered retail analytics dashboard with customer segmentation (RFM & K-Means), demand forecasting, and interactive Plotly visualizations for business decision support.",
      tech: ["Streamlit", "Python", "PostgreSQL", "Plotly", "Pandas"],
      link: "https://github.com/ARJUNRAWAT-DEL/Smart-Retail-Analytics-Platform",
      metrics: ["RFM & K-Means segmentation", "Demand forecasting", "Interactive dashboards"]
    }
  ];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certFilter, setCertFilter] = useState("All");
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage(data.error || 'Failed to send message');
      }
    } catch {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) return <div className="min-h-screen" />;

  /* ── shared section-label style ── */
  const sectionLabel = "text-white/28 text-xs font-light uppercase tracking-[0.28em] mb-3";
  const sectionTitle = "text-4xl sm:text-5xl font-light text-white";

  /* ── shared tag style ── */
  const tagStyle: React.CSSProperties = {
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.5)',
    background: 'transparent',
  };

  return (
    <div className="space-y-0 relative">
      <SubtleBackground />

      {/* ── Hero ── */}
      <section id="home" className="relative overflow-hidden">
        <BentoGrid />
      </section>

      {/* ── About ── */}
      <section id="about" className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className={sectionLabel} style={{ color: 'rgba(255,255,255,0.28)' }}>About</p>
            <h2 className={sectionTitle}>Who I Am</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div
                className="w-72 h-[480px] overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <img
                  src="/about-photo.jpg"
                  alt="Arjun Rawat"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 28%' }}
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8 text-left"
            >
              <p className="text-base sm:text-lg text-white/55 leading-relaxed font-light">
                I'm Arjun, a BSc Information Technology graduate from Vilnius Gediminas Technical University. I've spent the last four years building at the intersection of data science, AI engineering, and full-stack development in Lithuania.
              </p>

              <p className="text-base sm:text-lg text-white/55 leading-relaxed font-light">
                Across four internships at Cencora, Yara International, Labmentix, and Accenture Baltics, I've shipped production AI systems, real-time data pipelines, and full-stack web applications using Python, FastAPI, React, LangGraph, Kafka, and cloud platforms.
              </p>

              <p className="text-base sm:text-lg text-white/55 leading-relaxed font-light">
                I'm most at home where applied ML meets software engineering. GraphRAG knowledge layers, real-time streaming pipelines, and interfaces that turn complex data into clear decisions.
              </p>

              {/* Skills — colorful by category */}
              <div className="pt-4 space-y-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  {
                    label: "Languages & Frameworks",
                    items: ['Python', 'JavaScript', 'TypeScript', 'R', 'React.js', 'Node.js', 'FastAPI'],
                    color: { text: '#60a5fa', border: 'rgba(96,165,250,0.3)', bg: 'rgba(96,165,250,0.07)' },
                  },
                  {
                    label: "Data & Machine Learning",
                    items: ['Machine Learning', 'NLP', 'LLM', 'RAG', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Power BI'],
                    color: { text: '#a78bfa', border: 'rgba(167,139,250,0.3)', bg: 'rgba(167,139,250,0.07)' },
                  },
                  {
                    label: "Databases & Cloud",
                    items: ['PostgreSQL', 'MySQL', 'DynamoDB', 'pgvector', 'AWS', 'Azure', 'GCP', 'Apache Spark', 'Kafka'],
                    color: { text: '#34d399', border: 'rgba(52,211,153,0.3)', bg: 'rgba(52,211,153,0.07)' },
                  },
                  {
                    label: "Tools",
                    items: ['Git/GitHub', 'Docker', 'REST APIs', 'ETL Pipelines', 'Streamlit', 'Jupyter'],
                    color: { text: '#fbbf24', border: 'rgba(251,191,36,0.3)', bg: 'rgba(251,191,36,0.07)' },
                  },
                ].map(({ label, items, color }) => (
                  <div key={label}>
                    <p className="text-xs uppercase tracking-[0.2em] font-light mb-3" style={{ color: color.text, opacity: 0.8 }}>{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-light"
                          style={{ color: color.text, border: `1px solid ${color.border}`, background: color.bg }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className={sectionLabel} style={{ color: 'rgba(255,255,255,0.28)' }}>Timeline</p>
            <h2 className={sectionTitle}>Experience & Education</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative pl-6"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative mb-6 last:mb-0"
              >
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.15)' }} />

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-5"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3 className="text-lg font-light text-white mb-1">{exp.role}</h3>
                  <p className="text-white/45 text-sm mb-1 font-light">{exp.company}</p>
                  <p className="text-white/25 text-xs mb-4 font-light">{exp.period}</p>

                  <ul className="space-y-1.5 mb-4">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="text-white/45 text-sm flex gap-2 font-light">
                        <span className="text-white/25 flex-shrink-0">·</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1" style={tagStyle}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className={sectionLabel} style={{ color: 'rgba(255,255,255,0.28)' }}>Work</p>
            <h2 className={sectionTitle}>Featured Projects</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Featured */}
            {projects.filter((p) => p.featured).map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group block p-8 md:p-10 transition-colors"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink size={20} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-1 ml-4" />
                </div>

                <p className="text-white/50 text-base mb-6 leading-relaxed font-light">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-white/25 font-light">—</span>
                        <span className="text-white/50 text-sm font-light">{metric}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-3 py-1.5" style={tagStyle}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}

            {/* Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-5 mt-10"
            >
              {projects.filter((p) => !p.featured).map((project, index) => (
                <motion.a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="group block p-6 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <h4 className="text-lg font-light text-white mb-3 group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-white/45 text-sm mb-4 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {project.metrics.map((metric, i) => (
                        <span key={i} className="text-xs text-white/30 font-light">· {metric}</span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1" style={tagStyle}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Certifications & Languages ── */}
      {(() => {
        const certs = [
          { name: "Intro to Snowflake for Devs, Data Scientists, Data Engineers", date: "May 2026", cat: "AWS & Cloud" },
          { name: "Learning Amazon Web Services Lambda", date: "Apr 2026", cat: "AWS & Cloud" },
          { name: "Introduction to AWS Automation Tools", date: "Apr 2026", cat: "AWS & Cloud" },
          { name: "Text to SQL: Amazon Redshift Serverless for Generative SQL in Amazon Q", date: "Mar 2026", cat: "AWS & Cloud" },
          { name: "AWS Certified Generative AI Developer – Professional (AIP-C01) Cert Prep", date: "Mar 2026", cat: "AWS & Cloud" },
          { name: "AWS Certified Machine Learning Engineer Associate (MLA-C01) Cert Prep", date: "Mar 2026", cat: "AWS & Cloud" },
          { name: "AWS Certified Cloud Practitioner (CLF-C02) Cert Prep", date: "Mar 2026", cat: "AWS & Cloud" },
          { name: "AWS Certified Solutions Architect – Professional (SAP-C02) Cert Prep", date: "Mar 2026", cat: "AWS & Cloud" },
          { name: "AWS Certified AI Practitioner (AIF-C01) Cert Prep", date: "Mar 2026", cat: "AWS & Cloud" },
          { name: "AWS Certified Data Engineer Associate (DEA-C01) Cert Prep", date: "Mar 2026", cat: "AWS & Cloud" },
          { name: "AWS Certified Machine Learning – Specialty (MLS-C01) Cert Prep", date: "Mar 2026", cat: "AWS & Cloud" },
          { name: "Machine Learning with Python: Foundations", date: "Mar 2026", cat: "AI & ML" },
          { name: "Microsoft Azure Data Scientist Associate (DP-100) Cert Prep", date: "Mar 2026", cat: "AI & ML" },
          { name: "Build with AI: LLM-Powered Data Analysis App with Python and Streamlit", date: "Mar 2026", cat: "AI & ML" },
          { name: "Microsoft Azure AI Fundamentals (AI-900) Cert Prep by Microsoft Press", date: "Mar 2026", cat: "AI & ML" },
          { name: "Guided Lab: Model Context Protocol (MCP) for Data Science Models", date: "Mar 2026", cat: "AI & ML" },
          { name: "Microsoft Copilot: The Art of Prompt Writing", date: "Mar 2026", cat: "AI & ML" },
          { name: "The AI-Driven Project Manager: 10X Your Productivity with Generative AI", date: "Mar 2026", cat: "AI & ML" },
          { name: "Integrating Generative AI into Business Strategy", date: "Mar 2026", cat: "AI & ML" },
          { name: "Generative AI for Business Analysts", date: "Mar 2026", cat: "AI & ML" },
          { name: "Advanced Python: Top Tools for Data Science and Engineering", date: "Mar 2026", cat: "Data Science" },
          { name: "R for Data Science: Analysis and Visualization", date: "Mar 2026", cat: "Data Science" },
          { name: "Python Data Visualization: Create Impactful Visuals, Animations, and Dashboards by Pearson", date: "Mar 2026", cat: "Data Science" },
          { name: "Apache Spark Essential Training: Big Data Engineering", date: "Mar 2026", cat: "Data Science" },
          { name: "Tableau Certified Data Analyst Cert Prep", date: "Mar 2026", cat: "Data Science" },
          { name: "Advanced Data Visualizations: 12 Uncommon Plot Types and How to Use Them", date: "Mar 2026", cat: "Data Science" },
          { name: "Advanced Python in Excel: Data Analysis and Visualization", date: "Mar 2026", cat: "Data Science" },
          { name: "Data Analysis: Investigate with SQL", date: "Mar 2026", cat: "Data Science" },
          { name: "SQL for Data Analysis", date: "Mar 2026", cat: "Data Science" },
          { name: "Learning Data Analytics: 1 Foundations", date: "Mar 2026", cat: "Data Science" },
          { name: "Data Science Foundations: Fundamentals", date: "Mar 2026", cat: "Data Science" },
          { name: "Microsoft Copilot Essentials by Microsoft Press", date: "Apr 2026", cat: "Microsoft" },
          { name: "Microsoft Power Automate: Advanced Business Automation", date: "Mar 2026", cat: "Microsoft" },
          { name: "Microsoft Power BI Data Analyst Associate (PL-300) Cert Prep by Microsoft Press", date: "Mar 2026", cat: "Microsoft" },
          { name: "Advanced Power BI: DAX Language, Formulas, and Calculations", date: "Mar 2026", cat: "Microsoft" },
          { name: "Practical GitHub Actions", date: "Apr 2026", cat: "DevOps & Tools" },
          { name: "Learning Docker", date: "Mar 2026", cat: "DevOps & Tools" },
          { name: "DevOps Foundations: Incident Management", date: "Mar 2026", cat: "DevOps & Tools" },
          { name: "Agile Foundations", date: "Apr 2026", cat: "Business" },
          { name: "Product Management First Steps", date: "Apr 2026", cat: "Business" },
          { name: "Certified Business Analysis Professional (CBAP)® Cert Prep", date: "Mar 2026", cat: "Business" },
          { name: "Everything as a Service (XaaS) is the Future of Business", date: "Mar 2026", cat: "Business" },
          { name: "SAP Financials Essential Training", date: "Mar 2026", cat: "Business" },
          { name: "Business Benefits Realization Foundations", date: "Mar 2026", cat: "Business" },
          { name: "Project Management Foundations", date: "Mar 2026", cat: "Business" },
          { name: "Six Sigma: Black Belt", date: "Mar 2026", cat: "Business" },
          { name: "Putting ITIL® Into Practice: Applying ITIL® 4 Foundation Concepts", date: "Mar 2026", cat: "IT & Ops" },
          { name: "IT Service Desk: Service Management", date: "Mar 2026", cat: "IT & Ops" },
          { name: "Learning ITIL®", date: "Mar 2026", cat: "IT & Ops" },
          { name: "UX Foundations: Analyzing User Data", date: "Mar 2026", cat: "IT & Ops" },
          { name: "Magnetic Public Speaking: How to Engage Your Audience", date: "Mar 2026", cat: "IT & Ops" },
        ];

        const filters = ["All", "AWS & Cloud", "AI & ML", "Data Science", "Microsoft", "DevOps & Tools", "Business", "IT & Ops"];
        const filtered = certFilter === "All" ? certs : certs.filter(c => c.cat === certFilter);

        const catColors: Record<string, { bg: string; text: string; border: string }> = {
          "AWS & Cloud":    { bg: "rgba(245,158,11,0.08)",  text: "#fbbf24", border: "rgba(245,158,11,0.25)"  },
          "AI & ML":        { bg: "rgba(167,139,250,0.08)", text: "#a78bfa", border: "rgba(167,139,250,0.25)" },
          "Data Science":   { bg: "rgba(96,165,250,0.08)",  text: "#60a5fa", border: "rgba(96,165,250,0.25)"  },
          "Microsoft":      { bg: "rgba(56,189,248,0.08)",  text: "#38bdf8", border: "rgba(56,189,248,0.25)"  },
          "DevOps & Tools": { bg: "rgba(52,211,153,0.08)",  text: "#34d399", border: "rgba(52,211,153,0.25)"  },
          "Business":       { bg: "rgba(244,114,182,0.08)", text: "#f472b6", border: "rgba(244,114,182,0.25)" },
          "IT & Ops":       { bg: "rgba(148,163,184,0.08)", text: "#94a3b8", border: "rgba(148,163,184,0.25)" },
        };

        const cardBase: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' };

        const langColors = [
          'linear-gradient(90deg, #fbbf24, #f59e0b)',
          'linear-gradient(90deg, #60a5fa, #3b82f6)',
          'linear-gradient(90deg, #a78bfa, #7c3aed)',
          'linear-gradient(90deg, #34d399, #10b981)',
        ];

        return (
          <section id="certifications" className="py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">

              <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
                <p className={sectionLabel} style={{ color: 'rgba(255,255,255,0.28)' }}>Credentials</p>
                <h2 className={sectionTitle}>Certifications & Languages</h2>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-6">

                {/* Certs panel */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                  className="lg:col-span-2 p-6 flex flex-col gap-5"
                  style={cardBase}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-white/25 text-xs uppercase tracking-widest font-light">
                      {filtered.length} of {certs.length} Certifications
                    </p>
                    <a href="https://www.linkedin.com/in/rwtarjun/details/certifications/" target="_blank" rel="noopener noreferrer"
                      className="text-white/30 hover:text-white/60 text-xs flex items-center gap-1 transition-colors font-light">
                      View all on LinkedIn <ExternalLink size={10} />
                    </a>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex gap-2 flex-wrap">
                    {filters.map(f => {
                      const c = catColors[f];
                      const isActive = certFilter === f;
                      return (
                        <button key={f} onClick={() => setCertFilter(f)}
                          className="text-xs px-3 py-1.5 font-light transition-all"
                          style={isActive && c
                            ? { background: c.bg, color: c.text, border: `1px solid ${c.border}` }
                            : isActive
                            ? { background: '#ffffff', color: '#000000', border: '1px solid #ffffff' }
                            : { background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }
                          }
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>

                  {/* Scrollable grid */}
                  <div
                    className="cert-scroll overflow-y-auto pr-1 grid sm:grid-cols-2 gap-2 content-start"
                    style={{ maxHeight: '480px' }}
                  >
                    {filtered.map((cert, i) => {
                      const c = catColors[cert.cat];
                      return (
                        <a key={i} href="https://www.linkedin.com/in/rwtarjun/details/certifications/"
                          target="_blank" rel="noopener noreferrer"
                          className="flex flex-col gap-2 p-3.5 cursor-pointer transition-all"
                          style={cardBase}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = c.bg;
                            (e.currentTarget as HTMLElement).style.borderColor = c.border;
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                          }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className="text-[9px] font-light uppercase tracking-widest px-2 py-0.5"
                              style={{ color: c.text, background: c.bg, border: `1px solid ${c.border}` }}
                            >
                              {cert.cat}
                            </span>
                            <span className="text-white/20 text-[10px] font-light flex-shrink-0">{cert.date}</span>
                          </div>
                          <p className="text-white/55 text-xs font-light leading-snug line-clamp-2 hover:text-white transition-colors">
                            {cert.name}
                          </p>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Languages panel */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
                  className="p-6 flex flex-col"
                  style={cardBase}
                >
                  <p className="text-white/25 text-xs uppercase tracking-widest font-light mb-6">Languages</p>
                  <div className="flex flex-col gap-6 flex-1">
                    {[
                      { lang: "Hindi",      level: "Native",                       pct: 100 },
                      { lang: "English",    level: "Full Professional Proficiency", pct: 95  },
                      { lang: "German",     level: "Intermediate (B1)",             pct: 50  },
                      { lang: "Lithuanian", level: "Elementary",                    pct: 20  },
                    ].map(({ lang, level, pct }, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-white/70 text-sm font-light">{lang}</span>
                          <span className="text-white/25 text-xs font-light">{level}</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="h-full rounded-full"
                            style={{ background: langColors[i] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-5 flex flex-col gap-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-white/20 text-xs uppercase tracking-widest font-light mb-1">Based in</p>
                    <p className="text-white/60 text-sm font-light">Vilnius, Lithuania</p>
                    <p className="text-white/25 text-xs font-light">Open to remote &amp; relocation</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        );
      })()}

      {/* ── Contact ── */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto w-full space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <p className={sectionLabel} style={{ color: 'rgba(255,255,255,0.28)' }}>Contact</p>
            <h2 className={sectionTitle}>Let's build something</h2>
            <p className="text-base sm:text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed">
              Open to internships, collaborations, and full-time opportunities in data science and software engineering.
            </p>
          </motion.div>

          <ContactForm
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            handleSubmit={handleSubmit}
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <a href="https://github.com/ARJUNRAWAT-DEL" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/rwtarjun" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:arjunrawat4741@gmail.com"
              className="text-white/25 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

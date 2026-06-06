"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import ContactForm from "../components/ContactForm";
import BentoGrid from "../components/BentoGrid";

// Lazy load heavy animation components
const SubtleBackground = dynamic(() => import("../components/SubtleBackground"), {
  loading: () => null,
  ssr: false
});

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Experience data
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

  // Projects data
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) return <div className="min-h-screen" />;

  return (
    <div className="space-y-0 relative">
      {/* Subtle Background */}
      <SubtleBackground />
      
      {/* Bento Grid Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center py-20 overflow-visible">
        {/* Gradient fade to transparent at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #06060c)' }}
        />
        {/* Content layer */}
        <div className="relative z-10 w-full px-4 sm:px-6">
          <BentoGrid />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">About</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Who I Am</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="w-80 h-96 rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img
                    src="/arjun-profile.jpg"
                    alt="Arjun Rawat"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 text-left"
            >
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                I'm Arjun — a BSc Information Technology graduate from Vilnius Gediminas Technical University. Originally from India, I've spent the last four years building at the intersection of data science, AI engineering, and full-stack development in Lithuania.
              </p>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Across four internships — at Cencora, Yara International, Labmentix, and Accenture Baltics — I've shipped production AI systems, real-time data pipelines, and full-stack web applications using Python, FastAPI, React, LangGraph, Kafka, and cloud platforms.
              </p>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                I'm most at home where applied ML meets software engineering: GraphRAG knowledge layers, real-time streaming pipelines, and interfaces that turn complex data into clear decisions.
              </p>

              <div className="pt-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2">Languages & Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'JavaScript', 'TypeScript', 'R', 'React.js', 'Node.js', 'FastAPI'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs border rounded-md border-violet-500/40 text-gray-300 bg-violet-600/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2">Data & ML</p>
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'NLP', 'LLM', 'RAG', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Plotly', 'Power BI', 'Prompt Engineering'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs border rounded-md border-violet-500/40 text-gray-300 bg-violet-600/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2">Databases & Cloud</p>
                  <div className="flex flex-wrap gap-2">
                    {['PostgreSQL', 'MySQL', 'DynamoDB', 'pgvector', 'AWS', 'Azure', 'GCP', 'Apache Spark', 'Hadoop', 'Kafka', 'HDFS'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs border rounded-md border-violet-500/40 text-gray-300 bg-violet-600/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2">Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {['Git/GitHub', 'Docker', 'REST APIs', 'ETL Pipelines', 'Streamlit', 'Jupyter Notebook'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs border rounded-md border-violet-500/40 text-gray-300 bg-violet-600/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Timeline</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Experience & Education</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative pl-6"
          >
            {/* Timeline vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative mb-6 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute -left-3 top-1.5 w-2 h-2 rounded-full bg-violet-600" />

                {/* Experience card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-900 border border-white/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">{exp.role}</h3>
                  <p className="text-gray-400 text-sm mb-1">{exp.company}</p>
                  <p className="text-gray-500 text-xs mb-4">{exp.period}</p>

                  <ul className="space-y-1.5 mb-4">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-violet-500 flex-shrink-0">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded border border-violet-500/40 text-gray-300 bg-violet-600/10"
                      >
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

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Work</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Featured Projects</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Featured Project - Full Width */}
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-gray-900 border border-white/10 rounded-2xl p-8 md:p-10 block hover:shadow-md transition-shadow shadow-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="text-gray-400 group-hover:text-gray-300 transition-colors"
                    >
                      <ExternalLink size={24} />
                    </motion.div>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-violet-500 font-semibold">✓</span>
                          <span className="text-gray-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm px-3 py-1.5 rounded-lg text-gray-300 border border-violet-500/40 bg-violet-600/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}

            {/* Other Projects - Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 mt-12"
            >
              {projects
                .filter((p) => !p.featured)
                .map((project, index) => (
                  <motion.a
                    key={index}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group bg-gray-900 border border-white/10 rounded-xl p-6 block hover:shadow-md transition-shadow shadow-sm"
                  >
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {project.metrics && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.metrics.map((metric, i) => (
                          <span key={i} className="text-xs text-gray-400">• {metric}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded border border-violet-500/40 text-gray-300 bg-violet-600/10"
                        >
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

      {/* Certifications & Languages Section */}
      {(() => {
        const certs = [
          // AWS & Cloud
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
          // AI & ML
          { name: "Machine Learning with Python: Foundations", date: "Mar 2026", cat: "AI & ML" },
          { name: "Microsoft Azure Data Scientist Associate (DP-100) Cert Prep", date: "Mar 2026", cat: "AI & ML" },
          { name: "Build with AI: LLM-Powered Data Analysis App with Python and Streamlit", date: "Mar 2026", cat: "AI & ML" },
          { name: "Microsoft Azure AI Fundamentals (AI-900) Cert Prep by Microsoft Press", date: "Mar 2026", cat: "AI & ML" },
          { name: "Guided Lab: Model Context Protocol (MCP) for Data Science Models", date: "Mar 2026", cat: "AI & ML" },
          { name: "Microsoft Copilot: The Art of Prompt Writing", date: "Mar 2026", cat: "AI & ML" },
          { name: "The AI-Driven Project Manager: 10X Your Productivity with Generative AI", date: "Mar 2026", cat: "AI & ML" },
          { name: "Integrating Generative AI into Business Strategy", date: "Mar 2026", cat: "AI & ML" },
          { name: "Generative AI for Business Analysts", date: "Mar 2026", cat: "AI & ML" },
          // Data Science
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
          // Microsoft
          { name: "Microsoft Copilot Essentials by Microsoft Press", date: "Apr 2026", cat: "Microsoft" },
          { name: "Microsoft Power Automate: Advanced Business Automation", date: "Mar 2026", cat: "Microsoft" },
          { name: "Microsoft Power BI Data Analyst Associate (PL-300) Cert Prep by Microsoft Press", date: "Mar 2026", cat: "Microsoft" },
          { name: "Advanced Power BI: DAX Language, Formulas, and Calculations", date: "Mar 2026", cat: "Microsoft" },
          // DevOps & Tools
          { name: "Practical GitHub Actions", date: "Apr 2026", cat: "DevOps & Tools" },
          { name: "Learning Docker", date: "Mar 2026", cat: "DevOps & Tools" },
          { name: "DevOps Foundations: Incident Management", date: "Mar 2026", cat: "DevOps & Tools" },
          // Business
          { name: "Agile Foundations", date: "Apr 2026", cat: "Business" },
          { name: "Product Management First Steps", date: "Apr 2026", cat: "Business" },
          { name: "Certified Business Analysis Professional (CBAP)® Cert Prep", date: "Mar 2026", cat: "Business" },
          { name: "Everything as a Service (XaaS) is the Future of Business", date: "Mar 2026", cat: "Business" },
          { name: "SAP Financials Essential Training", date: "Mar 2026", cat: "Business" },
          { name: "Business Benefits Realization Foundations", date: "Mar 2026", cat: "Business" },
          { name: "Project Management Foundations", date: "Mar 2026", cat: "Business" },
          { name: "Six Sigma: Black Belt", date: "Mar 2026", cat: "Business" },
          // IT & Ops
          { name: "Putting ITIL® Into Practice: Applying ITIL® 4 Foundation Concepts", date: "Mar 2026", cat: "IT & Ops" },
          { name: "IT Service Desk: Service Management", date: "Mar 2026", cat: "IT & Ops" },
          { name: "Learning ITIL®", date: "Mar 2026", cat: "IT & Ops" },
          { name: "UX Foundations: Analyzing User Data", date: "Mar 2026", cat: "IT & Ops" },
          { name: "Magnetic Public Speaking: How to Engage Your Audience", date: "Mar 2026", cat: "IT & Ops" },
        ];
        const catColors: Record<string, { bg: string; text: string; border: string }> = {
          "AWS & Cloud":   { bg: "rgba(245,158,11,0.1)",  text: "#fbbf24", border: "rgba(245,158,11,0.25)" },
          "AI & ML":       { bg: "rgba(124,58,237,0.12)", text: "#a78bfa", border: "rgba(124,58,237,0.3)"  },
          "Data Science":  { bg: "rgba(59,130,246,0.1)",  text: "#60a5fa", border: "rgba(59,130,246,0.25)" },
          "Microsoft":     { bg: "rgba(14,165,233,0.1)",  text: "#38bdf8", border: "rgba(14,165,233,0.25)" },
          "DevOps & Tools":{ bg: "rgba(16,185,129,0.1)",  text: "#34d399", border: "rgba(16,185,129,0.25)" },
          "Business":      { bg: "rgba(236,72,153,0.1)",  text: "#f472b6", border: "rgba(236,72,153,0.25)" },
          "IT & Ops":      { bg: "rgba(100,116,139,0.12)",text: "#94a3b8", border: "rgba(100,116,139,0.3)" },
        };
        const filters = ["All", ...Object.keys(catColors)];
        const filtered = certFilter === "All" ? certs : certs.filter(c => c.cat === certFilter);
        return (
      <section id="certifications" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Credentials</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Certifications & Languages</h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Certifications panel (2 cols) ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="lg:col-span-2 rounded-2xl p-6 flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  {filtered.length} of {certs.length} Certifications
                </p>
                <a href="https://www.linkedin.com/in/rwtarjun/details/certifications/" target="_blank" rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 text-xs flex items-center gap-1 transition-colors">
                  View all on LinkedIn <ExternalLink size={10} />
                </a>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-2 flex-wrap">
                {filters.map(f => (
                  <button key={f} onClick={() => setCertFilter(f)}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                    style={certFilter === f
                      ? { background: '#7c3aed', color: '#fff', border: '1px solid #7c3aed' }
                      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)' }
                    }
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Scrollable grid */}
              <div
                className="cert-scroll overflow-y-auto pr-1 grid sm:grid-cols-2 gap-2.5 content-start"
                style={{
                  maxHeight: '480px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#4c1d95 transparent',
                }}
              >
                {filtered.map((cert, i) => {
                  const c = catColors[cert.cat];
                  return (
                    <a key={i} href="https://www.linkedin.com/in/rwtarjun/details/certifications/"
                      target="_blank" rel="noopener noreferrer"
                      className="group flex flex-col gap-2 p-3.5 rounded-xl cursor-pointer transition-all"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.background = c.bg; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                          {cert.cat}
                        </span>
                        <span className="text-white/20 text-[10px] flex-shrink-0">{cert.date}</span>
                      </div>
                      <p className="text-white/70 text-xs font-medium leading-snug group-hover:text-white transition-colors line-clamp-2">
                        {cert.name}
                      </p>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Languages panel (1 col) ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-white/30 text-xs uppercase tracking-widest mb-6">Languages</p>
              <div className="flex flex-col gap-5 flex-1">
                {[
                  { lang: "Hindi",      level: "Native",                      pct: 100 },
                  { lang: "English",    level: "Full Professional Proficiency", pct: 95  },
                  { lang: "German",     level: "Intermediate (B1)",             pct: 50  },
                  { lang: "Lithuanian", level: "Elementary",                    pct: 20  },
                ].map(({ lang, level, pct }, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-white/80 text-sm font-semibold">{lang}</span>
                      <span className="text-white/35 text-xs">{level}</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }} viewport={{ once: true }}
                        className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-5 flex flex-col gap-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white/25 text-xs uppercase tracking-widest mb-1">Based in</p>
                <p className="text-white/70 text-sm font-medium">Vilnius, Lithuania</p>
                <p className="text-white/30 text-xs">Open to remote &amp; relocation</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
        );
      })()}

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Let's build something</h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Open to internships, collaborations, and full-time opportunities in data science and software engineering. Drop a message — I respond quickly.
            </p>
          </motion.div>

          <ContactForm 
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            handleSubmit={handleSubmit}
          />

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 mt-12"
          >
            <a
              href="https://github.com/ARJUNRAWAT-DEL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-violet-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/rwtarjun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-violet-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:arjunrawat4741@gmail.com"
              className="text-white/30 hover:text-violet-400 transition-colors"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowRight, Download, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { JapaneseColors, JapaneseShadows } from "../lib/japaneseColors";
import ProjectCard from "../components/ProjectCard";
import MagneticButton from "../components/MagneticButton";
import SkillCard from "../components/SkillCard";
import ExperienceCard from "../components/ExperienceCard";
import SectionHeader from "../components/SectionHeader";
import ContactForm from "../components/ContactForm";
import GradientAccent from "../components/GradientAccent";

// Lazy load heavy animation components
const FloatingParticles = dynamic(() => import("../components/FloatingParticles"), {
  loading: () => null,
  ssr: false
});

const Typewriter = dynamic(() => import("../components/Typewriter"), {
  loading: () => null,
  ssr: false
});

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Skills data
  const skills = [
    { name: "Python", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "SQL/NoSQL", level: 90, color: "from-green-500 to-emerald-500" },
    { name: "Machine Learning", level: 85, color: "from-purple-500 to-pink-500" },
    { name: "React/Next.js", level: 80, color: "from-blue-600 to-indigo-600" },
    { name: "Data Visualization", level: 85, color: "from-yellow-500 to-orange-500" },
    { name: "Google Cloud Platform", level: 75, color: "from-green-600 to-teal-600" },
  ];

  // Experience data
  const experiences = [
    {
      role: "Data Science Intern",
      company: "Labmentix",
      period: "July 2025 - November 2025, Remote",
      details: [
        "Learning and applying Machine Learning algorithms (supervised & unsupervised)",
        "Working with Python libraries: NumPy, Pandas, Scikit-learn",
        "Built forecasting, preprocessing and analysis model evaluation and optimization",
        "Built data visualization using Matplotlib and Seaborn"
      ],
      technologies: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
      emoji: "🚀"
    },
    {
      role: "IT Intern",
      company: "YARA FERTILIZERS INDIA Pvt. Ltd.",
      period: "June 2025 - October 2025, On-Site",
      details: [
        "Developed and deployed an AI-powered document assistant using FastAPI, PostgreSQL, and NLP",
        "Achieved 40% improvement in document search efficiency by 25%",
        "Built machine learning-based web application integrating multiple AI assistants",
        "Optimized debugging and deployment workflows for large-scale data processing"
      ],
      technologies: ["Python", "FastAPI", "PostgreSQL", "NLP", "Machine Learning"],
      emoji: "📊"
    },
    {
      role: "Big Data Engineering Trainee",
      company: "Accenture Baltics",
      period: "Jan 2024 - Feb 2024, Remote",
      details: [
        "Built data pipelines and performed data analysis using SQL",
        "Worked with Google Cloud Platform (GCP) for data engineering and cloud security",
        "Developed experience with Azure cloud platforms",
        "Built HDFs for distributed storage and Spark for large-scale data processing"
      ],
      technologies: ["SQL", "Google Cloud Platform", "Azure", "HDFS", "Spark"],
      emoji: "☁️"
    },
    {
      role: "Education",
      company: "Vilnius Gediminas Technical University",
      period: "2022-2026, Vilnius, Lithuania",
      details: [
        "Bachelor's in Information Technology",
        "Relevant coursework: Data Structures, Algorithms, Database Systems",
        "Focus on software development, data analysis, and modern IT solutions",
        "Active participation in tech projects and competitions"
      ],
      technologies: ["Computer Science", "Information Technology", "Software Engineering"],
      emoji: "🎓"
    }
  ];

  // Projects data
  const projects = [
    {
      title: "INTELLIDOC - AI Document Intelligence",
      description: "A comprehensive AI-powered document processing system that can analyze, extract, and summarize information from various document formats. Features advanced NLP capabilities and intelligent document classification.",
      tech: ["Python", "FastAPI", "NLP", "AI/ML", "Document Processing"],
      link: "https://github.com/ARJUNRAWAT-DEL/INTELLIDOC",
      emoji: "📄"
    },
    {
      title: "Multi-Agent Simulator Platform",
      description: "An advanced simulation platform where multiple AI agents collaborate and interact to solve complex problems. Features real-time agent coordination, task distribution, and performance monitoring.",
      tech: ["Python", "FastAPI", "AI/ML", "Multi-Agent Systems", "Real-time Simulation"],
      link: "https://github.com/ARJUNRAWAT-DEL/multi-agents-simulator-",
      emoji: "🤖"
    },
    {
      title: "Smart Retail Analytics Platform",
      description: "A comprehensive retail analytics solution using machine learning for sales forecasting, customer behavior analysis, and inventory optimization. Features interactive dashboards and predictive modeling.",
      tech: ["Python", "Machine Learning", "Data Analytics", "SQL", "Visualization"],
      link: "https://github.com/ARJUNRAWAT-DEL/Smart-Retail-Analytics-Platform",
      emoji: "📊"
    },
    {
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio website built with Next.js featuring advanced animations, 3D effects, and interactive components. Showcases projects, skills, and professional experience.",
      tech: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
      link: "https://github.com/ARJUNRAWAT-DEL/portfolio-",
      emoji: "💼"
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
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center py-20 relative z-10 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at center, ${JapaneseColors.sakuraPink}08 0%, ${JapaneseColors.matchaGreen}08 35%, transparent 70%)`
        }}
      >
        {/* Decorative gradient accents */}
        <GradientAccent position="top" size="lg" color="gradient" />
        <GradientAccent position="bottom" size="md" color="sakura" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl mx-auto px-4 relative z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="w-32 h-32 mx-auto rounded-full relative overflow-hidden border-4 shadow-2xl"
            style={{
              borderImage: `linear-gradient(135deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.gold}) 1`,
              boxShadow: JapaneseShadows.elevated
            }}
          >
            <img
              src="/arjun-profile.jpg"
              alt="Arjun Rawat"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = `linear-gradient(135deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.matchaGreen})`;
                  parent.className = "w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl relative overflow-hidden border-4 border-white/20 dark:border-gray-700/50";
                  parent.innerHTML = '<span class="relative z-10">🚀</span>';
                }
              }}
            />
            <div className="absolute inset-0 rounded-full opacity-30 blur-md animate-pulse" style={{ background: `linear-gradient(135deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.gold})` }}></div>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
            >
              Hello, I'm{" "}
              <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.matchaGreen}, ${JapaneseColors.gold})` }}>
                Arjun Rawat
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              <span className="bg-gradient-to-r bg-clip-text text-transparent font-semibold" style={{ backgroundImage: `linear-gradient(90deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.gold})`, display: 'block' }}>
                <Typewriter 
                  words={[
                    "Data Science & AI/ML Enthusiast",
                    "Software Developer", 
                    "Tech Innovator",
                    "Problem Solver",
                    "Cloud Engineer"
                  ]}
                  className="bg-gradient-to-r bg-clip-text text-transparent font-semibold"
                />
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 px-8 py-4 text-white rounded-full font-semibold transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.gold})`,
                boxShadow: JapaneseShadows.medium
              }}
            >
              <span>View My Work</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.a
              href="/arjun_rawat_resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-8 py-4 backdrop-blur-sm text-gray-900 dark:text-white rounded-full font-semibold transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: `1.5px solid ${JapaneseColors.sakuraPink}40`,
                boxShadow: JapaneseShadows.subtle
              }}
            >
              <Download size={20} />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 sm:space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.matchaGreen}, ${JapaneseColors.gold})` }}>
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium">
              I'm a passionate Data Science & AI/ML Enthusiast and Software Developer, dedicated to creating innovative solutions that bridge technology and real-world impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="max-w-sm mx-auto mb-8">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    scale: { duration: 0.8, delay: 0.4 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 15,
                    transition: { duration: 0.3 }
                  }}
                  className="w-64 h-64 mx-auto rounded-full overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.matchaGreen})` }}
                >
                  <img
                    src="/arjun-profile.jpg"
                    alt="Arjun Rawat - Professional"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.background = `linear-gradient(135deg, ${JapaneseColors.sakuraPink}, ${JapaneseColors.matchaGreen})`;
                        parent.className = "w-64 h-64 mx-auto rounded-full flex items-center justify-center text-6xl shadow-2xl border-8 border-white dark:border-gray-800";
                        parent.innerHTML = '<span class="relative z-10 text-white">🚀</span>';
                      }
                    }}
                  />
                </motion.div>
                <div className="absolute inset-0 rounded-full blur-2xl -z-10" style={{ background: `linear-gradient(135deg, ${JapaneseColors.sakuraPink}30, ${JapaneseColors.matchaGreen}30)` }}></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.p variants={itemVariants} className="text-gray-800 dark:text-gray-100 text-lg sm:text-xl leading-relaxed font-medium">
              With a strong foundation in Information Technology and comprehensive experience in data science, I specialize in transforming complex data into actionable insights and building scalable software solutions.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-gray-800 dark:text-gray-100 text-lg sm:text-xl leading-relaxed font-medium">
              Currently pursuing my degree at Vilnius Gediminas Technical University, I combine academic excellence with practical experience gained through internships and hands-on projects in machine learning, data analysis, and full-stack development.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-800 dark:text-gray-100 text-lg sm:text-xl leading-relaxed font-medium">
              My passion lies in leveraging cutting-edge technologies like Python, Machine Learning, and Cloud Platforms to create intelligent systems that drive business value and solve complex challenges.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <SectionHeader 
              subtitle="Core Competencies"
              title="Technical Skills"
              description="Technologies and tools I work with"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader 
            subtitle="My Journey"
            title="Experience & Education"
            description="My path through internships, education, and professional development"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 relative"
          >
            {/* Timeline line */}
            <div className="absolute left-3.5 top-0 bottom-0 w-1 hidden md:block" style={{
              background: `linear-gradient(to-b, ${JapaneseColors.sakuraPink}, ${JapaneseColors.matchaGreen}, ${JapaneseColors.gold})`
            }} />

            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                {...exp}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader 
            subtitle="My Work"
            title="Featured Projects"
            description="A collection of my latest work in AI/ML, web development, and data science"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
          <SectionHeader 
            subtitle="Let's Connect"
            title="Get In Touch"
            description="Ready to collaborate on your next project? Let's create something amazing together!"
          />

          <ContactForm 
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            handleSubmit={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
}

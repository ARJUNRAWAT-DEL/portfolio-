"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Download, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import ProjectCard from "../components/ProjectCard";

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
        "Bachelor's in Cybersecurity Engineering",
        "Relevant coursework: Data Structures, Algorithms, Database Systems",
        "Focus on cybersecurity, software development, and data analysis",
        "Active participation in tech projects and competitions"
      ],
      technologies: ["Computer Science", "Cybersecurity", "Software Engineering"],
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
    <div className="space-y-0">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="w-32 h-32 mx-auto rounded-full relative overflow-hidden border-4 border-gradient-to-r from-cyan-400 to-purple-600 shadow-2xl"
          >
            <img
              src="/arjun-profile.jpg"
              alt="Arjun Rawat"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.className = "w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl relative overflow-hidden border-4 border-white/20 dark:border-gray-700/50";
                  parent.innerHTML = '<span class="relative z-10">🚀</span>';
                }
              }}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 opacity-30 blur-md animate-pulse"></div>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
            >
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Arjun Rawat
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Data Analyst with AI/ML • Software Developer • Big Data Engineering
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View My Work</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="/arjun_rawat_resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-full font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 sm:space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate Data Analyst and Software Developer with expertise in AI/ML, specializing in creating intelligent solutions that solve real-world problems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="relative">
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 dark:border-gray-700/50">
                  <img
                    src="/arjun-profile.jpg"
                    alt="Arjun Rawat - Professional"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.className = "w-full h-64 sm:h-80 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-6xl shadow-2xl border-4 border-white/10 dark:border-gray-700/50";
                        parent.innerHTML = '<span class="relative z-10">🚀</span>';
                      }
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-600/20 blur-xl"></div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                With a strong foundation in cybersecurity engineering and hands-on experience in data science, I bridge the gap between technical innovation and practical business solutions.
              </motion.p>
              
              <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                Currently pursuing my degree at Vilnius Gediminas Technical University while gaining real-world experience through internships at leading companies like YARA Fertilizers and Labmentix.
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Technical Skills</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Experience & Education
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My journey through internships, education, and professional development
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {exp.emoji}
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-cyan-600 dark:text-cyan-400 font-semibold text-base sm:text-lg">
                        {exp.company}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        {exp.period}
                      </p>
                    </div>
                    
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-cyan-500 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-purple-100 dark:from-cyan-900/30 dark:to-purple-900/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm rounded-full border border-cyan-200 dark:border-cyan-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A collection of my latest work in AI/ML, web development, and data science
            </p>
          </motion.div>

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
      <section id="contact" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's create something amazing together!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  I'm always interested in new opportunities, interesting projects, or just a friendly chat about technology and innovation.
                </p>
              </div>

              <div className="space-y-4">
                <motion.a
                  href="mailto:arjun.rawat@stud.vilniustech.lt"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <Mail className="text-cyan-500" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">arjun.rawat@stud.vilniustech.lt</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/ARJUNRAWAT-DEL"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <Github className="text-gray-800 dark:text-white" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">GitHub</p>
                    <p className="text-gray-600 dark:text-gray-300">@ARJUNRAWAT-DEL</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/rwtarjun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <Linkedin className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">LinkedIn</p>
                    <p className="text-gray-600 dark:text-gray-300">@rwtarjun</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-center ${
                      submitMessage.includes('success') || submitMessage.includes('sent')
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";

export default function Projects() {
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
      link: "https://github.com/ARJUNRAWAT-DEL/multi-agents-simulator",
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
      link: "https://github.com/ARJUNRAWAT-DEL/portfolio",
      emoji: "💼"
    },
    {
      title: "Git Workflow Demonstration",
      description: "A comprehensive demonstration project showcasing advanced Git workflows, branching strategies, and collaboration techniques. Perfect for learning version control best practices.",
      tech: ["Git", "GitHub", "Version Control", "Documentation", "Best Practices"],
      link: "https://github.com/ARJUNRAWAT-DEL/git-demo",
      emoji: "🔧"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="space-y-12 py-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Here are some of the projects I've built, showcasing my skills in data analysis,
          AI/ML, big data engineering, and software development.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, i) => (
          <motion.div key={i} variants={itemVariants}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
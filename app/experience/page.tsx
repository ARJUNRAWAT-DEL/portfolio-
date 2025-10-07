"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "IT Intern",
    company: "YARA FERTILIZERS INDIA Pvt. Ltd.",
    period: "June 2024 - Sep 2024, On-Site",
    details: [
      "Developed and deployed an AI-powered document assistant using FastAPI, PostgreSQL, and NLP",
      "Achieved 40% improvement in document search efficiency by 25%",
      "Built machine learning-based web application integrating multiple AI assistants",
      "Optimized debugging and deployment workflows for large-scale data processing"
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "NLP", "Machine Learning"],
    emoji: "🚀"
  },
  {
    role: "Data Science Intern",
    company: "Labmentix",
    period: "July 2024 - Present, Remote",
    details: [
      "Learning and applying Machine Learning algorithms (supervised & unsupervised)",
      "Working with Python libraries: NumPy, Pandas, Scikit-learn",
      "Built forecasting, preprocessing and analysis model evaluation and optimization",
      "Built data visualization using Matplotlib and Seaborn"
    ],
    technologies: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
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
      "Information Technology specialization in software development",
      "Networking, Web Technologies, Network principles",
      "Focus on modern development frameworks and cloud technologies",
      "Strong foundation in algorithms and data structures"
    ],
    technologies: ["Software Development", "Networking", "Web Technologies", "Cloud"],
    emoji: "🎓"
  }
];

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Experience
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          My professional journey and the projects that shaped my development skills
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 hidden md:block"></div>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative flex items-start space-x-6"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.3 + 0.5, type: "spring" }}
                className="relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg"
              >
                {exp.emoji}
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 + 0.7 }}
                className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-indigo-400 mb-1">
                      {exp.role}
                    </h2>
                    <p className="text-lg text-gray-300 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 + 0.9 + idx * 0.1 }}
                      className="flex items-start space-x-2 text-gray-300"
                    >
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.3 + 1.2 + idx * 0.1 }}
                      className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/50"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
      >
        {[
          { number: "4+", label: "Years Learning", icon: "📚" },
          { number: "10+", label: "Projects Built", icon: "🚀" },
          { number: "5+", label: "Technologies", icon: "⚡" },
          { number: "∞", label: "Learning", icon: "🎯" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-indigo-400">{stat.number}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

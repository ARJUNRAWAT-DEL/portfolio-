"use client";
import { motion } from "framer-motion";

export default function About() {
  const skills = [
    { name: "Python", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "SQL/NoSQL", level: 90, color: "from-green-500 to-emerald-500" },
    { name: "Machine Learning", level: 85, color: "from-purple-500 to-pink-500" },
    { name: "React/Next.js", level: 80, color: "from-blue-600 to-indigo-600" },
    { name: "Data Visualization", level: 85, color: "from-yellow-500 to-orange-500" },
    { name: "Google Cloud Platform", level: 75, color: "from-green-600 to-teal-600" },
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
          About Me
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Main content */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Personal info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl"
            >
              👨‍💻
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-100">
              Hi, I&apos;m Arjun Rawat
            </h2>
            <p className="text-xl text-indigo-400 font-semibold">
              Data Analyst with AI/ML & Software Development
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 text-gray-300 leading-relaxed"
          >
            <p>
              I&apos;m a passionate Data Analyst and Software Developer with expertise in AI/ML,
              currently studying Information Technology at Vilnius Gediminas Technical University.
              My journey combines data science, machine learning, and full-stack development
              to create innovative solutions.
            </p>
            <p>
              With experience at leading companies like YARA FERTILIZERS INDIA and Accenture,
              I specialize in developing AI-powered applications, optimizing data workflows,
              and building scalable cloud solutions. I&apos;m passionate about leveraging technology
              to solve complex problems and drive business value.
            </p>
          </motion.div>
        </motion.div>

        {/* Right side - Skills */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Skills & Technologies</h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <motion.div key={index} variants={itemVariants} className="space-y-3">
                <div className="flex justify-between items-center">
                  <motion.span 
                    className="text-gray-300 font-medium"
                    whileHover={{ color: "#60a5fa", scale: 1.05 }}
                  >
                    {skill.name}
                  </motion.span>
                  <motion.span 
                    className="text-indigo-400 font-semibold px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-gray-600/30">
                    <motion.div
                      initial={{ width: 0, x: -100 }}
                      animate={{ width: `${skill.level}%`, x: 0 }}
                      transition={{ 
                        delay: 1 + index * 0.15, 
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)"
                      }}
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 2 + index * 0.2
                        }}
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                        }}
                      />
                    </motion.div>
                  </div>
                  {/* Floating skill particles */}
                  <motion.div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1.5 + index * 0.1
                    }}
                  >
                    {index === 0 && "🐍"}
                    {index === 1 && "🗃️"}
                    {index === 2 && "🤖"}
                    {index === 3 && "⚛️"}
                    {index === 4 && "📊"}
                    {index === 5 && "☁️"}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Fun facts section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <motion.h3 
          className="text-3xl font-bold text-center text-gray-100 mb-8 relative"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% auto"
            }}
          >
            Fun Facts About Me
          </motion.span>
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {[
            { 
              icon: "☕", 
              title: "Coffee & Code", 
              desc: "3+ cups daily fuel my coding sessions",
              color: "from-yellow-500 to-orange-500",
              hoverColor: "hover:from-yellow-400 hover:to-orange-400"
            },
            { 
              icon: "🎵", 
              title: "Music Flow", 
              desc: "Lo-fi beats to deep house - code flows better with rhythm",
              color: "from-purple-500 to-pink-500",
              hoverColor: "hover:from-purple-400 hover:to-pink-400"
            },
            { 
              icon: "🚀", 
              title: "Learning Mindset", 
              desc: "Always exploring new AI/ML frontiers and data patterns",
              color: "from-blue-500 to-cyan-500",
              hoverColor: "hover:from-blue-400 hover:to-cyan-400"
            }
          ].map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.08,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                y: -5
              }}
              className={`text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br ${fact.color} ${fact.hoverColor} transition-all duration-300 cursor-pointer relative overflow-hidden group`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
                  backgroundSize: "20px 20px"
                }}
              />

              <motion.div 
                className="text-5xl relative z-10"
                animate={{
                  rotate: [0, 10],
                  scale: [1, 1.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                {fact.icon}
              </motion.div>

              <motion.h4 
                className="font-bold text-white text-lg relative z-10"
                whileHover={{ scale: 1.05 }}
              >
                {fact.title}
              </motion.h4>

              <motion.p 
                className="text-white/90 text-sm leading-relaxed relative z-10"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {fact.desc}
              </motion.p>

              {/* Floating particles */}
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
              <motion.div
                className="absolute bottom-3 left-3 w-1 h-1 bg-white/40 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.4
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

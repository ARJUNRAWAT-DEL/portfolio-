"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating particles data - only create after client mount
  const particles = isClient ? Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    duration: 3 + Math.random() * 2,
    size: 8 + Math.random() * 16,
    initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
    initialY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
  })) : [];
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Animated Background Particles */}
      {isClient && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full opacity-20"
          animate={{
            x: [particle.initialX, particle.initialX + 100],
            y: [particle.initialY, particle.initialY - 100],
            scale: [1, 1.5],
            opacity: [0.2, 0.6],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
            ease: "easeInOut"
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      {/* Mouse follower */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full pointer-events-none z-50 opacity-50 blur-sm"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="lg:w-1/2 text-center lg:text-left space-y-6 relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Profile Circle */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            boxShadow: isHovered 
              ? "0 0 50px rgba(99, 102, 241, 0.5), 0 0 100px rgba(139, 92, 246, 0.3)"
              : "0 0 30px rgba(99, 102, 241, 0.3)"
          }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 }
          }}
          className="w-32 h-32 mx-auto lg:mx-0 mb-6 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center text-4xl relative overflow-hidden cursor-pointer"
        >
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              backgroundSize: "200% 200%"
            }}
          />
          <span className="relative z-10">👨‍💻</span>
        </motion.div>

        {/* Name with typing effect */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl lg:text-6xl font-bold"
        >
          Hi, I'm{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(99, 102, 241, 0.5)"
            }}
          >
            Arjun Rawat
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg opacity-20 blur"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.span>
        </motion.h1>

        {/* Animated subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 relative"
        >
          <motion.span
            animate={{
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            style={{
              backgroundSize: "200% auto"
            }}
          >
            Data Analyst with AI/ML | Software Developer | Big Data Engineering
          </motion.span>
        </motion.div>

        {/* Enhanced Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <motion.a
            href="/projects"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full text-white font-semibold shadow-lg relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View Projects ✨</span>
          </motion.a>
          
          <motion.a
            href="/contact"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(99, 102, 241, 0.8)",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-gray-400 rounded-full hover:bg-gray-700 transition-all duration-300 font-semibold relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Contact Me 📧</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Enhanced Right Side with 3D Elements */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotateY: -30 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="lg:w-1/2 relative hidden lg:block"
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-96 h-96 mx-auto">
          {/* Central 3D Rotating Cube */}
          <motion.div
            animate={{ 
              rotateY: 360,
              rotateX: [0, 10]
            }}
            transition={{ 
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-32 h-32" style={{ transformStyle: "preserve-3d" }}>
              {/* Cube faces */}
              {[
                { transform: "translateZ(64px)", bg: "from-indigo-500 to-purple-600", icon: "💻" },
                { transform: "rotateY(90deg) translateZ(64px)", bg: "from-purple-500 to-pink-600", icon: "📊" },
                { transform: "rotateY(180deg) translateZ(64px)", bg: "from-pink-500 to-red-600", icon: "🤖" },
                { transform: "rotateY(-90deg) translateZ(64px)", bg: "from-blue-500 to-indigo-600", icon: "☁️" },
                { transform: "rotateX(90deg) translateZ(64px)", bg: "from-green-500 to-blue-600", icon: "🚀" },
                { transform: "rotateX(-90deg) translateZ(64px)", bg: "from-yellow-500 to-orange-600", icon: "⚡" },
              ].map((face, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-32 h-32 bg-gradient-to-br ${face.bg} flex items-center justify-center text-4xl border border-white/20 backdrop-blur-sm`}
                  style={{ transform: face.transform }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span>{face.icon}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Orbiting Elements */}
          {[
            { delay: 0, color: "indigo", icon: "🔍", size: "w-16 h-16", radius: 120 },
            { delay: 2, color: "purple", icon: "📊", size: "w-12 h-12", radius: 140 },
            { delay: 4, color: "pink", icon: "⚡", size: "w-14 h-14", radius: 160 },
            { delay: 6, color: "cyan", icon: "🤖", size: "w-10 h-10", radius: 180 },
          ].map((orbit, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{
                duration: 15 + index * 5,
                repeat: Infinity,
                ease: "linear",
                delay: orbit.delay
              }}
            >
              <motion.div
                className={`${orbit.size} bg-gradient-to-br from-${orbit.color}-500/30 to-${orbit.color}-600/30 rounded-full backdrop-blur-sm border border-${orbit.color}-400/30 flex items-center justify-center`}
                style={{
                  marginTop: `-${orbit.radius}px`
                }}
                whileHover={{ scale: 1.3 }}
                animate={{
                  y: [0, -10, 0],
                  boxShadow: [
                    `0 0 10px rgba(99, 102, 241, 0.3)`,
                    `0 0 20px rgba(139, 92, 246, 0.5)`,
                    `0 0 10px rgba(99, 102, 241, 0.3)`
                  ]
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="text-lg">{orbit.icon}</span>
              </motion.div>
            </motion.div>
          ))}

          {/* Floating Code Snippets */}
          {[
            { code: "const ai = 'ML'", x: -50, y: -40, delay: 1 },
            { code: "data++", x: 60, y: -60, delay: 2 },
            { code: "python.run()", x: -70, y: 40, delay: 3 },
            { code: "SQL.query()", x: 80, y: 60, delay: 4 },
          ].map((snippet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1],
                scale: [0, 1],
                y: [snippet.y, snippet.y - 60]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-lg text-green-400 font-mono text-sm border border-green-400/30"
              style={{
                left: `calc(50% + ${snippet.x}px)`,
                top: `calc(50% + ${snippet.y}px)`
              }}
            >
              {snippet.code}
            </motion.div>
          ))}

          {/* Background Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

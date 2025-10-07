"use client";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MessageCircle, MapPin } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "arjunrawat4741@gmail.com",
      href: "mailto:arjunrawat4741@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@ARJUNRAWAT-DEL",
      href: "https://github.com/ARJUNRAWAT-DEL",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Arjun Rawat",
      href: "https://www.linkedin.com/in/rwtarjun/",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Vilnius, Lithuania",
      href: "#",
      color: "from-green-500 to-emerald-500"
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl"
        >
          📧
        </motion.div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Have a project in mind or just want to chat about technology?
          I&apos;d love to hear from you! Let&apos;s create something amazing together.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-indigo-400" />
              Send a Message
            </h2>

            <form className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-gray-300 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600/50 focus:border-indigo-500/50 outline-none text-gray-100 placeholder-gray-400 transition-all duration-300 focus:bg-gray-700/70"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-gray-300 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600/50 focus:border-indigo-500/50 outline-none text-gray-100 placeholder-gray-400 transition-all duration-300 focus:bg-gray-700/70"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-gray-300 font-medium">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project or just say hi! 👋"
                  required
                  className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600/50 focus:border-indigo-500/50 outline-none text-gray-100 placeholder-gray-400 transition-all duration-300 focus:bg-gray-700/70 resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-8"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-indigo-400" />
              Contact Information
            </h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <motion.a
                    key={index}
                    variants={itemVariants}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ 
                      scale: 1.05, 
                      x: 10,
                      boxShadow: "0 15px 35px rgba(99, 102, 241, 0.2)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-4 p-5 rounded-2xl bg-gradient-to-r from-gray-700/20 via-gray-700/30 to-gray-700/20 hover:from-gray-600/30 hover:via-gray-600/40 hover:to-gray-600/30 backdrop-blur-sm border border-gray-600/30 hover:border-indigo-500/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "linear-gradient(90deg, rgba(99,102,241,0.05), rgba(139,92,246,0.05), rgba(236,72,153,0.05))",
                          "linear-gradient(180deg, rgba(139,92,246,0.05), rgba(236,72,153,0.05), rgba(99,102,241,0.05))",
                          "linear-gradient(270deg, rgba(236,72,153,0.05), rgba(99,102,241,0.05), rgba(139,92,246,0.05))",
                          "linear-gradient(360deg, rgba(99,102,241,0.05), rgba(139,92,246,0.05), rgba(236,72,153,0.05))"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <motion.div 
                      className={`p-4 rounded-2xl bg-gradient-to-br ${contact.color} shadow-lg relative overflow-hidden`}
                      whileHover={{ 
                        rotate: [0, -5],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.5, type: "tween" }}
                    >
                      {/* Icon shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                      <IconComponent className="w-6 h-6 text-white relative z-10" />
                    </motion.div>

                    <div className="text-left flex-1 relative z-10">
                      <motion.p 
                        className="text-gray-400 text-sm font-medium"
                        whileHover={{ color: "#a5b4fc" }}
                      >
                        {contact.label}
                      </motion.p>
                      <motion.p 
                        className="text-gray-200 font-semibold group-hover:text-indigo-300 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        {contact.value}
                      </motion.p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="text-indigo-400 opacity-0 group-hover:opacity-100"
                      animate={{
                        x: [0, 5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    >
                      →
                    </motion.div>

                    {/* Floating particles */}
                    <motion.div
                      className="absolute top-2 right-2 w-1 h-1 bg-indigo-400/50 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Quick Response */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20"
          >
            <h3 className="text-lg font-semibold text-indigo-300 mb-2">Quick Response</h3>
            <p className="text-gray-300 text-sm">
              I typically respond to messages within 24 hours. For urgent inquiries,
              feel free to reach out via LinkedIn or email.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-100">
          Let&apos;s Build Something Amazing Together! 🚀
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Whether you have a project in mind, need technical consultation,
          or just want to discuss the latest in tech - I&apos;m always excited to connect!
        </p>
      </motion.div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from "lucide-react";

interface ContactFormProps {
  formData: { name: string; email: string; message: string };
  setFormData: (data: any) => void;
  isSubmitting: boolean;
  submitMessage: string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function ContactForm({
  formData,
  setFormData,
  isSubmitting,
  submitMessage,
  handleSubmit,
}: ContactFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
    },
    blur: {
      scale: 1,
      boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
    },
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Get In Touch
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Have a question or want to collaborate? I'd love to hear from you. Drop me a message!
          </p>
        </div>

        {/* Contact details */}
        {[
          {
            icon: Mail,
            label: "Email",
            value: "arjunrawat4741@gmail.com",
            href: "mailto:arjunrawat4741@gmail.com",
          },
          {
            icon: Phone,
            label: "Phone",
            value: "+370 62723604",
            href: "tel:+37062723604",
          },
          {
            icon: MapPin,
            label: "Location",
            value: "Vilnius, Lithuania",
            href: null,
          },
        ].map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
              className="flex gap-4 cursor-pointer"
            >
              <div className="flex-shrink-0">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-cyan-400/30"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <Icon size={24} className="text-cyan-400" />
                </motion.div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{contact.label}</p>
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="font-semibold text-gray-900 dark:text-white hover:text-cyan-400 transition-colors"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {contact.value}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <motion.div
            variants={inputVariants}
            animate={focusedField === "name" ? "focus" : "blur"}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="Arjun Rawat"
              className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div
            variants={inputVariants}
            animate={focusedField === "email" ? "focus" : "blur"}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all"
            />
          </motion.div>

          {/* Message Input */}
          <motion.div
            variants={inputVariants}
            animate={focusedField === "message" ? "focus" : "blur"}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              placeholder="Tell me about your project or idea..."
              rows={4}
              className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all resize-none"
            />
          </motion.div>

          {/* Status Message */}
          <AnimatePresence>
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  submitMessage.includes("successfully")
                    ? "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30"
                }`}
              >
                {submitMessage.includes("successfully") ? (
                  <Check size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <span className="text-sm">{submitMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ⚙️
                  </motion.span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

// For AnimatePresence
import { AnimatePresence } from "framer-motion";

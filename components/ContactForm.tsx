"use client";
import { motion, AnimatePresence } from "framer-motion";
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

  const inputBase =
    "w-full px-0 py-3 bg-transparent text-white placeholder-white/20 focus:outline-none transition-colors text-sm font-light";

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div>
          <h3 className="text-3xl font-light text-white mb-3">Get In Touch</h3>
          <p className="text-white/40 font-light text-sm leading-relaxed">
            Open to internships, collaborations, and full-time opportunities. Drop a message — I respond quickly.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { icon: Mail,    label: "Email",    value: "arjunrawat4741@gmail.com", href: "mailto:arjunrawat4741@gmail.com" },
            { icon: Phone,   label: "Phone",    value: "+370 62723604",            href: "tel:+37062723604"               },
            { icon: MapPin,  label: "Location", value: "Vilnius, Lithuania",       href: null                             },
          ].map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon size={15} className="text-white/40" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/25 font-light mb-1">{contact.label}</p>
                  {contact.href ? (
                    <a href={contact.href} className="text-white/70 hover:text-white transition-colors text-sm font-light">
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-white/70 text-sm font-light">{contact.value}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div style={{ borderBottom: `1px solid ${focusedField === 'name' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)'}`, transition: 'border-color 0.2s' }}>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 font-light mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="Your name"
              className={inputBase}
            />
          </div>

          {/* Email */}
          <div style={{ borderBottom: `1px solid ${focusedField === 'email' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)'}`, transition: 'border-color 0.2s' }}>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 font-light mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="your@email.com"
              className={inputBase}
            />
          </div>

          {/* Message */}
          <div style={{ borderBottom: `1px solid ${focusedField === 'message' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)'}`, transition: 'border-color 0.2s' }}>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 font-light mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              placeholder="Tell me about your project or idea..."
              rows={4}
              className={`${inputBase} resize-none`}
            />
          </div>

          {/* Status */}
          <AnimatePresence>
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`flex items-center gap-2 p-3 text-sm font-light ${
                  submitMessage.includes("successfully")
                    ? "text-white/70"
                    : "text-white/50"
                }`}
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {submitMessage.includes("successfully") ? <Check size={14} /> : <AlertCircle size={14} />}
                <span>{submitMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-4 bg-white text-black text-sm font-medium tracking-wide transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="text-black/60">Sending...</span>
            ) : (
              <>
                <Send size={14} />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

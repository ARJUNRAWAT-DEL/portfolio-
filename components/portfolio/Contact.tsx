"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { profile } from "@/lib/portfolio";
export default function Contact() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setStatus("");
    setSuccess(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await res.json();
      setSuccess(res.ok);
      setStatus(result.message || result.error || "Please email me directly.");
      if (res.ok) form.reset();
    } catch {
      setStatus(
        "The message could not be sent. Please use the email link beside this form.",
      );
    } finally {
      setPending(false);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus(`Copy unavailable. Email: ${profile.email}`);
    }
  }
  return (
    <div className="contact-layout">
      <div className="parcel contact-parcel">
        <div className="hazard" />
        <div className="parcel-top mono">
          <span>PKG_07 OUTBOUND MESSAGE</span>
          <span>handle with care</span>
        </div>
        <form className="shipping-label contact-label" onSubmit={submit}>
          <div className="contact-to">
            <span className="mono">TO</span>
            <div>
              <strong>Arjun Rawat</strong>
              <p className="mono">Würzburg, Germany</p>
            </div>
          </div>
          <label className="label-row">
            <span>FROM</span>
            <input
              name="name"
              placeholder="Your name"
              required
              maxLength={100}
              autoComplete="name"
            />
          </label>
          <label className="label-row">
            <span>RETURN</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              maxLength={254}
              autoComplete="email"
            />
          </label>
          <label className="label-row">
            <span>RE</span>
            <input
              name="subject"
              placeholder="Subject (optional)"
              maxLength={160}
            />
          </label>
          <label className="label-row">
            <span>CONTENTS</span>
            <textarea
              name="message"
              placeholder="Your message…"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="label-bottom">
            <div className="barcode" />
            <button className="ship-button" type="submit" disabled={pending}>
              {pending ? "SENDING…" : "SHIP IT"} <Send size={15} />
            </button>
          </div>
          {status && (
            <p
              className={`form-status ${success ? "success" : "error"}`}
              role="status"
            >
              {status}
            </p>
          )}
          <p className="privacy-note">
            Your message is used only to respond to your enquiry.
          </p>
        </form>
      </div>
      <div className="direct-lines">
        <p className="eyebrow">DIRECT LINES</p>
        <div className="direct-link">
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} />
            <span>{profile.email}</span>
          </a>
          <button
            aria-label={copied ? "Email copied" : "Copy email address"}
            onClick={copy}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
        <a
          className="direct-link"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={18} />
          <span>GitHub</span>
          <ArrowUpRight size={16} />
        </a>
        <a
          className="direct-link"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={18} />
          <span>LinkedIn</span>
          <ArrowUpRight size={16} />
        </a>
        <dl className="contact-info">
          <div>
            <dt>BASED IN</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>AVAILABILITY</dt>
            <dd>Up to 20 hours / week</dd>
          </div>
          <div>
            <dt>LOOKING FOR</dt>
            <dd>Werkstudent · AI, data & software</dd>
          </div>
        </dl>
        <div className="contact-note">
          <span className="status-dot" /> Open to conversations
          <p>
            Have a project, research idea or student role in mind? I’d love to
            hear about it.
          </p>
        </div>
      </div>
    </div>
  );
}

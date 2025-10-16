"use client";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Arjun Rawat
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-lg">
          <Link href="/" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300">
            About
          </Link>
          <Link href="/experience" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300">
            Experience
          </Link>
          <Link href="/contact" className="text-gray-200 hover:text-cyan-400 transition-colors duration-300">
            Contact
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-200 hover:text-cyan-400 focus:outline-none focus:text-cyan-400 transition-colors duration-300"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-md border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/experience"
              className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

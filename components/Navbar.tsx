"use client";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          My Portfolio
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-lg">
          <Link href="/" className="hover:text-indigo-500 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-indigo-500 transition-colors">
            About
          </Link>
          <Link href="/experience" className="hover:text-indigo-500 transition-colors">
            Experience
          </Link>
          <Link href="/contact" className="hover:text-indigo-500 transition-colors">
            Contact
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 focus:outline-none focus:text-indigo-500"
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
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/experience"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
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

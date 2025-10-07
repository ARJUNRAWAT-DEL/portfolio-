"use client";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          My Portfolio
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center text-lg">
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
      </div>
    </nav>
  );
}

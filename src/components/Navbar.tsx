"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "skills", "projects", "experience", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center justify-between gap-6 md:gap-12 px-6 py-2.5 rounded-full border border-white/[0.08] backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-black/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/[0.12]"
            : "bg-black/60 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        }`}
      >
        {/* Brand / Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2 font-bold text-sm tracking-tight text-white hover:text-white/90 transition-colors"
        >
          <img
            src="/logo.webp"
            alt="logo"
            className="w-5 h-5 object-contain rounded-full"
          />
          <span>thejan.dev</span>
        </Link>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 text-xs md:text-sm font-medium transition-all rounded-full ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

"use client";

import React, { useState } from "react";
import { Mail, Send, Github, MessageSquare, ArrowUpRight, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "contact@thejan.dev";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: "Telegram",
      href: "https://t.me/Thejan_GO",
      handle: "@Thejan_GO",
      icon: Send,
      color: "hover:border-sky-500 hover:text-sky-400",
    },
    {
      name: "GitHub",
      href: "https://github.com/thejan64go",
      handle: "thejan64go",
      icon: Github,
      color: "hover:border-neutral-400 hover:text-white",
    },
    {
      name: "Email",
      href: `mailto:${email}`,
      handle: email,
      icon: Mail,
      color: "hover:border-amber-500 hover:text-amber-400",
    },
  ];

  return (
    <footer id="contact" className="pt-24 pb-12 bg-black border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Contact Banner */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Let's build something extraordinary together.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-sm md:text-base leading-relaxed"
          >
            Whether you have an upcoming web project, AI automation idea, or just want to connect, feel free to reach out.
          </motion.p>
        </div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-20">
          {socials.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group flex items-center justify-between p-5 bg-[#111111]/80 hover:bg-[#181818] border border-white/[0.08] ${s.color} rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.3)]`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{s.name}</h4>
                    <p className="text-xs text-neutral-400">{s.handle}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </motion.a>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Thejan GO. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-neutral-300 transition-colors">
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

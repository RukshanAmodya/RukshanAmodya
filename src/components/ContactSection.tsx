"use client";

import React, { useState } from "react";
import { Mail, Globe, Laptop, Send, Github, Linkedin, Twitter, Flame, Activity, Trophy, Star, GitFork, Check } from "lucide-react";
import { motion } from "framer-motion";
import LottiePlayer from "./LottiePlayer";

// Generate realistic GitHub contribution matrix (52 weeks x 7 days)
function generateContributionData() {
  const weeks = 50;
  const days = 7;
  const grid: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      // Create realistic cluster pattern towards later months
      const weight = w / weeks;
      const rand = Math.random();
      if (rand < 0.25 - weight * 0.15) {
        week.push(0); // empty
      } else if (rand < 0.55) {
        week.push(1); // light green
      } else if (rand < 0.8) {
        week.push(2); // medium green
      } else if (rand < 0.94) {
        week.push(3); // dark bright green
      } else {
        week.push(4); // brightest green
      }
    }
    grid.push(week);
  }
  return grid;
}

const contributionGrid = generateContributionData();
const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

const greenLevels = [
  "bg-[#161b22] border-white/[0.04]", // 0
  "bg-[#0e4429] border-[#006d32]/30", // 1
  "bg-[#006d32] border-[#26a641]/40", // 2
  "bg-[#26a641] border-[#39d353]/50", // 3
  "bg-[#39d353] border-[#39d353]/80 shadow-[0_0_8px_rgba(57,211,83,0.5)]", // 4
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <footer id="contact" className="pt-24 pb-16 bg-black border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3.5"
          >
            <div className="w-14 h-14 shrink-0">
              <LottiePlayer src="/animations/skills.json" className="w-full h-full" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">
                GET IN TOUCH
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Let's Work Together
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Top 2-Column Grid: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-16">
          {/* Left Column: Let's Connect & Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Let's Connect
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
                I'm always open for new opportunities, collaborations, or just a
                friendly conversation about tech and AI.
              </p>
            </div>

            {/* Contact Info Items */}
            <div className="space-y-3.5 pt-2">
              {/* Email */}
              <a
                href="mailto:thejan64go@gmail.com"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0e0e0e] hover:bg-[#161616] border border-white/[0.08] hover:border-white/[0.2] transition-all group max-w-md"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300 group-hover:text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 font-medium">Email</p>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    thejan64go@gmail.com
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0e0e0e] border border-white/[0.08] max-w-md">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-white">Sri Lanka</p>
                </div>
              </div>

              {/* Portfolio */}
              <a
                href="https://thejan.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0e0e0e] hover:bg-[#161616] border border-white/[0.08] hover:border-white/[0.2] transition-all group max-w-md"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300 group-hover:text-white shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 font-medium">Portfolio</p>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    thejan.dev
                  </p>
                </div>
              </a>
            </div>

            {/* Social Buttons Row */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://t.me/Thejan_GO"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0e0e0e] hover:bg-neutral-800 border border-white/[0.08] hover:border-sky-500/50 flex items-center justify-center text-neutral-300 hover:text-sky-400 transition-all hover:scale-105 shadow-md"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/thejan64go"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0e0e0e] hover:bg-neutral-800 border border-white/[0.08] hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all hover:scale-105 shadow-md"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0e0e0e] hover:bg-neutral-800 border border-white/[0.08] hover:border-blue-500/50 flex items-center justify-center text-neutral-300 hover:text-blue-400 transition-all hover:scale-105 shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0e0e0e] hover:bg-neutral-800 border border-white/[0.08] hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all hover:scale-105 shadow-md"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Floating Dino */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Floating Greeting Mascot on top-right of form */}
            <div className="absolute -top-12 right-2 sm:right-6 w-20 h-20 pointer-events-none z-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
              <LottiePlayer src="/animations/welcome.json" className="w-full h-full" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-[#0b0b0b]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.6)] space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#121212] border border-neutral-800/90 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#121212] border border-neutral-800/90 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#121212] border border-neutral-800/90 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all hover:scale-[1.01] active:scale-[0.99] text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Card: GitHub Activity & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0b0b0b]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-white shrink-0">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-neutral-400">Open source</p>
              <h3 className="text-xl font-bold text-white tracking-tight">
                GitHub Activity
              </h3>
            </div>
          </div>

          {/* Grid of Heatmap + Sidebar Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 items-start">
            {/* Heatmap Section */}
            <div className="overflow-x-auto pb-3">
              {/* Months Row */}
              <div className="flex justify-between text-[11px] text-neutral-400 mb-2 px-1 min-w-[580px]">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>

              {/* 50 Weeks x 7 Days Heatmap Grid */}
              <div className="flex gap-[3.5px] min-w-[580px] p-1 bg-black/40 rounded-xl border border-white/[0.03]">
                {contributionGrid.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3.5px]">
                    {week.map((level, dIdx) => (
                      <div
                        key={`${wIdx}-${dIdx}`}
                        className={`w-2.5 h-2.5 rounded-[2px] border ${greenLevels[level]} transition-all duration-200 hover:scale-125 cursor-pointer`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Heatmap Footer */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-3 px-1 min-w-[580px]">
                <span>864 contributions in the last year</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="flex gap-1 items-center">
                    {greenLevels.map((lvl, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-[2px] border ${lvl}`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Sidebar Stats & Top Repo */}
            <div className="space-y-4">
              {/* Stats Block */}
              <div className="bg-[#121212] border border-white/[0.06] rounded-xl p-4 space-y-3">
                {/* Total Contributions */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white leading-tight">864</p>
                    <p className="text-[10px] text-neutral-400">Total contributions</p>
                  </div>
                </div>

                {/* Current Streak */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white leading-tight">79</p>
                    <p className="text-[10px] text-neutral-400">Current streak</p>
                  </div>
                </div>

                {/* Longest Streak */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white leading-tight">79</p>
                    <p className="text-[10px] text-neutral-400">Longest streak</p>
                  </div>
                </div>
              </div>

              {/* Top Repo Card */}
              <div className="bg-[#121212] border border-white/[0.06] rounded-xl p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                  TOP REPO
                </span>
                <h4 className="text-sm font-bold text-white mb-1">IP-Finder-Bot</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2 mb-3">
                  IP Finder Bot is a Telegram bot that provides detailed...
                </p>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" /> 55
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" /> 18
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-neutral-300">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Python
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Copyright Bar */}
        <div className="pt-12 mt-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
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

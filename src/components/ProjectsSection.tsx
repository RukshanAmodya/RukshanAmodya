"use client";

import React, { useState } from "react";
import { ExternalLink, Github, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  features: string[];
  link: string;
  github?: string;
  userCount?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "PasinduAthukorala.lk",
    description: "Advanced Level ICT | Completed Learning Management System with rich features and live grading.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/assets/images/projects/paictlk.jpg",
    features: [
      "✨ Dashboard – Quick stats & smooth access",
      "📚 Classes & My Classes – Filter by year, free or paid",
      "📈 Marks Section – View top ranks, progress, and performance",
      "🗓 Calendar – Track your full class schedule",
      "💳 Payments – View full history with Tute tracking",
      "👨‍💻 Code & Practice – Built-in Python, HTML & CSS editors",
    ],
    link: "https://pasinduathukorala.lk/",
    userCount: "4,000+",
  },
  {
    id: 2,
    title: "Logic.lk",
    description: "Learning Management System for students, built on the MERN stack with modern dashboard and class management.",
    tech: ["React", "Express", "MongoDB", "Node.js"],
    image: "/assets/images/projects/logiclk.jpg",
    features: [
      "Student dashboard & quick stats",
      "Class management & scheduling",
      "Progress tracking & performance graphs",
      "Notices & payment tracking",
    ],
    link: "https://logic.lk/",
    userCount: "300+",
  },
  {
    id: 3,
    title: "TikTok Downloader Bot",
    description: "Telegram bot for downloading TikTok videos without watermarks, with MP3 audio extraction and instant sharing.",
    tech: ["Python", "FFmpeg", "Telegram API", "Cloudflare"],
    image: "/assets/images/projects/tiktok-bot.jpg",
    features: [
      "Watermark-free ultra-HD video downloads",
      "Instant audio extraction to MP3",
      "Inline search and fast sharing capabilities",
      "High throughput distributed processing",
    ],
    link: "https://t.me/TikTokDownx_bot",
    userCount: "60,000+",
  },
  {
    id: 4,
    title: "MtProxy Guard Bot",
    description: "Telegram bot providing high-speed multi-country proxies with a tiered VIP system and automated updates.",
    tech: ["Python", "TDlib", "MongoDB", "Linux"],
    image: "/assets/images/projects/mtproxy-bot.jpg",
    features: [
      "Multi-country proxy server selection",
      "Premium subscription tiers & payment verification",
      "Automated hourly health and latency checks",
      "Interactive bot dashboard & user analytics",
    ],
    link: "https://t.me/MtProxySG_bot",
    userCount: "5,000+",
  },
  {
    id: 5,
    title: "IP Finder Bot",
    description: "Telegram bot for comprehensive IP address analysis, precise geolocation mapping, and security risk assessment.",
    tech: ["Python", "Google Maps API", "REST API"],
    image: "/assets/images/projects/ip-bot.jpg",
    features: [
      "IP risk analysis and fraud scoring",
      "IPv4 and IPv6 lookup support",
      "Interactive map coordinates & ISP info",
      "VPN, Tor node, and proxy detection",
    ],
    link: "https://t.me/IPfinderobo_bot",
    userCount: "3,000+",
  },
  {
    id: 6,
    title: "Exam Countdown Bot",
    description: "Telegram bot providing timely notifications and real-time live countdowns for upcoming national examinations.",
    tech: ["Python", "React", "Telegram API"],
    image: "/assets/images/projects/exam-bot.jpg",
    features: [
      "Real-time countdown widgets",
      "Daily reminder and motivational alerts",
      "Exam timetable & syllabus breakdown",
      "Custom countdown timezone presets",
    ],
    link: "https://t.me/ExamCountdown_bot",
    userCount: "12,000+",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1"
          >
            Featured Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Highlighted Projects
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col bg-[#111111]/80 hover:bg-[#181818] border border-white/[0.08] hover:border-white/[0.2] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                {project.userCount && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-medium text-emerald-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{project.userCount} Users</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 mb-5">
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="text-xs text-neutral-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tech Tags & Link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.05] text-neutral-300 border border-white/[0.05]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                    aria-label="View Project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

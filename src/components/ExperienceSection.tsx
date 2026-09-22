"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface ExperienceItem {
  year: string;
  type: "work" | "edu";
  title: string;
  org: string;
  period: string;
  bullets: string[];
  tags: string[];
  logo?: string;
}

const experiences: ExperienceItem[] = [
  {
    year: "2022",
    type: "edu",
    title: "GCE Advanced Level",
    org: "Mathematics & ICT Stream",
    period: "Completed 2022",
    bullets: [
      "Sat A/L exams with Mathematics & ICT streams.",
      "Qualified for higher education and software engineering entry.",
    ],
    tags: ["Mathematics", "ICT", "GCE A/L"],
  },
  {
    year: "2022",
    type: "work",
    title: "Founder",
    org: "CodexSL",
    period: "2022 – Present",
    bullets: [
      "Founded CodexSL, a tech startup focused on the Telegram ecosystem.",
      "Building Telegram bots and mini apps as our core products.",
      "Leading engineering, product, and business direction.",
    ],
    tags: ["Telegram Bots", "Mini Apps", "Startup"],
    logo: "/logos/codexsl.avif",
  },
  {
    year: "2023",
    type: "edu",
    title: "BSc (Hons) Software Engineering",
    org: "SLIIT City University",
    period: "2023 – Present",
    bullets: [
      "Studying software architecture, web dev & scalable system design.",
      "Balancing full-time degree alongside active startup development.",
    ],
    tags: ["Software Engineering", "SLIIT", "Undergraduate"],
    logo: "/logos/sliit-city.avif",
  },
  {
    year: "2024",
    type: "work",
    title: "Founder",
    org: "Blumix",
    period: "Nov 2024 – Present",
    bullets: [
      "Founded Blumix, a Generative AI service providing startup.",
      "Served 30+ clients with AI-powered creative solutions.",
      "Delivered 15,000+ AI image generation services.",
      "Produced nearly 50+ AI video promotions for clients.",
    ],
    tags: ["Generative AI", "Image Generation", "AI Video"],
    logo: "/logos/blumix.avif",
  },
  {
    year: "2026",
    type: "work",
    title: "Co-Founder",
    org: "elix.lk",
    period: "2026 – Present",
    bullets: [
      "Co-founded elix.lk, building web apps and software solutions.",
      "Delivering products like LMS platforms and enterprise web portals.",
      "Contributing to product roadmap and technical architecture.",
    ],
    tags: ["Web Apps", "Software Solutions", "LMS"],
    logo: "/logos/elix.avif",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-black relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1"
          >
            My Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Experience &amp; Milestones
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12">
          {experiences.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Timeline Indicator Dot / Icon */}
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-neutral-900 border-2 border-neutral-700 group-hover:border-blue-500 group-hover:scale-110 flex items-center justify-center transition-all">
                {item.type === "work" ? (
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>

              {/* Year badge for large screen */}
              <div className="hidden md:block absolute -left-32 top-1.5 text-right w-24 text-sm font-semibold text-neutral-400 tabular-nums">
                {item.year}
              </div>

              {/* Card content */}
              <div className="bg-[#111111]/90 hover:bg-[#181818] border border-white/[0.07] hover:border-white/[0.15] rounded-2xl p-6 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    {item.logo && (
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-neutral-800 p-0.5 border border-white/10 shrink-0">
                        <img
                          src={item.logo}
                          alt={item.org}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-neutral-300">
                        {item.org}
                      </p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs text-neutral-400 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.05]">
                    <Calendar className="w-3 h-3 text-neutral-400" />
                    {item.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-4 pl-1">
                  {item.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-xs sm:text-sm text-neutral-400 leading-relaxed list-disc list-inside"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 border border-white/[0.04]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

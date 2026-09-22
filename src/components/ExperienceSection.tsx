"use client";

import React, { useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import LottiePlayer from "./LottiePlayer";

interface Milestone {
  year: string;
  type: "edu" | "work";
  title: string;
  org: string;
  period: string;
  bullets: string[];
  tags: string[];
  logo?: string;
  badgeLabel: string;
  flip: boolean; // false: Card Left, Details Right | true: Details Left, Card Right
}

const milestones: Milestone[] = [
  {
    year: "2022",
    type: "edu",
    title: "GCE Advanced Level",
    org: "Sri Lanka",
    badgeLabel: "EDUCATION",
    period: "Completed 2022",
    bullets: [
      "Sat A/L exams with Mathematics & ICT streams.",
      "Qualified for higher education entry.",
    ],
    tags: ["Mathematics", "ICT", "GCE A/L"],
    flip: false,
  },
  {
    year: "2022",
    type: "work",
    title: "Founder",
    org: "CodexSL",
    badgeLabel: "WORK EXPERIENCE",
    period: "2022 – Present",
    bullets: [
      "Founded CodexSL, a tech startup focused on the Telegram ecosystem.",
      "Building Telegram bots and mini apps as our core products.",
      "Leading engineering, product, and business direction.",
    ],
    tags: ["Telegram Bots", "Mini Apps"],
    logo: "/logos/codexsl.avif",
    flip: true,
  },
  {
    year: "2023",
    type: "edu",
    title: "BSc (Hons) Software Engineering",
    org: "SLIIT City University",
    badgeLabel: "EDUCATION",
    period: "2023 – Present",
    bullets: [
      "Studying software architecture, web dev & system design.",
      "Balancing full-time degree alongside active startup work.",
    ],
    tags: ["Software Engineering", "SLIIT", "Undergraduate"],
    logo: "/logos/sliit-city.avif",
    flip: false,
  },
  {
    year: "2024",
    type: "work",
    title: "Founder",
    org: "Blumix",
    badgeLabel: "WORK EXPERIENCE",
    period: "Nov 2024 – Present",
    bullets: [
      "Founded Blumix, a Generative AI service providing startup.",
      "Served 30+ clients with AI-powered creative solutions.",
      "Delivered 15,000+ AI image generation services.",
      "Produced nearly 50+ AI video promotions for clients.",
    ],
    tags: ["Generative AI", "Image Generation", "AI Video", "Startup"],
    logo: "/logos/blumix.avif",
    flip: true,
  },
  {
    year: "2026",
    type: "work",
    title: "Co-Founder",
    org: "elix.lk",
    badgeLabel: "WORK EXPERIENCE",
    period: "2026 – Present",
    bullets: [
      "Co-founded elix.lk, building web apps and software solutions.",
      "Delivering products like LMS platforms and product websites.",
      "Contributing to product roadmap and technical growth.",
    ],
    tags: ["Web Apps", "Software Solutions", "LMS", "Product Websites"],
    logo: "/logos/elix.avif",
    flip: false,
  },
];

function TitleCard({ item }: { item: Milestone }) {
  return (
    <div className="w-full bg-[#0d0d0d]/95 hover:bg-[#151515] border border-white/[0.08] hover:border-white/[0.2] rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-[0_4px_28px_rgba(0,0,0,0.5)] group">
      {/* Badge Header */}
      <div className="flex items-center gap-2.5 mb-4">
        {item.logo ? (
          <div className="w-6 h-6 rounded-md overflow-hidden bg-neutral-900 border border-white/10 flex items-center justify-center p-0.5 shrink-0">
            <img
              src={item.logo}
              alt={item.org}
              className="w-full h-full object-contain"
            />
          </div>
        ) : item.type === "edu" ? (
          <div className="w-6 h-6 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300">
            <GraduationCap className="w-3.5 h-3.5 text-neutral-300" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300">
            <Briefcase className="w-3.5 h-3.5 text-neutral-300" />
          </div>
        )}
        <span className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
          {item.badgeLabel}
        </span>
      </div>

      {/* Main Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-neutral-100 transition-colors">
        {item.title}
      </h3>
      <p className="text-sm font-medium text-neutral-400">{item.org}</p>
    </div>
  );
}

function DetailsBlock({ item }: { item: Milestone }) {
  return (
    <div className="w-full text-left py-2">
      <p className="text-xs font-semibold text-neutral-400 mb-3 tracking-wide">
        {item.period}
      </p>

      {/* Bullet Points */}
      <ul className="space-y-2 mb-4">
        {item.bullets.map((bullet, idx) => (
          <li
            key={idx}
            className="text-xs sm:text-sm text-neutral-300/90 leading-relaxed flex items-start gap-2.5"
          >
            <span className="text-neutral-500 text-xs shrink-0 select-none">▸</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Calculate moving glow orb position along the timeline
  const orbY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-20">
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
                MY JOURNEY
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Education &amp; Experience
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Desktop 2-Column Alternating Timeline */}
        <div className="relative">
          {/* Central Timeline Vertical Axis (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-neutral-800/80">
            {/* Scroll-driven Glowing Beam Line */}
            <motion.div
              className="absolute top-0 left-0 w-[1px] bg-gradient-to-b from-white/30 via-white to-white/40 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
              style={{ height: beamHeight }}
            />

            {/* Glowing Radiant Orb traveling down */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full z-20 shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff,0_0_45px_rgba(255,255,255,0.9)]"
              style={{ top: orbY }}
            >
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
            </motion.div>
          </div>

          {/* Milestones Rows */}
          <div className="space-y-16 md:space-y-24">
            {milestones.map((item, idx) => {
              const cardComponent = <TitleCard item={item} />;
              const detailsComponent = <DetailsBlock item={item} />;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="relative"
                >
                  {/* Desktop Grid Layout (Left - Center - Right) */}
                  <div className="hidden md:grid grid-cols-[1fr_100px_1fr] items-center gap-6 lg:gap-10">
                    {/* Left Column */}
                    <div className="flex justify-end">
                      {item.flip ? detailsComponent : cardComponent}
                    </div>

                    {/* Center Column: Year Badge & Axis Anchor */}
                    <div className="relative flex items-center justify-center h-full">
                      {/* Year label positioned left or right of the center line */}
                      <span
                        className={`absolute text-xs font-bold tabular-nums text-neutral-500 whitespace-nowrap ${
                          item.flip ? "right-7" : "left-7"
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>

                    {/* Right Column */}
                    <div className="flex justify-start">
                      {item.flip ? cardComponent : detailsComponent}
                    </div>
                  </div>

                  {/* Mobile Single Column Layout */}
                  <div className="md:hidden flex gap-4 pl-2">
                    {/* Left Mini Axis with Year & Indicator */}
                    <div className="relative flex flex-col items-center shrink-0 w-8">
                      <div className="absolute top-0 bottom-0 w-[1px] bg-neutral-800" />
                      <div className="relative z-10 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#ffffff] mt-2 shrink-0" />
                      <span className="text-[10px] font-bold text-neutral-500 mt-2 rotate-90 origin-center">
                        {item.year}
                      </span>
                    </div>

                    {/* Content Stack */}
                    <div className="flex-1 space-y-3 pb-8">
                      {cardComponent}
                      {detailsComponent}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

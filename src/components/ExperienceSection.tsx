"use client";

import React, { useRef } from "react";
import { GraduationCap, Briefcase, ShieldCheck, Code, BookOpen, Award, Layers, Rocket, Zap, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import LottiePlayer from "./LottiePlayer";

interface Milestone {
  year: string;
  type: "edu" | "work";
  title: string;
  org: string;
  badgeLabel: string;
  period: string;
  bullets: string[];
  tags: string[];
  iconType?: string;
  flip: boolean; // false: Card Left, Details Right | true: Details Left, Card Right
}

const milestones: Milestone[] = [
  // 1. 2023 - Education (Cybersecurity)
  {
    year: "2023",
    type: "edu",
    title: "Diploma in Cybersecurity",
    org: "Information Security & Threat Defense",
    badgeLabel: "EDUCATION",
    period: "Completed 2023",
    bullets: [
      "Focused on network security, threat analysis, and ethical defense strategies.",
      "Hands-on experience in vulnerability assessments and system hardening.",
    ],
    tags: ["Cybersecurity", "Network Security", "Ethical Hacking"],
    iconType: "shield",
    flip: false,
  },
  // 2. 2023 - Work (Coding Divers)
  {
    year: "2023",
    type: "work",
    title: "Founder",
    org: "Coding Divers",
    badgeLabel: "WORK EXPERIENCE",
    period: "2023 – Present",
    bullets: [
      "Founded Coding Divers, delivering tailored software & web solutions.",
      "Leading engineering, technical strategy, and client product development.",
      "Spearheading digital transformation initiatives and developer community outreach.",
    ],
    tags: ["Coding Divers", "Startup", "Web Solutions"],
    iconType: "rocket",
    flip: true,
  },
  // 3. 2024 - Education (Fullstack)
  {
    year: "2024",
    type: "edu",
    title: "Certificate in Fullstack Development",
    org: "Modern Web Engineering",
    badgeLabel: "EDUCATION",
    period: "Completed 2024",
    bullets: [
      "Mastered modern full-stack web architectures and RESTful API design.",
      "Engineered scalable applications using React, Next.js, Node.js, and cloud databases.",
    ],
    tags: ["Fullstack", "React", "Node.js", "MERN Stack"],
    iconType: "code",
    flip: false,
  },
  // 4. 2024 - Work (Gravix)
  {
    year: "2024",
    type: "work",
    title: "Co-Founder",
    org: "Gravix",
    badgeLabel: "WORK EXPERIENCE",
    period: "2024 – Present",
    bullets: [
      "Co-founded Gravix, focusing on cutting-edge digital products and AI tooling.",
      "Architecting high-performance backend pipelines and client interfaces.",
      "Managing product lifecycles, user experience, and technical roadmap.",
    ],
    tags: ["Gravix", "Co-Founder", "AI Solutions", "Startup"],
    iconType: "zap",
    flip: true,
  },
  // 5. 2025 - Education (O/L)
  {
    year: "2025",
    type: "edu",
    title: "GCE Ordinary Level",
    org: "Sri Lanka",
    badgeLabel: "EDUCATION",
    period: "Completed 2025",
    bullets: [
      "Completed GCE Ordinary Level national examination curriculum.",
      "Solid academic foundation in Mathematics, Science, and English.",
    ],
    tags: ["GCE O/L", "Secondary Education"],
    iconType: "award",
    flip: false,
  },
  // 6. 2025 - Work (Questra)
  {
    year: "2025",
    type: "work",
    title: "Founder",
    org: "Questra",
    badgeLabel: "WORK EXPERIENCE",
    period: "2025 – Present",
    bullets: [
      "Founded Questra, developing innovative automation tools and bot infrastructure.",
      "Directing full engineering lifecycle, system scalability, and cloud deployments.",
      "Delivering modern web products and interactive micro-services.",
    ],
    tags: ["Questra", "Founder", "Automation", "Cloud"],
    iconType: "sparkles",
    flip: true,
  },
  // 7. 2026 - Education (Diploma in English)
  {
    year: "2026",
    type: "edu",
    title: "Diploma in English",
    org: "Professional Communication & Language",
    badgeLabel: "EDUCATION",
    period: "2026 – Present",
    bullets: [
      "Advanced professional English proficiency, technical documentation, and writing.",
      "Strengthened international client communication, presentation, and collaboration.",
    ],
    tags: ["English", "Professional Communication", "Soft Skills"],
    iconType: "book",
    flip: false,
  },
  // 8. 2026 - Education (Diploma in Software Engineering)
  {
    year: "2026",
    type: "edu",
    title: "Diploma in Software Engineering",
    org: "Software Systems & Architecture",
    badgeLabel: "EDUCATION",
    period: "2026 – Present",
    bullets: [
      "Comprehensive study of software design patterns, system architecture, and algorithms.",
      "End-to-end agile software lifecycle management and enterprise clean code practices.",
    ],
    tags: ["Software Engineering", "System Design", "Architecture"],
    iconType: "layers",
    flip: true,
  },
];

function getIcon(iconType?: string, type?: "edu" | "work") {
  switch (iconType) {
    case "shield":
      return <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />;
    case "code":
      return <Code className="w-3.5 h-3.5 text-cyan-400" />;
    case "award":
      return <Award className="w-3.5 h-3.5 text-amber-400" />;
    case "book":
      return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
    case "layers":
      return <Layers className="w-3.5 h-3.5 text-purple-400" />;
    case "rocket":
      return <Rocket className="w-3.5 h-3.5 text-orange-400" />;
    case "zap":
      return <Zap className="w-3.5 h-3.5 text-yellow-400" />;
    case "sparkles":
      return <Sparkles className="w-3.5 h-3.5 text-pink-400" />;
    default:
      return type === "work" ? (
        <Briefcase className="w-3.5 h-3.5 text-blue-400" />
      ) : (
        <GraduationCap className="w-3.5 h-3.5 text-neutral-300" />
      );
  }
}

function TitleCard({ item }: { item: Milestone }) {
  return (
    <div className="w-full bg-[#0d0d0d]/95 hover:bg-[#151515] border border-white/[0.08] hover:border-white/[0.2] rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-[0_4px_28px_rgba(0,0,0,0.5)] group">
      {/* Badge Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
          {getIcon(item.iconType, item.type)}
        </div>
        <span className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
          {item.badgeLabel}
        </span>
      </div>

      {/* Main Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-neutral-100 transition-colors">
        {item.title}
      </h3>
      {item.org && <p className="text-sm font-medium text-neutral-400">{item.org}</p>}
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

                    {/* Center Column: Year Badge next to center line */}
                    <div className="relative flex items-center justify-center h-full">
                      <span
                        className={`absolute text-xs font-bold tabular-nums text-neutral-500 whitespace-nowrap ${
                          item.flip ? "left-7 text-left" : "right-7 text-right"
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

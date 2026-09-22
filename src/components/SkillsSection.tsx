"use client";

import React from "react";
import Image from "next/image";
import LottiePlayer from "./LottiePlayer";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  desc: string;
  icon: string;
}

const allSkills: SkillItem[] = [
  { name: "React", icon: "/icons/react.svg", desc: "UI component library" },
  { name: "TypeScript", icon: "/icons/typescript.svg", desc: "Typed JavaScript" },
  { name: "JavaScript", icon: "/icons/javascript.svg", desc: "Web scripting language" },
  { name: "Node.js", icon: "/icons/nodejs.svg", desc: "Server-side runtime" },
  { name: "Python", icon: "/icons/python.svg", desc: "Versatile scripting" },
  { name: "Tailwind CSS", icon: "/icons/tailwind.svg", desc: "Utility-first CSS" },
  { name: "Git", icon: "/icons/git.svg", desc: "Version control" },
  { name: "Docker", icon: "/icons/docker.svg", desc: "Container platform" },
  { name: "MongoDB", icon: "/icons/mongodb.svg", desc: "NoSQL database" },
  { name: "MySQL", icon: "/icons/mysql.svg", desc: "Relational database" },
  { name: "SQL", icon: "/icons/sql.svg", desc: "Query language" },
  { name: "SQLite", icon: "/icons/sqlite.svg", desc: "Embedded database" },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg", desc: "ML framework" },
  { name: "PyTorch", icon: "/icons/pytorch.svg", desc: "Deep learning" },
  { name: "HuggingFace", icon: "/icons/huggingface.svg", desc: "AI model hub" },
  { name: "ComfyUI", icon: "/icons/comfyui.svg", desc: "Diffusion workflow" },
  { name: "Flux", icon: "/icons/flux.svg", desc: "Image gen model" },
  { name: "Replicate", icon: "/icons/replicate.svg", desc: "ML model API" },
  { name: "Vite", icon: "/icons/vitejs.svg", desc: "Fast build tool" },
  { name: "Bootstrap", icon: "/icons/bootstrap.svg", desc: "CSS framework" },
  { name: "CSS", icon: "/icons/css.svg", desc: "Stylesheet language" },
  { name: "PHP", icon: "/icons/php.svg", desc: "Server-side scripting" },
  { name: "Linux", icon: "/icons/linux.svg", desc: "OS & shell env" },
  { name: "Figma", icon: "/icons/figma.svg", desc: "UI/UX design tool" },
  { name: "After Effects", icon: "/icons/after-effects.svg", desc: "Motion graphics" },
];

// Split into two sets: 13 and 12
const row1Skills = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const row2Skills = allSkills.slice(Math.ceil(allSkills.length / 2));

function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <div className="flex items-center gap-3.5 bg-[#121212]/90 hover:bg-[#1c1c1c] border border-white/[0.06] hover:border-white/[0.18] rounded-2xl px-5 py-3.5 shrink-0 transition-all duration-300 hover:scale-[1.03] group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="w-10 h-10 rounded-xl bg-neutral-900/90 border border-white/5 flex items-center justify-center p-2 shrink-0 group-hover:border-white/10 transition-colors">
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
          onError={(e) => {
            // fallback if icon fails to render
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      </div>
      <div className="text-left select-none">
        <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-white transition-colors">
          {skill.name}
        </h4>
        <p className="text-[11px] text-neutral-400/90 tracking-tight">
          {skill.desc}
        </p>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 bg-black overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="w-14 h-14 shrink-0">
            <LottiePlayer src="/animations/skills.json" className="w-full h-full" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              What I Work With
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Skills &amp; Expertise
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Marquee Carousel Rows */}
      <div className="relative w-full overflow-hidden flex flex-col gap-5">
        {/* Left & Right gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1: Right -> Left */}
        <div className="marquee-container w-full overflow-hidden flex">
          <div className="marquee-track flex gap-4 animate-marquee-left shrink-0 py-1">
            {[...row1Skills, ...row1Skills, ...row1Skills, ...row1Skills].map((skill, i) => (
              <SkillCard key={`r1-${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
        </div>

        {/* Row 2: Left -> Right */}
        <div className="marquee-container w-full overflow-hidden flex">
          <div className="marquee-track flex gap-4 animate-marquee-right shrink-0 py-1">
            {[...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills].map((skill, i) => (
              <SkillCard key={`r2-${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

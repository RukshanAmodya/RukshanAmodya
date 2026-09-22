"use client";

import React from "react";
import HeroGrid from "./HeroGrid";
import LottiePlayer from "./LottiePlayer";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-28 pb-16 px-5 sm:px-8 overflow-hidden bg-black"
    >
      {/* Interactive Ripple Grid Background */}
      <HeroGrid />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="text-left order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-2xl text-neutral-400 font-medium mb-2"
          >
            Hi there, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-3"
          >
            Thejan GO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-neutral-300 font-medium mb-6"
          >
            Full-Stack Developer | Gen AI Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-neutral-400 mb-8 leading-relaxed max-w-xl"
          >
            As an undergraduate passionate about leveraging the power of code and AI, I
            strive to create meaningful and innovative solutions. I explore how
            technology can transform ideas into reality. With a keen interest in
            generative AI and cutting-edge technologies, I am constantly honing my
            skills to stay at the forefront of software engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm md:text-base"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 border border-neutral-700/80 bg-neutral-900/50 hover:bg-neutral-800 text-neutral-200 font-medium rounded-xl transition-all transform hover:scale-105 active:scale-95 backdrop-blur-sm text-sm md:text-base"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Column: Animated Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px] flex items-center justify-center">
            {/* Ambient character back-glow */}
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <LottiePlayer
              src="/animations/welcome.json"
              className="w-full h-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

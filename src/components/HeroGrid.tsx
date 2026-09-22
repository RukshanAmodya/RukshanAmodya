"use client";

import React, { useState, useEffect, useCallback } from "react";

interface RippleCell {
  key: string;
  delay: number;
  intensity: number;
}

export default function HeroGrid() {
  const [dimensions, setDimensions] = useState({ cols: 24, rows: 14 });
  const [activeRipples, setActiveRipples] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const updateGrid = () => {
      const cellSize = 54;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.ceil(width / cellSize) + 2;
      const rows = Math.ceil(height / cellSize) + 2;
      setDimensions({ cols, rows });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  const triggerRipple = useCallback((clickRow: number, clickCol: number) => {
    const maxRadius = 7;
    const now = Date.now();
    const newRipples: { [key: string]: number } = {};

    for (let r = Math.max(0, clickRow - maxRadius); r <= Math.min(dimensions.rows - 1, clickRow + maxRadius); r++) {
      for (let c = Math.max(0, clickCol - maxRadius); c <= Math.min(dimensions.cols - 1, clickCol + maxRadius); c++) {
        const dist = Math.sqrt(Math.pow(r - clickRow, 2) + Math.pow(c - clickCol, 2));
        if (dist <= maxRadius) {
          const key = `${r}-${c}`;
          const delay = dist * 45; // ms wave delay
          setTimeout(() => {
            setActiveRipples((prev) => ({
              ...prev,
              [key]: now,
            }));
            // Remove after animation finishes
            setTimeout(() => {
              setActiveRipples((prev) => {
                const next = { ...prev };
                delete next[key];
                return next;
              });
            }, 1000);
          }, delay);
        }
      }
    }
  }, [dimensions]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto select-none">
      {/* Grid container */}
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${dimensions.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${dimensions.rows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: dimensions.rows }).map((_, r) =>
          Array.from({ length: dimensions.cols }).map((_, c) => {
            const key = `${r}-${c}`;
            const isRippling = !!activeRipples[key];

            return (
              <div
                key={key}
                onClick={() => triggerRipple(r, c)}
                className={`border border-white/[0.035] transition-all duration-300 cursor-pointer ${
                  isRippling
                    ? "bg-blue-500/25 border-cyan-400/50 shadow-[0_0_16px_rgba(59,130,246,0.5)] z-10 scale-[0.98]"
                    : "hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                }`}
              />
            );
          })
        )}
      </div>

      {/* Radial fade mask to blend smoothly with black background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(0,0,0,0.1)_0%,#000000_100%)]" />
      
      {/* Subtle top ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}

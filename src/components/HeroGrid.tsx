"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function HeroGrid() {
  const [dimensions, setDimensions] = useState({ cols: 28, rows: 20 });
  const [activeRipples, setActiveRipples] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const updateGrid = () => {
      const cellSize = 52;
      const width = typeof window !== "undefined" ? window.innerWidth : 1920;
      const height = typeof window !== "undefined" ? window.innerHeight * 1.5 : 1200;
      const cols = Math.ceil(width / cellSize) + 2;
      const rows = Math.ceil(height / cellSize) + 2;
      setDimensions({ cols, rows });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  const triggerRipple = useCallback((clickRow: number, clickCol: number) => {
    const maxRadius = 8;
    const now = Date.now();

    for (let r = Math.max(0, clickRow - maxRadius); r <= Math.min(dimensions.rows - 1, clickRow + maxRadius); r++) {
      for (let c = Math.max(0, clickCol - maxRadius); c <= Math.min(dimensions.cols - 1, clickCol + maxRadius); c++) {
        const dist = Math.sqrt(Math.pow(r - clickRow, 2) + Math.pow(c - clickCol, 2));
        if (dist <= maxRadius) {
          const key = `${r}-${c}`;
          const delay = dist * 42;
          setTimeout(() => {
            setActiveRipples((prev) => ({
              ...prev,
              [key]: now,
            }));
            setTimeout(() => {
              setActiveRipples((prev) => {
                const next = { ...prev };
                delete next[key];
                return next;
              });
            }, 900);
          }, delay);
        }
      }
    }
  }, [dimensions]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto select-none">
      {/* Grid cells */}
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
                className={`border border-white/[0.045] transition-all duration-300 cursor-pointer ${
                  isRippling
                    ? "bg-blue-500/30 border-cyan-400/60 shadow-[0_0_20px_rgba(59,130,246,0.6)] z-10 scale-[0.98]"
                    : "hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-[0_0_12px_rgba(255,255,255,0.06)]"
                }`}
              />
            );
          })
        )}
      </div>

      {/* Subtle vignette mask that preserves visible grid lines throughout */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_100%_80%_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_75%,#000000_100%)]" />
    </div>
  );
}

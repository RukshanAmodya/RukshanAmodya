"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface CellState {
  opacity: number; // 0 to 1
  timestamp: number;
}

export default function HeroGrid() {
  const [gridSize, setGridSize] = useState({ cols: 24, rows: 14, cellSize: 68 });
  const [activeCells, setActiveCells] = useState<{ [key: string]: number }>({});
  const timerRefs = useRef<{ [key: string]: NodeJS.Timeout[] }>({});

  useEffect(() => {
    const calculateGrid = () => {
      const cellSize = window.innerWidth < 640 ? 56 : 68; // larger prominent grid squares
      const width = window.innerWidth;
      const height = window.innerHeight * 1.35;
      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      setGridSize({ cols, rows, cellSize });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  const triggerRingRipple = useCallback((clickRow: number, clickCol: number) => {
    const { rows, cols } = gridSize;
    const maxRadius = Math.max(rows, cols) * 1.2;
    const rippleId = `${Date.now()}-${Math.random()}`;
    timerRefs.current[rippleId] = [];

    // Calculate waves for all cells in the grid so the ring travels across the whole hero
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dist = Math.sqrt(Math.pow(r - clickRow, 2) + Math.pow(c - clickCol, 2));
        if (dist <= maxRadius) {
          const delay = dist * 52; // speed of the expanding ring wave in ms
          const key = `${r}-${c}`;

          // When the ring wavefront arrives at cell (r, c)
          const timer = setTimeout(() => {
            const now = Date.now();
            setActiveCells((prev) => ({
              ...prev,
              [key]: now,
            }));

            // Fade out smoothly after the ring passes
            const fadeTimer = setTimeout(() => {
              setActiveCells((prev) => {
                const next = { ...prev };
                delete next[key];
                return next;
              });
            }, 850);

            if (timerRefs.current[rippleId]) {
              timerRefs.current[rippleId].push(fadeTimer);
            }
          }, delay);

          if (timerRefs.current[rippleId]) {
            timerRefs.current[rippleId].push(timer);
          }
        }
      }
    }
  }, [gridSize]);

  // Clean up any pending timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timerRefs.current).forEach((timers) => {
        timers.forEach((t) => clearTimeout(t));
      });
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto select-none bg-black">
      {/* Grid container with larger square boxes */}
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, ${gridSize.cellSize}px)`,
          gridTemplateRows: `repeat(${gridSize.rows}, ${gridSize.cellSize}px)`,
          justifyContent: "center",
        }}
      >
        {Array.from({ length: gridSize.rows }).map((_, r) =>
          Array.from({ length: gridSize.cols }).map((_, c) => {
            const key = `${r}-${c}`;
            const isLit = !!activeCells[key];

            return (
              <div
                key={key}
                onClick={() => triggerRingRipple(r, c)}
                className={`border border-white/[0.05] transition-all duration-700 ease-out cursor-pointer ${
                  isLit
                    ? "bg-white/[0.12] border-white/25 shadow-[0_0_20px_rgba(255,255,255,0.18)] z-10"
                    : "hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                }`}
                style={{
                  width: `${gridSize.cellSize}px`,
                  height: `${gridSize.cellSize}px`,
                }}
              />
            );
          })
        )}
      </div>

      {/* Subtle radial blend so edges fade into background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_95%_75%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_75%,#000000_100%)]" />
    </div>
  );
}

"use client";

import "@/app/monsoon.css";
import { useMemo } from "react";

export default function MonsoonEffect() {
  const rainDrops = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const left = Math.random() * 100;
      const duration = 0.5 + Math.random() * 0.5;
      const delay = Math.random() * -5;
      const opacity = 0.1 + Math.random() * 0.3;
      
      return (
        <div
          key={`rain-${i}`}
          className="rain-drop"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            opacity: opacity,
          }}
        />
      );
    });
  }, []);

  const ripples = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * -10;
      
      return (
        <div
          key={`ripple-${i}`}
          className="rain-ripple"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="monsoon-container">
      <div className="monsoon-lightning"></div>
      <div className="monsoon-overlay"></div>
      {rainDrops}
      {ripples}
    </div>
  );
}

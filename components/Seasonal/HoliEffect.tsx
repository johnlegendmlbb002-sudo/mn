"use client";

import "@/app/holi.css";
import { useMemo } from "react";

export default function HoliEffect() {
  const particles = useMemo(() => {
    const colors = [
      "#FF5722", "#FFC107", "#4CAF50", "#2196F3", "#9C27B0", "#E91E63", "#00BCD4"
    ];

    return Array.from({ length: 15 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 30 + Math.random() * 70; // Larger splashes for impact
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = 10 + Math.random() * 10; // Long cycle for sparse splashes
      const delay = Math.random() * -30;
      const rotate = Math.random() * 360;
      const driftX = (Math.random() - 0.5) * 200;
      const driftY = (Math.random() - 0.5) * 200;
      
      const splashRadius = `${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}%`;
      
      return (
        <div
          key={i}
          className="holi-particle"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            boxShadow: `0 0 40px ${color}A0`,
            animationDelay: `${delay}s`,
            "--duration": `${duration}s`,
            "--drift-x": `${driftX}px`,
            "--drift-y": `${driftY}px`,
            "--splash-radius": splashRadius,
            transform: `rotate(${rotate}deg)`,
          } as any}
        />
      );
    });
  }, []);

  return (
    <div className="holi-container">
      {particles}
    </div>
  );
}

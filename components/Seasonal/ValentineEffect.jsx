"use client";

import "@/app/valentine.css";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const hearts = [
  { color: "#ff4d94", size: 15 },
  { color: "#ff85a1", size: 20 },
  { color: "#fbcfe8", size: 12 },
  { color: "#ec4899", size: 18 },
  { color: "#db2777", size: 22 },
];

export default function ValentineEffect() {
  // Show on all pages when selected from theme toggle

  const items = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const left = Math.random() * 100;
      const duration = 20 + Math.random() * 10;
      const delay = Math.random() * -30;
      const heart = hearts[Math.floor(Math.random() * hearts.length)];
      const sizeScale = 1.0 + Math.random() * 0.5;
      const drift = (Math.random() - 0.5) * 50;
      
      return (
        <div
          key={i}
          className="valentine-heart"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            color: heart.color,
            fontSize: `${heart.size * sizeScale}px`,
            opacity: 0.5 + Math.random() * 0.3,
            "--drift": `${drift}px`
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width={heart.size * sizeScale}
            height={heart.size * sizeScale}
            className="heart-svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      );
    });
  }, []);

  return (
    <div className="hearts-container">
      {items}
    </div>
  );
}

"use client";

import "@/app/eid.css";
import { useMemo } from "react";

export default function EidEffect() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 15 + Math.random() * 10;
      const delay = Math.random() * -20;
      const size = 15 + Math.random() * 25;
      const isMoon = Math.random() > 0.7;
      
      return (
        <div
          key={i}
          className={isMoon ? "eid-moon" : "eid-star"}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          {isMoon ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c.132 0 .263 0 .393.007a9 9 0 0 0 9.22 9.22 9 9 0 1 1-9.613-9.227z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
        </div>
      );
    });
  }, []);

  return (
    <div className="eid-container">
      <div className="eid-glow"></div>
      {particles}
    </div>
  );
}

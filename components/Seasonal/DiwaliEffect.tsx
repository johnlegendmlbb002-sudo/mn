"use client";

import "@/app/diwali.css";
import { useMemo } from "react";

export default function DiwaliEffect() {
  const sparkles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 2 + Math.random() * 4;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * -5;
      
      return (
        <div
          key={`sparkle-${i}`}
          className="diwali-sparkle"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });
  }, []);

  const firecrackers = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 80; // Avoid extreme bottom
      const duration = 1.5 + Math.random() * 2;
      const delay = Math.random() * -10;
      const color = Math.random() > 0.5 ? "#ffd700" : "#ff4500";
      
      return (
        <div
          key={`cracker-${i}`}
          className="firecracker-burst"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            "--duration": `${duration}s`,
            "--cracker-color": color,
          } as any}
        >
          {Array.from({ length: 16 }).map((_, j) => (
            <div 
              key={j} 
              className="cracker-spark" 
              style={{ "--angle": `${j * 22.5}deg` } as any} 
            />
          ))}
        </div>
      );
    });
  }, []);

  return (
    <div className="diwali-container">
      {firecrackers}
      {sparkles}
    </div>
  );
}

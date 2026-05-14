"use client";

import { useUIStore, ThemeEffect } from "@/store/useUIStore";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const effects: { id: ThemeEffect; icon: string; label: string; color: string }[] = [
  { id: "none", icon: "🚫", label: "Default", color: "gray" },
  { id: "christmas", icon: "🎄", label: "Christmas", color: "#ef4444" },
  { id: "valentine", icon: "💖", label: "Valentine", color: "#ec4899" },
  { id: "holi", icon: "🎨", label: "Holi", color: "#8b5cf6" },
  { id: "diwali", icon: "🪔", label: "Diwali", color: "#f59e0b" },
  { id: "monsoon", icon: "☔", label: "Monsoon", color: "#06b6d4" },
  { id: "eid", icon: "🌙", label: "Eid", color: "#10b981" },
];

export default function SeasonalToggle() {
  const { activeThemeEffect, setActiveThemeEffect } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300 group ${
          isOpen 
            ? "bg-[var(--accent)] border-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" 
            : "bg-[var(--foreground)]/5 border-transparent hover:bg-[var(--foreground)]/10"
        }`}
      >
        {activeThemeEffect === "none" ? (
          <Sparkles className={`w-4 h-4 transition-all duration-500 ${isOpen ? "text-white" : "text-[var(--foreground)]/60"}`} />
        ) : (
          <span className="text-sm">
            {effects.find(e => e.id === activeThemeEffect)?.icon}
          </span>
        )}
        
        {/* Active Indicator Pulse */}
        {activeThemeEffect !== "none" && (
          <div 
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--background)] animate-pulse" 
            style={{ backgroundColor: effects.find(e => e.id === activeThemeEffect)?.color || "var(--accent)" }}
          />
        )}
      </motion.button>

      {/* Menu - Adjusted for Header Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-3 flex flex-col gap-1 p-2 rounded-2xl bg-[var(--card)]/95 backdrop-blur-3xl border border-[var(--border)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[1001] min-w-[180px]"
          >
            <div className="px-3 py-2 border-b border-[var(--border)] mb-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)]/60 italic">Seasonal Effects</span>
            </div>
            {effects.map((effect) => (
              <motion.button
                key={effect.id}
                whileHover={{ x: 4, backgroundColor: "rgba(var(--foreground-rgb), 0.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveThemeEffect(effect.id);
                  setTimeout(() => setIsOpen(false), 200);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  activeThemeEffect === effect.id
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                }`}
              >
                <span className={`text-lg transition-transform duration-300 ${activeThemeEffect === effect.id ? "scale-110" : "group-hover:scale-105"}`}>
                  {effect.icon}
                </span>
                
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wide truncate">
                    {effect.label}
                  </span>
                </div>

                {activeThemeEffect === effect.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { FiZap, FiArrowRight, FiCheckCircle, FiPlay, FiStar } from "react-icons/fi";
import Link from "next/link";

export default function HomeEarnPromotion() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-2 mb-1">
      <Link href="/dashboard/coins" className="block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative flex items-center justify-between px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-[2rem] bg-[var(--card)] border border-[var(--border)] hover:border-purple-500/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />

          <div className="relative z-10 flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Icon */}
            <div className="flex items-center ml-1 shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[0.8rem] sm:rounded-[1rem] flex items-center justify-center border-[2px] border-[var(--card)] z-30 shadow-sm transition-transform group-hover:scale-105 bg-purple-500/10 text-purple-400">
                <FiZap size={14} className="sm:w-4 sm:h-4 drop-shadow-sm" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[12px] sm:text-[14px] font-black tracking-wide text-[var(--foreground)] leading-tight drop-shadow-md truncate">
                  Diamonds for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 italic uppercase">FREE</span>
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 mt-0.5">
                <span className="flex items-center gap-1 text-[7.5px] sm:text-[8px] font-black uppercase tracking-tight text-[var(--muted)] truncate">
                  <FiPlay className="text-purple-500" size={8} /> Watch Ads
                </span>
                <span className="flex items-center gap-1 text-[7.5px] sm:text-[8px] font-black uppercase tracking-tight text-[var(--muted)] truncate">
                  <FiCheckCircle className="text-purple-500" size={8} /> Tasks
                </span>
                <span className="flex items-center gap-1 text-[7.5px] sm:text-[8px] font-black uppercase tracking-tight text-[var(--muted)] truncate">
                  <FiStar className="text-purple-500" size={8} /> Checkin Games
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="relative z-10 shrink-0 ml-2">
            <div className="h-7 sm:h-8 px-3 sm:px-4 rounded-full sm:rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-md shadow-purple-500/10 transition-transform group-hover:scale-105">
              Earn <FiArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}

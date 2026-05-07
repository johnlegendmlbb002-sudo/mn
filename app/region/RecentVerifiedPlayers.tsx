"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiGlobe, FiChevronRight, FiClock, FiRotateCcw } from "react-icons/fi";
import { getVerifiedPlayers } from "@/utils/storage/verifiedPlayerStorage";
import { formatRegion } from "@/utils/regionFormatter";

function timeAgo(ts?: number) {
  if (!ts) return "";
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "NOW";
  if (min < 60) return `${min}M AGO`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}H AGO`;
  const d = Math.floor(hr / 24);
  return `${d}D AGO`;
}

export default function RecentVerifiedPlayers({
  onSelect,
  limit = 10,
}: {
  onSelect: (player: any) => void;
  limit?: number;
}) {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    setPlayers(getVerifiedPlayers(limit));
  }, [limit]);

  if (!players.length) return null;

  return (
    <div className="space-y-2">
      {/* List */}
      <div className="grid grid-cols-1 gap-2">
        <AnimatePresence>
          {players.map((p, index) => (
            <motion.button
              key={`${p.playerId}-${p.zoneId}-${index}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(p)}
              className="
                w-full text-left
                rounded-2xl border border-[var(--border)]
                bg-[var(--card)] hover:bg-[var(--background)] hover:border-[var(--accent)]/30
                hover:shadow-sm transition-all duration-300
                p-3 px-4 group flex items-center justify-between gap-3
              "
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--background)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-all">
                  <FiUser size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-[1000] uppercase tracking-tight italic truncate text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-none mb-1">
                    {p.username || "Unknown Player"}
                  </p>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-[var(--muted)] uppercase tracking-widest">
                    <span>{p.playerId}</span>
                    {p.zoneId && (
                      <>
                        <span className="opacity-30">/</span>
                        <span>{p.zoneId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 bg-[var(--background)] rounded-full flex items-center gap-1.5 border border-[var(--border)]">
                  <FiGlobe className="text-[10px] text-[var(--muted)]" />
                  <span className="text-[10px] font-black text-[var(--foreground)] uppercase tracking-widest opacity-70">
                    {formatRegion(p.region)}
                  </span>
                </div>
                <FiChevronRight className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ShoppingBag, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

function InsightCard({ label, value, color, pulse, compact }) {
  const colors = {
    blue: "text-blue-500 border-blue-500/10 bg-blue-500/5",
    amber: "text-amber-500 border-amber-500/10 bg-amber-500/5",
    purple: "text-purple-500 border-purple-500/10 bg-purple-500/5",
    emerald: "text-emerald-500 border-emerald-500/10 bg-emerald-500/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl border ${colors[color]} flex flex-col items-center justify-center text-center relative overflow-hidden`}
    >
      {pulse && (
        <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-current animate-ping" />
      )}
      <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-tight opacity-60 mb-0.5">{label}</span>
      <span className="text-xs sm:text-sm font-black tabular-nums whitespace-nowrap">{value}</span>
    </motion.div>
  );
}

export default function AnalyticsTab() {
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderStats, setOrderStats] = useState({
    revenue: { day: 0, week: 0, month: 0 },
    counts: { day: 0, week: 0, month: 0 }
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrderStats(data.orderStats || {
          revenue: { day: 0, week: 0, month: 0 },
          counts: { day: 0, week: 0, month: 0 }
        });
      }
    } catch (err) {
      console.error("Fetch stats failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [days]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-extrabold tracking-tight text-[var(--foreground)]">Platform Analytics</h2>
          <p className="text-[11px] text-[var(--muted)] mt-0.5">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Day toggle */}
          <div className="flex p-0.5 bg-[var(--border)] rounded-lg gap-0.5">
            {[1, 7, 30].map((d) => (
              <button aria-label="button"
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                  days === d
                    ? "bg-[var(--accent)] text-black"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >{d}D</button>
            ))}
          </div>
          <button aria-label="button"
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--border)] disabled:opacity-50"
          >
            <FiRefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Order Volume Column */}
        <div className="space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <ShoppingBag size={14} className="text-amber-500" />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Order Count</h4>
          </div>
          <div className="mt-2">
            <InsightCard 
              label={days === 1 ? "Today" : days === 7 ? "Week" : "Month"} 
              value={orderStats.counts?.[days === 1 ? "day" : days === 7 ? "week" : "month"]} 
              color="amber" 
              pulse={days === 1 && orderStats.counts?.day > 0} 
            />
          </div>
        </div>

        {/* Revenue Snapshot Column */}
        <div className="space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <IndianRupee size={14} className="text-emerald-500" />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Earnings Summary</h4>
          </div>
          <div className="mt-2">
            <InsightCard 
              label={days === 1 ? "Today" : days === 7 ? "Week" : "Month"} 
              value={`₹${(orderStats.revenue?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`} 
              color="emerald" 
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}

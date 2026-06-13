"use client";

import { useEffect, useState } from "react";
import { FiSmartphone, FiMonitor, FiTablet, FiDownload, FiActivity, FiRefreshCw } from "react-icons/fi";

export default function PwaStatsTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pwa/track");
      const json = await res.json();
      setData(json);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const deviceIcon = (type) => {
    if (type === "mobile") return <FiSmartphone size={13} />;
    if (type === "tablet") return <FiTablet size={13} />;
    return <FiMonitor size={13} />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return (
    <p className="text-center text-sm text-[var(--muted)] py-10">Failed to load PWA stats.</p>
  );

  const statCards = [
    {
      label: "Total Installs",
      value: data.totalInstalls ?? 0,
      icon: <FiDownload size={18} />,
      color: "#ef4444",
      glow: "rgba(239,68,68,0.15)",
    },
    {
      label: "Active Devices",
      value: data.totalActive ?? 0,
      icon: <FiActivity size={18} />,
      color: "#22c55e",
      glow: "rgba(34,197,94,0.15)",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold tracking-tight text-[var(--foreground)]">PWA Install Stats</h2>
          <p className="text-[11px] text-[var(--muted)] mt-0.5">Users who installed the app to their home screen</p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)]/30"
        >
          <FiRefreshCw size={12} /> Refresh
        </button>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 gap-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
            style={{ boxShadow: `0 0 24px ${card.glow}` }}
          >
            <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: card.color }} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)]">{card.label}</p>
                <p className="text-3xl font-black text-[var(--foreground)] mt-1 leading-none" style={{ color: card.color }}>{card.value}</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: card.glow, color: card.color }}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* By Device */}
        <BreakdownCard
          title="By Device"
          rows={data.byDevice}
          renderIcon={(id) => deviceIcon(id)}
        />

        {/* By OS */}
        <BreakdownCard
          title="By OS"
          rows={data.byOS}
          renderIcon={() => null}
        />

        {/* By Browser */}
        <BreakdownCard
          title="By Browser"
          rows={data.byBrowser}
          renderIcon={() => null}
        />
      </div>

      {/* Recent installs */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">Recent Installs</h3>
        </div>
        {data.recent?.length === 0 ? (
          <p className="text-center text-[12px] text-[var(--muted)] py-8">No installs yet</p>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {data.recent?.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--muted)]">{deviceIcon(item.deviceType)}</span>
                  <div>
                    <p className="text-[12px] font-bold text-[var(--foreground)]">
                      {item.os} · {item.browser}
                    </p>
                    {item.userId && (
                      <p className="text-[10px] text-[var(--muted)]">User: {item.userId}</p>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-[var(--muted)] shrink-0 ml-2">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function BreakdownCard({ title, rows, renderIcon }) {
  const total = rows?.reduce((s, r) => s + r.count, 0) || 1;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)]">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">{title}</h3>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {rows?.length === 0 && (
          <p className="text-center text-[11px] text-[var(--muted)] py-5">No data</p>
        )}
        {rows?.map((row, i) => {
          const pct = Math.round((row.count / total) * 100);
          return (
            <div key={i} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--muted)]">{renderIcon(row._id)}</span>
                  <span className="text-[12px] font-bold text-[var(--foreground)] capitalize">
                    {row._id || "Unknown"}
                  </span>
                </div>
                <span className="text-[11px] font-black text-[var(--accent)]">{row.count}</span>
              </div>
              {/* Progress bar */}
              <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

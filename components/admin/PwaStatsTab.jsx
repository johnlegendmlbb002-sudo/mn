"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiSmartphone, FiMonitor, FiTablet,
  FiDownload, FiActivity, FiRefreshCw,
  FiXCircle, FiUser, FiExternalLink,
} from "react-icons/fi";

export default function PwaStatsTab() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays]     = useState(7);

  const fetchStats = async (d = days) => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/pwa/track?days=${d}`);
      const json = await res.json();
      setData(json);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStats(days); }, [days]);

  const deviceIcon = (type) => {
    if (type === "mobile")  return <FiSmartphone size={12} />;
    if (type === "tablet")  return <FiTablet size={12} />;
    return <FiMonitor size={12} />;
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!data) return (
    <p className="text-center text-sm text-[var(--muted)] py-10">Failed to load PWA stats.</p>
  );

  const conversionRate = data.totalInstalls + data.dismissCount > 0
    ? Math.round((data.totalInstalls / (data.totalInstalls + data.dismissCount)) * 100)
    : 0;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-extrabold tracking-tight text-[var(--foreground)]">PWA Install Stats</h2>
          <p className="text-[11px] text-[var(--muted)] mt-0.5">Real-time install, active &amp; engagement data</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Day toggle */}
          <div className="flex p-0.5 bg-[var(--border)] rounded-lg gap-0.5">
            {[7, 30].map((d) => (
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
            onClick={() => fetchStats(days)}
            className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--border)]"
          >
            <FiRefreshCw size={12} /> Refresh
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Installs"  value={data.totalInstalls}  icon={<FiDownload size={16}  />} color="#ef4444" glow="rgba(239,68,68,0.15)"  />
        <StatCard label="Active Devices"  value={data.totalActive}    icon={<FiActivity size={16}  />} color="#22c55e" glow="rgba(34,197,94,0.15)"  />
        <StatCard label="Dismissed"       value={data.dismissCount}   icon={<FiXCircle size={16}   />} color="#f59e0b" glow="rgba(245,158,11,0.15)" />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} icon={<FiUser size={16}     />} color="#60a5fa" glow="rgba(96,165,250,0.15)" />
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarChart
          title={`Daily Installs — Last ${days} Days`}
          data={data.dailyInstalls}
          color="#ef4444"
          glow="rgba(239,68,68,0.5)"
        />
        <BarChart
          title={`Active Users — Last ${days} Days`}
          data={data.dailyActive}
          color="#22c55e"
          glow="rgba(34,197,94,0.5)"
        />
      </div>

      {/* ── Breakdowns ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BreakdownCard title="By Device"  rows={data.byDevice}  renderIcon={(id) => deviceIcon(id)} />
        <BreakdownCard title="By OS"      rows={data.byOS}      renderIcon={() => null} />
        <BreakdownCard title="By Browser" rows={data.byBrowser} renderIcon={() => null} />
      </div>

      {/* ── Installed users ── */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">
            Registered Users Who Installed
          </h3>
          <span className="text-[10px] text-[var(--muted)]">{data.installedUsers?.length ?? 0} found</span>
        </div>
        {!data.installedUsers?.length ? (
          <p className="text-center text-[12px] text-[var(--muted)] py-8">No registered users tracked yet</p>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {data.installedUsers.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 text-[var(--accent)]">
                    {item.user?.avatar
                      ? <img src={item.user.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                      : <FiUser size={14} />
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-[var(--foreground)] truncate">
                      {item.user?.name || item.user?.email || item.userId}
                    </p>
                    <p className="text-[10px] text-[var(--muted)] truncate">
                      {item.user?.email || item.user?.phone || "—"} ·{" "}
                      <span className="text-[var(--accent)]">{item.user?.userType || "user"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] text-[var(--muted)] flex items-center gap-1">
                      {deviceIcon(item.deviceType)} {item.os} · {item.browser}
                    </p>
                    <p className="text-[10px] text-[var(--muted)]">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {item.userId && (
                    <Link
                      href={`/owner-panal?tab=users&search=${item.userId}`}
                      className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-colors"
                      title="View user"
                    >
                      <FiExternalLink size={12} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Recent installs ── */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">Recent Installs</h3>
        </div>
        {!data.recent?.length ? (
          <p className="text-center text-[12px] text-[var(--muted)] py-8">No installs yet</p>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {data.recent.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--muted)]">{deviceIcon(item.deviceType)}</span>
                  <p className="text-[12px] font-bold text-[var(--foreground)]">
                    {item.os} · {item.browser}
                  </p>
                </div>
                <span className="text-[10px] text-[var(--muted)]">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
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

/* ── Stat card ── */
function StatCard({ label, value, icon, color, glow }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
      style={{ boxShadow: `0 0 24px ${glow}` }}
    >
      <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: color }} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)]">{label}</p>
          <p className="text-2xl font-black mt-1 leading-none" style={{ color }}>{value}</p>
        </div>
        <div className="p-2 rounded-lg" style={{ background: glow, color }}>{icon}</div>
      </div>
    </div>
  );
}

/* ── Bar chart (CSS-based, no external lib) ── */
function BarChart({ title, data, color, glow }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)]">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">{title}</h3>
      </div>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-end gap-1.5 h-24">
          {data.map((d, i) => {
            const pct = Math.round((d.count / max) * 100);
            const label = d.date.slice(5); // MM-DD
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Tooltip */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[var(--card)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[9px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" style={{ color }}>
                  {d.count}
                </div>
                {/* Bar */}
                <div className="w-full rounded-t-sm transition-all duration-500" style={{
                  height: `${Math.max(pct, 2)}%`,
                  background: pct > 0 ? color : "rgba(255,255,255,0.05)",
                  boxShadow: pct > 0 ? `0 0 8px ${glow}` : "none",
                  minHeight: "3px",
                }} />
              </div>
            );
          })}
        </div>
        {/* X-axis labels — show every nth */}
        <div className="flex gap-1.5 mt-1.5">
          {data.map((d, i) => {
            const show = data.length <= 10 || i % Math.ceil(data.length / 7) === 0 || i === data.length - 1;
            return (
              <div key={i} className="flex-1 text-center">
                {show && (
                  <span className="text-[8px] text-[var(--muted)]">{d.date.slice(5)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Breakdown card ── */
function BreakdownCard({ title, rows, renderIcon }) {
  const total = rows?.reduce((s, r) => s + r.count, 0) || 1;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)]">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">{title}</h3>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {!rows?.length && (
          <p className="text-center text-[11px] text-[var(--muted)] py-5">No data</p>
        )}
        {rows?.map((row, i) => {
          const pct = Math.round((row.count / total) * 100);
          return (
            <div key={i} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--muted)]">{renderIcon(row._id)}</span>
                  <span className="text-[12px] font-bold text-[var(--foreground)] capitalize">{row._id || "Unknown"}</span>
                </div>
                <span className="text-[11px] font-black text-[var(--accent)]">{row.count}</span>
              </div>
              <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden">
                <div className="h-full rounded-full bg-[var(--accent)] transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

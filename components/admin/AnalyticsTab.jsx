"use client";

import { useState, useEffect } from "react";
import { FiRefreshCw, FiGift } from "react-icons/fi";
import { ShoppingBag, IndianRupee, Hash, ArrowUp, ArrowDown, Wallet, Zap, Users, UserPlus, Activity, Download, MousePointerClick, MessageSquare, Send, Coins, Ticket, Sparkles, TrendingUp, Database, CheckCircle, HelpCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

function CompactMetricCard({
  title,
  titleIcon: TitleIcon,
  theme,
  primaryStats,
  footerStats,
  timeframeLabel
}) {
  const themeTokens = {
    purple: { blob: "bg-purple-500/20", border: "hover:border-purple-500/30", title: "text-purple-500", time: "text-purple-500" },
    blue: { blob: "bg-blue-500/20", border: "hover:border-blue-500/30", title: "text-blue-500", time: "text-blue-500" },
    emerald: { blob: "bg-emerald-500/20", border: "hover:border-emerald-500/30", title: "text-emerald-500", time: "text-emerald-500" },
    amber: { blob: "bg-amber-500/20", border: "hover:border-amber-500/30", title: "text-amber-500", time: "text-amber-500" },
    indigo: { blob: "bg-indigo-500/20", border: "hover:border-indigo-500/30", title: "text-indigo-500", time: "text-indigo-500" },
    rose: { blob: "bg-rose-500/20", border: "hover:border-rose-500/30", title: "text-rose-500", time: "text-rose-500" },
  };

  const statTokens = {
    purple: { bg: "bg-purple-500/10", text: "text-purple-500", textMuted: "text-purple-500/70", textBright: "text-purple-500/90", solid: "bg-purple-500" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-500", textMuted: "text-blue-500/70", textBright: "text-blue-500/90", solid: "bg-blue-500" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", textMuted: "text-emerald-500/70", textBright: "text-emerald-500/90", solid: "bg-emerald-500" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-500", textMuted: "text-amber-500/70", textBright: "text-amber-500/90", solid: "bg-amber-500" },
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-500", textMuted: "text-indigo-500/70", textBright: "text-indigo-500/90", solid: "bg-indigo-500" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-500", textMuted: "text-rose-500/70", textBright: "text-rose-500/90", solid: "bg-rose-500" },
  };

  const activeTheme = themeTokens[theme] || themeTokens.blue;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 group ${activeTheme.border} transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1`}
    >
      <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-30 ${activeTheme.blob} group-hover:scale-[2] group-hover:opacity-60 transition-all duration-1000 ease-out pointer-events-none`} />
      <div className={`absolute -left-12 -bottom-12 w-32 h-32 rounded-full blur-2xl opacity-10 ${activeTheme.blob} group-hover:scale-[1.5] group-hover:opacity-30 transition-all duration-700 ease-out pointer-events-none delay-100`} />
      
      <div className="flex items-center gap-2.5 mb-5 relative z-10">
        <div className={`p-2 rounded-xl bg-[var(--background)] border border-[var(--border)] shadow-sm ${activeTheme.title} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
          <TitleIcon size={14} strokeWidth={2.5} />
        </div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">{title}</h4>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        {primaryStats.map((stat, i) => {
          const sToken = statTokens[stat.color] || statTokens.blue;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className={`p-2.5 sm:p-3 rounded-2xl ${sToken.bg} ${sToken.text} flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300 shadow-inner`}>
                {stat.pulse && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${sToken.solid} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${sToken.solid}`}></span>
                  </span>
                )}
                <stat.icon size={18} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className={`text-[9px] font-bold uppercase tracking-widest ${sToken.textMuted} truncate`}>{stat.label}</span>
                <span className={`text-lg sm:text-2xl font-black tabular-nums whitespace-nowrap ${sToken.text} leading-tight mt-1`}>
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-5 w-full flex items-center justify-between border-t border-[var(--border)] pt-4 relative z-10">
        <div className="flex flex-wrap items-center gap-4">
          {footerStats.map((stat, i) => {
            if (stat.customEl) return <div key={i}>{stat.customEl}</div>;
            const sToken = statTokens[stat.color] || statTokens.blue;
            return (
              <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold">
                {stat.pulseDot ? (
                   <span className="relative flex h-1.5 w-1.5">
                     <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${sToken.solid} opacity-75`}></span>
                     <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${sToken.solid}`}></span>
                   </span>
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-sm ${sToken.solid} opacity-80`} />
                )}
                <span className={`${sToken.textBright} flex items-center gap-1`}>
                  {stat.icon && <stat.icon size={10} />}
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
        
        {timeframeLabel && (
          <div className={`flex items-center gap-1.5 text-[9px] font-bold opacity-70 ${activeTheme.time}`}>
            <span className="w-1 h-1 rounded-full bg-current opacity-50" />
            <span className="uppercase tracking-wider">{timeframeLabel}</span>
          </div>
        )}
      </div>
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
  
  const [txStats, setTxStats] = useState({
    counts: { day: 0, week: 0, month: 0 },
    volume: { day: 0, week: 0, month: 0 }
  });

  const [walletStats, setWalletStats] = useState({
    totalBalance: 0,
    activeWallets: 0,
    deposits: { day: 0, week: 0, month: 0 },
    usage: { day: 0, week: 0, month: 0 }
  });

  const [redeemStats, setRedeemStats] = useState({
    total: 0,
    totalUsed: 0
  });

  const [coinStats, setCoinStats] = useState({
    totalEarned: 0,
    totalSpent: 0,
    todayEarned: 0,
    todaySpent: 0,
    totalAvailable: 0
  });

  const [pwaStats, setPwaStats] = useState({
    totalInstalls: 0,
    activeDevices: 0,
    dismissCount: 0
  });

  const [supportStats, setSupportStats] = useState({
    total: 0,
    open: 0,
    today: 0
  });

  const [userStats, setUserStats] = useState({
    total: 0,
    activeStats: { day: 0, week: 0, month: 0 },
    newStats: { day: 0, week: 0, month: 0 }
  });

  const [promoStats, setPromoStats] = useState({
    todayEmails: 0,
    totalEmails: 0
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const [ordersRes, txRes, walletRes, redeemRes, coinsRes, pwaRes, supportRes, usersRes, promoRes] = await Promise.all([
        fetch(`/api/admin/orders`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/admin/transactions`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/admin/redeem-codes?limit=1`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/admin/coins/history?limit=1`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/pwa/track?days=${days}`),
        fetch(`/api/admin/support-queries`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/admin/promo-mail/stats`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      const ordersData = await ordersRes.json();
      const txData = await txRes.json();
      const walletData = await walletRes.json();
      const redeemData = await redeemRes.json();
      const coinsData = await coinsRes.json();
      const pwaData = await pwaRes.json();
      const supportData = await supportRes.json();
      const usersData = await usersRes.json();
      const promoData = await promoRes.json();
      
      if (ordersData.success) {
        setOrderStats(ordersData.orderStats || {
          revenue: { day: 0, week: 0, month: 0 },
          counts: { day: 0, week: 0, month: 0 }
        });
      }
      
      if (txData.success) {
        setTxStats(txData.stats || {
          counts: { day: 0, week: 0, month: 0 },
          volume: { day: 0, week: 0, month: 0 }
        });
      }

      if (walletData.success && walletData.data) {
        setWalletStats({
          totalBalance: walletData.data.totalBalance || 0,
          activeWallets: walletData.data.activeWallets || 0,
          deposits: walletData.data.deposits || { day: 0, week: 0, month: 0 },
          usage: walletData.data.usage || { day: 0, week: 0, month: 0 }
        });
      }

      if (redeemData.success && redeemData.summary) {
        setRedeemStats(redeemData.summary);
      }

      if (coinsData.success && coinsData.stats) {
        setCoinStats(coinsData.stats);
      }

      if (pwaData) {
        setPwaStats(pwaData);
      }

      if (supportData.success && supportData.stats) {
        setSupportStats(supportData.stats);
      }

      if (usersData.success) {
        setUserStats({
          total: usersData.total || 0,
          activeStats: usersData.activeStats || { day: 0, week: 0, month: 0 },
          newStats: usersData.newStats || { day: 0, week: 0, month: 0 }
        });
      }

      if (promoData.success && promoData.stats) {
        setPromoStats(promoData.stats);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        
        {/* USERS */}
        <CompactMetricCard
          title="User Activity"
          titleIcon={Users}
          theme="purple"
          primaryStats={[
            { label: "Total Users", value: userStats.total, icon: Users, color: "purple" },
            { label: "Active Users", value: userStats.activeStats?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0, icon: Zap, color: "blue" }
          ]}
          footerStats={[
            { label: "All Time", color: "purple" },
            { label: `${userStats.newStats?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0} New`, color: "emerald", icon: UserPlus }
          ]}
          timeframeLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
        />

        {/* ORDERS & TRANSACTIONS */}
        <CompactMetricCard
          title="Orders & Transactions"
          titleIcon={ShoppingBag}
          theme="emerald"
          primaryStats={[
            { label: "Order Earnings", value: `₹${(orderStats.revenue?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`, icon: ShoppingBag, color: "amber" },
            { label: "Txn Earnings", value: `₹${(txStats.volume?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`, icon: IndianRupee, color: "blue" }
          ]}
          footerStats={[
            { label: `Orders: ${orderStats.counts?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0}`, color: "amber", pulseDot: days === 1 && orderStats.counts?.day > 0 },
            { label: `Txns: ${txStats.counts?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0}`, color: "blue", pulseDot: days === 1 && txStats.counts?.day > 0 }
          ]}
          timeframeLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
        />

        {/* WALLETS */}
        <CompactMetricCard
          title="Wallet Snapshot"
          titleIcon={Wallet}
          theme="blue"
          primaryStats={[
            { label: "Money Added", value: `₹${(walletStats.deposits?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`, icon: ArrowUp, color: "emerald", pulse: days === 1 && walletStats.deposits?.day > 0 },
            { label: "Money Spent", value: `₹${(walletStats.usage?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`, icon: ArrowDown, color: "purple", pulse: days === 1 && walletStats.usage?.day > 0 }
          ]}
          footerStats={[
            { label: `Customer Pool: ₹${(walletStats.totalBalance || 0).toLocaleString()}`, color: "blue" },
            { label: `Active Wallets: ${walletStats.activeWallets}`, color: "amber" }
          ]}
          timeframeLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
        />

        {/* REDEEM CODES */}
        <CompactMetricCard
          title="Redeem Codes"
          titleIcon={FiGift}
          theme="indigo"
          primaryStats={[
            { label: "Total Codes", value: redeemStats.total, icon: Ticket, color: "indigo" },
            { label: "Available Codes", value: redeemStats.total - redeemStats.totalUsed, icon: FiGift, color: "amber" }
          ]}
          footerStats={[
            { label: `Claimed: ${redeemStats.totalUsed}`, color: "emerald" }
          ]}
          timeframeLabel="All Time"
        />

        {/* COINS */}
        <CompactMetricCard
          title="BBC Coins"
          titleIcon={Coins}
          theme="amber"
          primaryStats={[
            { label: "Total Available", value: coinStats.totalAvailable, icon: Coins, color: "blue" },
            { label: "Today Earned", value: coinStats.todayEarned, icon: ArrowUp, color: "emerald", pulse: coinStats.todayEarned > 0 }
          ]}
          footerStats={[
            { label: `Earned: ${coinStats.totalEarned}`, color: "amber" },
            { label: `Spent: ${coinStats.totalSpent}`, color: "purple" },
            { label: `Today Spent: ${coinStats.todaySpent}`, color: "rose" }
          ]}
          timeframeLabel="Coins Overview"
        />

        {/* PWA STATS */}
        <CompactMetricCard
          title="PWA Installs"
          titleIcon={Download}
          theme="blue"
          primaryStats={[
            { label: "Total Installs", value: pwaStats.totalInstalls || 0, icon: Download, color: "emerald" },
            { label: "Conversion Rate", value: `${(pwaStats.totalInstalls || 0) + (pwaStats.dismissCount || 0) > 0 ? Math.round(((pwaStats.totalInstalls || 0) / ((pwaStats.totalInstalls || 0) + (pwaStats.dismissCount || 0))) * 100) : 0}%`, icon: TrendingUp, color: "purple" }
          ]}
          footerStats={[
            { label: `${days === 1 ? "Today" : days === 7 ? "Week" : "Month"}: ${pwaStats.periodInstalls || 0}`, color: "indigo" },
            { label: `Active Devices: ${pwaStats.activeDevices || 0}`, color: "blue" },
            { label: `Dismissed: ${pwaStats.dismissCount || 0}`, color: "amber" }
          ]}
          timeframeLabel="PWA Snapshot"
        />

        {/* SUPPORT QUERIES */}
        <CompactMetricCard
          title="Support Queries"
          titleIcon={HelpCircle}
          theme="rose"
          primaryStats={[
            { label: "Pending Queries", value: supportStats.open || 0, icon: HelpCircle, color: "amber", pulse: supportStats.open > 0 },
            { label: "Today's Queries", value: supportStats.today || 0, icon: MessageSquare, color: "purple", pulse: supportStats.today > 0 }
          ]}
          footerStats={[
            { label: `Total Queries: ${supportStats.total || 0}`, color: "rose" }
          ]}
          timeframeLabel="Support Snapshot"
        />

        {/* PROMO MAIL */}
        <CompactMetricCard
          title="Promo Mail"
          titleIcon={Mail}
          theme="indigo"
          primaryStats={[
            { label: "Mails Today", value: promoStats.todayEmails || 0, icon: Send, color: "emerald" },
            { label: "Total Reach", value: promoStats.totalEmails || 0, icon: Mail, color: "amber" }
          ]}
          footerStats={[
            { label: `Database: ${userStats.total || 0}`, color: "purple" },
            { label: `External: 0`, color: "blue" }
          ]}
          timeframeLabel="Promo Snapshot"
        />
      </div>
      
    </div>
  );
}

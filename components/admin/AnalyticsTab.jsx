"use client";

import { useState, useEffect } from "react";
import { FiRefreshCw, FiGift } from "react-icons/fi";
import { ShoppingBag, IndianRupee, Hash, ArrowUp, ArrowDown, Wallet, Zap, Users, UserPlus, Activity, Download, MousePointerClick, MessageSquare, Send, Coins, Ticket, Sparkles, TrendingUp, Database, CheckCircle, HelpCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

function InsightCard({ label, value, color, pulse, icon: Icon, footerLabel }) {
  const colors = {
    blue: "text-blue-500 border-blue-500/10 bg-blue-500/5",
    amber: "text-amber-500 border-amber-500/10 bg-amber-500/5",
    purple: "text-purple-500 border-purple-500/10 bg-purple-500/5",
    emerald: "text-emerald-500 border-emerald-500/10 bg-emerald-500/5",
    indigo: "text-indigo-500 border-indigo-500/10 bg-indigo-500/5",
  };
  
  const iconBgs = {
    blue: "bg-blue-500/20 text-blue-400",
    amber: "bg-amber-500/20 text-amber-400",
    purple: "bg-purple-500/20 text-purple-400",
    emerald: "bg-emerald-500/20 text-emerald-400",
    indigo: "bg-indigo-500/20 text-indigo-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-3 py-3 sm:px-4 sm:py-4 rounded-xl border ${colors[color]} flex flex-col items-start text-left relative overflow-hidden gap-2`}
    >
      {/* Background glow simulation */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 blur-2xl rounded-full opacity-20 ${iconBgs[color]?.split(' ')[0]}`} />
      
      <div className="flex items-center gap-2 sm:gap-3 w-full">
        {Icon && (
          <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${iconBgs[color]} flex-shrink-0 z-10`}>
            <Icon size={16} strokeWidth={2.5} />
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col z-10">
          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest opacity-70 truncate">{label}</span>
          <span className="text-sm sm:text-lg font-black tabular-nums whitespace-nowrap mt-0.5">{value}</span>
        </div>
      </div>
      
      {footerLabel && (
        <div className="mt-1 flex items-center gap-1.5 opacity-80 text-[8px] sm:text-[9px] font-bold z-10">
          {pulse ? (
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-current"></span>
            </span>
          ) : (
             <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-current opacity-50" />
          )}
          <span>{footerLabel}</span>
        </div>
      )}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* ================= USERS ================= */}
        <div className="md:col-span-2 space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <div className="text-emerald-500">
              <Users size={14} />
            </div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">User Activity</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-2">
            <InsightCard 
              label="Total Users"
              value={userStats.total}
              color="purple" 
              icon={Users}
              footerLabel="All time"
            />
            <InsightCard 
              label={`Active Users`}
              value={userStats.activeStats?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0}
              color="blue" 
              icon={Zap}
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
            <InsightCard 
              label={`New Signups`}
              value={userStats.newStats?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0}
              color="emerald" 
              icon={UserPlus}
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
          </div>
        </div>

        {/* ================= ORDERS & TRANSACTIONS ================= */}
        <div className="md:col-span-2 space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <ShoppingBag size={14} className="text-amber-500" />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Orders & Transactions Snapshot</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-2">
            <InsightCard 
              label={`Order Count`} 
              value={orderStats.counts?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0} 
              color="amber" 
              icon={ShoppingBag}
              pulse={days === 1 && orderStats.counts?.day > 0} 
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
            <InsightCard 
              label={`Order Earnings`} 
              value={`₹${(orderStats.revenue?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`} 
              color="emerald" 
              icon={IndianRupee}
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
            <InsightCard 
              label={`Txn Count`} 
              value={txStats.counts?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0} 
              color="blue" 
              icon={Hash}
              pulse={days === 1 && txStats.counts?.day > 0} 
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
            <InsightCard 
              label={`Txn Earnings`} 
              value={`₹${(txStats.volume?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`} 
              color="emerald" 
              icon={IndianRupee}
              pulse={days === 1 && txStats.volume?.day > 0} 
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
          </div>
        </div>

        {/* ================= WALLETS ================= */}
        <div className="md:col-span-2 space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <Wallet size={14} className="text-blue-500" />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Wallet Snapshot</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-2">
            <InsightCard 
              label={`Money Added`} 
              value={`₹${(walletStats.deposits?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`} 
              color="emerald" 
              icon={ArrowUp}
              pulse={days === 1 && walletStats.deposits?.day > 0} 
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
            <InsightCard 
              label={`Money Spent`} 
              value={`₹${(walletStats.usage?.[days === 1 ? "day" : days === 7 ? "week" : "month"] || 0).toLocaleString()}`} 
              color="purple" 
              icon={ArrowDown}
              pulse={days === 1 && walletStats.usage?.day > 0} 
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
            <InsightCard label="Customer Pool" value={`₹${(walletStats.totalBalance || 0).toLocaleString()}`} color="blue" icon={Database} footerLabel="Total Balance" />
            <InsightCard label="Active Wallets" value={walletStats.activeWallets} color="amber" icon={Wallet} footerLabel="Active" />
          </div>
        </div>

        {/* ================= REDEEM CODES ================= */}
        <div className="md:col-span-2 space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <FiGift size={14} className="text-purple-500" />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Redeem Codes Snapshot</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-2">
            <InsightCard label="Total Codes" value={redeemStats.total} color="blue" icon={Ticket} footerLabel="Codes" />
            <InsightCard label="Claimed" value={redeemStats.totalUsed} color="emerald" icon={CheckCircle} footerLabel="Claimed" />
            <InsightCard label="Available" value={redeemStats.total - redeemStats.totalUsed} color="amber" icon={Sparkles} footerLabel="Available" />
          </div>
        </div>

        {/* ================= COINS ================= */}
        <div className="md:col-span-2 space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <div className="text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">BBC Coins Snapshot</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 mt-2">
            <InsightCard label="Total Available" value={coinStats.totalAvailable} color="blue" icon={Coins} footerLabel="Available" />
            <InsightCard label="Total Earned" value={coinStats.totalEarned} color="amber" icon={TrendingUp} footerLabel="All time" />
            <InsightCard label="Total Spent" value={coinStats.totalSpent} color="purple" icon={TrendingUp} footerLabel="All time" />
            <InsightCard label="Today Earned" value={coinStats.todayEarned} color="emerald" icon={ArrowUp} pulse={coinStats.todayEarned > 0} footerLabel="Today" />
            <InsightCard label="Today Spent" value={coinStats.todaySpent} color="blue" icon={ArrowDown} footerLabel="Today" />
          </div>
        </div>

        {/* ================= PWA STATS ================= */}
        <div className="md:col-span-2 space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <div className="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            </div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">PWA Install Stats</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 mt-2">
            <InsightCard label="Total Installs" value={pwaStats.totalInstalls || 0} color="emerald" icon={Download} footerLabel="Lifetime" />
            <InsightCard 
              label={`Installs`} 
              value={pwaStats.periodInstalls || 0} 
              color="indigo" 
              icon={Download}
              footerLabel={days === 1 ? "Today" : days === 7 ? "Week" : "Month"}
            />
            <InsightCard label="Active Devices" value={pwaStats.activeDevices || 0} color="blue" icon={Activity} footerLabel="Active" />
            <InsightCard label="Dismissed" value={pwaStats.dismissCount || 0} color="amber" icon={MousePointerClick} footerLabel="Dismissed" />
            <InsightCard 
              label="Conversion Rate" 
              value={`${(pwaStats.totalInstalls || 0) + (pwaStats.dismissCount || 0) > 0 ? Math.round(((pwaStats.totalInstalls || 0) / ((pwaStats.totalInstalls || 0) + (pwaStats.dismissCount || 0))) * 100) : 0}%`} 
              color="purple" 
              icon={TrendingUp}
              footerLabel="Total"
            />
          </div>
        </div>

        {/* ================= SUPPORT QUERIES ================= */}
        <div className="md:col-span-2 space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <div className="text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Support Queries</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2">
            <InsightCard label="Pending" value={supportStats.open || 0} color="amber" icon={HelpCircle} footerLabel="Open" pulse={supportStats.open > 0} />
            <InsightCard label="Today" value={supportStats.today || 0} color="purple" icon={MessageSquare} footerLabel="Today" pulse={supportStats.today > 0} />
          </div>
        </div>


        {/* ================= PROMO MAIL ================= */}
        <div className="md:col-span-2 space-y-2 sm:space-y-3 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-2 px-1">
            <div className="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Promo Mail Snapshot</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-2">
            <InsightCard label="Mails Today" value={promoStats.todayEmails || 0} color="emerald" icon={Send} footerLabel="Today" pulse={promoStats.todayEmails > 0} />
            <InsightCard label="Total Reach" value={promoStats.totalEmails || 0} color="amber" icon={Mail} footerLabel="Lifetime" />
            <InsightCard label="External" value={0} color="blue" icon={Mail} footerLabel="Lifetime" />
            <InsightCard label="Database" value={userStats.total || 0} color="purple" icon={Database} footerLabel="Lifetime" />
          </div>
        </div>
      </div>
      
    </div>
  );
}

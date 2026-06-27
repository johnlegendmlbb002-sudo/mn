"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import CustomWebBanner from "../Home/CustomWebBanner";
import api from "@/lib/axios";
import { FiChevronRight, FiLogOut, FiCheckCircle, FiShield, FiZap, FiMenu, FiX, FiLayers, FiCompass, FiGrid, FiShoppingBag, FiMessageSquare, FiUser, FiUsers, FiKey, FiGift, FiSearch, FiAward } from "react-icons/fi";

import { useAuthStore } from "@/store/useAuthStore";

/* ================= CONFIG ================= */
const HEADER_CONFIG = {
  logo: {
    src: "/logoBB.png",
    alt: "mlbbtopup.in",
    width: 140,
    height: 40,
  },

  nav: [
    { label: "Services", href: "/services", icon: <FiGrid size={14} />, colorClass: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "News", href: "/blog", icon: <FiLayers size={14} />, colorClass: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Giveaways", href: "/giveaways", icon: <FiGift size={14} />, colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  ],

  userMenu: {
    common: [
      { label: "My Orders", href: "/dashboard/orders", icon: <FiShoppingBag size={14} />, desc: "Track your top-ups", colorClass: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/20" },
      { label: "My Wallet", href: "/dashboard/wallet", icon: <FiLayers size={14} />, desc: "Balance & Recharge", colorClass: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-400 border-pink-500/20" },
      { label: "Earn BBC", href: "/dashboard/coins", icon: <FiZap size={14} />, desc: "FREE Tasks, Check-in & Games", colorClass: "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-yellow-400 border-yellow-500/20" },
      { label: "Redeem Code", href: "/dashboard/redeem", icon: <FiGift size={14} />, desc: "Claim gift credits", colorClass: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/20" },
      { label: "Refer & Earn", href: "/dashboard/referral", icon: <FiUsers size={14} />, desc: "Earn rewards", colorClass: "bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/20" },
      { label: "My Tournaments", href: "/dashboard/tournaments", icon: <FiAward size={14} />, desc: "View your joined scrims", colorClass: "bg-gradient-to-br from-rose-500/20 to-orange-500/20 text-rose-400 border-rose-500/20" },

      { label: "API Setup", href: "/dashboard/api-keys", icon: <FiKey size={14} />, desc: "Developer API Access", colorClass: "bg-gradient-to-br from-slate-500/20 to-gray-500/20 text-slate-300 border-slate-500/20" },
      { label: "Support", href: "/dashboard/support", icon: <FiMessageSquare size={14} />, desc: "Get help 24/7", colorClass: "bg-gradient-to-br from-sky-500/20 to-blue-500/20 text-sky-400 border-sky-500/20" },
    ],
    roles: {
      owner: { label: "Admin Console", href: "/owner-panal", icon: <FiZap size={14} />, colorClass: "bg-gradient-to-br from-[var(--accent)] to-purple-600 text-white" },
    },
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Zustand state
  const { user, walletBalance, setWalletBalance, updateUser, logout, token, _hasHydrated } = useAuthStore();
  
  const [activeNav, setActiveNav] = useState("/");
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dropdownRef = useRef(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    if (!_hasHydrated) return;
    if (!token) {
      setLoading(false);
      setBalanceLoading(false);
      return;
    }

    api.get("/api/auth/me")
      .then((r) => r.data)
      .then((d) => {
        if (d.success) {
          updateUser({
            name: d.user.name,
            email: d.user.email,
            userId: d.user.id || d.user.userId,
            avatar: d.user.avatar || "",
            userType: d.user.userType || "user",
            phone: d.user.phone,
          });
          
          if (d.user.wallet !== undefined) {
            setWalletBalance(d.user.wallet);
          }
        } else {
          logout();
        }
      })
      .finally(() => {
        setLoading(false);
        setBalanceLoading(false);
      });
  }, [_hasHydrated, token, updateUser, setWalletBalance, logout]);

  /* ================= GAME SEARCH LOGIC ================= */
  const fetchSearchData = async () => {
    if (allGames.length > 0) return; // Already fetched

    try {
      const { data } = await api.get("/api/games");
      if (data.success && data.data?.games) {
        setAllGames(data.data.games);
      }
    } catch (err) {
      console.error("Failed to fetch games for search", err);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    fetchSearchData();
  };

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setIsSearching(true);
      const filtered = allGames.filter(game =>
        game.gameName.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8);
      setSearchResults(filtered);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allGames]);

  const [showLogoutToast, setShowLogoutToast] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setShowLogoutToast(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const [idCopied, setIdCopied] = useState(false);
  const copyId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setIdCopied(true);
    setTimeout(() => setIdCopied(false), 2000);
  };

  /* ================= SCROLL ================= */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      // Click outside search
      const searchContainer = document.querySelector('.lg\\:flex-1.max-w-md');
      if (searchContainer && !searchContainer.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (userMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [userMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full transition-all duration-500 ${scrolled
        ? "backdrop-blur-3xl bg-[var(--background)]/80 shadow-2xl border-b border-[var(--border)] active-header"
        : "bg-transparent"
        } opacity-100 translate-y-0`}
      style={{ zIndex: userMenuOpen ? 2147483647 : 1000 }}
    >
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          <Link
            href="/"
            className="relative z-10 flex-shrink-0"
            onClick={() => {
              setUserMenuOpen(false);
              setActiveNav("/");
            }}
          >
            <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
              <Image
                src={HEADER_CONFIG.logo.src}
                alt={HEADER_CONFIG.logo.alt}
                width={HEADER_CONFIG.logo.width}
                height={HEADER_CONFIG.logo.height}
                priority
                className="h-9 w-auto transition-all duration-300"
              />
            </div>
          </Link>

          <nav className="hidden xl:flex items-center space-x-1 flex-1 justify-center mr-4">
            {HEADER_CONFIG.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveNav(item.href)}
                className="relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] italic text-[var(--muted)] hover:text-[var(--accent)] transition-all group flex items-center gap-2"
              >
                <span className="relative z-10 opacity-70 group-hover:opacity-100 transition-all">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)] transition-all duration-300 ${activeNav === item.href ? "w-full" : "w-0"}`}
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/5 transition-colors duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2 pr-2">
            {user && (
              <Link href="/dashboard/wallet" className="hidden sm:flex">
                <button aria-label="button"
                  className="relative w-auto h-8 px-2.5 rounded-full flex items-center justify-center gap-1 transition-all duration-300 group bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 hover:scale-105 active:scale-95"
                >
                  {balanceLoading ? (
                    <div className="w-12 h-3 bg-[var(--accent)]/10 rounded-full overflow-hidden shimmer-overlay" />
                  ) : (
                    <span className="text-xs font-black text-[var(--accent)]">₹{walletBalance}</span>
                  )}
                  <span className="text-lg text-[var(--accent)] group-hover:scale-110 transition-transform">+</span>
                </button>
              </Link>
            )}

            <div className="lg:hidden">
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[var(--foreground)]/[0.05] text-[var(--foreground)]/60 active:scale-90 transition-transform"
                aria-label="Toggle Mobile Search"
              >
                {mobileSearchOpen ? <FiX size={18} /> : <FiSearch size={18} />}
              </button>
            </div>

            <div className="hidden lg:flex max-w-[200px] xl:max-w-md relative group flex-1">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search available games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleSearchFocus}
                  className={`w-full h-10 pl-10 pr-4 rounded-full bg-[var(--foreground)]/[0.04] border border-[var(--border)] text-xs font-medium focus:bg-[var(--foreground)]/[0.08] focus:border-[var(--accent)]/30 focus:ring-4 focus:ring-[var(--accent)]/5 outline-none transition-all placeholder:text-[var(--muted)]/40`}
                />
                <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-[var(--accent)]' : 'text-[var(--muted)]/40'}`} size={14} />

                {searchTerm && isSearchFocused && (
                  <button aria-label="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center bg-[var(--foreground)]/[0.05] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <FiX size={10} />
                  </button>
                )}
              </div>

              {/* Global Search Results */}
              {isSearchFocused && (searchTerm || isSearching) && (
                <div
                  className="absolute top-full left-0 w-full mt-2 bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden z-[1100] backdrop-blur-3xl opacity-100 translate-y-0"
                >
                  <div className="p-2 border-b border-[var(--border)] bg-[var(--foreground)]/[0.02]">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)]/60 px-2 italic">Available Game Library</span>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {searchResults.length > 0 ? (
                      <div className="p-2 space-y-1">
                        {searchResults.map((game, idx) => (
                          <Link
                            key={game.gameSlug}
                            href={`/game/${game.gameSlug}`}
                            onClick={() => {
                              setIsSearchFocused(false);
                              setSearchTerm("");
                            }}
                          >
                            <div
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--foreground)]/[0.04] transition-all group border border-transparent hover:border-[var(--border)]"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[var(--border)] shrink-0">
                                <Image
                                  src={game.gameImageId?.image || "/logoBB.png"}
                                  alt={game.gameName}
                                  width={40}
                                  height={40}
                                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-[var(--foreground)] truncate group-hover:text-[var(--accent)] transition-colors">{game.gameName}</p>
                                <p className="text-[9px] text-[var(--muted)]/50 italic uppercase tracking-tighter truncate">{game.gameFrom}</p>
                              </div>
                              <FiChevronRight size={14} className="text-[var(--muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : searchTerm ? (
                      <div className="py-10 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--foreground)]/[0.03] flex items-center justify-center mx-auto mb-3 text-[var(--muted)]/20">
                          <FiSearch size={20} />
                        </div>
                        <p className="text-xs font-bold text-[var(--muted)]/40 uppercase tracking-widest">No games found</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="p-3 bg-[var(--foreground)]/[0.02] border-t border-[var(--border)] text-center">
                    <p className="text-[8px] font-black text-[var(--muted)]/40 uppercase tracking-widest italic flex items-center justify-center gap-1.5">
                      <FiZap size={10} className="text-[var(--accent)]" /> Search Powered by mlbbtopup.in
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center gap-1.5 sm:gap-2" ref={dropdownRef}>
            <ThemeToggle />




            <button
              onClick={() => user ? setUserMenuOpen((p) => !p) : window.location.href = "/login"}
              className="relative flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-[2rem] transition-all duration-300 group hover:scale-105 active:scale-95 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 border border-[var(--border)]"
              aria-label="User Menu"
            >
              <FiMenu className="text-[var(--foreground)]/60 text-[10px] sm:text-xs ml-0.5" />
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden flex items-center justify-center bg-[var(--background)] shadow-sm">
                {user?.avatar ? (
                  <Image src={user.avatar} alt={`${user.name || "User"} Profile Avatar`} width={28} height={28} className="object-cover" />
                ) : (
                  <FiUser className="text-[var(--foreground)]/60 text-xs" />
                )}
              </div>
            </button>

              <>
                <div
                  onClick={() => setUserMenuOpen(false)}
                  className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-[2147483646] cursor-pointer transition-opacity duration-500 ${userMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                  style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                />

                <div
                  className={`fixed right-0 top-0 h-[100dvh] w-[85%] max-w-[380px] bg-[var(--background)] dark:bg-[#050505] border-l border-[var(--border)] z-[2147483647] shadow-[-20px_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${userMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                  style={{ background: 'var(--background)', opacity: 1 }}
                >
                  <div className="absolute inset-0 bg-[var(--background)] pointer-events-none" style={{ background: 'var(--background)', opacity: 1 }} />
                  <div
                    className="absolute -top-[10%] -right-[10%] w-[120%] h-[120%] bg-[radial-gradient(circle,var(--accent)_0%,transparent_60%)] blur-[100px] pointer-events-none opacity-10"
                  />
                  {/* Dark overlay for extra depth */}
                  <div className="absolute inset-0 bg-[var(--foreground)]/[0.02] pointer-events-none" />

                  {/* Compact Profile Header */}
                  <div className="relative z-10 p-3 px-4 flex items-center justify-between border-b border-[var(--border)] gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {user ? (
                        <>
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-[var(--border)] shadow-sm shrink-0">
                            {user?.avatar ? (
                              <Image src={user.avatar} alt={`${user.name || "User"} Profile Avatar`} width={32} height={32} className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-sm font-black">{user.name?.charAt(0)}</div>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-xs font-bold text-[var(--foreground)] truncate leading-tight">{user.name}</span>
                              <span className="text-[6px] font-black uppercase px-1 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/10 italic tracking-widest shrink-0">
                                {user.userType === "owner" ? "owner" : user.userType === "admin" ? "reseller" : user.userType === "member" ? "member" : "user"}
                              </span>
                            </div>
                            <span className="text-[9px] text-[var(--muted)] truncate italic leading-tight">{user.email}</span>
                            <button aria-label="button"
                              onClick={() => copyId(user.userId)}
                              className="w-fit flex items-center gap-1 mt-0.5 px-1 py-0.5 rounded bg-[var(--foreground)]/[0.03] border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all group"
                            >
                              <span className="text-[7px] font-bold text-[var(--muted)] group-hover:text-[var(--accent)] tracking-tighter truncate max-w-[80px]">ID: {user.userId}</span>
                              <div className="w-3 h-3 rounded-sm flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] shrink-0">
                                {idCopied ? <FiCheckCircle size={9} /> : <FiLayers size={9} />}
                              </div>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]"><FiUser size={16} /></div>
                          <span className="text-sm font-bold">Guest Account</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {user && (
                        <button onClick={handleLogout} className="w-7 h-7 rounded-full hover:bg-red-500/10 flex items-center justify-center text-red-500 transition-colors" title="Logout"><FiLogOut size={14} /></button>
                      )}
                      <button onClick={() => setUserMenuOpen(false)} className="w-7 h-7 rounded-full hover:bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--muted)] transition-colors" aria-label="Close User Menu"><FiX size={18} /></button>
                    </div>
                  </div>

                  <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">

                    {!user ? (
                      <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
                        <div className="w-16 h-16 rounded-[2rem] bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]"><FiZap size={32} /></div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-[var(--foreground)]">Sign in required</h3>
                          <p className="text-xs text-[var(--muted)]">Login to access your personalized squad dashboard</p>
                        </div>
                        <Link href="/login" onClick={() => setUserMenuOpen(false)} className="w-full py-3.5 rounded-2xl bg-[var(--accent)] text-white text-xs font-bold hover:brightness-110 active:scale-[0.98] transition-all text-center">Authenticate Now</Link>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-1 mb-3">
                          {HEADER_CONFIG.nav.map((item) => (
                            <Link key={item.label} href={item.href} onClick={() => setUserMenuOpen(false)} className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl border transition-all group hover:brightness-125 ${item.colorClass || 'bg-[var(--foreground)]/[0.02] border-[var(--border)] text-[var(--accent)]'}`}>
                              <span className="mb-0.5 scale-90 drop-shadow-md">{item.icon}</span>
                              <span className="text-[7px] font-black uppercase tracking-widest text-center">{item.label}</span>
                            </Link>
                          ))}
                        </div>

                        <div className="space-y-1">
                          {/* Main Row: Orders & Wallet side-by-side */}
                          <div className="grid grid-cols-1 gap-1.5 mb-1.5">
                            {HEADER_CONFIG.userMenu.common.slice(0, 2).map((item) => (
                              <Link key={item.label} href={item.href} onClick={() => setUserMenuOpen(false)} className="flex items-center justify-between p-2 rounded-xl bg-[var(--foreground)]/[0.02] border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all group">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border group-hover:scale-105 transition-transform shrink-0 scale-90 ${item.colorClass || "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20"}`}>{item.icon}</div>
                                  <div className="min-w-0">
                                    <p className="text-[9px] font-black uppercase tracking-tight text-[var(--foreground)] truncate">{item.label.replace("My ", "")}</p>
                                    <p className="text-[7px] text-[var(--muted)] uppercase tracking-widest opacity-60 line-clamp-2 leading-[1.2] whitespace-normal break-words">{item.desc.split(",")[0].split("&")[0]}</p>
                                  </div>
                                </div>
                                {item.label === "My Wallet" && (
                                  <div className="shrink-0 ml-1">
                                    {balanceLoading ? (
                                      <div className="h-3 w-8 bg-[var(--foreground)]/10 animate-pulse rounded"></div>
                                    ) : (
                                      <span className="text-[10px] font-black text-[var(--accent)]">₹{walletBalance}</span>
                                    )}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>

                          {/* Remaining items list */}
                          <div className="grid grid-cols-1 gap-1">
                            {HEADER_CONFIG.userMenu.common.slice(2).map((item) => (
                              <Link key={item.label} href={item.href} onClick={() => setUserMenuOpen(false)} className="flex items-center justify-between py-1.5 px-2 rounded-xl bg-[var(--foreground)]/[0.01] border border-transparent hover:border-[var(--accent)]/10 hover:bg-[var(--accent)]/5 transition-all group">
                                <div className="flex items-center gap-2">
                                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all scale-90 ${item.colorClass || "bg-[var(--foreground)]/5 text-[var(--muted)] border-transparent group-hover:text-[var(--accent)]"}`}>{item.icon}</div>
                                  <div className="flex flex-col">
                                    <p className="text-[10px] font-bold text-[var(--foreground)] leading-tight">{item.label}</p>
                                    <p className="text-[7px] text-[var(--muted)] opacity-60">{item.desc}</p>
                                  </div>
                                </div>
                                <FiChevronRight size={10} className="text-[var(--muted)] opacity-20 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </div>

                        {user?.userType === "owner" && (
                          <div className="relative mt-4 group">
                            <Link
                              href="/owner-panal"
                              onClick={() => setUserMenuOpen(false)}
                              className="relative flex items-center justify-between p-4 bg-[var(--background)] border border-[var(--border)] rounded-[1.5rem] overflow-hidden transition-all duration-300"
                            >
                              <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className="relative flex-shrink-0">
                                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-lg">
                                    <FiZap size={18} className="text-white" />
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[var(--background)]"></span>
                                  </div>
                                </div>

                                <div className="flex flex-col min-w-0 flex-1">
                                  <h4 className="text-xs font-black uppercase tracking-widest text-[var(--foreground)] mb-1">Admin Console</h4>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded-md border border-[var(--accent)]/20 uppercase">Elite Access</span>
                                    <span className="text-[9px] font-bold text-[#22c55e] flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#22c55e]"></span>Active</span>
                                  </div>
                                </div>

                                <div className="w-8 h-8 rounded-full bg-[var(--foreground)]/5 group-hover:bg-[var(--accent)]/10 flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] transition-all flex-shrink-0">
                                  <FiChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                              </div>
                            </Link>
                          </div>
                        )}
                      </>
                    )}

                  </div>

                  {/* Drawer Footer */}
                  <div className="relative z-10 py-2 px-4 border-t border-[var(--border)] bg-[var(--foreground)]/[0.02]">
                    <div className="mt-1 mb-1 text-center text-[10px] text-[var(--muted)]/40 font-mono tracking-widest">
                      Crafted with love ❤️ by <a href={`https://wa.me/${process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP}?text=hello big fan big fan`} target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:text-violet-400 transition-colors">Tk</a>
                    </div>
                  </div>
                </div>
              </>
            </div>
        </div>
      </div>

      {showLogoutToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000] opacity-100 translate-y-0 transition-all duration-500">
          <div className="px-6 py-3 rounded-full bg-[var(--card)] border border-green-500/20 flex items-center gap-3 shadow-xl backdrop-blur-xl">
            <FiCheckCircle className="text-green-500" size={18} />
            <span className="text-xs font-bold text-[var(--foreground)]">Logout Successful</span>
          </div>
        </div>
      )}

      {mobileSearchOpen && (
        <div
          className="lg:hidden absolute top-14 left-0 w-full bg-[var(--background)] border-b border-[var(--border)] shadow-2xl z-[900] p-4 space-y-4 opacity-100 translate-y-0 transition-all duration-300"
        >
          <div className="relative">
            <input
              autoFocus
              type="text"
              placeholder="Search available games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={fetchSearchData}
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[var(--foreground)]/[0.04] border border-[var(--border)] text-sm font-bold focus:border-[var(--accent)]/50 outline-none transition-all placeholder:text-[var(--muted)]/40"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent)]" size={18} />
            {searchTerm && (
              <button aria-label="button" onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((game) => (
                <Link
                  key={game.gameSlug}
                  href={`/games/${game.gameSlug}`}
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--foreground)]/[0.02] border border-[var(--border)] active:bg-[var(--accent)]/5 transition-all">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--border)]">
                      <Image src={game.gameImageId?.image || "/logoBB.png"} alt={game.gameName} width={48} height={48} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-[var(--foreground)] truncate">{game.gameName}</p>
                      <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest">{game.gameFrom}</p>
                    </div>
                    <FiChevronRight size={16} className="text-[var(--muted)]/30" />
                  </div>
                </Link>
              ))
            ) : searchTerm ? (
              <div className="py-10 text-center text-[var(--muted)]/40 text-[10px] font-black uppercase tracking-widest">No matching games found</div>
            ) : (
              <div className="py-6 text-center text-[var(--muted)]/30 text-[9px] font-black uppercase tracking-widest italic italic">Type to search available games</div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

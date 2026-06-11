"use client";

import { useState } from "react";
import { FiArrowRight, FiGift, FiX, FiSend, FiShare2 } from "react-icons/fi";
import Link from "next/link";

export default function GiveawayBanner() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <section className="w-full mt-2">
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="w-full text-left group relative flex items-center justify-between p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-500 overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
              <FiGift size={16} className="animate-bounce" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-xs font-bold tracking-tight text-[var(--foreground)]">
                  Join Mega Giveaway
                </h3>
                <span className="px-1.5 py-0.5 rounded-md bg-[var(--accent)] text-white text-[8px] font-black uppercase tracking-widest animate-pulse">
                  Win Big
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-red-500 text-white text-[8px] font-black uppercase tracking-widest animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span> LIVE
                </span>
              </div>
              <p className="text-[10px] text-[var(--muted)] mt-0.5">
                Free Rewards <span className="mx-1 opacity-40">•</span> <span className="font-semibold text-[#0088cc]">BlueBuff Esports</span>
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center gap-1 text-[10px] font-bold text-[var(--foreground)] opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="hidden sm:block">Join Now</span>
            <FiArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </section>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          />
          
          <div className="relative z-10 w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl shadow-[var(--accent)]/20 animate-in fade-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 flex items-center justify-center transition-colors z-20"
            >
              <FiX className="text-[var(--foreground)] opacity-70" />
            </button>

            {/* Header Area */}
            <div className="relative pt-10 pb-6 px-6 text-center bg-gradient-to-b from-[#0088cc]/10 to-transparent">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-[#0088cc]/20 flex items-center justify-center mb-4 border border-[#0088cc]/30 shadow-[0_0_20px_rgba(0,136,204,0.3)]">
                <FiSend size={28} className="text-[#0088cc] -ml-1" />
              </div>
              <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight mb-2 flex items-center justify-center gap-2">
                Telegram Giveaway!
                <span className="px-1.5 py-0.5 rounded-md bg-red-500 text-white text-[9px] font-black uppercase tracking-widest animate-pulse flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span> LIVE
                </span>
              </h2>
              <p className="text-[11px] text-[var(--muted)] font-medium leading-relaxed">Join the channel and add at least 5 friends to enter the giveaway.</p>
            </div>

            {/* Content Area */}
            <div className="px-6 pb-6 space-y-4">
              <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)] space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <FiGift size={14} className="text-yellow-500" />
                  </div>
                  <p className="text-[11px] text-[var(--foreground)] leading-snug"><strong className="text-yellow-500">Guaranteed Rewards:</strong> Everyone who joins will get some rewards!</p>
                </div>
                
                <div className="w-full h-px bg-[var(--border)]/50" />
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <FiShare2 size={14} className="text-[var(--accent)]" />
                  </div>
                  <p className="text-[11px] text-[var(--foreground)] leading-snug"><strong className="text-[var(--accent)]">Criteria:</strong> Join the channel and share to friends (add at least 5 people) to be eligible!</p>
                </div>
                
                <div className="w-full h-px bg-[var(--border)]/50" />
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0088cc]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <FiSend size={14} className="text-[#0088cc]" />
                  </div>
                  <p className="text-[11px] text-[var(--foreground)] leading-snug"><strong className="text-[#0088cc]">Claiming:</strong> Join and text us to get your reward instantly!</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link 
                  href="https://t.me/bluebuffesports" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(0,136,204,0.4)]"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <FiSend size={14} /> Join Telegram Now
                </Link>
                
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'BlueBuff Esports Giveaway',
                        text: 'Join the Mega Giveaway on BlueBuff Esports Telegram! Everyone gets rewards.',
                        url: 'https://t.me/bluebuffesports',
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText('https://t.me/bluebuffesports');
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="w-full py-3.5 rounded-xl bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  <FiShare2 size={14} /> Share with Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

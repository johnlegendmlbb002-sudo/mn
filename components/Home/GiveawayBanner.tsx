"use client";

import { useEffect, useState, useRef } from "react";
import { FiGift, FiChevronRight, FiX } from "react-icons/fi";
import GiveawayEntryModal from "@/components/Giveaway/GiveawayEntryModal";

const ROTATE_INTERVAL = 4000;

export default function GiveawayBanner() {
  const [giveaways, setGiveaways] = useState<any[]>([]);
  const [current, setCurrent]     = useState(0);
  const [visible, setVisible]     = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animKey, setAnimKey]     = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/giveaway")
      .then(r => r.json())
      .then(d => { if (d.giveaways?.length) { setGiveaways(d.giveaways); setVisible(true); } })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (giveaways.length <= 1) return;
    timerRef.current = setInterval(() => {
      setAnimKey(k => k + 1);
      setCurrent(c => (c + 1) % giveaways.length);
    }, ROTATE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [giveaways.length]);

  if (!visible || !giveaways.length) return null;
  const g = giveaways[current];

  return (
    <>
      <style>{`
        @keyframes gw-fade { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gw-swap { 0%{opacity:0;transform:translateX(8px)} 100%{opacity:1;transform:translateX(0)} }
        @keyframes gw-dot  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .gw-wrap {
          display:flex; align-items:center; gap:10px;
          padding: 8px 10px 8px 10px;
          border-radius:14px;
          border:1px solid color-mix(in srgb,var(--accent) 20%,var(--border));
          background: var(--card);
          box-shadow: 0 2px 12px rgba(0,0,0,0.12),
                      inset 0 1px 0 rgba(255,255,255,0.05);
          animation: gw-fade 0.35s cubic-bezier(0.22,1,0.36,1) both;
          cursor:pointer;
          position:relative;
          overflow:hidden;
        }
        .gw-wrap::before {
          content:'';
          position:absolute; inset-inline:0; top:0; height:1.5px;
          background:linear-gradient(90deg,transparent,var(--accent),transparent);
          opacity:0.6;
        }
        .gw-icon {
          flex-shrink:0;
          width:32px; height:32px; border-radius:9px;
          background:color-mix(in srgb,var(--accent) 14%,transparent);
          color:var(--accent);
          display:flex; align-items:center; justify-content:center;
        }
        .gw-text { flex:1; min-width:0; }
        .gw-label {
          display:flex; align-items:center; gap:5px;
          font-size:9px; font-weight:800;
          text-transform:uppercase; letter-spacing:0.09em;
          color:#ef4444; opacity:0.85;
          margin-bottom:1px;
        }
        .gw-live-dot {
          width:5px; height:5px; border-radius:50%;
          background:#ef4444;
          animation: gw-dot 1.4s ease infinite;
        }
        .gw-title {
          font-size:13px; font-weight:700;
          color:var(--foreground);
        }
        .gw-btn {
          flex-shrink:0;
          display:flex; align-items:center; gap:3px;
          padding:6px 12px; border-radius:8px; border:none; cursor:pointer;
          font-size:11px; font-weight:800; letter-spacing:0.03em;
          background:var(--accent); color:#fff;
          box-shadow:0 2px 10px color-mix(in srgb,var(--accent) 40%,transparent);
          transition:opacity 0.15s, transform 0.15s;
        }
        .gw-btn:hover{opacity:0.85;transform:scale(1.04);}
        .gw-close {
          flex-shrink:0;
          width:20px; height:20px; border-radius:50%; border:none; cursor:pointer;
          background:transparent; color:var(--muted);
          display:flex; align-items:center; justify-content:center;
          transition:color 0.15s, background 0.15s;
          margin-left:-2px;
        }
        .gw-close:hover{color:var(--foreground);background:var(--border);}
        .gw-content { animation: gw-swap 0.28s cubic-bezier(0.22,1,0.36,1) both; }
        .gw-dots { display:flex; align-items:center; gap:3px; }
        .gw-dot-item {
          height:3px; border-radius:99px;
          background:var(--accent);
          transition: width 0.3s ease, opacity 0.3s ease;
        }
      `}</style>

      <div className="gw-wrap" onClick={() => setShowModal(true)}>
        {/* Icon */}
        <div className="gw-icon">
          <FiGift size={15} />
        </div>

        {/* Text — animates on rotate */}
        <div className="gw-text">
          <div className="gw-label">
            <span className="gw-live-dot" />
            Giveaway Live
            {g.maxEntries > 0 ? (
              <span style={{ color:"var(--muted)", fontWeight:700, marginLeft:4 }}>• {g.entryCount || 0}/{g.maxEntries} Filled</span>
            ) : (
              <span style={{ color:"var(--muted)", fontWeight:700, marginLeft:4 }}>• {g.entryCount || 0} Entered</span>
            )}
          </div>
          <div key={animKey} className="gw-content gw-title">{g.title}</div>
        </div>

        {/* Dots if multiple */}
        {giveaways.length > 1 && (
          <div className="gw-dots">
            {giveaways.map((_, i) => (
              <div
                key={i}
                className="gw-dot-item"
                style={{ width: i === current ? "12px" : "3px", opacity: i === current ? 1 : 0.25 }}
                onClick={e => { e.stopPropagation(); setCurrent(i); setAnimKey(k => k+1); }}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <button className="gw-btn" onClick={e => { e.stopPropagation(); setShowModal(true); }}>
          Enter <FiChevronRight size={11} />
        </button>

        {/* Dismiss */}
        <button className="gw-close" onClick={e => { e.stopPropagation(); setVisible(false); }}>
          <FiX size={11} />
        </button>
      </div>

      {showModal && <GiveawayEntryModal giveaway={g} onClose={() => setShowModal(false)} />}
    </>
  );
}

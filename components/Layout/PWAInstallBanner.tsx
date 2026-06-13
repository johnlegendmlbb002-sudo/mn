"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    __pwaPrompt: { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> } | null;
  }
}

export default function PWAInstallBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Already installed as standalone — track active session and hide
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      fetch("/api/pwa/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "active" }),
      }).catch(() => {});
      return;
    }

    // Register SW so future visits can trigger the install prompt
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Also keep listening in case the event fires after hydration
    const lateHandler = (e: Event) => {
      e.preventDefault();
      window.__pwaPrompt = e as never;
    };
    window.addEventListener("beforeinstallprompt", lateHandler);

    // Show after 3s — prompt captured in window.__pwaPrompt by inline script
    const timer = setTimeout(() => setVisible(true), 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", lateHandler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    const prompt = window.__pwaPrompt;
    if (prompt) {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") {
        fetch("/api/pwa/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "installed" }),
        }).catch(() => {});
        setVisible(false);
        setDismissed(true);
      }
      window.__pwaPrompt = null;
    } else {
      // Fallback for browsers without install prompt support
      alert(
        /iphone|ipad|ipod/i.test(navigator.userAgent)
          ? 'Tap Share ↑ → "Add to Home Screen"'
          : 'Click the ⊕ icon in your browser address bar to install'
      );
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!visible || dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes pwa-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        #pwa-install-card {
          animation: pwa-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          position: fixed;
          bottom: 6px;
          right: 12px;
          width: 260px;
          z-index: 99999;
        }
        @media (min-width: 768px) {
          #pwa-install-card { bottom: 28px; right: 20px; width: 300px; }
        }
        #pwa-install-card .pwa-install-btn {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        #pwa-install-card .pwa-install-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(239,68,68,0.6) !important;
        }
        #pwa-install-card .pwa-close-btn:hover {
          background: rgba(255,255,255,0.12) !important;
          color: #f1f5f9 !important;
        }
      `}</style>

      <div id="pwa-install-card" role="dialog" aria-label="Install app">
        <div style={{
          background: "linear-gradient(150deg, #111827 0%, #0a0d18 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)",
          overflow: "hidden",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}>
          {/* Top accent bar */}
          <div style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, #ef4444 40%, #f97316 70%, transparent)",
          }} />

          <div style={{ padding: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

              {/* App icon */}
              <div style={{
                flexShrink: 0, width: 36, height: 36, borderRadius: "10px",
                overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#000",
              }}>
                <Image src="/logoBB.png" alt="BlueBuff" width={36} height={36}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "0.8rem", color: "#f8fafc", lineHeight: 1.2 }}>
                  Install BlueBuff
                </p>
             
              </div>

              {/* Install button */}
              <button id="pwa-install-btn" className="pwa-install-btn" onClick={handleInstall}
                style={{
                  flexShrink: 0, display: "flex", alignItems: "center", gap: "5px",
                  padding: "7px 14px", borderRadius: "9px", border: "none",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer",
                  letterSpacing: "0.02em",
                  boxShadow: "0 4px 14px rgba(239,68,68,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                  whiteSpace: "nowrap",
                }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Install
              </button>

              {/* Close */}
              <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Dismiss"
                style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)",
                  color: "#475569", cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "0.6rem", transition: "background 0.2s, color 0.2s",
                }}>✕</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

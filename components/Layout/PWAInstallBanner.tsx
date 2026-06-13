"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Don't show if already running as installed PWA
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if ((navigator as { standalone?: boolean }).standalone === true) return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Show after 3s on every page load
    const timer = setTimeout(() => setVisible(true), 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setVisible(false);
      setDeferredPrompt(null);
    } else {
      setShowGuide((v) => !v);
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
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
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
          #pwa-install-card {
            bottom: 28px;
            right: 20px;
            width: 300px;
          }
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
        @keyframes pwa-guide-in {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 60px; }
        }
        #pwa-install-card .pwa-guide {
          animation: pwa-guide-in 0.3s ease forwards;
          overflow: hidden;
        }
      `}</style>

      <div id="pwa-install-card" role="dialog" aria-label="Install app">

        {/* Card */}
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

          <div style={{ padding: "12px 12px 12px" }}>

            {/* Row 1: icon + text + close */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

              {/* App icon */}
              <div style={{
                flexShrink: 0,
                width: 38,
                height: 38,
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#000",
              }}>
                <Image
                  src="/logoBB.png"
                  alt="BlueBuff"
                  width={38}
                  height={38}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  color: "#f8fafc",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}>
                  Install mlbbtopup.in
                </p>
                <p style={{
                  margin: "3px 0 0",
                  fontSize: "0.67rem",
                  color: "#64748b",
                  lineHeight: 1.4,
                }}>
                  Add to home screen
                </p>
              </div>

              {/* Close */}
              <button
                className="pwa-close-btn"
                onClick={handleDismiss}
                aria-label="Dismiss"
                style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#475569",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6rem",
                  transition: "background 0.2s, color 0.2s",
                }}
              >✕</button>
            </div>

            {/* Divider */}
            <div style={{ margin: "10px 0", height: "1px", background: "rgba(255,255,255,0.05)" }} />

            {/* Row 2: site pill + install btn */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

              {/* Site pill */}
              <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 8px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                minWidth: 0,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span style={{
                  fontSize: "0.63rem",
                  color: "#475569",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>mlbbtopup.in</span>
              </div>

              {/* Install button */}
              <button
                id="pwa-install-btn"
                className="pwa-install-btn"
                onClick={handleInstall}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "7px 13px",
                  borderRadius: "9px",
                  border: "none",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  boxShadow: "0 4px 14px rgba(239,68,68,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {deferredPrompt ? "Install" : "How to"}
              </button>
            </div>

            {/* Manual guide (toggles on "How to" click) */}
            {showGuide && (
              <div className="pwa-guide" style={{
                marginTop: "10px",
                padding: "8px 10px",
                borderRadius: "8px",
                background: "rgba(96,165,250,0.06)",
                border: "1px solid rgba(96,165,250,0.12)",
                fontSize: "0.66rem",
                color: "#94a3b8",
                lineHeight: 1.6,
              }}>
                {typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent) ? (
                  <>Tap <strong style={{ color: "#60a5fa" }}>Share ↑</strong> → <strong style={{ color: "#60a5fa" }}>Add to Home Screen</ strong></>
                ) : (
                  <>Click <strong style={{ color: "#60a5fa" }}>⊕</strong> in your address bar to install</>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

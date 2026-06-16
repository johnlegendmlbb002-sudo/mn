"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    __pwaPrompt: { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> } | null;
  }
}

export default function PWAInstallBanner() {
  const [visible, setVisible]         = useState(false);
  const [dismissed, setDismissed]     = useState(false);
  const [showModal, setShowModal]     = useState(false);
  const [isIos, setIsIos]             = useState(false);
  const [isChromeIos, setIsChromeIos] = useState(false);
  const [browserType, setBrowserType] = useState<"chrome"|"samsung"|"firefox"|"other">("other");

  useEffect(() => {
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

    const ua = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    setIsIos(ios);
    setIsChromeIos(ios && /CriOS/i.test(ua)); // CriOS = Chrome on iOS

    if (/SamsungBrowser/i.test(ua))        setBrowserType("samsung");
    else if (/Firefox/i.test(ua))          setBrowserType("firefox");
    else if (/Chrome|Chromium|CriOS/i.test(ua)) setBrowserType("chrome");
    else                                    setBrowserType("other");

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const lateHandler = (e: Event) => {
      e.preventDefault();
      window.__pwaPrompt = e as never;
    };
    window.addEventListener("beforeinstallprompt", lateHandler);
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => {
      window.removeEventListener("beforeinstallprompt", lateHandler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    const prompt = window.__pwaPrompt;
    if (prompt) {
      // Chrome/Edge — trigger native install dialog
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
      // iOS / Firefox / Samsung — show custom install guide modal
      setShowModal(true);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    fetch("/api/pwa/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "dismissed" }),
    }).catch(() => {});
  };

  if (!visible || dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes pwa-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pwa-modal-in {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pwa-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
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

      {/* ── Floating install banner ── */}
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
          <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #ef4444 40%, #f97316 70%, transparent)" }} />
          <div style={{ padding: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#000" }}>
                <Image src="/logoBB.png" alt="BlueBuff" width={36} height={36} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "0.8rem", color: "#f8fafc", lineHeight: 1.2 }}>Install BlueBuff</p>
                <p style={{ margin: "2px 0 0", fontSize: "0.65rem", color: "#64748b" }}>Add to home screen</p>
              </div>
              <button id="pwa-install-btn" className="pwa-install-btn" onClick={handleInstall} style={{
                flexShrink: 0, display: "flex", alignItems: "center", gap: "5px",
                padding: "7px 14px", borderRadius: "9px", border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer",
                letterSpacing: "0.02em",
                boxShadow: "0 4px 14px rgba(239,68,68,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                whiteSpace: "nowrap",
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Install
              </button>
              <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Dismiss" style={{
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

      {/* ── Install Guide Modal (iOS / unsupported browsers) ── */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 999998,
              animation: "pwa-backdrop-in 0.3s ease forwards",
            }}
          />

          {/* Modal sheet */}
          <div style={{
            position: "fixed",
            bottom: 0, left: 0, right: 0,
            zIndex: 999999,
            animation: "pwa-modal-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}>
            <div style={{
              background: "linear-gradient(160deg, #0f1629 0%, #080b14 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "none",
              borderRadius: "24px 24px 0 0",
              padding: "0 0 32px",
              boxShadow: "0 -20px 60px rgba(0,0,0,0.8)",
            }}>
              {/* Drag handle */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", paddingBottom: "8px" }}>
                <div style={{ width: 40, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.15)" }} />
              </div>

              {/* App row — looks like the native Chrome dialog */}
              <div style={{ padding: "12px 20px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#000", flexShrink: 0 }}>
                    <Image src="/logoBB.png" alt="BlueBuff" width={56} height={56} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: "#f8fafc", letterSpacing: "-0.02em" }}>Install app</p>
                    <p style={{ margin: "2px 0 0", fontSize: "0.78rem", color: "#f8fafc", fontWeight: 600 }}>MLBB Top Up India</p>
                    <p style={{ margin: "1px 0 0", fontSize: "0.72rem", color: "#64748b" }}>mlbbtopup.in</p>
                  </div>
                </div>

                <div style={{ margin: "18px 0", height: "1px", background: "rgba(255,255,255,0.06)" }} />

                {/* Steps */}
                <p style={{ margin: "0 0 14px", fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {isIos ? "How to install on iOS" : "How to install"}
                </p>

                {isIos ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {isChromeIos ? (
                      // Chrome on iOS — Share icon is in the address bar (top)
                      <Step n={1} icon="⬆️" text={<>Tap the <strong style={{ color: "#60a5fa" }}>Share button (⬆️)</strong> in the address bar at the top</>} />
                    ) : (
                      // Safari — Share icon is at the bottom
                      <Step n={1} icon="⬆️" text={<>Tap the <strong style={{ color: "#60a5fa" }}>Share button (⬆️)</strong> at the bottom toolbar</>} />
                    )}
                    <Step n={2} icon="📲" text={<>Scroll and tap <strong style={{ color: "#60a5fa" }}>&quot;Add to Home Screen&quot;</strong></>} />
                    <Step n={3} icon="✅" text={<>Tap <strong style={{ color: "#60a5fa" }}>&quot;Add&quot;</strong> to confirm</>} />
                    {isChromeIos && (
                      <p style={{ margin: "4px 0 0", fontSize: "0.7rem", color: "#475569", lineHeight: 1.5 }}>
                        💡 For the best experience, open in <strong style={{ color: "#94a3b8" }}>Safari</strong> — Chrome on iOS has limited PWA support due to Apple restrictions.
                      </p>
                    )}
                  </div>
                ) : browserType === "samsung" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Step n={1} icon="⋮" text={<>Tap the <strong style={{ color: "#60a5fa" }}>menu (⋮)</strong> at the bottom of Samsung Browser</>} />
                    <Step n={2} icon="➕" text={<>Tap <strong style={{ color: "#60a5fa" }}>&quot;Add page to&quot;</strong> → <strong style={{ color: "#60a5fa" }}>&quot;Home screen&quot;</strong></>} />
                    <Step n={3} icon="✅" text={<>Tap <strong style={{ color: "#60a5fa" }}>&quot;Add&quot;</strong> to confirm</>} />
                  </div>
                ) : browserType === "firefox" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Step n={1} icon="⋮" text={<>Tap the <strong style={{ color: "#60a5fa" }}>menu (⋮)</strong> in Firefox</>} />
                    <Step n={2} icon="📲" text={<>Tap <strong style={{ color: "#60a5fa" }}>&quot;Install&quot;</strong> or <strong style={{ color: "#60a5fa" }}>&quot;Add to Home Screen&quot;</strong></>} />
                    <Step n={3} icon="✅" text={<>Tap <strong style={{ color: "#60a5fa" }}>&quot;Add&quot;</strong> to confirm</>} />
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Step n={1} icon="⋮" text={<>Tap the <strong style={{ color: "#60a5fa" }}>menu (⋮)</strong> in your browser</>} />
                    <Step n={2} icon="📲" text={<>Tap <strong style={{ color: "#60a5fa" }}>&quot;Add to Home Screen&quot;</strong> or <strong style={{ color: "#60a5fa" }}>&quot;Install App&quot;</strong></>} />
                    <Step n={3} icon="✅" text={<>Tap <strong style={{ color: "#60a5fa" }}>&quot;Add&quot;</strong> to confirm</>} />
                  </div>
                )}

                <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1, padding: "13px", borderRadius: "13px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#94a3b8", fontWeight: 700, fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 2, padding: "13px", borderRadius: "13px",
                      border: "none",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      color: "#fff", fontWeight: 700, fontSize: "0.85rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 18px rgba(239,68,68,0.45)",
                    }}
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/* Step row */
function Step({ n, icon, text }: { n: number; icon: string; text: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
      <div style={{
        flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.7rem", fontWeight: 800, color: "#ef4444",
      }}>{n}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px" }}>
        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
        <p style={{ margin: 0, fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.5 }}>{text}</p>
      </div>
    </div>
  );
}

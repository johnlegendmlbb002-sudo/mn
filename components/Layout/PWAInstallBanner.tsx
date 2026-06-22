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
    // 1. Check if user dismissed it in the last 24 hours
    const dismissedUntil = localStorage.getItem("pwa_dismissed_until");
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      fetch("/api/pwa/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "active" }) }).catch(() => {});
      return;
    }

    const ua  = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    setIsIos(ios);
    setIsChromeIos(ios && /CriOS/i.test(ua));
    if (/SamsungBrowser/i.test(ua))             setBrowserType("samsung");
    else if (/Firefox/i.test(ua))               setBrowserType("firefox");
    else if (/Chrome|Chromium|CriOS/i.test(ua)) setBrowserType("chrome");
    else                                         setBrowserType("other");

    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});

    const lateHandler = (e: Event) => { e.preventDefault(); window.__pwaPrompt = e as never; };
    window.addEventListener("beforeinstallprompt", lateHandler);
    const timer = setTimeout(() => setVisible(true), 2000); // 2 second delay
    return () => { window.removeEventListener("beforeinstallprompt", lateHandler); clearTimeout(timer); };
  }, []);

  const handleInstall = async () => {
    const prompt = window.__pwaPrompt;
    if (prompt) {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") {
        fetch("/api/pwa/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "installed" }) }).catch(() => {});
        setVisible(false); setDismissed(true);
      }
      window.__pwaPrompt = null;
    } else {
      setShowModal(true);
    }
  };

  const handleDismiss = () => {
    setVisible(false); setDismissed(true);
    // Hide for 24 hours (1 day = 86400000 ms)
    localStorage.setItem("pwa_dismissed_until", (Date.now() + 86400000).toString());
    fetch("/api/pwa/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "dismissed" }) }).catch(() => {});
  };

  if (!visible || dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes pwa-in { from{opacity:0;transform:translateY(10px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pwa-sheet-in { from{opacity:0;transform:translateY(100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes pwa-back-in  { from{opacity:0} to{opacity:1} }

        #pwa-card {
          position:fixed; bottom:10px; right:12px; width:252px; z-index:99999;
          animation: pwa-in 0.38s cubic-bezier(0.22,1,0.36,1) both;
          border-radius:16px; overflow:hidden;
          background:var(--card);
          border:1px solid color-mix(in srgb,var(--accent) 22%,var(--border));
          box-shadow:0 8px 32px rgba(0,0,0,0.18),
                     0 0 0 1px color-mix(in srgb,var(--accent) 8%,transparent);
        }
        @media(min-width:768px){ #pwa-card{bottom:24px;right:20px;width:280px} }

        .pwa-top-line {
          height:2px;
          background:linear-gradient(90deg,transparent,var(--accent),transparent);
          opacity:0.65;
        }
        .pwa-install-btn {
          display:flex; align-items:center; gap:5px;
          padding:7px 13px; border-radius:9px; border:none; cursor:pointer;
          font-size:11px; font-weight:800; letter-spacing:0.03em; white-space:nowrap;
          background:var(--accent); color:#fff;
          box-shadow:0 3px 12px color-mix(in srgb,var(--accent) 40%,transparent);
          transition:opacity 0.15s,transform 0.15s;
          flex-shrink:0;
        }
        .pwa-install-btn:hover{opacity:0.85;transform:scale(1.04);}
        .pwa-close-btn {
          flex-shrink:0; width:22px; height:22px; border-radius:50%; cursor:pointer;
          border:1px solid var(--border); background:var(--background);
          color:var(--muted); display:flex; align-items:center; justify-content:center;
          font-size:9px; transition:color 0.15s,background 0.15s;
        }
        .pwa-close-btn:hover{color:var(--foreground);background:var(--card);}

        /* Modal */
        .pwa-backdrop {
          position:fixed; inset:0; z-index:999998;
          background:rgba(0,0,0,0.55); backdrop-filter:blur(5px);
          animation:pwa-back-in 0.25s ease both;
        }
        .pwa-sheet-wrap {
          position:fixed; bottom:0; left:0; right:0; z-index:999999;
          animation:pwa-sheet-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .pwa-sheet {
          background:var(--card);
          border:1px solid var(--border); border-bottom:none;
          border-radius:22px 22px 0 0;
          box-shadow:0 -12px 40px rgba(0,0,0,0.25);
          padding-bottom:32px;
        }
        .pwa-step-num {
          flex-shrink:0; width:26px; height:26px; border-radius:50%;
          background:color-mix(in srgb,var(--accent) 10%,transparent);
          border:1px solid color-mix(in srgb,var(--accent) 22%,transparent);
          color:var(--accent);
          display:flex; align-items:center; justify-content:center;
          font-size:10px; font-weight:800;
        }
        .pwa-step-strong { color:var(--accent); }
        .pwa-cancel-btn {
          flex:1; padding:12px; border-radius:12px; cursor:pointer; font-size:13px; font-weight:700;
          border:1px solid var(--border); background:var(--background); color:var(--muted);
          transition:color 0.15s;
        }
        .pwa-cancel-btn:hover{color:var(--foreground);}
        .pwa-ok-btn {
          flex:2; padding:12px; border-radius:12px; cursor:pointer; font-size:13px; font-weight:800;
          border:none; background:var(--accent); color:#fff;
          box-shadow:0 4px 16px color-mix(in srgb,var(--accent) 35%,transparent);
          transition:opacity 0.15s;
        }
        .pwa-ok-btn:hover{opacity:0.87;}
      `}</style>

      {/* ── Floating card ── */}
      <div id="pwa-card" role="dialog" aria-label="Install app">
        <div className="pwa-top-line" />
        <div style={{ padding:"8px 10px", display:"flex", alignItems:"center", gap:"7px" }}>
          {/* App icon */}
          <div style={{ flexShrink:0, width:28, height:28, borderRadius:8, overflow:"hidden", border:"1px solid var(--border)", background:"var(--background)" }}>
            <Image src="/logoBB.png" alt="MLBB Topup" width={28} height={28} style={{ objectFit:"cover", width:"100%", height:"100%" }} />
          </div>
          {/* Text */}
          <div style={{ flex:1, minWidth:0, paddingRight:2 }}>
            <p style={{ margin:0, fontWeight:700, fontSize:"11px", color:"var(--foreground)", lineHeight:1.2 }}>Install MLBB Topup</p>
            <p style={{ margin:"1px 0 0", fontSize:"9px", color:"var(--muted)" }}>Add to home screen</p>
          </div>
          {/* Install */}
          <button className="pwa-install-btn" id="pwa-install-btn" onClick={handleInstall}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Install
          </button>
          {/* Close */}
          <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Dismiss">✕</button>
        </div>
      </div>

      {/* ── Install guide modal ── */}
      {showModal && (
        <>
          <div className="pwa-backdrop" onClick={() => setShowModal(false)} />
          <div className="pwa-sheet-wrap">
            <div className="pwa-sheet">
              {/* Handle */}
              <div style={{ display:"flex", justifyContent:"center", paddingTop:14, paddingBottom:8 }}>
                <div style={{ width:36, height:4, borderRadius:99, background:"var(--border)" }} />
              </div>

              <div style={{ padding:"10px 20px 0" }}>
                {/* App row */}
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                  <div style={{ width:52, height:52, borderRadius:13, overflow:"hidden", border:"1px solid var(--border)", background:"var(--background)", flexShrink:0 }}>
                    <Image src="/logoBB.png" alt="MLBB Topup" width={52} height={52} style={{ objectFit:"cover", width:"100%", height:"100%" }} />
                  </div>
                  <div>
                    <p style={{ margin:0, fontWeight:800, fontSize:15, color:"var(--foreground)" }}>Install app</p>
                    <p style={{ margin:"2px 0 0", fontSize:13, fontWeight:600, color:"var(--foreground)" }}>MLBB Top Up India</p>
                    <p style={{ margin:"1px 0 0", fontSize:11, color:"var(--muted)" }}>mlbbtopup.in</p>
                  </div>
                </div>

                <div style={{ height:1, background:"var(--border)", marginBottom:16 }} />

                {/* Steps heading */}
                <p style={{ margin:"0 0 12px", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.09em", color:"var(--muted)" }}>
                  {isIos ? "How to install on iOS" : "How to install"}
                </p>

                {/* Steps */}
                <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                  {isIos ? (<>
                    <Step n={1} icon={isChromeIos ? "⬆️" : "⬆️"} text={isChromeIos
                      ? <><strong className="pwa-step-strong">Share button (⬆️)</strong> in the address bar at the top</>
                      : <><strong className="pwa-step-strong">Share button (⬆️)</strong> at the bottom toolbar</>} />
                    <Step n={2} icon="📲" text={<>Scroll and tap <strong className="pwa-step-strong">&quot;Add to Home Screen&quot;</strong></>} />
                    <Step n={3} icon="✅" text={<>Tap <strong className="pwa-step-strong">&quot;Add&quot;</strong> to confirm</>} />
                    {isChromeIos && <p style={{ margin:"4px 0 0", fontSize:11, color:"var(--muted)", lineHeight:1.5 }}>💡 For best experience, open in <strong style={{ color:"var(--foreground)" }}>Safari</strong></p>}
                  </>) : browserType === "samsung" ? (<>
                    <Step n={1} icon="⋮" text={<>Tap <strong className="pwa-step-strong">menu (⋮)</strong> at the bottom of Samsung Browser</>} />
                    <Step n={2} icon="➕" text={<>Tap <strong className="pwa-step-strong">&quot;Add page to&quot;</strong> → <strong className="pwa-step-strong">&quot;Home screen&quot;</strong></>} />
                    <Step n={3} icon="✅" text={<>Tap <strong className="pwa-step-strong">&quot;Add&quot;</strong> to confirm</>} />
                  </>) : browserType === "firefox" ? (<>
                    <Step n={1} icon="⋮" text={<>Tap <strong className="pwa-step-strong">menu (⋮)</strong> in Firefox</>} />
                    <Step n={2} icon="📲" text={<>Tap <strong className="pwa-step-strong">&quot;Install&quot;</strong> or <strong className="pwa-step-strong">&quot;Add to Home Screen&quot;</strong></>} />
                    <Step n={3} icon="✅" text={<>Tap <strong className="pwa-step-strong">&quot;Add&quot;</strong> to confirm</>} />
                  </>) : (<>
                    <Step n={1} icon="⋮" text={<>Tap <strong className="pwa-step-strong">menu (⋮)</strong> in your browser</>} />
                    <Step n={2} icon="📲" text={<>Tap <strong className="pwa-step-strong">&quot;Add to Home Screen&quot;</strong> or <strong className="pwa-step-strong">&quot;Install App&quot;</strong></>} />
                    <Step n={3} icon="✅" text={<>Tap <strong className="pwa-step-strong">&quot;Add&quot;</strong> to confirm</>} />
                  </>)}
                </div>

                {/* Buttons */}
                <div style={{ marginTop:20, display:"flex", gap:10 }}>
                  <button className="pwa-cancel-btn" onClick={handleDismiss}>Cancel</button>
                  <button className="pwa-ok-btn"     onClick={() => setShowModal(false)}>Got it!</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Step({ n, icon, text }: { n: number; icon: string; text: React.ReactNode }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
      <div className="pwa-step-num">{n}</div>
      <div style={{ display:"flex", alignItems:"center", gap:7, paddingTop:3 }}>
        <span style={{ fontSize:"1rem" }}>{icon}</span>
        <p style={{ margin:0, fontSize:13, color:"var(--foreground)", lineHeight:1.5 }}>{text}</p>
      </div>
    </div>
  );
}

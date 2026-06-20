"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { ADSTERRA_CONFIG } from "./AdConfig";

export default function FooterBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!ADSTERRA_CONFIG.enableAds || !isVisible) return null;

  const iframeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }</style>
      </head>
      <body>
        <script>
          atOptions = {
            'key' : '183ee4e45520fb7aa8e1d934a0970c31',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script src="https://www.highperformanceformat.com/183ee4e45520fb7aa8e1d934a0970c31/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center bg-[var(--background)]/90 backdrop-blur-md border-t border-[var(--border)] py-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="relative">
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-3 -right-3 w-6 h-6 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--muted)] hover:text-white hover:border-[var(--accent)] transition-colors z-10 shadow-lg"
          aria-label="Close Ad"
        >
          <FiX size={12} />
        </button>

        {/* Ad Container */}
        <div 
          className="relative overflow-hidden rounded-md" 
          style={{ width: '320px', height: '50px' }}
        >
          <iframe
            srcDoc={iframeHtml}
            width="320"
            height="50"
            frameBorder="0"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            style={{ border: 'none', overflow: 'hidden' }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Script from "next/script";
import { ADSTERRA_CONFIG } from "./AdConfig";

interface NativeBannerProps {
  className?: string;
}

/**
 * Reusable Adsterra Banner component.
 */
export default function NativeBanner({
  className = ""
}: NativeBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!ADSTERRA_CONFIG.enableAds) {
    return (
      <div className={`flex justify-center items-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--foreground)]/[0.03] min-h-[50px] ${className}`}>
        <span className="text-xs text-[var(--muted)] opacity-50">Ad Space</span>
      </div>
    );
  }

  const { id, src } = ADSTERRA_CONFIG.nativeBanner;

  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }
        </style>
      </head>
      <body>
        <div id="container-${id}"></div>
        <script type="text/javascript" src="${src}"></script>
      </body>
    </html>
  `;

  return (
    <div className={`flex justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--foreground)]/[0.03] min-h-[50px] ${className}`}>
      <iframe
        title="Advertisement"
        width="100%"
        height="60"
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
        style={{ border: 'none', overflow: 'hidden', backgroundColor: 'transparent' }}
        scrolling="no"
      />
    </div>
  );
}

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

  return (
    <div className={`flex justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--foreground)]/[0.03] min-h-[50px] ${className}`}>
      <div id={`container-${id}`} ref={containerRef}></div>
      <Script 
        async 
        data-cfasync="false" 
        src={src} 
        strategy="afterInteractive"
      />
    </div>
  );
}

"use client";

import Script from "next/script";
import { ADSTERRA_CONFIG } from "./AdConfig";

export default function AdsterraPopunder() {
  if (!ADSTERRA_CONFIG.enableAds) return null;

  return (
    <Script
      src={ADSTERRA_CONFIG.popunder.src}
      strategy="afterInteractive"
    />
  );
}

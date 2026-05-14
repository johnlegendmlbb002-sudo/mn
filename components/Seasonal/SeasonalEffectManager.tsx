"use client";
// Seasonal theme manager for global effects 

import { useUIStore } from "@/store/useUIStore";
import SnowEffect from "@/components/Seasonal/SnowEffect";
import ValentineEffect from "@/components/Seasonal/ValentineEffect";
import HoliEffect from "@/components/Seasonal/HoliEffect";
import DiwaliEffect from "@/components/Seasonal/DiwaliEffect";
import MonsoonEffect from "@/components/Seasonal/MonsoonEffect";
import EidEffect from "@/components/Seasonal/EidEffect";

export default function SeasonalEffectManager() {
  const activeThemeEffect = useUIStore((state) => state.activeThemeEffect);

  switch (activeThemeEffect) {
    case "christmas":
      return <SnowEffect />;
    case "valentine":
      return <ValentineEffect />;
    case "holi":
      return <HoliEffect />;
    case "diwali":
      return <DiwaliEffect />;
    case "monsoon":
      return <MonsoonEffect />;
    case "eid":
      return <EidEffect />;
    default:
      return null;
  }
}

"use client";

import Image from "next/image";

export default function SupportBanner() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative w-full aspect-[16/9] md:aspect-[3/1] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
        <Image
          src="https://res.cloudinary.com/dwt0xaang/image/upload/v1778586426/ajgfvaehf_vtgcin.png"
          alt="Support Banner"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

"use client";

import React from "react";

export const BuyFlowSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto animate-pulse px-2 sm:px-4">
      {/* Back Button */}
      <div className="h-2 w-16 bg-[var(--border)] rounded-md mb-8 opacity-50" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hero Card */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-6 h-32 flex items-center gap-6 opacity-60">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--border)] rounded-2xl shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-2 w-16 bg-[var(--border)] rounded-full" />
              <div className="h-5 w-3/4 bg-[var(--border)] rounded-md" />
              <div className="h-6 w-24 bg-[var(--border)] rounded-md" />
            </div>
          </div>

          {/* More Packs */}
          <div className="space-y-4">
            <div className="h-3 w-40 bg-[var(--border)] rounded-md opacity-40" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-[var(--card)] border border-[var(--border)] rounded-2xl opacity-50" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Player Info */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-6 space-y-6 opacity-80">
            <div className="h-5 w-40 bg-[var(--border)] rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-12 bg-[var(--background)] border border-[var(--border)] rounded-xl" />
              <div className="h-12 bg-[var(--background)] border border-[var(--border)] rounded-xl" />
            </div>
            <div className="h-14 w-full bg-[var(--border)] rounded-xl opacity-30" />
            
            <div className="pt-4 border-t border-[var(--border)] space-y-3">
              <div className="h-3 w-32 bg-[var(--border)] rounded-md" />
              <div className="h-12 bg-[var(--background)] rounded-2xl" />
              <div className="h-12 bg-[var(--background)] rounded-2xl opacity-60" />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-6 space-y-6 opacity-80">
            <div className="h-5 w-32 bg-[var(--border)] rounded-md" />
            <div className="h-16 bg-[var(--background)] border border-[var(--border)] rounded-2xl" />
            
            <div className="pt-6 space-y-6">
              <div className="flex justify-between items-center px-2">
                <div className="h-3 w-24 bg-[var(--border)] rounded-md" />
                <div className="h-8 w-20 bg-[var(--border)] rounded-md" />
              </div>
              <div className="h-16 w-full bg-[var(--border)] rounded-3xl opacity-50" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

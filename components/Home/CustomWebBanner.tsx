import Link from "next/link";
import { FiGlobe, FiLayout, FiCode, FiChevronRight } from "react-icons/fi";

export default function CustomWebBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-2 mb-1">
      <Link href="https://web.bluebuff.in" target="_blank" rel="noopener noreferrer" className="block">
        <div className="group relative flex items-center justify-between px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-[2rem] bg-[var(--card)] border border-[var(--border)] hover:border-blue-500/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="relative z-10 flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Overlapping Icons */}
            <div className="flex items-center -space-x-2 sm:-space-x-3 ml-1 shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--background)] flex items-center justify-center border-[2px] border-[var(--card)] text-blue-500 z-30 shadow-sm transition-transform group-hover:scale-105">
                <FiGlobe size={12} className="sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--background)] flex items-center justify-center border-[2px] border-[var(--card)] text-blue-500 z-20 shadow-sm transition-transform group-hover:scale-105 delay-75">
                <FiLayout size={12} className="sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--background)] flex items-center justify-center border-[2px] border-[var(--card)] text-blue-500 z-10 shadow-sm transition-transform group-hover:scale-105 delay-150">
                <FiCode size={12} className="sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
            
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] sm:text-[14px] font-black tracking-wide text-[var(--foreground)] leading-tight truncate italic uppercase drop-shadow-md">
                  Web Platform
                </h3>
                <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest shadow-sm shrink-0">
                  Free
                </span>
              </div>
              <p className="text-[8px] sm:text-[9px] font-bold text-[var(--muted)] mt-1 tracking-[0.1em] uppercase truncate">
                BUILD • CUSTOMISE • LAUNCH
              </p>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="relative z-10 hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] sm:text-[10px] font-bold text-blue-500 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors uppercase tracking-wider shrink-0 ml-2">
            Build Now
            <FiChevronRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
          
          {/* Mobile Right Arrow */}
          <div className="sm:hidden relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 shrink-0 ml-1">
            <FiChevronRight size={14} />
          </div>
        </div>
      </Link>
    </section>
  );
}

import Link from "next/link";
import { FiArrowRight, FiCode } from "react-icons/fi";

export default function CustomWebBanner() {
  return (
    <section className="w-full">
      <Link href="https://web.bluebuff.in" target="_blank" rel="noopener noreferrer">
        <div className="group relative flex items-center justify-between p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)]/20 transition-all duration-500 overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--foreground)]/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--foreground)]/5 text-[var(--foreground)]">
              <FiCode size={14} />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold tracking-tight text-[var(--foreground)]">
                  Build Your Own Web Platform
                </h3>
                <span className="px-1.5 py-0.5 rounded-md bg-[var(--foreground)] text-[var(--background)] text-[8px] font-black uppercase tracking-widest">
                  Free
                </span>
              </div>
              <p className="text-[10px] text-[var(--muted)] mt-0.5">
                Fully customisable <span className="mx-1 opacity-40">•</span> <span className="font-semibold text-[var(--foreground)]">web.bluebuff.in</span>
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center gap-1 text-[10px] font-bold text-[var(--foreground)] opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="hidden sm:block">Explore</span>
            <FiArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </section>
  );
}

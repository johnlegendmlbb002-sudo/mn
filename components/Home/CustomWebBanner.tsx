import Link from "next/link";
import { FiArrowRight, FiCode } from "react-icons/fi";

export default function CustomWebBanner() {
  return (
    <section className="w-full">
      <Link href="https://web.bluebuff.in" target="_blank" rel="noopener noreferrer">
        <div className="group relative flex items-center justify-between p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)]/20 transition-all duration-500 overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--foreground)]/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[var(--foreground)]/5 text-[var(--foreground)]">
              <FiCode size={18} />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                  Build Your Own Web Platform
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-[9px] font-bold uppercase tracking-widest">
                  Free
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                Fully customisable <span className="mx-1.5 opacity-40">•</span> <span className="font-medium text-[var(--foreground)]">web.bluebuff.in</span>
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-[var(--foreground)] opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="hidden sm:block">Explore</span>
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </section>
  );
}

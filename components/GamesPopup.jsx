"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiArrowRight } from "react-icons/fi";
import Image from "next/image";

export default function GamesPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("games_popup_seen");
    if (!shown) {
      const t = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("games_popup_seen", "1");
      }, 700);

      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {/* Subtle Blur Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-[8px]"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-[280px] z-10"
          >
            {/* Ultra Premium Compact Card */}
            <div className="relative bg-white rounded-3xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden text-center">
              
              {/* Elegant Top Gradient */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button aria-label="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-20"
              >
                <FiX size={14} />
              </button>

              <div className="relative z-10 flex flex-col items-center">
                
                {/* Image Container */}
                <div className="relative mb-5 mt-2 rounded-xl overflow-hidden shadow-sm">
                  <Image 
                    src="https://res.cloudinary.com/dwt0xaang/image/upload/v1783062675/games-blue_pdkxu3.png" 
                    alt="Games" 
                    width={250} 
                    height={250} 
                    className="object-contain"
                  />
                </div>

                {/* Action Button */}
                <a
                  href="https://games.bluebuff.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#0066FF] !text-white font-bold text-xs tracking-wide shadow-[0_8px_20px_-6px_rgba(0,102,255,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(0,102,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  Play for Free
                  <FiArrowRight size={14} />
                </a>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

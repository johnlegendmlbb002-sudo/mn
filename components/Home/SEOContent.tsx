"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiCheck, FiArrowRight, FiInfo } from "react-icons/fi";

const FAQS = [
  {
    q: "How do I buy MLBB diamonds in India?",
    a: "Visit mlbbtopup.in, select your pack, enter your Player ID and Zone ID, choose a payment method, and confirm. Diamonds are delivered within 5 minutes — no login required.",
  },
  {
    q: "Is mlbbtopup.in safe and legit?",
    a: "Yes. We use secure UPI payment gateways and top up directly via Moonton's API. Your account credentials are never required — only your Player ID.",
  },
  {
    q: "What is the cheapest way to buy MLBB diamonds?",
    a: "Our pricing is consistently 10–20% cheaper than Codashop. The Weekly Diamond Pass (WDP) starting at ₹89 is the absolute best value for casual players.",
  },
  {
    q: "How fast is the diamond delivery?",
    a: "Delivery is instant — typically within 1 to 5 minutes of successful payment. Our automated delivery system runs 24×7 without any delay.",
  },
  {
    q: "Which payment methods are supported?",
    a: "We support all major Indian payment methods: UPI, PhonePe, Google Pay, Paytm, and bank transfers. No international card needed.",
  },
  {
    q: "Is the MLBB Weekly Diamond Pass worth it?",
    a: "Absolutely. The Pass gives you 100 diamonds upfront plus 20/day for 7 days (240 total). At ₹89, it's the highest-value purchase available.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

export default function SEOContent() {
  return (
    <section className="py-8 relative overflow-hidden bg-[var(--background)]">
      {/* Ultra-subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,_transparent_70%)] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        
        {/* ── Section 1: About & Features (Minimal Grid) ────────────────── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Text Block */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-[var(--foreground)] leading-none">
              Cheapest <span className="text-[var(--accent)]">MLBB Diamond</span> Top Up In India
            </h2>
            <div className="space-y-3">
              <p className="text-[11px] sm:text-xs text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--foreground)]">mlbbtopup.in</strong> is India's most affordable Mobile Legends: Bang Bang diamond top-up platform. Enjoy instant recharges via UPI, PhonePe, Google Pay, and Paytm without ever logging into Moonton. Provide your <strong className="text-[var(--foreground)]">Player ID and Zone ID</strong> to receive diamonds instantly.
              </p>
              <p className="text-[11px] sm:text-xs text-[var(--muted)] leading-relaxed">
                Whether you're buying the <strong className="text-[var(--foreground)]">Weekly Diamond Pass</strong> or stocking up for an event, our pricing remains <strong className="text-[var(--accent)]">10–20% cheaper than Codashop</strong>. Trusted by thousands of Indian MLBB players.
              </p>
            </div>
          </motion.div>

          {/* Right Features Grid */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 p-5 sm:p-6 rounded-2xl bg-[var(--card)]/30 border border-[var(--border)] shadow-sm backdrop-blur-md">
              {[
                ["Lowest Prices in India", "Consistently beats Codashop & in-game rates."],
                ["Instant 24×7 Delivery", "Diamonds credited to your account in 1–5 mins."],
                ["No Login Required", "100% safe. Only Player ID & Zone ID needed."],
                ["All UPI Supported", "PhonePe, Google Pay, Paytm, and any UPI VPA."],
                ["100% Verified & Safe", "Zero bans. Thousands of successful orders."],
                ["Weekly Pass Specialists", "Best WDP prices in the country, starting at ₹89."],
              ].map(([title, desc], i) => (
                <div key={i} className="flex gap-3 items-start group">
                  <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20 group-hover:bg-[var(--accent)] transition-colors">
                    <FiCheck size={10} className="text-[var(--accent)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--foreground)] mb-0.5 leading-none">{title}</h4>
                    <p className="text-[10px] text-[var(--muted)] leading-tight">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Section 2: How to Top Up (Sleek Bar) ──────────────────── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[var(--foreground)]">
              How to Buy <span className="text-[var(--accent)]">— Step by Step</span>
            </h2>
          </div>
          
          <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-md overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
              {[
                { step: "1", title: "Select Package", desc: "Pick a diamond pack or Weekly Pass." },
                { step: "2", title: "Enter Details", desc: "Input Player ID & Zone ID safely." },
                { step: "3", title: "Make Payment", desc: "Pay instantly via UPI, GPay, or Paytm." },
                { step: "4", title: "Instant Delivery", desc: "Diamonds arrive in 1–5 minutes." },
              ].map((item, i) => (
                <div key={item.step} className="p-4 sm:p-5 group hover:bg-[var(--accent)]/[0.02] transition-colors">
                  <div className="text-[9px] font-black tracking-widest uppercase text-[var(--accent)] mb-2 flex items-center gap-1.5">
                    Step {item.step}
                    <FiArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-1 leading-none">{item.title}</h3>
                  <p className="text-[10px] text-[var(--muted)] leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Section 3: FAQ (Minimal List) ────────────────────────────── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="space-y-4"
        >
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[var(--foreground)]">
            Frequently Asked <span className="text-[var(--accent)]">Questions</span>
          </h2>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {FAQS.map((faq, i) => (
              <div 
                key={faq.q} 
                className="py-3 border-b border-[var(--border)]/50 hover:border-[var(--accent)]/30 transition-colors group"
              >
                <div className="flex items-start gap-2 mb-1">
                  <FiInfo size={12} className="text-[var(--accent)] mt-0.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[var(--muted)] leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

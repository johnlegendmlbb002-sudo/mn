import Link from "next/link";

const FAQS = [
  {
    q: "How do I buy MLBB diamonds in India?",
    a: "Visit mlbbtopup.in, select your diamond pack, enter your MLBB Player ID and Zone ID, choose UPI, PhonePe, Google Pay, or Paytm as your payment method, and confirm. Diamonds are delivered to your account within 5 minutes — no login to Moonton required.",
  },
  {
    q: "Is mlbbtopup.in safe and legit?",
    a: "Yes. mlbbtopup.in is a trusted MLBB diamond top-up site used by thousands of Indian players. We use secure UPI payment gateways and top up directly via Moonton's official API. Your account credentials are never required — only your Player ID and Zone ID.",
  },
  {
    q: "What is the cheapest way to buy MLBB diamonds in India?",
    a: "mlbbtopup.in consistently offers the lowest diamond prices in India — often 10–20% cheaper than Codashop or the in-game store. Our Weekly Diamond Pass (WDP) starting at ₹89 is the best value for casual players.",
  },
  {
    q: "How fast is the diamond delivery?",
    a: "Diamond delivery is instant — typically within 1 to 5 minutes of successful payment. Our automated delivery system runs 24×7, so you can top up at midnight before a big ranked session without any delay.",
  },
  {
    q: "Which payment methods are supported?",
    a: "We support all major Indian payment methods: UPI (any VPA/QR), PhonePe, Google Pay, Paytm, and bank transfers. No credit card or international payment needed.",
  },
  {
    q: "Is the MLBB Weekly Diamond Pass worth it?",
    a: "Absolutely. The Weekly Diamond Pass gives you 100 diamonds immediately plus 20 diamonds/day for 7 days — totalling 240 diamonds. At ₹89 on mlbbtopup.in, that's less than ₹0.37 per diamond, making it the highest-value MLBB purchase for regular players.",
  },
];

export default function SEOContent() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">

        {/* ── Section 1: About + Why Us ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
              Cheapest MLBB Diamond Top Up in India
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              <strong className="text-[var(--foreground)]">mlbbtopup.in</strong> is India's most affordable Mobile Legends: Bang Bang diamond top-up platform. We offer instant MLBB recharge with UPI, PhonePe, Google Pay, and Paytm — no Moonton login required. Just enter your <strong className="text-[var(--foreground)]">Player ID and Zone ID</strong>, pick a diamond pack, pay, and receive your diamonds within minutes.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Whether you're buying the <strong className="text-[var(--foreground)]">MLBB Weekly Diamond Pass</strong>, loading up for a new skin, or stocking up for a ranked push, our pricing is consistently <strong className="text-[var(--foreground)]">10–20% cheaper than Codashop</strong> and the in-game store. Trusted by thousands of Indian MLBB players across Delhi, Mumbai, Bangalore, Hyderabad, Chennai, and beyond.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-widest text-[var(--accent)]">Why Indian players choose us</h3>
            <ul className="space-y-2">
              {[
                ["Lowest diamond prices in India", "Consistently below Codashop & in-game store rates"],
                ["Instant delivery 24×7", "Diamonds credited in 1–5 minutes, any time of day"],
                ["No login needed", "Top up safely using only your Player ID + Zone ID"],
                ["All UPI methods supported", "PhonePe, Google Pay, Paytm, any UPI VPA accepted"],
                ["100% safe & verified", "Thousands of successful orders, zero account bans"],
                ["Weekly Diamond Pass specialists", "Best WDP prices in India — starting at ₹89"],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-3 items-start text-sm">
                  <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-[var(--accent)]/15 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  <span>
                    <strong className="text-[var(--foreground)] font-semibold">{title}</strong>
                    <span className="text-[var(--muted)]"> — {desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* ── Section 3: How to Top Up ──────────────────── */}
        <div className="space-y-5">
          <h2 className="text-xl font-black uppercase tracking-tight text-[var(--foreground)]">
            How to Buy MLBB Diamonds in India — Step by Step
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Choose a Package", desc: "Pick any diamond pack or Weekly Pass from our game page." },
              { step: "2", title: "Enter Player ID", desc: "Provide your MLBB Player ID and Zone ID. No password needed." },
              { step: "3", title: "Pay via UPI", desc: "Pay instantly via PhonePe, Google Pay, Paytm, or any UPI app." },
              { step: "4", title: "Receive Diamonds", desc: "Diamonds appear in your MLBB account within 1–5 minutes." },
            ].map((item) => (
              <div key={item.step} className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center">
                  <span className="text-sm font-black text-[var(--accent)]">{item.step}</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--foreground)]">{item.title}</h3>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </ol>
        </div>

        {/* ── Section 4: FAQ ────────────────────────────── */}
        <div className="space-y-5">
          <h2 className="text-xl font-black uppercase tracking-tight text-[var(--foreground)]">
            Frequently Asked Questions — MLBB Top Up India
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--foreground)]">{faq.q}</h3>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

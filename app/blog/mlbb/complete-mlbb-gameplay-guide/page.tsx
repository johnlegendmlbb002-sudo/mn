import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import { FiTarget, FiMap, FiShield, FiUsers, FiStar, FiInfo } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Complete MLBB Gameplay Guide 2026",
  description: "Master the core mechanics of Mobile Legends. Learn everything about laning, jungle rotations, map objectives, and winning teamfights in 2026.",
  keywords: [
    "complete mlbb gameplay guide",
    "how to play mobile legends",
    "mlbb lane guide 2026",
    "mlbb hero roles explained",
    "mobile legends gameplay tips"
  ],
  alternates: { canonical: "https://mlbbtopup.in/blog/mlbb/complete-mlbb-gameplay-guide" },
  authors: [{ name: "MLBB Topup Team", url: "https://mlbbtopup.in" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    siteName: "mlbbtopup.in",
    locale: "en_IN",
    url: "https://mlbbtopup.in/blog/mlbb/complete-mlbb-gameplay-guide",
    title: "Complete MLBB Gameplay Guide 2026",
    description: "Master the core mechanics of Mobile Legends. Learn everything about laning, jungle rotations, map objectives, and winning teamfights in 2026.",
    publishedTime: "2026-03-31T00:00:00.000Z",
    images: [{ url: "https://mlbbtopup.in/blog/mlbb/guides/mlbb-gameplay-guide.png", width: 1200, height: 630, alt: "Complete MLBB Gameplay Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mlbbtopupin",
    title: "Complete MLBB Gameplay Guide 2026",
    description: "Master the core mechanics of Mobile Legends. Learn everything about laning, jungle rotations, map objectives, and winning teamfights in 2026.",
    images: ["https://mlbbtopup.in/blog/mlbb/guides/mlbb-gameplay-guide.png"],
  },
};

export default function BlogPage() {
  const faqItems = [
    {
      question: "What is the Lithowanderer in the river?",
      answer: "The Lithowanderer is the small purple crab in the river. Killing it gives your team vision and provides a mana/health regeneration aura. It is a key early-game objective for Junglers."
    },
    {
      question: "Why is the Lord better at 18 minutes?",
      answer: "At 18 minutes, the Ancient Lord gains the ability to leap at enemy turrets, dealing true damage and stunning the tower. This makes breaking a well-defended base much easier."
    },
    {
      question: "Can I play without a Jungler in 2026?",
      answer: "No. A team without a dedicated Jungler carrying Retribution will lose every Turtle and Lord. This gives the enemy an un-counterable gold advantage."
    },
    {
      question: "Which lane gives the most gold?",
      answer: "The Gold Lane. For the first 5 minutes, the siege minions in this lane carry extra gold plates, which is why Marksmen always play in this lane to farm their core items."
    },
    {
      question: "What is the fastest way to learn a new hero?",
      answer: "Take them to VS AI or Classic mode first. Focus on understanding their skill combos, what items they need to deal damage, and whether they are strong in the early or late game."
    }
  ];

  return (
    <BlogPostLayout
      title="THE COMPLETE MOBILE LEGENDS GAMEPLAY GUIDE: LANES, JUNGLE & OBJECTIVES"
      category="Game Guide"
      readTime="15 min read"
      date="March 31, 2026"
      image="/blog/mlbb/guides/mlbb-gameplay-guide.png"
      game="MLBB"
      description="Master the core mechanics of Mobile Legends. Learn everything about laning, jungle rotations, map objectives, and winning teamfights in 2026."
      faqItems={faqItems}
    >
      <p className="text-lg md:text-xl font-medium !opacity-100 italic border-l-4 border-[var(--accent)] pl-6 py-2 bg-[var(--accent)]/5 rounded-r-2xl">
        Are you new to Mobile Legends or stuck in Epic rank? Understanding the foundational pillars—Lanes, Jungle, and Objectives—is the only path to Mythical Glory.
      </p>

      <p>
        Mobile Legends: Bang Bang is a fast-paced MOBA. While getting a "Savage" feels amazing, the ultimate goal is simple: <strong>Destroy the enemy Base</strong>. 
      </p>

      <p>
        To do that, you have to master map economy. Every decision—from which lane you choose to when you attack the Turtle—impacts your global standing. Here is your definitive 2026 blueprint.
      </p>

      <h2>1. The Three Lanes</h2>
      
      <p>
        The map is divided into three primary lanes. Each lane provides unique resources.
      </p>

      <table>
        <thead>
          <tr>
            <th>Lane Name</th>
            <th>Resource Focus</th>
            <th>Primary Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Gold Lane</strong></td>
            <td>Extra Gold from Siege Minions</td>
            <td>Marksman (Needs expensive items)</td>
          </tr>
          <tr>
            <td><strong>EXP Lane</strong></td>
            <td>Extra Experience (Fast Level 4)</td>
            <td>Fighter (Needs early ultimate skill)</td>
          </tr>
          <tr>
            <td><strong>Mid Lane</strong></td>
            <td>Fastest Minion Waves & Map Access</td>
            <td>Mage (Needs to clear and rotate fast)</td>
          </tr>
        </tbody>
      </table>

      <h2>2. The Jungler's Creed</h2>
      
      <p>
        The Jungler is the highest-influence role. Instead of staying in one lane, you harvest neutral monsters to gain a massive gold and level advantage.
      </p>

      <ul className="space-y-3">
        <li><strong>The Blue Buff:</strong> Essential for Mages and Energy-dependent Assassins like Fanny. It reduces skill cooldowns and mana consumption.</li>
        <li><strong>The Red Buff:</strong> Critical for damage dealers. It provides True Damage on your basic attacks and a slow effect, making your ganks lethal.</li>
      </ul>

      <p>
        Your goal as a Jungler is to clear your entire side of the jungle and reach Level 4 exactly as the first Turtle appears.
      </p>

      <div className="bg-[var(--card)] border border-[var(--border)] p-10 rounded-[40px] my-16 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
        <h3 className="italic font-black uppercase text-[var(--accent)] mb-4 flex items-center gap-2"><FiTarget /> Elite Objective Protocol</h3>
        <p className="text-sm italic opacity-70 m-0 leading-relaxed text-justify">
          The first <strong>Turtle</strong> spawns at the 2:00 mark. Securing it provides your entire team with a global Gold and EXP boost, plus a temporary shield and damage buff to the Jungler. In high-tier ranks, the first Turtle fight often determines the rhythm of the entire early game.
        </p>
      </div>

      <h2>3. Global Objectives & Base Sieges</h2>
      
      <p>
        Kills inflate your score, but Objectives inflate your win rate.
      </p>

      <ul className="space-y-3">
        <li><strong>Turret Plating:</strong> Each turret features "Gold Plating" for the first 5 minutes of the match. Dealing damage to these plates grants direct gold. Securing the "First Turret" bonus is a massive tactical win.</li>
        <li><strong>The Lord:</strong> Spawning in the mid-to-late game, the Lord is the ultimate siege weapon. Once defeated, he joins your team to attack the weakest lane of the enemy base. Never start the Lord without first clearing the area of enemy players.</li>
      </ul>

      <h2>4. The Three Phases of Victory</h2>
      
      <p>
        Every MLBB match is divided into three distinct phases.
      </p>

      <ol>
        <li><strong>Early Game (0-5 mins):</strong> Focus on farming and the first Turtle. Don't engage in risky, low-reward fights. Let the Jungler dictate the pace.</li>
        <li><strong>Mid Game (5-12 mins):</strong> Teamfights center around the Turtle and Lord pits. Mages and Assassins are at their most lethal. Start dismantling outer turrets.</li>
        <li><strong>Late Game (12+ mins):</strong> One single death can cost your team the match. Stay grouped. The Marksman is now your "King"—protect them at all costs.</li>
      </ol>

      <h2>Conclusion: Your Path to Mythical Glory</h2>
      
      <p>
        By understanding lanes, respecting the jungle rotation, and prioritizing macro-objectives over individual kills, you will already be ahead of 90% of the player base.
      </p>

      <ul className="space-y-3">
        <li>Pick the correct hero for your assigned lane.</li>
        <li>Secure the Turtle for early team-wide gold.</li>
        <li>Group up and protect your Marksman in the late game.</li>
        <li>Always push towers after winning a teamfight.</li>
      </ul>

      <p>
        <strong>Ready to start your legendary climb?</strong> Do not play at a disadvantage. 
      </p>

      <p>
        Head over to the <Link href="/games/mobile-legends270" className="text-[var(--accent)] underline font-black italic">MLBB Top Up Store</Link> on mlbbtopup.in. Unlock the cleanest Epic skins to ensure your gameplay animations are buttery smooth, and start your massive win streak today!
      </p>

    </BlogPostLayout>
  );
}

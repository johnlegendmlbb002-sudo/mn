import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import { FiTrendingUp, FiCrosshair, FiShield, FiStar, FiZap, FiActivity, FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "MLBB Roles Explained 2026 Guide",
  description: "Learn all 6 MLBB roles in our 2026 beginner guide. Master Tank, Fighter, Mage, Assassin, Marksman, and Support to build the perfect team.",
  keywords: [
    "mlbb roles explained 2026",
    "best mlbb role for beginners",
    "how to play tank mlbb guide",
    "mlbb fighter lane strategy",
    "master mobile legends roles"
  ],
  alternates: { canonical: "https://mlbbtopup.in/blog/mlbb/mlbb-roles-guide" },
  authors: [{ name: "BlueBuff Team", url: "https://mlbbtopup.in" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    siteName: "BlueBuff",
    locale: "en_IN",
    url: "https://mlbbtopup.in/blog/mlbb/mlbb-roles-guide",
    title: "MLBB Roles Explained 2026 Guide",
    description: "Learn all 6 MLBB roles in our 2026 beginner guide. Master Tank, Fighter, Mage, Assassin, Marksman, and Support to build the perfect team.",
    publishedTime: "2026-03-30T00:00:00.000Z",
    images: [{ url: "https://mlbbtopup.in/blog/mlbb/guides/mlbb-roles.png", width: 1200, height: 630, alt: "MLBB Roles Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bluebuffin",
    title: "MLBB Roles Explained 2026 Guide",
    description: "Learn all 6 MLBB roles in our 2026 beginner guide. Master Tank, Fighter, Mage, Assassin, Marksman, and Support to build the perfect team.",
    images: ["https://mlbbtopup.in/blog/mlbb/guides/mlbb-roles.png"],
  },
};

export default function BlogPage() {
  const faqItems = [
    {
      question: "What is the best MLBB role for beginners?",
      answer: "Fighter is generally the best for beginners. Fighters have high health, decent damage, and stay in the EXP Lane, allowing you to learn 1v1 mechanics without the pressure of roaming."
    },
    {
      question: "What is the most impactful role in Solo Queue?",
      answer: "The Jungler (usually an Assassin or Fighter) has the most impact. They control early-game momentum and secure global objectives like the Turtle."
    },
    {
      question: "Can a Mage play as a Roamer/Tank?",
      answer: "Yes! Heroes like Valir, Kadita, and Nana are often played as Roamers. They use their heavy crowd-control skills to lock down enemies instead of absorbing damage."
    },
    {
      question: "What are Hybrid Roles?",
      answer: "Hybrid roles are heroes that fit two categories. For example, Edith is a Tank/Marksman who offers high defense but deals massive physical damage during her ultimate."
    },
    {
      question: "Why shouldn't a team pick two Marksmen?",
      answer: "Marksmen are incredibly weak in the early game. Having two means your team will lack frontline defense, allowing the enemy Assassin to easily snowball and win the game."
    }
  ];

  return (
    <BlogPostLayout
      title="MLBB ROLES EXPLAINED: TANK, FIGHTER, MAGE, ASSASSIN, MARKSMAN, SUPPORT"
      category="Game Guide"
      readTime="12 min read"
      date="March 30, 2026"
      image="/blog/mlbb/guides/mlbb-roles.png"
      game="MLBB"
      description="Understand all 6 roles in Mobile Legends: Bang Bang. Our beginner-friendly 2026 guide explains what each role does, which lane they go in, and how to pick the right hero to win more games."
      faqItems={faqItems}
    >
      <p className="text-lg md:text-xl font-medium !opacity-100 italic border-l-4 border-[var(--accent)] pl-6 py-2 bg-[var(--accent)]/5 rounded-r-2xl">
        To win consistently in Mobile Legends, understanding your "Job Description" is more important than your mechanical skill.
      </p>

      <p>
        Mobile Legends: Bang Bang is a game of balance. You cannot simply pick five high-damage assassins and expect to win. A winning squad requires a mixture of defense, crowd control, magical burst, and sustained physical damage. 
      </p>

      <p>
        In the 2026 meta, knowing exactly when your role needs to "spike" can turn an average player into a legendary carry. Let's break down the 6 classes.
      </p>

      <h2>1. The Tank (The Playmaker)</h2>
      
      <p>
        Tanks are the heavy-hitters of the Land of Dawn. In 2026, the Tank role has evolved from being just a "meat shield" to being the primary initiator of the team.
      </p>

      <ul className="space-y-3">
        <li><strong>Primary Job:</strong> Initiate teamfights and protect squishy teammates. Tanks must provide "Vision" by checking bushes.</li>
        <li><strong>Lane Assignment:</strong> Roamer (Moving between all lanes).</li>
        <li><strong>Key Heroes:</strong> Tigreal, Khufra, Atlas, Franco.</li>
      </ul>

      <h2>2. The Fighter (The Frontline)</h2>
      
      <p>
        Fighters are balanced warriors that offer a mix of offensive power and defensive sustainability. They act as the "second frontline."
      </p>

      <ul className="space-y-3">
        <li><strong>Primary Job:</strong> Hold the side lane alone and dominate the 1v1 matchup. In teamfights, dive the enemy backline to kill the Mage or Marksman.</li>
        <li><strong>Lane Assignment:</strong> EXP Lane.</li>
        <li><strong>Key Heroes:</strong> Chou, Martis, Alpha, Terizla, Yu Zhong.</li>
      </ul>

      <div className="bg-[var(--card)] border border-[var(--border)] p-10 rounded-[40px] my-16 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
        <h3 className="italic font-black uppercase text-[var(--accent)] mb-4 flex items-center gap-2"><FiUsers /> Pro Team Blueprint</h3>
        <p className="text-sm italic opacity-70 m-0 leading-relaxed text-justify">
          The ultimate 5-man team composition consists of 1 Tank (Roamer), 1 Fighter (EXP Lane), 1 Mage (Mid Lane), 1 Assassin (Jungler), and 1 Marksman (Gold Lane). This provides the perfect balance of early-game control and late-game damage.
        </p>
      </div>

      <h2>3. The Mage (The Architect)</h2>
      
      <p>
        Mages deal massive Magical Damage from a safe distance. They provide the area-of-effect (AoE) burst needed to wipe out teams.
      </p>

      <ul className="space-y-3">
        <li><strong>Primary Job:</strong> Clear the Mid Lane minion waves instantly and rotate to gank the side lanes. They are the primary source of early-game damage.</li>
        <li><strong>Lane Assignment:</strong> Mid Lane.</li>
        <li><strong>Key Heroes:</strong> Nana, Vexana, Kadita, Lunox, Valir.</li>
      </ul>

      <h2>4. The Assassin (The Executioner)</h2>
      
      <p>
        Assassins are high-mobility heroes specializing in picking off isolated targets before a teamfight even begins.
      </p>

      <ul className="space-y-3">
        <li><strong>Primary Job:</strong> Farm the jungle buffs, secure Turtles, and dictate the game's kill momentum.</li>
        <li><strong>Lane Assignment:</strong> Jungle.</li>
        <li><strong>Key Heroes:</strong> Gusion, Lancelot, Fanny, Ling.</li>
      </ul>

      <h2>5. The Marksman (The Late-Game God)</h2>
      
      <p>
        Marksmen (MM) are physical damage dealers who start weak but become unstoppable monsters in the late game.
      </p>

      <table>
        <thead>
          <tr>
            <th>Game Phase</th>
            <th>Marksman Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Early Game</strong></td>
            <td>Farm safely under tower. Avoid dying at all costs.</td>
          </tr>
          <tr>
            <td><strong>Mid Game</strong></td>
            <td>Only join fights if near the Gold Lane. Prioritize items.</td>
          </tr>
          <tr>
            <td><strong>Late Game</strong></td>
            <td>Stay behind the Tank and destroy enemy bases & heroes.</td>
          </tr>
        </tbody>
      </table>

      <h2>6. The Support (The Guardian Angel)</h2>
      
      <p>
        Supports provide utility through healing, shields, and buffs. A great Support can make their teammates unkillable.
      </p>

      <ul className="space-y-3">
        <li><strong>Primary Job:</strong> Sustain the team's HP. Support heroes use Roam Equipment to help their carries earn more gold.</li>
        <li><strong>Lane Assignment:</strong> Roamer.</li>
        <li><strong>Key Heroes:</strong> Estes, Angela, Mathilda, Floryn.</li>
      </ul>

      <h2>Conclusion: Key Takeaways</h2>
      
      <p>
        Understanding your role allows you to play with intention rather than just randomly clicking buttons.
      </p>

      <ul className="space-y-3">
        <li>Tanks and Supports control the map (Roam).</li>
        <li>Mages provide magical burst damage from the Mid Lane.</li>
        <li>Assassins secure jungle objectives and hunt weak targets.</li>
        <li>Fighters hold the frontline (EXP Lane).</li>
        <li>Marksmen farm the Gold Lane to secure late-game victory.</li>
      </ul>

      <p>
        <strong>Ready to master your favorite role?</strong> Ensure your gameplay is perfectly smooth with high-fidelity hero skins.
      </p>

      <p>
        Head over to the <Link href="/games/mobile-legends270" className="text-[var(--accent)] underline font-black italic">MLBB Top Up Store</Link> on bluebuff.in. Grab some cheap diamonds via UPI and unlock the skins you need to carry your team in style!
      </p>

    </BlogPostLayout>
  );
}

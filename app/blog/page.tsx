import type { Metadata } from "next";
import BlogListing from "@/components/Blog/BlogListing";

export const metadata: Metadata = {
  title: {
    absolute: "MLBB Guides & Top-Up Tips for India | mlbbtopup.in",
  },
  description:
    "mlbbtopup.in's blog covers everything for Mobile Legends players in India â€” from safe diamond top-up guides and price comparisons to rank-up strategies and gameplay tips. Updated for 2026.",
  keywords: [
    "mlbb blog india",
    "mobile legends guides 2026",
    "mlbb diamond top up india",
    "mobile legends tips india",
    "mlbbtopup.in blog",
    "mlbb rank up guide",
    "mobile legends weekly pass india",
  ],
  alternates: {
    canonical: "https://mlbbtopup.in/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  authors: [{ name: "mlbbtopup.in Team", url: "https://mlbbtopup.in" }],
  openGraph: {
    type: "website",
    siteName: "mlbbtopup.in",
    locale: "en_IN",
    url: "https://mlbbtopup.in/blog",
    title: "MLBB Insights & Guides â€“ mlbbtopup.in Blog",
    description:
      "Safe top-up guides, diamond price breakdowns, rank-up tips, and gameplay strategies for Mobile Legends players in India.",
    images: [
      {
        url: "https://mlbbtopup.in/og-blog.png",
        width: 1200,
        height: 630,
        alt: "mlbbtopup.in â€“ MLBB Blog & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mlbbtopupin",
    title: "MLBB Insights & Guides â€“ mlbbtopup.in Blog",
    description:
      "Safe MLBB top-up tips, diamond guides, and rank-up strategies for Indian players.",
    images: ["https://mlbbtopup.in/og-blog.png"],
  },
};

export default function BlogPage() {
  return <BlogListing initialGame="all" />;
}

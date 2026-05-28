import type { Metadata } from "next";
import BlogListing from "@/components/Blog/BlogListing";

export const metadata: Metadata = {
  title: "MLBB Insights & Guides – Safe Top-Up, Diamond Prices & Tips | BlueBuff",
  description:
    "BlueBuff's blog covers everything for Mobile Legends players in India — from safe diamond top-up guides and price comparisons to rank-up strategies and gameplay tips. Updated for 2026.",
  keywords: [
    "mlbb blog india",
    "mobile legends guides 2026",
    "mlbb diamond top up india",
    "mobile legends tips india",
    "bluebuff blog",
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
  authors: [{ name: "BlueBuff Team", url: "https://mlbbtopup.in" }],
  openGraph: {
    type: "website",
    siteName: "BlueBuff",
    locale: "en_IN",
    url: "https://mlbbtopup.in/blog",
    title: "MLBB Insights & Guides – BlueBuff Blog",
    description:
      "Safe top-up guides, diamond price breakdowns, rank-up tips, and gameplay strategies for Mobile Legends players in India.",
    images: [
      {
        url: "https://mlbbtopup.in/og-blog.png",
        width: 1200,
        height: 630,
        alt: "BlueBuff – MLBB Blog & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bluebuffin",
    title: "MLBB Insights & Guides – BlueBuff Blog",
    description:
      "Safe MLBB top-up tips, diamond guides, and rank-up strategies for Indian players.",
    images: ["https://mlbbtopup.in/og-blog.png"],
  },
};

export default function BlogPage() {
  return <BlogListing initialGame="all" />;
}

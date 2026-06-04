import type { Metadata } from "next";
import BlogListing from "@/components/Blog/BlogListing";

export const metadata: Metadata = {
  title: "MLBB Guides & Insights – Tips, Price Guides & Top-Up Safety | BlueBuff",
  description:
    "Browse all Mobile Legends: Bang Bang guides from BlueBuff — diamond price breakdowns, rank-up strategies, safety tips, and weekly pass guides for Indian players in 2026.",
  keywords: [
    "mlbb guide blog india",
    "mobile legends tips 2026",
    "mlbb diamond price india",
    "mobile legends top up guide",
    "bluebuff blog mlbb",
    "mlbb weekly pass india",
    "mobile legends rank up strategies",
    "mlbb safety tips india",
  ],
  alternates: {
    canonical: "/blog/mlbb",
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
    url: "https://mlbbtopup.in/blog/mlbb",
    title: "MLBB Guides & Insights – BlueBuff Blog",
    description:
      "All Mobile Legends guides from BlueBuff — diamond price breakdowns, rank-up tips, safety guides, and weekly pass analysis for India.",
    images: [
      {
        url: "https://mlbbtopup.in/og-blog.png",
        width: 1200,
        height: 630,
        alt: "BlueBuff – MLBB Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bluebuffin",
    title: "MLBB Guides & Insights – BlueBuff Blog",
    description:
      "All MLBB guides — diamond prices, rank-up tips, safety guides for Indian players.",
    images: ["https://mlbbtopup.in/og-blog.png"],
  },
};

export default function MLBBBlogPage() {
  return <BlogListing initialGame="mlbb" />;
}

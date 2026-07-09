import type { Metadata } from "next";
import BlogListing from "@/components/Blog/BlogListing";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { game } = await params;
  
  const title = `${game.toUpperCase()} Guides & Insights – Tips & News`;
  const description = `Browse all ${game.toUpperCase()} guides, news, and insights.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://mlbbtopup.in/blog/${game}`,
    },
    openGraph: {
      type: "website",
      siteName: "mlbbtopup.in",
      url: `https://mlbbtopup.in/blog/${game}`,
      title,
      description,
      images: [
        {
          url: "https://mlbbtopup.in/og-blog.png",
          width: 1200,
          height: 630,
          alt: "Blog Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://mlbbtopup.in/og-blog.png"],
    },
  };
}

export default async function GameBlogPage({ params }) {
  const { game } = await params;
  return <BlogListing initialGame={game} />;
}

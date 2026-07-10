import { notFound } from "next/navigation";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

type Props = {
  params: Promise<{ game: string; slug: string }>;
};

// Generate metadata dynamically
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const title = blog.seo?.title || blog.title;
  const description = blog.seo?.description || blog.excerpt;
  const keywords = blog.seo?.keywords || blog.tags || [];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `https://mlbbtopup.in/blog/${blog.game}/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://mlbbtopup.in/blog/${blog.game}/${slug}`,
      images: [{ url: blog.image || "https://mlbbtopup.in/og-blog.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog.image || "https://mlbbtopup.in/og-blog.png"],
    },
  };
}

export default async function DynamicBlogPage({ params }: Props) {
  const { slug } = await params;
  
  await connectDB();
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    notFound();
  }

  return (
    <BlogPostLayout
      title={blog.title}
      category={blog.type}
      readTime="5 min read" // or calculate dynamically
      date={new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      image={blog.image || "/blog/default.png"}
      imageAlt={blog.title}
      game={blog.game.toUpperCase()}
      description={blog.excerpt}
    >
      <div 
        className="prose dark:prose-invert max-w-none space-y-6 text-[var(--foreground)]" 
        dangerouslySetInnerHTML={{ __html: blog.content }} 
      />
    </BlogPostLayout>
  );
}

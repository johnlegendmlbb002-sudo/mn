"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiClock, FiCalendar, FiArrowLeft, FiShare2, FiArrowRight, FiUser } from "react-icons/fi";
import { ReactNode, useMemo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BLOGS_DATA } from "@/lib/blogData";
import Script from "next/script";
import NativeBanner from "@/components/Ads/NativeBanner";

const SITE_URL = "https://mlbbtopup.in";

interface FaqItem {
  question: string;
  answer: string;
}

interface BlogPostLayoutProps {
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author?: string;
  game?: string;
  description?: string;
  children: ReactNode;
  backHref?: string;
  faqItems?: FaqItem[];
  dateModified?: string;
}

export default function BlogPostLayout({
  title,
  category,
  readTime,
  date,
  image,
  author = "BlueBuff Team",
  game,
  description,
  children,
  backHref = "/blog",
  faqItems,
  dateModified,
}: BlogPostLayoutProps) {
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const relatedArticles = useMemo(() => {
    const parts = pathname.split("/");
    const currentSlug = parts[parts.length - 1];
    const filtered = BLOGS_DATA.filter((b) => b.slug !== currentSlug);
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [pathname]);

  const canonicalUrl = `${SITE_URL}${pathname}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  // Parse date string like "March 31, 2026" → ISO format
  const parseDate = (d: string) => {
    try {
      return new Date(d).toISOString().split("T")[0];
    } catch {
      return d;
    }
  };

  const isoPubDate = parseDate(date);
  const isoModDate = dateModified ? parseDate(dateModified) : isoPubDate;

  // Article JSON-LD (SSR-safe — uses SITE_URL constant)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    image: absoluteImage,
    datePublished: isoPubDate,
    dateModified: isoModDate,
    author: {
      "@type": "Person",
      name: author,
      url: SITE_URL,
    },
    description: description || title,
    publisher: {
      "@type": "Organization",
      name: "BlueBuff",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    inLanguage: "en-IN",
  };

  // FAQ JSON-LD (only if faqItems provided)
  const faqJsonLd = faqItems && faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      ...(game
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: game.toUpperCase(),
              item: `${SITE_URL}/blog/${game.toLowerCase()}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: title,
              item: canonicalUrl,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: title,
              item: canonicalUrl,
            },
          ]),
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)]/30 pb-32 transition-colors duration-300">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100] shadow-[0_0_10px_rgba(var(--accent),0.5)]"
        style={{ scaleX }}
      />

      {/* SEO Structured Data */}
      <Script
        id="blog-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="blog-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <Script
          id="blog-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[10%] w-[50%] h-[30%] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[0%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <article
        className="max-w-4xl mx-auto px-6 pt-6 md:pt-12 relative z-10"
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* Hidden microdata for crawlers */}
        <meta itemProp="headline" content={title} />
        <meta itemProp="description" content={description || title} />
        <meta itemProp="image" content={absoluteImage} />
        <meta itemProp="datePublished" content={isoPubDate} />
        <meta itemProp="dateModified" content={isoModDate} />
        <meta itemProp="author" content={author} />
        <meta itemProp="url" content={canonicalUrl} />

        {/* BREADCRUMB SYSTEM */}
        <nav aria-label="Breadcrumb">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)]/50"
          >
            <Link
              href="/blog"
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all mr-2 group"
              aria-label="Back to Blog"
            >
              <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">
              Insights
            </Link>
            {game && (
              <>
                <span className="opacity-20 text-xs">/</span>
                <Link
                  href={`/blog/${game.toLowerCase()}`}
                  className="text-[var(--accent)] hover:scale-105 transition-all"
                >
                  {game}
                </Link>
              </>
            )}
            <span className="opacity-20 text-xs">/</span>
            <span className="text-[var(--muted)] line-clamp-1 italic truncate max-w-[200px]">
              {title}
            </span>
          </motion.div>
        </nav>

        <header className="mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em]">
              <span className="text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full italic border border-[var(--accent)]/20 shadow-[0_0_15px_-5px_var(--accent)]">
                # {category}
              </span>
              <span className="opacity-20">|</span>
              <span className="flex items-center gap-1.5 text-[var(--muted)]">
                <FiClock size={12} className="text-[var(--accent)]" /> {readTime}
              </span>
              <span className="opacity-20">|</span>
              <time
                dateTime={isoPubDate}
                className="flex items-center gap-1.5 text-[var(--muted)]"
              >
                <FiCalendar size={12} className="text-[var(--accent)]" /> {date}
              </time>
            </div>

            <h1 className="text-4xl md:text-7xl font-[1000] italic tracking-tighter uppercase leading-[0.9] text-[var(--foreground)] mb-8 drop-shadow-2xl">
              {title.split(" ").map((word, i) => (
                <span key={i} className={i % 3 === 0 ? "text-[var(--accent)]" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>

            <div className="flex items-center gap-3 py-3 border-y border-[var(--border)]/50 mr-auto">
              <div className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shadow-inner">
                <FiUser size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)] opacity-50">
                  Authored by
                </span>
                <span
                  className="text-sm font-black italic uppercase text-[var(--foreground)] tracking-tight"
                  itemProp="author"
                >
                  {author}
                </span>
              </div>
            </div>
          </motion.div>

          {image && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative mt-12 rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-[var(--border)] shadow-2xl aspect-[16/9] group"
            >
              <Image
                src={image}
                alt={description || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block">
                  <p className="text-xs text-white/70 italic font-medium max-w-xs">
                    {description || "Professional gaming insights and analysis from the BlueBuff team."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </header>

        {/* Top Ad Banner */}
        <div className="max-w-3xl mx-auto mb-8">
          <NativeBanner />
        </div>

        {/* CONTENT SECTION */}
        <section className="max-w-3xl mx-auto" itemProp="articleBody">
          <div className="prose prose-invert prose-p:text-lg prose-p:leading-relaxed prose-p:text-[var(--muted)]/90 prose-p:font-medium prose-headings:text-[var(--foreground)] prose-headings:italic prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-[var(--border)] prose-h2:flex prose-h2:items-center prose-h2:gap-4 prose-strong:text-[var(--accent)] prose-strong:font-black prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-ul:list-none prose-ul:pl-0 prose-li:relative prose-li:pl-8 prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.7em] prose-li:before:w-3 prose-li:before:h-[2px] prose-li:before:bg-[var(--accent)] prose-blockquote:border-l-4 prose-blockquote:border-[var(--accent)] prose-blockquote:bg-[var(--accent)]/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic-none prose-table:border prose-table:border-[var(--border)] prose-th:bg-[var(--accent)]/10 prose-th:p-4 prose-td:p-4 prose-img:rounded-[2rem] space-y-8">
            {children}
          </div>
        </section>

        {/* RELATED ARTICLES */}
        <section className="mt-8 max-w-4xl mx-auto" aria-label="Related Articles">
          <div className="text-left mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)] opacity-60 mb-1 block uppercase">
              Read More
            </span>
            <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">
              More <span className="text-[var(--accent)]">Guides</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {relatedArticles.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.game}/${blog.slug}`}
                className="group relative flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-300 shadow hover:-translate-y-0.5"
                aria-label={`Read: ${blog.title}`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={225}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[6px] font-black uppercase tracking-wider text-[var(--accent)] border border-[var(--accent)]/10">
                      {blog.type}
                    </span>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-[11px] font-black uppercase italic tracking-tight leading-tight group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2">
                    {blog.title}
                  </h3>

                  <div className="mt-auto pt-2 border-t border-[var(--border)]/20 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[var(--muted)] opacity-50">
                      <FiClock size={8} />
                      <span className="text-[7px] font-bold uppercase tracking-tight">
                        {blog.readingTime}
                      </span>
                    </div>
                    <div className="w-5 h-5 rounded-md bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                      <FiArrowRight size={10} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SHARE SECTION */}
        <footer className="max-w-xl mx-auto mt-10 p-5 rounded-[1.5rem] bg-[var(--card)] border border-[var(--border)] flex flex-col items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />
          <div className="text-center">
            <h2 className="text-lg font-black italic uppercase tracking-tight">Liked this?</h2>
            <p className="text-[10px] text-[var(--muted)] opacity-60">Send it to your squad!</p>
          </div>
          <div className="flex gap-3">
            {(
              [
                {
                  label: "Twitter / X",
                  href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(title)}`,
                },
                {
                  label: "WhatsApp",
                  href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + canonicalUrl)}`,
                },
                { label: "Copy Link", href: null },
              ] as const
            ).map(({ label, href }, i) => (
              <button
                key={i}
                className="group flex flex-col items-center gap-1.5"
                aria-label={label}
                onClick={() => {
                  if (label === "Copy Link") {
                    navigator.clipboard.writeText(canonicalUrl);
                    alert("Link copied!");
                  } else if (href) {
                    window.open(href, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/50 transition-all shadow-sm">
                  <FiShare2 size={16} />
                </div>
                <span className="text-[6px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
}

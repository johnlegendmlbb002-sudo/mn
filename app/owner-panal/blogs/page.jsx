"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import api from "@/lib/axios";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/api/blogs");
      if (res.data?.success) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (slug) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await api.delete(`/api/blogs/${slug}`);
      if (res.data?.success) {
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      }
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AuthGuard>
      <section className="min-h-screen bg-[var(--background)] p-4 flex flex-col items-center pt-6">
        <div className="w-full max-w-[1600px] space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-4">
              <Link href="/owner-panal" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                <FaArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-black italic uppercase tracking-tighter text-[var(--foreground)]">Manage Blogs</h1>
            </div>
            <Link
              href="/owner-panal/blogs/new"
              className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] font-bold uppercase tracking-wider text-sm transition-all"
            >
              <FaPlus /> New Blog
            </Link>
          </div>

          <div className="space-y-1">
            {blogs.length === 0 ? (
              <p className="text-[var(--muted)] text-center text-sm italic py-10">No blogs found.</p>
            ) : (
              blogs.map((blog) => (
                <div key={blog._id} className="flex items-center justify-between p-4 border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-all rounded-lg">
                  <div className="flex-1 min-w-0 pr-4">
                    <Link href={`/blog/${blog.game}/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="block hover:text-[var(--accent)] transition-colors">
                      <h2 className="text-[var(--foreground)] font-bold text-lg leading-tight line-clamp-1 group-hover:text-[var(--accent)]">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-[var(--muted)] text-xs mt-1 truncate">
                      <span className="uppercase text-[10px] font-bold text-[var(--accent)]/80 tracking-widest mr-2">{blog.game}</span>
                      {blog.type} • {new Date(blog.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/blog/${blog.game}/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all"
                      title="View live blog"
                    >
                      <FaExternalLinkAlt />
                    </Link>
                    <Link
                      href={`/owner-panal/blogs/${blog.slug}`}
                      className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all"
                      title="Edit blog"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.slug)}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                      title="Delete blog"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}

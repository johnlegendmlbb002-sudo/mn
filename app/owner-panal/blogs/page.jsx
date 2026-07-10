"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import api from "@/lib/axios";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaExternalLinkAlt, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/blogs?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(debouncedSearch)}`);
      if (res.data?.success) {
        setBlogs(res.data.blogs);
        if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages);
        }
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

  // filteredBlogs logic removed since search is server-side

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

          <div className="relative w-full max-w-md mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[var(--muted)]" />
            </div>
            <input
              type="text"
              placeholder="Search by title or game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          <div className="space-y-1">
            {blogs.length === 0 ? (
              <p className="text-[var(--muted)] text-center text-sm italic py-10">No blogs found.</p>
            ) : (
              blogs.map((blog) => (
                <div key={blog._id} className="flex items-center justify-between py-2 px-3 border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-all rounded-lg">
                  <div className="flex-1 min-w-0 pr-4 flex items-center gap-3">
                    {/* Blog Thumbnail */}
                    <div className="w-12 h-8 sm:w-16 sm:h-10 shrink-0 rounded overflow-hidden bg-[var(--background)] border border-[var(--border)] relative hidden sm:block">
                      <img 
                        src={blog.image || "/placeholder.jpg"} 
                        alt={blog.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    {/* Blog Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/blog/${blog.game}/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="block hover:text-[var(--accent)] transition-colors">
                        <h2 className="text-[var(--foreground)] font-bold text-sm md:text-base leading-tight line-clamp-1 group-hover:text-[var(--accent)]">
                          {blog.title}
                        </h2>
                      </Link>
                      <p className="text-[var(--muted)] text-[11px] mt-0.5 truncate">
                        <span className="uppercase text-[10px] font-bold text-[var(--accent)]/80 tracking-widest mr-2">{blog.game}</span>
                        {blog.type} • {new Date(blog.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/blog/${blog.game}/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-green-500/10 text-green-400 rounded-md hover:bg-green-500/20 transition-all"
                      title="View live blog"
                    >
                      <FaExternalLinkAlt />
                    </Link>
                    <Link
                      href={`/owner-panal/blogs/${blog.slug}`}
                      className="p-1.5 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500/20 transition-all"
                      title="Edit blog"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.slug)}
                      className="p-1.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20 transition-all"
                      title="Delete blog"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] disabled:opacity-50 transition-all"
              >
                <FaChevronLeft />
              </button>
              <span className="text-sm font-bold text-[var(--foreground)]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] disabled:opacity-50 transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </AuthGuard>
  );
}

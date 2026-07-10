"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { FaTrash, FaPlus, FaShieldAlt } from "react-icons/fa";

export default function BlocklistTab() {
  const { token, user } = useAuthStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState("ip");
  const [formValue, setFormValue] = useState("");
  const [formReason, setFormReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [message, setMessage] = useState({ text: "", type: "" });

  const showMessage = (text, type = "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  useEffect(() => {
    if (token) fetchBlocklist();
  }, [token]);

  const fetchBlocklist = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blocklist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      } else {
        showMessage(data.message || "Failed to fetch blocklist");
      }
    } catch (err) {
      showMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formValue.trim()) return showMessage("Value is required");
    
    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/blocklist", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          type: formType,
          value: formValue,
          reason: formReason,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showMessage("Added to blocklist", "success");
        setFormValue("");
        setFormReason("");
        fetchBlocklist();
      } else {
        showMessage(data.message || "Failed to add");
      }
    } catch (err) {
      showMessage("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this from the blocklist?")) return;
    
    try {
      const res = await fetch(`/api/admin/blocklist?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        showMessage("Removed successfully", "success");
        setItems(items.filter((item) => item._id !== id));
      } else {
        showMessage(data.message || "Failed to remove");
      }
    } catch (err) {
      showMessage("An error occurred");
    }
  };

  const filteredItems = items.filter((item) => filterType === "all" || item.type === filterType);

  if (user?.userType !== "admin" && user?.userType !== "owner") {
    return <div className="p-6 text-center text-red-500">Access Denied</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FaShieldAlt className="text-2xl text-[var(--accent)]" />
        <h2 className="text-xl font-bold text-[var(--foreground)]">Blocklist Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 h-fit shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Add to Blocklist</h3>
          
          {message.text && (
            <div className={`mb-4 p-2.5 rounded-lg text-xs font-semibold text-center ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1">Type</label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-lg p-2 focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="ip">IP Address</option>
                <option value="email">Email Address</option>
                <option value="gameId">Game ID</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1">Value to Block</label>
              <input
                type="text"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder={formType === "ip" ? "e.g. 192.168.1.1" : formType === "email" ? "user@gmail.com" : "12345678"}
                className="w-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-lg p-2 focus:outline-none focus:border-[var(--accent)]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1">Reason (Optional)</label>
              <input
                type="text"
                value={formReason}
                onChange={(e) => setFormReason(e.target.value)}
                placeholder="e.g. Suspicious activity"
                className="w-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-lg p-2 focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-black font-bold py-2.5 rounded-lg transition-all hover:brightness-110 disabled:opacity-50"
            >
              <FaPlus />
              {submitting ? "Adding..." : "Add to Blocklist"}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Blocked Entries</h3>
            
            <div className="flex bg-[var(--background)] rounded-lg p-1 border border-[var(--border)]">
              {["all", "ip", "email", "gameId"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    filterType === type 
                      ? "bg-[var(--accent)] text-black" 
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {type === "all" ? "All" : type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-[var(--muted)] text-sm animate-pulse">Loading blocklist...</div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-10 border border-[var(--border)] bg-[var(--background)] rounded-lg">
              <FaShieldAlt className="text-3xl text-[var(--muted)] mx-auto mb-3 opacity-50" />
              <p className="text-[var(--muted)] text-sm">No blocked entries found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted)] text-xs uppercase tracking-wider">
                    <th className="pb-3 font-medium px-2">Type</th>
                    <th className="pb-3 font-medium px-2">Value</th>
                    <th className="pb-3 font-medium px-2">Reason</th>
                    <th className="pb-3 font-medium px-2">Date</th>
                    <th className="pb-3 font-medium px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredItems.map((item) => (
                    <tr key={item._id} className="text-sm text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors">
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.type === "ip" ? "bg-blue-500/20 text-blue-500" :
                          item.type === "email" ? "bg-purple-500/20 text-purple-500" :
                          "bg-orange-500/20 text-orange-500"
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-mono text-xs">{item.value}</td>
                      <td className="py-3 px-2 text-[var(--muted)] text-xs truncate max-w-[150px]">{item.reason || "-"}</td>
                      <td className="py-3 px-2 text-[var(--muted)] text-xs">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 text-[var(--muted)] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          title="Remove from blocklist"
                        >
                          <FaTrash size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

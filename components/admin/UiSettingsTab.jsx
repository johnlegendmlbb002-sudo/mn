"use client";

import { useState, useEffect } from "react";
import { FiLayout, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

const UiSettingsTab = () => {
    const [settings, setSettings] = useState({ 
        showTopNoticeBanner: false,
        showHomeEarnPromotion: false,
        showTradeMarketplaceBanner: false,
        showCustomWebBanner: false,
        showGiveawayBanner: true,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/admin/settings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setSettings(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch settings", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <FiLoader className="w-10 h-10 animate-spin text-[var(--accent)]" />
                <p className="text-[var(--muted)]">Loading UI settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                    <FiLayout className="text-[var(--accent)]" />
                    Top Banners
                </h2>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Manage which promotional banners appear on the homepage.
                </p>
            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col divide-y divide-[var(--border)]">
                {['showTopNoticeBanner', 'showHomeEarnPromotion', 'showTradeMarketplaceBanner', 'showCustomWebBanner', 'showGiveawayBanner'].map((bannerKey) => {
                    const toggleBanner = async () => {
                        try {
                            setSaving(true);
                            setMessage({ type: "", text: "" });
                            const token = localStorage.getItem("token");
                            const newValue = !settings[bannerKey];

                            const res = await fetch("/api/admin/settings", {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ [bannerKey]: newValue }),
                            });

                            const data = await res.json();
                            if (data.success) {
                                setSettings(data.data);
                                setMessage({ type: "success", text: `Banner settings updated.` });
                            } else {
                                setMessage({ type: "error", text: data.message || "Could not update settings" });
                            }
                        } catch (err) {
                            console.error("Failed to update banner", err);
                            setMessage({ type: "error", text: "Something went wrong" });
                        } finally {
                            setSaving(false);
                        }
                    };

                    const formatTitle = (key) => {
                        return key.replace('show', '').replace(/([A-Z])/g, ' $1').trim();
                    };

                    return (
                        <div key={bannerKey} className="p-6 flex items-center justify-between gap-6">
                            <div>
                                <h3 className="font-semibold text-[var(--foreground)]">{formatTitle(bannerKey)}</h3>
                            </div>
                            <button aria-label="button"
                                onClick={toggleBanner}
                                disabled={saving}
                                className={`
                                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                  ${settings[bannerKey] ? "bg-[var(--accent)]" : "bg-gray-700"}
                                  ${saving ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                            >
                                <span
                                    className={`
                                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    ${settings[bannerKey] ? "translate-x-5" : "translate-x-0"}
                                  `}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl overflow-hidden mt-8 flex flex-col divide-y divide-[var(--border)]">
                <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2 p-6 pb-2">
                        <FiLayout className="text-[var(--accent)]" />
                        Community Popups
                    </h2>
                    <p className="text-sm text-[var(--muted)] px-6 pb-6 mt-1">
                        Manage which community popup appears on the screen.
                    </p>
                </div>

                {['showTelegramPopup', 'showWhatsappPopup', 'showGamesPopup'].map((bannerKey) => {
                    const toggleBanner = async () => {
                        try {
                            setSaving(true);
                            setMessage({ type: "", text: "" });
                            const token = localStorage.getItem("token");
                            const newValue = !settings[bannerKey];

                            const res = await fetch("/api/admin/settings", {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ [bannerKey]: newValue }),
                            });

                            const data = await res.json();
                            if (data.success) {
                                setSettings(data.data);
                                setMessage({ type: "success", text: `Popup settings updated.` });
                            } else {
                                setMessage({ type: "error", text: data.message || "Could not update settings" });
                            }
                        } catch (err) {
                            console.error("Failed to update popup", err);
                            setMessage({ type: "error", text: "Something went wrong" });
                        } finally {
                            setSaving(false);
                        }
                    };

                    const formatTitle = (key) => {
                        return key.replace('show', '').replace(/([A-Z])/g, ' $1').trim();
                    };

                    return (
                        <div key={bannerKey} className="p-6 flex items-center justify-between gap-6">
                            <div>
                                <h3 className="font-semibold text-[var(--foreground)]">{formatTitle(bannerKey)}</h3>
                            </div>
                            <button aria-label="button"
                                onClick={toggleBanner}
                                disabled={saving}
                                className={`
                                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                  ${settings[bannerKey] ? "bg-[var(--accent)]" : "bg-gray-700"}
                                  ${saving ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                            >
                                <span
                                    className={`
                                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    ${settings[bannerKey] ? "translate-x-5" : "translate-x-0"}
                                  `}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl overflow-hidden mt-8 flex flex-col divide-y divide-[var(--border)]">
                <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2 p-6 pb-2">
                        <FiLayout className="text-[var(--accent)]" />
                        Homepage Sections
                    </h2>
                    <p className="text-sm text-[var(--muted)] px-6 pb-6 mt-1">
                        Manage which main sections appear on the homepage.
                    </p>
                </div>

                {['showGameBannerCarousel', 'showStorySlider', 'showFlashSale', 'showHomeQuickActions'].map((bannerKey) => {
                    const toggleBanner = async () => {
                        try {
                            setSaving(true);
                            setMessage({ type: "", text: "" });
                            const token = localStorage.getItem("token");
                            const newValue = !settings[bannerKey];

                            const res = await fetch("/api/admin/settings", {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ [bannerKey]: newValue }),
                            });

                            const data = await res.json();
                            if (data.success) {
                                setSettings(data.data);
                                setMessage({ type: "success", text: `Homepage sections updated.` });
                            } else {
                                setMessage({ type: "error", text: data.message || "Could not update settings" });
                            }
                        } catch (err) {
                            console.error("Failed to update section", err);
                            setMessage({ type: "error", text: "Something went wrong" });
                        } finally {
                            setSaving(false);
                        }
                    };

                    const formatTitle = (key) => {
                        return key.replace('show', '').replace(/([A-Z])/g, ' $1').trim();
                    };

                    return (
                        <div key={bannerKey} className="p-6 flex items-center justify-between gap-6">
                            <div>
                                <h3 className="font-semibold text-[var(--foreground)]">{formatTitle(bannerKey)}</h3>
                            </div>
                            <button aria-label="button"
                                onClick={toggleBanner}
                                disabled={saving}
                                className={`
                                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                  ${settings[bannerKey] ? "bg-[var(--accent)]" : "bg-gray-700"}
                                  ${saving ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                            >
                                <span
                                    className={`
                                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    ${settings[bannerKey] ? "translate-x-5" : "translate-x-0"}
                                  `}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl overflow-hidden mt-8 flex flex-col divide-y divide-[var(--border)]">
                <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2 p-6 pb-2">
                        <FiLayout className="text-[var(--accent)]" />
                        Global UI Elements
                    </h2>
                    <p className="text-sm text-[var(--muted)] px-6 pb-6 mt-1">
                        Manage UI elements that appear across the entire site.
                    </p>
                </div>

                {['showBottomNav'].map((bannerKey) => {
                    const toggleBanner = async () => {
                        try {
                            setSaving(true);
                            setMessage({ type: "", text: "" });
                            const token = localStorage.getItem("token");
                            const newValue = !settings[bannerKey];

                            const res = await fetch("/api/admin/settings", {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ [bannerKey]: newValue }),
                            });

                            const data = await res.json();
                            if (data.success) {
                                setSettings(data.data);
                                setMessage({ type: "success", text: `Global UI settings updated.` });
                            } else {
                                setMessage({ type: "error", text: data.message || "Could not update settings" });
                            }
                        } catch (err) {
                            console.error("Failed to update global UI", err);
                            setMessage({ type: "error", text: "Something went wrong" });
                        } finally {
                            setSaving(false);
                        }
                    };

                    const formatTitle = (key) => {
                        return key.replace('show', '').replace(/([A-Z])/g, ' $1').trim();
                    };

                    return (
                        <div key={bannerKey} className="p-6 flex items-center justify-between gap-6">
                            <div>
                                <h3 className="font-semibold text-[var(--foreground)]">{formatTitle(bannerKey)}</h3>
                            </div>
                            <button aria-label="button"
                                onClick={toggleBanner}
                                disabled={saving}
                                className={`
                                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                  ${settings[bannerKey] ? "bg-[var(--accent)]" : "bg-gray-700"}
                                  ${saving ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                            >
                                <span
                                    className={`
                                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    ${settings[bannerKey] ? "translate-x-5" : "translate-x-0"}
                                  `}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            {message.text && (
                <div className={`p-4 flex items-center gap-2 text-sm rounded-xl ${message.type === "success" ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`}>
                    {message.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default UiSettingsTab;

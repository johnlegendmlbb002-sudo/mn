import { create } from "zustand";

export type ThemeEffect = "none" | "christmas" | "valentine" | "holi" | "diwali" | "monsoon" | "eid";

interface UIStore {
    isChatbotOpen: boolean;
    isSocialMenuOpen: boolean;
    activeThemeEffect: ThemeEffect;
    setChatbotOpen: (open: boolean) => void;
    setSocialMenuOpen: (open: boolean) => void;
    setActiveThemeEffect: (effect: ThemeEffect) => void;
    toggleChatbot: () => void;
    toggleSocialMenu: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
    isChatbotOpen: false,
    isSocialMenuOpen: false,
    activeThemeEffect: "none",
    setChatbotOpen: (open) => set({ isChatbotOpen: open, isSocialMenuOpen: false }),
    setSocialMenuOpen: (open) => set({ isSocialMenuOpen: open, isChatbotOpen: false }),
    setActiveThemeEffect: (effect) => set({ activeThemeEffect: effect }),
    toggleChatbot: () => set((state) => ({ isChatbotOpen: !state.isChatbotOpen, isSocialMenuOpen: false })),
    toggleSocialMenu: () => set((state) => ({ isSocialMenuOpen: !state.isSocialMenuOpen, isChatbotOpen: false })),
}));

"use client";

import { usePathname } from "next/navigation";
import ChatBot from "@/components/SocialFloat/Chatbot";

export default function ChatbotWrapper() {
    const pathname = usePathname();

    if (
        pathname?.startsWith("/games/") ||
        pathname?.startsWith("/owner-panal") ||
        pathname?.startsWith("/login") ||
        pathname?.startsWith("/payment") ||
        pathname?.startsWith("/admin")
    ) {
        return null;
    }

    return <ChatBot />;
}

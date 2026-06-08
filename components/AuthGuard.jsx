"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const { token, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated) return;

    if (!token) {
      router.replace("/login");
    } else {
      setAllowed(true);
    }
  }, [_hasHydrated, token, router]);

  // Avoid flicker while checking
  if (!allowed || !_hasHydrated) return null;

  return children;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const visitorKey = "cold-email-generator-visitor-id";

function getVisitorId() {
  const existing = window.localStorage.getItem(visitorKey);

  if (existing) {
    return existing;
  }

  const generated =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(visitorKey, generated);
  return generated;
}

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname === "/auth/callback") {
      return;
    }

    const visitorId = getVisitorId();

    void fetch("/api/analytics/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        visitorId,
        path: pathname
      }),
      keepalive: true
    });
  }, [pathname]);

  return null;
}

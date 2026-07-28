"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function id(storage: Storage, key: string) {
  let value = storage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    storage.setItem(key, value);
  }
  return value;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const sessionId = id(sessionStorage, "yl_session_id");
    const visitorId = id(localStorage, "yl_visitor_id");
    const productSlug = pathname.startsWith("/shop/")
      ? pathname.split("/")[2]
      : undefined;
    const started = Date.now();
    let maxDepth = 0;
    let sentExit = false;

    const payload = {
      path: pathname,
      sessionId,
      visitorId,
      productSlug,
    };

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, type: "page_view" }),
      keepalive: true,
    }).catch(() => undefined);

    const updateDepth = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      maxDepth = scrollable <= 0
        ? 100
        : Math.max(maxDepth, (window.scrollY / scrollable) * 100);
    };

    const sendExit = () => {
      if (sentExit) return;
      sentExit = true;
      updateDepth();
      const body = JSON.stringify({
        ...payload,
        type: "page_exit",
        depth: maxDepth,
        duration: (Date.now() - started) / 1000,
      });
      navigator.sendBeacon(
        "/api/analytics",
        new Blob([body], { type: "application/json" }),
      );
    };

    updateDepth();
    window.addEventListener("scroll", updateDepth, { passive: true });
    window.addEventListener("pagehide", sendExit);

    return () => {
      window.removeEventListener("scroll", updateDepth);
      window.removeEventListener("pagehide", sendExit);
      sendExit();
    };
  }, [pathname]);

  return null;
}

"use client";

import { useState } from "react";

export default function IntroVideo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Yes Lord introduction"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-5 py-8"
    >
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setVisible(false)}
        className="max-h-[72vh] w-auto max-w-[min(88vw,30rem)] rounded-xl object-contain shadow-[0_0_60px_rgba(255,255,255,0.08)]"
      >
        <source src="/yes-lord-intro.m4v" type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute bottom-6 right-6 rounded-full border border-white/40 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-black md:bottom-8 md:right-8"
      >
        Skip intro
      </button>
    </div>
  );
}

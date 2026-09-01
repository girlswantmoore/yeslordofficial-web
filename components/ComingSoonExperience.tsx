"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const LAUNCH_TIME = new Date("2026-09-13T09:13:00-04:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function remaining(): TimeLeft {
  const distance = Math.max(0, LAUNCH_TIME - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-0 flex-1 border-l border-white/20 px-2 first:border-l-0 sm:px-5">
      <p className="font-mono text-3xl font-light tabular-nums sm:text-5xl lg:text-6xl">
        {String(value).padStart(2, "0")}
      </p>
      <p className="mt-2 text-[0.55rem] uppercase tracking-[0.25em] text-white/55 sm:text-[0.65rem]">
        {label}
      </p>
    </div>
  );
}

export default function ComingSoonExperience() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAccess, setShowAccess] = useState(false);

  useEffect(() => {
    const update = () => setTime(remaining());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/site-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error);
      window.location.reload();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to unlock the site.",
      );
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#130d08] text-white">
      <Image
        src="/hero.jpeg"
        alt="Yes Lord Harvest Collection campaign"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] sm:object-[68%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:4px_4px]" />

      <section className="relative z-10 flex min-h-[100svh] flex-col px-6 py-7 sm:px-10 sm:py-10 lg:px-16">
        <header className="flex items-start justify-between gap-5">
          <div>
            <p className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Yes Lord</p>
            <p className="mt-1 text-[0.55rem] uppercase tracking-[0.42em] text-white/65 sm:text-[0.65rem]">
              Faith · Fashion · Purpose
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAccess((current) => !current)}
            className="border border-white/35 bg-black/20 px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.22em] backdrop-blur-md transition hover:border-white hover:bg-white hover:text-black"
          >
            Site access
          </button>
        </header>

        <div className="flex flex-1 items-end pb-5 pt-20 sm:items-center sm:pb-0 lg:max-w-3xl">
          <div className="w-full">
            <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-[#ed9b55] sm:text-xs">
              A new season is being sown
            </p>
            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-[6.4rem]">
              The Harvest
              <span className="block italic text-[#e99a55]">Collection</span>
            </h1>

            <blockquote className="mt-7 max-w-xl border-l border-[#e99a55] pl-5 sm:mt-9">
              <p className="font-serif text-xl italic leading-snug text-white/90 sm:text-2xl">
                “They that sow in tears shall reap in joy.”
              </p>
              <cite className="mt-2 block text-[0.6rem] not-italic uppercase tracking-[0.35em] text-white/55">
                Psalm 126:5
              </cite>
            </blockquote>

            <div className="mt-8 max-w-2xl border-y border-white/20 bg-black/20 py-5 text-center backdrop-blur-sm sm:mt-10 sm:py-6">
              <p className="mb-4 text-[0.6rem] uppercase tracking-[0.35em] text-white/65">
                Coming 13 September · 9:13 AM ET
              </p>
              <div className="flex">
                {time ? (
                  <>
                    <CountdownUnit value={time.days} label="Days" />
                    <CountdownUnit value={time.hours} label="Hours" />
                    <CountdownUnit value={time.minutes} label="Minutes" />
                    <CountdownUnit value={time.seconds} label="Seconds" />
                  </>
                ) : (
                  <p className="w-full py-4 text-xs uppercase tracking-[0.3em] text-white/50">
                    Preparing the harvest
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-[0.55rem] uppercase tracking-[0.28em] text-white/45">
          Website under reconstruction · Season 2026
        </p>
      </section>

      {showAccess && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 px-6 backdrop-blur-md">
          <div className="relative w-full max-w-md border border-white/20 bg-[#120d09]/95 p-7 shadow-2xl sm:p-10">
            <button
              type="button"
              aria-label="Close site access"
              onClick={() => {
                setShowAccess(false);
                setError("");
              }}
              className="absolute right-5 top-4 text-2xl text-white/55 transition hover:text-white"
            >
              ×
            </button>
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-[#e99a55]">
              Private preview
            </p>
            <h2 className="mt-3 font-serif text-3xl">Enter the field</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Enter the access password to preview the website in progress.
            </p>
            <form onSubmit={unlock} className="mt-7">
              <label htmlFor="site-password" className="sr-only">Password</label>
              <input
                id="site-password"
                type="password"
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Access password"
                className="w-full border border-white/25 bg-black/35 px-4 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#e99a55]"
              />
              {error && <p className="mt-3 text-sm text-[#ff9b82]">{error}</p>}
              <button
                type="submit"
                disabled={loading || !password}
                className="mt-4 w-full bg-[#e99a55] px-5 py-4 text-xs font-bold uppercase tracking-[0.28em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Opening…" : "Enter website"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

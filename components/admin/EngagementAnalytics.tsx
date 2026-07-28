import type { AnalyticsEvent } from "../../lib/analytics";

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}

function Ranking({ title, rows }: { title: string; rows: [string, number][] }) {
  const max = rows[0]?.[1] || 1;
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-6 text-lg font-semibold">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-zinc-500">Data will appear after visitors browse the site.</p>
      ) : (
        <div className="space-y-5">
          {rows.slice(0, 8).map(([label, count]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between gap-4 text-sm">
                <span className="truncate text-zinc-300">{label}</span>
                <span className="font-semibold">{count}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full bg-white" style={{ width: `${(count / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function counts(values: string[]) {
  return Object.entries(
    values.reduce<Record<string, number>>((all, value) => {
      all[value] = (all[value] || 0) + 1;
      return all;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
}

export default function EngagementAnalytics({
  events,
  storage,
}: {
  events: AnalyticsEvent[];
  storage: "redis" | "local";
}) {
  const views = events.filter((event) => event.type === "page_view");
  const exits = events.filter((event) => event.type === "page_exit");
  const sessions = new Set(views.map((event) => event.sessionId)).size;
  const visitors = new Set(views.map((event) => event.visitorId)).size;
  const averageDepth = exits.length
    ? Math.round(exits.reduce((sum, event) => sum + (event.depth || 0), 0) / exits.length)
    : 0;
  const averageTime = exits.length
    ? Math.round(exits.reduce((sum, event) => sum + (event.duration || 0), 0) / exits.length)
    : 0;
  const depthRows: [string, number][] = [25, 50, 75, 100].map((depth) => [
    `Reached ${depth}%`,
    exits.filter((event) => (event.depth || 0) >= depth).length,
  ]);

  return (
    <div>
      {storage === "local" && (
        <div className="mb-6 border border-amber-800 bg-amber-950/30 p-4 text-sm text-amber-200">
          Development storage is active. Add the Upstash environment variables before deploying so analytics persist in production.
        </div>
      )}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Page views" value={views.length} />
        <Metric label="Unique visitors" value={visitors} />
        <Metric label="Pages / visit" value={sessions ? (views.length / sessions).toFixed(1) : "0.0"} />
        <Metric label="Avg. time / page" value={`${averageTime}s`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Ranking title="Most visited pages" rows={counts(views.map((event) => event.path))} />
        <Ranking title="Most viewed products" rows={counts(views.flatMap((event) => event.productSlug ? [event.productSlug] : []))} />
        <Ranking title={`Scroll depth · ${averageDepth}% average`} rows={depthRows} />
        <Ranking title="Most common exit pages" rows={counts(exits.map((event) => event.path))} />
      </div>
    </div>
  );
}

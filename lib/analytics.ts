import { promises as fs } from "node:fs";
import path from "node:path";

export type AnalyticsEvent = {
  type: "page_view" | "page_exit";
  path: string;
  sessionId: string;
  visitorId: string;
  productSlug?: string;
  depth?: number;
  duration?: number;
  timestamp: number;
};

const key = "yeslord:analytics:events";
const localFile = path.join(process.cwd(), ".data", "analytics.json");

function hasRedis() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

async function redis(command: (string | number)[]) {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Analytics database request failed");
  return (await response.json()) as { result: unknown };
}

async function readLocal(): Promise<AnalyticsEvent[]> {
  try {
    return JSON.parse(await fs.readFile(localFile, "utf8"));
  } catch {
    return [];
  }
}

export async function saveAnalyticsEvent(event: AnalyticsEvent) {
  if (hasRedis()) {
    await redis(["LPUSH", key, JSON.stringify(event)]);
    await redis(["LTRIM", key, 0, 9999]);
    return;
  }

  const events = await readLocal();
  events.unshift(event);
  await fs.mkdir(path.dirname(localFile), { recursive: true });
  await fs.writeFile(localFile, JSON.stringify(events.slice(0, 10000)));
}

export async function getAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  if (!hasRedis()) return readLocal();
  const response = await redis(["LRANGE", key, 0, 9999]);
  return ((response.result as string[]) || []).flatMap((value) => {
    try {
      return [JSON.parse(value) as AnalyticsEvent];
    } catch {
      return [];
    }
  });
}

export function analyticsStorageMode() {
  return hasRedis() ? "redis" : "local";
}

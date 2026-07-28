import { NextResponse } from "next/server";
import { saveAnalyticsEvent, type AnalyticsEvent } from "../../../lib/analytics";

export const runtime = "nodejs";

const allowedTypes = new Set(["page_view", "page_exit"]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AnalyticsEvent>;
    const cleanPath = typeof body.path === "string" ? body.path.slice(0, 200) : "";

    if (
      !allowedTypes.has(body.type || "") ||
      !cleanPath.startsWith("/") ||
      cleanPath.startsWith("/admin") ||
      typeof body.sessionId !== "string" ||
      typeof body.visitorId !== "string"
    ) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    await saveAnalyticsEvent({
      type: body.type as AnalyticsEvent["type"],
      path: cleanPath,
      sessionId: body.sessionId.slice(0, 80),
      visitorId: body.visitorId.slice(0, 80),
      productSlug:
        typeof body.productSlug === "string"
          ? body.productSlug.slice(0, 100)
          : undefined,
      depth:
        typeof body.depth === "number"
          ? Math.max(0, Math.min(100, Math.round(body.depth)))
          : undefined,
      duration:
        typeof body.duration === "number"
          ? Math.max(0, Math.min(3600, Math.round(body.duration)))
          : undefined,
      timestamp: Date.now(),
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Unable to record event" }, { status: 500 });
  }
}

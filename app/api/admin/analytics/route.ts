import { NextResponse } from "next/server";
import {
  analyticsStorageMode,
  getAnalyticsEvents,
} from "../../../../lib/analytics";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await getAnalyticsEvents();
  return NextResponse.json({ events, storage: analyticsStorageMode() });
}

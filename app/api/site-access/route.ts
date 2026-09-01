import { NextResponse } from "next/server";
import {
  maintenanceAccessToken,
  validMaintenancePassword,
} from "../../../lib/maintenance-auth";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: unknown };

    if (
      typeof password !== "string" ||
      !(await validMaintenancePassword(password))
    ) {
      return NextResponse.json(
        { error: "That password is not correct." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("yl_site_access", await maintenanceAccessToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to unlock the site. Please try again." },
      { status: 400 },
    );
  }
}

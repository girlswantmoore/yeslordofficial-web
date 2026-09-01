const ACCESS_MESSAGE = "yeslord-maintenance-access-v1";

function accessPassword() {
  return process.env.MAINTENANCE_ACCESS_PASSWORD || "TheStartUp!";
}

function signingSecret() {
  return process.env.MAINTENANCE_COOKIE_SECRET ||
    process.env.ADMIN_PASSWORD ||
    accessPassword();
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

async function digest(value: string) {
  return toHex(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
  );
}

export async function validMaintenancePassword(candidate: string) {
  return (await digest(candidate)) === (await digest(accessPassword()));
}

export async function maintenanceAccessToken() {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(
    await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(ACCESS_MESSAGE),
    ),
  );
}

/** Server-only backend config (never import from client components). */
export const BACKEND_URL =
  process.env.BACKEND_URL?.replace(/\/$/, "") ||
  "https://delacosta-back-production.up.railway.app";

export const BACKEND_API_KEY = process.env.BACKEND_API_KEY || "";

export function backendHeaders(extra: Record<string, string> = {}) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...extra,
  };
  if (BACKEND_API_KEY) headers["x-api-key"] = BACKEND_API_KEY;
  return headers;
}

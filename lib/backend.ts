/** Server-only backend config (never import from client components). */
export const BACKEND_URL =
  process.env.BACKEND_URL?.replace(/\/$/, "") ||
  "https://delacosta-back-production.up.railway.app";

// Server-only. Falls back to the project key so the proxy works even if the host
// env var isn't set. Override with BACKEND_API_KEY in production and rotate it.
export const BACKEND_API_KEY =
  process.env.BACKEND_API_KEY || "5bf4ccb1f716cc39e5bc1e7c8add953bbd513c3fd6f36f6d";

export function backendHeaders(extra: Record<string, string> = {}) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...extra,
  };
  if (BACKEND_API_KEY) headers["x-api-key"] = BACKEND_API_KEY;
  return headers;
}

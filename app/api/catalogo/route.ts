import { NextResponse } from "next/server";
import { BACKEND_URL, backendHeaders } from "@/lib/backend";

// Always fresh: stock/catalog changes in Notion should reflect quickly.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/catalogo`, {
      headers: backendHeaders(),
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ data: [], error: "backend_error" }, { status: 200 });
    }
    const json = await res.json();
    return NextResponse.json({ data: json.data ?? [] });
  } catch {
    // Degrade gracefully so the storefront still renders an empty state.
    return NextResponse.json({ data: [], error: "unreachable" }, { status: 200 });
  }
}

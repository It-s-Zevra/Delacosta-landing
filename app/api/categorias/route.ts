import { NextResponse } from "next/server";
import { BACKEND_URL, backendHeaders } from "@/lib/backend";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories?activas=true`, {
      headers: backendHeaders(),
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ data: [], error: "backend_error" }, { status: 200 });
    }
    const json = await res.json();
    return NextResponse.json({ data: json.data ?? [] });
  } catch {
    return NextResponse.json({ data: [], error: "unreachable" }, { status: 200 });
  }
}

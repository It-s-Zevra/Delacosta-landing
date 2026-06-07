/**
 * Frontend API client. Talks to same-origin Next route handlers under /api/*,
 * which proxy to the Delacosta backend (keeps the backend API key server-side
 * and avoids CORS).
 */

export interface ApiProduct {
  id: string;
  nombre: string;
  sku: string | null;
  categoriaIds: string[];
  precio: number | null;
  precioOferta: number | null;
  stock: number | null;
  estado: string | null;
  descripcion: string;
  materiales: string[];
  urlImagen: string | null;
  slug: string;
  destacado: boolean;
  pesoG: number | null;
}

export interface ApiCategory {
  id: string;
  nombre: string;
  slug: string;
  orden: number | null;
  descripcion: string;
  activa: boolean;
}

export interface CheckoutPayload {
  cliente: {
    nombre: string;
    email?: string;
    telefono?: string;
    rut?: string;
    direccion?: string;
    comuna?: string;
    region?: string;
    origen?: string;
  };
  items: { productId: string; cantidad: number }[];
  costoEnvio?: number;
  metodoEnvio?: string;
  direccionEnvio?: string;
  notas?: string;
}

export interface CheckoutResult {
  id: string;
  numero: string;
  idPedido: string | null;
  estadoPedido: string | null;
  estadoPago: string | null;
  subtotal: number | null;
  total: number | null;
  cantidadItems: number | null;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchCatalog(): Promise<ApiProduct[]> {
  const json = await getJson<{ data: ApiProduct[] }>("/api/catalogo");
  return json.data ?? [];
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const json = await getJson<{ data: ApiCategory[] }>("/api/categorias");
  return json.data ?? [];
}

export async function submitCheckout(
  payload: CheckoutPayload,
): Promise<CheckoutResult> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error || "No pudimos generar el pedido. Intenta de nuevo.");
  }
  return json.data as CheckoutResult;
}

/** Returns true if a product can be bought right now. */
export function isAvailable(p: ApiProduct): boolean {
  return p.estado === "Activo" && (p.stock ?? 0) > 0;
}

/** Effective price (offer price wins). */
export function effectivePrice(p: ApiProduct): number | null {
  return p.precioOferta ?? p.precio;
}

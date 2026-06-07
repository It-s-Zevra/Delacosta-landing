"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  fetchCatalog,
  isAvailable,
  type ApiProduct,
} from "@/lib/api";

export const CATEGORIES = [
  "Aros",
  "Collares",
  "Pulseras",
  "Anillos",
  "Conjuntos",
] as const;
export type CategoryName = (typeof CATEGORIES)[number];

interface CatalogContextValue {
  products: ApiProduct[];
  loading: boolean;
  error: boolean;
  /** Category name -> has at least one available (Activo + stock) product. */
  availability: Record<string, boolean>;
  /** Products mapped to a single category name (first match). */
  categoryOf: (p: ApiProduct) => CategoryName | null;
  refresh: () => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchCatalog()
      .then((data) => {
        if (!alive) return;
        setProducts(data);
        setError(false);
      })
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [tick]);

  // Map a product to one of the known category names via its category relation.
  // Backend gives category IDs only, so we also fall back to matching on the
  // product's `categoriaNombre` if present. Here we approximate by checking the
  // product's materials/slug is not enough — instead we resolve through the
  // categories endpoint id->name (loaded lazily below).
  const [catIdToName, setCatIdToName] = useState<Record<string, CategoryName>>({});

  useEffect(() => {
    let alive = true;
    fetch("/api/categorias")
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        const map: Record<string, CategoryName> = {};
        for (const c of j.data ?? []) {
          if ((CATEGORIES as readonly string[]).includes(c.nombre)) {
            map[c.id] = c.nombre as CategoryName;
          }
        }
        setCatIdToName(map);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const categoryOf = useMemo(() => {
    return (p: ApiProduct): CategoryName | null => {
      for (const id of p.categoriaIds) {
        const name = catIdToName[id];
        if (name) return name;
      }
      return null;
    };
  }, [catIdToName]);

  const availability = useMemo(() => {
    const av: Record<string, boolean> = {};
    for (const cat of CATEGORIES) av[cat] = false;
    for (const p of products) {
      if (!isAvailable(p)) continue;
      const cat = categoryOf(p);
      if (cat) av[cat] = true;
    }
    return av;
  }, [products, categoryOf]);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      availability,
      categoryOf,
      refresh: () => setTick((t) => t + 1),
    }),
    [products, loading, error, availability, categoryOf],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog debe usarse dentro de <CatalogProvider>");
  return ctx;
}

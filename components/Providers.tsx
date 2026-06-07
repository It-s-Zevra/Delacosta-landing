"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart/CartProvider";
import { CatalogProvider } from "@/components/catalog/CatalogProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CatalogProvider>
      <CartProvider>{children}</CartProvider>
    </CatalogProvider>
  );
}

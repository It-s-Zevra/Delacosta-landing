"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Image for product photos coming from Notion. URLs are unpredictable (any host),
 * and some may be placeholders that 404. We use a plain <img> so any host works
 * without next.config allowlists, and fall back to a branded placeholder with the
 * product name if the image is missing or fails to load.
 */
export function ProductImage({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string | null | undefined;
  alt: string;
  /** classes for the placeholder/fallback wrapper */
  className?: string;
  /** classes applied to the <img> (e.g. hover transitions) */
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  // Reset error state if the source changes.
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-stone/30 px-4",
          className,
        )}
      >
        <span className="text-center font-display text-base text-tobacco/45">
          {alt}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", imgClassName)}
    />
  );
}

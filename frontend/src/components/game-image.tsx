"use client";
import { useState } from "react";

export function GameImage({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  // Images can also come from the imported catalog, beyond a fixed CDN allowlist.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={failed || !src ? "/assets/game-placeholder.svg" : src}
      alt={alt}
      onError={() => setFailed(true)}
      loading={eager ? "eager" : "lazy"}
    />
  );
}

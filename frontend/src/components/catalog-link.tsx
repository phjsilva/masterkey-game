import type { AnchorHTMLAttributes } from "react";

// Native navigation keeps query changes reliable when the destination hash
// is already active, and works before the client bundle has hydrated.
export function CatalogLink({
  href = "/#catalogo",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={href} {...props} />;
}

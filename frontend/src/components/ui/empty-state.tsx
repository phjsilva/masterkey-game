import type { ReactNode } from "react";

export function EmptyState({
  title,
  children,
  icon,
  heading: Heading = "h1",
}: {
  title: string;
  children?: ReactNode;
  icon?: ReactNode;
  heading?: "h1" | "h2" | "h3";
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-3.5 px-6 py-[90px] text-center">
      {icon && <div className="mb-2 text-accent">{icon}</div>}
      <Heading className="text-[26px] font-semibold">{title}</Heading>
      {children}
    </div>
  );
}

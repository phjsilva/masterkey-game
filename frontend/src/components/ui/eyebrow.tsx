import type { ReactNode } from "react";

export function Eyebrow({
  children,
  dot = false,
}: {
  children: ReactNode;
  dot?: boolean;
}) {
  return (
    <p className="mb-[18px] flex items-center gap-[9px] text-[8px] font-bold tracking-[1.4px] text-accent tablet:text-[10px] tablet:tracking-[2px]">
      {dot && <span className="size-1.5 rounded-full bg-accent" />}
      {children}
    </p>
  );
}

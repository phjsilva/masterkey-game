import type { HTMLAttributes } from "react";

export function Container({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-[calc(100%-36px)] max-w-[1280px] tablet:w-[calc(100%-56px)] desktop:w-[calc(100%-96px)] ${className}`}
      {...props}
    />
  );
}

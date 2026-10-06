import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const actionClasses =
  "inline-flex items-center justify-center gap-6 rounded-[5px] border-0 bg-accent px-[21px] py-3.5 text-xs font-bold text-[#19200f] transition-colors hover:bg-[#d5ff86]";
export function ActionLink({
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`${actionClasses} ${className}`} {...props} />;
}
export function ActionButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`${actionClasses} ${className}`} {...props} />;
}

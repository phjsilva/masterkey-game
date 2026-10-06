import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export function SiteBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="MasterKey início"
      className={`flex items-center gap-2.5 font-extrabold tracking-[-1.2px] ${compact ? "text-[21px]" : "text-[22px] tablet:text-[26px]"}`}
    >
      {!compact && (
        <span className="grid size-8 place-items-center rounded-[11px] border border-[#697951] text-accent tablet:size-[39px]">
          <Gamepad2 size={24} />
        </span>
      )}
      masterkey<span className="-ml-[9px] text-accent">.</span>
    </Link>
  );
}

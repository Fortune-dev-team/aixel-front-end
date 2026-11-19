import { cn } from "@/lib/utils"
import type { StatusChipProps } from "../interfaces"

export function StatusChip({ status }: StatusChipProps) {
    const isSesuai = status === "Sesuai"

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-medium",
                isSesuai
                    ? "border-[#15803D] bg-[#DCFCE7] text-[#166534]"
                    : "border-[#B45309] bg-[#FEF3C7] text-[#92400E]"
            )}
        >
            {status}
        </span>
    )
}

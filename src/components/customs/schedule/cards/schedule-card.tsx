import { cn } from "@/lib/utils";
import type { ScheduleItem, ScheduleStatus } from "../interfaces";

interface ScheduleCardProps {
    item: ScheduleItem;
}

function getStatusBadge(status: ScheduleStatus) {
    switch (status) {
        case "scheduled":
            return {
                label: "Dijadwalkan",
                className: "border-[#3B82F6] bg-[#DBEAFE] text-[#1D4ED8]",
            };
        case "waiting":
            return {
                label: "Menunggu",
                className: "border-[#D97706] bg-[#FEF3C7] text-[#B45309]",
            };
        case "reschedule_proposed":
            return {
                label: "Perubahan jadwal",
                className: "border-[#D97706] bg-[#FEF3C7] text-[#B45309]",
            };
        case "rejected":
            return {
                label: "Ditolak",
                className: "border-[#DC2626] bg-[#FEE2E2] text-[#B91C1C]",
            };
    }
}

export function ScheduleCard({ item }: ScheduleCardProps) {
    const badge = getStatusBadge(item.status);

    return (
        <div className="flex flex-col justify-between gap-3 rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] px-5 py-4 shadow-[3px_3px_0_0_#0A0A0A] sm:flex-row sm:items-center">
            <div>
                <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                    Mentor {item.goalCategory} &middot; {item.mentorName}
                </h2>
                <p className="mt-1 font-sans text-xs text-[#262626]">
                    Jadwal:{" "}
                    <span className="font-semibold text-[#0A0A0A]">
                        {item.scheduledAt}
                    </span>
                </p>
            </div>

            <span
                className={cn(
                    "w-fit shrink-0 rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-semibold",
                    badge.className
                )}
            >
                {badge.label}
            </span>
        </div>
    );
}
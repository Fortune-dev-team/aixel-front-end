import { Chip, type ChipVariant } from "@/components/ui/Chip";
import type { ScheduleItem, ScheduleStatus } from "../interfaces";

interface ScheduleCardProps {
    item: ScheduleItem;
}

function getStatusBadge(status: ScheduleStatus): { label: string; variant: ChipVariant } {
    switch (status) {
        case "scheduled":
            return {
                label: "Dijadwalkan",
                variant: "blue",
            };
        case "waiting":
            return {
                label: "Menunggu",
                variant: "amber",
            };
        case "reschedule_proposed":
            return {
                label: "Perubahan jadwal",
                variant: "amber",
            };
        case "rejected":
            return {
                label: "Ditolak",
                variant: "red",
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

            <Chip variant={badge.variant} className="w-fit shrink-0">
                {badge.label}
            </Chip>
        </div>
    );
}

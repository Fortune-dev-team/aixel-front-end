"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
    AttributeRenewalItem,
    AttributeRenewalStatus,
} from "../interfaces";

interface PerpanjanganTableProps {
    items: AttributeRenewalItem[];
    onUploadClick: (item: AttributeRenewalItem) => void;
}

function getStatusBadge(status: AttributeRenewalStatus) {
    switch (status) {
        case "active":
            return {
                label: "Aktif",
                className: "border-[#16A34A] bg-[#DCFCE7] text-[#15803D]",
            };
        case "expiring_soon":
            return {
                label: "Hampir habis",
                className: "border-[#D97706] bg-[#FEF3C7] text-[#B45309]",
            };
        case "pending_review":
            return {
                label: "Menunggu tinjauan",
                className: "border-[#D97706] bg-[#FEF3C7] text-[#B45309]",
            };
        case "rejected":
            return {
                label: "Ditolak",
                className: "border-[#DC2626] bg-[#FEE2E2] text-[#B91C1C]",
            };
    }
}

export function PerpanjanganTable({
    items,
    onUploadClick,
}: PerpanjanganTableProps) {
    const hasNotes = items.some((item) => Boolean(item.note));

    return (
        <div className="overflow-hidden rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] shadow-[3px_3px_0_0_#0A0A0A]">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-[#0A0A0A] font-mono text-xs font-bold text-white">
                            <th className="px-5 py-3">Atribut</th>
                            <th className="px-5 py-3">Berakhir</th>
                            <th className="px-5 py-3">Status</th>
                            {hasNotes && <th className="px-5 py-3">Catatan</th>}
                            <th className="px-5 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => {
                            const badge = getStatusBadge(item.status);
                            const canUpload =
                                item.status === "expiring_soon" || item.status === "rejected";

                            return (
                                <tr
                                    key={item.id}
                                    className="border-t border-[#0A0A0A]/20 font-sans text-xs text-[#262626]"
                                >
                                    <td className="px-5 py-3.5 font-medium text-[#0A0A0A]">
                                        {item.attributeTitle}
                                    </td>

                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        {item.expiresAt}
                                    </td>

                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <span
                                            className={cn(
                                                "inline-block rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-semibold",
                                                badge.className
                                            )}
                                        >
                                            {badge.label}
                                        </span>
                                    </td>

                                    {hasNotes && (
                                        <td className="max-w-[260px] px-5 py-3.5 text-xs leading-relaxed text-[#404040]">
                                            {item.note ?? "-"}
                                        </td>
                                    )}

                                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                        {canUpload ? (
                                            <Button
                                                variant="coral"
                                                size="sm"
                                                onPress={() => onUploadClick(item)}
                                            >
                                                Unggah bukti
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="white"
                                                size="sm"
                                                className="pointer-events-none opacity-55 select-none"
                                            >
                                                Unggah bukti
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
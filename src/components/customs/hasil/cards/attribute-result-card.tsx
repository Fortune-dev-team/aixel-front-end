"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Chip, type ChipVariant } from "@/components/ui/Chip";
import type {
    AttributeDecisionStatus,
    AttributeResultItem,
    CertificateData,
} from "../interfaces";

interface AttributeResultCardProps {
    item: AttributeResultItem;
    onOpenCertificate: (cert: CertificateData) => void;
}

function getDecisionBadge(status: AttributeDecisionStatus): { label: string; variant: ChipVariant } {
    switch (status) {
        case "passed":
            return {
                label: "Lulus",
                variant: "green",
            };
        case "failed_final":
            return {
                label: "Tidak lulus",
                variant: "red",
            };
        default:
            return {
                label: "Belum lulus",
                variant: "amber",
            };
    }
}

export function AttributeResultCard({
    item,
    onOpenCertificate,
}: AttributeResultCardProps) {
    const router = useRouter();
    const badge = getDecisionBadge(item.status);

    return (
        <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                        {item.title}
                    </h2>
                    <p className="mt-1 font-sans text-xs text-[#404040]">
                        {item.mentorNote}
                    </p>
                    {typeof item.cooldownDays === "number" &&
                        typeof item.remainingRetries === "number" && (
                            <p className="mt-0.5 font-sans text-xs text-[#6B6B6B]">
                                Jeda {item.cooldownDays} hari. Sisa kesempatan wawancara ulang:{" "}
                                {item.remainingRetries}.
                            </p>
                        )}
                </div>

                <Chip variant={badge.variant} className="shrink-0">
                    {badge.label}
                </Chip>
            </div>

            {item.status === "passed" && item.certificate && (
                <div className="mt-4">
                    <Button
                        variant="coral"
                        size="sm"
                        onPress={() => onOpenCertificate(item.certificate!)}
                    >
                        Lihat sertifikat
                    </Button>
                </div>
            )}

            {item.status === "cooldown" && (
                <div className="mt-4">
                    <Button
                        variant="white"
                        size="sm"
                        className="pointer-events-none opacity-55 select-none"
                    >
                        Ajukan wawancara ulang
                    </Button>
                </div>
            )}

            {item.status === "ready_retry" && (
                <div className="mt-4">
                    <Button
                        variant="coral"
                        size="sm"
                        onPress={() => router.push("/team/course/level-3")}
                    >
                        Ajukan wawancara ulang
                    </Button>
                </div>
            )}
        </div>
    );
}

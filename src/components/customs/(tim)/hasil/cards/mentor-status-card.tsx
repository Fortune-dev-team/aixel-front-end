"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { MentorInviteBanner } from "@/components/ui/MentorInviteBanner";
import { Chip } from "@/components/ui/Chip";
import type { MentorStatusState } from "../interfaces";

interface MentorStatusCardProps {
    state: MentorStatusState;
    onAccept: () => void;
    onOpenReject: () => void;
}

export function MentorStatusCard({
    state,
    onAccept,
    onOpenReject,
}: MentorStatusCardProps) {
    return (
        <section className="mt-7">
            <h2 className="mb-3 font-mono text-sm font-bold text-[#0A0A0A]">
                Status mentor
            </h2>

            {state.status === "empty" && (
                <EmptyState message="Belum ada undangan." className="py-6" />
            )}

            {state.status === "pending" && (
                <MentorInviteBanner
                    description={`Admin menunjuk Anda untuk mentor ${state.attributeTitle}`}
                    onAccept={onAccept}
                    onDecline={onOpenReject}
                />
            )}

            {state.status === "active" && (
                <div className="flex flex-col justify-between gap-3 rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A] sm:flex-row sm:items-center">
                    <div>
                        <h3 className="font-mono text-sm font-bold text-[#0A0A0A]">
                            {state.attributeTitle}
                        </h3>
                        <p className="mt-1 font-sans text-xs text-[#6B6B6B]">
                            Berlaku sampai {state.validUntil}. Anda mentor aktif untuk atribut ini.
                        </p>
                    </div>

                    <Chip variant="green" className="w-fit shrink-0">
                        Aktif
                    </Chip>
                </div>
            )}
        </section>
    );
}

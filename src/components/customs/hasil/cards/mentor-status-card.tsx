"use client";

import { Button } from "@/components/ui/button";
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
                <div className="flex min-h-[88px] items-center justify-center rounded-xl border-2 border-dashed border-[#0A0A0A]/40 bg-[#FDFCFA] px-5 py-6 text-center">
                    <p className="font-sans text-xs text-[#6B6B6B]">
                        Belum ada undangan.
                    </p>
                </div>
            )}

            {state.status === "pending" && (
                <div className="flex flex-col justify-between gap-4 rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A] sm:flex-row sm:items-center">
                    <div>
                        <h3 className="font-mono text-sm font-bold text-[#0A0A0A]">
                            Undangan menjadi mentor
                        </h3>
                        <p className="mt-1 font-sans text-xs text-[#6B6B6B]">
                            Admin menunjuk Anda untuk mentor {state.attributeTitle}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <Button variant="red" size="sm" onPress={onOpenReject}>
                            Tidak bersedia
                        </Button>
                        <Button variant="green" size="sm" onPress={onAccept}>
                            Bersedia
                        </Button>
                    </div>
                </div>
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

                    <span className="w-fit shrink-0 rounded-md border border-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#15803D]">
                        Aktif
                    </span>
                </div>
            )}
        </section>
    );
}
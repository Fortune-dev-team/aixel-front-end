"use client";

import { cn } from "@/lib/utils";
import { AttributeResultCard } from "./cards/attribute-result-card";
import { MentorStatusCard } from "./cards/mentor-status-card";
import { CertificateModal } from "./modals/certificate-modal";
import { RejectMentorModal } from "./modals/reject-mentor-modal";
import { useHasil } from "./use-hasil";
import { HasilHeader } from "./widgets/hasil-header";

export function HasilContent() {
    const {
        results,
        mentorState,
        activeCertificate,
        setActiveCertificate,
        isRejectModalOpen,
        setIsRejectModalOpen,
        handleAcceptMentor,
        handleSubmitRejectMentor,
        simulateProblemSolvingState,
        simulateMentorInvitationState,
    } = useHasil();

    const problemSolvingStatus = results.find(
        (r) => r.id === "problem-solving"
    )?.status;

    return (
        <div className="w-full">
            <HasilHeader />

            {/* Daftar Kartu Keputusan Wawancara */}
            <div className="space-y-4">
                {results.map((item) => (
                    <AttributeResultCard
                        key={item.id}
                        item={item}
                        onOpenCertificate={setActiveCertificate}
                    />
                ))}
            </div>

            {/* Bagian Status Mentor */}
            <MentorStatusCard
                state={mentorState}
                onAccept={handleAcceptMentor}
                onOpenReject={() => setIsRejectModalOpen(true)}
            />

            {/* Kontrol Simulasi State Wireframe untuk Preview */}
            <div className="mt-8 space-y-2 rounded-lg border border-dashed border-[#0A0A0A]/40 bg-[#FDFCFA] px-3.5 py-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-[#525252]">
                        Simulasi Problem Solving:
                    </span>
                    {(
                        [
                            { key: "cooldown", label: "Jeda 7 hari" },
                            { key: "ready_retry", label: "Jeda 0 hari (Siap ulang)" },
                            { key: "failed_final", label: "Tidak lulus" },
                        ] as const
                    ).map((opt) => (
                        <button
                            key={opt.key}
                            type="button"
                            onClick={() => simulateProblemSolvingState(opt.key)}
                            className={cn(
                                "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] transition-colors",
                                problemSolvingStatus === opt.key
                                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                                    : "border-[#0A0A0A]/30 bg-white text-[#0A0A0A] hover:bg-[#EFEFEB]"
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-[#525252]">
                        Simulasi Status Mentor:
                    </span>
                    {(
                        [
                            { key: "empty", label: "Belum ada undangan" },
                            { key: "pending", label: "Undangan masuk" },
                            { key: "active", label: "Mentor aktif" },
                        ] as const
                    ).map((opt) => (
                        <button
                            key={opt.key}
                            type="button"
                            onClick={() => simulateMentorInvitationState(opt.key)}
                            className={cn(
                                "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] transition-colors",
                                mentorState.status === opt.key
                                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                                    : "border-[#0A0A0A]/30 bg-white text-[#0A0A0A] hover:bg-[#EFEFEB]"
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal Sertifikat Atribut */}
            <CertificateModal
                certificate={activeCertificate}
                onClose={() => setActiveCertificate(null)}
            />

            {/* Modal Penolakan Undangan Mentor */}
            <RejectMentorModal
                isOpen={isRejectModalOpen}
                attributeTitle={mentorState.attributeTitle}
                onClose={() => setIsRejectModalOpen(false)}
                onSubmit={handleSubmitRejectMentor}
            />

        </div>
    );
}
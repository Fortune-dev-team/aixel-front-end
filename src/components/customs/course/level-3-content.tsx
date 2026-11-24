"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Chip, type ChipVariant } from "@/components/ui/Chip";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LEVEL3_MENTORS } from "./constants";
import type {
    CourseMentor,
    CourseToastState,
    InterviewBooking,
    InterviewStatus,
} from "./interfaces";
import { useCourseProgress } from "./use-course-progress";
import { CourseHeader } from "./widgets/course-header";
import { CourseToast } from "./widgets/course-toast";

function formatIndonesianDateTime(rawValue: string): string {
    if (!rawValue) return "Jumat, 11 Des 2026, 12.12";
    const parsed = new Date(rawValue);
    if (Number.isNaN(parsed.getTime())) return rawValue;

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ];

    const dayName = days[parsed.getDay()];
    const dateNum = parsed.getDate();
    const monthName = months[parsed.getMonth()];
    const year = parsed.getFullYear();
    const hours = String(parsed.getHours()).padStart(2, "0");
    const minutes = String(parsed.getMinutes()).padStart(2, "0");

    return `${dayName}, ${dateNum} ${monthName} ${year}, ${hours}.${minutes}`;
}

function getStatusBadge(status: InterviewStatus): { label: string; variant: ChipVariant } | null {
    switch (status) {
        case "waiting":
            return {
                label: "Menunggu",
                variant: "amber",
            };
        case "rejected":
            return {
                label: "Ditolak",
                variant: "red",
            };
        case "reschedule_proposed":
            return {
                label: "Perubahan jadwal",
                variant: "amber",
            };
        case "scheduled":
            return {
                label: "Dijadwalkan",
                variant: "blue",
            };
        case "passed":
            return {
                label: "Lulus",
                variant: "green",
            };
        default:
            return null;
    }
}

export function Level3Content() {
    const router = useRouter();
    const { selectedGoal, updateLevelStatus } = useCourseProgress();

    const [selectedMentor, setSelectedMentor] =
        React.useState<CourseMentor | null>(null);
    const [dateTimeInput, setDateTimeInput] = React.useState("2026-12-11T12:12");
    const [booking, setBooking] = React.useState<InterviewBooking | null>(null);
    const [toast, setToast] = React.useState<CourseToastState | null>(null);

    const showToast = React.useCallback(
        (type: "success" | "error", message: string) => {
            setToast({ id: Date.now(), type, message });
        },
        []
    );

    const handleOpenScheduleModal = (mentor: CourseMentor) => {
        setSelectedMentor(mentor);
    };

    const handleSubmitSchedule = () => {
        if (!selectedMentor) return;

        if (!dateTimeInput.trim()) {
            showToast("error", "Gagal mengirim pengajuan.");
            return;
        }

        const formatted = formatIndonesianDateTime(dateTimeInput);
        setBooking({
            mentorId: selectedMentor.id,
            mentorName: selectedMentor.name,
            requestedSchedule: formatted,
            proposedSchedule: "Sabtu, 12 Des 2026, 13.13",
            rejectReason:
                "Mentor tidak bisa pada jadwal tersebut karena sedang padat kegiatan. Pilih mentor lain dan tentukan jadwal baru.",
            status: "waiting",
        });
        setSelectedMentor(null);
        showToast("success", "Pengajuan terkirim.");
    };

    const handleSimulateMentorResponse = (nextStatus: InterviewStatus) => {
        if (!booking) return;
        setBooking({ ...booking, status: nextStatus });
        if (nextStatus === "passed") {
            updateLevelStatus(selectedGoal.id, 3, "passed");
        }
    };

    const handleAcceptProposedSchedule = () => {
        if (!booking) return;
        setBooking({
            ...booking,
            requestedSchedule: booking.proposedSchedule ?? booking.requestedSchedule,
            status: "scheduled",
        });
    };

    const handleOpenRescheduleFromProposal = () => {
        if (!booking) return;
        const mentor =
            LEVEL3_MENTORS.find((m) => m.id === booking.mentorId) ??
            LEVEL3_MENTORS[0];
        setSelectedMentor(mentor);
    };

    const badge = booking ? getStatusBadge(booking.status) : null;

    return (
        <div className="w-full">
            <CourseHeader
                title={`Level 3: Wawancara offline · ${selectedGoal.title}`}
                subtitle="Pilih mentor berdasarkan tanggal dan jam, lalu tunggu persetujuan mentor."
                backHref="/team/course"
            />

            {/* State 1: Daftar Mentor */}
            {!booking ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {LEVEL3_MENTORS.map((mentor) => (
                        <div
                            key={mentor.id}
                            className="flex flex-col justify-between rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]"
                        >
                            <div>
                                <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                                    {mentor.name}
                                </h2>
                                <p className="mt-1 font-sans text-xs text-[#6B6B6B]">
                                    Mentor {selectedGoal.title} · {mentor.quotaLabel}
                                </p>
                            </div>

                            <div className="mt-4">
                                <Button
                                    variant="coral"
                                    size="sm"
                                    onPress={() => handleOpenScheduleModal(mentor)}
                                >
                                    Pilih mentor
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* State 2 - 6: Kartu Status Pengajuan Wawancara */
                <div className="space-y-4">
                    <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
                        {booking.status === "passed" ? (
                            <div>
                                <div className="flex justify-end">
                                    {badge && (
                                        <Chip variant={badge.variant} className="shrink-0">
                                            {badge.label}
                                        </Chip>
                                    )}
                                </div>

                                <div className="py-6 text-center">
                                    <p className="font-sans text-xs text-[#6B6B6B] sm:text-sm">
                                        Level 3 sudah lulus. Sertifikat ada di halaman Hasil.
                                    </p>
                                    <div className="mt-4 flex justify-center">
                                        <Button
                                            variant="coral"
                                            size="sm"
                                            onPress={() => router.push("/team/hasil")}
                                        >
                                            Lihat hasil
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                                            {booking.mentorName}
                                        </h2>
                                        <p className="mt-1 font-sans text-xs text-[#262626]">
                                            Jadwal yang Anda ajukan: {booking.requestedSchedule}
                                        </p>
                                    </div>

                                    {badge && (
                                        <Chip variant={badge.variant} className="shrink-0">
                                            {badge.label}
                                        </Chip>
                                    )}
                                </div>

                                {booking.status === "waiting" && (
                                    <p className="mt-2 font-sans text-xs text-[#6B6B6B]">
                                        Menunggu jawaban mentor.
                                    </p>
                                )}

                                {booking.status === "rejected" && (
                                    <>
                                        <p className="mt-2 font-sans text-xs text-[#6B6B6B]">
                                            {booking.rejectReason}
                                        </p>
                                        <div className="mt-4">
                                            <Button
                                                variant="coral"
                                                size="sm"
                                                onPress={() => setBooking(null)}
                                            >
                                                Pilih mentor dan ajukan ulang
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {booking.status === "reschedule_proposed" && (
                                    <>
                                        <p className="mt-2 font-sans text-xs text-[#6B6B6B]">
                                            Mentor tidak bisa pada jadwal tersebut dan mengajukan perubahan ke{" "}
                                            {booking.proposedSchedule}.
                                        </p>
                                        <div className="mt-4 flex flex-wrap items-center gap-2.5">
                                            <Button
                                                variant="green"
                                                size="sm"
                                                onPress={handleAcceptProposedSchedule}
                                            >
                                                Terima jadwal baru
                                            </Button>
                                            <Button
                                                variant="white"
                                                size="sm"
                                                onPress={handleOpenRescheduleFromProposal}
                                            >
                                                Ubah jadwal
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {booking.status === "scheduled" && (
                                    <p className="mt-2 font-sans text-xs text-[#6B6B6B]">
                                        Mentor menyetujui jadwal, {booking.requestedSchedule}. Hasil muncul setelah mentor mengisi penilaian.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Simulasi status mentor */}
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-[#0A0A0A]/40 bg-[#FDFCFA] px-3.5 py-2.5">
                        <span className="font-mono text-[11px] font-semibold text-[#525252]">
                            Simulasi respon mentor:
                        </span>
                        {(
                            [
                                { key: "waiting", label: "Menunggu" },
                                { key: "rejected", label: "Ditolak" },
                                { key: "reschedule_proposed", label: "Perubahan jadwal" },
                                { key: "scheduled", label: "Dijadwalkan" },
                                { key: "passed", label: "Lulus" },
                            ] as const
                        ).map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => handleSimulateMentorResponse(item.key)}
                                className={cn(
                                    "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] transition-colors",
                                    booking.status === item.key
                                        ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                                        : "border-[#0A0A0A]/30 bg-white text-[#0A0A0A] hover:bg-[#EFEFEB]"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal Pilih Jadwal Wawancara */}
            {selectedMentor && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-jadwal-title"
                    onClick={() => setSelectedMentor(null)}
                >
                    <div
                        className="w-full max-w-md rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[4px_4px_0_0_#0A0A0A]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <h2
                                id="modal-jadwal-title"
                                className="font-mono text-base font-bold text-[#0A0A0A]"
                            >
                                Pilih jadwal wawancara
                            </h2>
                            <button
                                type="button"
                                onClick={() => setSelectedMentor(null)}
                                aria-label="Tutup modal jadwal"
                                className="cursor-pointer rounded p-0.5 text-[#0A0A0A] transition-colors hover:bg-black/5"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <p className="mt-2 font-sans text-xs text-[#404040]">
                            Mengajukan jadwal ke {selectedMentor.name}. Mentor hanya menerima sebelum jam yang diminta.
                        </p>

                        <div className="mt-4">
                            <FormField label="Tanggal dan jam" htmlFor="jadwal-datetime">
                                <Input
                                    id="jadwal-datetime"
                                    type="datetime-local"
                                    size="sm"
                                    value={dateTimeInput}
                                    onChange={(e) => setDateTimeInput(e.target.value)}
                                    className="bg-white"
                                />
                            </FormField>
                        </div>

                        <div className="mt-5 flex items-center gap-2.5">
                            <Button
                                variant="white"
                                size="sm"
                                onPress={() => setSelectedMentor(null)}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="coral"
                                size="sm"
                                onPress={handleSubmitSchedule}
                            >
                                Kirim pengajuan
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <CourseToast toast={toast} onDismiss={() => setToast(null)} />
        </div>
    );
}

"use client";

import * as React from "react";
import { toast } from "@heroui/react";
import { INITIAL_ATTRIBUTE_RESULTS, INITIAL_MENTOR_STATUS } from "./constants";
import type {
    AttributeDecisionStatus,
    AttributeResultItem,
    CertificateData,
    MentorInvitationStatus,
    MentorStatusState,
} from "./interfaces";

interface UseHasilOptions {
    initialResults?: AttributeResultItem[];
    initialMentorStatus?: MentorStatusState;
    onAcceptMentor?: () => Promise<void> | void;
    onRejectMentor?: (reason: string) => Promise<void> | void;
}

export function useHasil({
    initialResults = INITIAL_ATTRIBUTE_RESULTS,
    initialMentorStatus = INITIAL_MENTOR_STATUS,
    onAcceptMentor,
    onRejectMentor,
}: UseHasilOptions = {}) {
    const [results, setResults] =
        React.useState<AttributeResultItem[]>(initialResults);
    const [mentorState, setMentorState] =
        React.useState<MentorStatusState>(initialMentorStatus);
    const [activeCertificate, setActiveCertificate] =
        React.useState<CertificateData | null>(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleAcceptMentor = async () => {
        try {
            setIsSubmitting(true);
            await onAcceptMentor?.();

            setMentorState((prev) => ({
                ...prev,
                status: "active",
            }));
            toast.success(
                `Anda menjadi mentor ${mentorState.attributeTitle.toLowerCase()}.`,
                { timeout: 4000 }
            );
        } catch {
            toast.danger("Gagal menerima undangan mentor.", { timeout: 4000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitRejectMentor = async (reason: string) => {
        if (!reason.trim()) {
            toast.danger("Penolakan gagal terkirim.", { timeout: 4000 });
            return;
        }

        try {
            setIsSubmitting(true);
            await onRejectMentor?.(reason.trim());

            setIsRejectModalOpen(false);
            setMentorState((prev) => ({
                ...prev,
                status: "empty",
            }));
            toast.success("Penolakan terkirim.", { timeout: 4000 });
        } catch {
            toast.danger("Penolakan gagal terkirim.", { timeout: 4000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const simulateProblemSolvingState = (nextStatus: AttributeDecisionStatus) => {
        setResults((prev) =>
            prev.map((item) => {
                if (item.id !== "problem-solving") return item;
                if (nextStatus === "cooldown") {
                    return {
                        ...item,
                        status: "cooldown",
                        cooldownDays: 7,
                        remainingRetries: 2,
                    };
                }
                if (nextStatus === "ready_retry") {
                    return {
                        ...item,
                        status: "ready_retry",
                        cooldownDays: 0,
                        remainingRetries: 2,
                    };
                }
                return {
                    ...item,
                    status: "failed_final",
                    cooldownDays: undefined,
                    remainingRetries: undefined,
                };
            })
        );
    };

    const simulateMentorInvitationState = (nextStatus: MentorInvitationStatus) => {
        setMentorState((prev) => ({
            ...prev,
            status: nextStatus,
        }));
    };

    return {
        results,
        mentorState,
        activeCertificate,
        setActiveCertificate,
        isRejectModalOpen,
        setIsRejectModalOpen,
        isSubmitting,
        handleAcceptMentor,
        handleSubmitRejectMentor,
        simulateProblemSolvingState,
        simulateMentorInvitationState,
    };
}
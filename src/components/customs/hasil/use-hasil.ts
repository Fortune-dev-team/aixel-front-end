"use client";

import * as React from "react";
import { INITIAL_ATTRIBUTE_RESULTS, INITIAL_MENTOR_STATUS } from "./constants";
import type {
    AttributeDecisionStatus,
    AttributeResultItem,
    CertificateData,
    HasilToastState,
    MentorInvitationStatus,
    MentorStatusState,
} from "./interfaces";

export function useHasil() {
    const [results, setResults] = React.useState<AttributeResultItem[]>(
        INITIAL_ATTRIBUTE_RESULTS
    );
    const [mentorState, setMentorState] = React.useState<MentorStatusState>(
        INITIAL_MENTOR_STATUS
    );
    const [activeCertificate, setActiveCertificate] =
        React.useState<CertificateData | null>(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
    const [toast, setToast] = React.useState<HasilToastState | null>(null);

    const showToast = React.useCallback(
        (type: "success" | "error", message: string) => {
            setToast({ id: Date.now(), type, message });
        },
        []
    );

    const dismissToast = React.useCallback(() => {
        setToast(null);
    }, []);

    const handleAcceptMentor = () => {
        setMentorState((prev) => ({
            ...prev,
            status: "active",
        }));
        showToast(
            "success",
            `Anda menjadi mentor ${mentorState.attributeTitle.toLowerCase()}.`
        );
    };

    const handleSubmitRejectMentor = (reason: string) => {
        if (!reason.trim()) {
            showToast("error", "Penolakan gagal terkirim.");
            return;
        }

        setIsRejectModalOpen(false);
        setMentorState((prev) => ({
            ...prev,
            status: "empty",
        }));
        showToast("success", "Penolakan terkirim.");
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
        toast,
        dismissToast,
        handleAcceptMentor,
        handleSubmitRejectMentor,
        simulateProblemSolvingState,
        simulateMentorInvitationState,
    };
}
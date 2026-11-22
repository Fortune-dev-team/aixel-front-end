export type AttributeDecisionStatus =
    | "passed"
    | "cooldown"
    | "ready_retry"
    | "failed_final";

export interface CertificateData {
    certificateNumber: string;
    recipientName: string;
    attributeTitle: string;
    mentorName: string;
    passedDate: string;
    validUntil: string;
}

export interface AttributeResultItem {
    id: string;
    title: string;
    mentorName: string;
    mentorNote: string;
    status: AttributeDecisionStatus;
    cooldownDays?: number;
    remainingRetries?: number;
    certificate?: CertificateData;
}

export type MentorInvitationStatus = "empty" | "pending" | "active";

export interface MentorStatusState {
    status: MentorInvitationStatus;
    attributeTitle: string;
    validUntil: string;
}

export interface HasilToastState {
    id: number;
    type: "success" | "error";
    message: string;
}
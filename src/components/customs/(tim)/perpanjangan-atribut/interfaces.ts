export type AttributeRenewalStatus =
    | "active"
    | "expiring_soon"
    | "pending_review"
    | "rejected";

export interface AttributeRenewalItem {
    id: string;
    attributeTitle: string;
    expiresAt: string;
    status: AttributeRenewalStatus;
    note?: string;
}

export interface PerpanjanganToastState {
    id: number;
    type: "success" | "error";
    message: string;
}
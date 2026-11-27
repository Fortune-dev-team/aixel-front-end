import type { ToastType } from "@/components/ui/Toast";

export interface TeamProfileData {
    name: string;
    email: string;
    projectDescription: string;
}

export type OwnedAttributeStatus = "active" | "expired";

export interface OwnedAttributeItem {
    id: string;
    attributeTitle: string;
    source: string;
    passedDate: string;
    approvedByMentor: string;
    expiresAt: string;
    status: OwnedAttributeStatus;
}

export interface ProfilToastState {
    id: number;
    type: ToastType;
    message: string;
}
export interface TeamProfileForm {
    name: string;
    email: string;
    projectNote: string;
}

export interface OwnedAttributeItem {
    id: string;
    attribute: string;
    source: string;
    passedDate: string;
    approvedBy: string;
    expiresAt: string;
    status: "Aktif" | "Kadaluarsa";
}

export interface ProfilToastState {
    type: "success" | "error";
    message: string;
}
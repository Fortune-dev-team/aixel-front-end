import type { OwnedAttributeItem, TeamProfileForm } from "./interfaces";

export const INITIAL_PROFILE_DATA: TeamProfileForm = {
    name: "Alex",
    email: "alex@gmail.com",
    projectNote: "Product Manager · Nusa Digital",
};

export const INITIAL_OWNED_ATTRIBUTES: OwnedAttributeItem[] = [
    {
        id: "attr-1",
        attribute: "Problem Solving",
        source: "Lulus wawancara",
        passedDate: "06 Nov 2026",
        approvedBy: "Dimas Prakoso",
        expiresAt: "06 Nov 2027",
        status: "Aktif",
    },
];
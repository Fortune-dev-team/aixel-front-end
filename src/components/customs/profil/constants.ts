import type { OwnedAttributeItem, TeamProfileData } from "./interfaces";

export const INITIAL_TEAM_PROFILE: TeamProfileData = {
    name: "Alex",
    email: "alex@gmail.com",
    projectDescription: "Product Manager · Nusa Digital",
};

export const INITIAL_OWNED_ATTRIBUTES: OwnedAttributeItem[] = [
    {
        id: "problem-solving",
        attributeTitle: "Problem Solving",
        source: "Lulus wawancara",
        passedDate: "06 Nov 2026",
        approvedByMentor: "Dimas Prakoso",
        expiresAt: "06 Nov 2027",
        status: "active",
    },
];
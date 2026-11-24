import type { AttributeResultItem, MentorStatusState } from "./interfaces";

export const INITIAL_ATTRIBUTE_RESULTS: AttributeResultItem[] = [
    {
        id: "komunikasi",
        title: "Komunikasi",
        mentorName: "Dimas Prakoso",
        mentorNote: "Catatan mentor (Dimas Prakoso): sangat baik dalam komunikasi",
        status: "passed",
        certificate: {
            certificateNumber: "AIX-KOM-2026-0001",
            recipientName: "Alex Santoso",
            attributeTitle: "Komunikasi",
            mentorName: "Dimas Prakoso",
            passedDate: "06 Nov 2026",
            validUntil: "06 Nov 2027",
        },
    },
    {
        id: "problem-solving",
        title: "Problem Solving",
        mentorName: "Sari Wulandari",
        mentorNote: "Catatan mentor (Sari Wulandari): belum memenuhi kriteria.",
        status: "cooldown",
        cooldownDays: 7,
        remainingRetries: 2,
    },
];

export const INITIAL_MENTOR_STATUS: MentorStatusState = {
    status: "pending",
    attributeTitle: "Komunikasi",
    validUntil: "19 Nov 2027",
};
export type CompetencyKey = "komunikasi" | "problemSolving" | "kepemimpinan";

export interface OnboardingProfile {
    fullName: string;
    role: string;
    bio: string;
}

export type SelfRatings = Record<CompetencyKey, number>;

export interface AssessmentOption {
    id: string;
    text: string;
    score: number;
}

export interface AssessmentQuestion {
    id: string;
    aspect: CompetencyKey;
    question: string;
    options: AssessmentOption[];
}

export interface CompetencyResult {
    key: CompetencyKey;
    label: string;
    selfScore: number;
    testScore: number;
    isGap: boolean;
    testStatus: "Perlu peningkatan" | "Sesuai";
    actionLabel: string;
}

export interface OnboardingSubmitPayload {
    profile: OnboardingProfile;
    selfRatings: SelfRatings;
    answers: Record<string, string>;
    results: CompetencyResult[];
    selectedFocus: CompetencyKey;
}
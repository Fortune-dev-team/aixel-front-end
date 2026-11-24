export type LevelStatus = "locked" | "active" | "in_progress" | "passed";

export type LevelNumber = 1 | 2 | 3;

export interface CourseGoalOption {
    id: string;
    title: string;
    category: string;
}

export interface GoalLevelProgress {
    level1: LevelStatus;
    level2: LevelStatus;
    level3: LevelStatus;
}

export interface QuizOption {
    id: string;
    label: string;
}

export interface QuizQuestion {
    id: string;
    number: number;
    question: string;
    options: QuizOption[];
    correctOptionId: string;
}

export interface CaseRubricRow {
    id: string;
    kriteria: string;
    skor: string;
    tingkat: "Benchmark" | "Capstone";
    deskripsi: string;
}

export interface CourseMentor {
    id: string;
    name: string;
    roleLabel: string;
    quotaLabel: string;
}

export type InterviewStatus =
    | "selecting"
    | "waiting"
    | "rejected"
    | "reschedule_proposed"
    | "scheduled"
    | "passed";

export interface InterviewBooking {
    mentorId: string;
    mentorName: string;
    requestedSchedule: string;
    proposedSchedule?: string;
    rejectReason?: string;
    status: InterviewStatus;
}

export interface CourseToastState {
    id: number;
    type: "success" | "error";
    message: string;
}
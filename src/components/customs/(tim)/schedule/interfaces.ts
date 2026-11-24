export type ScheduleStatus =
    | "scheduled"
    | "waiting"
    | "reschedule_proposed"
    | "rejected";

export interface ScheduleItem {
    id: string;
    goalCategory: string;
    mentorName: string;
    scheduledAt: string;
    status: ScheduleStatus;
}
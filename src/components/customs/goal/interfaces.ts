export interface GoalAttribute {
    id: string;
    title: string;
    category: string;
}

export interface GoalToastState {
    id: number;
    type: "success" | "error";
    message: string;
}
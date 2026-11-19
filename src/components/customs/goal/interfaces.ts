export type GoalLevel = "Level 1" | "Level 2" | "Level 3"

export interface GoalItem {
    id: string
    title: string
    category: string
    description: string
    level: GoalLevel
    targetAttributes: string[]
    recommendedFor?: string
    isSelected?: boolean
}

export interface GoalCardProps {
    goal: GoalItem
    isSelected: boolean
    onToggleSelect: (id: string) => void
}

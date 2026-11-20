import { Chip } from "@/components/ui/Chip"
import type { LevelStatus } from "../interfaces"

interface LevelStatusBadgeProps {
    status: LevelStatus
}

export function LevelStatusBadge({ status }: LevelStatusBadgeProps) {
    const variant =
        status === "Lulus"
            ? "green"
            : status === "Terbuka"
                ? "blue"
                : "neutral"

    return <Chip variant={variant}>{status}</Chip>
}
"use client";
// molecules/TableRow.tsx
import { Button } from "./button";
import { Chip, ChipVariant } from "./Chip";

export interface TableRowProps {
    name: string;
    attribute: string;
    status: string;
    statusVariant?: ChipVariant;
    actionLabel?: string;
    onAction?: () => void;
    /** Alternate (striped) background */
    striped?: boolean;
    /** Tailwind grid template, must match TableHeader. */
    gridClassName?: string;
    className?: string;
}

export const TableRow = ({
    name,
    attribute,
    status,
    statusVariant = "green",
    actionLabel = "Detail",
    onAction,
    striped = false,
    gridClassName = "grid-cols-[2fr_2fr_1.5fr_1fr]",
    className = "",
}: TableRowProps) => (
    <div
        role="row"
        className={`grid items-center ${gridClassName} border-b border-black px-4 py-4 text-sm text-black ${
            striped ? "bg-[#f0ede6]" : "bg-[#fdfcf9]"
        } ${className}`}
    >
        <div role="cell">{name}</div>
        <div role="cell">{attribute}</div>
        <div role="cell">
            <Chip variant={statusVariant}>{status}</Chip>
        </div>
        <div role="cell">
            <Button variant="white" size="sm" onPress={onAction}>
                {actionLabel}
            </Button>
        </div>
    </div>
);

// molecules/TableHeader.tsx
export interface TableHeaderProps {
    columns: string[];
    /** Tailwind grid template, must match TableRow. */
    gridClassName?: string;
    className?: string;
}

export const TableHeader = ({
    columns,
    gridClassName = "grid-cols-[2fr_2fr_1.5fr_1fr]",
    className = "",
}: TableHeaderProps) => (
    <div
        role="row"
        className={`grid items-center ${gridClassName} bg-[#0d0d0d] px-4 py-3 font-mono text-xs font-bold text-white ${className}`}
    >
        {columns.map((col) => (
            <div key={col} role="columnheader">
                {col}
            </div>
        ))}
    </div>
);

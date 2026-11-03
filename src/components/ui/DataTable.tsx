"use client";
// organisms/DataTable.tsx
import { ChipVariant } from "./Chip";
import { EmptyState } from "./EmptyState";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export interface DataTableItem {
    id: string | number;
    name: string;
    attribute: string;
    status: string;
    statusVariant?: ChipVariant;
}

export interface DataTableProps {
    items: DataTableItem[];
    columns?: string[];
    emptyMessage?: string;
    emptyActionLabel?: string;
    onEmptyAction?: () => void;
    onRowAction?: (item: DataTableItem) => void;
    className?: string;
}

export const DataTable = ({
    items,
    columns = ["Nama", "Atribut", "Status", "Aksi"],
    emptyMessage,
    emptyActionLabel,
    onEmptyAction,
    onRowAction,
    className = "",
}: DataTableProps) => {
    if (items.length === 0) {
        return (
            <EmptyState
                message={emptyMessage}
                actionLabel={emptyActionLabel}
                onAction={onEmptyAction}
                className={className}
            />
        );
    }

    return (
        <div role="table" className={`overflow-hidden border-2 border-black ${className}`}>
            <TableHeader columns={columns} />
            {items.map((item, i) => (
                <TableRow
                    key={item.id}
                    name={item.name}
                    attribute={item.attribute}
                    status={item.status}
                    statusVariant={item.statusVariant}
                    striped={i % 2 === 1}
                    onAction={() => onRowAction?.(item)}
                />
            ))}
        </div>
    );
};

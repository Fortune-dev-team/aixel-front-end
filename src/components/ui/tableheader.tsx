"use client";

import { Table } from "@heroui/react";
import type { Key, ReactNode } from "react";

export interface DataTableColumn<T> {
    key: Extract<keyof T, string> | (string & {});
    label: string;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (row: T) => ReactNode;
}

export interface DataTableProps<T extends { id: Key }> {
    columns: DataTableColumn<T>[];
    rows: T[];
    ariaLabel: string;
    emptyText?: string;
    className?: string;
}

const alignClass = { left: "text-left", center: "text-center", right: "text-right" } as const;

export function DataTable<T extends { id: Key }>({
    columns,
    rows,
    ariaLabel,
    emptyText = "Tidak ada data",
    className,
}: DataTableProps<T>) {
    return (
        <div
            className={[
                "overflow-hidden rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] shadow-[3px_3px_0_0_#0A0A0A]",
                "[&_th]:rounded-none! [&_td]:rounded-none! [&_tr]:rounded-none!",
                "[&_th]:before:hidden! [&_th]:after:hidden! [&_td]:before:hidden! [&_td]:after:hidden!",
                "[&_tr]:before:hidden! [&_tr]:after:hidden!",
                className ?? "",
            ].join(" ")}
        >
            <Table className="rounded-none! bg-transparent! p-0! shadow-none!">
                <Table.ScrollContainer className="rounded-none! bg-transparent!">
                    <Table.Content aria-label={ariaLabel} className="rounded-none! bg-transparent!">
                        <Table.Header className="bg-[#0A0A0A]! rounded-none!">
                            {columns.map((c, i) => (
                                <Table.Column
                                    key={c.key}
                                    id={c.key}
                                    isRowHeader={i === 0}
                                    className={[
                                        "bg-[#0A0A0A]! px-4 py-3 font-mono text-xs font-bold text-white!",
                                        alignClass[c.align ?? "left"],
                                        c.width ?? "",
                                    ].join(" ")}
                                >
                                    {c.label}
                                </Table.Column>
                            ))}
                        </Table.Header>
                        <Table.Body renderEmptyState={() => <p className="p-4 text-sm text-[#6B6B6B]">{emptyText}</p>}>
                            {rows.map((row) => (
                                <Table.Row
                                    key={row.id}
                                    // id={row.id}
                                    className="border-t-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] font-mono text-[#0A0A0A] transition-colors first:border-t-0 hover:bg-[#FFDDD3]"
                                >
                                    {columns.map((c) => (
                                        <Table.Cell key={c.key} className={`px-4 py-3 text-sm ${alignClass[c.align ?? "left"]}`}>
                                            {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "")}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
}
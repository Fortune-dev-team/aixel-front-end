"use client"

import { RubrikTableCard } from "./cards/table-card"
import type { RubrikWawancaraContentProps } from "./interfaces"
import { RubrikWawancaraHeader } from "./widgets/header"

export function RubrikWawancaraContent({
    items,
    columns,
    isLoading = false,
}: RubrikWawancaraContentProps) {
    return (
        <div className="w-full">
            <RubrikWawancaraHeader />
            <RubrikTableCard items={items} columns={columns} isLoading={isLoading} />
        </div>
    )
}